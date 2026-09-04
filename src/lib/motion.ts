import * as THREE from "three";

export const MOTION = {
  near: 8.5,
  far: 16,
  skipFramesMid: 2,
  canopyZ: 0.028,
  canopyX: 0.014,
  bob: 0.012,
  growMs: 560,
  pulseLife: 0.85,
  maxPulses: 8,
  glowPulse: 2.4,
};

export const motionTime = { value: 0 };

export type SwayKind = "canopy" | "bob" | "glow" | "idle";

export interface SwayHandle {
  obj: THREE.Object3D;
  kind: SwayKind;
  seed: number;
  priority: number;
  amount: number;
  born: number;
  grow: boolean;
  tmp: THREE.Vector3;
}

const handles = new Set<SwayHandle>();

export function addSway(h: SwayHandle): () => void {
  handles.add(h);
  return () => {
    handles.delete(h);
  };
}

export interface PulseSlot {
  mesh: THREE.Mesh | null;
  age: number;
  live: boolean;
}

export const pulseSlots: PulseSlot[] = Array.from({ length: MOTION.maxPulses }, () => ({
  mesh: null,
  age: 0,
  live: false,
}));

export function spawnPulse(x: number, z: number, y: number) {
  const slot = pulseSlots.find((s) => !s.live) ?? pulseSlots[0];
  slot.live = true;
  slot.age = 0;
  if (slot.mesh) {
    slot.mesh.visible = true;
    slot.mesh.position.set(x, y, z);
    slot.mesh.scale.setScalar(0.4);
    const mat = slot.mesh.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.45;
  }
}

export const plantGroups = new Map<string, THREE.Object3D>();
export const plantScaleTo = new Map<string, number>();

export const dragWorld = {
  id: null as string | null,
  x: 0,
  z: 0,
};

export function tickMotion(time: number, dt: number, cam: THREE.Vector3, frame: number) {
  motionTime.value = time;
  for (const h of handles) {
    const obj = h.obj;
    if (h.grow) {
      const k = Math.min(1, (performance.now() - h.born) / MOTION.growMs);
      const e = 1 - (1 - k) * (1 - k);
      obj.scale.setScalar(0.22 + 0.78 * e);
      if (k >= 1) h.grow = false;
    }
    if (h.kind === "glow") {
      const amt = h.amount;
      obj.visible = amt > 0.03;
      if (amt > 0.03) {
        const pulse = 0.85 + Math.sin(time * MOTION.glowPulse + h.seed) * 0.15;
        obj.scale.setScalar(0.92 + amt * 0.18 * pulse);
      }
      continue;
    }
    if (h.kind === "idle") continue;
    obj.getWorldPosition(h.tmp);
    const d = h.tmp.distanceTo(cam);
    const lod = h.priority >= 2 ? 0 : d > MOTION.far ? 2 : d > MOTION.near ? 1 : 0;
    if (lod === 2) continue;
    if (lod === 1 && frame % (MOTION.skipFramesMid + 1) !== 0) continue;
    const amp = lod === 1 ? 0.5 : 1;
    if (h.kind === "canopy") {
      obj.rotation.z = Math.sin(time * 0.5 + h.seed * 6) * MOTION.canopyZ * amp;
      obj.rotation.x = Math.cos(time * 0.37 + h.seed * 3) * MOTION.canopyX * amp;
    } else if (h.kind === "bob") {
      obj.position.y = Math.sin(time * 2.1 + h.seed) * MOTION.bob * amp;
    }
  }
  for (const p of pulseSlots) {
    if (!p.live || !p.mesh) continue;
    p.age += dt;
    const k = p.age / MOTION.pulseLife;
    if (k >= 1) {
      p.live = false;
      p.mesh.visible = false;
      continue;
    }
    p.mesh.scale.setScalar(0.4 + k * 2.2);
    (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0.45 * (1 - k);
  }
  for (const [id, obj] of plantGroups) {
    const to = plantScaleTo.get(id);
    if (to == null) continue;
    const cur = obj.scale.x;
    const next = cur + (to - cur) * Math.min(1, dt * 5.5);
    obj.scale.setScalar(Math.max(0.04, next));
  }
}
