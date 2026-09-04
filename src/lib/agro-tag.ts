import type { EcoFunction, Species } from "./types";

const ECO: EcoFunction[] = [
  "nitrogen-fixer",
  "dynamic-accumulator",
  "nurse",
  "pest-deterrent",
  "manure",
  "soil-builder",
  "windbreak",
  "mulch",
  "pollinator",
  "forage",
  "fodder",
  "timber",
  "medicine",
  "coppice",
  "water-wise",
];

const ROLE: Record<EcoFunction, string> = {
  food: "Harvest crop",
  "nitrogen-fixer": "Nitrogen fixer",
  "dynamic-accumulator": "Mineral mine",
  mulch: "Mulch engine",
  "pest-deterrent": "Pest guard",
  pollinator: "Pollinator draw",
  fodder: "Fodder tree",
  timber: "Timber",
  medicine: "Medicine",
  nurse: "Nurse plant",
  windbreak: "Windbreak",
  forage: "Forage",
  "soil-builder": "Soil builder",
  "water-wise": "Drought hold",
  coppice: "Coppice wood",
  protein: "Protein",
  manure: "Manure loop",
};

const BENEFIT: Record<EcoFunction, string> = {
  food: "The harvest you eat from this layer",
  "nitrogen-fixer": "Feeds neighbors from the air",
  "dynamic-accumulator": "Lifts minerals, returns them as mulch",
  mulch: "Chop-and-drop biomass for the floor",
  "pest-deterrent": "Keeps chew-holes off the cash crop",
  pollinator: "Brings the insects that set fruit",
  fodder: "Feeds the animals that feed you",
  timber: "Nuts plus long wood — posts, fuel, veneer",
  medicine: "A dispensary on the hedge",
  nurse: "Shelters young trees until they stand",
  windbreak: "Takes the wind so the rest can grow",
  forage: "The sward the herd actually eats",
  "soil-builder": "Builds structure and life in the topsoil",
  "water-wise": "Holds a dry site without a hose",
  coppice: "Cut it, it returns — wood on a cycle",
  protein: "Complete protein on the acre",
  manure: "Closes the mineral loop",
};

const JOB: EcoFunction[] = [
  "nitrogen-fixer",
  "dynamic-accumulator",
  "nurse",
  "pest-deterrent",
  "manure",
  "soil-builder",
  "windbreak",
  "mulch",
];

function layerFoodRole(sp: Species): string {
  switch (sp.layer) {
    case "canopy":
      return "Calorie canopy";
    case "subcanopy":
      return "Fruit layer";
    case "shrub":
      return "Shrub crop";
    case "vine":
      return "Climbing crop";
    case "herb":
      return "Herb harvest";
    case "groundcover":
      return "Edible carpet";
    case "root":
      return "Root crop";
    case "fungi":
      return "Fungal harvest";
    case "animal":
      return "Livestock";
    default:
      return "Harvest crop";
  }
}

function firstEco(sp: Species): EcoFunction | undefined {
  return ECO.find((f) => sp.functions.includes(f));
}

export function agroTag(sp: Species): { role: string; benefit: string } {
  const eco = firstEco(sp);
  const job = JOB.find((f) => sp.functions.includes(f));
  if (job) return { role: ROLE[job], benefit: BENEFIT[job] };
  if (sp.kind === "animal") {
    return { role: "Livestock", benefit: BENEFIT[eco ?? "protein"] };
  }
  if (sp.functions.includes("food") || sp.edible) {
    return { role: layerFoodRole(sp), benefit: eco ? BENEFIT[eco] : BENEFIT.food };
  }
  if (eco) return { role: ROLE[eco], benefit: BENEFIT[eco] };
  return { role: layerFoodRole(sp), benefit: BENEFIT.food };
}
