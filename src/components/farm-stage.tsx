import { useEffect, useRef, useState, type ComponentType } from "react";
import { Maximize2, Minimize2, RotateCcw, RotateCw } from "lucide-react";
import { SPECIES_BY_ID } from "@/lib/species";
import { stageAt, yearLabel } from "@/lib/succession";
import { useFarmStore } from "@/lib/farm-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function FarmStage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [Scene, setScene] = useState<ComponentType | null>(null);
  const [full, setFull] = useState(false);
  const pickerId = useFarmStore((s) => s.pickerId);
  const selectedId = useFarmStore((s) => s.selectedId);
  const selectedIds = useFarmStore((s) => s.selectedIds);
  const farm = useFarmStore((s) => s.farm);
  const pick = useFarmStore((s) => s.pick);
  const uproot = useFarmStore((s) => s.uproot);
  const select = useFarmStore((s) => s.select);
  const rotate = useFarmStore((s) => s.rotate);
  const walkMode = useFarmStore((s) => s.walkMode);
  const setWalkMode = useFarmStore((s) => s.setWalkMode);
  const viewYear = useFarmStore((s) => s.viewYear);
  const placeNote = useFarmStore((s) => s.placeNote);
  const stage = stageAt(viewYear, farm);

  useEffect(() => {
    let live = true;
    import("./farm-diorama").then((m) => {
      if (live) setScene(() => m.FarmDiorama);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("walk") === "1") setWalkMode(true);
  }, [setWalkMode]);

  useEffect(() => {
    const onFs = () => {
      const on = document.fullscreenElement === wrapRef.current;
      setFull(on);
      setWalkMode(on || new URLSearchParams(window.location.search).get("walk") === "1");
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, [setWalkMode]);

  async function toggleFull() {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await el.requestFullscreen();
    }
  }

  const selected = farm.placements.find((p) => p.id === selectedId);
  const selectedSp = selected ? SPECIES_BY_ID[selected.speciesId] : null;
  const picker = pickerId ? SPECIES_BY_ID[pickerId] : null;
  const extra = selectedIds.length > 1 ? selectedIds.length : 0;

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative overflow-hidden bg-[#D8E4C4]",
        full ? "h-full min-h-0" : "h-[68vh] min-h-[420px] sm:min-h-[560px] lg:h-[74vh]",
      )}
    >
      {Scene ? (
        <Scene />
      ) : (
        <div className="grid h-full place-items-center">
          <p className="font-display italic text-ink-faint">Waking the acre…</p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 sm:p-4">
        <p className="rounded-full bg-paper/85 px-3 py-1 text-[11px] text-ink-soft shadow-border backdrop-blur-sm">
          {yearLabel(viewYear)} · {stage.name}
          {" · "}
          {placeNote
            ? placeNote
            : picker
            ? picker.layer === "vine"
              ? `Drop ${picker.name} on a tree or large shrub`
              : `Ghost of ${picker.name} — sapling on release`
            : farm.placements.length === 0
              ? "Drag a plant onto the grass. It starts as a sapling."
              : "WASD look · arrows walk · drag to plant"}
        </p>
        <div className="pointer-events-auto flex gap-1.5">
          {picker ? (
            <button
              type="button"
              className="rounded-full bg-paper/90 px-3 py-1 text-[11px] text-ink shadow-border"
              onClick={() => pick(null)}
            >
              Cancel
            </button>
          ) : null}
          <button
            type="button"
            aria-label={full ? "Exit fullscreen" : "Enter fullscreen"}
            className="grid size-8 place-items-center rounded-full bg-paper/90 text-ink shadow-border"
            onClick={() => void toggleFull()}
          >
            {full ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </button>
        </div>
      </div>

      {selectedSp ? (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-2xl bg-paper/90 px-3 py-2 shadow-border backdrop-blur-sm sm:left-4 sm:right-auto sm:min-w-[280px]">
          <div className="min-w-0">
            <p className="truncate font-medium text-ink">
              {selectedSp.name}
              {extra ? <span className="ml-1 text-ink-faint">+{extra - 1}</span> : null}
            </p>
            <p className="truncate font-display text-xs italic text-ink-faint">{selectedSp.latin}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="grid size-8 place-items-center rounded-full hover:bg-ink/6"
              aria-label="Rotate left"
              onClick={() => selected && rotate(selected.id, -0.25)}
            >
              <RotateCcw className="size-3.5" />
            </button>
            <button
              type="button"
              className="grid size-8 place-items-center rounded-full hover:bg-ink/6"
              aria-label="Rotate right"
              onClick={() => selected && rotate(selected.id, 0.25)}
            >
              <RotateCw className="size-3.5" />
            </button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                for (const id of selectedIds) uproot(id);
                select(null);
              }}
            >
              Uproot
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
