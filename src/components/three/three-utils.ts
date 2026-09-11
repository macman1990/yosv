import * as THREE from 'three';
import { BackgroundIntensity, ThreeDQuality } from '../../types/portfolio';

export interface ThreeQualitySettings {
  pixelRatio: number;
  particleCount: number;
  geometrySegments: number;
  frameRate: number;
}

export const canUseWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

export const getQualitySettings = (quality: ThreeDQuality = 'auto', intensity: BackgroundIntensity = 'subtle'): ThreeQualitySettings => {
  const isMobile = typeof navigator !== 'undefined' && (navigator.maxTouchPoints > 1 || window.innerWidth < 768);
  const lowPower = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 8) <= 4;
  const resolved = quality === 'auto' ? (isMobile || lowPower ? 'low' : 'medium') : quality;
  const intensityFactor = intensity === 'strong' ? 1.2 : intensity === 'medium' ? 1 : 0.7;

  if (resolved === 'high') {
    return { pixelRatio: Math.min(window.devicePixelRatio || 1, 1.75), particleCount: Math.round(180 * intensityFactor), geometrySegments: 48, frameRate: 60 };
  }
  if (resolved === 'low') {
    return { pixelRatio: 1, particleCount: Math.round(48 * intensityFactor), geometrySegments: 20, frameRate: 24 };
  }
  return { pixelRatio: Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5), particleCount: Math.round(100 * intensityFactor), geometrySegments: 32, frameRate: 45 };
};

export const disposeObject3D = (object: THREE.Object3D): void => {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
    materials.forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value && typeof value === 'object' && 'dispose' in value && typeof value.dispose === 'function') {
          value.dispose();
        }
      });
      material.dispose();
    });
  });
};
