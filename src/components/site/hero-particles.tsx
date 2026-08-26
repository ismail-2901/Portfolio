"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!mount || reducedMotion) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorA = new THREE.Color("#4F46E5");
    const colorB = new THREE.Color("#22D3EE");
    const colorC = new THREE.Color("#34D399");

    for (let index = 0; index < particleCount; index += 1) {
      const radius = 2.7 + Math.random() * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[index * 3 + 2] = radius * Math.cos(phi);

      const mixed = index % 5 === 0 ? colorC : index % 2 === 0 ? colorA : colorB;
      colors[index * 3] = mixed.r;
      colors[index * 3 + 1] = mixed.g;
      colors[index * 3 + 2] = mixed.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = new THREE.Vector2(0, 0);
    const handlePointerMove = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      mouse.y = -(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
    };

    const handleResize = () => {
      if (!mount) {
        return;
      }
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    mount.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);

    let animationFrame = 0;
    let isVisible = true;
    const clock = new THREE.Clock();
    let lastRender = 0;

    const animate = (time: number) => {
      if (!isVisible) {
        animationFrame = 0;
        return;
      }

      if (time - lastRender < 33) {
        animationFrame = window.requestAnimationFrame(animate);
        return;
      }

      lastRender = time;
      const elapsed = clock.getElapsedTime();
      points.rotation.y = elapsed * 0.045 + mouse.x * 0.16;
      points.rotation.x = Math.sin(elapsed * 0.18) * 0.08 + mouse.y * 0.1;
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrame) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    });

    visibilityObserver.observe(mount);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      visibilityObserver.disconnect();
      mount.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-auto absolute inset-0 opacity-80" aria-hidden="true" />;
}
