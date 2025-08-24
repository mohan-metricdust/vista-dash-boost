import { useState, useEffect, useRef } from 'react';

export interface AudioLevels {
  bass: number;
  mid: number;
  treble: number; 
  overall: number;
  peak: number;
  rms: number;
}

export interface AudioProcessorConfig {
  smoothingTimeConstant: number;
  fftSize: number;
  minDecibels: number;
  maxDecibels: number;
}

const defaultConfig: AudioProcessorConfig = {
  smoothingTimeConstant: 0.8,
  fftSize: 256,
  minDecibels: -90,
  maxDecibels: -10
};

/**
 * Common audio processor hook that works with any audio data source
 * Provides consistent audio analysis across all visualizers
 */
export const useCommonAudioProcessor = (
  audioData: Uint8Array | null,
  config: Partial<AudioProcessorConfig> = {}
) => {
  const [audioLevels, setAudioLevels] = useState<AudioLevels>({
    bass: 0,
    mid: 0,
    treble: 0,
    overall: 0,
    peak: 0,
    rms: 0
  });

  const animationFrameRef = useRef<number>();
  const lastUpdateTime = useRef(Date.now());
  const smoothedLevels = useRef<AudioLevels>({
    bass: 0,
    mid: 0,
    treble: 0,
    overall: 0,
    peak: 0,
    rms: 0
  });

  const processingConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    const processAudio = () => {
      const currentTime = Date.now();
      const deltaTime = Math.min(currentTime - lastUpdateTime.current, 100);
      lastUpdateTime.current = currentTime;

      let newLevels: AudioLevels;

      if (audioData && audioData.length > 0) {
        // Process real audio data
        newLevels = processRealAudioData(audioData);
      } else {
        // No animation when no audio data - keep everything at zero
        newLevels = {
          bass: 0,
          mid: 0,
          treble: 0,
          overall: 0,
          peak: 0,
          rms: 0
        };
      }

      // Smooth the transitions using exponential smoothing
      const smoothingFactor = Math.min(deltaTime / 50, 1); // Smooth over ~50ms
      const smoothing = 0.1 + smoothingFactor * 0.2;

      smoothedLevels.current = {
        bass: lerp(smoothedLevels.current.bass, newLevels.bass, smoothing),
        mid: lerp(smoothedLevels.current.mid, newLevels.mid, smoothing),
        treble: lerp(smoothedLevels.current.treble, newLevels.treble, smoothing),
        overall: lerp(smoothedLevels.current.overall, newLevels.overall, smoothing),
        peak: lerp(smoothedLevels.current.peak, newLevels.peak, smoothing * 0.7),
        rms: lerp(smoothedLevels.current.rms, newLevels.rms, smoothing)
      };

      setAudioLevels({ ...smoothedLevels.current });
      
      animationFrameRef.current = requestAnimationFrame(processAudio);
    };

    processAudio();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioData]);

  const processRealAudioData = (data: Uint8Array): AudioLevels => {
    const length = data.length;
    const third = Math.floor(length / 3);
    
    let bassSum = 0, midSum = 0, trebleSum = 0, overallSum = 0;
    let peak = 0, sumSquares = 0;

    // Process frequency bands
    for (let i = 0; i < third; i++) {
      const value = data[i];
      bassSum += value;
      overallSum += value;
      sumSquares += value * value;
      peak = Math.max(peak, value);
    }

    for (let i = third; i < third * 2; i++) {
      const value = data[i];
      midSum += value;
      overallSum += value;
      sumSquares += value * value;
      peak = Math.max(peak, value);
    }

    for (let i = third * 2; i < length; i++) {
      const value = data[i];
      trebleSum += value;
      overallSum += value;
      sumSquares += value * value;
      peak = Math.max(peak, value);
    }

    // Normalize values (0-1 range)
    const bass = Math.min((bassSum / third) / 255, 1);
    const mid = Math.min((midSum / third) / 255, 1);
    const treble = Math.min((trebleSum / third) / 255, 1);
    const overall = Math.min((overallSum / length) / 255, 1);
    const peakNormalized = Math.min(peak / 255, 1);
    const rms = Math.min(Math.sqrt(sumSquares / length) / 255, 1);

    // Apply some scaling to make animations more responsive
    return {
      bass: Math.pow(bass, 0.7) * 1.2,
      mid: Math.pow(mid, 0.7) * 1.2,
      treble: Math.pow(treble, 0.7) * 1.2,
      overall: Math.pow(overall, 0.7) * 1.2,
      peak: Math.pow(peakNormalized, 0.5) * 1.5,
      rms: Math.pow(rms, 0.6) * 1.3
    };
  };

  const lerp = (a: number, b: number, t: number): number => {
    return a + (b - a) * Math.min(Math.max(t, 0), 1);
  };

  return audioLevels;
};
