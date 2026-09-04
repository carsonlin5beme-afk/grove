import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { addSway, motionTime, pulseSlots, tickMotion, type SwayHandle, type SwayKind } from "@/lib/motion";

export function MotionDriver() {
  const frame = useRef(0);
  const cam = useRef(new THREE.Vector3());
  useFrame((state, dt) => {
    frame.current += 1;
    cam.current.copy(state.camera.position);
    tickMotion(state.clock.elapsedTime, Math.min(dt, 0.05), cam.current, frame.current);
  });
  return null;
}

export function useSway(
  ref: RefObject<THREE.Object3D | null>,
  kind: SwayKind,
  seed: number,
  opts?: { priority?: number; grow?: boolean },
) {
  const handleRef = useRef<SwayHandle | null>(null);
  useEffect(() => {
    const obj = ref.current;
    if (!obj) return;
    const handle: SwayHandle = {
      obj,
      kind,
      seed,
      priority: opts?.priority ?? 0,
      amount: 0,
      born: performance.now(),
      grow: opts?.grow ?? false,
      tmp: new THREE.Vector3(),
    };
    handleRef.current = handle;
    return addSway(handle);
  }, [ref, kind, seed, opts?.priority, opts?.grow]);
  return handleRef;
}

export function PulsePool() {
  return (
    <group>
      {pulseSlots.map((slot, i) => (
        <mesh
          key={i}
          ref={(n) => {
            slot.mesh = n;
            if (n) n.visible = false;
          }}
          rotation={[-Math.PI / 2, 0, 0]}
          visible={false}
        >
          <ringGeometry args={[0.18, 0.32, 24]} />
          <meshBasicMaterial color="#7DE8A4" transparent opacity={0.45} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export function attachLeafSway(mat: THREE.MeshStandardMaterial) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = motionTime;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `#include <common>\nuniform float uTime;`,
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
       float leafH = max(0.0, transformed.y);
       transformed.x += sin(uTime * 0.85 + instanceMatrix[3][0] * 1.7) * leafH * 0.045;
       transformed.z += cos(uTime * 0.62 + instanceMatrix[3][2] * 1.4) * leafH * 0.028;`,
    );
  };
  mat.needsUpdate = true;
}
