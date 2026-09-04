export const MEADOW_R = 8.6;
export const WORLD = 7.4;

export function groundY(wx: number, wz: number): number {
  return (
    Math.sin(wx * 0.32) * 0.11 +
    Math.cos(wz * 0.27) * 0.09 +
    Math.sin((wx + wz) * 0.18) * 0.06 +
    Math.cos(wx * 0.55) * 0.03
  );
}

export function pctToWorld(x: number, z: number): [number, number] {
  return [((x - 50) / 50) * WORLD, ((z - 50) / 50) * WORLD];
}

export function worldToPct(wx: number, wz: number): [number, number] {
  return [
    Math.min(96, Math.max(4, (wx / WORLD) * 50 + 50)),
    Math.min(96, Math.max(4, (wz / WORLD) * 50 + 50)),
  ];
}
