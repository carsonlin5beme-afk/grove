import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { LAYER_LABEL, type Layer } from "@/lib/types";
import { useFarmStore } from "@/lib/farm-store";
import {
  AREA_PRESETS,
  comboRating,
  farmAreaSqft,
  formatArea,
  fromSqft,
  planForArea,
  toSqft,
  type AreaUnit,
} from "@/lib/planner";
import { cn } from "@/lib/cn";

const UNITS: { id: AreaUnit; label: string }[] = [
  { id: "sqft", label: "ft²" },
  { id: "m2", label: "m²" },
  { id: "acre", label: "acre" },
];

const LAYER_ORDER: Layer[] = [
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

export function GuildPlanner() {
  const farm = useFarmStore((s) => s.farm);
  const setArea = useFarmStore((s) => s.setAreaSqft);
  const applyPlan = useFarmStore((s) => s.applyPlan);
  const [unit, setUnit] = useState<AreaUnit>("sqft");
  const sqft = farmAreaSqft(farm);
  const live = comboRating(farm);
  const plan = useMemo(() => planForArea(farm, sqft), [farm.zone, farm.soil, farm.water, farm.system, sqft]);

  const display = fromSqft(sqft, unit);
  const displayStr =
    unit === "acre" ? (display >= 1 ? display.toFixed(2) : display.toFixed(3)) : String(Math.round(display));

  function onInput(raw: string) {
    const n = Number(raw.replace(/,/g, ""));
    if (!Number.isFinite(n) || n <= 0) return;
    setArea(toSqft(n, unit));
  }

  const grouped = LAYER_ORDER.map((layer) => ({
    layer,
    lines: plan.lines.filter((l) => l.layer === layer),
  })).filter((g) => g.lines.length);

  const totalPlants = plan.lines.reduce((s, l) => s + l.count, 0);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">Guild planner</p>
          <h2 className="font-display text-2xl leading-none text-ink">How much land do you have?</h2>
          <p className="mt-1 max-w-xl text-sm text-ink-soft">
            We size a layered stack to the mature crowns — not a seed packet. Nitrogen fixers, fruit, accumulators, and
            a floor that holds the soil.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ScorePip label="Live combo" value={live.score} hint={live.note} />
          <ScorePip label="This plan" value={plan.comboScore} hint={`${totalPlants} plants · ${formatArea(sqft)}`} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 rounded-full bg-paper px-1 py-1 shadow-border">
          {UNITS.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setUnit(u.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs",
                unit === u.id ? "bg-ink text-paper" : "text-ink-soft",
              )}
            >
              {u.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          inputMode="decimal"
          value={displayStr}
          onChange={(e) => onInput(e.target.value)}
          className="h-10 w-28 rounded-full bg-paper px-4 text-sm tabular-nums shadow-border outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          aria-label="Plot area"
        />
        <span className="text-xs text-ink-faint">{formatArea(sqft)}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {AREA_PRESETS.map((p) => (
          <button
            key={p.sqft}
            type="button"
            onClick={() => setArea(p.sqft)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs shadow-border",
              Math.abs(sqft - p.sqft) < 2 ? "bg-sage-deep text-paper" : "bg-paper text-ink-soft",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <ol className="space-y-2">
          {grouped.map((g) => (
            <li key={g.layer}>
              <p className="text-[10px] uppercase tracking-[0.14em] text-ink-faint">{LAYER_LABEL[g.layer]}</p>
              <ul className="mt-1 space-y-1">
                {g.lines.map((l) => (
                  <li key={l.speciesId} className="flex items-baseline justify-between gap-3 text-sm">
                    <span>
                      <span className="font-medium text-ink">{l.name}</span>
                      <span className="text-ink-faint"> · {l.role}</span>
                    </span>
                    <span className="shrink-0 tabular-nums text-ink-soft">
                      ×{l.count}
                      <span className="ml-2 text-[11px] text-ink-faint">{l.spacingFt} ft</span>
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink-faint">Why this combo</p>
          <ul className="mt-2 space-y-2">
            {plan.why.map((w, i) => (
              <li key={i} className="text-sm leading-snug text-ink-soft">
                {w}
              </li>
            ))}
          </ul>
          <Button className="mt-4 w-full sm:w-auto" onClick={() => applyPlan(plan.placements)}>
            Plant this plan
          </Button>
          <p className="mt-2 text-[11px] text-ink-faint">
            Places a starting layout inside the marked plot. Drag anything after — the live combo updates.
          </p>
        </div>
      </div>
    </div>
  );
}

function ScorePip({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="min-w-[7.5rem] rounded-2xl bg-paper px-3 py-2 shadow-border">
      <p className="text-[10px] uppercase tracking-[0.14em] text-ink-faint">{label}</p>
      <p className="font-display text-3xl leading-none text-ink tabular-nums">{value}</p>
      <p className="mt-1 max-w-[11rem] text-[11px] leading-snug text-ink-soft">{hint}</p>
    </div>
  );
}
