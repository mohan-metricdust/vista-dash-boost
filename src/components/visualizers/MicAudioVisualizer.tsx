import { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
// Removed Sphere import - using native Three.js geometry instead
import * as THREE from 'three';
import type { AudioLevels } from '@/hooks/useCommonAudioProcessor';

interface MicAudioVisualizerProps {
  audioLevels?: AudioLevels;
  audioData?: Uint8Array | null;
  className?: string;
}

// Function to extract audio levels from raw audio data
const extractAudioLevels = (audioData: Uint8Array): AudioLevels => {
  const length = audioData.length;
  const bassEnd = Math.floor(length * 0.25);
  const midEnd = Math.floor(length * 0.75);
  
  let bass = 0, mid = 0, treble = 0, overall = 0, peak = 0;
  
  for (let i = 0; i < length; i++) {
    const value = audioData[i] / 255;
    overall += value;
    peak = Math.max(peak, value);
    
    if (i < bassEnd) bass += value;
    else if (i < midEnd) mid += value;
    else treble += value;
  }
  
  bass /= bassEnd;
  mid /= (midEnd - bassEnd);
  treble /= (length - midEnd);
  overall /= length;
  
  return {
    bass: Math.min(bass * 2, 1), // Amplify for better visualization
    mid: Math.min(mid * 1.5, 1),
    treble: Math.min(treble * 1.8, 1),
    overall: Math.min(overall * 1.5, 1),
    peak,
    rms: overall
  };
};

const MicAudioVisualizer = ({ audioLevels, audioData, className }: MicAudioVisualizerProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Default audio levels to prevent undefined errors
  const defaultAudioLevels: AudioLevels = {
    bass: 0,
    mid: 0,
    treble: 0,
    overall: 0,
    peak: 0,
    rms: 0
  };
  
  // Extract audio levels from raw audioData if provided, otherwise use provided audioLevels
  const currentAudioLevels = useMemo(() => {
    if (audioData && audioData.length > 0) {
      return extractAudioLevels(audioData);
    }
    return audioLevels || defaultAudioLevels;
  }, [audioData, audioLevels]);
  
  // Create shader material for the main orb using useMemo to ensure proper Three.js context
  const orbMaterial = useMemo(() => {
    try {
      return new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          audioLevel: { value: 0 },
          bassLevel: { value: 0 },
          midLevel: { value: 0 },
          trebleLevel: { value: 0 }
        },
        vertexShader: `
          uniform float time;
          uniform float audioLevel;
          uniform float bassLevel;
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
            vPosition = position;
            vNormal = normal;
            
            // Create organic undulation based on audio
            vec3 pos = position;
            float noise = sin(pos.x * 3.0 + time) * sin(pos.y * 2.0 + time * 0.8) * sin(pos.z * 4.0 + time * 1.2);
            pos += normal * (audioLevel * 0.3 + bassLevel * 0.2) * (1.0 + noise * 0.5);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float audioLevel;
          uniform float bassLevel;
          uniform float midLevel;
          uniform float trebleLevel;
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
            vec3 viewDirection = normalize(cameraPosition - vPosition);
            float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.0);
            
            // Your specified color palette
            vec3 darkPurpleBase = vec3(0.121, 0.039, 0.243);    // #1F0A3E - Deep, moody base
            vec3 electricIndigo = vec3(0.290, 0.0, 0.878);      // #4A00E0 - Inner glow start
            vec3 violet = vec3(0.557, 0.176, 0.886);            // #8E2DE2 - Inner glow end
            vec3 cyan = vec3(0.0, 1.0, 1.0);                    // #00FFFF - Outer energy field
            vec3 neonMagenta = vec3(1.0, 0.0, 1.0);             // #FF00FF - Edge pulsing accent
            vec3 gradientStart = vec3(0.227, 0.0, 0.533);       // #3A0088 - Additional gradient
            vec3 gradientEnd = vec3(0.667, 0.0, 1.0);           // #AA00FF - Additional gradient
            
            // Normalized position for consistent gradients
            vec3 normalizedPos = normalize(vPosition);
            
            // Create depth layers from center to edge
            float centerDistance = length(vPosition);
            float depthGradient = smoothstep(0.0, 1.0, centerDistance);
            
            // Inner glow transition (Electric Indigo → Violet)
            vec3 innerGlow = mix(electricIndigo, violet, bassLevel * 0.7 + 0.3);
            
            // Additional gradient blend
            vec3 additionalGradient = mix(gradientStart, gradientEnd, midLevel * 0.6 + 0.4);
            
            // Base color: Dark Purple → Inner Glow based on depth
            vec3 baseColor = mix(darkPurpleBase, innerGlow, depthGradient * 0.8);
            
            // Add additional gradient influence
            baseColor = mix(baseColor, additionalGradient, 0.3 + audioLevel * 0.2);
            
            // Outer energy field (Cyan halo effect)
            float haloStrength = fresnel * (0.6 + trebleLevel * 0.4);
            vec3 outerGlow = mix(baseColor, cyan, haloStrength);
            
            // Pulsing neon magenta accents
            float pulseTime = sin(time * 4.0) * 0.5 + 0.5;
            float surfacePulse = sin(normalizedPos.x * 6.0 + time * 3.0) * 
                               cos(normalizedPos.y * 5.0 + time * 2.5) * 
                               sin(normalizedPos.z * 7.0 + time * 3.5);
            surfacePulse = abs(surfacePulse) * pulseTime;
            
            // Blend neon magenta accents on surface
            vec3 finalColor = mix(outerGlow, neonMagenta, surfacePulse * 0.4 * (0.5 + audioLevel * 0.5));
            
            // Energy waves flowing across surface
            float wave1 = sin(normalizedPos.x * 8.0 + time * 2.0) * 0.3 + 0.7;
            float wave2 = cos(normalizedPos.y * 6.0 + time * 1.8) * 0.3 + 0.7;
            float energyFlow = (wave1 * wave2) * 0.2;
            
            // Apply energy flow with cyan highlights
            finalColor = mix(finalColor, cyan, energyFlow * trebleLevel * 0.3);
            
            // Controlled brightness - maintain color integrity
            float brightness = clamp(0.8 + audioLevel * 0.7 + midLevel * 0.4, 0.6, 1.4);
            finalColor *= brightness;
            
            // Ensure colors stay vibrant and never wash out
            finalColor = clamp(finalColor, vec3(0.0), vec3(0.95));
            
            // Dynamic alpha with fresnel for ethereal effect
            float alpha = clamp(0.7 + fresnel * 0.2 + audioLevel * 0.1, 0.6, 0.9);
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.NormalBlending,
        side: THREE.DoubleSide
      });
    } catch (error) {
      console.error('Failed to create shader material:', error);
      return null;
    }
  }, []);

  // Create particles for energy field
  const particleCount = 200;
  const particlePositions = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const particleVelocities = useRef<Float32Array>(new Float32Array(particleCount * 3));
  
  useEffect(() => {
    try {
      // Initialize particle positions
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 2 + Math.random() * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        particlePositions.current[i3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions.current[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions.current[i3 + 2] = radius * Math.cos(phi);
        
        particleVelocities.current[i3] = (Math.random() - 0.5) * 0.02;
        particleVelocities.current[i3 + 1] = (Math.random() - 0.5) * 0.02;
        particleVelocities.current[i3 + 2] = (Math.random() - 0.5) * 0.02;
      }
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing particles:', error);
    }
  }, []);

  useFrame((state) => {
    try {
      if (!state?.clock) return;
      const time = state.clock.elapsedTime;
      
      // Get audio data safely from processed levels
      const currentAudioLevel = currentAudioLevels.overall;
      const bassLevel = currentAudioLevels.bass;
      const midLevel = currentAudioLevels.mid;
      const trebleLevel = currentAudioLevels.treble;
      
      // Update shader uniforms safely
      if (orbMaterial?.uniforms) {
        orbMaterial.uniforms.time.value = time;
        orbMaterial.uniforms.audioLevel.value = currentAudioLevel;
        orbMaterial.uniforms.bassLevel.value = bassLevel;
        orbMaterial.uniforms.midLevel.value = midLevel;
        orbMaterial.uniforms.trebleLevel.value = trebleLevel;
      }
      
      // Main orb breathing effect - reduced scale for smaller container
      if (meshRef.current) {
        const scale = 0.8 + currentAudioLevel * 0.2 + Math.sin(time * 2) * 0.08;
        meshRef.current.scale.setScalar(scale);
        meshRef.current.rotation.y = time * 0.3;
        meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.2;
      }
      
      
      // Inner core pulsing
      if (innerCoreRef.current) {
        const coreScale = 0.3 + currentAudioLevel * 0.7 + bassLevel * 0.3;
        innerCoreRef.current.scale.setScalar(coreScale);
        innerCoreRef.current.rotation.x = -time * 0.8;
        innerCoreRef.current.rotation.y = time * 0.6;
      }
      
      // Animate particles
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          // Update positions with audio influence
          particlePositions.current[i3] += particleVelocities.current[i3] * (1 + currentAudioLevel);
          particlePositions.current[i3 + 1] += particleVelocities.current[i3 + 1] * (1 + currentAudioLevel);
          particlePositions.current[i3 + 2] += particleVelocities.current[i3 + 2] * (1 + currentAudioLevel);
          
          // Orbital motion around center
          const angle = time * 0.5 + i * 0.1;
          const radius = 2 + Math.sin(time + i) * 0.5 + currentAudioLevel * 2;
          
          positions[i3] = particlePositions.current[i3] + Math.cos(angle) * radius * 0.1;
          positions[i3 + 1] = particlePositions.current[i3 + 1] + Math.sin(angle) * radius * 0.1;
          positions[i3 + 2] = particlePositions.current[i3 + 2] + Math.cos(time + i) * 0.3;
          
          // Keep particles within bounds
          const distance = Math.sqrt(positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2);
          if (distance > 5) {
            positions[i3] *= 0.8;
            positions[i3 + 1] *= 0.8;
            positions[i3 + 2] *= 0.8;
          }
        }
        
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        
        // Update particle material opacity based on audio
        const material = particlesRef.current.material as THREE.PointsMaterial;
        material.opacity = 0.4 + currentAudioLevel * 0.6;
      }
    } catch (error) {
      console.error('Error in MicAudioVisualizer:', error);
    }
  });

  return (
    <group>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} color="#001122" />
      
      {/* Dynamic point lights */}
      <pointLight 
        position={[2, 2, 2]} 
        intensity={0.5 + currentAudioLevels.overall * 2} 
        color="#4facfe" 
      />
      <pointLight 
        position={[-2, -2, 2]} 
        intensity={0.3 + currentAudioLevels.bass * 1.5} 
        color="#ff0080" 
      />
      <pointLight 
        position={[0, 2, -2]} 
        intensity={0.4 + currentAudioLevels.treble * 1.8} 
        color="#8040ff" 
      />
      
      {/* Main energy orb */}
      {orbMaterial && (
        <mesh ref={meshRef} material={orbMaterial}>
          <sphereGeometry args={[1, 64, 64]} />
        </mesh>
      )}
      
      
      {/* Inner core */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ff0080"
          emissiveIntensity={0.5 + currentAudioLevels.peak * 2}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Energy particles */}
      {isInitialized && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={particlePositions.current}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial 
            color="#00f2fe"
            size={0.05}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            sizeAttenuation={true}
          />
        </points>
      )}
    </group>
  );
};

export default MicAudioVisualizer;
