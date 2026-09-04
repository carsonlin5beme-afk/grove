import type { Species } from "@/lib/types";
import { getForm, type FruitKind, type Habit, type PlantForm } from "@/lib/form";
import { cn } from "@/lib/cn";

const INK = "#2A2218";

const FRUIT_SLOTS: Array<[number, number]> = [
  [32, 38],
  [48, 40],
  [36, 48],
  [44, 34],
  [28, 44],
  [52, 46],
  [40, 36],
  [34, 52],
  [46, 50],
  [38, 32],
  [50, 36],
  [30, 50],
];

function fruitDots(kind: FruitKind, color: string, count: number) {
  if (kind === "none" || count <= 0) return null;
  const nodes = [];
  for (let i = 0; i < count; i++) {
    const [x, y] = FRUIT_SLOTS[i % FRUIT_SLOTS.length];
    if (kind === "bur") {
      nodes.push(
        <g key={i}>
          <circle cx={x} cy={y} r="2.4" fill={color} stroke={INK} strokeWidth="0.6" />
          <path
            d={`M${x} ${y - 3.4} L${x} ${y - 1.4} M${x - 2.4} ${y - 2} L${x - 0.8} ${y - 0.6} M${x + 2.4} ${y - 2} L${x + 0.8} ${y - 0.6}`}
            stroke={INK}
            strokeWidth="0.55"
          />
        </g>,
      );
    } else if (kind === "cone" || kind === "pod") {
      nodes.push(
        <ellipse key={i} cx={x} cy={y} rx="1.6" ry="2.6" fill={color} stroke={INK} strokeWidth="0.55" />,
      );
    } else if (kind === "fig") {
      nodes.push(
        <path
          key={i}
          d={`M${x} ${y - 2.4} Q${x + 2.4} ${y} ${x} ${y + 2.6} Q${x - 2.4} ${y} ${x} ${y - 2.4}`}
          fill={color}
          stroke={INK}
          strokeWidth="0.55"
        />,
      );
    } else {
      nodes.push(<circle key={i} cx={x} cy={y} r={kind === "berry" ? 1.5 : 2.1} fill={color} stroke={INK} strokeWidth="0.55" />);
    }
  }
  return <g>{nodes}</g>;
}

function Canopy({ form, habit }: { form: PlantForm; habit: Habit }) {
  const L = form.leaf;
  const D = form.leafDeep;
  if (habit === "conifer") {
    return (
      <g>
        <path d="M40 22 L22 52 H58 Z" fill={L} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M40 14 L26 36 H54 Z" fill={D} stroke={INK} strokeWidth="1.25" strokeLinejoin="round" />
        <path d="M40 8 L30 24 H50 Z" fill={L} stroke={INK} strokeWidth="1.15" strokeLinejoin="round" />
      </g>
    );
  }
  if (habit === "cedar") {
    return (
      <g>
        <path d="M40 10 C28 18 24 40 28 62 H52 C56 40 52 18 40 10 Z" fill={D} stroke={INK} strokeWidth="1.35" />
        <path d="M40 16 C32 22 30 40 32 56 H48 C50 40 48 22 40 16 Z" fill={L} stroke={INK} strokeWidth="1.05" />
      </g>
    );
  }
  if (habit === "weeping") {
    return (
      <g>
        <path d="M40 22 C22 24 16 38 20 52 C16 58 22 62 28 56 C32 68 40 70 48 58 C56 66 64 58 60 50 C66 40 58 22 40 22 Z" fill={L} stroke={INK} strokeWidth="1.3" />
        <path d="M24 40 Q22 58 20 68 M32 44 Q30 62 28 72 M48 44 Q50 62 52 72 M56 40 Q58 58 60 68" fill="none" stroke={D} strokeWidth="1.15" />
      </g>
    );
  }
  if (habit === "vase") {
    return (
      <g>
        <path d="M40 28 C26 22 14 28 16 42 C10 50 16 62 28 58 C32 70 48 70 52 58 C64 62 70 50 64 42 C66 28 54 22 40 28 Z" fill={L} stroke={INK} strokeWidth="1.35" />
        <path d="M40 32 C32 28 26 34 28 42 C24 48 30 54 36 50 C38 58 46 56 46 50 C54 54 56 46 52 42 C54 32 46 28 40 32 Z" fill={D} stroke={INK} strokeWidth="1.05" />
      </g>
    );
  }
  if (habit === "column") {
    return (
      <g>
        <path d="M40 16 C28 18 24 32 26 48 C24 60 30 68 40 66 C50 68 56 60 54 48 C56 32 52 18 40 16 Z" fill={L} stroke={INK} strokeWidth="1.3" />
        <path d="M40 24 C32 26 30 38 32 48 C30 56 36 60 40 58 C46 60 50 54 48 46 C50 36 46 24 40 24 Z" fill={D} stroke={INK} strokeWidth="1" />
      </g>
    );
  }
  if (habit === "oak") {
    return (
      <g>
        <path d="M40 20 C24 18 14 30 18 42 C8 46 12 62 26 60 C24 72 40 76 50 66 C64 72 72 56 64 46 C72 36 64 18 48 20 C46 12 36 12 40 20 Z" fill={L} stroke={INK} strokeWidth="1.35" strokeLinejoin="round" />
        <path d="M38 30 C30 28 26 38 30 44 C24 46 28 56 36 52 C36 60 46 58 46 52 C54 56 56 44 50 42 C52 32 44 28 38 30 Z" fill={D} stroke={INK} strokeWidth="1.05" />
      </g>
    );
  }
  if (habit === "round" || habit === "multi") {
    return (
      <g>
        {habit === "multi" && (
          <>
            <path d="M34 78 V48" stroke={form.bark} strokeWidth="3.2" strokeLinecap="round" />
            <path d="M46 78 V50" stroke={form.bark} strokeWidth="3" strokeLinecap="round" />
          </>
        )}
        <path d="M40 24 C24 26 16 40 22 52 C14 58 20 70 34 66 C36 76 50 76 54 66 C68 70 72 56 64 50 C70 38 58 22 40 24 Z" fill={L} stroke={INK} strokeWidth="1.35" />
        <path d="M40 32 C30 34 26 44 32 50 C28 54 34 62 42 58 C44 64 52 62 52 56 C60 58 62 48 56 46 C58 36 48 30 40 32 Z" fill={D} stroke={INK} strokeWidth="1.05" />
      </g>
    );
  }
  if (habit === "shrub") {
    return (
      <g>
        <path d="M40 42 C26 44 18 56 24 66 C16 70 22 80 36 76 C40 84 54 82 56 74 C68 78 70 64 62 60 C66 50 52 40 40 42 Z" fill={L} stroke={INK} strokeWidth="1.3" />
        <path d="M40 50 C32 52 28 60 34 64 C30 68 36 74 42 70 C44 76 52 74 50 68 C56 70 58 62 52 60 C54 52 46 48 40 50 Z" fill={D} stroke={INK} strokeWidth="1" />
      </g>
    );
  }
  if (habit === "cane") {
    return (
      <g>
        <path d="M28 80 C26 56 22 40 28 28" fill="none" stroke={form.bark} strokeWidth="2.2" />
        <path d="M40 80 C42 54 48 38 40 26" fill="none" stroke={form.bark} strokeWidth="2.2" />
        <path d="M52 80 C56 58 58 42 50 30" fill="none" stroke={form.bark} strokeWidth="2" />
        <ellipse cx="28" cy="28" rx="8" ry="6" fill={L} stroke={INK} strokeWidth="1" />
        <ellipse cx="42" cy="24" rx="9" ry="6.5" fill={D} stroke={INK} strokeWidth="1" />
        <ellipse cx="52" cy="30" rx="8" ry="6" fill={L} stroke={INK} strokeWidth="1" />
      </g>
    );
  }
  if (habit === "vine") {
    return (
      <g>
        <path d="M22 80 C28 56 20 36 34 22 C44 34 36 54 48 80" fill="none" stroke={form.bark} strokeWidth="2" />
        <ellipse cx="34" cy="22" rx="8" ry="5.5" fill={L} stroke={INK} strokeWidth="1" />
        <ellipse cx="46" cy="36" rx="7" ry="5" fill={D} stroke={INK} strokeWidth="1" />
        <ellipse cx="28" cy="48" rx="7.5" ry="5" fill={L} stroke={INK} strokeWidth="1" />
      </g>
    );
  }
  if (habit === "palm") {
    return (
      <g>
        <path d="M36 80 V30 M40 80 V28 M44 80 V32" stroke={form.bark} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M40 30 Q20 18 14 22 M40 30 Q28 10 24 8 M40 30 Q40 8 44 6 M40 30 Q54 10 58 8 M40 30 Q62 20 66 24" fill="none" stroke={L} strokeWidth="2.6" strokeLinecap="round" />
      </g>
    );
  }
  if (habit === "grass") {
    return (
      <g>
        <path d="M28 80 Q26 48 22 24 M40 80 Q40 44 38 16 M40 80 Q44 50 52 22 M52 80 Q56 52 62 30" fill="none" stroke={L} strokeWidth="2.3" strokeLinecap="round" />
        <path d="M34 80 Q32 54 30 32" fill="none" stroke={D} strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }
  if (habit === "spike") {
    return (
      <g>
        <path d="M40 80 V28" stroke={form.bark} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M40 48 Q28 40 24 50 M40 48 Q52 40 56 50 M40 36 Q30 28 26 36 M40 36 Q50 28 54 36" fill="none" stroke={L} strokeWidth="2" />
        {form.flowerColor && <circle cx="40" cy="22" r="6" fill={form.flowerColor} stroke={INK} strokeWidth="1" />}
      </g>
    );
  }
  if (habit === "rosette") {
    return (
      <g>
        <ellipse cx="40" cy="70" rx="16" ry="8" fill={L} stroke={INK} strokeWidth="1.15" />
        <ellipse cx="28" cy="64" rx="10" ry="5" fill={D} stroke={INK} strokeWidth="1" transform="rotate(-24 28 64)" />
        <ellipse cx="52" cy="64" rx="10" ry="5" fill={D} stroke={INK} strokeWidth="1" transform="rotate(24 52 64)" />
        {form.flowerColor && <circle cx="40" cy="56" r="4.5" fill={form.flowerColor} stroke={INK} strokeWidth="0.9" />}
      </g>
    );
  }
  if (habit === "herb") {
    return (
      <g>
        <path d="M40 80 C36 56 28 40 32 28 C36 40 40 52 40 80" fill={L} stroke={INK} strokeWidth="1.15" />
        <path d="M40 80 C44 54 54 38 56 26" fill="none" stroke={D} strokeWidth="2.1" strokeLinecap="round" />
        <path d="M40 80 C32 56 20 42 16 32" fill="none" stroke={D} strokeWidth="2.1" strokeLinecap="round" />
        {form.flowerColor && (
          <>
            <circle cx="32" cy="26" r="3.2" fill={form.flowerColor} stroke={INK} strokeWidth="0.7" />
            <circle cx="56" cy="24" r="3.2" fill={form.flowerColor} stroke={INK} strokeWidth="0.7" />
          </>
        )}
      </g>
    );
  }
  if (habit === "fungi") {
    return (
      <g>
        <path d="M40 80 V52" stroke={form.bark} strokeWidth="4" strokeLinecap="round" />
        <path d="M22 54 C22 38 58 38 58 54 Z" fill={L} stroke={INK} strokeWidth="1.3" />
      </g>
    );
  }
  return (
    <path d="M40 28 C24 30 16 46 24 58 C16 64 24 76 40 72 C56 76 64 64 56 58 C64 46 56 28 40 28 Z" fill={L} stroke={INK} strokeWidth="1.3" />
  );
}

function AnimalMark({ form }: { form: PlantForm }) {
  const c = form.leaf;
  const kind = form.animal ?? "chicken";
  if (kind === "sheep") {
    return (
      <g>
        <ellipse cx="40" cy="58" rx="16" ry="12" fill={c} stroke={INK} strokeWidth="1.3" />
        <circle cx="54" cy="54" r="6" fill="#C4B49A" stroke={INK} strokeWidth="1.1" />
        <path d="M30 70 L28 78 M48 70 L50 78" stroke={INK} strokeWidth="1.4" />
      </g>
    );
  }
  if (kind === "cow") {
    return (
      <g>
        <ellipse cx="40" cy="56" rx="18" ry="12" fill={c} stroke={INK} strokeWidth="1.3" />
        <circle cx="24" cy="52" r="5" fill="#E8DCC8" stroke={INK} strokeWidth="1" />
        <path d="M28 68 L26 78 M50 68 L52 78" stroke={INK} strokeWidth="1.5" />
      </g>
    );
  }
  if (kind === "goat") {
    return (
      <g>
        <ellipse cx="40" cy="58" rx="14" ry="10" fill={c} stroke={INK} strokeWidth="1.25" />
        <circle cx="54" cy="54" r="5" fill={c} stroke={INK} strokeWidth="1.05" />
        <path d="M50 48 L48 40 M56 48 L60 40" stroke={INK} strokeWidth="1.2" />
      </g>
    );
  }
  if (kind === "pig") {
    return (
      <g>
        <ellipse cx="40" cy="60" rx="15" ry="10" fill={c} stroke={INK} strokeWidth="1.25" />
        <ellipse cx="56" cy="60" rx="4" ry="2.6" fill="#D08A7C" stroke={INK} strokeWidth="0.8" />
      </g>
    );
  }
  if (kind === "rabbit") {
    return (
      <g>
        <ellipse cx="40" cy="64" rx="10" ry="7" fill={c} stroke={INK} strokeWidth="1.15" />
        <path d="M36 56 L34 44 M44 56 L48 44" stroke={c} strokeWidth="2.2" strokeLinecap="round" />
      </g>
    );
  }
  if (kind === "duck") {
    return (
      <g>
        <ellipse cx="40" cy="62" rx="13" ry="8" fill={c} stroke={INK} strokeWidth="1.2" />
        <circle cx="52" cy="58" r="4.2" fill={c} stroke={INK} strokeWidth="1" />
        <path d="M56 58 L62 60 L56 61.5" fill="#D4A24C" stroke={INK} strokeWidth="0.7" />
      </g>
    );
  }
  if (kind === "bee") {
    return (
      <g>
        <ellipse cx="40" cy="56" rx="10" ry="7" fill="#D4A24C" stroke={INK} strokeWidth="1.15" />
        <path d="M36 50 V62 M44 50 V62" stroke={INK} strokeWidth="1.2" />
        <ellipse cx="32" cy="48" rx="5" ry="3.2" fill="#E8F0EC" stroke={INK} strokeWidth="0.7" />
      </g>
    );
  }
  return (
    <g>
      <ellipse cx="40" cy="62" rx="12" ry="8" fill={c} stroke={INK} strokeWidth="1.2" />
      <circle cx="50" cy="56" r="4.4" fill={c} stroke={INK} strokeWidth="1.05" />
      <path d="M54 56 L60 58 L54 60" fill="#D08A7C" stroke={INK} strokeWidth="0.7" />
      <path d="M48 52 L50 46 L52 52" fill="#B56A5E" stroke={INK} strokeWidth="0.7" />
    </g>
  );
}

export function SpeciesPortrait({
  species,
  className,
}: {
  species: Species;
  className?: string;
}) {
  const form = getForm(species);
  const showTrunk =
    form.habit === "oak" ||
    form.habit === "round" ||
    form.habit === "vase" ||
    form.habit === "column" ||
    form.habit === "weeping" ||
    form.habit === "conifer" ||
    form.habit === "cedar";

  return (
    <svg viewBox="0 0 80 96" className={cn("overflow-visible", className)} aria-hidden>
      <ellipse cx="40" cy="86" rx="18" ry="4.5" fill="#8B7BA8" opacity="0.35" />
      {showTrunk && (
        <path
          d={`M40 84 C${38 - form.trunk} 64 ${37 - form.trunk} 52 40 ${form.habit === "conifer" || form.habit === "cedar" ? 50 : 46}`}
          fill="none"
          stroke={form.bark}
          strokeWidth={3.2 * form.trunk}
          strokeLinecap="round"
        />
      )}
      {form.habit === "animal" ? <AnimalMark form={form} /> : <Canopy form={form} habit={form.habit} />}
      {fruitDots(form.fruitKind, form.fruitColor, form.fruitCount)}
    </svg>
  );
}
