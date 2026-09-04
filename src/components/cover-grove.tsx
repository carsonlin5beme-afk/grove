import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { LivingPlant } from "@/components/living-plant";
import { hashSeed } from "@/lib/form";
import { SPECIES_BY_ID } from "@/lib/species";

const PAPER = "#F3E6D0";

type Bloom = "enter" | "guilds" | null;
type Par = { x: number; y: number };

const HERO: Array<{ id: string; x: number; z: number; s: number; bloom?: Bloom }> = [
  { id: "chestnut", x: 1.15, z: -0.05, s: 1.28, bloom: "enter" },
  { id: "apple", x: 2.85, z: 0.35, s: 1.12, bloom: "enter" },
  { id: "alder", x: 4.15, z: -0.25, s: 1.05, bloom: "guilds" },
  { id: "oak-white", x: -0.35, z: 0.15, s: 1.05 },
  { id: "hazel", x: 2.35, z: 1.35, s: 0.92, bloom: "guilds" },
  { id: "fig", x: 4.55, z: 0.85, s: 0.88 },
  { id: "comfrey", x: 0.35, z: 1.05, s: 1.0 },
  { id: "nasturtium", x: 1.75, z: 1.45, s: 0.78 },
  { id: "clover-white", x: 3.15, z: 1.55, s: 0.62, bloom: "guilds" },
  { id: "bean-runner", x: 1.05, z: 0.45, s: 0.82, bloom: "guilds" },
  { id: "grape", x: 1.55, z: 0.25, s: 0.72, bloom: "enter" },
  { id: "blueberry", x: 3.65, z: 1.25, s: 0.68 },
  { id: "chicken", x: 2.05, z: 1.15, s: 0.95, bloom: "enter" },
];

const EDGE_IDS = [
  "oak-white",
  "black-locust",
  "chestnut",
  "apple",
  "peach",
  "alder",
  "fig",
  "olive",
  "hazel",
  "pear",
  "plum",
  "honey-locust",
];

function groundY(x: number, z: number) {
  return Math.sin(x * 0.22) * 0.07 + Math.cos(z * 0.18) * 0.05;
}

function PlantAt({
  id,
  x,
  z,
  s,
  bloom,
  active,
}: {
  id: string;
  x: number;
  z: number;
  s: number;
  bloom?: Bloom;
  active: Bloom;
}) {
  const g = useRef<THREE.Group>(null);
  const sp = SPECIES_BY_ID[id];
  useFrame(() => {
    if (!g.current) return;
    const on = bloom && bloom === active;
    const t = on ? 1.08 : 1;
    g.current.scale.lerp(new THREE.Vector3(t, t, t), 0.08);
  });
  if (!sp) return null;
  const y = groundY(x, z);
  return (
    <group ref={g} position={[x, y, z]}>
      <LivingPlant species={sp} seed={hashSeed(id + x)} scale={s} />
    </group>
  );
}

function Bee({ delay = 0 }: { delay?: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime * 0.55 + delay;
    g.current.position.set(2.4 + Math.sin(t) * 1.4, 1.15 + Math.sin(t * 1.7) * 0.25, 0.4 + Math.cos(t * 0.8) * 1.1);
  });
  return (
    <group ref={g}>
      <mesh>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshLambertMaterial color="#D4A24C" />
      </mesh>
    </group>
  );
}

function Meadow() {
  const geo = useMemo(() => {
    const g = new THREE.CircleGeometry(18, 72);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, groundY(pos.getX(i), pos.getZ(i)));
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <mesh geometry={geo} receiveShadow>
      <meshLambertMaterial color="#8FBF8A" />
    </mesh>
  );
}

function LilacPatch() {
  return (
    <mesh position={[2.4, 0.04, 0.7]} scale={[3.6, 0.07, 2.6]} receiveShadow>
      <sphereGeometry args={[1, 24, 16]} />
      <meshLambertMaterial color="#C4B4D2" />
    </mesh>
  );
}

function Hills() {
  const hills = [
    { p: [-10, -0.6, -8] as const, s: [7, 2.4, 5] as const, c: "#7BB06A" },
    { p: [12, -0.8, -10] as const, s: [8, 2.8, 5.5] as const, c: "#8FBF7A" },
    { p: [2, -1.1, -14] as const, s: [12, 3.4, 6] as const, c: "#6A9E58" },
    { p: [-14, -0.4, 2] as const, s: [5, 1.8, 4] as const, c: "#88B56E" },
  ];
  return (
    <group>
      {hills.map((h, i) => (
        <mesh key={i} position={h.p} scale={h.s}>
          <sphereGeometry args={[1, 18, 12]} />
          <meshLambertMaterial color={h.c} />
        </mesh>
      ))}
    </group>
  );
}

function EdgeForest({ bloom }: { bloom: Bloom }) {
  const rows = useMemo(() => {
    const out: Array<{ id: string; x: number; z: number; s: number }> = [];
    for (let i = -7; i <= 9; i++) {
      const id = EDGE_IDS[(i + 21) % EDGE_IDS.length];
      const j = hashSeed(`e${i}`);
      out.push({
        id,
        x: i * 1.65 + (j - 0.5) * 0.55,
        z: 4.2 + (i % 3) * 0.55 + j * 0.45,
        s: 0.72 + j * 0.38,
      });
    }
    for (let i = -6; i <= 8; i++) {
      const id = EDGE_IDS[(i + 5) % EDGE_IDS.length];
      const j = hashSeed(`f${i}`);
      out.push({
        id,
        x: i * 1.8 + (j - 0.5) * 0.7,
        z: 6.1 + j * 0.8,
        s: 0.85 + j * 0.4,
      });
    }
    return out;
  }, []);
  return (
    <group>
      {rows.map((p, i) => (
        <PlantAt key={`${p.id}-${i}`} {...p} active={bloom} />
      ))}
    </group>
  );
}

function Grass() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const n = 380;
  useMemo(() => n, []);
  useFrame(() => {
    /* planted once below */
  });
  const planted = useRef(false);
  useFrame(() => {
    if (planted.current || !mesh.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < n; i++) {
      const a = hashSeed(`cg${i}`) * Math.PI * 2;
      const r = Math.sqrt(hashSeed(`cgr${i}`)) * 11;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      dummy.position.set(x, groundY(x, z) + 0.06, z);
      dummy.rotation.set(0.12, a, 0.04);
      dummy.scale.setScalar(0.55 + hashSeed(`cgs${i}`) * 0.9);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    planted.current = true;
  });
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, n]}>
      <planeGeometry args={[0.04, 0.14]} />
      <meshStandardMaterial color="#4E8F4A" side={THREE.DoubleSide} roughness={0.85} />
    </instancedMesh>
  );
}

function Rig({ par }: { par: Par }) {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cam = state.camera;
    cam.position.x = -0.35 + Math.sin(t * 0.12) * 0.16 + par.x * 0.035;
    cam.position.y = 2.25 + Math.sin(t * 0.09) * 0.06 + par.y * 0.025;
    cam.position.z = 7.2;
    cam.lookAt(2.05, 0.82, 0.2);
  });
  return null;
}

function Scene({ bloom, par }: { bloom: Bloom; par: Par }) {
  return (
    <>
      <color attach="background" args={[PAPER]} />
      <fog attach="fog" args={[PAPER, 9, 24]} />
      <hemisphereLight args={["#FFF6DC", "#5A8A4A", 0.95]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.15}
        color="#FFF1D0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <Rig par={par} />
      <Hills />
      <Meadow />
      <LilacPatch />
      <Grass />
      <ContactShadows position={[0, 0, 0]} opacity={0.28} scale={28} blur={2.8} far={8} color="#2A3A22" />
      {HERO.map((p) => (
        <PlantAt key={p.id} {...p} active={bloom} />
      ))}
      <EdgeForest bloom={bloom} />
      <Bee />
      <Bee delay={2.4} />
    </>
  );
}

export function CoverGrove({
  bloom = null,
  par = { x: 0, y: 0 },
}: {
  bloom?: Bloom;
  par?: Par;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [-0.35, 2.25, 7.2], fov: 38, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: false }}
      style={{ width: "100%", height: "100%", background: PAPER }}
    >
      <Scene bloom={bloom} par={par} />
    </Canvas>
  );
}
