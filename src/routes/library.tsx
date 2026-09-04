import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SpeciesPortrait } from "@/components/species-portrait";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { agroTag } from "@/lib/agro-tag";
import { SPECIES, searchSpecies } from "@/lib/species";
import { useFarmStore } from "@/lib/farm-store";
import {
  CHEM_GROUP_LABEL,
  CHEM_ROLE_LABEL,
  COMPOUND_CLASS_LABEL,
  FUNCTION_LABEL,
  LAYER_LABEL,
  LAYERS,
  NUTRIENT_META,
  RELEASE_LABEL,
  type Layer,
} from "@/lib/types";
import { getChemistry } from "@/lib/chemistry";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/library")({ component: Library });

const EVIDENCE: Record<string, string> = {
  field: "Field agroforestry",
  mixed: "Mixed / intercrop studies",
  lab: "Mostly controlled studies",
  emerging: "Emerging — treat as a hypothesis",
};

function Library() {
  const [q, setQ] = useState("");
  const [layer, setLayer] = useState<Layer | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const plant = useFarmStore((s) => s.plant);
  const finish = useFarmStore((s) => s.finishOnboarding);
  const navigate = useNavigate();
  const rows = useMemo(() => {
    const found = searchSpecies(q);
    return layer === "all" ? found : found.filter((s) => s.layer === layer);
  }, [q, layer]);
  const open = rows.find((s) => s.id === openId) ?? SPECIES.find((s) => s.id === openId) ?? null;
  const openChem = open ? getChemistry(open) : null;
  const openTag = open ? agroTag(open) : null;

  const grouped = useMemo(() => {
    return LAYERS.map((l) => ({
      layer: l,
      items: rows.filter((s) => s.layer === l),
    })).filter((g) => g.items.length > 0);
  }, [rows]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper">
      <AppNav current="/library" />
      <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4 pt-6 pb-4 sm:px-6">
        <header className="shrink-0">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">Field guide</p>
          <h1 className="mt-1 font-display text-4xl tracking-tight">The catalog</h1>
          <p className="mt-3 max-w-2xl text-sm text-ink-soft">
            Grouped by layer, tagged by the job each species actually does in a grove — and the one
            benefit that job buys you.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <div className="max-w-md">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Juglone, genistein, chestnut…"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto overscroll-contain pb-1">
              <button
                type="button"
                onClick={() => setLayer("all")}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-sm",
                  layer === "all" ? "bg-ink text-paper" : "bg-ink/6 text-ink-soft",
                )}
              >
                All layers
              </button>
              {LAYERS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLayer(l)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-sm",
                    layer === l ? "bg-ink text-paper" : "bg-ink/6 text-ink-soft",
                  )}
                >
                  {LAYER_LABEL[l]}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="mt-6 flex min-h-0 flex-1 flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
            <div className="space-y-8 pb-8">
              {grouped.map((g) => (
                <section key={g.layer}>
                  <h2 className="mb-2 font-display text-xl tracking-tight">
                    {LAYER_LABEL[g.layer]}
                    <span className="ml-2 text-sm text-ink-faint">{g.items.length}</span>
                  </h2>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {g.items.map((sp) => {
                      const tag = agroTag(sp);
                      return (
                        <li key={sp.id}>
                          <button
                            type="button"
                            onClick={() => setOpenId(sp.id)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-2xl bg-paper-soft px-2 py-2 text-left shadow-border transition-colors",
                              openId === sp.id && "ring-2 ring-sage-deep/40",
                            )}
                          >
                            <span className="grid size-14 place-items-center overflow-hidden rounded-xl bg-paper-deep/40">
                              <SpeciesPortrait species={sp} className="h-14 w-11" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate font-medium">{sp.name}</span>
                              <span className="block truncate font-display text-xs italic text-ink-faint">
                                {sp.latin}
                              </span>
                              <span className="mt-1 flex flex-wrap items-center gap-1">
                                <Badge variant="default">{tag.role}</Badge>
                                {!sp.edible && <Badge variant="mustard">non-edible</Badge>}
                              </span>
                              <span className="mt-1 block truncate text-[11px] text-ink-soft">
                                {tag.benefit}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
              {rows.length === 0 && (
                <p className="py-10 text-center text-sm text-ink-faint">Nothing in the catalog matches that.</p>
              )}
            </div>
          </div>

          <aside className="flex min-h-0 max-h-[46vh] shrink-0 flex-col overscroll-contain lg:max-h-none lg:h-full lg:shrink">
            {open && openChem && openTag ? (
              <article className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] bg-paper-soft shadow-border">
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5">
                  <div className="flex items-start gap-3">
                    <SpeciesPortrait species={open} className="h-16 w-12" />
                    <div>
                      <h2 className="font-display text-2xl leading-none">{open.name}</h2>
                      <p className="mt-1 text-sm italic text-ink-faint">{open.latin}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-wider text-ink-faint">
                        {open.family} · z{open.hardinessMin}–{open.hardinessMax}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 rounded-2xl bg-paper px-3 py-2 shadow-border">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">In the grove</p>
                    <p className="font-medium text-ink">{openTag.role}</p>
                    <p className="text-sm text-ink-soft">{openTag.benefit}</p>
                  </div>
                  <p className="mt-4 text-sm text-ink-soft">{open.description}</p>
                  <p className="mt-3 text-sm text-ink">{open.agro}</p>
                  <p className="mt-3 text-xs text-ink-faint">Yields {open.yields}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {open.functions.map((f) => (
                      <Badge key={f} variant="default">
                        {FUNCTION_LABEL[f]}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-ink/8 pt-4">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                      Rhizosphere · {EVIDENCE[openChem.evidence]}
                    </p>
                    <p className="mt-1 text-sm font-medium text-sage-deep">
                      {CHEM_GROUP_LABEL[openChem.group]}
                    </p>
                    <p className="mt-2 text-sm text-ink-soft">{openChem.soilEffects}</p>
                    {openChem.exudates.length > 0 && (
                      <ul className="mt-3 space-y-2.5">
                        {openChem.exudates.map((e) => (
                          <li key={e.name}>
                            <p className="text-sm font-medium">
                              {e.name}{" "}
                              <span className="font-sans text-[11px] font-normal text-ink-faint">
                                {COMPOUND_CLASS_LABEL[e.klass]}
                              </span>
                            </p>
                            <p className="text-xs text-ink-soft">{e.note}</p>
                            <p className="mt-0.5 text-[11px] text-ink-faint">
                              {e.routes.map((r) => RELEASE_LABEL[r]).join(" · ")}
                              {e.roles.length > 0
                                ? ` · ${e.roles.map((r) => CHEM_ROLE_LABEL[r]).join(", ")}`
                                : ""}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                    {openChem.sensitiveTo.length > 0 && (
                      <p className="mt-3 text-xs text-coral-deep">
                        Sensitive to {openChem.sensitiveTo.join(", ")}.
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pb-1">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">Harvest nutrition</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-ink-faint">
                      What you can eat off this species. Not what it donates through the soil.
                    </p>
                    <ul className="mt-2 space-y-1">
                      {NUTRIENT_META.filter((n) => (open.nutrients[n.key] ?? 0) > 0)
                        .sort((a, b) => (open.nutrients[b.key] ?? 0) - (open.nutrients[a.key] ?? 0))
                        .map((n) => (
                          <li key={n.key} className="flex items-center justify-between text-xs">
                            <span>{n.label}</span>
                            <span className="tabular-nums text-ink-soft">{open.nutrients[n.key]}</span>
                          </li>
                        ))}
                      {Object.keys(open.nutrients).length === 0 && (
                        <li className="text-xs text-ink-faint">
                          Support species — ecological yield, not a food crop.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="shrink-0 border-t border-ink/8 p-4">
                  <button
                    type="button"
                    onClick={() => {
                      finish();
                      plant(open.id);
                      void navigate({ to: "/studio" });
                    }}
                    className="w-full rounded-full bg-sage-deep py-2.5 text-sm text-paper"
                  >
                    Plant on my acre
                  </button>
                </div>
              </article>
            ) : (
              <p className="rounded-[28px] bg-paper-soft p-5 text-sm text-ink-soft shadow-border">
                Select a species to read its job, exudates, and harvest profile.
              </p>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
