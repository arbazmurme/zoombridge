"use client";

import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/zoombridge_b2b_intelligence_sphere.glb";

// Custom Fresnel atmospheric rim & subtle polar shine shader around the core
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
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPos);
    float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 3.2);
    float lowerGlow = smoothstep(0.3, -1.0, vLocalPos.y);
    vec3 cyanRim = vec3(0.13, 0.83, 0.93);
    vec3 blueAccent = vec3(0.23, 0.48, 1.0);
    vec3 col = mix(cyanRim, blueAccent, lowerGlow * 0.45);
    float alpha = fresnel * (0.42 + lowerGlow * 0.25);
    gl_FragColor = vec4(col * 1.35, alpha);
  }
`;

function IntelligenceSphereModel() {
  const outerRef = useRef<THREE.Group>(null);
  const pulseMatsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const { scene } = useGLTF(MODEL_PATH);

  const atmosphereMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: ATMOSPHERE_VERTEX,
        fragmentShader: ATMOSPHERE_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
      }),
    []
  );

  useEffect(() => {
    const pulseMats: THREE.MeshStandardMaterial[] = [];
    const seenMats = new Set<string>();

    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
        if (!mat || seenMats.has(mat.uuid)) return;
        seenMats.add(mat.uuid);

        if (mat.name === "Midnight glass core") {
          mat.roughness = 0.2;
          mat.metalness = 0.45;
          mat.emissiveIntensity = 1.15;
          mat.needsUpdate = true;
        } else if (
          mat.name === "Electric cyan" ||
          mat.name === "Violet signal" ||
          mat.name === "Signal blue" ||
          mat.name === "Data highlights"
        ) {
          mat.emissiveIntensity = mat.name === "Data highlights" ? 1.8 : 1.45;
          mat.roughness = 0.25;
          mat.metalness = 0.2;
          mat.toneMapped = false;
          mat.needsUpdate = true;
          pulseMats.push(mat);
        } else if (mat.name === "Subtle network") {
          mat.emissiveIntensity = 1.1;
          mat.needsUpdate = true;
        }
      }
    });

    pulseMatsRef.current = pulseMats;
  }, [scene]);

  useEffect(() => {
    return () => {
      atmosphereMaterial.dispose();
    };
  }, [atmosphereMaterial]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Gentle orbital spin + mouse-responsive tilt
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.14;
      const targetX = 0.1 + state.pointer.y * 0.14;
      const targetZ = -state.pointer.x * 0.06;
      outerRef.current.rotation.x = THREE.MathUtils.lerp(
        outerRef.current.rotation.x,
        targetX,
        0.04
      );
      outerRef.current.rotation.z = THREE.MathUtils.lerp(
        outerRef.current.rotation.z,
        targetZ,
        0.04
      );
    }

    // Subtle organic shimmer on glowing signal rings & highlights
    pulseMatsRef.current.forEach((mat, idx) => {
      const base = mat.name === "Data highlights" ? 1.75 : 1.4;
      mat.emissiveIntensity = base + Math.sin(t * 1.8 + idx * 1.1) * 0.25;
    });
  });

  return (
    <group ref={outerRef} scale={1.06} rotation={[0.1, -0.45, 0]}>
      <Float speed={1.15} rotationIntensity={0.06} floatIntensity={0.14}>
        <primitive object={scene} />
        {/* Luminous Fresnel atmospheric shine hugging the 1.05-radius core */}
        <mesh scale={1.07} material={atmosphereMaterial}>
          <sphereGeometry args={[1, 48, 48]} />
        </mesh>
      </Float>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

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
      camera={{ position: [0, 0.08, 4.85], fov: 40 }}
      gl={{
        antialias: !lowPower,
        alpha: true,
        powerPreference: lowPower ? "low-power" : "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      {/* Balanced studio + cyan/blue/violet rim lighting for PBR glass core */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 5]} intensity={2.4} color="#E0F2FE" />
      <directionalLight position={[-5, 2, -4]} intensity={1.8} color="#22D3EE" />
      <pointLight position={[3, -3, 3]} intensity={1.5} color="#3B7BFF" />
      <pointLight position={[-3, -4, 2]} intensity={1.2} color="#8B5CF6" />

      <Suspense fallback={null}>
        <IntelligenceSphereModel />
      </Suspense>

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
