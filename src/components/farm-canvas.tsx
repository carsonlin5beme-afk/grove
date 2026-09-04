import { useRef, useState, type MouseEvent } from "react";
import { PlantMark, GroundStrip, Tuft, BirdPass, FallingLeaf } from "@/components/botanical";
import { cn } from "@/lib/cn";
import { SPECIES_BY_ID } from "@/lib/species";
import { useFarmStore } from "@/lib/farm-store";

export function FarmCanvas() {
  const farm = useFarmStore((s) => s.farm);
  const selectedId = useFarmStore((s) => s.selectedId);
  const pickerId = useFarmStore((s) => s.pickerId);
  const select = useFarmStore((s) => s.select);
  const plant = useFarmStore((s) => s.plant);
  const move = useFarmStore((s) => s.move);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);

  function xFromEvent(clientX: number) {
    const el = wrapRef.current;
    if (!el) return 50;
    const r = el.getBoundingClientRect();
    return ((clientX - r.left) / r.width) * 100;
  }

  function onBackgroundClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget && (e.target as HTMLElement).dataset.ground !== "1") return;
    const x = xFromEvent(e.clientX);
    if (pickerId) plant(pickerId, x);
    else select(null);
  }

  const sorted = [...farm.placements].sort((a, b) => {
    const la = SPECIES_BY_ID[a.speciesId]?.layer;
    const lb = SPECIES_BY_ID[b.speciesId]?.layer;
    const rank = (l?: string) =>
      l === "canopy" ? 0 : l === "subcanopy" ? 1 : l === "shrub" || l === "vine" ? 2 : 3;
    return rank(la) - rank(lb);
  });

  return (
    <div
      ref={wrapRef}
      className="relative h-[280px] w-full overflow-hidden sm:h-[340px] lg:h-[400px]"
      onClick={onBackgroundClick}
      onPointerMove={(e) => {
        if (!dragging) return;
        move(dragging, xFromEvent(e.clientX));
      }}
      onPointerUp={() => setDragging(null)}
      onPointerLeave={() => setDragging(null)}
    >
      <svg className="pointer-events-none absolute inset-x-0 top-6 h-16 w-full" viewBox="0 0 800 80" aria-hidden>
        <BirdPass />
        <FallingLeaf x={120} delay={1} />
        <FallingLeaf x={400} delay={4} />
      </svg>

      {sorted.map((p) => {
        const sp = SPECIES_BY_ID[p.speciesId];
        if (!sp) return null;
        const selected = selectedId === p.id;
        const isAnimal = sp.kind === "animal";
        const layer = sp.layer;
        const height =
          isAnimal
            ? 58
            : layer === "canopy"
              ? 168 + p.scale * 24
              : layer === "subcanopy"
                ? 138 + p.scale * 16
                : layer === "shrub" || layer === "vine"
                  ? 108
                  : layer === "fungi"
                    ? 56
                    : 76;
        const width =
          isAnimal
            ? 58
            : layer === "canopy"
              ? 86
              : layer === "subcanopy"
                ? 74
                : 58;
        return (
          <button
            key={p.id}
            type="button"
            aria-label={sp.name}
            className={cn(
              "absolute bottom-9 -translate-x-1/2 touch-none rounded-md bg-transparent p-0 transition-[filter,transform] duration-150",
              selected && "z-20",
            )}
            style={{
              left: `${p.x}%`,
              width,
              height,
              zIndex: selected ? 20 : isAnimal ? 12 : 8,
            }}
            onClick={(e) => {
              e.stopPropagation();
              select(p.id);
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              (e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId);
              setDragging(p.id);
              select(p.id);
            }}
          >
            <PlantMark
              silhouette={sp.silhouette}
              color={sp.color}
              className="h-full w-full"
              sway={!dragging}
            />
            {selected && (
              <span className="absolute -bottom-1 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 font-display text-[10px] text-paper">
                {sp.name}
              </span>
            )}
          </button>
        );
      })}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16">
        <svg viewBox="0 0 1200 80" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
          <g transform="translate(0 -160)">
            <GroundStrip />
          </g>
        </svg>
      </div>
      <div
        data-ground="1"
        className="absolute inset-x-0 bottom-0 h-14 cursor-crosshair"
        onClick={onBackgroundClick}
      />
      <div className="pointer-events-none absolute bottom-10 left-[8%] right-[8%] flex justify-between opacity-70">
        <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden>
          <Tuft x={14} />
        </svg>
        <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden>
          <Tuft x={14} delay={-1} color="#5C5348" />
        </svg>
      </div>

      {farm.placements.length === 0 && (
        <p className="pointer-events-none absolute inset-x-0 top-1/3 text-center font-display text-lg italic text-ink-faint">
          {pickerId ? "Tap the ground to plant" : "Your acre is waiting"}
        </p>
      )}
    </div>
  );
}
