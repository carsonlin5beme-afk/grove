import { Link } from "@tanstack/react-router";
import { NUTRIENT_META, type NutrientGroup } from "@/lib/types";
import { useFarmStore } from "@/lib/farm-store";
import { scoreFarm, nutrientGroupTotals } from "@/lib/engine";
import { cn } from "@/lib/cn";

const GROUP_LABEL: Record<NutrientGroup, string> = {
  vitamin: "Vitamins",
  mineral: "Minerals",
  antioxidant: "Antioxidants",
  macro: "Macros",
};

export function NutrientPanel() {
  const farm = useFarmStore((s) => s.farm);
  const score = scoreFarm(farm);
  const groups = nutrientGroupTotals(score.nutrientTotals);
  const maxGroup = Math.max(1, ...Object.values(groups));

  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-ink-soft">
        Harvest nutrition — what you and the flock can actually eat off this acre. Plants do
        not ferry ascorbate or tocopherols to their neighbors. Open the{" "}
        <Link to="/nutrients" className="text-ink underline decoration-ink/25 underline-offset-2">
          nutrient atlas
        </Link>{" "}
        for what each one does in a person and in livestock. Soil-level gains live on the
        Chemistry tab.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(
          [
            ["Grove score", score.overall],
            ["Harvest map", score.nutrients],
            ["Rhizosphere", score.chemistry],
            ["Resilience", score.resilience],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-paper px-3 py-2.5 shadow-border">
            <p className="text-[10px] uppercase tracking-[0.14em] text-ink-faint">{label}</p>
            <p className="font-display text-2xl tabular-nums leading-none text-ink">{value}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">Edible yield families</p>
        <ul className="mt-2 space-y-2">
          {(Object.keys(GROUP_LABEL) as NutrientGroup[]).map((g) => (
            <li key={g}>
              <div className="flex justify-between text-xs text-ink-soft">
                <span>{GROUP_LABEL[g]}</span>
                <span className="tabular-nums">{Math.round(groups[g])}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink/8">
                <div
                  className={cn(
                    "h-full rounded-full",
                    g === "vitamin" && "bg-sage-deep",
                    g === "mineral" && "bg-coral-deep",
                    g === "antioxidant" && "bg-mustard-deep",
                    g === "macro" && "bg-ink-soft",
                  )}
                  style={{ width: `${(groups[g] / maxGroup) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          Coverage · {score.coveredNutrients.length}/{NUTRIENT_META.length}
        </p>
        <ul className="mt-2 columns-2 gap-x-4 text-xs">
          {NUTRIENT_META.map((n) => {
            const v = score.nutrientTotals[n.key];
            const covered = v >= 18;
            return (
              <li key={n.key} className="mb-1 flex items-baseline justify-between gap-2">
                <Link
                  to="/nutrients"
                  className={cn("hover:underline", covered ? "text-ink" : "text-ink-faint")}
                >
                  {n.label}
                </Link>
                <span className={cn("tabular-nums", covered ? "text-sage-deep" : "text-ink-faint")}>
                  {Math.round(v)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
