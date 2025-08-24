// src/components/visualizer/MetricDustVisualizer/MetricDustVisualizer.tsx

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { MetricDustMesh } from './MetricDustMesh';
import { useAudioData } from './hooks/useAudioData';
import { AudioVisualizerProps } from './hooks/types';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import * as THREE from 'three';

interface MetricDustVisualizerProps extends AudioVisualizerProps {
    voiceAssistantAudioTrack?: TrackReferenceOrPlaceholder;
    sphereRadius?: number;
    modelScale?: number; // This will now be the BASE size
    particleColor?: string | THREE.Color;
    rotationSpeed?: number;
    audioResponseFactor?: number;
    audioScaleFactor?: number;
    audioReductionFactor?: number;
    noiseScale?: number;
    noiseSpeed?: number;
    audioDeformationFactor?: number;
    baseDeformationAmount?: number;
    ambientLightIntensity?: number;
}

const DEFAULT_METRIC_DUST_PARAMS = {
    sphereRadius: 4,
    particleColor: '#000000',
    modelScale: 0.2,
    rotationSpeed: 0.05,
    audioResponseFactor: 7.0,
    audioScaleFactor: 2.0, // New default: models can grow up to 2x their base size with audio
    audioReductionFactor: 1.0,
    noiseScale: 1.3,
    noiseSpeed: 0.2,
    audioDeformationFactor: 1.7,
    baseDeformationAmount: 0.05,
    ambientLightIntensity: 10.5,
};

const SceneContent = (props: MetricDustVisualizerProps) => {
  const {
    micEnabled,
    voiceAssistantAudioTrack,
    rotationSpeed = DEFAULT_METRIC_DUST_PARAMS.rotationSpeed,
    audioReductionFactor = DEFAULT_METRIC_DUST_PARAMS.audioReductionFactor,
    ambientLightIntensity = DEFAULT_METRIC_DUST_PARAMS.ambientLightIntensity,
  } = props;
  
  const sphereGroupRef = useRef<THREE.Group>(null);
  const audioIntensity = useRef(0);
  const prevSmoothedAudio = useRef(0);

  const useLiveKitTrack = !!voiceAssistantAudioTrack;
  const effectiveMicEnabled = !useLiveKitTrack && micEnabled;
  const effectiveVoiceAssistantTrack = useLiveKitTrack ? voiceAssistantAudioTrack : undefined;

  const { audioData: rawFrequencyData } = useAudioData({
    micEnabled: effectiveMicEnabled,
    voiceAssistantAudioTrack: effectiveVoiceAssistantTrack,
  });

  useFrame((state, delta) => {
    let currentAudioLevel = 0;
    if (rawFrequencyData && rawFrequencyData.length > 0) {
      const bufferLength = rawFrequencyData.length;
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) { sum += rawFrequencyData[i]; }
      const avgRaw = bufferLength > 0 ? sum / bufferLength : 0;
      const normalized = (avgRaw / 255.0) * audioReductionFactor;
      currentAudioLevel = Math.pow(Math.max(0.0, Math.min(normalized, 1.0)), 2.0);
    }
    currentAudioLevel = isNaN(currentAudioLevel) ? 0 : currentAudioLevel;
    const smoothingFactor = 0.5;
    const smoothedAudio = prevSmoothedAudio.current * (1 - smoothingFactor) + currentAudioLevel * smoothingFactor;
    prevSmoothedAudio.current = smoothedAudio;
    audioIntensity.current = smoothedAudio;

    if (sphereGroupRef.current) {
        sphereGroupRef.current.rotation.y += rotationSpeed * delta;
        sphereGroupRef.current.rotation.x += rotationSpeed * 0.1 * delta;
    }
  });

  return (
    <>
      <ambientLight intensity={ambientLightIntensity} />
      <pointLight position={[0, 0, 0]} intensity={5.5} />
      <group ref={sphereGroupRef}>
        <MetricDustMesh
          {...DEFAULT_METRIC_DUST_PARAMS}
          {...props}
          audioIntensity={audioIntensity}
        />
      </group>
    </>
  );
};

const MetricDustVisualizer: React.FC<MetricDustVisualizerProps> = (props) => {
  const {
    className = '',
    width = '100%',
    height = '100%',
    sphereRadius = DEFAULT_METRIC_DUST_PARAMS.sphereRadius
  } = props;

  return (
    <div className={`metric-dust-visualizer ${className}`} style={{ width, height }}>
      <Canvas
        camera={{ position: [0, 0, sphereRadius * 6], fov: 50, near: 0.1, far: 600 }}
        gl={{ antialias: false, alpha: true }} 
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Suspense fallback={null}>
          <SceneContent {...props} />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={false} minDistance={sphereRadius * 1.5} maxDistance={sphereRadius * 8} />
        
        {/* <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer>  */}
      </Canvas>
    </div>
  );
};

export default MetricDustVisualizer;