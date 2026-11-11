"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 300; // Strictly <= 500 particles

const SATELLITE_NODES: Array<{
  pos: [number, number, number];
  color: string;
  scale: number;
}> = [
  { pos: [2.15, 0.75, 0.4], color: "#22D3EE", scale: 0.14 },
  { pos: [-2.1, 0.95, -0.35], color: "#3B7BFF", scale: 0.13 },
  { pos: [1.55, -1.35, 0.7], color: "#8B5CF6", scale: 0.15 },
  { pos: [-1.75, -1.1, 0.55], color: "#22D3EE", scale: 0.12 },
  { pos: [0.35, 1.95, -0.75], color: "#8B5CF6", scale: 0.12 },
  { pos: [-0.45, -1.9, -0.65], color: "#3B7BFF", scale: 0.13 },
];

function IntelligenceCoreModel() {
  const coreGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const innerCrystalRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const cBlue = new THREE.Color("#1E5EFF");
    const cCyan = new THREE.Color("#22D3EE");
    const cPurple = new THREE.Color("#8B5CF6");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = i * 2.39996;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
      const radius = 2.45 + ((i * 19) % 100) / 70;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.cos(phi) * 0.88;
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const palette = i % 3 === 0 ? cCyan : i % 3 === 1 ? cBlue : cPurple;
      col[i * 3] = palette.r;
      col[i * 3 + 1] = palette.g;
      col[i * 3 + 2] = palette.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (coreGroupRef.current) {
      const targetX = state.pointer.y * 0.18;
      const targetY = state.pointer.x * 0.28;
      coreGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        coreGroupRef.current.rotation.x,
        targetX,
        0.05
      );
      coreGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        coreGroupRef.current.rotation.y,
        targetY,
        0.05
      );
    }

    if (innerCrystalRef.current) {
      innerCrystalRef.current.rotation.y += delta * 0.32;
      innerCrystalRef.current.rotation.x = Math.sin(t * 0.6) * 0.18;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.42;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.34;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * 0.28;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <>
      {/* Studio 3-Point Enterprise Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[4, 5, 5]}
        intensity={2.2}
        color="#FFFFFF"
      />
      <pointLight position={[-4, 2, 3]} intensity={14} color="#22D3EE" />
      <pointLight position={[3, -3, -2]} intensity={12} color="#8B5CF6" />
      <pointLight position={[0, 0, 3.2]} intensity={8} color="#1E5EFF" />

      <group ref={coreGroupRef}>
        <Float speed={1.8} rotationIntensity={0.22} floatIntensity={0.45}>
          {/* Sculpted Metallic Core Crystal */}
          <mesh ref={innerCrystalRef}>
            <icosahedronGeometry args={[0.92, 0]} />
            <meshPhysicalMaterial
              color="#1E5EFF"
              emissive="#0C2D8C"
              emissiveIntensity={0.65}
              metalness={0.78}
              roughness={0.16}
              clearcoat={1}
              clearcoatRoughness={0.1}
              flatShading
            />
          </mesh>

          {/* Outer Precision Geodesic Lattice */}
          <mesh scale={1.16}>
            <icosahedronGeometry args={[0.96, 1]} />
            <meshStandardMaterial
              color="#22D3EE"
              wireframe
              transparent
              opacity={0.42}
              emissive="#22D3EE"
              emissiveIntensity={0.35}
            />
          </mesh>

          {/* Inner Luminous Core Halo */}
          <mesh>
            <octahedronGeometry args={[0.52, 0]} />
            <meshStandardMaterial
              color="#22D3EE"
              emissive="#22D3EE"
              emissiveIntensity={1.25}
              metalness={0.3}
              roughness={0.2}
            />
          </mesh>

          {/* Kinetic Orbital Ring 1 */}
          <mesh ref={ring1Ref} rotation={[1.15, 0.35, 0]}>
            <torusGeometry args={[1.48, 0.026, 16, 96]} />
            <meshStandardMaterial
              color="#3B7BFF"
              emissive="#1E5EFF"
              emissiveIntensity={0.5}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>

          {/* Kinetic Orbital Ring 2 */}
          <mesh ref={ring2Ref} rotation={[-0.85, 0.65, 0.4]}>
            <torusGeometry args={[1.76, 0.022, 16, 96]} />
            <meshStandardMaterial
              color="#22D3EE"
              emissive="#22D3EE"
              emissiveIntensity={0.55}
              metalness={0.8}
              roughness={0.18}
            />
          </mesh>

          {/* Kinetic Orbital Ring 3 */}
          <mesh ref={ring3Ref} rotation={[0.45, -0.95, 1.1]}>
            <torusGeometry args={[2.02, 0.018, 16, 96]} />
            <meshStandardMaterial
              color="#8B5CF6"
              emissive="#8B5CF6"
              emissiveIntensity={0.45}
              metalness={0.8}
              roughness={0.22}
            />
          </mesh>

          {/* Connected B2B Intelligence Satellite Nodes */}
          {SATELLITE_NODES.map((node, idx) => (
            <group key={idx}>
              <mesh position={node.pos}>
                <octahedronGeometry args={[node.scale, 0]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={0.85}
                  metalness={0.6}
                  roughness={0.2}
                />
              </mesh>
              <Line
                points={[[0, 0, 0], node.pos]}
                color={node.color}
                lineWidth={1.1}
                transparent
                opacity={0.38}
              />
            </group>
          ))}
        </Float>

        {/* Depth Particle Field */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.042}
            vertexColors
            transparent
            opacity={0.78}
            sizeAttenuation
          />
        </points>
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.75}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
    </>
  );
}

export default function HeroNetworkCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.15, 5.4], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      <IntelligenceCoreModel />
    </Canvas>
  );
}
