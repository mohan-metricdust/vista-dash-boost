// src/components/visualizer/MetricDustVisualizer/InstancedDigitModels.tsx

import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// GLSL code for deformation remains the same.
const vertexShaderCode = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) { const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0); vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx); vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g; vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy); vec3 x1 = x0 - i1 + C.xxx; vec3 x2 = x0 - i2 + C.yyy; vec3 x3 = x0 - D.yyy; i = mod289(i); vec4 p = permute(permute(permute( i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0)); float n_ = 0.142857142857; vec3 ns = n_ * D.wyz - D.xzx; vec4 j = p - 49.0 * floor(p * ns.z * ns.z); vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_); vec4 x = x_ * ns.x + ns.yyyy; vec4 y = y_ * ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y); vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw); vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0)); vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww; vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w); vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3))); p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w; vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m * m; return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3))); }
`;

interface InstancedDigitModelsProps {
  uniforms: { [uniform: string]: THREE.IUniform };
  sphereRadius?: number;
  count?: number;
  modelScale?: number;
}

const dummy = new THREE.Object3D();
const rotationQuaternion = new THREE.Quaternion();

export const InstancedDigitModels: React.FC<InstancedDigitModelsProps> = ({
  uniforms,
  sphereRadius = 4,
  count = 1000,
  modelScale = 0.5,
}) => {
  const zeroMeshRef = useRef<THREE.InstancedMesh>(null!);
  const oneMeshRef = useRef<THREE.InstancedMesh>(null!);

  const { nodes: zeroNodes } = useGLTF('./models/zero.glb');
  const { nodes: oneNodes } = useGLTF('./models/one.glb');

  const zeroGeometry = useMemo(() => (zeroNodes.Number_0 as THREE.Mesh).geometry, [zeroNodes]);
  const oneGeometry = useMemo(() => (oneNodes.Number_1 as THREE.Mesh).geometry, [oneNodes]);
  
  const countPerModel = Math.floor(count / 2);

  const initialPositions = useMemo(() => {
    const positions = [];
    const baseGeometry = new THREE.IcosahedronGeometry(sphereRadius, 15);
    const basePositions = baseGeometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * (basePositions.length / 3)) * 3;
        positions.push(new THREE.Vector3(
          basePositions[randomIndex],
          basePositions[randomIndex + 1],
          basePositions[randomIndex + 2]
        ));
    }
    baseGeometry.dispose();
    return positions;
  }, [count, sphereRadius]);

  useFrame(() => {
    if (!zeroMeshRef.current || !oneMeshRef.current) return;
    
    const baseScale = modelScale;

    for (let i = 0; i < countPerModel; i++) {
      const setupInstance = (instanceIndex: number) => {
        dummy.position.copy(initialPositions[instanceIndex]);
        dummy.lookAt(0, 0, 0);

        // This method for rotation is more stable than `rotateOnAxis` in a loop
        const rotationAxis = initialPositions[instanceIndex].clone().normalize();
        rotationQuaternion.setFromAxisAngle(rotationAxis, Math.PI / 2);
        dummy.quaternion.multiply(rotationQuaternion);

        dummy.scale.set(baseScale, baseScale, baseScale);
        dummy.updateMatrix();
      };

      setupInstance(i);
      zeroMeshRef.current.setMatrixAt(i, dummy.matrix);

      setupInstance(i + countPerModel);
      oneMeshRef.current.setMatrixAt(i, dummy.matrix);
    }
    zeroMeshRef.current.instanceMatrix.needsUpdate = true;
    oneMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={zeroMeshRef} args={[zeroGeometry, undefined, countPerModel]}>
        <meshStandardMaterial
          color={uniforms.uParticleColor.value}
          onBeforeCompile={(shader) => {
            shader.uniforms = { ...shader.uniforms, ...uniforms };
            shader.vertexShader = `
              uniform float uTime;
              uniform float uNoiseScale;
              uniform float uNoiseSpeed;
              uniform float uDeformationAmount;
              uniform float uAudioIntensity;
              uniform float uAudioDeformationFactor;
              ${vertexShaderCode}
              ${shader.vertexShader}
            `;
            shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
                #include <begin_vertex>
                vec3 pos = position;
                vec3 normal = normalize(pos);
                float noise = snoise(normal * uNoiseScale + uTime * uNoiseSpeed);
                float displacement = uDeformationAmount + (uAudioIntensity * uAudioDeformationFactor);
                transformed += normal * noise * displacement;
            `);
          }}
        />
      </instancedMesh>
      <instancedMesh ref={oneMeshRef} args={[oneGeometry, undefined, countPerModel]}>
        <meshStandardMaterial
          color={uniforms.uParticleColor.value}
          onBeforeCompile={(shader) => {
            shader.uniforms = { ...shader.uniforms, ...uniforms };
            shader.vertexShader = `
              uniform float uTime;
              uniform float uNoiseScale;
              uniform float uNoiseSpeed;
              uniform float uDeformationAmount;
              uniform float uAudioIntensity;
              uniform float uAudioDeformationFactor;
              ${vertexShaderCode}
              ${shader.vertexShader}
            `;
            shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
                #include <begin_vertex>
                vec3 pos = position;
                vec3 normal = normalize(pos);
                float noise = snoise(normal * uNoiseScale + uTime * uNoiseSpeed);
                float displacement = uDeformationAmount + (uAudioIntensity * uAudioDeformationFactor);
                transformed += normal * noise * displacement;
            `);
          }}
        />
      </instancedMesh>
    </>
  );
};

useGLTF.preload('./models/zero.glb');
useGLTF.preload('./models/one.glb');