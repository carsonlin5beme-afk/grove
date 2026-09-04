import type { Farm, FarmSystem, Layer, Soil, Species, WaterNeed } from "./types";
import type { StageId } from "./succession";
import { SPECIES, SPECIES_BY_ID } from "./species";

export type Suit = "good" | "ok" | "mound" | "poor";

export interface RegionZoning {
  id: string;
  name: string;
  note: string;
}

export interface PrepStep {
  id: string;
  title: string;
  body: string;
  years?: string;
}

export interface RegionGuild {
  id: string;
  name: string;
  system: FarmSystem;
  hook: string;
  layers: Partial<Record<Layer, string[]>>;
  members: string[];
  why: string;
  caution: string;
}

export interface Region {
  id: string;
  name: string;
  short: string;
  county: string;
  state: string;
  ready: boolean;
  zone: number;
  zoneLabel: string;
  koppen: string;
  ecoregion: string;
  rainfallIn: [number, number];
  heatDays: string;
  frost: string;
  soilNote: string;
  drainage: string;
  slope: string;
  defaultSoil: Soil;
  defaultWater: WaterNeed;
  defaultSystem: FarmSystem;
  zoning: RegionZoning[];
  agClass: string;
  constraints: string[];
  recommended: string[];
  moundOnly: string[];
  poor: string[];
  guilds: RegionGuild[];
  prep: PrepStep[];
  succession: Record<StageId, { blurb: string; tip: string }>;
}

export const PREP_DEFAULT: Record<string, boolean> = {
  assess: false,
  water: false,
  soil: false,
  pioneer: false,
  productive: false,
  livestock: false,
};

const ZEPHYR_PREP: PrepStep[] = [
  {
    id: "assess",
    title: "Site assessment",
    body: "Soil test (pH, P, micronutrients). Map the wet-season water table after a June rain. Note existing pines, palmetto, and any hardpan. Mark frost pockets — they are rare here, but they kill a mango.",
    years: "Week 0",
  },
  {
    id: "water",
    title: "Water first",
    body: "This land sits on poorly drained marine sands. Swales on contour, rain routing off pads, and raised beds or mounds for anything that hates wet feet. Do not plant avocado or citrus on the flat until this is done.",
    years: "Month 0–2",
  },
  {
    id: "soil",
    title: "Soil building",
    body: "Organic matter on quartz sand is the whole game. Chip, compost, and early nitrogen-fixers (pigeon pea, perennial peanut, sesbania). Correct pH only where blueberries will live. Do not lime the whole acre.",
    years: "Year 0–1",
  },
  {
    id: "pioneer",
    title: "Pioneer wave",
    body: "Plant the canopy and the fixers in the rainy season (June–September). Perennial peanut and sweet potato close the sand. Protect young trunks from rabbits and string trimmer. No livestock on bark.",
    years: "Years 0–3",
  },
  {
    id: "productive",
    title: "Main productive wave",
    body: "Citrus, guava, fig, and vines go in once mounds and drip are real. Avocado and mango only on the driest pads. Train passionfruit on living supports, not the ground.",
    years: "Years 2–8",
  },
  {
    id: "livestock",
    title: "Livestock last",
    body: "Chickens and ducks after trees can take a peck. Sheep or goats only on higher, fenced ground — they will peel a young citrus. Bees from year one.",
    years: "Year 3+",
  },
];

const ZEPHYR_GUILDS: RegionGuild[] = [
  {
    id: "flatwoods-stack",
    name: "Flatwoods food forest",
    system: "food-forest",
    hook: "A Zone 9b stack that lives with a high water table — pecan and pine for height, citrus and guava on mounds, peanut on the sand.",
    layers: {
      canopy: ["pecan", "pine-slash", "avocado"],
      subcanopy: ["citrus", "guava", "fig", "mulberry", "persimmon"],
      shrub: ["pigeon-pea", "elderberry", "blueberry-south"],
      vine: ["passionfruit", "muscadine"],
      groundcover: ["perennial-peanut", "sweet-potato"],
      herb: ["lemongrass", "turmeric"],
      animal: ["chicken", "bee"],
    },
    members: [
      "pecan",
      "pine-slash",
      "oak-live",
      "avocado",
      "citrus",
      "guava",
      "fig",
      "mulberry",
      "pigeon-pea",
      "passionfruit",
      "muscadine",
      "perennial-peanut",
      "sweet-potato",
      "lemongrass",
      "chicken",
      "bee",
    ],
    why: "Pecan, slash pine, and live oak tolerate flatwoods soils. Citrus and avocado sit on mounds. Pigeon pea nurses the first three years. Perennial peanut holds sand that clover cannot. Muscadine, not vinifera.",
    caution: "Avocado and citrus die in a ponded June. Blueberry only with sulfur and pine-bark — the rest of this guild is not acid.",
  },
  {
    id: "wet-silvo",
    name: "High-water silvopasture",
    system: "silvopasture",
    hook: "When the table sits at your boot, plant the wet-tolerant bones and let ducks work the slough.",
    layers: {
      canopy: ["pine-slash", "bamboo-clump", "oak-live", "mulberry"],
      subcanopy: ["elderberry", "loquat"],
      shrub: ["sesbania", "pigeon-pea"],
      groundcover: ["perennial-peanut"],
      herb: ["lemongrass"],
      animal: ["duck", "chicken", "bee"],
    },
    members: ["pine-slash", "bamboo-clump", "oak-live", "mulberry", "elderberry", "loquat", "sesbania", "pigeon-pea", "perennial-peanut", "duck", "chicken", "bee"],
    why: "Slash pine, clumping bamboo, live oak, mulberry, and elderberry shrug at seasonal ponding. Ducks eat slugs in the wet alleys. Sheep stay off this template until the ground is higher.",
    caution: "Do not drop mango or avocado into this guild. Goats will strip bark on anything they can reach.",
  },
  {
    id: "mound-mango",
    name: "Raised-bed mango–citrus",
    system: "alley",
    hook: "Only if you have already built mounds. Heat-loving fruit with a turmeric floor.",
    layers: {
      canopy: ["mango", "avocado"],
      subcanopy: ["citrus", "longan", "feijoa", "loquat"],
      shrub: ["pineapple", "pigeon-pea"],
      vine: ["passionfruit", "chayote", "muscadine"],
      herb: ["turmeric", "ginger", "lemongrass"],
      groundcover: ["sweet-potato"],
      animal: ["bee"],
    },
    members: ["mango", "avocado", "citrus", "longan", "feijoa", "pineapple", "passionfruit", "chayote", "muscadine", "turmeric", "ginger", "lemongrass", "bee"],
    why: "Mango, longan, and avocado want the heat units Pasco actually has — and they want their roots out of the summer water table.",
    caution: "Refuse this guild until mounds (or berms) are marked on the acre. One wet June will take a mango on the flat.",
  },
];

export const REGIONS: Region[] = [
  {
    id: "zephyrhills",
    name: "Zephyrhills / Pasco County",
    short: "Zephyrhills",
    county: "Pasco",
    state: "Florida",
    ready: true,
    zone: 9,
    zoneLabel: "9b",
    koppen: "Cfa — humid subtropical",
    ecoregion: "Southwestern Florida Flatwoods",
    rainfallIn: [52, 57],
    heatDays: "151–180 days above 86°F",
    frost: "Rare. Average annual extreme minimum 25–30°F.",
    soilNote:
      "Poorly to very poorly drained sandy and loamy marine sediments. High water tables and seasonal ponding are normal, not a surprise.",
    drainage: "Poor to very poor. Raised beds or mounds for any species that hates wet feet.",
    slope: "Flat to very gentle (<2%). Water has nowhere to run unless you give it a path.",
    defaultSoil: "sand",
    defaultWater: "wet",
    defaultSystem: "food-forest",
    zoning: [
      { id: "A-C", name: "A-C Agricultural", note: "General agricultural district. Crops, groves, and livestock by right in most cases." },
      { id: "AC-1", name: "AC-1", note: "Agricultural conservation. Check lot size and clearing limits before you mound at scale." },
      { id: "A-R", name: "A-R Agricultural-Residential", note: "Ag with a house. Animals and groves are expected; intensity is capped." },
      { id: "AR-1", name: "AR-1", note: "One-acre agricultural-residential. Fine for a food forest and a small flock." },
      { id: "AR-5", name: "AR-5", note: "Five-acre floor. Room for a real silvopasture rotation." },
      { id: "AR-5MH", name: "AR-5MH", note: "Same acreage idea with manufactured-home language. Ag use is still the question, not the house type." },
    ],
    agClass:
      "Florida Statute 193.461 — agricultural classification is not the same as zoning. You apply with the property appraiser between January 1 and March 1, and you must show bona fide commercial agricultural use. A pretty grove is not automatically a classified grove.",
    constraints: [
      "High water table / seasonal ponding",
      "Quartz sand, low organic matter",
      "Heat load, not winter, is the limiter",
      "Low chill hours — temperate fruit fails",
      "Zoning ≠ greenbelt tax class",
    ],
    recommended: [
      "pecan",
      "pine-slash",
      "oak-live",
      "bamboo-clump",
      "avocado",
      "mango",
      "citrus",
      "guava",
      "feijoa",
      "loquat",
      "fig",
      "mulberry",
      "persimmon",
      "pigeon-pea",
      "sesbania",
      "perennial-peanut",
      "leucaena",
      "blueberry-south",
      "blackberry",
      "elderberry",
      "cassava",
      "pineapple",
      "passionfruit",
      "chayote",
      "malabar-spinach",
      "muscadine",
      "sweet-potato",
      "lemongrass",
      "turmeric",
      "ginger",
      "jujube",
      "pomegranate",
      "chicken",
      "duck",
      "bee",
      "sheep",
      "goat",
    ],
    moundOnly: [
      "avocado",
      "mango",
      "longan",
      "lychee",
      "citrus",
      "pineapple",
      "feijoa",
      "loquat",
      "blueberry",
      "olive",
    ],
    poor: [
      "chestnut",
      "apple",
      "pear",
      "peach",
      "cherry",
      "plum",
      "hazel",
      "walnut-black",
      "walnut-english",
      "alder",
      "oak-white",
      "pine",
      "bamboo",
      "grape",
      "kiwi",
      "blueberry",
      "serviceberry",
      "currant",
      "gooseberry",
      "asparagus",
      "comfrey",
      "sunchoke",
      "daffodil",
      "maple",
      "truffle",
      "alpaca",
      "inga",
    ],
    guilds: ZEPHYR_GUILDS,
    prep: ZEPHYR_PREP,
    succession: {
      pioneer: {
        blurb: "Rainy-season sticks. The work is drainage, peanut, and pigeon pea — not fruit.",
        tip: "Plant into June–September moisture. Mound anything tender. No hooves on bark. Bees are fine now.",
      },
      early: {
        blurb: "Pigeon pea is a thicket. Citrus and guava take. The sand is finally covered.",
        tip: "Chop pigeon pea onto the mounds. Train passionfruit. Do not expect mango calories. Keep the flock off trunks.",
      },
      mid: {
        blurb: "Avocado and citrus pay if the mounds held. Heat, not frost, writes the year.",
        tip: "Thin nurses. Keep the floor in peanut and sweet potato, not clover. Livestock only on the high pads.",
      },
      mature: {
        blurb: "A humid forest. Shade is the crop under the pecan. Annuals only in the alleys you keep open.",
        tip: "Replant gaps with loquat and ginger, not apple. Sheep on the dry edge. Ducks in the slough.",
      },
    },
  },
  {
    id: "north-florida",
    name: "North Florida",
    short: "North Florida",
    county: "—",
    state: "Florida",
    ready: false,
    zone: 8,
    zoneLabel: "8b–9a",
    koppen: "Cfa",
    ecoregion: "Eastern Florida Flatwoods / Tallahassee Hills",
    rainfallIn: [50, 58],
    heatDays: "High, with more frost than Pasco",
    frost: "Regular light frost. Mango is a gamble.",
    soilNote: "More clay and hardpan in the north. Still wet in the flats.",
    drainage: "Variable. Still plan for water.",
    slope: "Flats and gentle hills.",
    defaultSoil: "sand",
    defaultWater: "wet",
    defaultSystem: "food-forest",
    zoning: [],
    agClass: "Same 193.461 calendar. County appraiser rules differ.",
    constraints: ["More frost than Pasco", "Still a water-table story in the flats"],
    recommended: ["pecan", "fig", "persimmon", "mulberry", "blueberry", "pine"],
    moundOnly: ["citrus", "avocado"],
    poor: ["mango", "lychee", "longan"],
    guilds: [],
    prep: ZEPHYR_PREP,
    succession: {
      pioneer: { blurb: "Coming next.", tip: "Use Zephyrhills as the working template for now." },
      early: { blurb: "Coming next.", tip: "" },
      mid: { blurb: "Coming next.", tip: "" },
      mature: { blurb: "Coming next.", tip: "" },
    },
  },
  {
    id: "south-florida",
    name: "South Florida",
    short: "South Florida",
    county: "—",
    state: "Florida",
    ready: false,
    zone: 10,
    zoneLabel: "10a–11",
    koppen: "Aw / Am",
    ecoregion: "Southern Florida Coastal Plain",
    rainfallIn: [50, 65],
    heatDays: "Nearly year-round",
    frost: "Almost none on the coast.",
    soilNote: "Calcareous rock, marl, and wet organics. Different chemistry than Pasco sand.",
    drainage: "Rock and marl, or slough. Not Zephyrhills.",
    slope: "Flat.",
    defaultSoil: "sand",
    defaultWater: "wet",
    defaultSystem: "food-forest",
    zoning: [],
    agClass: "Same statute, different county.",
    constraints: ["Calcareous soils", "Hurricane wind", "Almost no chill"],
    recommended: ["mango", "avocado", "lychee", "longan", "citrus"],
    moundOnly: [],
    poor: ["apple", "pecan", "blueberry"],
    guilds: [],
    prep: ZEPHYR_PREP,
    succession: {
      pioneer: { blurb: "Coming next.", tip: "Start in Zephyrhills — the first fully mapped region." },
      early: { blurb: "Coming next.", tip: "" },
      mid: { blurb: "Coming next.", tip: "" },
      mature: { blurb: "Coming next.", tip: "" },
    },
  },
];

export const REGIONS_BY_ID: Record<string, Region> = Object.fromEntries(REGIONS.map((r) => [r.id, r]));

export const DEFAULT_REGION_ID = "zephyrhills";

export function getRegion(id?: string | null): Region | undefined {
  if (!id) return undefined;
  return REGIONS_BY_ID[id];
}

export function farmRegion(farm: Farm): Region | undefined {
  return getRegion(farm.regionId);
}

export function applyRegion(farm: Farm, region: Region, extras?: Partial<Farm>): Farm {
  return {
    ...farm,
    regionId: region.id,
    zone: region.zone,
    soil: region.defaultSoil,
    water: region.defaultWater,
    system: extras?.system ?? farm.system ?? region.defaultSystem,
    zoning: extras?.zoning ?? farm.zoning ?? region.zoning[0]?.id,
    mounds: extras?.mounds ?? farm.mounds ?? false,
    prep: extras?.prep ?? farm.prep ?? { ...PREP_DEFAULT },
    name: extras?.name ?? farm.name,
  };
}

export function suitFor(
  sp: Species,
  region: Region,
  mounds: boolean,
): { suit: Suit; why: string } {
  if (region.poor.includes(sp.id)) {
    return { suit: "poor", why: "This climate will not carry it — chill, heat, or disease." };
  }
  if (region.moundOnly.includes(sp.id) && !mounds) {
    return { suit: "mound", why: "Only on a raised bed or mound. The summer water table will take it on the flat." };
  }
  if (region.moundOnly.includes(sp.id) && mounds) {
    return { suit: "ok", why: "Tolerated on the mounds you marked." };
  }
  if (region.recommended.includes(sp.id)) {
    return { suit: "good", why: "Fits this ecoregion when water is managed." };
  }
  if (sp.hardinessMax < region.zone - 1) {
    return { suit: "poor", why: "Runs out of winter — this is a cooler-climate plant." };
  }
  if (sp.hardinessMin > region.zone + 1) {
    return { suit: "poor", why: "Wants more heat or less frost than this station gives." };
  }
  if (sp.water === "dry" && region.defaultWater === "wet") {
    return { suit: "mound", why: "Mediterranean or arid roots on a wet sand. Mound it or skip it." };
  }
  return { suit: "ok", why: "Possible, not preferred. Check drainage and heat." };
}

export function canPlace(sp: Species, farm: Farm): { ok: boolean; why: string; suit: Suit } {
  const region = farmRegion(farm);
  if (!region) return { ok: true, why: "", suit: "ok" };
  const { suit, why } = suitFor(sp, region, !!farm.mounds);
  if (suit === "poor") return { ok: false, why, suit };
  if (suit === "mound") return { ok: false, why, suit };
  return { ok: true, why, suit };
}

export function regionSpecies(region: Region, includePoor = false): Species[] {
  return SPECIES.filter((sp) => {
    if (region.poor.includes(sp.id)) return includePoor;
    if (region.recommended.includes(sp.id)) return true;
    return includePoor && sp.hardinessMin <= region.zone + 1 && sp.hardinessMax >= region.zone - 1;
  });
}

export function membersOf(guild: RegionGuild): Species[] {
  return guild.members.map((id) => SPECIES_BY_ID[id]).filter(Boolean);
}
