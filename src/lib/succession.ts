import { comboRating } from "./planner";
import { farmRegion } from "./regions";
import { SPECIES_BY_ID } from "./species";
import type { Farm, Layer, Species } from "./types";

export const YEAR_MIN = 0;
export const YEAR_MAX = 36;

export type StageId = "pioneer" | "early" | "mid" | "mature";

export interface StageDef {
  id: StageId;
  name: string;
  range: string;
  from: number;
  to: number;
  blurb: string;
  tip: string;
}

export const STAGES: StageDef[] = [
  {
    id: "pioneer",
    name: "Pioneer",
    range: "Years 0–3",
    from: 0,
    to: 3,
    blurb: "Sticks and a living floor. Trees are not a crop yet — nitrogen and mulch are.",
    tip: "Plant the canopy, a fixer, and a groundcover now. Wait to train vines until the trunks can take the weight.",
  },
  {
    id: "early",
    name: "Early",
    range: "Years 3–8",
    from: 3,
    to: 8,
    blurb: "Shrubs and the first fruit. Chop-and-drop is the weekly work.",
    tip: "Comfrey and clover should already be cycling. Train grapes. Do not expect chestnut calories.",
  },
  {
    id: "mid",
    name: "Mid",
    range: "Years 8–20",
    from: 8,
    to: 20,
    blurb: "The canopy starts to pay. Alleys shrink. Nurses have done their job.",
    tip: "Coppice or ring-bark nurses that shade fruit. Keep the floor in species that like filtered light.",
  },
  {
    id: "mature",
    name: "Mature",
    range: "Year 20+",
    from: 20,
    to: 36,
    blurb: "This is a forest. Mast, timber, and a shade-tolerant floor. Annuals only in gaps.",
    tip: "Harvest the sky. Replant gaps, not rows. Livestock only where bark is thick.",
  },
];

export function stageAt(year: number, farm?: Farm): StageDef {
  const y = clampYear(year);
  const base = STAGES.find((s) => y >= s.from && y < s.to) ?? STAGES[STAGES.length - 1]!;
  const region = farm ? farmRegion(farm) : undefined;
  const overlay = region?.succession[base.id];
  if (!overlay) return base;
  return { ...base, blurb: overlay.blurb, tip: overlay.tip };
}

export function clampYear(year: number): number {
  return Math.min(YEAR_MAX, Math.max(YEAR_MIN, year));
}

const MATURE: Record<Layer, number> = {
  canopy: 22,
  subcanopy: 12,
  shrub: 6,
  vine: 5,
  herb: 2,
  groundcover: 1.4,
  root: 2.2,
  fungi: 1,
  animal: 0.6,
};

export function matureYears(sp: Species): number {
  return MATURE[sp.layer] ?? 8;
}

export function growthOf(sp: Species, year: number): number {
  const m = matureYears(sp);
  if (m <= 0.2) return 1;
  const t = Math.min(1, Math.max(0, year / m));
  return Math.pow(t, 0.62);
}

export interface PlantView {
  scale: number;
  faded: boolean;
  wave: 1 | 2 | 3;
  note: string;
  growth: number;
}

export function waveOf(sp: Species): 1 | 2 | 3 {
  if (sp.layer === "canopy" || sp.layer === "groundcover" || sp.functions.includes("nitrogen-fixer") || sp.kind === "animal") {
    return 1;
  }
  if (sp.layer === "vine" || (sp.layer === "herb" && sp.sun === "shade")) return 3;
  return 2;
}

function canopyClosed(farm: Farm, year: number): number {
  const trees = farm.placements
    .map((p) => SPECIES_BY_ID[p.speciesId])
    .filter((s) => s && (s.layer === "canopy" || s.layer === "subcanopy"));
  if (!trees.length) return 0;
  const g = trees.reduce((a, s) => a + growthOf(s, year), 0) / trees.length;
  return g;
}

export function viewOf(sp: Species, year: number, farm: Farm, baseScale: number, plantedYear = 0): PlantView {
  const age = Math.max(0, year - plantedYear);
  let g = growthOf(sp, age);
  const floor =
    sp.layer === "canopy" || sp.layer === "subcanopy"
      ? 0.1
      : sp.layer === "vine"
        ? 0.14
        : sp.layer === "shrub"
          ? 0.16
          : sp.kind === "animal"
            ? 0.55
            : 0.22;
  let scale = baseScale * (floor + (1 - floor) * g);
  const closed = canopyClosed(farm, year);
  let faded = false;
  let note =
    g < 0.18 ? "Sapling — a stick with a future." : g < 0.45 ? "Young. Form is showing." : `${Math.round(g * 100)}% of mature size`;

  if (sp.functions.includes("nurse") && year >= 14) {
    scale *= 0.58;
    note = "Coppice window — this nurse has paid its keep.";
  }
  if (sp.sun === "full" && (sp.layer === "herb" || sp.layer === "root") && closed > 0.62 && year >= 10) {
    faded = true;
    scale *= 0.42;
    note = "Shaded out — the canopy closed over this sun plant.";
  } else if (sp.layer === "groundcover" && closed > 0.75 && sp.sun === "full" && year >= 14) {
    faded = true;
    scale *= 0.55;
    note = "Floor thinning in deep shade. Prefer a shade-tolerant mulch.";
  } else if (sp.kind === "animal" && year < 2 && farm.placements.some((p) => SPECIES_BY_ID[p.speciesId]?.layer === "canopy")) {
    note = "Keep hooves off young bark. A hive is fine now.";
  } else if (year + 0.2 >= sp.yearsToYield && year < sp.yearsToYield + 2 && sp.functions.includes("food")) {
    note = "First harvest window.";
  }

  return { scale, faded, wave: waveOf(sp), note, growth: g };
}

export interface TimelineEvent {
  year: number;
  label: string;
}

export function eventsFor(farm: Farm): TimelineEvent[] {
  const plants = farm.placements.map((p) => SPECIES_BY_ID[p.speciesId]).filter(Boolean);
  const ev: TimelineEvent[] = [];
  const foods = plants.filter((s) => s.functions.includes("food") && s.yearsToYield > 0);
  if (foods.length) {
    const y = Math.min(...foods.map((s) => s.yearsToYield));
    ev.push({ year: y, label: "First harvest" });
  }
  if (plants.some((s) => s.functions.includes("nurse") || s.functions.includes("nitrogen-fixer"))) {
    ev.push({ year: 4, label: "Nurses working" });
  }
  if (plants.some((s) => s.layer === "canopy")) {
    ev.push({ year: 12, label: "Canopy closes" });
  }
  if (plants.some((s) => s.functions.includes("nurse"))) {
    ev.push({ year: 16, label: "Coppice nurses" });
  }
  const peak = peakYear(farm);
  ev.push({ year: peak, label: "Peak synergy" });
  const uniq = new Map<number, TimelineEvent>();
  for (const e of ev) {
    const y = Math.round(clampYear(e.year));
    if (!uniq.has(y)) uniq.set(y, { ...e, year: y });
  }
  return [...uniq.values()].sort((a, b) => a.year - b.year);
}

export function scoreAtYear(farm: Farm, year: number): { score: number; note: string } {
  const base = comboRating(farm);
  if (!farm.placements.length) return { score: 0, note: base.note };
  const plants = farm.placements.map((p) => SPECIES_BY_ID[p.speciesId]).filter(Boolean);
  const grown = plants.reduce((a, s) => a + growthOf(s, year), 0) / plants.length;
  const faded = plants.filter((s) => viewOf(s, year, farm, 1).faded).length;
  const closed = canopyClosed(farm, year);
  const stage = stageAt(year, farm);
  let mul = 0.48 + grown * 0.52 - faded * 0.06;
  if (stage.id === "pioneer") mul *= 0.78 + (plants.some((s) => s.functions.includes("nitrogen-fixer")) ? 0.1 : 0);
  if (stage.id === "early") mul *= 0.92;
  if (stage.id === "mid") mul *= 1.05;
  if (stage.id === "mature") mul *= 1.02 - (closed > 0.85 && faded > 2 ? 0.08 : 0);
  const score = Math.max(4, Math.min(99, Math.round(base.score * mul)));
  const note =
    stage.id === "pioneer"
      ? "Low calories, high soil work. Score is potential, not a pantry."
      : stage.id === "early"
        ? "Layers are filling. Synergy is compounding."
        : stage.id === "mid"
          ? "This is the decade the pairing pays."
          : faded
            ? "A forest. Sun plants have left; mast and shade hold the score."
            : "A finished stack. Harvest the sky.";
  return { score, note };
}

export function peakYear(farm: Farm): number {
  let best = 14;
  let bestS = -1;
  for (let y = 6; y <= 28; y += 2) {
    const s = scoreAtYear(farm, y).score;
    if (s > bestS) {
      bestS = s;
      best = y;
    }
  }
  return best;
}

export function lightAt(year: number): { sun: number; fogNear: number; fogFar: number; sky: string } {
  const t = clampYear(year) / YEAR_MAX;
  return {
    sun: 1.55 - t * 0.42,
    fogNear: 16 + t * 4,
    fogFar: 42 - t * 8,
    sky: t > 0.55 ? "#C9D6B4" : "#D8E4C4",
  };
}

export function plantNow(farm: Farm): Species[] {
  return unique(
    farm.placements
      .map((p) => SPECIES_BY_ID[p.speciesId])
      .filter((s): s is Species => !!s && waveOf(s) === 1),
  );
}

export function plantLater(farm: Farm, year: number): { wave: 2 | 3; when: string; plants: Species[] }[] {
  const two = unique(
    farm.placements.map((p) => SPECIES_BY_ID[p.speciesId]).filter((s): s is Species => !!s && waveOf(s) === 2),
  );
  const three = unique(
    farm.placements.map((p) => SPECIES_BY_ID[p.speciesId]).filter((s): s is Species => !!s && waveOf(s) === 3),
  );
  const out: { wave: 2 | 3; when: string; plants: Species[] }[] = [];
  if (two.length && year < 3) out.push({ wave: 2, when: "Year 2–3", plants: two });
  if (three.length && year < 6) out.push({ wave: 3, when: "Year 4–6", plants: three });
  return out;
}

function unique(list: Species[]): Species[] {
  const seen = new Set<string>();
  return list.filter((s) => {
    if (seen.has(s.id)) return false;
    seen.add(s.id);
    return true;
  });
}

export function markerYears(): number[] {
  return [1, 5, 12, 20, 30];
}

export function yearLabel(year: number): string {
  const y = Math.round(year);
  return y <= 0 ? "Year 0" : `Year ${y}`;
}
