import type { Habit, PlantForm } from "./form";

export interface BranchSpec {
  sx: number;
  sy: number;
  sz: number;
  ex: number;
  ey: number;
  ez: number;
  r0: number;
  r1: number;
}

export interface LeafCard {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  sx: number;
  sy: number;
  color: string;
}

export interface FruitSpec {
  x: number;
  y: number;
  z: number;
  r: number;
}

export interface ClusterSpec {
  x: number;
  y: number;
  z: number;
  r: number;
  color: string;
}

export interface TreeSpec {
  trunks: BranchSpec[];
  branches: BranchSpec[];
  leaves: LeafCard[];
  fruits: FruitSpec[];
  flowers: ClusterSpec[];
}

function mulberry(seed: number) {
  let s = (seed * 183956723 + 1) >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Recipe {
  trunks: number;
  trunkSegs: number;
  trunkLift: number;
  primaries: number;
  primarySegs: number;
  lift: number;
  spread: number;
  droop: number;
  secondaries: number;
  tertiaries: number;
  leavesPerTip: number;
  leafW: number;
  leafH: number;
  whorls?: number;
}

function recipeFor(habit: Habit): Recipe {
  switch (habit) {
    case "oak":
      return { trunks: 1, trunkSegs: 6, trunkLift: 0.38, primaries: 9, primarySegs: 3, lift: 0.28, spread: 1.32, droop: 0.12, secondaries: 4, tertiaries: 3, leavesPerTip: 7, leafW: 0.11, leafH: 0.16 };
    case "vase":
      return { trunks: 1, trunkSegs: 5, trunkLift: 0.42, primaries: 8, primarySegs: 3, lift: 0.58, spread: 1.15, droop: -0.04, secondaries: 3, tertiaries: 3, leavesPerTip: 6, leafW: 0.09, leafH: 0.2 };
    case "round":
      return { trunks: 1, trunkSegs: 5, trunkLift: 0.3, primaries: 12, primarySegs: 3, lift: 0.48, spread: 1.12, droop: 0.08, secondaries: 4, tertiaries: 3, leavesPerTip: 9, leafW: 0.085, leafH: 0.13 };
    case "shrub":
      return { trunks: 6, trunkSegs: 3, trunkLift: 0.24, primaries: 5, primarySegs: 2, lift: 0.42, spread: 0.98, droop: 0.1, secondaries: 3, tertiaries: 2, leavesPerTip: 7, leafW: 0.06, leafH: 0.09 };
    case "column":
      return { trunks: 1, trunkSegs: 6, trunkLift: 0.5, primaries: 9, primarySegs: 2, lift: 0.72, spread: 0.62, droop: 0.02, secondaries: 2, tertiaries: 2, leavesPerTip: 5, leafW: 0.08, leafH: 0.14 };
    case "weeping":
      return { trunks: 1, trunkSegs: 5, trunkLift: 0.56, primaries: 10, primarySegs: 4, lift: 0.22, spread: 1.12, droop: 0.82, secondaries: 4, tertiaries: 2, leavesPerTip: 5, leafW: 0.06, leafH: 0.14 };
    case "multi":
      return { trunks: 4, trunkSegs: 4, trunkLift: 0.4, primaries: 5, primarySegs: 2, lift: 0.46, spread: 0.95, droop: 0.08, secondaries: 3, tertiaries: 2, leavesPerTip: 6, leafW: 0.08, leafH: 0.12 };
    case "conifer":
      return { trunks: 1, trunkSegs: 8, trunkLift: 0.94, primaries: 0, primarySegs: 2, lift: 0.12, spread: 0.82, droop: 0.22, secondaries: 0, tertiaries: 0, leavesPerTip: 5, leafW: 0.035, leafH: 0.14, whorls: 8 };
    case "cedar":
      return { trunks: 1, trunkSegs: 8, trunkLift: 0.92, primaries: 0, primarySegs: 2, lift: 0.1, spread: 0.52, droop: 0.08, secondaries: 0, tertiaries: 0, leavesPerTip: 6, leafW: 0.04, leafH: 0.1, whorls: 9 };
    default:
      return { trunks: 1, trunkSegs: 4, trunkLift: 0.4, primaries: 6, primarySegs: 2, lift: 0.45, spread: 0.9, droop: 0.05, secondaries: 2, tertiaries: 2, leavesPerTip: 5, leafW: 0.08, leafH: 0.12 };
  }
}

function sprayLeaves(
  leaves: LeafCard[],
  ox: number,
  oy: number,
  oz: number,
  rec: Recipe,
  form: PlantForm,
  rand: () => number,
  count: number,
) {
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const e = (rand() - 0.25) * 1.1;
    leaves.push({
      x: ox + Math.cos(a) * rec.leafW * (0.3 + rand() * 0.8),
      y: oy + rec.leafH * (0.15 + rand() * 0.4),
      z: oz + Math.sin(a) * rec.leafW * (0.3 + rand() * 0.8),
      rx: e,
      ry: a,
      rz: (rand() - 0.5) * 0.6,
      sx: rec.leafW * (0.75 + rand() * 0.55),
      sy: rec.leafH * (0.75 + rand() * 0.5),
      color: rand() > 0.42 ? form.leaf : form.leafDeep,
    });
  }
}

export function buildTree(form: PlantForm, seed: number): TreeSpec {
  const rand = mulberry(seed + 0.17);
  const rec = recipeFor(form.habit);
  const H = form.height * 1.38;
  const W = form.canopy * 0.78;
  const T = 0.048 * form.trunk;

  const trunks: BranchSpec[] = [];
  const branches: BranchSpec[] = [];
  const leaves: LeafCard[] = [];
  const fruits: FruitSpec[] = [];
  const flowers: ClusterSpec[] = [];

  const addSeg = (
    list: BranchSpec[],
    sx: number,
    sy: number,
    sz: number,
    ex: number,
    ey: number,
    ez: number,
    r0: number,
    r1: number,
  ) => {
    list.push({ sx, sy, sz, ex, ey, ez, r0, r1 });
  };

  for (let i = 0; i < rec.trunks; i++) {
    const a0 = (i / Math.max(1, rec.trunks)) * Math.PI * 2 + seed * 5;
    const off = rec.trunks > 1 ? 0.055 + rand() * 0.04 : 0;
    let x = Math.cos(a0) * off;
    let z = Math.sin(a0) * off;
    let y = 0;
    const topY = H * rec.trunkLift * (0.9 + rand() * 0.14);
    const leanX = (rand() - 0.5) * (rec.trunks > 1 ? 0.16 : 0.04);
    const leanZ = (rand() - 0.5) * (rec.trunks > 1 ? 0.16 : 0.04);
    const segs = rec.trunkSegs;

    addSeg(trunks, x, 0, z, x + leanX * 0.08, 0.035, z + leanZ * 0.08, T * 2.35, T * 1.7);

    for (let s = 0; s < segs; s++) {
      const t0 = s / segs;
      const t1 = (s + 1) / segs;
      const nx = Math.cos(a0) * off + leanX * t1 + (rand() - 0.5) * 0.018;
      const nz = Math.sin(a0) * off + leanZ * t1 + (rand() - 0.5) * 0.018;
      const ny = topY * t1;
      addSeg(
        trunks,
        x,
        y,
        z,
        nx,
        ny,
        nz,
        T * 1.65 * (1 - t0 * 0.45),
        T * 1.65 * (1 - t1 * 0.45),
      );
      x = nx;
      y = ny;
      z = nz;
    }

    const crownX = x;
    const crownY = y;
    const crownZ = z;

    if (rec.whorls) {
      for (let w = 0; w < rec.whorls; w++) {
        const t = (w + 0.2) / rec.whorls;
        const wy = 0.1 * H + t * (H * 0.84);
        const ring = rec.spread * W * (1.08 - t * 0.78);
        const arms = 6 + (w % 2);
        for (let k = 0; k < arms; k++) {
          const ang = (k / arms) * Math.PI * 2 + w * 0.42 + seed;
          const len = ring * (0.72 + rand() * 0.32);
          const by = wy + (rand() - 0.4) * 0.03;
          const exb = Math.cos(ang) * len;
          const ezb = Math.sin(ang) * len;
          const eyb = by - rec.droop * 0.14 * H - t * 0.05;
          const mx = Math.cos(ang) * len * 0.45;
          const mz = Math.sin(ang) * len * 0.45;
          const my = by - rec.droop * 0.05 * H;
          addSeg(branches, 0, wy, 0, mx, my, mz, T * 0.32 * (1 - t * 0.35), T * 0.16);
          addSeg(branches, mx, my, mz, exb, eyb, ezb, T * 0.16, T * 0.06);
          sprayLeaves(leaves, exb, eyb, ezb, rec, form, rand, rec.leavesPerTip);
          sprayLeaves(leaves, mx, my + 0.02, mz, rec, form, rand, 3);
        }
      }
      sprayLeaves(leaves, crownX, H * 0.97, crownZ, rec, form, rand, 8);
      continue;
    }

    for (let p = 0; p < rec.primaries; p++) {
      const ang = (p / rec.primaries) * Math.PI * 2 + seed * 2.7 + rand() * 0.55;
      const elev = rec.lift * 0.85 + rand() * 0.28;
      const attach = 0.38 + rand() * 0.55;
      const sy = crownY * attach + (1 - attach) * crownY * 0.15;
      const len = W * rec.spread * (0.5 + rand() * 0.55);
      let px = crownX;
      let py = sy;
      let pz = crownZ;
      const tipX = crownX + Math.cos(ang) * len;
      const tipZ = crownZ + Math.sin(ang) * len;
      const tipY = sy + elev * len * 0.9 - rec.droop * len;

      for (let s = 0; s < rec.primarySegs; s++) {
        const t1 = (s + 1) / rec.primarySegs;
        const nx = crownX + (tipX - crownX) * t1 + (rand() - 0.5) * 0.04;
        const ny = sy + (tipY - sy) * t1 + (rand() - 0.35) * 0.03;
        const nz = crownZ + (tipZ - crownZ) * t1 + (rand() - 0.5) * 0.04;
        addSeg(
          branches,
          px,
          py,
          pz,
          nx,
          ny,
          nz,
          T * 0.52 * (1 - s * 0.22),
          T * 0.52 * (1 - (s + 1) * 0.22),
        );
        px = nx;
        py = ny;
        pz = nz;
      }

      for (let s = 0; s < rec.secondaries; s++) {
        const t = 0.38 + s * 0.22 + rand() * 0.08;
        const sx2 = crownX + (px - crownX) * t;
        const sy2 = sy + (py - sy) * t;
        const sz2 = crownZ + (pz - crownZ) * t;
        const ang2 = ang + (rand() - 0.5) * 1.55;
        const len2 = len * (0.26 + rand() * 0.28);
        const ex2 = sx2 + Math.cos(ang2) * len2;
        const ez2 = sz2 + Math.sin(ang2) * len2;
        const ey2 = sy2 + (0.12 + rand() * 0.28) * len2 - rec.droop * len2 * 0.55;
        const mx = (sx2 + ex2) / 2;
        const my = (sy2 + ey2) / 2 + 0.01;
        const mz = (sz2 + ez2) / 2;
        addSeg(branches, sx2, sy2, sz2, mx, my, mz, T * 0.2, T * 0.12);
        addSeg(branches, mx, my, mz, ex2, ey2, ez2, T * 0.12, T * 0.055);

        for (let u = 0; u < rec.tertiaries; u++) {
          const tu = 0.4 + u * 0.28;
          const ox = sx2 + (ex2 - sx2) * tu;
          const oy = sy2 + (ey2 - sy2) * tu;
          const oz = sz2 + (ez2 - sz2) * tu;
          const ang3 = ang2 + (rand() - 0.5) * 1.8;
          const len3 = len2 * (0.32 + rand() * 0.28);
          const ex3 = ox + Math.cos(ang3) * len3;
          const ez3 = oz + Math.sin(ang3) * len3;
          const ey3 = oy + (rand() * 0.22 - rec.droop * 0.2) * len3;
          addSeg(branches, ox, oy, oz, ex3, ey3, ez3, T * 0.07, T * 0.028);
          sprayLeaves(leaves, ex3, ey3, ez3, rec, form, rand, rec.leavesPerTip);
        }
        sprayLeaves(leaves, ex2, ey2, ez2, rec, form, rand, rec.leavesPerTip);
      }
      sprayLeaves(leaves, px, py, pz, rec, form, rand, rec.leavesPerTip + 2);
    }
  }

  if (form.fruitKind !== "none" && form.fruitCount > 0) {
    for (let i = 0; i < form.fruitCount; i++) {
      const leaf = leaves[Math.floor(rand() * leaves.length)];
      if (!leaf) continue;
      fruits.push({
        x: leaf.x + (rand() - 0.5) * 0.05,
        y: leaf.y - 0.04,
        z: leaf.z + (rand() - 0.5) * 0.05,
        r: form.fruitKind === "berry" ? 0.022 : form.fruitKind === "bur" ? 0.038 : 0.032,
      });
    }
  }

  if (form.flowerColor) {
    for (let i = 0; i < 8; i++) {
      const leaf = leaves[Math.floor(rand() * leaves.length)];
      if (!leaf) continue;
      flowers.push({
        x: leaf.x,
        y: leaf.y + 0.02,
        z: leaf.z,
        r: 0.028,
        color: form.flowerColor,
      });
    }
  }

  return { trunks, branches, leaves, fruits, flowers };
}
