import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { attachLeafSway, useSway } from "@/components/motion-bus";
import { getForm, type PlantForm } from "@/lib/form";
import { buildTree, type BranchSpec } from "@/lib/tree-build";
import type { Species } from "@/lib/types";

const _dummy = new THREE.Object3D();
const _from = new THREE.Vector3();
const _to = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _mid = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _up = new THREE.Vector3(0, 1, 0);

function barkGeometry(specs: BranchSpec[]): THREE.BufferGeometry | null {
  if (specs.length === 0) return null;
  const parts: THREE.BufferGeometry[] = [];
  for (const b of specs) {
    _from.set(b.sx, b.sy, b.sz);
    _to.set(b.ex, b.ey, b.ez);
    _dir.subVectors(_to, _from);
    const len = Math.max(0.012, _dir.length());
    _mid.addVectors(_from, _to).multiplyScalar(0.5);
    _quat.setFromUnitVectors(_up, _dir.normalize());
    const g = new THREE.CylinderGeometry(Math.max(0.006, b.r1), Math.max(0.008, b.r0), len, 8, 1);
    g.applyQuaternion(_quat);
    g.translate(_mid.x, _mid.y, _mid.z);
    parts.push(g);
  }
  const merged = mergeGeometries(parts, false);
  for (const p of parts) p.dispose();
  return merged;
}

function makeLeafGeo() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.5);
  shape.bezierCurveTo(0.32, -0.28, 0.34, 0.05, 0.18, 0.32);
  shape.bezierCurveTo(0.08, 0.48, 0.02, 0.52, 0, 0.55);
  shape.bezierCurveTo(-0.02, 0.52, -0.08, 0.48, -0.18, 0.32);
  shape.bezierCurveTo(-0.34, 0.05, -0.32, -0.28, 0, -0.5);
  const g = new THREE.ShapeGeometry(shape, 5);
  g.translate(0, 0.15, 0);
  return g;
}

const LEAF_GEO = makeLeafGeo();

function Foliage({
  form,
  seed,
  ghost,
  growth = 1,
}: {
  form: PlantForm;
  seed: number;
  ghost?: boolean;
  growth?: number;
}) {
  const canopy = useRef<THREE.Group>(null);
  const leafMesh = useRef<THREE.InstancedMesh>(null);
  const leafMat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      roughness: 0.72,
      metalness: 0,
      side: THREE.DoubleSide,
      transparent: !!ghost,
      opacity: ghost ? 0.38 : 1,
    });
    if (!ghost) attachLeafSway(m);
    return m;
  }, [ghost]);
  useSway(canopy, "canopy", seed);
  const spec = useMemo(() => buildTree(form, seed), [form, seed]);
  const wood = useMemo(() => {
    const all = [...spec.trunks, ...spec.branches];
    return barkGeometry(all);
  }, [spec]);

  useLayoutEffect(() => {
    const mesh = leafMesh.current;
    if (!mesh) return;
    const tint = new THREE.Color();
    spec.leaves.forEach((l, i) => {
      const keep = i / Math.max(1, spec.leaves.length) < 0.2 + growth * 0.8;
      const s = keep ? 0.55 + growth * 0.45 : 0;
      _dummy.position.set(l.x, l.y, l.z);
      _dummy.rotation.set(l.rx, l.ry, l.rz);
      _dummy.scale.set(l.sx * s, l.sy * s, 1);
      _dummy.updateMatrix();
      mesh.setMatrixAt(i, _dummy.matrix);
      tint.set(l.color);
      mesh.setColorAt(i, tint);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [spec, growth]);

  const leafCount = Math.max(1, spec.leaves.length);

  return (
    <group>
      {wood ? (
        <mesh geometry={wood} castShadow receiveShadow>
          <meshStandardMaterial
            color={form.bark}
            roughness={0.92}
            metalness={0}
            transparent={!!ghost}
            opacity={ghost ? 0.4 : 1}
          />
        </mesh>
      ) : null}
      <group ref={canopy}>
        <instancedMesh ref={leafMesh} args={[LEAF_GEO, leafMat, leafCount]} castShadow />
        {growth > 0.55
          ? spec.fruits.map((f, i) => (
              <mesh key={`f${i}`} position={[f.x, f.y, f.z]} castShadow>
                <sphereGeometry args={[f.r, 10, 8]} />
                <meshStandardMaterial color={form.fruitColor} roughness={0.45} />
              </mesh>
            ))
          : null}
        {growth > 0.35
          ? spec.flowers.map((f, i) => (
              <mesh key={`fl${i}`} position={[f.x, f.y, f.z]} rotation={[0.8, i, 0]}>
                <circleGeometry args={[f.r, 7]} />
                <meshStandardMaterial color={f.color} side={THREE.DoubleSide} roughness={0.6} />
              </mesh>
            ))
          : null}
      </group>
    </group>
  );
}

function HerbMesh({ form, seed, ghost }: { form: PlantForm; seed: number; ghost?: boolean }) {
  const h = form.height * 1.08;
  const mat = ghost ? 0.4 : 1;
  if (form.habit === "rosette") {
    return (
      <group>
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2 + seed * 4;
          const len = 0.18 + (i % 3) * 0.05;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.05, 0.02, Math.sin(a) * 0.05]}
              rotation={[-0.95 + (i % 3) * 0.08, a, 0.12]}
              castShadow
            >
              <planeGeometry args={[0.11 + (i % 2) * 0.03, len]} />
              <meshStandardMaterial
                color={i % 2 ? form.leafDeep : form.leaf}
                side={THREE.DoubleSide}
                roughness={0.78}
                transparent={!!ghost}
                opacity={mat}
              />
            </mesh>
          );
        })}
        <mesh position={[0, h * 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.016, h * 0.7, 6]} />
          <meshStandardMaterial color={form.bark} roughness={0.85} />
        </mesh>
        {form.flowerColor ? (
          <group position={[0, h * 0.88, 0]}>
            {[0, 1, 2, 3, 4].map((i) => (
              <mesh key={i} rotation={[1.1, (i / 5) * Math.PI * 2, 0]} position={[0, 0.02, 0]}>
                <planeGeometry args={[0.045, 0.07]} />
                <meshStandardMaterial color={form.flowerColor} side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        ) : null}
      </group>
    );
  }

  if (form.habit === "spike") {
    return (
      <group>
        <mesh position={[0, h * 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.022, h * 0.84, 7]} />
          <meshStandardMaterial color={form.bark} roughness={0.85} />
        </mesh>
        {Array.from({ length: 8 }, (_, i) => {
          const t = 0.2 + i * 0.08;
          const a = i * 0.9 + seed;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.03, h * t, Math.sin(a) * 0.03]}
              rotation={[0.4, a, 0.2]}
              castShadow
            >
              <planeGeometry args={[0.05, 0.14]} />
              <meshStandardMaterial color={form.leaf} side={THREE.DoubleSide} roughness={0.8} />
            </mesh>
          );
        })}
        {form.flowerColor ? (
          <group position={[0, h * 0.92, 0]}>
            {Array.from({ length: 6 }, (_, i) => (
              <mesh key={i} position={[0, i * 0.018, 0]} rotation={[0.3, i, 0]}>
                <circleGeometry args={[0.035 - i * 0.003, 6]} />
                <meshStandardMaterial color={form.flowerColor} side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        ) : null}
      </group>
    );
  }

  const n = form.habit === "grass" ? 16 : 11;
  return (
    <group>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + seed * 5;
        const r = 0.025 + (i % 4) * 0.016;
        const bh = h * (0.5 + ((i * 17 + seed * 10) % 1) * 0.5);
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * r, bh * 0.48, Math.sin(a) * r]}
            rotation={[0.12, a, i % 2 ? 0.2 : -0.14]}
            castShadow
          >
            <planeGeometry args={[0.05, bh]} />
            <meshStandardMaterial
              color={i % 2 ? form.leafDeep : form.leaf}
              side={THREE.DoubleSide}
              roughness={0.8}
              transparent={!!ghost}
              opacity={mat}
            />
          </mesh>
        );
      })}
      {form.flowerColor ? (
        <mesh position={[0, h * 0.92, 0]} rotation={[0.5, 0, 0]}>
          <circleGeometry args={[0.05, 8]} />
          <meshStandardMaterial color={form.flowerColor} side={THREE.DoubleSide} />
        </mesh>
      ) : null}
    </group>
  );
}

function VineMesh({ form, ghost, growth = 1 }: { form: PlantForm; ghost?: boolean; growth?: number }) {
  const h = form.height * 1.2 * (0.16 + 0.84 * Math.max(0.05, growth));
  const pts = useMemo(() => {
    const p: THREE.Vector3[] = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      p.push(new THREE.Vector3(Math.sin(t * 5.2) * 0.1, t * h, Math.cos(t * 3.6) * 0.07));
    }
    return p;
  }, [h]);
  const tube = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 28, 0.012, 6, false);
  }, [pts]);
  return (
    <group>
      <mesh geometry={tube} castShadow>
        <meshStandardMaterial color={form.bark} roughness={0.88} transparent={!!ghost} opacity={ghost ? 0.4 : 1} />
      </mesh>
      {pts.slice(1).map((p, i) => (
        <group key={i} position={[p.x, p.y, p.z]}>
          <mesh rotation={[-0.6, i * 0.8, 0.25]} castShadow>
            <planeGeometry args={[0.14, 0.11]} />
            <meshStandardMaterial
              color={i % 2 ? form.leafDeep : form.leaf}
              side={THREE.DoubleSide}
              roughness={0.74}
            />
          </mesh>
          <mesh position={[0.04, 0.01, 0]} rotation={[-0.4, i * 0.8 + 0.8, 0.1]} castShadow>
            <planeGeometry args={[0.1, 0.08]} />
            <meshStandardMaterial color={form.leaf} side={THREE.DoubleSide} roughness={0.74} />
          </mesh>
        </group>
      ))}
      {form.fruitCount > 0
        ? Array.from({ length: Math.min(form.fruitCount, 7) }, (_, i) => (
            <mesh key={i} position={[0.05, h * (0.35 + i * 0.07), 0.03]} castShadow>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshStandardMaterial color={form.fruitColor} roughness={0.42} />
            </mesh>
          ))
        : null}
    </group>
  );
}

function PalmMesh({ form, ghost }: { form: PlantForm; ghost?: boolean }) {
  const h = form.height * 1.35;
  return (
    <group>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[0, h * ((i + 0.5) / 5) * 0.78, 0]} castShadow>
          <cylinderGeometry args={[0.028 - i * 0.002, 0.036 - i * 0.002, h * 0.16, 8]} />
          <meshStandardMaterial color={form.bark} roughness={0.9} transparent={!!ghost} opacity={ghost ? 0.4 : 1} />
        </mesh>
      ))}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.sin(a) * 0.08, h * 0.82, Math.cos(a) * 0.08]}
            rotation={[1.15, a, 0.1]}
            castShadow
          >
            <planeGeometry args={[0.12, 0.62]} />
            <meshStandardMaterial
              color={i % 2 ? form.leafDeep : form.leaf}
              side={THREE.DoubleSide}
              roughness={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function FungiMesh({ form, ghost }: { form: PlantForm; ghost?: boolean }) {
  return (
    <group>
      {[0, 1, 2, 3].map((i) => {
        const x = (i - 1.4) * 0.07;
        const h = 0.08 + (i % 3) * 0.035;
        const cap = 0.05 + (i % 3) * 0.012;
        return (
          <group key={i} position={[x, 0, (i % 2) * 0.05]}>
            <mesh position={[0, h * 0.42, 0]} castShadow>
              <cylinderGeometry args={[0.012, 0.018, h * 0.72, 8]} />
              <meshStandardMaterial color={form.bark} roughness={0.88} transparent={!!ghost} opacity={ghost ? 0.4 : 1} />
            </mesh>
            <mesh position={[0, h * 0.78, 0]} castShadow scale={[1, 0.42, 1]}>
              <sphereGeometry args={[cap, 14, 10]} />
              <meshStandardMaterial color={form.leaf} roughness={0.68} />
            </mesh>
            <mesh position={[0, h * 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.012, cap * 0.85, 12]} />
              <meshStandardMaterial color={form.leafDeep} side={THREE.DoubleSide} roughness={0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function AnimalMesh({ form, ghost }: { form: PlantForm; ghost?: boolean }) {
  const g = useRef<THREE.Group>(null);
  useSway(g, "bob", form.height);
  const kind = form.animal ?? "chicken";
  const s = 0.85 * (form.height / 0.35);
  const body = form.leaf;
  return (
    <group ref={g} scale={s}>
      {kind === "cow" ? (
        <>
          <mesh position={[0, 0.32, 0]} castShadow rotation={[0, 0, 0.05]}>
            <capsuleGeometry args={[0.14, 0.28, 6, 10]} />
            <meshStandardMaterial color={body} roughness={0.85} />
          </mesh>
          <mesh position={[0.28, 0.4, 0]} castShadow>
            <sphereGeometry args={[0.09, 12, 10]} />
            <meshStandardMaterial color="#E8DCC8" roughness={0.8} />
          </mesh>
          {[-0.1, 0.1].flatMap((z, i) =>
            [-0.12, 0.14].map((x, j) => (
              <mesh key={`${i}${j}`} position={[x, 0.1, z]} castShadow>
                <cylinderGeometry args={[0.028, 0.032, 0.2, 6]} />
                <meshStandardMaterial color="#3A3228" roughness={0.9} />
              </mesh>
            )),
          )}
        </>
      ) : kind === "sheep" ? (
        <>
          <mesh position={[0, 0.28, 0]} castShadow>
            <capsuleGeometry args={[0.16, 0.14, 6, 10]} />
            <meshStandardMaterial color="#EDE6D6" roughness={0.95} />
          </mesh>
          <mesh position={[0.2, 0.32, 0]} castShadow>
            <sphereGeometry args={[0.085, 10, 8]} />
            <meshStandardMaterial color="#C4B49A" roughness={0.85} />
          </mesh>
        </>
      ) : kind === "pig" ? (
        <>
          <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0.1]} castShadow>
            <capsuleGeometry args={[0.12, 0.18, 5, 10]} />
            <meshStandardMaterial color="#E0A89E" roughness={0.7} />
          </mesh>
          <mesh position={[0.22, 0.2, 0]} castShadow>
            <sphereGeometry args={[0.065, 8, 8]} />
            <meshStandardMaterial color="#D08A7C" roughness={0.7} />
          </mesh>
        </>
      ) : kind === "goat" ? (
        <>
          <mesh position={[0, 0.28, 0]} castShadow>
            <capsuleGeometry args={[0.1, 0.16, 5, 10]} />
            <meshStandardMaterial color={body} roughness={0.85} />
          </mesh>
          <mesh position={[0.2, 0.36, 0]} castShadow>
            <sphereGeometry args={[0.075, 10, 8]} />
            <meshStandardMaterial color={body} roughness={0.85} />
          </mesh>
          <mesh position={[0.16, 0.46, 0.04]} rotation={[0, 0, 0.4]}>
            <cylinderGeometry args={[0.01, 0.008, 0.1, 5]} />
            <meshStandardMaterial color="#E8DCC8" />
          </mesh>
          <mesh position={[0.16, 0.46, -0.04]} rotation={[0, 0, 0.4]}>
            <cylinderGeometry args={[0.01, 0.008, 0.1, 5]} />
            <meshStandardMaterial color="#E8DCC8" />
          </mesh>
        </>
      ) : kind === "duck" ? (
        <>
          <mesh position={[0, 0.16, 0]} rotation={[0, 0, 0.2]} castShadow>
            <capsuleGeometry args={[0.09, 0.1, 5, 10]} />
            <meshStandardMaterial color={body} roughness={0.55} />
          </mesh>
          <mesh position={[0.14, 0.22, 0]} castShadow>
            <sphereGeometry args={[0.06, 10, 8]} />
            <meshStandardMaterial color={body} roughness={0.55} />
          </mesh>
          <mesh position={[0.21, 0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.022, 0.065, 6]} />
            <meshStandardMaterial color="#D4A24C" />
          </mesh>
        </>
      ) : kind === "rabbit" ? (
        <>
          <mesh position={[0, 0.12, 0]} castShadow>
            <sphereGeometry args={[0.095, 10, 8]} />
            <meshStandardMaterial color="#C4B49A" roughness={0.9} />
          </mesh>
          <mesh position={[0.02, 0.22, 0.03]} rotation={[0.2, 0, 0.1]}>
            <capsuleGeometry args={[0.016, 0.08, 4, 6]} />
            <meshStandardMaterial color="#C4B49A" />
          </mesh>
          <mesh position={[0.02, 0.22, -0.03]} rotation={[-0.2, 0, 0.1]}>
            <capsuleGeometry args={[0.016, 0.08, 4, 6]} />
            <meshStandardMaterial color="#C4B49A" />
          </mesh>
        </>
      ) : kind === "bee" ? (
        <>
          <mesh position={[0, 0.22, 0]} castShadow>
            <sphereGeometry args={[0.05, 10, 8]} />
            <meshStandardMaterial color="#D4A24C" roughness={0.5} />
          </mesh>
          <mesh position={[-0.04, 0.26, 0.03]} rotation={[0.4, 0, 0.5]}>
            <sphereGeometry args={[0.028, 8, 6]} />
            <meshStandardMaterial color="#E8F0EC" transparent opacity={0.65} />
          </mesh>
        </>
      ) : (
        <>
          <mesh position={[0, 0.155, 0]} rotation={[0, 0, 0.18]} castShadow>
            <capsuleGeometry args={[0.085, 0.09, 6, 12]} />
            <meshStandardMaterial color={body} roughness={0.68} />
          </mesh>
          <mesh position={[0.11, 0.23, 0]} castShadow>
            <sphereGeometry args={[0.052, 12, 10]} />
            <meshStandardMaterial color={body} roughness={0.68} />
          </mesh>
          <mesh position={[0.165, 0.218, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.016, 0.048, 6]} />
            <meshStandardMaterial color="#D08A7C" roughness={0.5} />
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh key={`c${i}`} position={[0.1 + i * 0.012, 0.285, 0]} castShadow>
              <capsuleGeometry args={[0.01, 0.028, 3, 6]} />
              <meshStandardMaterial color="#B56A5E" roughness={0.55} />
            </mesh>
          ))}
          {[-1, 1].map((s) => (
            <mesh key={`w${s}`} position={[-0.02, 0.16, s * 0.07]} rotation={[s * 0.35, 0, 0.15]} castShadow>
              <capsuleGeometry args={[0.035, 0.05, 4, 8]} />
              <meshStandardMaterial color={body} roughness={0.7} />
            </mesh>
          ))}
          {[-0.6, -0.2, 0.2, 0.6].map((a, i) => (
            <mesh key={`t${i}`} position={[-0.12, 0.18, 0]} rotation={[0.2, a * 0.25, 2.3]} castShadow>
              <planeGeometry args={[0.045, 0.09]} />
              <meshStandardMaterial color="#B56A5E" side={THREE.DoubleSide} roughness={0.65} />
            </mesh>
          ))}
          {[-1, 1].map((s) => (
            <mesh key={`leg${s}`} position={[0.02, 0.06, s * 0.035]} castShadow>
              <cylinderGeometry args={[0.01, 0.012, 0.1, 5]} />
              <meshStandardMaterial color="#D4A24C" />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

function GlowAura({ amount }: { amount: number }) {
  const g = useRef<THREE.Group>(null);
  const handle = useSway(g, "glow", 1);
  if (handle.current) handle.current.amount = amount;
  return (
    <group ref={g} visible={amount > 0.03}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[0.2, 0.48, 32]} />
        <meshBasicMaterial color="#8EF0B4" transparent opacity={0.32 * Math.max(amount, 0.05)} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.72, 12, 10]} />
        <meshBasicMaterial color="#A8F5C4" transparent opacity={0.1 * Math.max(amount, 0.05)} depthWrite={false} />
      </mesh>
    </group>
  );
}

function GroundcoverMesh({ form, seed, ghost }: { form: PlantForm; seed: number; ghost?: boolean }) {
  const mats = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const a = (i / 16) * Math.PI * 2 + seed * 3;
      const r = 0.04 + (i % 5) * 0.028;
      return {
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        ry: a,
        s: 0.07 + (i % 3) * 0.02,
        color: i % 2 ? form.leafDeep : form.leaf,
      };
    });
  }, [form, seed]);
  return (
    <group>
      {mats.map((m, i) => (
        <mesh key={i} position={[m.x, 0.018, m.z]} rotation={[-1.15, m.ry, 0.1]} castShadow>
          <planeGeometry args={[m.s, m.s * 1.15]} />
          <meshStandardMaterial
            color={m.color}
            side={THREE.DoubleSide}
            roughness={0.82}
            transparent={!!ghost}
            opacity={ghost ? 0.4 : 1}
          />
        </mesh>
      ))}
      {form.flowerColor
        ? [0, 1, 2].map((i) => (
            <mesh key={`fl${i}`} position={[(i - 1) * 0.05, 0.05, i * 0.02]} rotation={[-0.8, 0, 0]}>
              <circleGeometry args={[0.022, 6]} />
              <meshStandardMaterial color={form.flowerColor} side={THREE.DoubleSide} />
            </mesh>
          ))
        : null}
    </group>
  );
}

export function LivingPlant({
  species,
  seed,
  scale,
  ghost = false,
  glow = 0,
  growth = 1,
}: {
  species: Species;
  seed: number;
  scale: number;
  ghost?: boolean;
  glow?: number;
  growth?: number;
}) {
  const form = getForm(species);
  const root = useRef<THREE.Group>(null);
  useSway(root, "idle", seed, { grow: !ghost });
  const woody =
    form.habit === "oak" ||
    form.habit === "round" ||
    form.habit === "vase" ||
    form.habit === "column" ||
    form.habit === "weeping" ||
    form.habit === "conifer" ||
    form.habit === "cedar" ||
    form.habit === "multi" ||
    form.habit === "shrub";

  return (
    <group scale={scale}>
      <group ref={root}>
      <GlowAura amount={glow} />
      {form.habit === "animal" ? (
        <AnimalMesh form={form} ghost={ghost} />
      ) : form.habit === "fungi" ? (
        <FungiMesh form={form} ghost={ghost} />
      ) : form.habit === "vine" || form.habit === "cane" ? (
        <VineMesh form={form} ghost={ghost} growth={growth} />
      ) : form.habit === "palm" ? (
        <PalmMesh form={form} ghost={ghost} />
      ) : woody ? (
        <Foliage form={form} seed={seed} ghost={ghost} growth={growth} />
      ) : species.layer === "groundcover" ? (
        <GroundcoverMesh form={form} seed={seed} ghost={ghost} />
      ) : (
        <HerbMesh form={form} seed={seed} ghost={ghost} />
      )}
      </group>
    </group>
  );
}
