import { chemicalConflict, chemicalSynergy } from "./chemistry";
import { designOptimalFarm, fitsSite, newPlacement, scoreFarm } from "./engine";
import { farmRegion } from "./regions";
import { SPECIES, SPECIES_BY_ID } from "./species";
import { attachVines } from "./trellis";
import type { Farm, FarmSystem, Layer, Placement, Species } from "./types";

export const SQFT_PER_ACRE = 43560;
export const SQFT_PER_M2 = 10.7639;

export type AreaUnit = "sqft" | "m2" | "acre";

export const AREA_PRESETS: { label: string; sqft: number }[] = [
  { label: "100 ft²", sqft: 100 },
  { label: "500 ft²", sqft: 500 },
  { label: "¼ acre", sqft: Math.round(SQFT_PER_ACRE * 0.25) },
  { label: "1 acre", sqft: SQFT_PER_ACRE },
];

export function farmAreaSqft(farm: Farm): number {
  if (farm.areaSqft && farm.areaSqft > 0) return farm.areaSqft;
  return Math.max(80, (farm.acres || 0.046) * SQFT_PER_ACRE);
}

export function toSqft(n: number, unit: AreaUnit): number {
  if (unit === "acre") return n * SQFT_PER_ACRE;
  if (unit === "m2") return n * SQFT_PER_M2;
  return n;
}

export function fromSqft(sqft: number, unit: AreaUnit): number {
  if (unit === "acre") return sqft / SQFT_PER_ACRE;
  if (unit === "m2") return sqft / SQFT_PER_M2;
  return sqft;
}

export function formatArea(sqft: number): string {
  if (sqft >= SQFT_PER_ACRE) return `${(sqft / SQFT_PER_ACRE).toFixed(sqft >= SQFT_PER_ACRE * 2 ? 1 : 2)} ac`;
  if (sqft >= 4000) return `${Math.round(sqft / 100) * 100} ft²`;
  return `${Math.round(sqft)} ft²`;
}

export function areaWorldRadius(sqft: number): number {
  const acres = sqft / SQFT_PER_ACRE;
  return Math.min(7.1, 1.6 + Math.sqrt(Math.max(0.01, acres)) * 6.2);
}

const SPECIES_SPACING: Record<string, number> = {
  chestnut: 35,
  pecan: 40,
  pine: 22,
  avocado: 25,
  mango: 30,
  citrus: 18,
  guava: 12,
  fig: 14,
  mulberry: 16,
  persimmon: 18,
  "pigeon-pea": 6,
  "perennial-peanut": 2,
  passionfruit: 8,
};

const LAYER_SPACING: Record<Layer, number> = {
  canopy: 28,
  subcanopy: 16,
  shrub: 8,
  vine: 10,
  herb: 3,
  groundcover: 2,
  root: 3,
  fungi: 6,
  animal: 20,
};

const LAYER_CAP: Record<Layer, number> = {
  canopy: 6,
  subcanopy: 8,
  shrub: 12,
  vine: 10,
  herb: 16,
  groundcover: 12,
  root: 8,
  fungi: 5,
  animal: 8,
};

const ANIMAL_SQFT: Record<string, number> = {
  chicken: 200,
  duck: 250,
  bee: 80,
  sheep: 2000,
  goat: 1800,
};

export function spacingFt(sp: Species): number {
  return SPECIES_SPACING[sp.id] ?? LAYER_SPACING[sp.layer];
}

function countFor(sp: Species, sqft: number): number {
  if (sp.kind === "animal") {
    const need = ANIMAL_SQFT[sp.id] ?? 200;
    return Math.min(LAYER_CAP.animal, Math.max(0, Math.floor(sqft / need)));
  }
  if (sp.layer === "vine") {
    const supports = Math.max(1, Math.floor(sqft / (18 * 18)));
    return Math.min(LAYER_CAP.vine, supports);
  }
  if (sp.layer === "fungi") {
    return sqft >= 200 ? Math.min(3, Math.max(1, Math.floor(sqft / 2500))) : 0;
  }
  const cell = spacingFt(sp) * spacingFt(sp);
  let n = Math.floor(sqft / cell);
  if (sp.layer === "herb" || sp.layer === "groundcover") n = Math.ceil(n * 0.55);
  if (n < 1 && sqft >= cell * 0.35) n = 1;
  return Math.min(LAYER_CAP[sp.layer], n);
}

const POOLS: Record<FarmSystem, Partial<Record<Layer, string[]>>> = {
  "food-forest": {
    canopy: ["chestnut", "oak-white", "black-locust", "walnut-english"],
    subcanopy: ["apple", "pear", "persimmon", "mulberry", "pawpaw"],
    shrub: ["hazel", "blueberry", "elderberry", "goumi", "serviceberry"],
    vine: ["grape", "kiwi", "bean-runner"],
    herb: ["comfrey", "nasturtium", "yarrow"],
    groundcover: ["clover-white", "strawberry"],
    root: ["sunchoke", "daikon"],
    fungi: ["winecap", "shiitake"],
    animal: ["chicken", "bee"],
  },
  alley: {
    canopy: ["paulownia", "black-locust", "honey-locust"],
    subcanopy: ["olive", "fig", "pomegranate"],
    shrub: ["rosemary", "lavender", "sage"],
    vine: ["grape"],
    herb: ["basil", "oregano", "tomato", "borage"],
    groundcover: ["clover-white"],
    root: ["daikon"],
    fungi: ["winecap"],
    animal: ["bee", "chicken"],
  },
  silvopasture: {
    canopy: ["honey-locust", "chestnut", "oak-white", "black-locust"],
    subcanopy: ["mulberry", "persimmon", "apple"],
    shrub: ["willow", "hazel", "autumn-olive"],
    vine: ["grape"],
    herb: ["comfrey", "chicory", "alfalfa"],
    groundcover: ["clover-white", "plantain-forage"],
    root: ["sunchoke"],
    fungi: ["winecap"],
    animal: ["chicken", "sheep", "bee"],
  },
  polycrop: {
    canopy: ["walnut-black", "walnut-english"],
    subcanopy: ["pawpaw"],
    shrub: ["currant", "raspberry-black", "gooseberry"],
    vine: ["grape"],
    herb: ["asparagus", "comfrey", "garlic"],
    groundcover: ["clover-white"],
    root: ["horseradish"],
    fungi: ["morel"],
    animal: ["chicken"],
  },
};

function poolsFor(farm: Farm): Partial<Record<Layer, string[]>> {
  const region = farmRegion(farm);
  if (region) {
    const g = region.guilds.find((x) => x.system === farm.system) ?? region.guilds[0];
    if (g) return g.layers;
  }
  return POOLS[farm.system] ?? POOLS["food-forest"];
}

function pickFit(ids: string[], farm: Farm): Species | undefined {
  const region = farmRegion(farm);
  for (const id of ids) {
    const sp = SPECIES_BY_ID[id];
    if (!sp) continue;
    if (region && region.recommended.includes(id) && !region.poor.includes(id)) {
      if (region.moundOnly.includes(id) && !farm.mounds) continue;
      return sp;
    }
    if (fitsSite(id, farm.zone, farm.soil, farm.water)) return sp;
  }
  return undefined;
}

function roleOf(sp: Species): string {
  if (sp.functions.includes("nitrogen-fixer")) return "Nitrogen fixer";
  if (sp.functions.includes("dynamic-accumulator")) return "Mineral mine";
  if (sp.layer === "canopy") return "Canopy";
  if (sp.layer === "subcanopy") return "Fruit";
  if (sp.layer === "vine") return "Vertical crop";
  if (sp.layer === "groundcover") return "Living floor";
  if (sp.kind === "animal") return "Livestock";
  if (sp.layer === "fungi") return "Litter partner";
  if (sp.functions.includes("pest-deterrent")) return "Pest guard";
  return "Companion";
}

function conflictsWith(sp: Species, chosen: Species[]): boolean {
  return chosen.some((o) => o.antagonists.includes(sp.id) || sp.antagonists.includes(o.id) || !!chemicalConflict(sp, o));
}

export interface PlanLine {
  speciesId: string;
  name: string;
  layer: Layer;
  count: number;
  spacingFt: number;
  role: string;
}

export interface GuildPlan {
  areaSqft: number;
  lines: PlanLine[];
  why: string[];
  comboScore: number;
  placements: Placement[];
}

export function planForArea(farm: Farm, sqft = farmAreaSqft(farm)): GuildPlan {
  const area = Math.max(80, Math.min(sqft, SQFT_PER_ACRE * 20));
  const pool = poolsFor(farm);
  const chosen: Species[] = [];
  const order: Layer[] = ["canopy", "subcanopy", "shrub", "vine", "herb", "groundcover", "root", "fungi", "animal"];

  for (const layer of order) {
    const ids = pool[layer] ?? [];
    for (const id of ids) {
      const mapped = pickFit([id], farm);
      if (!mapped) continue;
      if (chosen.some((c) => c.id === mapped.id)) continue;
      if (conflictsWith(mapped, chosen)) continue;
      const n = countFor(mapped, area);
      if (n < 1) continue;
      if (layer === "animal" && farm.system === "food-forest" && mapped.id !== "bee" && mapped.id !== "chicken") {
        if (area < 800) continue;
      }
      if (layer === "canopy" && area < 280 && chosen.some((c) => c.layer === "canopy")) continue;
      chosen.push(mapped);
      const sameLayer = chosen.filter((c) => c.layer === layer).length;
      const want =
        layer === "canopy" ? (area >= 2500 ? 2 : 1) : layer === "subcanopy" ? (area >= 800 ? 2 : 1) : layer === "shrub" ? (area >= 600 ? 2 : 1) : 1;
      if (sameLayer >= want) break;
    }
  }

  if (!chosen.some((s) => s.functions.includes("nitrogen-fixer"))) {
    const fixer = SPECIES.find(
      (s) =>
        s.functions.includes("nitrogen-fixer") &&
        fitsSite(s.id, farm.zone, farm.soil, farm.water) &&
        !conflictsWith(s, chosen),
    );
    if (fixer && countFor(fixer, area) >= 1) chosen.push(fixer);
  }

  if (chosen.length === 0) {
    const fallback = designOptimalFarm({ ...farm, acres: area / SQFT_PER_ACRE });
    return {
      areaSqft: area,
      lines: [],
      why: ["No site-fit species at this size — try a larger plot or a milder zone."],
      comboScore: 0,
      placements: fallback,
    };
  }

  const lines: PlanLine[] = chosen
    .map((sp) => ({
      speciesId: sp.id,
      name: sp.name,
      layer: sp.layer,
      count: Math.max(1, countFor(sp, area)),
      spacingFt: spacingFt(sp),
      role: roleOf(sp),
    }))
    .filter((l) => l.count > 0);

  const placements = layoutLines(lines, area);
  const preview: Farm = { ...farm, areaSqft: area, acres: area / SQFT_PER_ACRE, placements };
  const combo = comboRating(preview);
  const why = explainPlan(chosen, area, farm.system);
  return { areaSqft: area, lines, why, comboScore: combo.score, placements };
}

function layoutLines(lines: PlanLine[], sqft: number): Placement[] {
  const rPct = (areaWorldRadius(sqft) / 7.4) * 48;
  const out: Placement[] = [];
  const band: Record<Layer, [number, number]> = {
    canopy: [0.08, 0.42],
    subcanopy: [0.28, 0.68],
    shrub: [0.4, 0.86],
    vine: [0.22, 0.55],
    herb: [0.18, 0.72],
    groundcover: [0.5, 0.94],
    root: [0.35, 0.8],
    fungi: [0.2, 0.5],
    animal: [0.3, 0.7],
  };
  const golden = Math.PI * (3 - Math.sqrt(5));
  let slot = 0;
  for (const line of lines) {
    const [a, b] = band[line.layer];
    for (let i = 0; i < line.count; i++) {
      const t = (i + 0.35) / Math.max(1, line.count);
      const rad = rPct * (a + (b - a) * Math.sqrt(t));
      const ang = slot * golden + (line.layer === "canopy" ? 0.4 : 1.1);
      const x = 50 + Math.cos(ang) * rad;
      const z = 50 + Math.sin(ang) * rad * 0.9;
      out.push(newPlacement(line.speciesId, Math.min(92, Math.max(8, x)), Math.min(92, Math.max(8, z))));
      slot += 1;
    }
  }
  return attachVines(out);
}

function explainPlan(chosen: Species[], area: number, system: FarmSystem): string[] {
  const why: string[] = [];
  const fixer = chosen.find((s) => s.functions.includes("nitrogen-fixer"));
  const canopy = chosen.find((s) => s.layer === "canopy");
  const fruit = chosen.find((s) => s.layer === "subcanopy" || (s.functions.includes("food") && s.layer !== "canopy"));
  const acc = chosen.find((s) => s.functions.includes("dynamic-accumulator"));
  const vine = chosen.find((s) => s.layer === "vine");
  const animal = chosen.find((s) => s.kind === "animal" && s.id !== "bee");
  const cover = chosen.find((s) => s.layer === "groundcover");

  why.push(`${formatArea(area)} is stacked as a ${system.replace("-", " ")} — each layer takes only the space its mature crown needs.`);
  if (fixer && canopy) {
    why.push(`${fixer.name} funds ${canopy.name} with nod-signals and litter N, not a vitamin drip.`);
  }
  if (fruit && fixer) {
    why.push(`${fruit.name} is the mid-story harvest once the fixer has paid the soil.`);
  }
  if (acc && canopy) {
    why.push(`${acc.name} mines K, Ca, and silica; chop-and-drop returns them after microbes work the mulch.`);
  }
  if (vine && canopy) {
    why.push(`${vine.name} uses ${canopy.name} as a living trellis — vertical yield without extra ground.`);
  }
  if (cover) {
    why.push(`${cover.name} holds the floor: living mulch, less bare soil, more nodulation surface.`);
  }
  if (animal) {
    why.push(`${animal.name} close the loop — pest patrol and mineral return on a footprint this size can actually carry.`);
  }
  if (!fixer) why.push("Add a nitrogen fixer when you can — the rest of the guild is hungry without one.");
  return why.slice(0, 5);
}

export function comboRating(farm: Farm): { score: number; density: number; synergy: number; layers: number; note: string } {
  const present = farm.placements.map((p) => SPECIES_BY_ID[p.speciesId]).filter(Boolean);
  if (present.length === 0) {
    return { score: 0, density: 0, synergy: 0, layers: 0, note: "Empty plot — plant a plan or drop a tree." };
  }
  const scored = scoreFarm(farm);
  const sqft = farmAreaSqft(farm);
  const density = quickDensity(farm, sqft);
  const syn = scored.synergies.length;
  const con = scored.conflicts.length;
  const synergy = Math.round(100 * (syn / (syn + con + 1)));
  const layers = scored.layers;

  const hasFixer = present.some((s) => s.functions.includes("nitrogen-fixer"));
  const hasAcc = present.some((s) => s.functions.includes("dynamic-accumulator"));
  let score = Math.round(
    scored.overall * 0.38 + density * 0.22 + synergy * 0.22 + layers * 0.1 + (hasFixer ? 5 : 0) + (hasAcc ? 3 : 0),
  );
  score = Math.max(0, Math.min(99, score));

  let note = "A working stack.";
  if (con > 0) note = "A fight on the acre — separate those two root zones.";
  else if (!hasFixer) note = "Missing a nitrogen fixer. The canopy is eating stored N.";
  else if (syn >= 3 && hasFixer) note = "Peak combo territory — layers and chemistry agree.";
  else if (density < 40) note = "Sparse for this footprint. The plan wants more understory.";
  else if (density > 88) note = "Crowded. Give the canopy its mature spacing.";

  return { score, density, synergy, layers, note };
}

function quickDensity(farm: Farm, sqft: number): number {
  const counts: Partial<Record<Layer, number>> = {};
  for (const p of farm.placements) {
    const sp = SPECIES_BY_ID[p.speciesId];
    if (!sp) continue;
    counts[sp.layer] = (counts[sp.layer] ?? 0) + 1;
  }
  const layers: Layer[] = ["canopy", "subcanopy", "shrub", "herb", "groundcover"];
  let fit = 0;
  let n = 0;
  for (const layer of layers) {
    const have = counts[layer] ?? 0;
    const cell = LAYER_SPACING[layer] * LAYER_SPACING[layer];
    const want = Math.max(
      0,
      Math.min(LAYER_CAP[layer], Math.floor(sqft / cell) || (sqft > 200 ? 1 : 0)),
    );
    if (want === 0 && have === 0) continue;
    n += 1;
    const ratio = want === 0 ? (have > 0 ? 0.4 : 1) : Math.max(0, 1 - Math.abs(have - want) / Math.max(want, 1));
    fit += ratio;
  }
  return Math.round(100 * (n ? fit / n : 0));
}

void chemicalSynergy;
