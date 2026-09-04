export type FarmSystem = "food-forest" | "alley" | "silvopasture" | "polycrop";

export const SYSTEM_HINT: Record<FarmSystem, string> = {
  "food-forest": "A stacked woodland — canopy, fruit, shrubs, vines, and a living floor in one footprint.",
  alley: "Rows of trees with crops grown in the sunny alleys between them.",
  silvopasture: "Trees and livestock on the same land: shade, forage, and manure in one rotation.",
  polycrop: "Mixed crops sharing one bed — often built around a tree that most plants cannot sit under.",
};

export const NUTRIENT_META = [
  { key: "vitaminA", label: "Vitamin A", group: "vitamin" },
  { key: "vitaminC", label: "Vitamin C", group: "vitamin" },
  { key: "vitaminE", label: "Vitamin E", group: "vitamin" },
  { key: "vitaminK", label: "Vitamin K", group: "vitamin" },
  { key: "vitaminD", label: "Vitamin D", group: "vitamin" },
  { key: "thiamin", label: "Thiamin (B1)", group: "vitamin" },
  { key: "riboflavin", label: "Riboflavin (B2)", group: "vitamin" },
  { key: "niacin", label: "Niacin (B3)", group: "vitamin" },
  { key: "pantothenate", label: "Pantothenate (B5)", group: "vitamin" },
  { key: "b6", label: "Vitamin B6", group: "vitamin" },
  { key: "biotin", label: "Biotin (B7)", group: "vitamin" },
  { key: "folate", label: "Folate (B9)", group: "vitamin" },
  { key: "b12", label: "Vitamin B12", group: "vitamin" },
  { key: "choline", label: "Choline", group: "vitamin" },
  { key: "calcium", label: "Calcium", group: "mineral" },
  { key: "phosphorus", label: "Phosphorus", group: "mineral" },
  { key: "magnesium", label: "Magnesium", group: "mineral" },
  { key: "sodium", label: "Sodium", group: "mineral" },
  { key: "potassium", label: "Potassium", group: "mineral" },
  { key: "chloride", label: "Chloride", group: "mineral" },
  { key: "sulfur", label: "Sulfur", group: "mineral" },
  { key: "iron", label: "Iron", group: "mineral" },
  { key: "zinc", label: "Zinc", group: "mineral" },
  { key: "copper", label: "Copper", group: "mineral" },
  { key: "manganese", label: "Manganese", group: "mineral" },
  { key: "iodine", label: "Iodine", group: "mineral" },
  { key: "selenium", label: "Selenium", group: "mineral" },
  { key: "molybdenum", label: "Molybdenum", group: "mineral" },
  { key: "chromium", label: "Chromium", group: "mineral" },
  { key: "cobalt", label: "Cobalt", group: "mineral" },
  { key: "fluoride", label: "Fluoride", group: "mineral" },
  { key: "boron", label: "Boron", group: "mineral" },
  { key: "silicon", label: "Silicon", group: "mineral" },
  { key: "protein", label: "Protein", group: "macro" },
  { key: "essentialAA", label: "Essential amino acids", group: "macro" },
  { key: "leucine", label: "Leucine", group: "macro" },
  { key: "lysine", label: "Lysine", group: "macro" },
  { key: "methionine", label: "Methionine", group: "macro" },
  { key: "tryptophan", label: "Tryptophan", group: "macro" },
  { key: "fiber", label: "Fiber", group: "macro" },
  { key: "solubleFiber", label: "Soluble fiber", group: "macro" },
  { key: "resistantStarch", label: "Resistant starch", group: "macro" },
  { key: "linoleic", label: "Linoleic acid (n-6)", group: "macro" },
  { key: "ala", label: "ALA (plant omega-3)", group: "macro" },
  { key: "omega3", label: "EPA & DHA", group: "macro" },
  { key: "oleic", label: "Oleic acid", group: "macro" },
  { key: "cla", label: "CLA", group: "macro" },
  { key: "polyphenols", label: "Polyphenols", group: "antioxidant" },
  { key: "flavonoids", label: "Flavonoids", group: "antioxidant" },
  { key: "carotenoids", label: "Carotenoids", group: "antioxidant" },
  { key: "anthocyanins", label: "Anthocyanins", group: "antioxidant" },
  { key: "lycopene", label: "Lycopene", group: "antioxidant" },
  { key: "lutein", label: "Lutein & zeaxanthin", group: "antioxidant" },
  { key: "catechins", label: "Catechins", group: "antioxidant" },
  { key: "isoflavones", label: "Isoflavones", group: "antioxidant" },
  { key: "resveratrol", label: "Resveratrol", group: "antioxidant" },
  { key: "lignans", label: "Lignans", group: "antioxidant" },
  { key: "glucosinolates", label: "Glucosinolates", group: "antioxidant" },
  { key: "allicin", label: "Allicin", group: "antioxidant" },
  { key: "phytosterols", label: "Phytosterols", group: "antioxidant" },
  { key: "chlorophyll", label: "Chlorophyll", group: "antioxidant" },
  { key: "saponins", label: "Saponins", group: "antioxidant" },
  { key: "betalains", label: "Betalains", group: "antioxidant" },
] as const;

export type NutrientKey = (typeof NUTRIENT_META)[number]["key"];
export type NutrientGroup = (typeof NUTRIENT_META)[number]["group"];
export type Nutrients = Partial<Record<NutrientKey, number>>;

export interface NutrientGuide {
  key: NutrientKey;
  aka: string;
  role: string;
  human: string;
  mammal: string;
  missing: string;
  harvest: string;
  note?: string;
}

export type Kind = "plant" | "animal" | "fungi";
export type WaterNeed = "dry" | "moderate" | "wet";
export type SunNeed = "full" | "part" | "shade";
export type RootDepth = "shallow" | "medium" | "deep";
export type Soil = "loam" | "sand" | "clay" | "silt" | "rocky";
export type PlantColor = "sage" | "coral" | "mustard" | "ink" | "vine" | "rose" | "bark";
export type Silhouette =
  | "conifer"
  | "canopy"
  | "fruit"
  | "shrub"
  | "vine"
  | "herb"
  | "ground"
  | "tuft"
  | "fungi"
  | "chicken"
  | "duck"
  | "bee"
  | "sheep"
  | "goat"
  | "cow"
  | "pig"
  | "rabbit"
  | "mound"
  | "stump";

export type Layer =
  | "canopy"
  | "subcanopy"
  | "shrub"
  | "vine"
  | "herb"
  | "groundcover"
  | "root"
  | "fungi"
  | "animal";

export const LAYERS: Layer[] = [
  "canopy",
  "subcanopy",
  "shrub",
  "vine",
  "herb",
  "groundcover",
  "root",
  "fungi",
  "animal",
];

export const LAYER_LABEL: Record<Layer, string> = {
  canopy: "Canopy",
  subcanopy: "Subcanopy",
  shrub: "Shrub",
  vine: "Vine",
  herb: "Herb",
  groundcover: "Groundcover",
  root: "Root",
  fungi: "Fungi",
  animal: "Animal",
};

export type EcoFunction =
  | "food"
  | "nitrogen-fixer"
  | "dynamic-accumulator"
  | "nurse"
  | "pest-deterrent"
  | "manure"
  | "soil-builder"
  | "windbreak"
  | "mulch"
  | "pollinator"
  | "forage"
  | "fodder"
  | "timber"
  | "medicine"
  | "coppice"
  | "water-wise"
  | "protein";

export const FUNCTION_LABEL: Record<EcoFunction, string> = {
  food: "Food",
  "nitrogen-fixer": "Nitrogen fixer",
  "dynamic-accumulator": "Dynamic accumulator",
  nurse: "Nurse",
  "pest-deterrent": "Pest deterrent",
  manure: "Manure",
  "soil-builder": "Soil builder",
  windbreak: "Windbreak",
  mulch: "Mulch",
  pollinator: "Pollinator",
  forage: "Forage",
  fodder: "Fodder",
  timber: "Timber",
  medicine: "Medicine",
  coppice: "Coppice",
  "water-wise": "Water-wise",
  protein: "Protein",
};

export interface Species {
  id: string;
  name: string;
  latin: string;
  family: string;
  kind: Kind;
  layer: Layer;
  edible: boolean;
  functions: EcoFunction[];
  hardinessMin: number;
  hardinessMax: number;
  soils: Soil[];
  water: WaterNeed;
  sun: SunNeed;
  root: RootDepth;
  yearsToYield: number;
  companions: string[];
  antagonists: string[];
  allelopathic: boolean;
  livestockSafe: boolean;
  fodderFor: string[];
  nutrients: Nutrients;
  description: string;
  agro: string;
  yields: string;
  color: PlantColor;
  silhouette: Silhouette;
}

export interface Placement {
  id: string;
  speciesId: string;
  x: number;
  z: number;
  scale: number;
  rot?: number;
  plantedYear?: number;
  hostId?: string;
}

export interface Farm {
  id: string;
  name: string;
  zone: number;
  soil: Soil;
  water: WaterNeed;
  acres: number;
  areaSqft: number;
  system: FarmSystem;
  placements: Placement[];
  onboarded: boolean;
  regionId?: string;
  zoning?: string;
  mounds?: boolean;
  prep?: Record<string, boolean>;
}

export type CompoundClass =
  | "organic-acid"
  | "flavonoid"
  | "isoflavonoid"
  | "phenolic-acid"
  | "coumarin"
  | "naphthoquinone"
  | "terpenoid"
  | "strigolactone"
  | "tannin"
  | "saponin"
  | "glucosinolate"
  | "alkaloid"
  | "amino-acid"
  | "sugar"
  | "benzoxazinoid";

export type ReleaseRoute = "root-exudate" | "litter" | "leachate" | "rhizodeposition" | "volatile";

export type ChemRole =
  | "p-mobilizer"
  | "fe-mobilizer"
  | "n-fixation-signal"
  | "n-transfer"
  | "amf-signal"
  | "pgpr-recruit"
  | "pathogen-suppress"
  | "allelopath-inhibit"
  | "allelopath-facilitate"
  | "nitrification-inhibit"
  | "mineral-return"
  | "litter-fast"
  | "litter-slow";

export const CHEM_ROLES: ChemRole[] = [
  "p-mobilizer",
  "fe-mobilizer",
  "n-fixation-signal",
  "n-transfer",
  "amf-signal",
  "pgpr-recruit",
  "pathogen-suppress",
  "allelopath-inhibit",
  "allelopath-facilitate",
  "nitrification-inhibit",
  "mineral-return",
  "litter-fast",
  "litter-slow",
];

export type ChemGroup =
  | "n-fixer-legume"
  | "n-fixer-actinorhizal"
  | "dynamic-accumulator"
  | "allelopath"
  | "facilitator"
  | "p-mobilizer"
  | "amf-host"
  | "biofumigant"
  | "litter-recalcitrant"
  | "fungi"
  | "livestock"
  | "neutral";

export type ChemEvidence = "field" | "mixed" | "lab" | "emerging";

export interface Exudate {
  name: string;
  klass: CompoundClass;
  routes: ReleaseRoute[];
  roles: ChemRole[];
  note: string;
}

export interface Chemistry {
  group: ChemGroup;
  exudates: Exudate[];
  soilEffects: string;
  sensitiveTo: string[];
  evidence: ChemEvidence;
}

export interface ChemSnapshot {
  score: number;
  rolesPresent: ChemRole[];
  rolesMissing: ChemRole[];
  compounds: { name: string; klass: CompoundClass; species: string[] }[];
  mechanisms: string[];
}

export const CHEM_GROUP_LABEL: Record<ChemGroup, string> = {
  "n-fixer-legume": "Legume N-fixer",
  "n-fixer-actinorhizal": "Actinorhizal N-fixer",
  "dynamic-accumulator": "Dynamic accumulator",
  allelopath: "Allelopath",
  facilitator: "Facilitator",
  "p-mobilizer": "P-mobilizer",
  "amf-host": "AMF host",
  biofumigant: "Biofumigant",
  "litter-recalcitrant": "Recalcitrant litter",
  fungi: "Fungal partner",
  livestock: "Livestock",
  neutral: "Neutral",
};

export const CHEM_ROLE_LABEL: Record<ChemRole, string> = {
  "p-mobilizer": "Mobilizes phosphorus",
  "fe-mobilizer": "Mobilizes iron",
  "n-fixation-signal": "Nodulation signal",
  "n-transfer": "Transfers nitrogen",
  "amf-signal": "AMF signal",
  "pgpr-recruit": "Recruits PGPR",
  "pathogen-suppress": "Suppresses pathogens",
  "allelopath-inhibit": "Allelopathic (inhibit)",
  "allelopath-facilitate": "Allelopathic (facilitate)",
  "nitrification-inhibit": "Slows nitrification",
  "mineral-return": "Returns minerals",
  "litter-fast": "Fast litter",
  "litter-slow": "Slow litter",
};

export const COMPOUND_CLASS_LABEL: Record<CompoundClass, string> = {
  "organic-acid": "Organic acid",
  flavonoid: "Flavonoid",
  isoflavonoid: "Isoflavonoid",
  "phenolic-acid": "Phenolic acid",
  coumarin: "Coumarin",
  naphthoquinone: "Naphthoquinone",
  terpenoid: "Terpenoid",
  strigolactone: "Strigolactone",
  tannin: "Tannin",
  saponin: "Saponin",
  glucosinolate: "Glucosinolate",
  alkaloid: "Alkaloid",
  "amino-acid": "Amino acid",
  sugar: "Sugar",
  benzoxazinoid: "Benzoxazinoid",
};

export const RELEASE_LABEL: Record<ReleaseRoute, string> = {
  "root-exudate": "Root exudate",
  litter: "Litter",
  leachate: "Leachate",
  rhizodeposition: "Rhizodeposition",
  volatile: "Volatile",
};

export interface PairNote {
  a: string;
  b: string;
  kind: "conflict" | "mutualism" | "loop";
  title: string;
  detail: string;
}

export interface Suggestion {
  speciesId: string;
  score: number;
  reason: string;
}

export interface FarmScore {
  overall: number;
  layers: number;
  nutrients: number;
  mutualisms: number;
  resilience: number;
  chemistry: number;
  chem: ChemSnapshot;
  coveredNutrients: NutrientKey[];
  missingNutrients: NutrientKey[];
  nutrientTotals: Record<NutrientKey, number>;
  functionsPresent: EcoFunction[];
  layersPresent: Layer[];
  conflicts: PairNote[];
  synergies: PairNote[];
  suggestions: Suggestion[];
  notes: string[];
}
