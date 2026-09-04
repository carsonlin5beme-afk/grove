import type { Species } from "./types";
import { SPECIES_BY_ID } from "./species";

export type Habit =
  | "oak"
  | "round"
  | "vase"
  | "column"
  | "weeping"
  | "conifer"
  | "cedar"
  | "palm"
  | "multi"
  | "shrub"
  | "cane"
  | "herb"
  | "spike"
  | "rosette"
  | "vine"
  | "grass"
  | "fungi"
  | "animal";

export type FruitKind = "none" | "apple" | "berry" | "nut" | "bur" | "pod" | "cone" | "citrus" | "fig" | "stone";

export interface PlantForm {
  habit: Habit;
  height: number;
  canopy: number;
  trunk: number;
  bark: string;
  leaf: string;
  leafDeep: string;
  fruitKind: FruitKind;
  fruitColor: string;
  fruitCount: number;
  flowerColor?: string;
  animal?: string;
}

const HEX: Record<string, { leaf: string; deep: string; bark: string }> = {
  sage: { leaf: "#7BA88A", deep: "#5E8C6E", bark: "#8A7A5A" },
  coral: { leaf: "#D08A7C", deep: "#B56A5E", bark: "#8A6A58" },
  mustard: { leaf: "#D4A24C", deep: "#B8862E", bark: "#8A6A40" },
  ink: { leaf: "#5C5348", deep: "#3A3228", bark: "#4A4034" },
  vine: { leaf: "#8AA8A0", deep: "#6A8880", bark: "#7A6A50" },
  rose: { leaf: "#E0A89E", deep: "#C97B6E", bark: "#8A6A58" },
  bark: { leaf: "#C4A06A", deep: "#A08048", bark: "#8A6A40" },
};

const OVERRIDES: Record<string, Partial<PlantForm>> = {
  chestnut: { habit: "oak", height: 1.9, canopy: 1.4, trunk: 1.15, leaf: "#6F9A6E", leafDeep: "#4E7A4E", fruitKind: "bur", fruitColor: "#C4A06A", fruitCount: 5 },
  apple: { habit: "round", height: 1.2, canopy: 1.15, leaf: "#6A9A5E", leafDeep: "#4A7A44", fruitKind: "apple", fruitColor: "#C45A4A", fruitCount: 10 },
  peach: { habit: "round", height: 1.1, canopy: 1.0, leaf: "#6F9A58", leafDeep: "#4E7A40", fruitKind: "stone", fruitColor: "#E8A07A", fruitCount: 6, flowerColor: "#E8B8C4" },
  plum: { habit: "round", height: 1.1, canopy: 0.95, leaf: "#5E8A52", fruitKind: "stone", fruitColor: "#6A3A6A", fruitCount: 7, flowerColor: "#F0D8E4" },
  cherry: { habit: "round", height: 1.05, canopy: 0.95, leaf: "#5A8A50", fruitKind: "berry", fruitColor: "#B03A3A", fruitCount: 10, flowerColor: "#F2D6DC" },
  persimmon: { habit: "round", height: 1.25, canopy: 1.05, leaf: "#7A9A62", fruitKind: "apple", fruitColor: "#E07A3A", fruitCount: 6 },
  "walnut-black": { habit: "vase", height: 2.0, canopy: 1.45, trunk: 1.2, leaf: "#5A7A54", leafDeep: "#3E5A3A", fruitKind: "nut", fruitColor: "#6A4A28", fruitCount: 6 },
  "walnut-english": { habit: "vase", height: 1.85, canopy: 1.35, trunk: 1.1, leaf: "#678A60", leafDeep: "#4A6A44", fruitKind: "nut", fruitColor: "#8A6A40", fruitCount: 6 },
  pecan: { habit: "vase", height: 1.95, canopy: 1.25, trunk: 1.05, leaf: "#6A8B5E", fruitKind: "nut", fruitColor: "#A07840", fruitCount: 7 },
  hazel: { habit: "multi", height: 0.85, canopy: 0.95, fruitKind: "nut", fruitColor: "#C4A06A", fruitCount: 5, flowerColor: "#D4C48A" },
  "oak-white": { habit: "oak", height: 2.05, canopy: 1.55, trunk: 1.3, leaf: "#6B8F62", leafDeep: "#4A6A44", fruitKind: "nut", fruitColor: "#8A6A40", fruitCount: 4 },
  alder: { habit: "column", height: 1.55, canopy: 0.85, leaf: "#6A8A6A", fruitKind: "cone", fruitColor: "#6A5A40", fruitCount: 6 },
  "black-locust": { habit: "vase", height: 1.7, canopy: 1.1, leaf: "#7BA86A", flowerColor: "#F2EDE0", fruitKind: "pod", fruitColor: "#6A5A38", fruitCount: 5 },
  "honey-locust": { habit: "vase", height: 1.75, canopy: 1.2, leaf: "#8BB86E", fruitKind: "pod", fruitColor: "#C4A04A", fruitCount: 5 },
  paulownia: { habit: "column", height: 1.8, canopy: 1.25, leaf: "#8FBF9A", leafDeep: "#6A9A7A", flowerColor: "#C4A8B8" },
  olive: { habit: "multi", height: 1.05, canopy: 1.0, leaf: "#A8B89A", leafDeep: "#7A8A70", bark: "#6A5A48", fruitKind: "berry", fruitColor: "#3A3A32", fruitCount: 9 },
  fig: { habit: "multi", height: 1.1, canopy: 1.15, leaf: "#5E8A58", leafDeep: "#3E6A3A", fruitKind: "fig", fruitColor: "#6B3A5A", fruitCount: 6 },
  mulberry: { habit: "round", height: 1.2, canopy: 1.15, leaf: "#6A8A5A", fruitKind: "berry", fruitColor: "#4A2A3A", fruitCount: 10 },
  pear: { habit: "column", height: 1.25, canopy: 0.9, leaf: "#7BA88A", fruitKind: "apple", fruitColor: "#C4C46A", fruitCount: 6 },
  pawpaw: { habit: "column", height: 1.2, canopy: 0.85, leaf: "#6A8A58", fruitKind: "stone", fruitColor: "#C4A04A", fruitCount: 4 },
  serviceberry: { habit: "shrub", height: 0.8, fruitKind: "berry", fruitColor: "#4A3A4A", fruitCount: 8, flowerColor: "#F4EEE4" },
  elderberry: { habit: "multi", height: 0.9, leaf: "#5C6A58", fruitKind: "berry", fruitColor: "#2A2230", fruitCount: 12 },
  blueberry: { habit: "shrub", height: 0.55, leaf: "#5A7A62", fruitKind: "berry", fruitColor: "#3A4A7A", fruitCount: 10 },
  raspberry: { habit: "cane", height: 0.65, fruitKind: "berry", fruitColor: "#C45A5A", fruitCount: 8 },
  "raspberry-black": { habit: "cane", height: 0.65, fruitKind: "berry", fruitColor: "#2A2218", fruitCount: 8 },
  blackberry: { habit: "cane", height: 0.7, fruitKind: "berry", fruitColor: "#1A1814", fruitCount: 8 },
  currant: { habit: "shrub", height: 0.55, fruitKind: "berry", fruitColor: "#2A1820", fruitCount: 9 },
  gooseberry: { habit: "shrub", height: 0.5, fruitKind: "berry", fruitColor: "#8AAA5A", fruitCount: 7 },
  aronia: { habit: "shrub", height: 0.7, fruitKind: "berry", fruitColor: "#1A1818", fruitCount: 9 },
  "sea-buckthorn": { habit: "shrub", height: 0.7, leaf: "#C4B06A", fruitKind: "berry", fruitColor: "#E07A20", fruitCount: 12 },
  goumi: { habit: "shrub", height: 0.65, fruitKind: "berry", fruitColor: "#C45A4A", fruitCount: 8 },
  "autumn-olive": { habit: "shrub", height: 0.75, fruitKind: "berry", fruitColor: "#C45A3A", fruitCount: 9 },
  grape: { habit: "vine", height: 0.95, fruitKind: "berry", fruitColor: "#4A2A5A", fruitCount: 8 },
  kiwi: { habit: "vine", height: 0.9, fruitKind: "berry", fruitColor: "#8AAA4A", fruitCount: 5 },
  hops: { habit: "vine", height: 1.0, fruitKind: "cone", fruitColor: "#C4C46A", fruitCount: 7 },
  "bean-runner": { habit: "vine", height: 0.85, fruitKind: "pod", fruitColor: "#6A8A40", fruitCount: 5, flowerColor: "#C45A4A" },
  nasturtium: { habit: "vine", height: 0.45, fruitKind: "none", flowerColor: "#E07A20" },
  asparagus: { habit: "spike", height: 0.7, leaf: "#7BA86A" },
  comfrey: { habit: "rosette", height: 0.5, leaf: "#5E8C6E", flowerColor: "#8A8AAA" },
  nettle: { habit: "herb", height: 0.5, leaf: "#4E7A54" },
  yarrow: { habit: "herb", height: 0.45, flowerColor: "#F2E6C4" },
  echinacea: { habit: "spike", height: 0.6, flowerColor: "#C45A6A" },
  borage: { habit: "herb", height: 0.5, flowerColor: "#6A8AAA" },
  oregano: { habit: "herb", height: 0.28, leaf: "#6A8A62" },
  thyme: { habit: "herb", height: 0.22, leaf: "#6A8A6A" },
  rosemary: { habit: "shrub", height: 0.5, leaf: "#5A7A62" },
  lavender: { habit: "spike", height: 0.45, leaf: "#8A9A7A", flowerColor: "#8A8AAA" },
  mint: { habit: "herb", height: 0.32, leaf: "#5A8A6A" },
  sage: { habit: "shrub", height: 0.4, leaf: "#8AAA8A" },
  "clover-white": { habit: "herb", height: 0.16, flowerColor: "#F4EEE4" },
  "clover-red": { habit: "herb", height: 0.28, flowerColor: "#B04A5A" },
  strawberry: { habit: "rosette", height: 0.18, fruitKind: "berry", fruitColor: "#C43A3A", fruitCount: 4 },
  daikon: { habit: "rosette", height: 0.3, leaf: "#6A8A58" },
  sunchoke: { habit: "spike", height: 0.85, flowerColor: "#E0B040" },
  garlic: { habit: "spike", height: 0.35, leaf: "#7BA86A" },
  onion: { habit: "spike", height: 0.32, leaf: "#7BA86A" },
  tomato: { habit: "herb", height: 0.55, fruitKind: "apple", fruitColor: "#C43A2A", fruitCount: 5 },
  eggplant: { habit: "herb", height: 0.55, fruitKind: "apple", fruitColor: "#4A2A5A", fruitCount: 3 },
  squash: { habit: "vine", height: 0.28, fruitKind: "apple", fruitColor: "#D4A24C", fruitCount: 2 },
  corn: { habit: "grass", height: 0.95, leaf: "#7BA85A", fruitKind: "none" },
  sunflower: { habit: "spike", height: 1.05, flowerColor: "#E0B040" },
  buckwheat: { habit: "herb", height: 0.4, flowerColor: "#F2E6E8" },
  rye: { habit: "grass", height: 0.55 },
  basil: { habit: "herb", height: 0.32, leaf: "#4E7A4A" },
  willow: { habit: "weeping", height: 1.7, canopy: 1.15, leaf: "#8AAA7A" },
  pine: { habit: "conifer", height: 2.1, canopy: 0.85, leaf: "#4A6B52", leafDeep: "#2E4A36", fruitKind: "cone", fruitColor: "#8A6A40", fruitCount: 5 },
  cedar: { habit: "cedar", height: 1.85, canopy: 0.7, leaf: "#3D4A40", leafDeep: "#2A322C" },
  maple: { habit: "oak", height: 1.9, canopy: 1.4, leaf: "#8B9A6A", leafDeep: "#C97B6E", fruitKind: "none" },
  bamboo: { habit: "palm", height: 1.7, canopy: 0.7, leaf: "#6A9A62", bark: "#C4C48A" },
  pomegranate: { habit: "multi", height: 0.85, fruitKind: "apple", fruitColor: "#B03A3A", fruitCount: 5 },
  jujube: { habit: "round", height: 1.05, fruitKind: "stone", fruitColor: "#8A3A28", fruitCount: 7 },
  mesquite: { habit: "vase", height: 1.35, canopy: 1.2, leaf: "#A8B06A", fruitKind: "pod", fruitColor: "#C4A06A", fruitCount: 5 },
  switchgrass: { habit: "grass", height: 0.7 },
  chicory: { habit: "spike", height: 0.55, flowerColor: "#6A7AAA" },
  "plantain-forage": { habit: "rosette", height: 0.22 },
  daffodil: { habit: "spike", height: 0.32, flowerColor: "#E8C84A" },
  rhubarb: { habit: "rosette", height: 0.4, leaf: "#4E7A4E", bark: "#C45A4A" },
  horseradish: { habit: "rosette", height: 0.35, leaf: "#5E8A58" },
  fennel: { habit: "herb", height: 0.7, leaf: "#8AAA6A", flowerColor: "#E8C84A" },
  calendula: { habit: "herb", height: 0.32, flowerColor: "#E07A20" },
  vetch: { habit: "vine", height: 0.4, flowerColor: "#8A6A9A" },
  lupin: { habit: "spike", height: 0.55, flowerColor: "#5A6A9A" },
  "lupin-white": { habit: "spike", height: 0.55, flowerColor: "#F2EDE0" },
  faba: { habit: "herb", height: 0.55, fruitKind: "pod", fruitColor: "#6A7A40", fruitCount: 4 },
  alfalfa: { habit: "herb", height: 0.4, flowerColor: "#8A6A8A" },
  sorghum: { habit: "grass", height: 0.95, fruitKind: "berry", fruitColor: "#8A4A28", fruitCount: 4 },
  mustard: { habit: "herb", height: 0.45, flowerColor: "#E0B040" },
  dandelion: { habit: "rosette", height: 0.22, flowerColor: "#E0B040" },
  leucaena: { habit: "column", height: 1.55, canopy: 0.95, leaf: "#7BA86A", fruitKind: "pod", fruitColor: "#8A7A40", fruitCount: 5 },
  eucalyptus: { habit: "column", height: 2.15, canopy: 1.05, leaf: "#8AAA9A", leafDeep: "#6A8A7A", bark: "#C4B49A" },
  shiitake: { habit: "fungi", height: 0.18, leaf: "#C4A06A", leafDeep: "#6A4A28" },
  winecap: { habit: "fungi", height: 0.2, leaf: "#C45A4A", leafDeep: "#8A3A28" },
  truffle: { habit: "fungi", height: 0.1, leaf: "#3A3228", leafDeep: "#2A2218" },
  morel: { habit: "fungi", height: 0.16, leaf: "#8A6A40", leafDeep: "#6A4A28" },
  chicken: { habit: "animal", height: 0.28, animal: "chicken", leaf: "#C9A06A" },
  duck: { habit: "animal", height: 0.26, animal: "duck", leaf: "#4A5560" },
  goose: { habit: "animal", height: 0.34, animal: "duck", leaf: "#C4C4B8" },
  turkey: { habit: "animal", height: 0.38, animal: "chicken", leaf: "#8A6A40" },
  guinea: { habit: "animal", height: 0.28, animal: "chicken", leaf: "#3A3A38" },
  sheep: { habit: "animal", height: 0.42, animal: "sheep", leaf: "#E8DCC8" },
  goat: { habit: "animal", height: 0.44, animal: "goat", leaf: "#C4A06A" },
  cattle: { habit: "animal", height: 0.62, animal: "cow", leaf: "#5C5348" },
  pig: { habit: "animal", height: 0.36, animal: "pig", leaf: "#E0A89E" },
  rabbit: { habit: "animal", height: 0.22, animal: "rabbit", leaf: "#C4B49A" },
  bee: { habit: "animal", height: 0.12, animal: "bee", leaf: "#D4A24C" },
  avocado: { habit: "oak", height: 1.7, canopy: 1.2, leaf: "#4A7A4A", leafDeep: "#2E5A32", bark: "#5A4A38" },
  mango: { habit: "vase", height: 1.75, canopy: 1.15, leaf: "#3A6A38", leafDeep: "#2A4A28", bark: "#6A5A40", fruitKind: "stone", fruitColor: "#D4A24C", fruitCount: 4 },
  citrus: { habit: "round", height: 1.15, canopy: 1.05, leaf: "#5A8A3A", fruitKind: "citrus", fruitColor: "#E0A020", fruitCount: 7 },
  guava: { habit: "round", height: 1.05, canopy: 0.95, leaf: "#6A9A4A", fruitColor: "#D08080", fruitCount: 5 },
  "pigeon-pea": { habit: "shrub", height: 0.95, canopy: 0.7, leaf: "#7BA86A", fruitKind: "pod", fruitCount: 6 },
  "perennial-peanut": { habit: "herb", height: 0.16, leaf: "#6A9A48" },
  passionfruit: { habit: "vine", height: 1.1, leaf: "#4A7A40" },
  pineapple: { habit: "herb", height: 0.38, leaf: "#7BA86A", fruitColor: "#D4A24C", fruitCount: 1 },
  "sweet-potato": { habit: "herb", height: 0.14, leaf: "#5A8A48" },
  lemongrass: { habit: "grass", height: 0.55, leaf: "#B8C86A" },
  turmeric: { habit: "herb", height: 0.42, leaf: "#5A8A40" },
  ginger: { habit: "herb", height: 0.4, leaf: "#4A7A38" },
  alpaca: { habit: "animal", height: 0.55, animal: "sheep", leaf: "#C4B49A" },
};

function habitFromSpecies(sp: Species): Habit {
  if (sp.kind === "animal") return "animal";
  if (sp.kind === "fungi" || sp.layer === "fungi") return "fungi";
  if (sp.silhouette === "conifer") return "conifer";
  if (sp.silhouette === "vine" || sp.layer === "vine") return "vine";
  if (sp.layer === "groundcover") return "herb";
  if (sp.layer === "herb" || sp.layer === "root") return "herb";
  if (sp.layer === "shrub") return "shrub";
  if (sp.family === "Fagaceae") return "oak";
  if (sp.family === "Juglandaceae") return "vase";
  if (sp.family === "Pinaceae" || sp.family === "Cupressaceae") return "conifer";
  if (sp.layer === "canopy") return "oak";
  if (sp.layer === "subcanopy") return "round";
  return "shrub";
}

function heightFromLayer(sp: Species): number {
  switch (sp.layer) {
    case "canopy":
      return 1.85;
    case "subcanopy":
      return 1.15;
    case "shrub":
      return 0.7;
    case "vine":
      return 0.85;
    case "herb":
      return 0.4;
    case "groundcover":
      return 0.18;
    case "root":
      return 0.3;
    case "fungi":
      return 0.16;
    case "animal":
      return 0.35;
    default:
      return 0.8;
  }
}

export function getForm(species: Species): PlantForm {
  const pal = HEX[species.color] ?? HEX.sage;
  const over = OVERRIDES[species.id] ?? {};
  return {
    habit: over.habit ?? habitFromSpecies(species),
    height: over.height ?? heightFromLayer(species),
    canopy: over.canopy ?? (species.layer === "canopy" ? 1.3 : species.layer === "subcanopy" ? 1.0 : 0.75),
    trunk: over.trunk ?? (species.layer === "canopy" ? 1.1 : 0.85),
    bark: over.bark ?? pal.bark,
    leaf: over.leaf ?? pal.leaf,
    leafDeep: over.leafDeep ?? pal.deep,
    fruitKind: over.fruitKind ?? "none",
    fruitColor: over.fruitColor ?? "#C45A4A",
    fruitCount: over.fruitCount ?? 0,
    flowerColor: over.flowerColor,
    animal: over.animal,
  };
}

export function getFormById(id: string): PlantForm | null {
  const sp = SPECIES_BY_ID[id];
  return sp ? getForm(sp) : null;
}

export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296;
}
