// src/components/visualizer/MetricDustVisualizer/MetricDustMesh.tsx

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { useGLTF } from '@react-three/drei';

interface MetricDustMeshProps {
  sphereRadius: number;
  modelScale: number;
  audioScaleFactor: number; // Accept the new prop
  particleColor: string | THREE.Color;
  noiseScale: number;
  noiseSpeed: number;
  baseDeformationAmount: number;
  audioDeformationFactor: number;
  audioResponseFactor: number;
  audioIntensity: React.MutableRefObject<number>;
  count?: number;
}

const dummy = new THREE.Object3D();

export const MetricDustMesh: React.FC<MetricDustMeshProps> = ({
  sphereRadius,
  modelScale,
  audioScaleFactor, // Destructure the new prop
  particleColor,
  noiseScale,
  noiseSpeed,
  baseDeformationAmount,
  audioDeformationFactor,
  audioResponseFactor,
  audioIntensity,
  count = 2000,
}) => {
  const zeroRef = useRef<THREE.InstancedMesh>(null!);
  const oneRef = useRef<THREE.InstancedMesh>(null!);

  const { nodes: zeroNodes } = useGLTF('/models/zero.glb') as any;
  const { nodes: oneNodes } = useGLTF('/models/one.glb') as any;

  const { zeroGeometry, oneGeometry } = useMemo(() => {
    const clonedZeroGeom = zeroNodes.Number_0.geometry.clone();
    clonedZeroGeom.rotateX(Math.PI / 2);
    clonedZeroGeom.translate(0.737, 0.12, -0.482);

    const clonedOneGeom = oneNodes.Number_1.geometry.clone();
    clonedOneGeom.rotateX(Math.PI / 2);
    clonedOneGeom.rotateY(Math.PI);
    clonedOneGeom.translate(0.223, 0.092, -0.482);
    
    return {
      zeroGeometry: clonedZeroGeom,
      oneGeometry: clonedOneGeom,
    };
  }, [zeroNodes, oneNodes]);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: particleColor,
    emissive: particleColor,
    emissiveIntensity: 0,
    roughness: 0.4,
    metalness: 0.1,
  }), [particleColor]);

  const { noise, particles } = useMemo(() => {
    const noise = createNoise3D();
    const tempParticles: any[] = [];
    const baseGeometry = new THREE.IcosahedronGeometry(sphereRadius, 10);
    const basePositions = baseGeometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * (basePositions.length / 3)) * 3;
      const x = basePositions[randomIndex];
      const y = basePositions[randomIndex + 1];
      const z = basePositions[randomIndex + 2];
      
      tempParticles.push({
        position: new THREE.Vector3(x, y, z),
        originalNormal: new THREE.Vector3(x, y, z).normalize(),
        random: Math.random(),
        bitType: Math.round(Math.random()),
      });
    }
    baseGeometry.dispose();
    return { noise, particles: tempParticles };
  }, [count, sphereRadius]);

  const zeroParticles = useMemo(() => particles.filter(p => p.bitType === 0), [particles]);
  const oneParticles = useMemo(() => particles.filter(p => p.bitType === 1), [particles]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const audio = audioIntensity.current;
    
    const updateInstances = (instanceParticles: any[], ref: React.RefObject<THREE.InstancedMesh>) => {
        if (!ref.current) return;
        instanceParticles.forEach((particle, i) => {
            const { position, originalNormal, random } = particle;
            
            // --- Deformation Logic (unchanged) ---
            const noiseValue = noise(
              originalNormal.x * noiseScale + time * noiseSpeed,
              originalNormal.y * noiseScale + time * noiseSpeed,
              originalNormal.z * noiseScale + time * noiseSpeed
            );
            const displacement = baseDeformationAmount + (audio * audioDeformationFactor * (0.5 + random));
            dummy.position.copy(position).add(originalNormal.clone().multiplyScalar(noiseValue * displacement));
            dummy.lookAt(0, 0, 0);

            // --- DYNAMIC SIZE/SCALE LOGIC (UPDATED) ---
            // Calculate how much the audio should affect the scale
            const scaleEffect = audio * audioScaleFactor * (0.5 + random);
            // The final scale is the base size plus the audio-driven effect
            const finalScale = modelScale * (1.0 + scaleEffect);
            dummy.scale.set(finalScale, finalScale, finalScale);
            // --- End of Scale Logic ---

            dummy.updateMatrix();
            ref.current!.setMatrixAt(i, dummy.matrix);
        });
        ref.current.instanceMatrix.needsUpdate = true;
    };
    
    updateInstances(zeroParticles, zeroRef);
    updateInstances(oneParticles, oneRef);

    material.emissiveIntensity = audio * audioResponseFactor;
  });

  return (
    <>
      <instancedMesh ref={zeroRef} args={[zeroGeometry, material, zeroParticles.length]} />
      <instancedMesh ref={oneRef} args={[oneGeometry, material, oneParticles.length]} />
    </>
  );
};

useGLTF.preload('/models/zero.glb');
useGLTF.preload('/models/one.glb');