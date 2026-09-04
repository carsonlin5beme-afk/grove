import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { hashSeed } from "@/lib/form";
import { MEADOW_R, groundY } from "@/lib/ground";

function heightAt(x: number, z: number): number {
  const d = Math.hypot(x, z);
  const meadow = groundY(x, z);
  const ridge =
    Math.sin(x * 0.09 + 1.2) * 1.15 +
    Math.cos(z * 0.07 - 0.4) * 0.95 +
    Math.sin((x + z) * 0.05) * 0.7 +
    Math.cos(x * 0.18) * 0.35 +
    Math.sin(z * 0.16 + x * 0.04) * 0.45;
  const bowl = THREE.MathUtils.smoothstep(d, 7.2, 14);
  const far = THREE.MathUtils.smoothstep(d, 16, 38);
  const roll = 0.15 + ridge * bowl * 1.15 + far * (1.8 + ridge * 0.6);
  if (d < 8.2) return meadow;
  if (d < 11) return THREE.MathUtils.lerp(meadow, roll * 0.35, (d - 8.2) / 2.8);
  return roll;
}

export function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(92, 78, 96, 72);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    const col = new Float32Array(pos.count * 3);
    const cMeadow = new THREE.Color("#6FA86A");
    const cSun = new THREE.Color("#8FBF72");
    const cShade = new THREE.Color("#4E8A4A");
    const cFar = new THREE.Color("#7AAB62");
    const mix = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = heightAt(x, z);
      pos.setY(i, y);
      const d = Math.hypot(x, z);
      if (d < 8.4) mix.copy(cMeadow).lerp(cSun, (Math.sin(x * 1.3) + 1) * 0.18);
      else mix.copy(cFar).lerp(cShade, THREE.MathUtils.smoothstep(d, 14, 32));
      mix.offsetHSL(0, 0, (hashSeed(`c${i}`) - 0.5) * 0.04);
      col[i * 3] = mix.r;
      col[i * 3 + 1] = mix.g;
      col[i * 3 + 2] = mix.b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.92} metalness={0} />
    </mesh>
  );
}

export function MeadowGrass() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const n = 1600;
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const w = 0.026;
    const h = 0.13;
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([-w, 0, 0, w, 0, 0, 0, h, 0, -w * 0.45, h * 0.5, 0.006, w * 0.4, h * 0.48, -0.004, 0, h, 0]),
        3,
      ),
    );
    g.setIndex([0, 1, 4, 0, 4, 3, 3, 4, 2]);
    g.computeVertexNormals();
    return g;
  }, []);

  useLayoutEffect(() => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();
    const tint = new THREE.Color();
    const greens = ["#3F7A3C", "#5A9A4A", "#6EAF58", "#4A8A40"];
    for (let i = 0; i < n; i++) {
      const a = hashSeed(`g-${i}`) * Math.PI * 2;
      const r = Math.sqrt(hashSeed(`gr-${i}`)) * 28;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r * 0.88;
      dummy.position.set(x, heightAt(x, z), z);
      dummy.rotation.set(0.1, a, (hashSeed(`gt-${i}`) - 0.5) * 0.4);
      const near = Math.hypot(x, z) < MEADOW_R + 1;
      dummy.scale.setScalar((near ? 0.75 : 1.15) + hashSeed(`gs-${i}`) * 1.2);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
      tint.set(greens[i % greens.length]!);
      mesh.current.setColorAt(i, tint);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={mesh} args={[geo, undefined, n]} castShadow={false}>
      <meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={0.9} />
    </instancedMesh>
  );
}

export function DistantWood() {
  const n = 36;
  const trunk = useMemo(() => new THREE.CylinderGeometry(0.04, 0.07, 0.7, 6), []);
  const crown = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(0.42, 1);
    g.scale(1, 0.78, 1.05);
    return g;
  }, []);
  const tRef = useRef<THREE.InstancedMesh>(null);
  const cRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    const tint = new THREE.Color();
    const greens = ["#4E8A46", "#6A9E58", "#3D7340", "#88B56E"];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + hashSeed(`w${i}`) * 0.4;
      const r = 16 + hashSeed(`wr${i}`) * 18;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r * 0.86 - 4;
      const y = heightAt(x, z);
      const s = 0.9 + hashSeed(`ws${i}`) * 1.6;
      dummy.position.set(x, y + 0.35 * s, z);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(0, a, 0);
      dummy.updateMatrix();
      tRef.current?.setMatrixAt(i, dummy.matrix);
      dummy.position.y = y + 0.85 * s;
      dummy.scale.set(s * 1.4, s * 1.2, s * 1.4);
      dummy.updateMatrix();
      cRef.current?.setMatrixAt(i, dummy.matrix);
      tint.set(greens[i % greens.length]!);
      cRef.current?.setColorAt(i, tint);
    }
    if (tRef.current) tRef.current.instanceMatrix.needsUpdate = true;
    if (cRef.current) {
      cRef.current.instanceMatrix.needsUpdate = true;
      if (cRef.current.instanceColor) cRef.current.instanceColor.needsUpdate = true;
    }
  }, []);

  return (
    <group>
      <instancedMesh ref={tRef} args={[trunk, undefined, n]}>
        <meshStandardMaterial color="#6A4A32" roughness={0.94} />
      </instancedMesh>
      <instancedMesh ref={cRef} args={[crown, undefined, n]}>
        <meshStandardMaterial roughness={0.82} />
      </instancedMesh>
    </group>
  );
}

export function SkyDome() {
  return (
    <mesh>
      <sphereGeometry args={[70, 24, 16]} />
      <meshBasicMaterial color="#E7F0D4" side={THREE.BackSide} />
    </mesh>
  );
}
