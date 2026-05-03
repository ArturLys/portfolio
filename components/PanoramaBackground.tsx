"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PanoramaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      90, // FOV — Minecraft uses exactly 90°
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Load the 6 panorama faces as individual textures
    const loader = new THREE.TextureLoader();
    const faceFiles = [
      "/panorama/panorama_1.png", // right (+x) — east
      "/panorama/panorama_3.png", // left (-x) — west
      "/panorama/panorama_4.png", // top (+y) — up
      "/panorama/panorama_5.png", // bottom (-y) — down
      "/panorama/panorama_0.png", // front (+z) — south
      "/panorama/panorama_2.png", // back (-z) — north
    ];

    const materials = faceFiles.map((file) => {
      const tex = loader.load(file);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.BackSide,
      });
    });

    const skybox = new THREE.Mesh(
      new THREE.BoxGeometry(100, 100, 100),
      materials
    );
    scene.add(skybox);

    // Slight downward tilt like Minecraft and rotate 180deg to start from "behind"
    camera.rotation.x = -0.12;
    skybox.rotation.y = Math.PI;

    // Animation loop — slow Y rotation
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      skybox.rotation.y += 0.0004; // slow rotation speed
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      materials.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
    };
  }, []);

  return <canvas ref={canvasRef} id="panorama-canvas" />;
}
