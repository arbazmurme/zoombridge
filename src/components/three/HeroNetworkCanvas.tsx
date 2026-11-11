"use client";

import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/a_windy_day_fast.glb";

function createGlowDotTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  grad.addColorStop(0, "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.26, "rgba(255, 255, 255, 0.92)");
  grad.addColorStop(0.55, "rgba(255, 255, 255, 0.34)");
  grad.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Custom Fresnel atmospheric shine & lower horizon sun-flare halo shader
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
    float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 3.1);
    float southShine = smoothstep(0.25, -1.0, vLocalPos.y);
    vec3 cyanRim = vec3(0.18, 0.72, 1.0);
    vec3 warmSun = vec3(1.0, 0.94, 0.82);
    vec3 col = mix(cyanRim, warmSun, southShine * 0.65);
    float alpha = fresnel * (0.48 + southShine * 0.42);
    gl_FragColor = vec4(col * (1.2 + southShine * 0.5), alpha);
  }
`;

function WindyDayGlbModel({ lowPower }: { lowPower: boolean }) {
  const outerRef = useRef<THREE.Group>(null);
  const frameNodesRef = useRef<THREE.Object3D[]>([]);
  const frameIndexRef = useRef(0);
  const { scene } = useGLTF(MODEL_PATH);
  const dotTexture = useMemo(() => createGlowDotTexture(), []);

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
    const frames: Array<{ idx: number; node: THREE.Object3D }> = [];

    // Crisp luminous silver-cyan dots for the static 19k continent grid
    const continentMat = new THREE.PointsMaterial({
      size: 0.018,
      sizeAttenuation: true,
      color: new THREE.Color(1.3, 1.38, 1.5),
      vertexColors: true,
      map: dotTexture ?? undefined,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });

    // Bright HDR-boosted shining particles for wind streams & outer sparkles
    const windMat = new THREE.PointsMaterial({
      size: 0.036,
      sizeAttenuation: true,
      color: new THREE.Color(1.75, 1.75, 1.75),
      vertexColors: true,
      map: dotTexture ?? undefined,
      transparent: true,
      opacity: 1.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });

    scene.traverse((obj) => {
      if ((obj as THREE.Points).isPoints) {
        const pts = obj as THREE.Points;
        const count = pts.geometry?.attributes?.position?.count ?? 0;
        pts.material = count > 18000 && count < 19800 ? continentMat : windMat;
      }
      if (obj.children.length === 1 && /^frame_(\d+)$/.test(obj.children[0].name)) {
        const match = obj.children[0].name.match(/^frame_(\d+)$/);
        const idx = match ? Number(match[1]) : 0;
        frames.push({ idx, node: obj });
      }
    });

    frames.sort((a, b) => a.idx - b.idx);
    const ordered = frames.map((f) => f.node);

    ordered.forEach((node, idx) => {
      node.scale.set(1, 1, 1);
      node.visible = idx === 0;
    });
    frameNodesRef.current = ordered;
    frameIndexRef.current = 0;

    return () => {
      continentMat.dispose();
      windMat.dispose();
    };
  }, [scene, dotTexture]);

  useEffect(() => {
    return () => {
      dotTexture?.dispose();
      atmosphereMaterial.dispose();
    };
  }, [dotTexture, atmosphereMaterial]);

  useFrame((state, delta) => {
    const frames = frameNodesRef.current;
    if (frames.length > 0) {
      // Lower target fps on low-power devices while keeping fluid wind motion
      const fps = lowPower ? 12 : 16;
      const nextFrame = Math.floor(state.clock.elapsedTime * fps) % frames.length;
      if (nextFrame !== frameIndexRef.current) {
        if (frames[frameIndexRef.current]) {
          frames[frameIndexRef.current].visible = false;
        }
        if (frames[nextFrame]) {
          frames[nextFrame].visible = true;
        }
        frameIndexRef.current = nextFrame;
      }
    }

    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.08;
      const targetX = 0.12 + state.pointer.y * 0.12;
      outerRef.current.rotation.x = THREE.MathUtils.lerp(
        outerRef.current.rotation.x,
        targetX,
        0.04
      );
    }
  });

  return (
    <group ref={outerRef} scale={1.15} rotation={[0.12, -0.5, 0]}>
      <Float speed={1.0} rotationIntensity={0.05} floatIntensity={0.14}>
        <primitive object={scene} />
        {/* Luminous Atmospheric Fresnel Rim & Lower Polar Shine */}
        <mesh scale={1.04} material={atmosphereMaterial}>
          <sphereGeometry args={[1, 48, 48]} />
        </mesh>
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
      camera={{ position: [0, 0.12, 3.65], fov: 40 }}
      gl={{
        antialias: !lowPower,
        alpha: true,
        powerPreference: lowPower ? "low-power" : "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
      }}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      <Suspense fallback={null}>
        <WindyDayGlbModel lowPower={lowPower} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </Canvas>
  );
}
