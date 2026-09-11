import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BackgroundIntensity, MotionMode, ThreeDQuality } from '../../types/portfolio';
import { canUseWebGL, disposeObject3D, getQualitySettings } from './three-utils';

export type ThreeRuntimeTheme = 'cinematic' | 'liquid-glass' | 'editorial' | 'digital' | 'minimal';

export interface ThreeSceneProps {
  theme: ThreeRuntimeTheme;
  intensity: BackgroundIntensity;
  quality: ThreeDQuality;
  motion: MotionMode;
}

interface SceneConfig {
  primary: number;
  secondary: number;
  geometry: 'sphere' | 'knot' | 'icosahedron';
  wireframe: boolean;
  rotation: number;
}

const SCENE_CONFIG: Record<ThreeRuntimeTheme, SceneConfig> = {
  cinematic: { primary: 0x8ec5ff, secondary: 0xd7a46a, geometry: 'icosahedron', wireframe: true, rotation: 0.07 },
  'liquid-glass': { primary: 0x8cb4ff, secondary: 0xb497ff, geometry: 'sphere', wireframe: false, rotation: 0.045 },
  editorial: { primary: 0xd7b48c, secondary: 0xd07f55, geometry: 'knot', wireframe: false, rotation: 0.025 },
  digital: { primary: 0x1cd9d9, secondary: 0x60a5fa, geometry: 'icosahedron', wireframe: true, rotation: 0.055 },
  minimal: { primary: 0xd4a574, secondary: 0xa67c5b, geometry: 'sphere', wireframe: false, rotation: 0.012 },
};

const getGeometry = (type: SceneConfig['geometry'], segments: number): THREE.BufferGeometry => {
  if (type === 'knot') return new THREE.TorusKnotGeometry(1.05, 0.22, segments, Math.max(8, Math.round(segments / 2)));
  if (type === 'sphere') return new THREE.IcosahedronGeometry(1.05, Math.max(1, Math.round(segments / 16)));
  return new THREE.IcosahedronGeometry(1.15, Math.max(1, Math.round(segments / 16)));
};

export const ThreeScene: React.FC<ThreeSceneProps> = ({ theme, intensity, quality, motion }) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !canUseWebGL() || intensity === 'off' || motion === 'off') return;

    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let visibilityObserver: IntersectionObserver | null = null;
    let animationFrameTime = 0;
    let isVisible = true;
    let pageVisible = document.visibilityState === 'visible';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 4.6);
    const group = new THREE.Group();
    scene.add(group);

    try {
      const settings = getQualitySettings(quality, intensity);
      const config = SCENE_CONFIG[theme];
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: settings.pixelRatio > 1 });
      renderer.setPixelRatio(settings.pixelRatio);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.className = 'portfolio-3d-canvas';
      host.appendChild(renderer.domElement);

      const material = new THREE.MeshStandardMaterial({
        color: config.primary,
        emissive: config.secondary,
        emissiveIntensity: theme === 'minimal' ? 0.08 : 0.22,
        metalness: theme === 'liquid-glass' ? 0.35 : 0.7,
        roughness: theme === 'liquid-glass' ? 0.18 : 0.48,
        transparent: true,
        opacity: theme === 'minimal' ? 0.32 : intensity === 'strong' ? 0.56 : 0.42,
        wireframe: config.wireframe,
      });
      const mesh = new THREE.Mesh(getGeometry(config.geometry, settings.geometrySegments), material);
      mesh.rotation.set(0.3, -0.4, 0.1);
      group.add(mesh);

      const particlePositions = new Float32Array(settings.particleCount * 3);
      for (let index = 0; index < settings.particleCount; index += 1) {
        const angle = index * 2.39996;
        const radius = 1.4 + (index % 7) * 0.12;
        particlePositions[index * 3] = Math.cos(angle) * radius;
        particlePositions[index * 3 + 1] = Math.sin(angle * 0.73) * radius * 0.7;
        particlePositions[index * 3 + 2] = Math.sin(angle) * radius - 0.4;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({ color: config.secondary, size: theme === 'digital' ? 0.018 : 0.026, transparent: true, opacity: intensity === 'strong' ? 0.42 : 0.22, sizeAttenuation: true });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      group.add(particles);

      const keyLight = new THREE.PointLight(config.primary, theme === 'minimal' ? 1.2 : 2.2, 8);
      keyLight.position.set(2.5, 2.5, 3.5);
      const fillLight = new THREE.PointLight(config.secondary, 1.4, 7);
      fillLight.position.set(-2.5, -1.5, 2);
      scene.add(keyLight, fillLight);

      const render = (time = 0) => {
        if (disposed || !renderer || !isVisible || !pageVisible) return;
        if (time - animationFrameTime < 1000 / settings.frameRate) return;
        animationFrameTime = time;
        const movement = motion === 'reduced' ? 0.18 : 1;
        mesh.rotation.y += config.rotation * movement;
        mesh.rotation.x += config.rotation * 0.22 * movement;
        particles.rotation.y -= config.rotation * 0.35 * movement;
        renderer.render(scene, camera);
      };

      const startLoop = () => {
        if (motion === 'full' && renderer && isVisible && pageVisible) renderer.setAnimationLoop(render);
      };

      const stopLoop = () => {
        renderer?.setAnimationLoop(null);
      };

      const resize = () => {
        if (!renderer || disposed) return;
        const width = Math.max(1, host.clientWidth);
        const height = Math.max(1, host.clientHeight);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        renderer.render(scene, camera);
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      visibilityObserver = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) startLoop();
        else stopLoop();
        if (isVisible && motion === 'reduced') renderer?.render(scene, camera);
      }, { threshold: 0.05 });
      visibilityObserver.observe(host);

      const handleVisibility = () => {
        pageVisible = document.visibilityState === 'visible';
        if (pageVisible) startLoop();
        else stopLoop();
        if (pageVisible && isVisible && motion === 'reduced') renderer?.render(scene, camera);
      };
      document.addEventListener('visibilitychange', handleVisibility);
      resize();

      startLoop();
      if (motion !== 'full') renderer.render(scene, camera);

      return () => {
        disposed = true;
        document.removeEventListener('visibilitychange', handleVisibility);
        resizeObserver?.disconnect();
        visibilityObserver?.disconnect();
        renderer?.setAnimationLoop(null);
        disposeObject3D(scene);
        renderer?.dispose();
        renderer?.forceContextLoss();
        renderer?.domElement.remove();
      };
    } catch {
      disposed = true;
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      renderer?.setAnimationLoop(null);
      disposeObject3D(scene);
      renderer?.dispose();
      renderer?.forceContextLoss();
      renderer?.domElement.remove();
      return undefined;
    }
  }, [intensity, motion, quality, theme]);

  return <div ref={hostRef} className="portfolio-3d-layer" aria-hidden="true" />;
};
