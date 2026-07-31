'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroThreeScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- MATERIALS matching Neo-Brutalist Palette ---
    const darkShellMat = new THREE.MeshPhongMaterial({
      color: 0x111111,
      shininess: 100,
      specular: 0x4F8EFF,
    });

    const blueGlowMat = new THREE.MeshPhongMaterial({
      color: 0x4F8EFF,
      emissive: 0x4F8EFF,
      emissiveIntensity: 0.6,
      shininess: 90,
    });

    const yellowMat = new THREE.MeshPhongMaterial({
      color: 0xFFD54F,
      emissive: 0xFFD54F,
      emissiveIntensity: 0.5,
      shininess: 90,
    });

    const greenMat = new THREE.MeshPhongMaterial({
      color: 0x8BFFB0,
      emissive: 0x8BFFB0,
      emissiveIntensity: 0.5,
      shininess: 90,
    });

    // --- 1. CORE CYBER ANDROID HEAD ---
    const headGroup = new THREE.Group();
    mainGroup.add(headGroup);

    // Helmet Shell
    const helmetGeo = new THREE.BoxGeometry(2.1, 1.8, 1.8);
    const helmetMesh = new THREE.Mesh(helmetGeo, darkShellMat);
    headGroup.add(helmetMesh);

    // Cyber Visor Screen
    const visorGeo = new THREE.BoxGeometry(1.8, 0.85, 0.1);
    const visorMat = new THREE.MeshPhongMaterial({
      color: 0x111111,
      emissive: 0x4F8EFF,
      emissiveIntensity: 0.4,
      shininess: 100,
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.1, 0.91);
    headGroup.add(visorMesh);

    // Dual Camera Lenses (Eyes)
    const eyeGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.12, 32);
    eyeGeo.rotateX(Math.PI / 2);

    const leftEye = new THREE.Mesh(eyeGeo, yellowMat);
    leftEye.position.set(-0.48, 0.1, 0.98);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, yellowMat);
    rightEye.position.set(0.48, 0.1, 0.98);
    headGroup.add(rightEye);

    // Pupils
    const pupilGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x111111 });

    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.48, 0.1, 1.05);
    headGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0.48, 0.1, 1.05);
    headGroup.add(rightPupil);

    // Ear Modules
    const earGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.4, 32);
    earGeo.rotateZ(Math.PI / 2);

    const leftEar = new THREE.Mesh(earGeo, blueGlowMat);
    leftEar.position.set(-1.25, 0.15, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, greenMat);
    rightEar.position.set(1.25, 0.15, 0);
    headGroup.add(rightEar);

    // Top Antenna Light
    const antStemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.65, 16);
    const antStemMesh = new THREE.Mesh(antStemGeo, darkShellMat);
    antStemMesh.position.set(0, 1.25, 0);
    headGroup.add(antStemMesh);

    const antTipGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const antTipMesh = new THREE.Mesh(antTipGeo, blueGlowMat);
    antTipMesh.position.set(0, 1.55, 0);
    headGroup.add(antTipMesh);

    // --- 2. ORBITAL TELEMETRY HALO RINGS ---
    const haloGroup = new THREE.Group();
    mainGroup.add(haloGroup);

    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xFFD54F, wireframe: true });
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.03, 16, 100);
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    haloGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x4F8EFF, wireframe: true });
    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.03, 16, 100);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    haloGroup.add(ringMesh2);

    // --- LIGHTING ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.95));

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const blueRimLight = new THREE.PointLight(0x4F8EFF, 3, 25);
    blueRimLight.position.set(-6, 0, 4);
    scene.add(blueRimLight);

    const yellowRimLight = new THREE.PointLight(0xFFD54F, 3, 25);
    yellowRimLight.position.set(6, -2, 4);
    scene.add(yellowRimLight);

    camera.position.z = 6;

    // --- MOUSE CURSOR PHYSICS ---
    let mouseX = 0;
    let mouseY = 0;
    let targetHeadRotY = 0;
    let targetHeadRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseX = x;
      mouseY = y;

      targetHeadRotY = x * 0.7;
      targetHeadRotX = -y * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const animate = (time: number) => {
      const t = time * 0.001;

      // Smooth Head Tracking Lerp
      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * 0.08;
      headGroup.rotation.x += (targetHeadRotX - headGroup.rotation.x) * 0.08;

      // Floating oscillation
      mainGroup.position.y = Math.sin(t * 1.5) * 0.15;

      // Pupil offset tracking
      leftPupil.position.x = -0.48 + mouseX * 0.08;
      leftPupil.position.y = 0.1 + mouseY * 0.08;

      rightPupil.position.x = 0.48 + mouseX * 0.08;
      rightPupil.position.y = 0.1 + mouseY * 0.08;

      // Antenna tip pulse
      antTipMesh.scale.setScalar(1 + Math.sin(t * 4) * 0.15);

      // Rotate telemetry rings
      ringMesh1.rotation.z = t * 0.3;
      ringMesh2.rotation.z = -t * 0.25;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="w-full h-[440px] sm:h-[500px] border-4 border-[#111111] bg-white neo-shadow-hard relative overflow-hidden flex items-center justify-center">
      {/* Top Header Tag */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#FFD54F] border-2 border-[#111111] font-mono text-xs font-black uppercase tracking-wider neo-shadow-premium">
        3D TELEMETRY BOT
      </div>

      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
