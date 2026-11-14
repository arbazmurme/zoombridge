"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface AnimatedGlobeProps {
  size?: number;
  className?: string;
}

export function AnimatedGlobe({ size = 320, className = "" }: AnimatedGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group holding the globe and all orbital elements
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Slight forward/downward tilt for cinematic angle
    globeGroup.rotation.x = 0.25;
    globeGroup.rotation.z = -0.15;

    // 2. Wireframe / Dot Matrix Digital Sphere
    const sphereRadius = 54;
    const dotsCount = 480;
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
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const dotSphere = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(dotSphere);

    // 3. Inner Wireframe Latitude/Longitude Grid Lines
    const wireframeGeo = new THREE.IcosahedronGeometry(sphereRadius * 0.98, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const wireframeSphere = new THREE.Mesh(wireframeGeo, wireframeMat);
    globeGroup.add(wireframeSphere);

    // 4. Subtle Inner Glow Sphere
    const innerGeo = new THREE.SphereGeometry(sphereRadius * 0.94, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x071e3d,
      transparent: true,
      opacity: 0.65,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 5. Connecting Network Arcs / Great Circles
    const arcCount = 9;
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
      const curvePoints = curve.getPoints(24);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

      const curveMat = new THREE.LineBasicMaterial({
        color: k % 2 === 0 ? 0x00d4ff : 0x873bff,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });

      const arc = new THREE.Line(curveGeo, curveMat);
      arcLines.push(arc);
      globeGroup.add(arc);
    }

    // 6. Orbital Rings (Cyan & Purple tilted ellipses)
    // Primary Cyan Ring
    const ring1RadiusX = sphereRadius * 1.55;
    const ring1RadiusY = sphereRadius * 1.55;
    const ring1Curve = new THREE.EllipseCurve(0, 0, ring1RadiusX, ring1RadiusY, 0, 2 * Math.PI, false, 0);
    const ring1Points = ring1Curve.getPoints(80);
    const ring1Geo = new THREE.BufferGeometry().setFromPoints(
      ring1Points.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );
    const ring1Mat = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const orbitalRing1 = new THREE.Line(ring1Geo, ring1Mat);
    orbitalRing1.rotation.x = Math.PI / 2.3;
    orbitalRing1.rotation.y = 0.35;
    globeGroup.add(orbitalRing1);

    // Orbiting Cyan Satellite Bead
    const bead1Geo = new THREE.SphereGeometry(2.4, 12, 12);
    const bead1Mat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      blending: THREE.AdditiveBlending,
    });
    const bead1 = new THREE.Mesh(bead1Geo, bead1Mat);
    globeGroup.add(bead1);

    // Secondary Purple Ring
    const ring2RadiusX = sphereRadius * 1.75;
    const ring2RadiusY = sphereRadius * 1.75;
    const ring2Curve = new THREE.EllipseCurve(0, 0, ring2RadiusX, ring2RadiusY, 0, 2 * Math.PI, false, 0);
    const ring2Points = ring2Curve.getPoints(80);
    const ring2Geo = new THREE.BufferGeometry().setFromPoints(
      ring2Points.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );
    const ring2Mat = new THREE.LineBasicMaterial({
      color: 0x873bff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const orbitalRing2 = new THREE.Line(ring2Geo, ring2Mat);
    orbitalRing2.rotation.x = -Math.PI / 2.6;
    orbitalRing2.rotation.y = -0.45;
    globeGroup.add(orbitalRing2);

    // Orbiting Purple Satellite Bead
    const bead2Geo = new THREE.SphereGeometry(2.2, 12, 12);
    const bead2Mat = new THREE.MeshBasicMaterial({
      color: 0x873bff,
      blending: THREE.AdditiveBlending,
    });
    const bead2 = new THREE.Mesh(bead2Geo, bead2Mat);
    globeGroup.add(bead2);

    // 7. Surrounding Cloud of Floating Star Dust Particles
    const starCount = 180;
    const starPositions = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount; s++) {
      const radius = sphereRadius * 1.2 + Math.random() * 55;
      const theta = Math.random() * Math.PI * 2;
      const phiAngle = Math.acos(2 * Math.random() - 1);

      starPositions[s * 3] = radius * Math.sin(phiAngle) * Math.cos(theta);
      starPositions[s * 3 + 1] = radius * Math.sin(phiAngle) * Math.sin(theta);
      starPositions[s * 3 + 2] = radius * Math.cos(phiAngle);
    }
    const starGeo = new THREE.BufferGeometry();
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
      const ring2Pt = ring2Curve.getPoint((angle2 % 1 + 1) % 1);
      const ring2Vec = new THREE.Vector3(ring2Pt.x, ring2Pt.y, 0).applyEuler(orbitalRing2.rotation);
      bead2.position.copy(ring2Vec);

      // Subtle breathing pulse on dot material
      dotMaterial.size = 2.0 + Math.sin(elapsed * 2.5) * 0.35;
      dotMaterial.opacity = 0.85 + Math.sin(elapsed * 2.0) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || size;
      const newH = container.clientHeight || size;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // 10. Memory Safe Cleanup & Resource Disposal
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Dispose geometries & materials
      dotGeometry.dispose();
      dotMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      bead1Geo.dispose();
      bead1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      bead2Geo.dispose();
      bead2Mat.dispose();
      starGeo.dispose();
      starMat.dispose();

      arcLines.forEach((arc) => {
        arc.geometry.dispose();
        if (Array.isArray(arc.material)) {
          arc.material.forEach((m) => m.dispose());
        } else {
          arc.material.dispose();
        }
      });

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={`relative flex items-center justify-center pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
