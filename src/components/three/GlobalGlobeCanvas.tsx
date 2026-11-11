"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const REGION_NODES: Array<[number, number, number]> = [
  [-0.95, 0.72, 1.05], // North America
  [0.25, 0.85, 1.32],  // EMEA
  [1.22, 0.35, 0.96],  // APAC
  [-0.62, -0.78, 1.24], // LATAM
  [0.72, -0.42, 1.35], // Middle East / South Asia
];

function GlobeScene() {
  const globeRef = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    const pairs: Array<Array<[number, number, number]>> = [];
    for (let i = 0; i < REGION_NODES.length; i++) {
      const a = new THREE.Vector3(...REGION_NODES[i]);
      const b = new THREE.Vector3(
        ...REGION_NODES[(i + 1) % REGION_NODES.length]
      );
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(1.95);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      pairs.push(
        curve.getPoints(18).map((p) => [p.x, p.y, p.z] as [number, number, number])
      );
    }
    return pairs;
  }, []);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.14;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Low-poly wireframe globe */}
      <mesh>
        <icosahedronGeometry args={[1.55, 2]} />
        <meshBasicMaterial
          color="#1E5EFF"
          wireframe
          transparent
          opacity={0.34}
        />
      </mesh>

      {/* Subtle inner core */}
      <mesh>
        <icosahedronGeometry args={[1.48, 1]} />
        <meshBasicMaterial color="#0F1E38" transparent opacity={0.85} />
      </mesh>

      {/* Regional Hub Nodes */}
      {REGION_NODES.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#22D3EE" : "#8B5CF6"} />
        </mesh>
      ))}

      {/* Connecting Network Arcs */}
      {arcs.map((pts, idx) => (
        <Line
          key={idx}
          points={pts}
          color="#22D3EE"
          lineWidth={1.2}
          transparent
          opacity={0.65}
        />
      ))}
    </group>
  );
}

export default function GlobalGlobeCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 4.1], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="h-full w-full"
    >
      <GlobeScene />
    </Canvas>
  );
}

