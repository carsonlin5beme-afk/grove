import { chemicalConflict, chemicalSynergy } from "./chemistry";
import type { Species } from "./types";

export function isComplement(a: Species, b: Species): boolean {
  if (a.id === b.id) return false;
  if (chemicalConflict(a, b)) return false;
  if (a.antagonists.includes(b.id) || b.antagonists.includes(a.id)) return false;
  if (a.companions.includes(b.id) || b.companions.includes(a.id)) return true;
  if (chemicalSynergy(a, b)) return true;
  const af = new Set(a.functions);
  const bf = new Set(b.functions);
  if (af.has("nitrogen-fixer") && (bf.has("food") || bf.has("fodder"))) return true;
  if (bf.has("nitrogen-fixer") && (af.has("food") || af.has("fodder"))) return true;
  if (af.has("dynamic-accumulator") && (b.layer === "canopy" || b.layer === "subcanopy")) return true;
  if (bf.has("dynamic-accumulator") && (a.layer === "canopy" || a.layer === "subcanopy")) return true;
  if (a.layer === "vine" && (b.layer === "canopy" || b.layer === "subcanopy" || bf.has("nurse"))) return true;
  if (b.layer === "vine" && (a.layer === "canopy" || a.layer === "subcanopy" || af.has("nurse"))) return true;
  if (a.kind === "animal" && (bf.has("fodder") || bf.has("forage") || b.layer === "groundcover")) return true;
  if (b.kind === "animal" && (af.has("fodder") || af.has("forage") || a.layer === "groundcover")) return true;
  return false;
}

export const PAIR_RANGE = 1.55;
