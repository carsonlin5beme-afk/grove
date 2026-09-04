import { useEffect, useMemo, useRef, useState, type PointerEvent as PE } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SpeciesPortrait } from "@/components/species-portrait";
import { Button } from "@/components/ui/button";
import { GUILDS, type Guild } from "@/lib/guilds";
import {
  GLOSSARY,
  STORY_BY_ID,
  guildFuel,
  nameOf,
  type GuildStory,
} from "@/lib/guild-stories";
import { SPECIES_BY_ID } from "@/lib/species";
import { useFarmStore } from "@/lib/farm-store";
import { SYSTEM_LABEL } from "@/lib/types";
import { cn } from "@/lib/cn";

const SLIDE_TITLES = [
  "Meet the crew",
  "The idea",
  "Who does what",
  "How they help each other",
  "Over the years",
  "Fuel for the human machine",
  "Words worth knowing",
  "Watch-outs",
];

let focusedGuild = "";

export function GuildDeck() {
  return (
    <div className="space-y-20 pb-16">
      <nav className="sticky top-14 z-20 -mx-4 overflow-x-auto bg-paper/80 px-4 py-2 backdrop-blur-sm sm:-mx-6 sm:px-6">
        <ul className="flex gap-2">
          {GUILDS.map((g, i) => (
            <li key={g.id} className="shrink-0">
              <a
                href={`#${g.id}`}
                className="block rounded-full bg-paper-soft px-3 py-1.5 text-left shadow-border hover:bg-ink/5"
              >
                <span className="block text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                  {String(i + 1).padStart(2, "0")} · {SYSTEM_LABEL[g.system]}
                </span>
                <span className="block font-display text-sm leading-tight">{g.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {GUILDS.map((g, i) => (
        <GuildCarousel key={g.id} guild={g} index={i} />
      ))}
    </div>
  );
}

function GuildCarousel({ guild, index }: { guild: Guild; index: number }) {
  const [slide, setSlide] = useState(0);
  const [dragX, setDragX] = useState(0);
  const last = SLIDE_TITLES.length - 1;
  const story = STORY_BY_ID[guild.id];
  const applyGuild = useFarmStore((s) => s.applyGuild);
  const finish = useFarmStore((s) => s.finishOnboarding);
  const navigate = useNavigate();
  const stageRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; armed: boolean; from: number } | null>(null);
  const wheelLock = useRef(0);
  const inView = useRef(false);

  function plant() {
    finish();
    applyGuild(guild.members);
    void navigate({ to: "/studio" });
  }

  function go(n: number) {
    const next = Math.max(0, Math.min(last, n));
    setSlide(next);
    setDragX(0);
    requestAnimationFrame(() => {
      liveRef.current?.focus({ preventScroll: true });
    });
  }

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry?.intersectionRatio ?? 0;
        if (entry?.isIntersecting && ratio > 0.35) {
          inView.current = true;
          focusedGuild = guild.id;
        } else if (focusedGuild === guild.id) {
          inView.current = false;
          focusedGuild = "";
        }
      },
      { threshold: [0.25, 0.4, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current || focusedGuild !== guild.id) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const prev = e.key === "ArrowLeft" || e.key === "a" || e.key === "A" || e.key === "w" || e.key === "W";
      const next = e.key === "ArrowRight" || e.key === "d" || e.key === "D" || e.key === "s" || e.key === "S";
      if (!prev && !next) return;
      e.preventDefault();
      go(slide + (next ? 1 : -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slide, last]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onNativeWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < 18 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      const now = performance.now();
      if (now - wheelLock.current < 420) return;
      wheelLock.current = now;
      e.preventDefault();
      go(slide + (e.deltaX > 0 ? 1 : -1));
    };
    el.addEventListener("wheel", onNativeWheel, { passive: false });
    return () => el.removeEventListener("wheel", onNativeWheel);
  }, [slide, last]);

  function onPointerDown(e: PE<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button, a, input")) return;
    drag.current = { x: e.clientX, y: e.clientY, armed: false, from: slide };
    stageRef.current?.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PE<HTMLDivElement>) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (!drag.current.armed) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.current = null;
        return;
      }
      drag.current.armed = true;
    }
    e.preventDefault();
    setDragX(dx);
  }

  function onPointerUp() {
    if (!drag.current) return;
    const dx = dragX;
    drag.current = null;
    if (dx < -56) go(slide + 1);
    else if (dx > 56) go(slide - 1);
    else setDragX(0);
  }

  return (
    <section id={guild.id} className="scroll-mt-28">
      <header className="mb-4 px-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          {String(index + 1).padStart(2, "0")} · {SYSTEM_LABEL[guild.system]} · zone {guild.zone}
        </p>
        <h2 className="font-display text-3xl leading-none tracking-tight sm:text-4xl">{guild.name}</h2>
      </header>

      <div
        ref={stageRef}
        className="relative h-[32rem] touch-pan-y overflow-x-hidden sm:h-[34rem]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current = null;
          setDragX(0);
        }}
      >
        {SLIDE_TITLES.map((title, i) => {
          const d = i - slide;
          if (Math.abs(d) > 1 && Math.abs(dragX) < 4) return null;
          const active = d === 0;
          const pull = dragX / (stageRef.current?.clientWidth || 640);
          return (
            <article
              key={title}
              ref={active ? liveRef : undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${title}, ${i + 1} of ${SLIDE_TITLES.length}`}
              tabIndex={active ? 0 : -1}
              onClick={() => {
                if (!active) go(i);
              }}
              className={cn(
                "absolute top-0 h-full w-[76%] overflow-hidden rounded-[28px] bg-paper-soft shadow-border outline-none transition-[transform,opacity] duration-500 ease-[var(--ease-out-soft)]",
                active
                  ? cn(
                      "z-10 cursor-default focus-visible:ring-2 focus-visible:ring-ring/50",
                      dragX === 0 && "card-idle",
                    )
                  : "z-0 cursor-pointer opacity-55",
                drag.current?.armed && "duration-0",
              )}
              style={
                active
                  ? {
                      left: "50%",
                      transform: `translateX(calc(-50% + ${dragX}px))`,
                      animationDelay: `${-index * 0.8}s`,
                    }
                  : {
                      left: "50%",
                      transform: `translateX(calc(-50% + ${d * 72 + pull * 28}%)) rotate(${d * 2.2}deg) scale(0.9)`,
                    }
              }
            >
              <header className="flex items-end justify-between gap-3 border-b border-ink/8 px-5 py-3 sm:px-6">
                <p className="font-display text-sm italic text-ink-faint">{title}</p>
                <p className="text-[11px] tabular-nums text-ink-faint">
                  {String(i + 1).padStart(2, "0")} / {String(SLIDE_TITLES.length).padStart(2, "0")}
                </p>
              </header>
              <div className="h-[calc(100%-3.25rem)] overflow-y-auto px-5 py-4 sm:px-6">
                <SlideBody slide={i} story={story} guild={guild} />
              </div>
            </article>
          );
        })}
      </div>

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-1.5">
          {SLIDE_TITLES.map((t, i) => (
            <button
              key={t}
              type="button"
              aria-label={t}
              aria-current={i === slide ? "true" : undefined}
              onClick={() => go(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === slide ? "w-6 bg-ink" : "w-2 bg-ink/20 hover:bg-ink/40",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" disabled={slide === 0} onClick={() => go(slide - 1)}>
            <ChevronLeft className="size-4" />
            Back
          </Button>
          {slide < last ? (
            <Button size="sm" onClick={() => go(slide + 1)}>
              Next
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button size="sm" onClick={plant}>
              Plant this guild
            </Button>
          )}
        </div>
      </footer>
    </section>
  );
}

function SlideBody({
  slide,
  story,
  guild,
}: {
  slide: number;
  story: GuildStory;
  guild: Guild;
}) {
  const fuel = useMemo(() => guildFuel(guild.members), [guild.members]);

  if (slide === 0) {
    return (
      <div>
        <p className="max-w-2xl text-lg text-ink">{story.plainHook}</p>
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {story.roles.map((r, i) => {
            const sp = SPECIES_BY_ID[r.id];
            if (!sp) return null;
            return (
              <li
                key={r.id}
                className="group rounded-2xl bg-paper px-3 py-3 shadow-border transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span
                  className="mx-auto grid h-16 w-12 place-items-center sway"
                  style={{ animationDelay: `${-i * 0.7}s` }}
                >
                  <SpeciesPortrait
                    species={sp}
                    className="h-16 w-12 transition-transform duration-200 group-hover:scale-110"
                  />
                </span>
                <p className="mt-2 text-center text-sm font-medium text-ink">{sp.name}</p>
                <p className="text-center text-[11px] uppercase tracking-[0.12em] text-ink-faint">{r.job}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (slide === 1) {
    return (
      <div className="max-w-2xl space-y-4">
        <p className="font-display text-2xl leading-snug text-ink">{story.metaphor}</p>
        <p className="text-sm italic text-ink-soft">{guild.hook}</p>
      </div>
    );
  }

  if (slide === 2) {
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        {story.roles.map((r, i) => {
          const sp = SPECIES_BY_ID[r.id];
          if (!sp) return null;
          return (
            <li key={r.id} className="flex gap-3 rounded-2xl bg-paper px-3 py-3 shadow-border">
              <span className="sway mt-0.5" style={{ animationDelay: `${-i * 0.5}s` }}>
                <SpeciesPortrait species={sp} className="h-14 w-10" />
              </span>
              <div className="min-w-0">
                <p className="font-medium text-ink">{sp.name}</p>
                <p className="text-[11px] uppercase tracking-[0.12em] text-ink-faint">{r.job}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  <span className="text-ink">Gives.</span> {r.gives}
                </p>
                <p className="text-sm text-ink-soft">
                  <span className="text-ink">Needs.</span> {r.needs}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  if (slide === 3) {
    return (
      <ul className="space-y-3">
        {story.links.map((l) => (
          <li key={`${l.from}-${l.to}`} className="rounded-2xl bg-paper px-4 py-3 shadow-border">
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              {nameOf(l.from)} <span className="text-sage-deep">helps</span> {nameOf(l.to)}
            </p>
            <p className="mt-1 text-sm text-ink">{l.because}</p>
          </li>
        ))}
      </ul>
    );
  }

  if (slide === 4) {
    return (
      <ol className="space-y-4">
        {story.years.map((y) => (
          <li key={y.when} className="grid gap-1 sm:grid-cols-[140px_1fr]">
            <p className="font-display text-lg text-ink">{y.when}</p>
            <p className="text-sm text-ink-soft">{y.what}</p>
          </li>
        ))}
      </ol>
    );
  }

  if (slide === 5) {
    return (
      <div>
        <p className="max-w-2xl text-sm text-ink">
          Treat the eater as an animal trying to hit peak form — eyes that work at dusk,
          collagen that holds, mitochondria that turn food into work. This acre is a fuel map.
        </p>
        <ul className="mt-4 space-y-3">
          {fuel.slice(0, 5).map((n) => (
            <li key={n.key} className="rounded-2xl bg-paper px-4 py-3 shadow-border">
              <p className="font-medium text-ink">{n.label}</p>
              <p className="mt-1 text-sm text-ink">{n.guide.role}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{n.guide.human}</p>
              {n.sources.length > 0 && (
                <p className="mt-2 text-xs text-sage-deep">
                  On this guild: {n.sources.map((s) => s.name).join(", ")}
                </p>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-faint">
          Deeper physiology lives on the{" "}
          <Link to="/nutrients" className="underline decoration-ink/25 underline-offset-2">
            nutrient atlas
          </Link>
          .
        </p>
      </div>
    );
  }

  if (slide === 6) {
    return (
      <dl className="grid gap-3 sm:grid-cols-2">
        {story.terms.map((key) => {
          const say = GLOSSARY[key];
          if (!say) return null;
          return (
            <div key={key} className="rounded-2xl bg-paper px-4 py-3 shadow-border">
              <dt className="font-display text-lg text-ink">{key}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{say}</dd>
            </div>
          );
        })}
      </dl>
    );
  }

  return (
    <div>
      <ul className="space-y-2">
        {story.watch.map((w) => (
          <li key={w} className="rounded-2xl bg-paper px-4 py-3 text-sm text-ink shadow-border">
            {w}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button asChild variant="outline">
          <Link to="/studio">Open studio</Link>
        </Button>
      </div>
    </div>
  );
}
