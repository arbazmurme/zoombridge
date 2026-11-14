"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { isLowEndDevice } from "@/lib/preloadHomeAssets";

interface AnimatedGlobeProps {
  size?: number;
  className?: string;
}

export function AnimatedGlobe({ size = 320, className = "" }: AnimatedGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isLowDevice = isLowEndDevice();

    // 1. Scene, Camera, Renderer with Device-Adaptive Profiling
    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isLowDevice,
      powerPreference: "high-performance",
      precision: isLowDevice ? "mediump" : "highp",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isLowDevice ? 1.0 : Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    // Group holding the globe and all orbital elements
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Slight forward/downward tilt for cinematic angle
    globeGroup.rotation.x = 0.25;
    globeGroup.rotation.z = -0.15;

    // 2. Wireframe / Dot Matrix Digital Sphere
    const sphereRadius = 54;
    const dotsCount = isLowDevice ? 200 : 380;
    const dotPositions = new Float32Array(dotsCount * 3);
    const dotColors = new Float32Array(dotsCount * 3);

    const cyanColor = new THREE.Color("#00D4FF");
    const purpleColor = new THREE.Color("#873BFF");
    const whiteColor = new THREE.Color("#FFFFFF");

    // Fibonacci sphere algorithm for even distribution of nodes
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < dotsCount; i++) {
      const y = 1 - (i / (dotsCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      dotPositions[i * 3] = x * sphereRadius;
      dotPositions[i * 3 + 1] = y * sphereRadius;
      dotPositions[i * 3 + 2] = z * sphereRadius;

      // Color variation between cyan, purple, and white
      const r = Math.random();
      const c = r > 0.6 ? cyanColor : r > 0.25 ? purpleColor : whiteColor;
      dotColors[i * 3] = c.r;
      dotColors[i * 3 + 1] = c.g;
      dotColors[i * 3 + 2] = c.b;
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute("color", new THREE.BufferAttribute(dotColors, 3));

    const dotMaterial = new THREE.PointsMaterial({
      size: isLowDevice ? 2.6 : 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const dotSphere = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(dotSphere);

    // 3. Inner Wireframe Latitude/Longitude Grid Lines
    const wireframeGeo = new THREE.IcosahedronGeometry(sphereRadius * 0.98, isLowDevice ? 1 : 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const wireframeSphere = new THREE.Mesh(wireframeGeo, wireframeMat);
    globeGroup.add(wireframeSphere);

    // 4. Subtle Inner Glow Sphere
    const innerSegments = isLowDevice ? 14 : 22;
    const innerGeo = new THREE.SphereGeometry(sphereRadius * 0.94, innerSegments, innerSegments);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x071e3d,
      transparent: true,
      opacity: 0.65,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 5. Connecting Network Arcs / Great Circles
    const arcCount = isLowDevice ? 4 : 7;
    const arcLines: THREE.Line[] = [];
    for (let k = 0; k < arcCount; k++) {
      const idxA = Math.floor(Math.random() * dotsCount);
      const idxB = Math.floor(Math.random() * dotsCount);

      const vA = new THREE.Vector3(
        dotPositions[idxA * 3],
        dotPositions[idxA * 3 + 1],
        dotPositions[idxA * 3 + 2]
      );
      const vB = new THREE.Vector3(
        dotPositions[idxB * 3],
        dotPositions[idxB * 3 + 1],
        dotPositions[idxB * 3 + 2]
      );

      // Elevated midpoint to create an arched trajectory
      const mid = new THREE.Vector3().addVectors(vA, vB).multiplyScalar(0.5);
      const distance = vA.distanceTo(vB);
      mid.normalize().multiplyScalar(sphereRadius + distance * 0.22);

      const curve = new THREE.QuadraticBezierCurve3(vA, mid, vB);
      const curvePoints = curve.getPoints(isLowDevice ? 14 : 22);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

      const curveMat = new THREE.LineBasicMaterial({
        color: k % 2 === 0 ? 0x00d4ff : 0x873bff,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(line);
      arcLines.push(line);
    }

    // 6. Dual Luminous Orbital Rings with Revolving Satellites
    const ringRadius1 = sphereRadius * 1.55;
    const ring1Curve = new THREE.EllipseCurve(0, 0, ringRadius1, ringRadius1 * 0.42, 0, 2 * Math.PI, false, 0);
    const ring1Points = ring1Curve.getPoints(isLowDevice ? 32 : 56);
    const ring1Geo = new THREE.BufferGeometry().setFromPoints(
      ring1Points.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );
    const ring1Mat = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const orbitalRing1 = new THREE.LineLoop(ring1Geo, ring1Mat);
    orbitalRing1.rotation.x = Math.PI / 3;
    orbitalRing1.rotation.y = Math.PI / 7;
    globeGroup.add(orbitalRing1);

    // Satellite Bead 1
    const bead1Geo = new THREE.SphereGeometry(2.4, isLowDevice ? 8 : 12, isLowDevice ? 8 : 12);
    const bead1Mat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      blending: THREE.AdditiveBlending,
    });
    const bead1 = new THREE.Mesh(bead1Geo, bead1Mat);
    globeGroup.add(bead1);

    // Orbital Ring 2 (Purple - counter angle)
    const ringRadius2 = sphereRadius * 1.72;
    const ring2Curve = new THREE.EllipseCurve(0, 0, ringRadius2, ringRadius2 * 0.38, 0, 2 * Math.PI, false, 0);
    const ring2Points = ring2Curve.getPoints(isLowDevice ? 32 : 56);
    const ring2Geo = new THREE.BufferGeometry().setFromPoints(
      ring2Points.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );
    const ring2Mat = new THREE.LineBasicMaterial({
      color: 0x873bff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const orbitalRing2 = new THREE.LineLoop(ring2Geo, ring2Mat);
    orbitalRing2.rotation.x = -Math.PI / 4;
    orbitalRing2.rotation.y = -Math.PI / 5;
    globeGroup.add(orbitalRing2);

    // Satellite Bead 2
    const bead2Geo = new THREE.SphereGeometry(2.2, isLowDevice ? 8 : 12, isLowDevice ? 8 : 12);
    const bead2Mat = new THREE.MeshBasicMaterial({
      color: 0x873bff,
      blending: THREE.AdditiveBlending,
    });
    const bead2 = new THREE.Mesh(bead2Geo, bead2Mat);
    globeGroup.add(bead2);

    // 7. Ambient Stardust Particles
    const starCount = isLowDevice ? 45 : 120;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount; s++) {
      const rad = sphereRadius * 1.3 + Math.random() * 50;
      const th = Math.random() * Math.PI * 2;
      const ph = (Math.random() - 0.5) * Math.PI;
      starPositions[s * 3] = Math.cos(ph) * Math.cos(th) * rad;
      starPositions[s * 3 + 1] = Math.sin(ph) * rad;
      starPositions[s * 3 + 2] = Math.cos(ph) * Math.sin(th) * rad;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.5,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    globeGroup.add(stars);

    // 8. Animation Loop with performance.now()
    let animationFrameId = 0;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Continuous sphere rotation
      globeGroup.rotation.y = elapsed * 0.28;

      // Orbiting satellites calculation
      const angle1 = elapsed * 0.85;
      const ring1Pt = ring1Curve.getPoint(angle1 % 1);
      const ring1Vec = new THREE.Vector3(ring1Pt.x, ring1Pt.y, 0).applyEuler(orbitalRing1.rotation);
      bead1.position.copy(ring1Vec);

      const angle2 = elapsed * -0.65;
      const ring2Pt = ring2Curve.getPoint(((angle2 % 1) + 1) % 1);
      const ring2Vec = new THREE.Vector3(ring2Pt.x, ring2Pt.y, 0).applyEuler(orbitalRing2.rotation);
      bead2.position.copy(ring2Vec);

      // Breathing pulse on dot material
      dotMaterial.size = (isLowDevice ? 2.6 : 2.0) + Math.sin(elapsed * 2.5) * 0.35;
      dotMaterial.opacity = 0.85 + Math.sin(elapsed * 2.0) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup and Comprehensive GPU Memory Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);

      // Dispose Geometries
      dotGeometry.dispose();
      wireframeGeo.dispose();
      innerGeo.dispose();
      ring1Geo.dispose();
      bead1Geo.dispose();
      ring2Geo.dispose();
      bead2Geo.dispose();
      starGeo.dispose();
      arcLines.forEach((l) => l.geometry.dispose());

      // Dispose Materials
      dotMaterial.dispose();
      wireframeMat.dispose();
      innerMat.dispose();
      ring1Mat.dispose();
      bead1Mat.dispose();
      ring2Mat.dispose();
      bead2Mat.dispose();
      starMat.dispose();
      arcLines.forEach((l) => (l.material as THREE.Material).dispose());

      // Dispose Renderer & Remove DOM Element
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={`relative flex items-center justify-center pointer-events-none will-change-transform ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
