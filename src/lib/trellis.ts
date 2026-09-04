import { placementZ } from "./engine";
import { pctToWorld, worldToPct } from "./ground";
import { SPECIES_BY_ID } from "./species";
import type { Farm, Placement, Species } from "./types";

export const TRELLIS_RANGE = 0.92;

export function canTrellis(host: Species | undefined): boolean {
  if (!host) return false;
  if (host.kind === "animal" || host.kind === "fungi") return false;
  if (
    host.layer === "vine" ||
    host.layer === "herb" ||
    host.layer === "groundcover" ||
    host.layer === "root" ||
    host.layer === "fungi"
  ) {
    return false;
  }
  return host.layer === "canopy" || host.layer === "subcanopy" || host.layer === "shrub" || host.functions.includes("nurse");
}

export function isVine(sp: Species | undefined | null): boolean {
  return !!sp && (sp.layer === "vine" || sp.silhouette === "vine");
}

export function findHostNear(
  wx: number,
  wz: number,
  farm: Farm,
  skip: Set<string> = new Set(),
): { host: Placement; species: Species; x: number; z: number; d: number } | null {
  let best: { host: Placement; species: Species; x: number; z: number; d: number } | null = null;
  for (const p of farm.placements) {
    if (skip.has(p.id)) continue;
    const sp = SPECIES_BY_ID[p.speciesId];
    if (!canTrellis(sp)) continue;
    const [hx, hz] = pctToWorld(p.x, placementZ(p));
    const d = Math.hypot(wx - hx, wz - hz);
    if (d > TRELLIS_RANGE) continue;
    if (!best || d < best.d) best = { host: p, species: sp, x: hx, z: hz, d };
  }
  return best;
}

export function seatOnHost(host: Placement, seed = 0.3): { x: number; z: number } {
  const [hx, hz] = pctToWorld(host.x, placementZ(host));
  const a = seed * Math.PI * 2;
  const [x, z] = worldToPct(hx + Math.cos(a) * 0.18, hz + Math.sin(a) * 0.18);
  return { x, z };
}

export function attachVines(list: Placement[]): Placement[] {
  const hosts = list.filter((p) => canTrellis(SPECIES_BY_ID[p.speciesId]));
  return list.flatMap((p) => {
    const sp = SPECIES_BY_ID[p.speciesId];
    if (!isVine(sp)) return [p];
    if (p.hostId && list.some((h) => h.id === p.hostId && canTrellis(SPECIES_BY_ID[h.speciesId]))) {
      const host = list.find((h) => h.id === p.hostId)!;
      const seat = seatOnHost(host, hash(p.id));
      return [{ ...p, x: seat.x, z: seat.z }];
    }
    let best: Placement | null = null;
    let bestD = 1e9;
    const [vx, vz] = pctToWorld(p.x, placementZ(p));
    for (const h of hosts) {
      const [hx, hz] = pctToWorld(h.x, placementZ(h));
      const d = Math.hypot(vx - hx, vz - hz);
      if (d < bestD) {
        bestD = d;
        best = h;
      }
    }
    if (!best) return [];
    const seat = seatOnHost(best, hash(p.id));
    return [{ ...p, hostId: best.id, x: seat.x, z: seat.z }];
  });
}

function hash(s: string): number {
  let h = 0;
  for (const c of s) h = (h * 33 + c.charCodeAt(0)) % 1000;
  return h / 1000;
}
