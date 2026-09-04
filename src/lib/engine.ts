import {
  chemicalConflict,
  chemicalSynergy,
  farmChemistry,
  getChemistry,
} from "./chemistry";
import { SPECIES, SPECIES_BY_ID, getSpecies } from "./species";
import type {
  EcoFunction,
  Farm,
  FarmScore,
  FarmSystem,
  Layer,
  NutrientKey,
  PairNote,
  Placement,
  Soil,
  Suggestion,
  WaterNeed,
} from "./types";
import { LAYERS, NUTRIENT_META } from "./types";
import { farmRegion } from "./regions";

const ALL_NUTRIENTS = NUTRIENT_META.map((n) => n.key);

function uniqueId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function newPlacement(speciesId: string, x?: number, z?: number, extra?: Partial<Placement>): Placement {
  return {
    id: uniqueId(),
    speciesId,
    x: x ?? 18 + Math.random() * 64,
    z: z ?? 18 + Math.random() * 64,
    scale: 0.82 + Math.random() * 0.35,
    rot: Math.random() * Math.PI * 2,
    plantedYear: 0,
    ...extra,
  };
}

export function placementZ(p: Placement): number {
  if (typeof p.z === "number" && !Number.isNaN(p.z)) return p.z;
  let h = 0;
  for (const c of p.id) h = (h * 33 + c.charCodeAt(0)) % 1000;
  return 22 + (h % 56);
}

export function defaultFarm(): Farm {
  return {
    id: uniqueId(),
    name: "New grove",
    zone: 6,
    soil: "loam",
    water: "moderate",
    acres: 0.046,
    areaSqft: 2000,
    system: "food-forest",
    placements: [],
    onboarded: false,
    regionId: undefined,
    zoning: undefined,
    mounds: false,
    prep: {},
  };
}

export function speciesOnFarm(farm: Farm) {
  return farm.placements
    .map((p) => SPECIES_BY_ID[p.speciesId])
    .filter(Boolean);
}

export function fitsSite(
  id: string,
  zone: number,
  soil: Soil,
  water: WaterNeed,
): boolean {
  const sp = getSpecies(id);
  if (!sp) return false;
  if (zone < sp.hardinessMin - 1 || zone > sp.hardinessMax + 1) return false;
  if (sp.soils.length && !sp.soils.includes(soil)) return false;
  if (sp.water === "wet" && water === "dry") return false;
  if (sp.water === "dry" && water === "wet" && sp.kind === "plant") return false;
  return true;
}

function layerWeight(layer: Layer): number {
  switch (layer) {
    case "canopy":
    case "subcanopy":
      return 1;
    case "shrub":
    case "animal":
      return 0.85;
    case "vine":
    case "herb":
      return 0.7;
    default:
      return 0.55;
  }
}

export function scoreFarm(farm: Farm): FarmScore {
  const present = speciesOnFarm(farm);
  const ids = new Set(present.map((s) => s.id));

  const layersPresent = LAYERS.filter((l) => present.some((s) => s.layer === l));
  const functionsPresent = [
    ...new Set(present.flatMap((s) => s.functions)),
  ] as EcoFunction[];

  const nutrientTotals = {} as Record<NutrientKey, number>;
  for (const key of ALL_NUTRIENTS) nutrientTotals[key] = 0;
  for (const sp of present) {
    const w = layerWeight(sp.layer);
    for (const [k, v] of Object.entries(sp.nutrients)) {
      nutrientTotals[k as NutrientKey] += (v ?? 0) * w;
    }
  }

  const coveredNutrients = ALL_NUTRIENTS.filter((k) => nutrientTotals[k] >= 18);
  const missingNutrients = ALL_NUTRIENTS.filter((k) => nutrientTotals[k] < 18);

  const conflicts: PairNote[] = [];
  const synergies: PairNote[] = [];

  for (const a of present) {
    for (const b of present) {
      if (a.id >= b.id) continue;

      const chemHit = chemicalConflict(a, b);
      if (chemHit) {
        conflicts.push({
          a: a.id,
          b: b.id,
          kind: "conflict",
          title: `${a.name} × ${b.name}`,
          detail: chemHit,
        });
      } else if (a.antagonists.includes(b.id) || b.antagonists.includes(a.id)) {
        conflicts.push({
          a: a.id,
          b: b.id,
          kind: "conflict",
          title: `${a.name} fights ${b.name}`,
          detail:
            a.allelopathic || b.allelopathic
              ? "Documented interference — allelochemical, shared disease, or the same niche. Separate root zones."
              : "These two share disease pressure or crowd the same niche.",
        });
      }

      const chemSyn = chemicalSynergy(a, b);
      if (chemSyn) {
        synergies.push({
          a: a.id,
          b: b.id,
          kind: "mutualism",
          title: `${a.name} × ${b.name}`,
          detail: chemSyn,
        });
      } else if (a.companions.includes(b.id) || b.companions.includes(a.id)) {
        synergies.push({
          a: a.id,
          b: b.id,
          kind: "mutualism",
          title: `${a.name} × ${b.name}`,
          detail: describePair(a.id, b.id),
        });
      }

      if (
        (a.fodderFor.includes(b.id) || b.fodderFor.includes(a.id)) &&
        (a.kind === "animal" || b.kind === "animal")
      ) {
        synergies.push({
          a: a.id,
          b: b.id,
          kind: "loop",
          title: `${a.kind === "animal" ? a.name : b.name} forage loop`,
          detail:
            "Closed loop: the plant feeds the animal; dung, pest control, or tillage returns minerals — not intact vitamins — to the plant.",
        });
      }
    }
  }

  const snap = farmChemistry(present);
  const notes: string[] = [];
  if (present.length === 0) {
    notes.push(
      "An empty acre has no rhizosphere. Start with a staple tree and a nitrogen fixer whose flavonoids can actually nodulate.",
    );
  }
  if (
    !present.some((s) => {
      const g = getChemistry(s).group;
      return g === "n-fixer-legume" || g === "n-fixer-actinorhizal";
    }) &&
    present.length > 0
  ) {
    notes.push(
      "No biological N-fixer. A legume (genistein / daidzein / luteolin nod-signals) or an actinorhizal tree (alder, Elaeagnus, sea buckthorn) will feed the rest via rhizodeposition and litter — not a fertilizer bag.",
    );
  }
  if (
    !present.some((s) => getChemistry(s).group === "p-mobilizer") &&
    (farm.soil === "clay" || farm.soil === "rocky") &&
    present.length > 0
  ) {
    notes.push(
      "This soil locks phosphorus. White lupin, buckwheat, or another citrate/malate exuder will chelate Fe/Al/Ca and free adsorbed P.",
    );
  }
  if (
    farm.system === "silvopasture" &&
    !present.some((s) => s.kind === "animal")
  ) {
    notes.push(
      "Silvopasture without an animal is just an orchard. Add a grazer or a flock that matches your canopy height.",
    );
  }
  if (
    present.some((s) => s.kind === "animal") &&
    !present.some((s) => s.layer === "canopy" || s.layer === "subcanopy")
  ) {
    notes.push("Livestock in the open miss the point. Trees give shade, hawk cover, and a second yield.");
  }
  if (present.some((s) => getChemistry(s).group === "allelopath") && conflicts.length === 0) {
    notes.push(
      "An allelopathic species is on the acre. That is not automatically a problem — effects are concentration- and SOM-dependent — but keep sensitive neighbors out of the overlapping rhizosphere.",
    );
  }
  if (
    present.some((s) => getChemistry(s).group === "biofumigant") &&
    present.some((s) => getChemistry(s).exudates.some((e) => e.roles.includes("amf-signal")))
  ) {
    notes.push(
      "A glucosinolate brassica and an AMF-dependent plant are both here. Separate them in time (a season) or space, or the isothiocyanates will cut the fungal network.",
    );
  }
  if (
    layersPresent.length >= 5 &&
    functionsPresent.includes("nitrogen-fixer") &&
    functionsPresent.includes("dynamic-accumulator")
  ) {
    notes.push(
      "The stack has complementary chemistry: N signals, mineral return, and enough layers for a litter mix. Time and microbes do the rest.",
    );
  }
  if (farm.system === "alley" && !present.some((s) => s.yearsToYield === 0 && s.kind === "plant")) {
    notes.push(
      "Alley cropping pays rent with annuals while the trees mature. Add a row crop for the first decade.",
    );
  }

  const suggestions = suggestNext(farm, ids, nutrientTotals, functionsPresent, layersPresent);

  const layerScore = Math.min(100, (layersPresent.length / 7) * 100);
  const nutrientScore = Math.min(100, (coveredNutrients.length / ALL_NUTRIENTS.length) * 115);
  const mutualScore = Math.min(
    100,
    synergies.length * 14 - conflicts.length * 18 + (present.length > 2 ? 20 : 0),
  );
  const resilienceBits = [
    functionsPresent.includes("nitrogen-fixer"),
    functionsPresent.includes("water-wise") || farm.water !== "dry",
    functionsPresent.includes("pest-deterrent") || present.some((s) => s.kind === "animal"),
    layersPresent.includes("canopy"),
    layersPresent.includes("groundcover") || layersPresent.includes("herb"),
    present.some((s) => s.yearsToYield <= 1) && present.some((s) => s.yearsToYield >= 5),
    functionsPresent.includes("soil-builder") || functionsPresent.includes("dynamic-accumulator"),
  ].filter(Boolean).length;
  const resilience = Math.round((resilienceBits / 7) * 100);
  const overall = Math.round(
    layerScore * 0.18 +
      nutrientScore * 0.18 +
      Math.max(0, mutualScore) * 0.2 +
      resilience * 0.2 +
      snap.score * 0.24,
  );

  return {
    overall: present.length === 0 ? 0 : Math.max(4, Math.min(100, overall)),
    layers: Math.round(layerScore),
    nutrients: Math.round(Math.min(100, nutrientScore)),
    mutualisms: Math.round(Math.max(0, Math.min(100, mutualScore))),
    resilience,
    chemistry: snap.score,
    chem: snap,
    coveredNutrients,
    missingNutrients,
    nutrientTotals,
    functionsPresent,
    layersPresent,
    conflicts,
    synergies,
    suggestions,
    notes,
  };
}

function describePair(a: string, b: string): string {
  const key = [a, b].sort().join("|");
  const known: Record<string, string> = {
    "apple|chicken":
      "Chickens eat dropped fruit and the larvae inside it. The apple gives shade. Manure returns minerals; it does not inject vitamin C into the tree.",
    "apple|comfrey":
      "Comfrey mines K, Ca, Si from the subsoil. Chop-and-drop returns them after microbes process the mulch — the apple then builds its own antioxidants.",
    "alder|chestnut":
      "Alder (Frankia) nurses the chestnut with rhizodeposited N and fast litter, then is coppiced once the nut tree closes canopy.",
    "chestnut|grape":
      "The chestnut is a living trellis. Grapes take the vertical dimension. Both are AMF hosts — keep brassicas out of this row.",
    "blueberry|chestnut":
      "Blueberries take the acidic, fungal east drip line. Chestnut tannin litter helps keep pH down. Juglone from a nearby walnut would break this.",
    "asparagus|walnut-black":
      "Asparagus tolerates juglone (5-hydroxy-1,4-naphthoquinone). The walnut keeps producing it; the fern simply does not uncouple.",
    "raspberry-black|walnut-black":
      "Black raspberry is juglone-tolerant. Anthocyanins are a harvest trait, not a soil antidote.",
    "olive|paulownia":
      "Paulownia's deep roots skip the olive's surface water and drop a fast leaf mulch. Treat N input as litter quality, not a confirmed nodule.",
    "olive|tomato":
      "Spacing and living pathways, not an olive exudate gift. Tomato is AMF-responsive and juglone-intolerant — fine here, fatal under walnut.",
    "fig|oregano":
      "Herbs outcompete grass under figs. The win is niche occupancy, not a fig-specific allelochemical.",
    "clover-white|honey-locust":
      "Isoflavonoid nod-signals in the clover plus an open N-fixing canopy. Grass persists in the filtered light.",
    "cattle|honey-locust":
      "Pods are the transfer. Cattle loaf in shade; dung returns minerals to the sward.",
    "oak-white|pig":
      "Mast years become pork. Flash-graze so the pigs harvest tannin-rich acorns instead of girdling trees.",
    "chestnut|pig":
      "Pigs finish on chestnut mast and clean weevily nuts.",
    "hazel|truffle":
      "The fungus is the crop. Brassica isothiocyanates in this bed would collapse the partnership.",
    "bee|clover-white":
      "Season-long nectar. The bees pay you back on every rosaceous fruit — pollination, not soil chemistry.",
    "apple|bee":
      "No bees, no apples. Sequence bloom so the hive never starves between locust and chestnut.",
    "chicken|mulberry":
      "Fruit drops for months. Shade, dessert, a cleaned yard.",
    "comfrey|chicken":
      "Chop comfrey into the run. The flock gets minerals; the tree ring gets manure.",
    "buckwheat|lupin-white":
      "Two P-mobilizers. Citrate/malate from both, plus lupin's genistein. Overkill on a rich loam; correct on a P-fixing clay.",
    "clover-white|faba":
      "Stacked nod-signals (genistein, luteolin, formononetin). Useful while trees are young; thin once canopy closes.",
    "corn|faba":
      "The best-documented cereal–legume chemistry: mixed stands exude more flavonoids, shift the microbiome, and lift cereal nutrient content.",
    "eucalyptus|leucaena":
      "The textbook mitigation: leucaena nod-signals and N rhizodeposition keep a floor alive under cineole-rich eucalyptus litter. Mimosine is the other half of the bargain — adapted livestock only.",
    "leucaena|mesquite":
      "Two tropical N-fixers. Luteolin nod-signals plus mesquite citrate on caliche. Watch mimosine if anything tender is in the understory.",
    "eucalyptus|sorghum":
      "Two allelochemicals (1,8-cineole litter, sorgoleone from root hairs). A weed-suppressing alley, not a vegetable row.",
    "chicory|sheep":
      "Sesquiterpene lactones and condensed tannins in the forage are the chemical half of parasite management.",
    "daffodil|apple":
      "Lycorine in the bulb ring keeps voles off the trunk. Not a fertilizer.",
  };
  return (
    known[key] ??
    "Complementary placement — stacked layers or a documented pairing. Check the chemistry panel for named compounds."
  );
}

function suggestNext(
  farm: Farm,
  ids: Set<string>,
  totals: Record<NutrientKey, number>,
  functions: EcoFunction[],
  layers: Layer[],
): Suggestion[] {
  const scored: Suggestion[] = [];
  const present = [...ids].map((id) => SPECIES_BY_ID[id]).filter(Boolean);
  const groups = new Set(present.map((s) => getChemistry(s).group));

  for (const sp of SPECIES) {
    if (ids.has(sp.id)) continue;
    if (!fitsSite(sp.id, farm.zone, farm.soil, farm.water)) continue;
    const chem = getChemistry(sp);

    let score = 10;
    const reasons: string[] = [];

    if (
      (chem.group === "n-fixer-legume" || chem.group === "n-fixer-actinorhizal") &&
      !groups.has("n-fixer-legume") &&
      !groups.has("n-fixer-actinorhizal")
    ) {
      score += 40;
      reasons.push("nod-signals and N rhizodeposition the grove is missing");
    }
    if (chem.group === "p-mobilizer" && !groups.has("p-mobilizer") && (farm.soil === "clay" || farm.soil === "rocky")) {
      score += 28;
      reasons.push("citrate/malate to free locked phosphorus");
    }
    if (chem.group === "dynamic-accumulator" && !groups.has("dynamic-accumulator")) {
      score += 18;
      reasons.push("a mineral miner for chop-and-drop K and Ca");
    }
    if (!layers.includes(sp.layer) && sp.layer !== "fungi") {
      score += 14;
      reasons.push(`you have no ${sp.layer} layer yet`);
    }
    if (farm.system === "silvopasture" && sp.kind === "animal" && !layers.includes("animal")) {
      score += 30;
      reasons.push("silvopasture wants an animal in the shade");
    }
    if (
      farm.system === "silvopasture" &&
      (sp.functions.includes("fodder") || sp.functions.includes("forage"))
    ) {
      score += 12;
      reasons.push("forage for the flock or herd");
    }
    if (farm.system === "alley" && sp.yearsToYield === 0 && sp.kind === "plant") {
      score += 16;
      reasons.push("an alley annual that pays rent while trees grow");
    }

    let nutrientGain = 0;
    for (const [k, v] of Object.entries(sp.nutrients)) {
      if ((totals[k as NutrientKey] ?? 0) < 18 && (v ?? 0) >= 30) {
        nutrientGain += 5;
      }
    }
    if (nutrientGain >= 12) {
      score += Math.min(18, nutrientGain);
      reasons.push("fills holes in the harvest-nutrition map");
    }

    const companionHits = sp.companions.filter((c) => ids.has(c)).length;
    score += companionHits * 10;
    if (companionHits >= 2) reasons.push("already has chemically compatible neighbors");

    const fights = sp.antagonists.filter((c) => ids.has(c)).length;
    score -= fights * 28;
    for (const other of present) {
      if (chemicalConflict(sp, other)) score -= 22;
    }
    if (chem.group === "allelopath" && present.some((s) => chem.sensitiveTo.includes(s.id))) {
      score -= 30;
    }
    if (farm.system === "silvopasture" && !sp.livestockSafe && sp.kind === "plant") {
      score -= 10;
    }

    if (score < 18 || reasons.length === 0) continue;
    scored.push({
      speciesId: sp.id,
      score,
      reason: reasons.slice(0, 2).join("; "),
    });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, 6);
}

const STARTERS: Record<FarmSystem, string[]> = {
  "food-forest": [
    "chestnut",
    "apple",
    "alder",
    "grape",
    "comfrey",
    "clover-white",
    "lupin-white",
    "bean-runner",
    "bee",
  ],
  alley: [
    "olive",
    "paulownia",
    "faba",
    "tomato",
    "basil",
    "clover-white",
    "buckwheat",
  ],
  silvopasture: [
    "honey-locust",
    "chestnut",
    "clover-white",
    "chicory",
    "alfalfa",
    "chicken",
    "sheep",
    "comfrey",
  ],
  polycrop: [
    "walnut-black",
    "asparagus",
    "raspberry-black",
    "currant",
    "onion",
    "comfrey",
  ],
};

const ZONE_SWAPS: { test: (z: number) => boolean; from: string; to: string }[] = [
  { test: (z) => z <= 5, from: "olive", to: "apple" },
  { test: (z) => z <= 5, from: "fig", to: "elderberry" },
  { test: (z) => z <= 5, from: "paulownia", to: "alder" },
  { test: (z) => z <= 4, from: "chestnut", to: "hazel" },
  { test: (z) => z <= 5, from: "lupin-white", to: "buckwheat" },
  { test: (z) => z >= 8, from: "alder", to: "goumi" },
  { test: (z) => z >= 8, from: "apple", to: "fig" },
  { test: (z) => z >= 9, from: "chestnut", to: "mesquite" },
];

export function designOptimalFarm(farm: Farm): Placement[] {
  const region = farmRegion(farm);
  let ids: string[];
  if (region) {
    const g = region.guilds.find((x) => x.system === farm.system) ?? region.guilds[0];
    ids = g ? [...g.members] : [...region.recommended.slice(0, 9)];
    if (!farm.mounds) ids = ids.filter((id) => !region.moundOnly.includes(id) || id === "pecan" || id === "pine");
  } else {
    ids = [...(STARTERS[farm.system] ?? STARTERS["food-forest"])];
    for (const swap of ZONE_SWAPS) {
      if (!swap.test(farm.zone)) continue;
      ids = ids.map((id) => (id === swap.from ? swap.to : id));
    }
    const must = ["clover-white", "comfrey"];
    for (const id of must) {
      if (!ids.includes(id) && fitsSite(id, farm.zone, farm.soil, farm.water)) ids.push(id);
    }
  }
  ids = [...new Set(ids)].filter((id) => {
    if (region && region.recommended.includes(id) && !region.poor.includes(id)) {
      if (region.moundOnly.includes(id) && !farm.mounds) return false;
      return true;
    }
    return fitsSite(id, farm.zone, farm.soil, farm.water);
  });

  const n = Math.min(ids.length, farm.acres >= 5 ? 9 : 7);
  const chosen = ids.slice(0, n);
  return chosen.map((speciesId, i) => {
    const t = chosen.length === 1 ? 0.5 : i / (chosen.length - 1);
    const angle = t * Math.PI * 1.85 + 0.35;
    const r = 16 + (i % 3) * 11;
    return {
      id: uniqueId(),
      speciesId,
      x: Math.min(88, Math.max(12, 50 + Math.cos(angle) * r)),
      z: Math.min(88, Math.max(12, 50 + Math.sin(angle) * r * 0.88)),
      scale: SPECIES_BY_ID[speciesId]?.layer === "canopy" ? 1.15 : 0.9,
    };
  });
}

export function nutrientGroupTotals(totals: Record<NutrientKey, number>) {
  const groups = {
    vitamin: 0,
    mineral: 0,
    antioxidant: 0,
    macro: 0,
  };
  for (const meta of NUTRIENT_META) {
    groups[meta.group] += totals[meta.key] ?? 0;
  }
  return groups;
}
