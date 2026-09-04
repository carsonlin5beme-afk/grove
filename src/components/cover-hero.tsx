import { useState } from "react";
import { CoverLife } from "@/components/cover-art";
import { cn } from "@/lib/cn";

const HOTSPOTS: Array<{ id: string; name: string; role: string; left: string; top: string; w: string; h: string }> = [
  { id: "goumi", name: "Goumi", role: "Actinorhizal shrub", left: "3%", top: "42%", w: "16%", h: "30%" },
  { id: "pine", name: "White pine", role: "Windbreak · fungal partner", left: "16%", top: "20%", w: "13%", h: "42%" },
  { id: "apple-l", name: "Apple", role: "Midstory fruit", left: "26%", top: "34%", w: "16%", h: "40%" },
  { id: "chestnut", name: "Chinese chestnut", role: "Calorie canopy", left: "40%", top: "4%", w: "28%", h: "70%" },
  { id: "alder", name: "Alder", role: "Nitrogen fixer", left: "66%", top: "8%", w: "18%", h: "42%" },
  { id: "hazel", name: "Hazel", role: "Nut shrub", left: "55%", top: "40%", w: "15%", h: "28%" },
  { id: "apple-r", name: "Apple", role: "Midstory fruit", left: "76%", top: "34%", w: "20%", h: "42%" },
  { id: "hen", name: "Hen", role: "Orchard cleaner", left: "44%", top: "76%", w: "14%", h: "16%" },
];

export function CoverHero({
  bloom,
  className,
}: {
  bloom?: "enter" | "guilds" | null;
  className?: string;
}) {
  const [tip, setTip] = useState<(typeof HOTSPOTS)[number] | null>(null);

  return (
    <figure
      className={cn("relative", className)}
      aria-label="A hand-drawn agroforestry guild on a lilac island: pine, goumi, apple, Chinese chestnut, alder, hazel, a hen, and a nurse stump."
    >
      <div className={cn("cover-breathe relative", bloom && "cover-bloom")}>
        <img
          src="/grove-island-guild.jpg"
          alt=""
          className="pointer-events-none mx-auto h-auto max-h-[54vh] w-full select-none object-contain object-bottom mix-blend-multiply sm:max-h-[60vh] lg:max-h-[82vh]"
          draggable={false}
        />
        <CoverLife hen={false} />
        {HOTSPOTS.map((t) => (
          <button
            key={t.id}
            type="button"
            className="absolute bg-transparent"
            style={{ left: t.left, top: t.top, width: t.w, height: t.h }}
            aria-label={`${t.name} — ${t.role}`}
            onMouseEnter={() => setTip(t)}
            onMouseLeave={() => setTip(null)}
            onFocus={() => setTip(t)}
            onBlur={() => setTip(null)}
          />
        ))}
        {tip ? (
          <div
            className="pointer-events-none absolute z-10 rounded-full bg-paper/95 px-3 py-1.5 shadow-border"
            style={{ left: `calc(${tip.left} + ${tip.w} / 2)`, top: tip.top, transform: "translate(-50%, -110%)" }}
          >
            <p className="whitespace-nowrap text-[12px] font-medium text-ink">{tip.name}</p>
            <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.12em] text-ink-faint">{tip.role}</p>
          </div>
        ) : null}
      </div>
    </figure>
  );
}
