import { useMemo, useRef, useState } from "react";
import { SpeciesPortrait } from "@/components/species-portrait";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/cn";
import { searchSpecies } from "@/lib/species";
import { useFarmStore } from "@/lib/farm-store";
import { canPlace, farmRegion, suitFor } from "@/lib/regions";
import { LAYER_LABEL, type Kind, type Layer } from "@/lib/types";

const FILTERS: { id: "all" | Kind | Layer; label: string }[] = [
  { id: "all", label: "All" },
  { id: "canopy", label: "Canopy" },
  { id: "subcanopy", label: "Fruit" },
  { id: "shrub", label: "Shrub" },
  { id: "vine", label: "Vine" },
  { id: "herb", label: "Herb" },
  { id: "groundcover", label: "Ground" },
  { id: "animal", label: "Animals" },
  { id: "fungi", label: "Fungi" },
];

export function SpeciesBrowser({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const pickerId = useFarmStore((s) => s.pickerId);
  const pick = useFarmStore((s) => s.pick);
  const plant = useFarmStore((s) => s.plant);
  const beginPaletteDrag = useFarmStore((s) => s.beginPaletteDrag);
  const farm = useFarmStore((s) => s.farm);

  const origin = useRef({ x: 0, y: 0, moved: false });

  const list = useMemo(() => {
    let rows = searchSpecies(q);
    if (filter !== "all") {
      rows = rows.filter((s) => s.kind === filter || s.layer === filter);
    }
    const region = farmRegion(farm);
    if (region) {
      rows = [...rows].sort((a, b) => {
        const sa = suitFor(a, region, !!farm.mounds).suit;
        const sb = suitFor(b, region, !!farm.mounds).suit;
        const rank = { good: 0, ok: 1, mound: 2, poor: 3 };
        return rank[sa] - rank[sb];
      });
    } else {
      rows = rows.filter((s) => farm.zone >= s.hardinessMin - 1 && farm.zone <= s.hardinessMax + 1);
    }
    return rows;
  }, [q, filter, farm]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search juglone, clover, chicken…"
        className="shrink-0"
      />
      <div className="mt-2 flex shrink-0 gap-1 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[11px] transition-colors",
              filter === f.id ? "bg-ink text-paper" : "bg-ink/6 text-ink-soft",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ScrollArea className="mt-2 min-h-0 flex-1">
        <ul className="flex flex-col gap-1 pr-2">
          {list.map((sp) => {
            const active = pickerId === sp.id;
            const gate = canPlace(sp, farm);
            const blocked = !gate.ok;
            return (
              <li key={sp.id}>
                <button
                  type="button"
                  onPointerDown={(e) => {
                    if (blocked) return;
                    origin.current = { x: e.clientX, y: e.clientY, moved: false };
                    if (compact) beginPaletteDrag(sp.id);
                  }}
                  onPointerMove={(e) => {
                    if (Math.hypot(e.clientX - origin.current.x, e.clientY - origin.current.y) > 8) {
                      origin.current.moved = true;
                    }
                  }}
                  onClick={() => {
                    if (origin.current.moved) return;
                    if (blocked) {
                      pick(null);
                      return;
                    }
                    if (compact) pick(active ? null : sp.id);
                    else plant(sp.id);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-2 py-1.5 text-left transition-colors",
                    blocked && "opacity-40",
                    active ? "bg-sage/20" : "hover:bg-ink/5",
                  )}
                >
                  <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-paper-deep/50">
                    <SpeciesPortrait species={sp} className="h-12 w-10" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">{sp.name}</span>
                    <span className="block truncate font-display text-[11px] italic text-ink-faint">
                      {blocked ? gate.why : sp.latin}
                    </span>
                  </span>
                  {gate.suit === "good" ? (
                    <Badge variant="default">fits</Badge>
                  ) : gate.suit === "mound" ? (
                    <Badge variant="mustard">mound</Badge>
                  ) : gate.suit === "poor" ? (
                    <Badge variant="coral">no</Badge>
                  ) : !compact ? (
                    <Badge variant="ink">{LAYER_LABEL[sp.layer]}</Badge>
                  ) : null}
                </button>
              </li>
            );
          })}
          {list.length === 0 && (
            <li className="px-2 py-6 text-center text-sm text-ink-faint">
              Nothing hardy in zone {farm.zone} matches that.
            </li>
          )}
        </ul>
      </ScrollArea>
    </div>
  );
}
