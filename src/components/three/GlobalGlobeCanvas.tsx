"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Deterministic pseudo-random number generator for React 19 purity
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Convert Lat/Lon to 3D Cartesian coordinates on sphere of radius R
function latLonToVector3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

// Major Global B2B Hub Coordinates [Lat, Lon, Label, Color]
const GLOBAL_HUBS = [
  { name: "New York / AMER", lat: 40.71, lon: -74.0, color: "#22D3EE" },
  { name: "San Francisco / Silicon Valley", lat: 37.77, lon: -122.41, color: "#3B7BFF" },
  { name: "London / EMEA", lat: 51.5, lon: -0.12, color: "#22D3EE" },
  { name: "Frankfurt / EU Hub", lat: 50.11, lon: 8.68, color: "#8B5CF6" },
  { name: "Tokyo / APAC", lat: 35.67, lon: 139.65, color: "#3B7BFF" },
  { name: "Singapore / ASEAN", lat: 1.35, lon: 103.81, color: "#22D3EE" },
  { name: "São Paulo / LATAM", lat: -23.55, lon: -46.63, color: "#8B5CF6" },
  { name: "Sydney / ANZ", lat: -33.86, lon: 151.2, color: "#10B981" },
];

// Major B2B Demand Corridors (from Hub Index to Hub Index)
const DEMAND_CORRIDORS: Array<[number, number]> = [
  [0, 2], // New York <-> London (Transatlantic)
  [1, 4], // San Francisco <-> Tokyo (Transpacific)
  [2, 3], // London <-> Frankfurt
  [3, 5], // Frankfurt <-> Singapore
  [5, 4], // Singapore <-> Tokyo
  [0, 6], // New York <-> São Paulo (Pan-American)
  [5, 7], // Singapore <-> Sydney
];

// Continent Bounding Boxes [minLat, maxLat, minLon, maxLon, weight]
const CONTINENTS = [
  // North America
  { minLat: 24, maxLat: 60, minLon: -125, maxLon: -68, count: 280 },
  // Europe
  { minLat: 36, maxLat: 64, minLon: -10, maxLon: 38, count: 240 },
  // Asia / APAC
  { minLat: 8, maxLat: 55, minLon: 65, maxLon: 142, count: 320 },
  // South America
  { minLat: -45, maxLat: 10, minLon: -75, maxLon: -35, count: 160 },
  // Africa
  { minLat: -32, maxLat: 34, minLon: -15, maxLon: 48, count: 140 },
  // Australia
  { minLat: -38, maxLat: -15, minLon: 115, maxLon: 152, count: 90 },
];

// Helper to generate circular particle texture in memory
function createDotTexture(): THREE.Texture {
  if (typeof document === "undefined") return new THREE.Texture();
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.25, "rgba(34, 211, 238, 0.95)");
  gradient.addColorStop(0.65, "rgba(30, 94, 255, 0.35)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// 1. Continental Point Cloud
function ContinentsMesh({ radius = 1.5 }: { radius?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const dotTexture = useMemo(() => createDotTexture(), []);

  const { positions, colors } = useMemo(() => {
    const coords: number[] = [];
    const cols: number[] = [];
    const cyan = new THREE.Color("#22D3EE");
    const blue = new THREE.Color("#3B7BFF");
    const violet = new THREE.Color("#8B5CF6");
    const emerald = new THREE.Color("#10B981");

    let seed = 1.0;

    CONTINENTS.forEach((cont) => {
      for (let i = 0; i < cont.count; i++) {
        seed += 1.37;
        const r1 = pseudoRandom(seed);
        seed += 0.89;
        const r2 = pseudoRandom(seed);

        const lat = cont.minLat + r1 * (cont.maxLat - cont.minLat);
        const lon = cont.minLon + r2 * (cont.maxLon - cont.minLon);

        const [x, y, z] = latLonToVector3(lat, lon, radius);
        coords.push(x, y, z);

        const rCol = pseudoRandom(seed * 2.3);
        const c = rCol > 0.65 ? cyan : rCol > 0.35 ? blue : rCol > 0.15 ? violet : emerald;
        cols.push(c.r, c.g, c.b);
      }
    });

    return {
      positions: new Float32Array(coords),
      colors: new Float32Array(cols),
    };
  }, [radius]);

  useEffect(() => {
    return () => {
      dotTexture.dispose();
    };
  }, [dotTexture]);

  useFrame((state) => {
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      if (mat) {
        mat.size = 0.042 + Math.sin(state.clock.elapsedTime * 1.5) * 0.005;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        map={dotTexture}
        vertexColors
        transparent
        opacity={0.88}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// 2. Flight Arcs with Traveling Photon Beads
function CorridorArcs({ radius = 1.5 }: { radius?: number }) {
  const photonsRef = useRef<Array<THREE.Mesh | null>>([]);

  const arcCurves = useMemo(() => {
    return DEMAND_CORRIDORS.map(([fromIdx, toIdx]) => {
      const from = GLOBAL_HUBS[fromIdx];
      const to = GLOBAL_HUBS[toIdx];

      const start = new THREE.Vector3(...latLonToVector3(from.lat, from.lon, radius));
      const end = new THREE.Vector3(...latLonToVector3(to.lat, to.lon, radius));

      const mid = start
        .clone()
        .add(end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(radius * 1.28);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      return {
        curve,
        points: curve.getPoints(24).map((p) => [p.x, p.y, p.z] as [number, number, number]),
      };
    });
  }, [radius]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    arcCurves.forEach((arc, idx) => {
      const mesh = photonsRef.current[idx];
      if (mesh) {
        // Photon travels along the curve continuously
        const progress = (t * 0.35 + idx * 0.18) % 1.0;
        const pos = arc.curve.getPointAt(progress);
        mesh.position.set(pos.x, pos.y, pos.z);
      }
    });
  });

  return (
    <group>
      {arcCurves.map((arc, idx) => (
        <React.Fragment key={idx}>
          {/* Glowing Arc Line */}
          <Line
            points={arc.points}
            color={idx % 2 === 0 ? "#22D3EE" : "#8B5CF6"}
            lineWidth={1.4}
            transparent
            opacity={0.65}
          />

          {/* Traveling Photon Data Packet */}
          <mesh
            ref={(el) => {
              photonsRef.current[idx] = el;
            }}
          >
            <sphereGeometry args={[0.038, 12, 12]} />
            <meshBasicMaterial color="#FFFFFF" />
            <mesh scale={2.4}>
              <sphereGeometry args={[0.038, 8, 8]} />
              <meshBasicMaterial
                color="#22D3EE"
                transparent
                opacity={0.4}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

// 3. Regional Hub Radar Beacons
function HubBeacons({ radius = 1.5 }: { radius?: number }) {
  const halosRef = useRef<Array<THREE.Mesh | null>>([]);

  const hubs = useMemo(() => {
    return GLOBAL_HUBS.map((hub) => ({
      ...hub,
      position: latLonToVector3(hub.lat, hub.lon, radius),
    }));
  }, [radius]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    halosRef.current.forEach((halo, idx) => {
      if (halo) {
        const pulse = (Math.sin(t * 2.2 + idx * 0.8) + 1) * 0.5;
        const scale = 1 + pulse * 1.4;
        halo.scale.set(scale, scale, scale);
        const mat = halo.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = 0.55 * (1 - pulse * 0.6);
        }
      }
    });
  });

  return (
    <group>
      {hubs.map((hub, idx) => (
        <group key={hub.name} position={hub.position}>
          {/* Core Hub Dot */}
          <mesh>
            <sphereGeometry args={[0.048, 16, 16]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>

          {/* Inner Accent Ring */}
          <mesh scale={1.5}>
            <sphereGeometry args={[0.048, 12, 12]} />
            <meshBasicMaterial color={hub.color} />
          </mesh>

          {/* Pulsing Sonar Beacon Halo */}
          <mesh
            ref={(el) => {
              halosRef.current[idx] = el;
            }}
          >
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshBasicMaterial
              color={hub.color}
              transparent
              opacity={0.45}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 4. Main Globe Assembly
function GlobalGlobeScene() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Continuous graceful planetary rotation
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.12;

      // Subtle responsive mouse parallax
      const targetX = 0.18 + state.pointer.y * 0.14;
      const targetZ = -state.pointer.x * 0.08;
      globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        globeGroupRef.current.rotation.x,
        targetX,
        0.04
      );
      globeGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        globeGroupRef.current.rotation.z,
        targetZ,
        0.04
      );
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <group ref={globeGroupRef} rotation={[0.2, -0.6, 0]}>
      <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.12}>
        {/* Inner Obsidian Planetary Sphere */}
        <mesh>
          <sphereGeometry args={[1.47, 48, 48]} />
          <meshPhysicalMaterial
            color="#070E1A"
            emissive="#0A1832"
            emissiveIntensity={0.55}
            roughness={0.2}
            metalness={0.8}
            clearcoat={1.0}
            clearcoatRoughness={0.15}
          />
        </mesh>

        {/* Ambient Planetary Core Light */}
        <pointLight position={[0, 0, 0]} intensity={1.8} distance={3.2} color="#22D3EE" />

        {/* Outer Fine Geodesic Coordinates Cage */}
        <mesh ref={outerWireRef}>
          <icosahedronGeometry args={[1.56, 3]} />
          <meshBasicMaterial
            color="#1E5EFF"
            wireframe
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Dense Continental Landmass Data Nodes */}
        <ContinentsMesh radius={1.5} />

        {/* Intercontinental B2B Corridors with Traveling Data Packets */}
        <CorridorArcs radius={1.5} />

        {/* Major Regional Hub Radar Beacons */}
        <HubBeacons radius={1.5} />

        {/* Tilted Holographic Satellite Orbit Ring */}
        <group rotation={[0.45, 0.3, -0.5]}>
          <mesh>
            <torusGeometry args={[1.92, 0.005, 12, 100]} />
            <meshBasicMaterial
              color="#22D3EE"
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function GlobalGlobeCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.05, 4.2], fov: 44 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={2.2} color="#E0F2FE" />
      <directionalLight position={[-5, 2, -4]} intensity={1.8} color="#22D3EE" />
      <pointLight position={[3, -3, 3]} intensity={1.4} color="#3B7BFF" />
      <pointLight position={[-3, -4, 2]} intensity={1.2} color="#8B5CF6" />

      <GlobalGlobeScene />

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
