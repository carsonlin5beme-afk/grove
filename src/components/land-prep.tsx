import { farmRegion, PREP_DEFAULT } from "@/lib/regions";
import { useFarmStore } from "@/lib/farm-store";
import { cn } from "@/lib/cn";

export function LandPrep() {
  const farm = useFarmStore((s) => s.farm);
  const toggle = useFarmStore((s) => s.togglePrep);
  const region = farmRegion(farm);
  if (!region) return null;
  const prep = farm.prep ?? PREP_DEFAULT;
  const done = region.prep.filter((s) => prep[s.id]).length;

  return (
    <section className="rounded-[24px] bg-paper-soft p-3 shadow-border sm:p-4">
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">Land preparation</p>
          <p className="font-display text-xl leading-tight text-ink">
            Water first, then plants
          </p>
        </div>
        <p className="text-xs tabular-nums text-ink-faint">
          {done}/{region.prep.length}
        </p>
      </div>
      <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {region.prep.map((step, i) => {
          const on = !!prep[step.id];
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => toggle(step.id)}
                className={cn(
                  "flex h-full w-full flex-col items-start rounded-2xl px-3 py-2.5 text-left shadow-border",
                  on ? "bg-sage/15" : "bg-paper",
                )}
              >
                <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                  <span
                    className={cn(
                      "grid size-4 place-items-center rounded-full text-[10px]",
                      on ? "bg-sage-deep text-paper" : "bg-ink/10 text-ink-soft",
                    )}
                  >
                    {on ? "✓" : i + 1}
                  </span>
                  {step.years}
                </span>
                <span className="mt-1 font-medium text-ink">{step.title}</span>
                <span className="mt-1 text-xs leading-relaxed text-ink-soft">{step.body}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
