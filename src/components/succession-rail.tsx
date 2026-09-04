import { useEffect, useRef, useState } from "react";
import { Pause, Play, Columns2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { useFarmStore } from "@/lib/farm-store";
import {
  STAGES,
  YEAR_MAX,
  eventsFor,
  markerYears,
  plantLater,
  plantNow,
  scoreAtYear,
  stageAt,
  yearLabel,
} from "@/lib/succession";

export function SuccessionRail() {
  const farm = useFarmStore((s) => s.farm);
  const year = useFarmStore((s) => s.viewYear);
  const setYear = useFarmStore((s) => s.setViewYear);
  const compare = useFarmStore((s) => s.compareYear);
  const setCompare = useFarmStore((s) => s.setCompareYear);
  const stage = stageAt(year, farm);
  const now = scoreAtYear(farm, year);
  const later = scoreAtYear(farm, compare ?? 24);
  const events = eventsFor(farm);
  const markers = markerYears();
  const [playing, setPlaying] = useState(false);
  const playRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (playRef.current) cancelAnimationFrame(playRef.current);
    };
  }, []);

  function play() {
    if (playing) {
      if (playRef.current) cancelAnimationFrame(playRef.current);
      setPlaying(false);
      return;
    }
    setPlaying(true);
    const startY = year >= YEAR_MAX - 1 ? 0 : year;
    const dest = YEAR_MAX;
    const t0 = performance.now();
    const dur = 5200 * ((dest - startY) / YEAR_MAX);
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / Math.max(800, dur));
      const e = 1 - (1 - k) * (1 - k);
      setYear(startY + (dest - startY) * e);
      if (k < 1) playRef.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    playRef.current = requestAnimationFrame(tick);
  }

  const nowWave = plantNow(farm);
  const laterWaves = plantLater(farm, year);

  return (
    <section className="rounded-[24px] bg-paper-soft p-3 shadow-border sm:p-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">Succession</p>
          <p className="font-display text-xl leading-tight text-ink">
            {yearLabel(year)}
            <span className="ml-2 text-base italic text-ink-soft">{stage.name}</span>
          </p>
          <p className="mt-0.5 max-w-xl text-sm text-ink-soft">{stage.blurb}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="rounded-full bg-paper px-3 py-1 text-sm shadow-border">
            Combo <span className="tabular-nums font-medium">{now.score}</span>
            {compare !== null ? (
              <span className="text-ink-faint">
                {" "}
                · {yearLabel(compare)} {later.score}
              </span>
            ) : null}
          </p>
          <button
            type="button"
            onClick={play}
            className="grid size-9 place-items-center rounded-full bg-sage-deep text-paper"
            aria-label={playing ? "Pause succession" : "Play succession"}
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5 translate-x-px" />}
          </button>
          <button
            type="button"
            onClick={() => setCompare(compare === null ? 24 : null)}
            className={cn(
              "grid size-9 place-items-center rounded-full shadow-border",
              compare !== null ? "bg-ink text-paper" : "bg-paper text-ink",
            )}
            aria-label="Compare stages"
          >
            <Columns2 className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {STAGES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setYear(s.id === "mature" ? 24 : (s.from + s.to) / 2)}
            className={cn(
              "rounded-full px-3 py-1 text-[12px] transition-colors",
              stage.id === s.id ? "bg-ink text-paper" : "bg-paper text-ink-soft shadow-border",
            )}
          >
            {s.name}
            <span className="ml-1 hidden text-[10px] uppercase tracking-wider opacity-70 sm:inline">{s.range}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-4 px-1">
        <div className="pointer-events-none absolute inset-x-1 top-0 h-7">
          {events.map((e) => (
            <span
              key={e.label}
              className="absolute -top-0.5 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${(e.year / YEAR_MAX) * 100}%` }}
            >
              <span className="size-1.5 rounded-full bg-mustard-deep" />
              <span className="mt-0.5 hidden whitespace-nowrap text-[9px] uppercase tracking-wider text-ink-faint sm:block">
                {e.label}
              </span>
            </span>
          ))}
        </div>
        <input
          type="range"
          min={0}
          max={YEAR_MAX}
          step={0.25}
          value={year}
          onChange={(e) => {
            if (playing) play();
            setYear(Number(e.target.value));
          }}
          className="year-slider mt-6 w-full"
          aria-label="Farm age in years"
        />
        <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-ink-faint">
          {markers.map((m) => (
            <button key={m} type="button" className="tabular-nums" onClick={() => setYear(m)}>
              {m === 30 ? "30+" : `Y${m}`}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm text-ink">{stage.tip}</p>
      <p className="mt-1 text-xs text-ink-faint">{now.note}</p>

      {farm.placements.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ink-soft">
          <span>
            <span className="text-ink-faint">Plant now · </span>
            {nowWave.length ? nowWave.map((s) => s.name).join(", ") : "—"}
          </span>
          {laterWaves.map((w) => (
            <span key={w.wave}>
              <span className="text-ink-faint">{w.when} · </span>
              {w.plants.map((s) => s.name).join(", ")}
            </span>
          ))}
        </div>
      ) : null}

      {compare !== null ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <CompareCard title={yearLabel(year)} stage={stage.name} score={now.score} note={now.note} />
          <div>
            <label className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider text-ink-faint">
              Compare to
              <input
                type="range"
                min={0}
                max={YEAR_MAX}
                value={compare}
                onChange={(e) => setCompare(Number(e.target.value))}
                className="year-slider max-w-[160px]"
              />
            </label>
            <CompareCard
              title={yearLabel(compare)}
              stage={stageAt(compare, farm).name}
              score={later.score}
              note={later.note}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function CompareCard({
  title,
  stage,
  score,
  note,
}: {
  title: string;
  stage: string;
  score: number;
  note: string;
}) {
  return (
    <div className="rounded-2xl bg-paper px-3 py-2 shadow-border">
      <p className="text-sm font-medium text-ink">
        {title} <span className="font-display italic text-ink-soft">{stage}</span>
      </p>
      <p className="tabular-nums text-lg text-ink">{score}</p>
      <p className="text-xs text-ink-faint">{note}</p>
    </div>
  );
}
