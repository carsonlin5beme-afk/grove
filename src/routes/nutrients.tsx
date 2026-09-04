import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SpeciesPortrait } from "@/components/species-portrait";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { NUTRIENT_META, type NutrientGroup, type NutrientKey } from "@/lib/types";
import {
  GUIDE_BY_KEY,
  NUTRIENT_GROUP_LABEL,
  topSources,
} from "@/lib/nutrients";
import { useFarmStore } from "@/lib/farm-store";
import { scoreFarm } from "@/lib/engine";
import { NUTRIENT_MARKS } from "@/lib/nutrient-marks";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/nutrients")({ component: NutrientAtlas });

const FILTERS: { id: "all" | NutrientGroup; label: string }[] = [
  { id: "all", label: "All" },
  { id: "vitamin", label: "Vitamins" },
  { id: "mineral", label: "Minerals" },
  { id: "antioxidant", label: "Antioxidants" },
  { id: "macro", label: "Macros" },
];

function NutrientAtlas() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [openId, setOpenId] = useState<NutrientKey>("vitaminA");
  const farm = useFarmStore((s) => s.farm);
  const hasHydrated = useFarmStore((s) => s.hasHydrated);
  const score = scoreFarm(farm);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return NUTRIENT_META.filter((n) => {
      if (group !== "all" && n.group !== group) return false;
      if (!needle) return true;
      const g = GUIDE_BY_KEY[n.key];
      return (
        n.label.toLowerCase().includes(needle) ||
        g.aka.toLowerCase().includes(needle) ||
        g.role.toLowerCase().includes(needle) ||
        g.human.toLowerCase().includes(needle) ||
        g.mammal.toLowerCase().includes(needle)
      );
    });
  }, [q, group]);

  useEffect(() => {
    if (rows.length === 0) return;
    if (!rows.some((n) => n.key === openId)) {
      setOpenId(rows[0].key);
    }
  }, [rows, openId]);

  const open =
    rows.find((n) => n.key === openId) ??
    rows[0] ??
    NUTRIENT_META.find((n) => n.key === openId) ??
    NUTRIENT_META[0];
  const guide = GUIDE_BY_KEY[open.key];
  const sources = topSources(open.key, 8);
  const farmValue = score.nutrientTotals[open.key] ?? 0;
  const onAcre = farmValue >= 18;
  const plantedNames = farm.placements
    .map((p) => {
      const hit = sources.find((s) => s.id === p.speciesId);
      return hit?.name;
    })
    .filter(Boolean);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper">
      <AppNav current="/nutrients" />
      <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4 pt-6 pb-4 sm:px-6">
        <header className="shrink-0">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">Harvest physiology</p>
        <h1 className="mt-1 font-display text-4xl tracking-tight">What the harvest does</h1>
        <p className="mt-3 max-w-2xl text-sm text-ink-soft">
          Every number on the acre is food, not a soil vitamin drip. This atlas is what each
          nutrient does in a person aiming for a full reserve — and in the mammals that share
          the same biochemistry, with the livestock caveats called out. Vitamins, minerals,
          amino acids, fats, and the major plant pigments. It is food-system literacy, not a
          prescription.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="max-w-md flex-1">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="B12, grass tetany, night vision…"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setGroup(f.id)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors",
                  group === f.id ? "bg-ink text-paper" : "bg-ink/6 text-ink-soft",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        </header>

        <div className="mt-6 flex min-h-0 flex-1 flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_380px]">
          <ul className="order-2 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:order-1">
            {rows.map((n) => {
              const g = GUIDE_BY_KEY[n.key];
              const covered = (score.nutrientTotals[n.key] ?? 0) >= 18;
              return (
                <li key={n.key}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenId(n.key);
                      if (window.matchMedia("(max-width: 1023px)").matches) {
                        document.getElementById("nutrient-detail")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                    className={cn(
                      "flex w-full flex-col items-start rounded-2xl bg-paper-soft px-3 py-3 text-left shadow-border transition-colors",
                      openId === n.key && "ring-2 ring-sage-deep/40",
                    )}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="font-medium text-ink">{n.label}</span>
                      <Badge variant={n.group === "vitamin" ? "default" : n.group === "mineral" ? "coral" : n.group === "antioxidant" ? "mustard" : "ink"}>
                        {NUTRIENT_GROUP_LABEL[n.group]}
                      </Badge>
                    </span>
                    <span className="mt-1 line-clamp-2 text-xs text-ink-soft">
                      <span className="mr-1" aria-hidden>
                        {NUTRIENT_MARKS[n.key]}
                      </span>
                      {g.role}
                    </span>
                    <span className={cn("mt-2 text-[11px]", !hasHydrated ? "text-ink-faint" : covered ? "text-sage-deep" : "text-ink-faint")}>
                      {!hasHydrated ? "…" : covered ? "On your acre" : "Not yet covered"}
                    </span>
                  </button>
                </li>
              );
            })}
            {rows.length === 0 && (
              <li className="col-span-full py-10 text-center text-sm text-ink-faint">
                Nothing in the atlas matches that.
              </li>
            )}
          </ul>

          <aside className="order-1 flex min-h-0 max-h-[48vh] flex-col overscroll-contain lg:max-h-none lg:order-2">
            <article id="nutrient-detail" className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain rounded-[28px] bg-paper-soft p-5 shadow-border">
              <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                {NUTRIENT_GROUP_LABEL[open.group]}
              </p>
              <h2 className="mt-1 font-display text-3xl leading-none">{open.label}</h2>
              <p className="mt-1 text-xs italic text-ink-faint">{guide.aka}</p>
              <p className="mt-3 text-sm text-ink">
                <span className="mr-2 text-base tracking-tight" aria-hidden>
                  {NUTRIENT_MARKS[open.key]}
                </span>
                {guide.role}
              </p>

              <div
                className={cn(
                  "mt-4 rounded-2xl px-3 py-2 text-xs",
                  onAcre ? "bg-sage/15 text-sage-deep" : "bg-ink/5 text-ink-soft",
                )}
              >
                {onAcre
                  ? `Your acre scores ${Math.round(farmValue)} here${plantedNames.length ? ` — ${plantedNames.join(", ")}` : ""}.`
                  : "This one is thin on the current acre. Plant a source, or add the animal that concentrates it."}
              </div>

              <section className="mt-5">
                <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                  A person at full reserve
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{guide.human}</p>
              </section>

              <section className="mt-4">
                <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                  Mammals on the acre
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{guide.mammal}</p>
              </section>

              <section className="mt-4">
                <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">When it is missing</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{guide.missing}</p>
              </section>

              <section className="mt-4">
                <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                  How the harvest delivers it
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{guide.harvest}</p>
              </section>

              {guide.note ? (
                <p className="mt-4 border-l-2 border-mustard-deep/50 pl-3 text-xs leading-relaxed text-ink-soft">
                  {guide.note}
                </p>
              ) : null}

              <section className="mt-5">
                <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                  Strongest catalog sources
                </h3>
                <ul className="mt-2 space-y-1">
                  {sources.map((sp) => (
                    <li key={sp.id}>
                      <Link
                        to="/library"
                        className="flex items-center gap-2 rounded-xl px-1 py-1 hover:bg-paper"
                      >
                        <SpeciesPortrait species={sp} className="h-9 w-7" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-ink">{sp.name}</span>
                          <span className="block truncate font-display text-[11px] italic text-ink-faint">
                            {sp.latin}
                          </span>
                        </span>
                        <span className="tabular-nums text-xs text-sage-deep">
                          {Math.round(sp.nutrients[open.key] ?? 0)}
                        </span>
                      </Link>
                    </li>
                  ))}
                  {sources.length === 0 && (
                    <li className="text-xs text-ink-faint">No catalog species lists this yet.</li>
                  )}
                </ul>
              </section>
            </article>
          </aside>
        </div>
      </main>
    </div>
  );
}
