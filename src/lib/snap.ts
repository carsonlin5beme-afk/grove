import { isComplement, PAIR_RANGE } from "./affinity";
import { placementZ } from "./engine";
import { SPECIES_BY_ID } from "./species";
import type { Farm } from "./types";

export const SNAP_PULL = 0.55;

export function worldOf(x: number, z: number, world = 7.4): [number, number] {
  return [((x - 50) / 50) * world, ((z - 50) / 50) * world];
}

export function snapToward(
  wx: number,
  wz: number,
  farm: Farm,
  speciesId: string,
  skip: Set<string>,
  world = 7.4,
): { x: number; z: number; hostId: string } | null {
  const a = SPECIES_BY_ID[speciesId];
  if (!a) return null;
  let best: { x: number; z: number; hostId: string; d: number } | null = null;
  for (const p of farm.placements) {
    if (skip.has(p.id)) continue;
    const b = SPECIES_BY_ID[p.speciesId];
    if (!b || !isComplement(a, b)) continue;
    const [bx, bz] = worldOf(p.x, placementZ(p), world);
    const dx = wx - bx;
    const dz = wz - bz;
    const d = Math.hypot(dx, dz);
    if (d < 0.28 || d > PAIR_RANGE) continue;
    const seat = 0.82;
    const ang = Math.atan2(dz, dx);
    const tx = bx + Math.cos(ang) * seat;
    const tz = bz + Math.sin(ang) * seat;
    const pd = Math.hypot(wx - tx, wz - tz);
    if (!best || pd < best.d) best = { x: tx, z: tz, hostId: p.id, d: pd };
  }
  if (!best || best.d > SNAP_PULL) return null;
  const k = 1 - best.d / SNAP_PULL;
  return {
    x: wx + (best.x - wx) * Math.min(1, k * 1.15),
    z: wz + (best.z - wz) * Math.min(1, k * 1.15),
    hostId: best.hostId,
  };
}
