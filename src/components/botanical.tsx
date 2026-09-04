import type { ReactNode } from "react";
import type { PlantColor, Silhouette } from "@/lib/types";
import { cn } from "@/lib/cn";

const INK = "#2A2218";

const FILL: Record<PlantColor, { canopy: string; deep: string; trunk: string }> = {
  sage: { canopy: "#7BA88A", deep: "#5E8C6E", trunk: "#8A7A5A" },
  coral: { canopy: "#D08A7C", deep: "#B56A5E", trunk: "#8A6A58" },
  mustard: { canopy: "#D4A24C", deep: "#B8862E", trunk: "#8A6A40" },
  ink: { canopy: "#5C5348", deep: "#3A3228", trunk: "#4A4034" },
  vine: { canopy: "#8AA8A0", deep: "#6A8880", trunk: "#7A6A50" },
  rose: { canopy: "#E0A89E", deep: "#C97B6E", trunk: "#8A6A58" },
  bark: { canopy: "#C4A06A", deep: "#A08048", trunk: "#8A6A40" },
};

function Outline({
  d,
  fill,
  sw = 1.6,
}: {
  d: string;
  fill: string;
  sw?: number;
}) {
  return <path d={d} fill={fill} stroke={INK} strokeWidth={sw} strokeLinejoin="round" />;
}

export function TallSageTree({ className }: { className?: string }) {
  return (
    <g className={cn("sway sway-d1", className)} style={{ transformOrigin: "70px 210px" }}>
      <path d="M68 210 V108" stroke="#6A8A7A" strokeWidth="5.5" strokeLinecap="round" />
      <path
        d="M66 200 C58 188 62 170 70 158 C74 172 80 188 72 200"
        fill="#A8C4BC"
        stroke={INK}
        strokeWidth="1.2"
        opacity="0.9"
      />
      <path
        d="M74 196 C82 182 78 166 70 154 C68 168 62 184 72 196"
        fill="#B7D0C8"
        stroke={INK}
        strokeWidth="1.1"
        opacity="0.85"
      />
      <Outline
        fill="#7BA88A"
        d="M70 118 C52 118 40 100 44 82 C36 78 36 62 48 58 C50 42 66 34 78 46 C90 36 108 46 104 64 C116 70 116 88 104 94 C108 112 90 122 70 118 Z"
      />
      <Outline
        fill="#8FBF9A"
        sw={1.3}
        d="M70 92 C58 94 50 80 56 70 C50 66 52 54 64 54 C66 42 82 42 86 54 C96 54 100 66 94 74 C100 86 86 96 70 92 Z"
      />
      <Outline
        fill="#6F9E80"
        sw={1.2}
        d="M54 128 C42 130 36 116 44 108 C38 100 48 90 58 96 C62 86 78 88 80 100 C90 100 92 114 82 120 C84 132 66 134 54 128 Z"
      />
      <Outline
        fill="#7BA88A"
        sw={1.2}
        d="M86 126 C76 128 72 114 80 108 C76 98 90 92 96 100 C104 96 112 108 104 116 C110 126 96 132 86 126 Z"
      />
    </g>
  );
}

export function BroadCanopyTree({ className }: { className?: string }) {
  return (
    <g className={cn("sway-slow sway-d2", className)} style={{ transformOrigin: "210px 212px" }}>
      <path d="M206 212 C204 170 200 140 214 118" stroke="#6A8A62" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M206 168 C188 150 176 132 184 118" stroke="#5E7A58" strokeWidth="3.2" fill="none" />
      <path d="M210 158 C228 146 244 138 250 128" stroke="#5E7A58" strokeWidth="3" fill="none" />
      <Outline
        fill="#7BA88A"
        d="M214 128 C176 136 148 118 154 88 C140 78 146 52 172 50 C178 28 210 18 232 36 C258 20 292 36 288 66 C312 74 316 104 292 116 C300 140 268 148 244 136 C236 148 220 140 214 128 Z"
      />
      <Outline
        fill="#8FBF9A"
        sw={1.3}
        d="M214 96 C194 100 184 82 194 70 C186 60 200 46 216 52 C226 40 250 46 250 62 C264 62 268 80 254 88 C258 102 232 106 214 96 Z"
      />
    </g>
  );
}

export function CoralShrub({ className }: { className?: string }) {
  return (
    <g className={cn("sway-tiny sway-d3", className)} style={{ transformOrigin: "132px 210px" }}>
      <path d="M128 210 C126 186 118 168 132 152" stroke="#8A5A52" strokeWidth="3" fill="none" />
      <path d="M132 190 C142 176 148 164 146 152" stroke="#8A5A52" strokeWidth="2.2" fill="none" />
      <path d="M126 184 C114 172 110 160 116 150" stroke="#8A5A52" strokeWidth="2" fill="none" />
      <Outline
        fill="#D08A7C"
        d="M132 156 C114 160 102 142 112 128 C100 124 102 104 118 104 C120 88 140 84 148 98 C164 92 176 108 166 122 C176 134 164 152 146 148 C142 160 120 164 132 156 Z"
      />
      <Outline
        fill="#E0A89E"
        sw={1.2}
        d="M130 132 C120 134 116 122 122 116 C116 110 124 100 134 104 C140 96 154 100 152 110 C160 114 156 126 146 126 C144 136 136 136 130 132 Z"
      />
    </g>
  );
}

export function CoralFruitTree({ className }: { className?: string }) {
  return (
    <g className={cn("sway sway-d4", className)} style={{ transformOrigin: "318px 212px" }}>
      <path d="M316 212 V150" stroke="#7A8A88" strokeWidth="7" strokeLinecap="round" />
      <path
        d="M312 204 C300 190 306 172 318 160 C322 176 330 192 320 204"
        fill="#A8C4BC"
        stroke={INK}
        strokeWidth="1.15"
      />
      <path
        d="M322 200 C334 186 330 170 318 158 C316 174 308 190 320 200"
        fill="#B7D0C8"
        stroke={INK}
        strokeWidth="1.1"
      />
      <Outline
        fill="#D08A7C"
        d="M318 158 C286 164 262 140 272 114 C254 108 256 78 282 76 C286 54 318 46 338 64 C364 50 392 70 382 96 C404 106 400 136 374 142 C378 164 348 172 330 160 C326 170 322 166 318 158 Z"
      />
      <Outline
        fill="#E0A89E"
        sw={1.25}
        d="M318 124 C300 128 292 110 302 100 C294 90 310 78 324 86 C334 76 356 82 352 98 C366 102 362 120 346 122 C344 134 328 132 318 124 Z"
      />
      <circle cx="298" cy="138" r="3.2" fill="#C97B6E" stroke={INK} strokeWidth="0.8" />
      <circle cx="340" cy="146" r="2.8" fill="#C97B6E" stroke={INK} strokeWidth="0.8" />
      <circle cx="326" cy="132" r="2.4" fill="#B56A5E" stroke={INK} strokeWidth="0.7" />
    </g>
  );
}

export function MustardMound({ className }: { className?: string }) {
  return (
    <g className={cn("sway-tiny", className)} style={{ transformOrigin: "178px 210px" }}>
      <Outline
        fill="#D4A24C"
        d="M178 210 C158 210 148 198 152 186 C144 182 148 168 162 168 C164 156 180 150 190 160 C204 154 216 166 210 178 C220 184 216 204 198 208 C194 214 184 214 178 210 Z"
      />
      <path
        d="M160 190 C168 184 176 186 182 178 M172 200 C180 194 188 196 196 188"
        stroke={INK}
        strokeWidth="1"
        fill="none"
        opacity="0.45"
      />
    </g>
  );
}

export function Stump({ className }: { className?: string }) {
  return (
    <g className={className}>
      <Outline fill="#C4A06A" d="M38 210 C32 210 30 198 36 190 C34 184 48 182 52 190 C58 198 56 210 48 210 Z" />
      <path d="M36 188 L28 162 M42 186 L40 154 M46 186 L52 158 M50 188 L60 166 M34 190 L24 174" stroke="#8A6A40" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

export function Tuft({ x, delay = 0, color = "#6A5A40" }: { x: number; delay?: number; color?: string }) {
  return (
    <g className="wave" style={{ transformOrigin: `${x}px 212px`, animationDelay: `${delay}s` }}>
      <path
        d={`M${x} 212 Q${x - 4} 200 ${x - 6} 190 M${x} 212 Q${x + 2} 198 ${x + 1} 186 M${x} 212 Q${x + 6} 202 ${x + 8} 192`}
        stroke={color}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

export function DarkMound({ x }: { x: number }) {
  return (
    <ellipse cx={x} cy={208} rx="11" ry="7" fill="#5C4A3A" stroke={INK} strokeWidth="1.1" />
  );
}

export function Chicken({ className }: { className?: string }) {
  return (
    <g className={cn("animate-[wander_18s_ease-in-out_infinite]", className)}>
      <g className="animate-[hen-step_0.45s_ease-in-out_infinite]">
        <ellipse cx="12" cy="10" rx="9" ry="6.2" fill="#C9A06A" stroke={INK} strokeWidth="1.15" />
        <circle cx="20" cy="7" r="3.4" fill="#C9A06A" stroke={INK} strokeWidth="1.05" />
        <path d="M22.6 7.4 L27 8.2 L22.6 9" fill="#D08A7C" stroke={INK} strokeWidth="0.7" />
        <path d="M18.6 4.2 L20 1.6 L21.6 4.4" fill="#B56A5E" stroke={INK} strokeWidth="0.7" />
        <g className="origin-[20px_8px] animate-[pecker_2.8s_ease-in-out_infinite]">
          <circle cx="21.2" cy="6.4" r="0.6" fill={INK} />
        </g>
        <path d="M6 11 Q3 6 8 8" fill="#D4A24C" stroke={INK} strokeWidth="0.8" />
        <path d="M10 16 L9 20 M14 16 L15 20" stroke={INK} strokeWidth="1.1" strokeLinecap="round" />
      </g>
    </g>
  );
}

export function DuckSprite() {
  return (
    <g>
      <ellipse cx="12" cy="11" rx="10" ry="5.5" fill="#4A5560" stroke={INK} strokeWidth="1.1" />
      <circle cx="21" cy="8" r="3.2" fill="#4A5560" stroke={INK} strokeWidth="1" />
      <path d="M23.6 8.2 L28.4 9 L23.6 10" fill="#D4A24C" stroke={INK} strokeWidth="0.7" />
      <path d="M8 16 L7 19 M14 16 L15 19" stroke={INK} strokeWidth="1.05" />
    </g>
  );
}

export function SheepSprite() {
  return (
    <g>
      <ellipse cx="16" cy="12" rx="12" ry="8" fill="#E8DCC8" stroke={INK} strokeWidth="1.2" />
      <circle cx="28" cy="11" r="4" fill="#C4B49A" stroke={INK} strokeWidth="1" />
      <path d="M10 20 L9 24 M20 20 L21 24" stroke={INK} strokeWidth="1.2" />
    </g>
  );
}

export function GoatSprite() {
  return (
    <g>
      <ellipse cx="16" cy="13" rx="11" ry="7" fill="#C4A06A" stroke={INK} strokeWidth="1.15" />
      <circle cx="28" cy="10" r="3.6" fill="#C4A06A" stroke={INK} strokeWidth="1" />
      <path d="M26 6 L24 1 M30 6 L33 1" stroke={INK} strokeWidth="1.1" fill="none" />
      <path d="M10 20 L9 24 M20 20 L21 24" stroke={INK} strokeWidth="1.15" />
    </g>
  );
}

export function CowSprite() {
  return (
    <g>
      <ellipse cx="18" cy="12" rx="14" ry="8" fill="#5C5348" stroke={INK} strokeWidth="1.2" />
      <circle cx="8" cy="9" r="3.2" fill="#E8DCC8" stroke={INK} strokeWidth="0.9" />
      <circle cx="22" cy="8" r="2.6" fill="#E8DCC8" stroke={INK} strokeWidth="0.8" />
      <circle cx="32" cy="11" r="4.2" fill="#5C5348" stroke={INK} strokeWidth="1.05" />
      <path d="M10 20 L9 25 M24 20 L25 25" stroke={INK} strokeWidth="1.3" />
    </g>
  );
}

export function PigSprite() {
  return (
    <g>
      <ellipse cx="15" cy="12" rx="12" ry="7" fill="#E0A89E" stroke={INK} strokeWidth="1.15" />
      <circle cx="26" cy="12" r="3.4" fill="#E0A89E" stroke={INK} strokeWidth="1" />
      <ellipse cx="29.4" cy="13" rx="2.2" ry="1.4" fill="#D08A7C" stroke={INK} strokeWidth="0.7" />
      <path d="M8 6 Q6 2 10 5" stroke={INK} strokeWidth="1" fill="none" />
      <path d="M10 19 L9 23 M18 19 L19 23" stroke={INK} strokeWidth="1.15" />
    </g>
  );
}

export function RabbitSprite() {
  return (
    <g>
      <ellipse cx="10" cy="14" rx="8" ry="5.5" fill="#C4B49A" stroke={INK} strokeWidth="1.1" />
      <circle cx="16" cy="12" r="3.2" fill="#C4B49A" stroke={INK} strokeWidth="1" />
      <path d="M14.4 9 L13 2 M17.2 9 L19 2.4" stroke={INK} strokeWidth="1.15" fill="none" />
    </g>
  );
}

export function BeeSprite() {
  return (
    <g className="animate-[bee-loop_7s_ease-in-out_infinite]">
      <ellipse cx="6" cy="5" rx="5" ry="3.2" fill="#D4A24C" stroke={INK} strokeWidth="0.9" />
      <path d="M4 3.4 V6.6 M7.4 3.4 V6.6" stroke={INK} strokeWidth="0.9" />
      <ellipse cx="3" cy="2.2" rx="2.4" ry="1.6" fill="#E8F0EC" stroke={INK} strokeWidth="0.6" opacity="0.9" />
    </g>
  );
}

export function FungiSprite({ color }: { color: PlantColor }) {
  const f = FILL[color];
  return (
    <g>
      <path d="M12 20 V12" stroke={f.trunk} strokeWidth="3" strokeLinecap="round" />
      <path d="M2 13 C2 6 22 6 22 13 Z" fill={f.canopy} stroke={INK} strokeWidth="1.2" />
    </g>
  );
}

export function GroundStrip({ width = 1200 }: { width?: number }) {
  return (
    <g>
      <path
        d={`M0 214 C80 210 160 218 240 214 C320 210 400 218 480 213 C560 209 640 218 720 214 C800 210 880 217 960 213 C1040 210 1120 216 ${width} 214 L${width} 226 L0 226 Z`}
        fill="#8B7BA8"
        opacity="0.85"
      />
      <path
        d={`M0 214 C80 210 160 218 240 214 C320 210 400 218 480 213 C560 209 640 218 720 214 C800 210 880 217 960 213 C1040 210 1120 216 ${width} 214`}
        fill="none"
        stroke={INK}
        strokeWidth="1.2"
        opacity="0.35"
      />
      {Array.from({ length: 18 }).map((_, i) => (
        <path
          key={i}
          d={`M${30 + i * 64} 220 q3 8 0 14`}
          stroke="#6A5A48"
          strokeWidth="1"
          fill="none"
          opacity="0.45"
        />
      ))}
    </g>
  );
}

export function FallingLeaf({ x, delay }: { x: number; delay: number }) {
  return (
    <g
      className="animate-[leaf-fall_9s_linear_infinite]"
      style={{ transformOrigin: `${x}px 40px`, animationDelay: `${delay}s` }}
    >
      <ellipse cx={x} cy={40} rx="4" ry="2.4" fill="#7BA88A" stroke={INK} strokeWidth="0.6" />
    </g>
  );
}

export function BirdPass() {
  return (
    <g className="animate-[bird-glide_22s_linear_infinite]" style={{ animationDelay: "3s" }}>
      <path d="M0 40 q8 -6 14 0 q6 -8 12 0" fill="none" stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
    </g>
  );
}

/** Cover scene matching the reference illustration. */
export function GroveScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 240"
      className={cn("h-auto w-full overflow-visible", className)}
      aria-hidden
    >
      <BirdPass />
      <FallingLeaf x={90} delay={0} />
      <FallingLeaf x={240} delay={3.2} />
      <FallingLeaf x={310} delay={6.1} />
      <Stump />
      <TallSageTree />
      <DarkMound x={96} />
      <Tuft x={108} delay={-0.4} />
      <CoralShrub />
      <Tuft x={156} delay={-1.1} color="#7A6A48" />
      <MustardMound />
      <BroadCanopyTree />
      <CoralFruitTree />
      <Tuft x={352} delay={-0.8} />
      <Tuft x={368} delay={-1.6} color="#5C5348" />
      <Tuft x={58} delay={-0.2} color="#8FBF9A" />
      <GroundStrip width={420} />
      <g transform="translate(150 196)">
        <Chicken />
      </g>
      <g transform="translate(250 86)">
        <BeeSprite />
      </g>
    </svg>
  );
}

function GenericTree({ color, kind }: { color: PlantColor; kind: "conifer" | "canopy" | "fruit" }) {
  const f = FILL[color];
  if (kind === "conifer") {
    return (
      <g>
        <path d="M40 110 V58" stroke={f.trunk} strokeWidth="5" strokeLinecap="round" />
        <path d="M40 70 C26 70 20 56 28 48 C22 44 26 32 38 34 C40 22 54 22 56 34 C68 32 72 46 64 52 C72 62 56 72 40 70 Z" fill={f.canopy} stroke={INK} strokeWidth="1.4" />
        <path d="M40 52 C30 54 26 44 32 38 C28 34 34 26 42 28 C46 20 56 24 54 32 C62 34 62 44 54 48 C56 56 46 56 40 52 Z" fill={f.deep} stroke={INK} strokeWidth="1.15" />
      </g>
    );
  }
  if (kind === "fruit") {
    return (
      <g>
        <path d="M40 110 V62" stroke={f.trunk} strokeWidth="6" strokeLinecap="round" />
        <path d="M40 68 C18 72 8 52 18 38 C8 32 14 14 32 16 C36 4 56 4 60 16 C78 10 92 26 82 40 C94 50 84 70 62 66 C58 74 46 74 40 68 Z" fill={f.canopy} stroke={INK} strokeWidth="1.4" />
        <circle cx="30" cy="48" r="2.4" fill={f.deep} stroke={INK} strokeWidth="0.6" />
        <circle cx="52" cy="54" r="2.2" fill={f.deep} stroke={INK} strokeWidth="0.6" />
      </g>
    );
  }
  return (
    <g>
      <path d="M40 112 C38 80 36 64 44 52" stroke={f.trunk} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M44 56 C18 62 6 44 14 26 C4 18 16 2 34 8 C40 -6 64 -4 68 12 C88 6 102 24 90 38 C104 50 88 66 68 58 C62 68 50 64 44 56 Z" fill={f.canopy} stroke={INK} strokeWidth="1.45" />
    </g>
  );
}

function GenericShrub({ color }: { color: PlantColor }) {
  const f = FILL[color];
  return (
    <g>
      <path d="M40 110 C38 90 32 78 42 68" stroke={f.trunk} strokeWidth="3" fill="none" />
      <path d="M42 72 C26 76 18 60 28 50 C18 46 22 30 36 32 C38 20 56 20 58 32 C72 28 80 42 70 52 C80 62 66 76 52 72 C50 80 44 80 42 72 Z" fill={f.canopy} stroke={INK} strokeWidth="1.3" />
    </g>
  );
}

function GenericMound({ color }: { color: PlantColor }) {
  const f = FILL[color];
  return (
    <path d="M40 110 C22 110 14 96 20 86 C12 82 16 68 30 68 C32 56 50 52 58 64 C72 58 82 70 76 82 C86 88 80 108 60 110 Z" fill={f.canopy} stroke={INK} strokeWidth="1.3" />
  );
}

function GenericHerb({ color }: { color: PlantColor }) {
  const f = FILL[color];
  return (
    <g>
      <path d="M40 110 C36 88 28 70 40 56 C44 70 52 88 42 110" fill={f.canopy} stroke={INK} strokeWidth="1.2" />
      <path d="M40 110 C44 90 56 74 62 60" stroke={f.deep} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M40 110 C32 92 20 78 16 64" stroke={f.deep} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

function GenericVine({ color }: { color: PlantColor }) {
  const f = FILL[color];
  return (
    <g>
      <path d="M24 110 C28 80 22 56 36 34 C48 50 40 78 44 110" stroke={f.trunk} strokeWidth="2.2" fill="none" />
      <ellipse cx="36" cy="40" rx="8" ry="5" fill={f.canopy} stroke={INK} strokeWidth="1" />
      <ellipse cx="48" cy="58" rx="7" ry="4.5" fill={f.canopy} stroke={INK} strokeWidth="1" />
      <ellipse cx="30" cy="72" rx="7.5" ry="4.6" fill={f.deep} stroke={INK} strokeWidth="1" />
    </g>
  );
}

function GenericGround({ color }: { color: PlantColor }) {
  const f = FILL[color];
  return (
    <g>
      <ellipse cx="40" cy="104" rx="22" ry="8" fill={f.canopy} stroke={INK} strokeWidth="1.15" />
      <path d="M24 100 Q28 90 26 84 M40 98 Q42 88 40 80 M54 100 Q58 90 60 84" stroke={f.deep} strokeWidth="1.4" fill="none" />
    </g>
  );
}

const ANIMAL: Record<string, () => ReactNode> = {
  chicken: () => <g transform="translate(22 86)"><Chicken className="!animate-none" /></g>,
  duck: () => <g transform="translate(22 88)"><DuckSprite /></g>,
  sheep: () => <g transform="translate(16 82)"><SheepSprite /></g>,
  goat: () => <g transform="translate(16 82)"><GoatSprite /></g>,
  cow: () => <g transform="translate(12 80)"><CowSprite /></g>,
  pig: () => <g transform="translate(18 84)"><PigSprite /></g>,
  rabbit: () => <g transform="translate(24 86)"><RabbitSprite /></g>,
  bee: () => <g transform="translate(30 70)"><BeeSprite /></g>,
};

export function PlantMark({
  silhouette,
  color,
  className,
  sway = true,
}: {
  silhouette: Silhouette;
  color: PlantColor;
  className?: string;
  sway?: boolean;
}) {
  const swayClass =
    sway &&
    (silhouette === "canopy" || silhouette === "conifer"
      ? "sway"
      : silhouette === "fruit" || silhouette === "shrub"
        ? "sway-slow"
        : silhouette === "herb" || silhouette === "vine" || silhouette === "mound" || silhouette === "tuft"
          ? "sway-tiny"
          : "");

  let body: ReactNode = <GenericShrub color={color} />;
  if (silhouette === "conifer") body = <GenericTree color={color} kind="conifer" />;
  else if (silhouette === "canopy") body = <GenericTree color={color} kind="canopy" />;
  else if (silhouette === "fruit") body = <GenericTree color={color} kind="fruit" />;
  else if (silhouette === "shrub") body = <GenericShrub color={color} />;
  else if (silhouette === "mound") body = <GenericMound color={color} />;
  else if (silhouette === "vine") body = <GenericVine color={color} />;
  else if (silhouette === "herb") body = <GenericHerb color={color} />;
  else if (silhouette === "tuft" || silhouette === "ground") body = <GenericGround color={color} />;
  else if (silhouette === "stump") body = <g transform="translate(16 -90) scale(1.4)"><Stump /></g>;
  else if (silhouette === "fungi") body = <g transform="translate(22 78) scale(1.4)"><FungiSprite color={color} /></g>;
  else if (ANIMAL[silhouette]) body = ANIMAL[silhouette]();

  return (
    <svg viewBox="0 0 80 120" className={cn("overflow-visible", className)} aria-hidden>
      <g className={swayClass || undefined} style={{ transformOrigin: "40px 110px" }}>
        {body}
      </g>
    </svg>
  );
}

export function MiniMark({
  silhouette,
  color,
  className,
}: {
  silhouette: Silhouette;
  color: PlantColor;
  className?: string;
}) {
  return (
    <PlantMark silhouette={silhouette} color={color} sway={false} className={className} />
  );
}
