import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, Sprout } from "lucide-react";
import { SpeciesPortrait } from "@/components/species-portrait";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { askAdvisor, advisorChips, type Advice } from "@/lib/advisor";
import { scoreFarm } from "@/lib/engine";
import { useFarmStore } from "@/lib/farm-store";
import { SPECIES_BY_ID } from "@/lib/species";
import { GUILDS } from "@/lib/guilds";
import { getChemistry } from "@/lib/chemistry";
import { FUNCTION_LABEL, LAYER_LABEL } from "@/lib/types";

interface Turn {
  id: string;
  q: string;
  a: Advice;
}

export function AdvisorPanel() {
  const farm = useFarmStore((s) => s.farm);
  const plant = useFarmStore((s) => s.plant);
  const applyGuild = useFarmStore((s) => s.applyGuild);
  const uproot = useFarmStore((s) => s.uproot);
  const selectedId = useFarmStore((s) => s.selectedId);
  const score = scoreFarm(farm);
  const selected = farm.placements.find((p) => p.id === selectedId);
  const selectedSp = selected ? SPECIES_BY_ID[selected.speciesId] : undefined;
  const chips = useMemo(() => advisorChips(farm), [farm.placements, farm.system, farm.zone, farm.areaSqft]);

  const matchingGuilds = GUILDS.filter((g) => {
    const have = new Set(farm.placements.map((p) => p.speciesId));
    const hits = g.members.filter((m) => have.has(m)).length;
    return hits >= 2 && g.system === farm.system;
  }).slice(0, 2);

  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    const a = askAdvisor(farm, q);
    setTurns((t) => [...t, { id: `${Date.now()}-${t.length}`, q, a }]);
    setDraft("");
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }));
  }

  return (
    <div className="flex h-full min-h-[380px] flex-col">
      <ScrollArea className="min-h-0 flex-1 pr-2">
        <div className="space-y-5 pb-3">
          {selectedSp && selected && (
            <section className="rounded-2xl bg-paper p-3 shadow-border">
              <div className="flex items-start gap-3">
                <SpeciesPortrait species={selectedSp} className="h-14 w-10 shrink-0" />
                <div className="min-w-0">
                  <p className="font-display text-lg leading-tight">{selectedSp.name}</p>
                  <p className="text-xs italic text-ink-faint">{selectedSp.latin}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-ink-faint">
                    {LAYER_LABEL[selectedSp.layer]} · z{selectedSp.hardinessMin}–{selectedSp.hardinessMax}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm text-ink-soft">{selectedSp.agro}</p>
              {(() => {
                const c = getChemistry(selectedSp);
                if (!c.exudates.length) return null;
                return (
                  <div className="mt-3">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">Named compounds</p>
                    <ul className="mt-1 space-y-1">
                      {c.exudates.slice(0, 3).map((e) => (
                        <li key={e.name} className="text-xs text-ink-soft">
                          <span className="font-medium text-ink">{e.name}</span>
                          {" — "}
                          {e.note}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
              <div className="mt-2 flex flex-wrap gap-1">
                {selectedSp.functions.map((f) => (
                  <span key={f} className="rounded-full bg-ink/6 px-2 py-0.5 text-[10px] text-ink-soft">
                    {FUNCTION_LABEL[f]}
                  </span>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-2" onClick={() => uproot(selected.id)}>
                Uproot
              </Button>
            </section>
          )}

          {score.notes.length > 0 && (
            <ul className="space-y-2">
              {score.notes.map((n) => (
                <li key={n} className="text-sm leading-snug text-ink">
                  {n}
                </li>
              ))}
            </ul>
          )}

          {score.conflicts.length > 0 && (
            <section>
              <p className="text-[11px] uppercase tracking-[0.16em] text-coral-deep">Conflicts</p>
              <ul className="mt-2 space-y-2">
                {score.conflicts.map((c) => (
                  <li key={c.title} className="rounded-xl bg-coral/10 px-3 py-2">
                    <p className="text-sm font-medium">{c.title}</p>
                    <p className="text-xs text-ink-soft">{c.detail}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {score.synergies.length > 0 && (
            <section>
              <p className="text-[11px] uppercase tracking-[0.16em] text-sage-deep">Mutualisms</p>
              <ul className="mt-2 space-y-2">
                {score.synergies.slice(0, 5).map((c) => (
                  <li key={c.title + c.a}>
                    <p className="text-sm font-medium">{c.title}</p>
                    <p className="text-xs text-ink-soft">{c.detail}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {score.suggestions.length > 0 && (
            <section>
              <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">Plant next</p>
              <ul className="mt-2 space-y-1">
                {score.suggestions.map((s) => {
                  const sp = SPECIES_BY_ID[s.speciesId];
                  if (!sp) return null;
                  return (
                    <li key={s.speciesId}>
                      <button
                        type="button"
                        onClick={() => plant(sp.id)}
                        className="flex w-full items-center gap-2 rounded-xl px-1 py-1 text-left hover:bg-ink/5"
                      >
                        <SpeciesPortrait species={sp} className="h-10 w-8" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm">{sp.name}</span>
                          <span className="block text-[11px] text-ink-faint">{s.reason}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {matchingGuilds.length > 0 && (
            <section>
              <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">Nearby guilds</p>
              {matchingGuilds.map((g) => (
                <div key={g.id} className="mt-2">
                  <p className="text-sm font-medium">{g.name}</p>
                  <p className="text-xs text-ink-soft">{g.hook}</p>
                  <Button variant="ghost" size="sm" className="mt-1 px-0" onClick={() => applyGuild(g.members)}>
                    Complete this guild
                  </Button>
                </div>
              ))}
              <Link to="/guilds" className="mt-2 inline-block text-xs text-sage-deep underline-offset-2 hover:underline">
                Browse all guilds
              </Link>
            </section>
          )}

          {turns.map((t) => (
            <article key={t.id} className="space-y-2">
              <p className="ml-6 rounded-2xl bg-ink px-3 py-2 text-sm text-paper">{t.q}</p>
              <div className="rounded-2xl bg-paper px-3 py-3 shadow-border">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-faint">Advisor</p>
                {t.a.text.split("\n\n").map((p) => (
                  <p key={p.slice(0, 48)} className="mt-2 whitespace-pre-line text-sm leading-snug text-ink">
                    {p}
                  </p>
                ))}
                {t.a.plants.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {t.a.plants.map((rec) => {
                      const sp = SPECIES_BY_ID[rec.id];
                      if (!sp) return null;
                      return (
                        <li key={rec.id} className="flex items-center gap-2 rounded-xl bg-paper-soft px-2 py-1.5">
                          <SpeciesPortrait species={sp} className="h-10 w-8" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm leading-tight">{sp.name}</p>
                            <p className="text-[11px] text-ink-faint">{rec.reason}</p>
                            {rec.caution ? <p className="text-[11px] text-coral-deep">{rec.caution}</p> : null}
                          </div>
                          <Button size="sm" variant="outline" onClick={() => plant(sp.id)}>
                            <Sprout className="size-3.5" />
                            Add
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {t.a.followUps.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {t.a.followUps.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => ask(f)}
                        className="rounded-full bg-sage/20 px-2.5 py-1 text-[11px] text-sage-deep"
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
          <div ref={endRef} />
        </div>
      </ScrollArea>

      <form
        className="mt-2 shrink-0 border-t border-ink/8 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
        }}
      >
        <p className="mb-1.5 text-[10px] uppercase tracking-[0.16em] text-ink-faint">Ask this acre</p>
        <div className="mb-2 flex flex-wrap gap-1">
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => ask(c)}
              className="rounded-full bg-paper px-2.5 py-1 text-[11px] text-ink-soft shadow-border"
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What should I plant next to the chestnut?"
            className="h-10 bg-paper"
          />
          <Button type="submit" size="sm" className="h-10 shrink-0 px-3" disabled={!draft.trim()}>
            <ArrowUp className="size-4" />
            <span className="sr-only">Ask</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
