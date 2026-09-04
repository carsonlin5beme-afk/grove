import { useState } from "react";
import { BeeSprite, Chicken } from "@/components/botanical";
import { cn } from "@/lib/cn";

const LEAVES: Array<{
  left: string;
  top: string;
  delay: string;
  duration: string;
  tone: "sage" | "coral" | "mustard";
  size: string;
}> = [
  { left: "14%", top: "8%", delay: "0s", duration: "10s", tone: "sage", size: "w-2.5 h-1.5" },
  { left: "28%", top: "2%", delay: "1.8s", duration: "12s", tone: "coral", size: "w-3 h-1.5" },
  { left: "41%", top: "12%", delay: "3.4s", duration: "9.5s", tone: "mustard", size: "w-2 h-1" },
  { left: "55%", top: "4%", delay: "0.7s", duration: "11s", tone: "sage", size: "w-2.5 h-1.5" },
  { left: "68%", top: "10%", delay: "4.6s", duration: "13s", tone: "coral", size: "w-3 h-2" },
  { left: "76%", top: "18%", delay: "2.2s", duration: "10.5s", tone: "sage", size: "w-2 h-1" },
  { left: "22%", top: "22%", delay: "6.1s", duration: "14s", tone: "mustard", size: "w-2.5 h-1.5" },
  { left: "88%", top: "6%", delay: "5.2s", duration: "11.5s", tone: "coral", size: "w-2 h-1" },
];

const TONE: Record<(typeof LEAVES)[number]["tone"], string> = {
  sage: "bg-sage",
  coral: "bg-coral",
  mustard: "bg-mustard",
};

function FallingLeaves() {
  return (
    <>
      {LEAVES.map((leaf) => (
        <span
          key={`${leaf.left}-${leaf.delay}`}
          className={`cover-leaf absolute rounded-[100%] ${leaf.size} ${TONE[leaf.tone]}`}
          style={{
            left: leaf.left,
            top: leaf.top,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
          }}
        />
      ))}
    </>
  );
}

export function CoverLife({ hen = true }: { hen?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <FallingLeaves />
      <div className="absolute top-[18%] left-[60%] size-8 sm:left-[64%]">
        <svg viewBox="0 0 16 12" className="size-6 overflow-visible sm:size-7">
          <BeeSprite />
        </svg>
      </div>
      <div className="absolute top-[30%] left-[36%] size-8 opacity-80">
        <svg viewBox="0 0 16 12" className="size-5 overflow-visible">
          <g style={{ animationDelay: "-3s" }}>
            <BeeSprite />
          </g>
        </svg>
      </div>
      {hen ? (
        <div className="absolute bottom-[16%] left-[38%] sm:bottom-[18%]">
          <svg viewBox="0 0 36 24" className="h-7 w-11 overflow-visible sm:h-8 sm:w-12">
            <Chicken />
          </svg>
        </div>
      ) : null}
    </div>
  );
}

export function IslandGrove({
  bloom,
  className = "",
}: {
  bloom?: "enter" | "guilds" | null;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      <div className={cn("cover-breathe relative", bloom && "cover-bloom")}>
        <img
          src="/grove-forest.jpg"
          alt="A little food-forest on a lilac island: chestnut and oak canopies, fruiting apples, nitrogen-fixing alder and locust, goumi and hazel shrubs, comfrey, vines, a hen, and a bee."
          className="mx-auto h-auto w-full max-w-xl mix-blend-multiply select-none lg:max-w-none"
          draggable={false}
        />
        <CoverLife />
        <div className="cover-vignette pointer-events-none absolute inset-0" aria-hidden />
      </div>
    </figure>
  );
}

const EDGE: Array<{ id: string; name: string; role: string; x: string; w: string }> = [
  { id: "oak", name: "White oak", role: "Canopy · mast", x: "1%", w: "11%" },
  { id: "locust", name: "Black locust", role: "Nitrogen fixer", x: "12%", w: "10%" },
  { id: "apple-a", name: "Apple", role: "Midstory fruit", x: "22%", w: "10%" },
  { id: "chestnut", name: "Chinese chestnut", role: "Canopy · mast", x: "32%", w: "12%" },
  { id: "goumi", name: "Goumi", role: "Actinorhizal shrub", x: "45%", w: "11%" },
  { id: "apple-b", name: "Apple", role: "Midstory fruit", x: "56%", w: "11%" },
  { id: "oak-b", name: "White oak", role: "Canopy · mast", x: "67%", w: "11%" },
  { id: "peach", name: "Peach", role: "Stone fruit", x: "78%", w: "10%" },
  { id: "alder", name: "Speckled alder", role: "Nitrogen fixer", x: "88%", w: "11%" },
];

export function HorizonGrove({ className = "" }: { className?: string }) {
  const [tip, setTip] = useState<(typeof EDGE)[number] | null>(null);

  return (
    <figure className={cn("relative w-full", className)}>
      <img
        src="/grove-edge.jpg"
        alt="An agroforestry forest edge: locust and alder fixing nitrogen, chestnut and oak canopies, apples and peach, goumi and hazel shrubs, comfrey and grass uncut at the base."
        className="h-[188px] w-full select-none object-cover object-bottom mix-blend-multiply sm:h-[220px] lg:h-[260px]"
        draggable={false}
      />
      {EDGE.map((t) => (
        <button
          key={t.id}
          type="button"
          className="absolute top-[10%] h-[75%] bg-transparent"
          style={{ left: t.x, width: t.w }}
          aria-label={`${t.name}, ${t.role}`}
          onMouseEnter={() => setTip(t)}
          onMouseLeave={() => setTip(null)}
          onFocus={() => setTip(t)}
          onBlur={() => setTip(null)}
        />
      ))}
      {tip ? (
        <div
          className="pointer-events-none absolute z-10 rounded-full bg-paper/95 px-3 py-1.5 shadow-border backdrop-blur-sm"
          style={{ left: `calc(${tip.x} + ${tip.w} / 2)`, top: "6%", transform: "translate(-50%, -100%)" }}
        >
          <p className="whitespace-nowrap text-[12px] font-medium text-ink">{tip.name}</p>
          <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.12em] text-ink-faint">{tip.role}</p>
        </div>
      ) : null}
    </figure>
  );
}
