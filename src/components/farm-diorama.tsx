import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { LivingPlant } from "@/components/living-plant";
import { MotionDriver, PulsePool } from "@/components/motion-bus";
import { DistantWood, MeadowGrass, SkyDome, Terrain } from "@/components/studio-terrain";
import { isComplement, PAIR_RANGE } from "@/lib/affinity";
import { placementZ } from "@/lib/engine";
import { hashSeed } from "@/lib/form";
import { MEADOW_R, WORLD, groundY, pctToWorld, worldToPct } from "@/lib/ground";
import { dragWorld, plantGroups, plantScaleTo, spawnPulse } from "@/lib/motion";
import { farmAreaSqft, areaWorldRadius } from "@/lib/planner";
import { lightAt, viewOf } from "@/lib/succession";
import { snapToward } from "@/lib/snap";
import { SPECIES_BY_ID } from "@/lib/species";
import { useFarmStore } from "@/lib/farm-store";
import { canTrellis, findHostNear, isVine, TRELLIS_RANGE } from "@/lib/trellis";
import { canPlace } from "@/lib/regions";
import type { Placement } from "@/lib/types";

export { groundY, pctToWorld, worldToPct, MEADOW_R, WORLD };

function Meadow({
  hoverRef,
  onPlantAt,
}: {
  hoverRef: MutableRefObject<[number, number] | null>;
  onPlantAt: (wx: number, wz: number) => void;
}) {
  const select = useFarmStore((s) => s.select);
  const pointer = useRef({ x: 0, y: 0, moved: false });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.02, 0]}
      onPointerDown={(e) => {
        pointer.current = { x: e.clientX, y: e.clientY, moved: false };
      }}
      onPointerMove={(e) => {
        if (Math.hypot(e.clientX - pointer.current.x, e.clientY - pointer.current.y) > 4) {
          pointer.current.moved = true;
        }
        const p = e.point;
        if (Math.hypot(p.x, p.z) < MEADOW_R) hoverRef.current = [p.x, p.z];
      }}
      onPointerUp={(e) => {
        if (pointer.current.moved) return;
        const p = e.point;
        if (Math.hypot(p.x, p.z) < MEADOW_R - 0.2) onPlantAt(p.x, p.z);
        else select(null);
      }}
    >
      <circleGeometry args={[MEADOW_R, 48]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

function AreaFence({ sqft }: { sqft: number }) {
  const r = areaWorldRadius(sqft);
  const ring = useMemo(() => {
    const g = new THREE.RingGeometry(Math.max(0.2, r - 0.055), r + 0.055, 96);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, groundY(pos.getX(i), pos.getZ(i)) + 0.035);
    }
    g.computeVertexNormals();
    return g;
  }, [r]);
  const fill = useMemo(() => {
    const g = new THREE.CircleGeometry(r, 72);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, groundY(pos.getX(i), pos.getZ(i)) + 0.012);
    }
    g.computeVertexNormals();
    return g;
  }, [r]);
  return (
    <group>
      <mesh geometry={fill}>
        <meshBasicMaterial color="#E8F4C8" transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <mesh geometry={ring}>
        <meshBasicMaterial color="#2A2218" transparent opacity={0.38} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Hills() {
  return (
    <>
      <SkyDome />
      <Terrain />
      <MeadowGrass />
      <DistantWood />
    </>
  );
}

function PlacedPlant({
  placement,
  onDragStart,
  glow,
  dragging,
}: {
  placement: Placement;
  onDragStart: (id: string, shift: boolean) => void;
  glow: number;
  dragging: boolean;
}) {
  const selectedIds = useFarmStore((s) => s.selectedIds);
  const year = useFarmStore((s) => s.viewYear);
  const farm = useFarmStore((s) => s.farm);
  const sp = SPECIES_BY_ID[placement.speciesId];
  const group = useRef<THREE.Group>(null);
  if (!sp) return null;
  const z = placementZ(placement);
  const selected = selectedIds.includes(placement.id);
  const vis = viewOf(sp, year, farm, placement.scale, placement.plantedYear ?? 0);
  plantScaleTo.set(placement.id, vis.scale);

  const host = placement.hostId ? farm.placements.find((p) => p.id === placement.hostId) : null;
  let wx: number;
  let wz: number;
  if (host && !dragging) {
    const hg = plantGroups.get(host.id);
    if (hg) {
      const a = hashSeed(placement.id) * Math.PI * 2;
      wx = hg.position.x + Math.cos(a) * 0.18;
      wz = hg.position.z + Math.sin(a) * 0.18;
    } else {
      [wx, wz] = pctToWorld(host.x, placementZ(host));
    }
  } else {
    [wx, wz] = pctToWorld(placement.x, z);
  }
  const y = groundY(wx, wz);

  return (
    <group
      ref={(n) => {
        group.current = n;
        if (n) {
          plantGroups.set(placement.id, n);
          plantScaleTo.set(placement.id, vis.scale);
          if (n.scale.x === 1) n.scale.setScalar(vis.scale);
        } else {
          plantGroups.delete(placement.id);
          plantScaleTo.delete(placement.id);
        }
      }}
      position={[wx, y, wz]}
      rotation={[0, placement.rot ?? 0, 0]}
    >
      <group
        onPointerDown={(e) => {
          e.stopPropagation();
          onDragStart(placement.id, e.shiftKey);
        }}
      >
        <LivingPlant
          species={sp}
          seed={hashSeed(placement.id)}
          scale={1}
          glow={glow}
          ghost={vis.faded}
          growth={vis.growth}
        />
      </group>
      {selected ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
          <ringGeometry args={[0.26, dragging ? 0.44 : 0.36, 36]} />
          <meshBasicMaterial color={dragging ? "#7DE8A4" : "#2A2218"} transparent opacity={dragging ? 0.7 : 0.42} />
        </mesh>
      ) : null}
    </group>
  );
}

function Ghost({ hover, snapped, allowed }: { hover: [number, number] | null; snapped: boolean; allowed: boolean }) {
  const pickerId = useFarmStore((s) => s.pickerId);
  const t = useRef(0);
  const g = useRef<THREE.Group>(null);
  const picker = pickerId ? SPECIES_BY_ID[pickerId] : null;
  useFrame((_, dt) => {
    t.current += dt;
    if (!g.current) return;
    g.current.position.x = allowed ? 0 : Math.sin(t.current * 28) * 0.045;
  });
  if (!picker || !hover) return null;
  const [wx, wz] = hover;
  return (
    <group position={[wx, groundY(wx, wz), wz]}>
      <group ref={g}>
        <LivingPlant species={picker} seed={0.31} scale={0.7} ghost growth={0.08} />
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[0.22, snapped || allowed ? 0.42 : 0.34, 36]} />
        <meshBasicMaterial
          color={!allowed ? "#C07060" : snapped ? "#7DE8A4" : "#2A2218"}
          transparent
          opacity={!allowed ? 0.55 : snapped ? 0.7 : 0.35}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function DragController({
  dragIds,
  controls,
  onPreview,
  onCommit,
}: {
  dragIds: string[];
  controls: MutableRefObject<{ enabled: boolean; target?: THREE.Vector3 } | null>;
  onPreview: (wx: number, wz: number, snapped: boolean, allowed: boolean) => void;
  onCommit: (moves: Array<{ id: string; x: number; z: number }>, allowed: boolean) => void;
}) {
  const { camera, gl } = useThree();
  const farm = useFarmStore((s) => s.farm);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const lastPreview = useRef(0);
  const origin = useRef(new Map<string, [number, number]>());
  const lastOk = useRef(true);

  useEffect(() => {
    if (!dragIds.length) return;
    origin.current = new Map();
    for (const id of dragIds) {
      const p = farm.placements.find((x) => x.id === id);
      if (!p) continue;
      origin.current.set(id, pctToWorld(p.x, placementZ(p)));
    }
    const primary = dragIds[0]!;
    const p0 = origin.current.get(primary);
    if (!p0) return;
    const prim = farm.placements.find((x) => x.id === primary);
    const vine = prim ? isVine(SPECIES_BY_ID[prim.speciesId]) : false;

    const onMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      plane.constant = 0;
      if (!ray.ray.intersectPlane(plane, hit)) return;
      if (Math.hypot(hit.x, hit.z) > MEADOW_R - 0.25) return;
      const skip = new Set(dragIds);
      let tx = hit.x;
      let tz = hit.z;
      let snapped = false;
      let allowed = true;
      if (vine && prim) {
        const host = findHostNear(hit.x, hit.z, farm, skip);
        if (host) {
          tx = host.x;
          tz = host.z;
          snapped = true;
          allowed = true;
        } else {
          allowed = false;
        }
      } else if (prim) {
        const s = snapToward(hit.x, hit.z, farm, prim.speciesId, skip);
        if (s) {
          tx = s.x;
          tz = s.z;
          snapped = true;
        }
      }
      lastOk.current = allowed;
      const dx = tx - p0[0];
      const dz = tz - p0[1];
      for (const id of dragIds) {
        const o = origin.current.get(id);
        if (!o) continue;
        const nx = o[0] + dx;
        const nz = o[1] + dz;
        const g = plantGroups.get(id);
        if (g) g.position.set(nx, groundY(nx, nz), nz);
      }
      dragWorld.id = primary;
      dragWorld.x = tx;
      dragWorld.z = tz;
      const now = performance.now();
      if (now - lastPreview.current > 40) {
        lastPreview.current = now;
        onPreview(tx, tz, snapped, allowed);
      }
    };
    const onUp = () => {
      if (controls.current) controls.current.enabled = true;
      if (dragWorld.id === primary) {
        const dx = dragWorld.x - p0[0];
        const dz = dragWorld.z - p0[1];
        const moves: Array<{ id: string; x: number; z: number }> = [];
        for (const id of dragIds) {
          const o = origin.current.get(id);
          if (!o) continue;
          const [x, z] = worldToPct(o[0] + dx, o[1] + dz);
          moves.push({ id, x, z });
        }
        onCommit(moves, lastOk.current);
      }
      dragWorld.id = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragIds, camera, gl, farm, plane, ray, ndc, hit, controls, onPreview, onCommit]);

  return null;
}

function CameraGuard({
  controls,
}: {
  controls: MutableRefObject<{ enabled: boolean; target?: THREE.Vector3 } | null>;
}) {
  const { camera } = useThree();
  useFrame(() => {
    const minY = groundY(camera.position.x, camera.position.z) + 0.62;
    if (camera.position.y < minY) camera.position.y = minY;
    const t = controls.current?.target;
    if (t) {
      t.y = Math.max(0.15, Math.min(2.4, t.y));
      const r = Math.hypot(t.x, t.z);
      if (r > MEADOW_R - 0.8) {
        t.x *= (MEADOW_R - 0.8) / r;
        t.z *= (MEADOW_R - 0.8) / r;
      }
    }
  });
  return null;
}

function StudioCam({
  controls,
}: {
  controls: MutableRefObject<{ enabled: boolean; target?: THREE.Vector3 } | null>;
}) {
  const { camera } = useThree();
  const keys = useRef(new Set<string>());
  const yaw = useRef(0.72);
  const pitch = useRef(-0.42);
  const pos = useRef(new THREE.Vector3(6.4, 4.6, 7.6));
  const speedRef = useRef(0);
  const euler = useMemo(() => new THREE.Euler(0, 0, 0, "YXZ"), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (
        e.code === "KeyW" ||
        e.code === "KeyA" ||
        e.code === "KeyS" ||
        e.code === "KeyD" ||
        e.code.startsWith("Arrow")
      ) {
        e.preventDefault();
        keys.current.add(e.code);
      }
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.code);
    const clear = () => keys.current.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    window.__controlsTest = {
      getYaw: () => yaw.current,
      getSpeed: () => speedRef.current,
      setKeys: (codes) => {
        keys.current = new Set(codes);
      },
    };
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.08);
    const k = keys.current;
    if (!k.size) {
      euler.setFromQuaternion(camera.quaternion, "YXZ");
      yaw.current = euler.y;
      pitch.current = euler.x;
      pos.current.copy(camera.position);
      speedRef.current = 0;
      return;
    }

    if (k.has("KeyA")) yaw.current += 1.15 * d;
    if (k.has("KeyD")) yaw.current -= 1.15 * d;
    if (k.has("KeyW")) pitch.current += 0.9 * d;
    if (k.has("KeyS")) pitch.current -= 0.9 * d;
    pitch.current = Math.max(-1.15, Math.min(0.35, pitch.current));

    const fy = -Math.sin(yaw.current);
    const fz = -Math.cos(yaw.current);
    const rx = Math.cos(yaw.current);
    const rz = -Math.sin(yaw.current);
    let mx = 0;
    let mz = 0;
    if (k.has("ArrowUp")) mz += 1;
    if (k.has("ArrowDown")) mz -= 1;
    if (k.has("ArrowRight")) mx += 1;
    if (k.has("ArrowLeft")) mx -= 1;
    const mag = Math.hypot(mx, mz) || 1;
    mx /= mag;
    mz /= mag;
    const speed = 4.2;
    pos.current.x += (fy * mz + rx * mx) * speed * d;
    pos.current.z += (fz * mz + rz * mx) * speed * d;
    const r = Math.hypot(pos.current.x, pos.current.z);
    if (r > MEADOW_R + 4) {
      pos.current.x *= (MEADOW_R + 4) / r;
      pos.current.z *= (MEADOW_R + 4) / r;
    }
    const minY = groundY(pos.current.x, pos.current.z) + 0.7;
    pos.current.y = Math.max(minY, pos.current.y);
    speedRef.current = Math.hypot(mx, mz) * speed;

    camera.position.copy(pos.current);
    camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");
    const look = new THREE.Vector3(
      -Math.sin(yaw.current) * Math.cos(pitch.current),
      Math.sin(pitch.current),
      -Math.cos(yaw.current) * Math.cos(pitch.current),
    );
    const tgt = controls.current?.target;
    if (tgt) tgt.copy(pos.current).addScaledVector(look, 5.2);
  });

  return null;
}

function Scene() {
  const farm = useFarmStore((s) => s.farm);
  const pickerId = useFarmStore((s) => s.pickerId);
  const paletteDrag = useFarmStore((s) => s.paletteDrag);
  const plant = useFarmStore((s) => s.plant);
  const move = useFarmStore((s) => s.move);
  const select = useFarmStore((s) => s.select);
  const selectedIds = useFarmStore((s) => s.selectedIds);
  const rotate = useFarmStore((s) => s.rotate);
  const uproot = useFarmStore((s) => s.uproot);
  const selectedId = useFarmStore((s) => s.selectedId);
  const endPaletteDrag = useFarmStore((s) => s.endPaletteDrag);
  const year = useFarmStore((s) => s.viewYear);
  const light = lightAt(year);
  const [hover, setHover] = useState<[number, number] | null>(null);
  const [dragIds, setDragIds] = useState<string[]>([]);
  const [dragAt, setDragAt] = useState<[number, number] | null>(null);
  const [snapped, setSnapped] = useState(false);
  const [allowed, setAllowed] = useState(true);
  const hoverRef = useRef<[number, number] | null>(null);
  const controls = useRef<{ enabled: boolean; target?: THREE.Vector3 } | null>(null);
  const { gl } = useThree();
  const dragId = dragIds[0] ?? null;
  const picker = pickerId ? SPECIES_BY_ID[pickerId] : null;
  const pickingVine = isVine(picker);
  const siteOk = picker ? canPlace(picker, farm).ok : true;

  useEffect(() => {
    gl.domElement.style.cursor = pickerId || paletteDrag ? "crosshair" : dragId ? "grabbing" : "grab";
  }, [gl, pickerId, paletteDrag, dragId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if ((e.key === "Backspace" || e.key === "Delete") && selectedIds.length) {
        e.preventDefault();
        for (const id of selectedIds) uproot(id);
      }
      if (e.key === "Escape") select(null);
      if ((e.key === "q" || e.key === "Q") && selectedId) rotate(selectedId, -0.2);
      if ((e.key === "e" || e.key === "E") && selectedId) rotate(selectedId, 0.2);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIds, selectedId, uproot, select, rotate]);

  useFrame(() => {
    if (!hoverRef.current) return;
    let [x, z] = hoverRef.current;
    let isSnap = false;
    let ok = true;
    if (pickerId && picker) {
      if (isVine(picker)) {
        const host = findHostNear(x, z, farm);
        if (host) {
          x = host.x;
          z = host.z;
          isSnap = true;
          ok = true;
          hoverRef.current = [x, z];
        } else {
          ok = false;
        }
      } else {
        const s = snapToward(x, z, farm, pickerId, new Set());
        if (s) {
          x = s.x;
          z = s.z;
          isSnap = true;
          hoverRef.current = [x, z];
        }
      }
    }
    setSnapped(isSnap);
    setAllowed(ok);
    setHover((prev) => (prev && prev[0] === x && prev[1] === z ? prev : [x, z]));
  });

  function onPlantAt(wx: number, wz: number) {
    if (useFarmStore.getState().paletteDrag) return;
    if (!pickerId || !picker) {
      select(null);
      return;
    }
    if (isVine(picker)) {
      const host = findHostNear(wx, wz, farm);
      if (!host) {
        setAllowed(false);
        return;
      }
      const [x, z] = worldToPct(host.x, host.z);
      if (plant(pickerId, x, z)) emitPulsesNear(host.x, host.z, pickerId);
      return;
    }
    const s = snapToward(wx, wz, farm, pickerId, new Set());
    const [x, z] = worldToPct(s?.x ?? wx, s?.z ?? wz);
    if (plant(pickerId, x, z)) emitPulsesNear(s?.x ?? wx, s?.z ?? wz, pickerId);
  }

  function onDragStart(id: string, shift: boolean) {
    select(id, { add: shift });
    const ids = useFarmStore.getState().selectedIds;
    const group = ids.includes(id) ? ids : [id];
    setDragIds(group.length ? group : [id]);
    if (controls.current) controls.current.enabled = false;
  }

  function glowFor(p: Placement): number {
    const sourceId = dragId ? farm.placements.find((x) => x.id === dragId)?.speciesId : pickerId;
    if (!sourceId) return 0;
    if (dragId && p.id === dragId) return 0;
    const a = SPECIES_BY_ID[sourceId];
    const b = SPECIES_BY_ID[p.speciesId];
    if (!a || !b) return 0;
    const [ax, az] = dragId
      ? (dragAt ??
        pctToWorld(
          farm.placements.find((x) => x.id === dragId)!.x,
          placementZ(farm.placements.find((x) => x.id === dragId)!),
        ))
      : (hoverRef.current ?? [99, 99]);
    const [bx, bz] = pctToWorld(p.x, placementZ(p));
    const d = Math.hypot(ax - bx, az - bz);
    if (isVine(a)) {
      if (!canTrellis(b) || d > TRELLIS_RANGE) return 0;
      return 1 - d / TRELLIS_RANGE;
    }
    if (!isComplement(a, b) || d > PAIR_RANGE) return 0;
    return 1 - d / PAIR_RANGE;
  }

  function emitPulsesNear(wx: number, wz: number, speciesId: string) {
    const a = SPECIES_BY_ID[speciesId];
    if (!a) return;
    for (const p of farm.placements) {
      const b = SPECIES_BY_ID[p.speciesId];
      if (!b || !isComplement(a, b)) continue;
      const [bx, bz] = pctToWorld(p.x, placementZ(p));
      if (Math.hypot(wx - bx, wz - bz) < PAIR_RANGE) {
        spawnPulse(bx, bz, groundY(bx, bz) + 0.05);
      }
    }
  }

  useEffect(() => {
    const onUp = (e: PointerEvent) => {
      if (dragId) {
        const p = farm.placements.find((x) => x.id === dragId);
        if (p) {
          const wx = dragWorld.id === dragId ? dragWorld.x : pctToWorld(p.x, placementZ(p))[0];
          const wz = dragWorld.id === dragId ? dragWorld.z : pctToWorld(p.x, placementZ(p))[1];
          emitPulsesNear(wx, wz, p.speciesId);
        }
      }
      setDragIds([]);
      setDragAt(null);
      setSnapped(false);
      if (paletteDrag && pickerId && picker && hoverRef.current) {
        const overCanvas = e.target === gl.domElement || gl.domElement.contains(e.target as Node);
        if (overCanvas) {
          const raw = hoverRef.current;
          if (isVine(picker)) {
            const host = findHostNear(raw[0], raw[1], farm);
            if (host) {
              const [x, z] = worldToPct(host.x, host.z);
              if (plant(pickerId, x, z)) emitPulsesNear(host.x, host.z, pickerId);
            } else {
              setAllowed(false);
            }
          } else {
            const s = snapToward(raw[0], raw[1], farm, pickerId, new Set());
            const wx = s?.x ?? raw[0];
            const wz = s?.z ?? raw[1];
            const [x, z] = worldToPct(wx, wz);
            if (plant(pickerId, x, z)) emitPulsesNear(wx, wz, pickerId);
          }
        }
      }
      endPaletteDrag();
    };
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, [paletteDrag, pickerId, picker, plant, endPaletteDrag, dragId, farm.placements]);

  return (
    <>
      <color attach="background" args={[light.sky]} />
      <fog attach="fog" args={[light.sky, light.fogNear, light.fogFar]} />
      <hemisphereLight args={["#FFF6DC", "#5A8A4A", 1.05]} />
      <ambientLight intensity={0.48} />
      <directionalLight
        position={[9, 14, 6]}
        intensity={light.sun}
        color="#FFF1D0"
        castShadow
        shadow-mapSize={[1536, 1536]}
        shadow-camera-far={36}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />

      <OrbitControls
        ref={(n) => {
          controls.current = n;
        }}
        makeDefault
        enablePan
        enableDamping
        dampingFactor={0.1}
        zoomToCursor
        rotateSpeed={0.62}
        zoomSpeed={0.72}
        panSpeed={0.65}
        screenSpacePanning
        minPolarAngle={0.38}
        maxPolarAngle={1.18}
        minDistance={5}
        maxDistance={20}
        target={[0, 0.5, 0]}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />
      <StudioCam controls={controls} />
      <CameraGuard controls={controls} />

      <MotionDriver />
      <PulsePool />
      <Hills />
      <Meadow hoverRef={hoverRef} onPlantAt={onPlantAt} />
      <AreaFence sqft={farmAreaSqft(farm)} />
      <ContactShadows position={[0, -0.02, 0]} opacity={0.38} scale={26} blur={2.8} far={8} color="#2A3A22" />

      {farm.placements.map((p) => (
        <PlacedPlant
          key={p.id}
          placement={p}
          onDragStart={onDragStart}
          glow={glowFor(p)}
          dragging={dragIds.includes(p.id)}
        />
      ))}
      <Ghost hover={pickerId ? hover : null} snapped={snapped} allowed={siteOk && (!pickingVine || allowed)} />
      <DragController
        dragIds={dragIds}
        controls={controls}
        onPreview={(x, z, snap, ok) => {
          setDragAt([x, z]);
          setSnapped(snap);
          setAllowed(ok);
        }}
        onCommit={(moves, ok) => {
          if (!ok) return;
          for (const m of moves) move(m.id, m.x, m.z);
        }}
      />
    </>
  );
}

export function FarmDiorama() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [6.4, 4.6, 7.6], fov: 40, near: 0.1, far: 90 }}
      gl={{ antialias: true, alpha: false }}
      style={{ width: "100%", height: "100%", touchAction: "none", background: "#D8E4C4" }}
    >
      <Scene />
    </Canvas>
  );
}

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      setKeys?: (codes: string[]) => void;
    };
  }
}
