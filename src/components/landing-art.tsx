import { useState } from "react";
import { cn } from "@/lib/cn";

const INK = "#2A2218";

function P({
  d,
  fill,
  sw = 1.45,
  opacity = 1,
}: {
  d: string;
  fill: string;
  sw?: number;
  opacity?: number;
}) {
  return (
    <path
      d={d}
      fill={fill}
      stroke={INK}
      strokeWidth={sw}
      strokeLinejoin="round"
      strokeLinecap="round"
      opacity={opacity}
    />
  );
}

/** Speckled alder — narrow oval, catkins, actinorhizal N-fixer. */
function Alder({ className }: { className?: string }) {
  return (
    <g className={className} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <path d="M118 368 C116 300 114 250 120 208" stroke="#6A5A48" strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <path d="M118 280 C102 250 96 230 100 214" stroke="#6A5A48" strokeWidth="2.4" fill="none" />
      <path d="M120 268 C136 246 144 228 140 212" stroke="#6A5A48" strokeWidth="2.2" fill="none" />
      <P fill="#6E8A72" d="M120 214 C92 218 78 188 90 164 C78 152 84 128 108 126 C110 104 132 94 148 110 C168 100 186 118 176 138 C192 148 188 172 168 178 C174 200 146 218 120 214 Z" />
      <P fill="#7E9A80" sw={1.2} d="M122 176 C106 178 100 158 110 148 C104 138 118 128 130 136 C142 128 154 140 146 152 C154 164 138 178 122 176 Z" />
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} cx={108 + i * 8} cy={198 + (i % 2) * 6} rx="2.2" ry="4.5" fill="#6A4A32" stroke={INK} strokeWidth="0.7" />
      ))}
    </g>
  );
}

/** Chinese chestnut — broad lobed canopy, forked trunk, burs. */
function Chestnut({ className }: { className?: string }) {
  return (
    <g className={className} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <path d="M318 372 C314 300 308 240 322 176" stroke="#6A5844" strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M318 250 C286 214 268 188 274 168" stroke="#5E4E3A" strokeWidth="4.2" fill="none" />
      <path d="M324 236 C354 210 378 188 386 168" stroke="#5E4E3A" strokeWidth="4" fill="none" />
      <path d="M316 210 C300 192 292 176 296 164" stroke="#5E4E3A" strokeWidth="2.6" fill="none" />
      <P
        fill="#6F9A6E"
        d="M322 168 C268 176 228 150 234 112 C210 102 214 68 250 64 C258 36 300 22 332 42 C368 20 414 36 412 72 C446 78 454 112 422 128 C434 156 396 172 362 158 C348 174 332 168 322 168 Z"
      />
      <P
        fill="#86B07E"
        sw={1.2}
        d="M328 122 C300 126 286 102 300 88 C290 74 312 60 332 70 C352 58 376 70 368 90 C382 104 358 128 328 122 Z"
      />
      <P fill="#5E8A5C" sw={1.15} d="M276 148 C258 150 250 132 262 124 C254 112 270 104 282 112 C294 104 306 116 298 128 C306 140 290 150 276 148 Z" />
      {[
        [292, 154],
        [348, 148],
        [318, 168],
        [366, 132],
        [278, 128],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="5.2" fill="#C4A06A" stroke={INK} strokeWidth="0.9" />
          <path d="M0 -6 L1.2 -9 M4 -4 L7 -6 M5 2 L8 3 M0 6 L0 9 M-5 2 L-8 4 M-4 -4 L-7 -7" stroke={INK} strokeWidth="0.8" />
        </g>
      ))}
    </g>
  );
}

/** Apple — shorter scaffold, coral canopy, fruit. */
function AppleTree({ className }: { className?: string }) {
  return (
    <g className={className} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <path d="M508 370 C506 310 500 268 514 228" stroke="#6A5040" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M508 300 C478 274 462 254 468 236" stroke="#5A4234" strokeWidth="3.2" fill="none" />
      <path d="M512 292 C540 270 558 252 562 236" stroke="#5A4234" strokeWidth="3" fill="none" />
      <P
        fill="#D08A7C"
        d="M514 232 C474 238 452 210 462 184 C444 174 450 146 478 146 C484 124 514 116 536 132 C564 118 590 136 582 162 C604 170 604 196 580 206 C588 228 556 240 532 226 C524 238 518 234 514 232 Z"
      />
      <P fill="#E0A89E" sw={1.15} d="M518 188 C498 190 490 170 502 160 C494 148 514 140 526 150 C540 140 556 152 546 166 C556 178 536 192 518 188 Z" />
      {[
        [490, 200, 5],
        [532, 196, 5.4],
        [556, 184, 4.6],
        [508, 176, 4.8],
        [544, 214, 5],
        [476, 186, 4.4],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#C45A4A" stroke={INK} strokeWidth="0.85" />
      ))}
    </g>
  );
}

/** Goumi — actinorhizal gold shrub, red berries. */
function Goumi({ className }: { className?: string }) {
  return (
    <g className={className} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <path d="M430 372 V338" stroke="#6A5A40" strokeWidth="4" strokeLinecap="round" />
      <path d="M418 372 V346" stroke="#6A5A40" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M444 372 V348" stroke="#6A5A40" strokeWidth="3" strokeLinecap="round" />
      <P fill="#D4A24C" d="M430 348 C400 352 388 322 404 304 C390 290 404 270 428 276 C432 256 458 254 468 274 C488 270 498 292 484 308 C498 324 484 348 456 342 C448 354 436 352 430 348 Z" />
      <P fill="#E8C878" sw={1.15} d="M432 312 C416 314 410 296 420 288 C414 276 432 270 442 280 C454 274 464 286 456 296 C464 308 446 316 432 312 Z" />
      {[
        [416, 318],
        [448, 310],
        [460, 330],
        [404, 328],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.1" fill="#B03A3A" stroke={INK} strokeWidth="0.7" />
      ))}
    </g>
  );
}

/** Comfrey — large lance leaves, hanging bells. Dynamic accumulator. */
function Comfrey({ className }: { className?: string }) {
  return (
    <g className={className} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <P fill="#5E8A58" d="M214 372 C200 340 188 318 196 306 C208 312 218 338 220 372 Z" />
      <P fill="#6F9A6A" d="M228 372 C224 328 232 300 246 292 C252 308 246 340 238 372 Z" />
      <P fill="#4E7A4E" d="M202 372 C190 348 174 328 168 322 C180 318 198 344 206 372 Z" />
      <P fill="#7BA86A" d="M240 370 C248 338 268 318 280 316 C272 332 256 352 246 372 Z" />
      <path d="M246 300 C248 286 252 274 250 266" stroke="#6A8A58" strokeWidth="1.6" fill="none" />
      <path d="M248 272 C244 276 240 274 242 268" fill="#C97B9A" stroke={INK} strokeWidth="0.7" />
      <path d="M252 266 C248 270 244 268 246 262" fill="#C97B9A" stroke={INK} strokeWidth="0.7" />
    </g>
  );
}

/** Scarlet runner bean on the chestnut. */
function RunnerBean({ className }: { className?: string }) {
  return (
    <g className={className} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <path
        d="M326 368 C338 340 308 318 324 292 C340 268 312 248 328 224 C340 208 332 196 336 184"
        fill="none"
        stroke="#4A6A48"
        strokeWidth="2.1"
      />
      <P fill="#6A8A58" sw={1} d="M332 250 C324 248 320 238 328 234 C336 232 340 242 332 250 Z" />
      <P fill="#5E7A50" sw={1} d="M320 288 C312 286 308 276 316 272 C324 270 328 280 320 288 Z" />
      <P fill="#C45A4A" sw={0.9} d="M334 214 C328 210 330 202 336 202 C340 206 338 214 334 214 Z" />
      <P fill="#C45A4A" sw={0.9} d="M328 204 C322 200 324 192 330 192 C334 196 332 204 328 204 Z" />
    </g>
  );
}

/** Nasturtium — peltate leaves, orange flowers. Groundcover. */
function Nasturtium({ className }: { className?: string }) {
  return (
    <g className={className} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <circle cx="262" cy="368" r="11" fill="#6A8A52" stroke={INK} strokeWidth="1.1" />
      <circle cx="284" cy="374" r="8.5" fill="#7A9A5A" stroke={INK} strokeWidth="1" />
      <circle cx="246" cy="376" r="7.5" fill="#5E7A48" stroke={INK} strokeWidth="1" />
      <P fill="#E07A3A" sw={0.9} d="M270 356 C266 350 272 344 276 350 C280 344 284 352 278 356 C276 360 272 360 270 356 Z" />
      <P fill="#D45A2A" sw={0.85} d="M252 360 C248 354 254 350 258 356 C256 362 252 362 252 360 Z" />
    </g>
  );
}

function Stump() {
  return (
    <g style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <P fill="#C4A06A" d="M168 372 L156 328 C156 320 180 318 190 328 L182 372 Z" />
      <ellipse cx="173" cy="326" rx="18" ry="7.5" fill="#E8D4B0" stroke={INK} strokeWidth="1.2" />
      <ellipse cx="173" cy="326" rx="10" ry="3.8" fill="none" stroke={INK} strokeWidth="0.8" />
      <ellipse cx="173" cy="326" rx="4" ry="1.6" fill="#8A6A40" stroke={INK} strokeWidth="0.6" />
      <path d="M164 328 C160 300 154 284 158 270" stroke="#5E7A50" strokeWidth="2" fill="none" />
      <P fill="#7BA86A" sw={1.1} d="M158 274 C148 276 144 262 152 256 C148 246 162 242 166 252 C174 250 176 262 168 268 C168 276 162 276 158 274 Z" />
      <path d="M180 330 C186 304 196 286 194 272" stroke="#5E7A50" strokeWidth="2" fill="none" />
      <P fill="#6F9A6A" sw={1.1} d="M194 276 C186 278 182 264 190 258 C186 248 202 244 206 254 C214 252 214 266 206 272 C206 280 198 280 194 276 Z" />
    </g>
  );
}

function Hen() {
  return (
    <g className="cover-hen" style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <ellipse cx="360" cy="366" rx="14" ry="10" fill="#D4A24C" stroke={INK} strokeWidth="1.2" />
      <circle cx="374" cy="360" r="6.2" fill="#D4A24C" stroke={INK} strokeWidth="1.1" />
      <path d="M380 360 L388 362 L380 364 Z" fill="#C45A4A" stroke={INK} strokeWidth="0.7" />
      <path d="M372 354 C374 350 378 350 376 354" fill="#C45A4A" stroke={INK} strokeWidth="0.7" />
      <path d="M350 368 C346 360 340 362 346 370" fill="#B8862E" stroke={INK} strokeWidth="0.8" />
    </g>
  );
}

function Wren() {
  return (
    <g className="cover-wren">
      <ellipse cx="300" cy="158" rx="6" ry="4" fill="#8A6A48" stroke={INK} strokeWidth="0.8" />
      <circle cx="306" cy="156" r="2.8" fill="#8A6A48" stroke={INK} strokeWidth="0.7" />
      <path d="M308.5 156 L312 157" stroke={INK} strokeWidth="0.8" />
    </g>
  );
}

function Bee() {
  return (
    <g className="cover-bee">
      <ellipse cx="0" cy="0" rx="4.2" ry="2.8" fill="#D4A24C" stroke={INK} strokeWidth="0.8" />
      <path d="M-1.5 -2 V2 M1.2 -2 V2" stroke={INK} strokeWidth="0.7" />
      <ellipse cx="-2" cy="-3.2" rx="2.4" ry="1.6" fill="#E8F0EC" stroke={INK} strokeWidth="0.5" opacity="0.85" />
    </g>
  );
}

function Island() {
  return (
    <g>
      <P
        fill="#C4B4D2"
        sw={1.6}
        d="M70 392 C40 388 36 368 80 362 C120 352 160 366 210 358 C280 346 340 362 410 354 C490 344 560 358 610 352 C660 348 680 368 650 386 C620 406 540 402 470 408 C390 416 320 400 250 408 C180 416 110 404 70 392 Z"
      />
      <P
        fill="#B4A2C4"
        sw={0}
        opacity={0.55}
        d="M90 384 C120 376 180 386 230 378 C300 368 370 382 430 376 C500 368 560 380 600 376 C590 392 520 396 450 400 C370 406 300 392 230 400 C160 406 110 394 90 384 Z"
      />
    </g>
  );
}

export function GuildHero({ bloom, className }: { bloom?: "enter" | "guilds" | null; className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <svg
        viewBox="40 40 660 390"
        className="cover-hero-svg mx-auto h-auto w-full max-w-xl overflow-visible lg:max-w-none"
        role="img"
        aria-label="A chestnut food-forest guild: Chinese chestnut as the nut canopy, speckled alder fixing nitrogen, apple in the midstory, goumi as an actinorhizal shrub, comfrey mining minerals, scarlet runner bean on the trunk, nasturtium as groundcover, a sprouting stump, a hen, a wren, and a bee."
      >
        <Island />
        <g className={cn("guild-layer guild-l1 sway-slow", bloom === "guilds" && "is-bloom")}>
          <Alder />
        </g>
        <g className={cn("guild-layer guild-l3 sway", bloom === "enter" && "is-bloom")}>
          <Chestnut />
        </g>
        <g className={cn("guild-layer guild-l3 sway-d2 bloom-apple", bloom === "enter" && "is-bloom")}>
          <AppleTree />
        </g>
        <g className={cn("guild-layer guild-l2 sway-tiny", bloom === "guilds" && "is-bloom")}>
          <Goumi />
        </g>
        <g className="guild-layer guild-l1">
          <Comfrey />
          <Nasturtium />
          <Stump />
        </g>
        <g className="guild-layer guild-l2">
          <RunnerBean />
        </g>
        <Hen />
        <Wren />
        <g transform="translate(272 348)">
          <Bee />
        </g>
      </svg>
      <div className="cover-vignette pointer-events-none absolute inset-0" aria-hidden />
    </figure>
  );
}

const EDGE: Array<{
  id: string;
  name: string;
  role: string;
  x: string;
  w: string;
}> = [
  { id: "alder", name: "Speckled alder", role: "Nitrogen fixer", x: "4%", w: "11%" },
  { id: "hazel", name: "Hazelnut", role: "Shrub layer · nuts", x: "14%", w: "10%" },
  { id: "chestnut", name: "Chinese chestnut", role: "Canopy · mast", x: "24%", w: "13%" },
  { id: "apple-a", name: "Apple", role: "Midstory fruit", x: "38%", w: "11%" },
  { id: "apple-b", name: "Apple", role: "Midstory fruit", x: "48%", w: "11%" },
  { id: "goumi", name: "Goumi", role: "Actinorhizal shrub", x: "58%", w: "10%" },
  { id: "oak", name: "White oak", role: "Canopy · mast", x: "68%", w: "13%" },
  { id: "locust", name: "Black locust", role: "Nitrogen fixer", x: "80%", w: "10%" },
  { id: "peach", name: "Peach", role: "Stone fruit", x: "90%", w: "9%" },
];

export function ForestEdge({ className }: { className?: string }) {
  const [tip, setTip] = useState<(typeof EDGE)[number] | null>(null);

  return (
    <figure className={cn("relative w-full", className)}>
      <svg
        viewBox="0 0 1440 280"
        className="cover-edge-svg h-auto w-full overflow-visible"
        preserveAspectRatio="xMidYMax meet"
        role="img"
        aria-label="A continuous forest edge: alder, hazel, chestnut, apples, goumi, white oak, black locust, and peach, with grass and undergrowth uncut at the base."
      >
        <P
          fill="#C4B4D2"
          sw={0}
          d="M0 188 C80 176 160 192 260 180 C400 164 520 190 680 176 C860 160 1020 188 1180 174 C1300 164 1380 180 1440 176 L1440 280 L0 280 Z"
        />
        <P
          fill="#B8A4C6"
          sw={0}
          d="M0 214 C120 204 280 220 420 208 C620 190 820 218 1040 204 C1220 192 1340 210 1440 206 L1440 280 L0 280 Z"
        />

        {/* hill behind the apples */}
        <P fill="#D4A24C" sw={1.3} d="M620 188 C680 130 760 118 840 142 C900 158 920 180 900 196 C820 210 700 208 620 188 Z" />
        <P fill="#E0B85A" sw={1.1} d="M700 176 C740 146 800 140 850 158 C830 174 760 180 700 176 Z" />

        <EdgeAlder x={90} />
        <EdgeHazel x={220} />
        <EdgeChestnut x={380} />
        <EdgeApple x={560} tone="#D08A7C" />
        <EdgeApple x={700} tone="#E0A89E" />
        <EdgeGoumi x={860} />
        <EdgeOak x={1020} />
        <EdgeLocust x={1180} />
        <EdgePeach x={1320} />

        {/* grass + undergrowth — drawn LAST so trunks never crop */}
        {Array.from({ length: 48 }, (_, i) => {
          const x = 12 + i * 30;
          const h = 16 + ((i * 17) % 14);
          return (
            <path
              key={i}
              d={`M${x} 248 C${x - 3} ${248 - h / 2} ${x + 2} ${248 - h} ${x + 1} ${248 - h - 2}`}
              stroke="#5E7A58"
              strokeWidth="1.4"
              fill="none"
              className="wave"
              style={{ transformOrigin: `${x}px 248px`, animationDelay: `${(i % 7) * -0.3}s` }}
            />
          );
        })}
        {[80, 200, 340, 520, 780, 940, 1120, 1280].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 246 C${x - 4} 230 ${x + 2} 218 ${x + 1} 210`} stroke="#6A5A78" strokeWidth="1.3" fill="none" />
            <path d={`M${x + 8} 246 C${x + 6} 228 ${x + 12} 216 ${x + 10} 208`} stroke="#7A6A88" strokeWidth="1.2" fill="none" />
            <ellipse cx={x + 1} cy={208} rx="2.2" ry="3.4" fill={i % 2 ? "#8A6A98" : "#6A7A58"} stroke={INK} strokeWidth="0.5" />
          </g>
        ))}
        <P fill="#A890BC" sw={0} d="M0 252 C200 246 500 258 800 250 C1100 242 1300 254 1440 250 L1440 280 L0 280 Z" />
      </svg>

      {EDGE.map((t) => (
        <button
          key={t.id}
          type="button"
          className="absolute top-[8%] h-[70%] bg-transparent"
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
          className="pointer-events-none absolute -top-2 z-10 -translate-y-full rounded-full bg-paper/95 px-3 py-1.5 shadow-border backdrop-blur-sm"
          style={{ left: `calc(${tip.x} + ${tip.w} / 2)`, transform: "translate(-50%, -100%)" }}
        >
          <p className="whitespace-nowrap text-[12px] font-medium text-ink">{tip.name}</p>
          <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.12em] text-ink-faint">{tip.role}</p>
        </div>
      ) : null}
    </figure>
  );
}

function trunk(x: number, y0: number, y1: number, w: number, color = "#6A5844") {
  return <path d={`M${x} ${y0} C${x - 1} ${(y0 + y1) / 2} ${x + 1} ${(y0 + y1) / 2} ${x} ${y1}`} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" />;
}

function EdgeAlder({ x }: { x: number }) {
  return (
    <g className="guild-layer guild-l2" style={{ transformBox: "fill-box", transformOrigin: `${x}px 248px` }}>
      {trunk(x, 248, 128, 7)}
      <P fill="#6E8A72" d={`M${x} 132 C${x - 38} 136 ${x - 48} 96 ${x - 28} 78 C${x - 36} 58 ${x - 8} 48 ${x + 6} 64 C${x + 28} 50 ${x + 48} 68 ${x + 36} 90 C${x + 54} 104 ${x + 40} 132 ${x} 132 Z`} />
      <P fill="#7E9A80" sw={1.1} d={`M${x} 96 C${x - 18} 98 ${x - 22} 76 ${x - 8} 70 C${x - 4} 56 ${x + 18} 58 ${x + 16} 74 C${x + 28} 82 ${x + 16} 100 ${x} 96 Z`} />
    </g>
  );
}

function EdgeHazel({ x }: { x: number }) {
  return (
    <g className="guild-layer guild-l1" style={{ transformBox: "fill-box", transformOrigin: `${x}px 248px` }}>
      {trunk(x - 8, 248, 176, 4)}
      {trunk(x + 8, 248, 180, 3.6)}
      <P fill="#8FBF7A" d={`M${x} 184 C${x - 42} 188 ${x - 48} 148 ${x - 22} 136 C${x - 28} 114 ${x + 4} 108 ${x + 16} 126 C${x + 42} 118 ${x + 54} 148 ${x + 32} 164 C${x + 44} 180 ${x + 20} 192 ${x} 184 Z`} />
    </g>
  );
}

function EdgeChestnut({ x }: { x: number }) {
  return (
    <g className="guild-layer guild-l3" style={{ transformBox: "fill-box", transformOrigin: `${x}px 248px` }}>
      {trunk(x, 248, 108, 11)}
      <path d={`M${x} 170 C${x - 28} 146 ${x - 40} 128 ${x - 34} 114`} stroke="#5E4E3A" strokeWidth="3.4" fill="none" />
      <path d={`M${x} 164 C${x + 30} 142 ${x + 44} 124 ${x + 40} 110`} stroke="#5E4E3A" strokeWidth="3.2" fill="none" />
      <P fill="#6F9A6E" d={`M${x} 112 C${x - 56} 118 ${x - 72} 78 ${x - 40} 60 C${x - 48} 32 ${x - 8} 22 ${x + 12} 42 C${x + 40} 22 ${x + 74} 38 ${x + 64} 68 C${x + 88} 78 ${x + 76} 112 ${x + 40} 108 C${x + 28} 124 ${x + 8} 116 ${x} 112 Z`} />
      <P fill="#86B07E" sw={1.15} d={`M${x + 4} 76 C${x - 16} 80 ${x - 20} 56 ${x} 50 C${x + 4} 36 ${x + 28} 40 ${x + 26} 56 C${x + 40} 66 ${x + 24} 82 ${x + 4} 76 Z`} />
    </g>
  );
}

function EdgeApple({ x, tone }: { x: number; tone: string }) {
  return (
    <g className="guild-layer guild-l2" style={{ transformBox: "fill-box", transformOrigin: `${x}px 248px` }}>
      {trunk(x, 248, 142, 8)}
      <path d={`M${x} 188 C${x - 24} 168 ${x - 34} 154 ${x - 28} 142`} stroke="#5A4234" strokeWidth="2.8" fill="none" />
      <path d={`M${x} 184 C${x + 26} 166 ${x + 36} 150 ${x + 32} 140`} stroke="#5A4234" strokeWidth="2.6" fill="none" />
      <P fill={tone} d={`M${x} 144 C${x - 44} 150 ${x - 54} 112 ${x - 28} 98 C${x - 34} 74 ${x + 4} 68 ${x + 16} 88 C${x + 42} 74 ${x + 62} 98 ${x + 46} 118 C${x + 64} 132 ${x + 42} 154 ${x + 16} 144 C${x + 8} 154 ${x} 148 ${x} 144 Z`} />
      <circle cx={x - 14} cy={128} r="5" fill="#C45A4A" stroke={INK} strokeWidth="0.8" />
      <circle cx={x + 16} cy={122} r="5.2" fill="#C45A4A" stroke={INK} strokeWidth="0.8" />
      <circle cx={x + 4} cy={142} r="4.6" fill="#B03A3A" stroke={INK} strokeWidth="0.8" />
    </g>
  );
}

function EdgeGoumi({ x }: { x: number }) {
  return (
    <g className="guild-layer guild-l1" style={{ transformBox: "fill-box", transformOrigin: `${x}px 248px` }}>
      {trunk(x, 248, 188, 5)}
      <P fill="#D4A24C" d={`M${x} 192 C${x - 40} 196 ${x - 46} 158 ${x - 18} 148 C${x - 22} 126 ${x + 12} 122 ${x + 20} 142 C${x + 46} 134 ${x + 54} 164 ${x + 30} 178 C${x + 40} 194 ${x + 12} 200 ${x} 192 Z`} />
      <circle cx={x - 10} cy={172} r="3" fill="#B03A3A" stroke={INK} strokeWidth="0.6" />
      <circle cx={x + 14} cy={168} r="3" fill="#B03A3A" stroke={INK} strokeWidth="0.6" />
    </g>
  );
}

function EdgeOak({ x }: { x: number }) {
  return (
    <g className="guild-layer guild-l3" style={{ transformBox: "fill-box", transformOrigin: `${x}px 248px` }}>
      {trunk(x, 248, 104, 12)}
      <path d={`M${x} 168 C${x - 36} 140 ${x - 52} 118 ${x - 44} 102`} stroke="#5E4E3A" strokeWidth="4" fill="none" />
      <path d={`M${x} 160 C${x + 38} 136 ${x + 54} 116 ${x + 48} 100`} stroke="#5E4E3A" strokeWidth="3.8" fill="none" />
      <P fill="#6B8F62" d={`M${x} 108 C${x - 62} 116 ${x - 80} 70 ${x - 44} 52 C${x - 52} 22 ${x - 4} 12 ${x + 16} 36 C${x + 48} 12 ${x + 86} 32 ${x + 74} 66 C${x + 102} 78 ${x + 86} 116 ${x + 44} 110 C${x + 28} 128 ${x + 8} 114 ${x} 108 Z`} />
      <P fill="#7BA86A" sw={1.15} d={`M${x + 6} 70 C${x - 18} 74 ${x - 22} 48 ${x} 42 C${x + 6} 26 ${x + 32} 30 ${x + 30} 48 C${x + 46} 58 ${x + 28} 76 ${x + 6} 70 Z`} />
    </g>
  );
}

function EdgeLocust({ x }: { x: number }) {
  return (
    <g className="guild-layer guild-l2" style={{ transformBox: "fill-box", transformOrigin: `${x}px 248px` }}>
      {trunk(x, 248, 118, 7)}
      <P fill="#7BA86A" d={`M${x} 122 C${x - 34} 126 ${x - 42} 88 ${x - 18} 74 C${x - 24} 54 ${x + 8} 48 ${x + 16} 68 C${x + 38} 56 ${x + 52} 80 ${x + 36} 98 C${x + 48} 114 ${x + 20} 128 ${x} 122 Z`} />
      <P fill="#8FBF7A" sw={1.1} d={`M${x} 88 C${x - 16} 90 ${x - 18} 70 ${x - 4} 66 C${x} 54 ${x + 18} 56 ${x + 16} 70 C${x + 26} 78 ${x + 14} 92 ${x} 88 Z`} />
    </g>
  );
}

function EdgePeach({ x }: { x: number }) {
  return (
    <g className="guild-layer guild-l2" style={{ transformBox: "fill-box", transformOrigin: `${x}px 248px` }}>
      {trunk(x, 248, 150, 7)}
      <P fill="#E0A89E" d={`M${x} 152 C${x - 36} 156 ${x - 42} 122 ${x - 18} 110 C${x - 22} 90 ${x + 10} 86 ${x + 18} 104 C${x + 40} 96 ${x + 48} 122 ${x + 28} 136 C${x + 36} 152 ${x + 10} 158 ${x} 152 Z`} />
      <circle cx={x - 8} cy={134} r="4.4" fill="#E8A07A" stroke={INK} strokeWidth="0.75" />
      <circle cx={x + 12} cy={128} r="4.2" fill="#E8A07A" stroke={INK} strokeWidth="0.75" />
    </g>
  );
}
