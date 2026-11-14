"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Deterministic pseudo-random generator to satisfy React 19 purity rules
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Custom Fresnel atmospheric rim shader
const ATMOSPHERE_VERTEX = `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec3 vLocalPos;
  void main() {
    vLocalPos = position;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewPos = -mvPos.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const ATMOSPHERE_FRAGMENT = `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec3 vLocalPos;
  uniform float uTime;
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPos);
    float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.8);
    float pulse = 0.85 + 0.15 * sin(uTime * 1.5 + vLocalPos.y * 2.0);
    vec3 cyanRim = vec3(0.13, 0.83, 0.93);
    vec3 blueRim = vec3(0.23, 0.48, 1.0);
    vec3 violetRim = vec3(0.55, 0.36, 0.96);
    float mixFactor = smoothstep(-1.2, 1.2, vLocalPos.y);
    vec3 col = mix(cyanRim, mix(blueRim, violetRim, 0.5), mixFactor);
    float alpha = fresnel * 0.65 * pulse;
    gl_FragColor = vec4(col * 1.4, alpha);
  }
`;

// Helper to generate a soft circular particle texture in memory
function createGlowDotTexture(): THREE.Texture {
  if (typeof document === "undefined") {
    return new THREE.Texture();
  }
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.2, "rgba(34, 211, 238, 0.95)");
  gradient.addColorStop(0.5, "rgba(30, 94, 255, 0.4)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// 1. Constellation Point Cloud & Synapse Connection Lines
function ConstellationMesh({ lowPower = false }: { lowPower?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const dotTexture = useMemo(() => createGlowDotTexture(), []);

  const { positions, colors, linePositions } = useMemo(() => {
    const nodeCount = lowPower ? 550 : 1100;
    const posArr = new Float32Array(nodeCount * 3);
    const colArr = new Float32Array(nodeCount * 3);
    const nodes: THREE.Vector3[] = [];

    const cyan = new THREE.Color("#22D3EE");
    const blue = new THREE.Color("#3B82F6");
    const violet = new THREE.Color("#A855F7");
    const gold = new THREE.Color("#F59E0B");

    // Fibonacci sphere distribution for uniform organic coverage
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      // Subtle radial breathing jitter
      const r = 1.34 + (Math.sin(i * 17.1) * 0.05 + Math.cos(i * 7.7) * 0.04);
      const x = Math.cos(theta) * radiusAtY * r;
      const z = Math.sin(theta) * radiusAtY * r;
      const py = y * r;

      posArr[i * 3] = x;
      posArr[i * 3 + 1] = py;
      posArr[i * 3 + 2] = z;

      nodes.push(new THREE.Vector3(x, py, z));

      // Color distribution: 60% cyan, 24% blue, 12% violet, 4% gold highlight
      const rand = (Math.sin(i * 33.7) + 1) * 0.5;
      let c = cyan;
      if (rand > 0.88) c = gold;
      else if (rand > 0.65) c = violet;
      else if (rand > 0.35) c = blue;

      colArr[i * 3] = c.r;
      colArr[i * 3 + 1] = c.g;
      colArr[i * 3 + 2] = c.b;
    }

    // Build network synapse lines connecting close neighbors
    const lineCoords: number[] = [];
    const maxDistance = lowPower ? 0.28 : 0.24;
    const maxEdgesPerNode = 3;

    for (let i = 0; i < nodes.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].distanceTo(nodes[j]);
        if (d < maxDistance) {
          lineCoords.push(
            nodes[i].x,
            nodes[i].y,
            nodes[i].z,
            nodes[j].x,
            nodes[j].y,
            nodes[j].z
          );
          connections++;
          if (connections >= maxEdgesPerNode) break;
        }
      }
    }

    return {
      positions: posArr,
      colors: colArr,
      linePositions: new Float32Array(lineCoords),
    };
  }, [lowPower]);

  useEffect(() => {
    return () => {
      dotTexture.dispose();
    };
  }, [dotTexture]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y += delta * 0.05;
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      if (mat) {
        mat.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 1.8) * 0.08;
      }
    }
  });

  return (
    <group>
      {/* Network Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={lowPower ? 0.05 : 0.042}
          map={dotTexture}
          vertexColors
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Synapse Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// 2. Holographic Orbital Rings with Orbiting Satellites
function OrbitalRing({
  radius,
  rotation,
  color,
  speed,
  satelliteScale = 1,
}: {
  radius: number;
  rotation: [number, number, number];
  color: string;
  speed: number;
  satelliteScale?: number;
}) {
  const ringRef = useRef<THREE.Group>(null);
  const satRef = useRef<THREE.Mesh>(null);
  const sat2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (satRef.current) {
      satRef.current.position.x = Math.cos(t) * radius;
      satRef.current.position.z = Math.sin(t) * radius;
    }
    if (sat2Ref.current) {
      sat2Ref.current.position.x = Math.cos(t + Math.PI * 0.85) * radius;
      sat2Ref.current.position.z = Math.sin(t + Math.PI * 0.85) * radius;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y = Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <group rotation={rotation}>
      <group ref={ringRef}>
        {/* Primary Torus Ring */}
        <mesh>
          <torusGeometry args={[radius, 0.007, 16, 120]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Secondary Concentric Dotted Marker Ring */}
        <mesh scale={1.018}>
          <torusGeometry args={[radius, 0.004, 12, 64]} />
          <meshBasicMaterial
            color="#22D3EE"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Orbiting Satellite Beacon 1 */}
        <mesh ref={satRef} scale={satelliteScale}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
          <mesh scale={2.4}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.45}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </mesh>

        {/* Orbiting Satellite Beacon 2 */}
        <mesh ref={sat2Ref} scale={satelliteScale * 0.75}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

// 3. Swarming Ambient Intent Particles
function AmbientSwarm({ lowPower = false }: { lowPower?: boolean }) {
  const swarmRef = useRef<THREE.Points>(null);
  const dotTexture = useMemo(() => createGlowDotTexture(), []);

  const { positions, colors } = useMemo(() => {
    const count = lowPower ? 200 : 450;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("#22D3EE");
    const blue = new THREE.Color("#3B7BFF");
    const violet = new THREE.Color("#A855F7");

    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 3.14 + 1.2);
      const r2 = pseudoRandom(i * 7.91 + 4.5);
      const r3 = pseudoRandom(i * 13.37 + 9.8);

      const radius = 1.6 + r1 * 1.5;
      const theta = r2 * Math.PI * 2;
      const phi = Math.acos(r3 * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const r = pseudoRandom(i * 29.83 + 2.1);
      const c = r > 0.6 ? cyan : r > 0.3 ? blue : violet;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, [lowPower]);

  useEffect(() => {
    return () => {
      dotTexture.dispose();
    };
  }, [dotTexture]);

  useFrame((state, delta) => {
    if (swarmRef.current) {
      swarmRef.current.rotation.y += delta * 0.035;
      swarmRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });

  return (
    <points ref={swarmRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={lowPower ? 0.035 : 0.028}
        map={dotTexture}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// 4. Complete B2B Intelligence Core Assembly
function B2BIntelligenceCore({ lowPower = false }: { lowPower?: boolean }) {
  const outerRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const geoCage1Ref = useRef<THREE.Mesh>(null);
  const geoCage2Ref = useRef<THREE.Mesh>(null);
  const atmosphereMatRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (atmosphereMatRef.current) {
      atmosphereMatRef.current.uniforms.uTime.value = t;
    }

    // Organic core rotation + interactive mouse tracking
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.12;

      const targetX = 0.12 + state.pointer.y * 0.16;
      const targetZ = -state.pointer.x * 0.1;
      outerRef.current.rotation.x = THREE.MathUtils.lerp(
        outerRef.current.rotation.x,
        targetX,
        0.05
      );
      outerRef.current.rotation.z = THREE.MathUtils.lerp(
        outerRef.current.rotation.z,
        targetZ,
        0.05
      );
    }

    // Counter-rotating geodesic lattice cages
    if (geoCage1Ref.current) {
      geoCage1Ref.current.rotation.y += delta * 0.08;
      geoCage1Ref.current.rotation.x -= delta * 0.04;
    }
    if (geoCage2Ref.current) {
      geoCage2Ref.current.rotation.y -= delta * 0.06;
      geoCage2Ref.current.rotation.z += delta * 0.05;
    }

    // Core pulsing scale
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 1.6) * 0.015;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={outerRef} scale={1.05} rotation={[0.15, -0.3, 0]}>
      <Float speed={1.15} rotationIntensity={0.06} floatIntensity={0.12}>
        {/* Central Midnight Obsidian Glass Sphere */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[1.24, 48, 48]} />
          <meshPhysicalMaterial
            color="#08101E"
            emissive="#0A1E3C"
            emissiveIntensity={0.65}
            roughness={0.16}
            metalness={0.7}
            clearcoat={1.0}
            clearcoatRoughness={0.12}
            reflectivity={0.9}
          />
        </mesh>

        {/* Luminous Inner Heartbeat Point Light */}
        <pointLight
          position={[0, 0, 0]}
          intensity={2.2}
          distance={3.5}
          color="#22D3EE"
        />

        {/* Geodesic Lattice Cage 1 (Cyan) */}
        <mesh ref={geoCage1Ref}>
          <icosahedronGeometry args={[1.36, lowPower ? 2 : 3]} />
          <meshBasicMaterial
            color="#22D3EE"
            wireframe
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Geodesic Lattice Cage 2 (Electric Violet) */}
        <mesh ref={geoCage2Ref}>
          <icosahedronGeometry args={[1.30, lowPower ? 1 : 2]} />
          <meshBasicMaterial
            color="#8B5CF6"
            wireframe
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Dense Constellation Node Graph & Synapse Connections */}
        <ConstellationMesh lowPower={lowPower} />

        {/* Holographic Equatorial Ring (Cyan) */}
        <OrbitalRing
          radius={1.72}
          rotation={[0.38, -0.4, 0.22]}
          color="#22D3EE"
          speed={0.7}
          satelliteScale={1.1}
        />

        {/* Holographic Inclined Ring (Electric Blue) */}
        <OrbitalRing
          radius={1.92}
          rotation={[-0.65, 0.45, 0.8]}
          color="#3B7BFF"
          speed={-0.55}
          satelliteScale={1.0}
        />

        {/* Holographic Polar Ring (Violet) */}
        <OrbitalRing
          radius={2.10}
          rotation={[1.1, -0.28, -0.48]}
          color="#8B5CF6"
          speed={0.42}
          satelliteScale={0.9}
        />

        {/* Luminous Fresnel Atmospheric Halo */}
        <mesh scale={1.26}>
          <sphereGeometry args={[1, 40, 40]} />
          <shaderMaterial
            ref={atmosphereMatRef}
            vertexShader={ATMOSPHERE_VERTEX}
            fragmentShader={ATMOSPHERE_FRAGMENT}
            uniforms={{ uTime: { value: 0 } }}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Swarming Ambient Intent Particles */}
        <AmbientSwarm lowPower={lowPower} />
      </Float>
    </group>
  );
}

export default function HeroNetworkCanvas({
  inView = true,
  lowPower = false,
}: {
  inView?: boolean;
  lowPower?: boolean;
}) {
  return (
    <Canvas
      dpr={lowPower ? 1 : [1, 1.5]}
      frameloop={inView ? "always" : "never"}
      camera={{ position: [0, 0.04, 5.12], fov: 44 }}
      gl={{
        antialias: !lowPower,
        alpha: true,
        powerPreference: lowPower ? "low-power" : "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
      }}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      {/* Studio lighting setup with vibrant neon rim accents */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 7, 5]} intensity={2.6} color="#E0F2FE" />
      <directionalLight position={[-6, 3, -4]} intensity={2.0} color="#22D3EE" />
      <pointLight position={[3.5, -3.5, 3]} intensity={1.8} color="#3B7BFF" />
      <pointLight position={[-3.5, -4, 2]} intensity={1.4} color="#8B5CF6" />

      <B2BIntelligenceCore lowPower={lowPower} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.65}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </Canvas>
  );
}
