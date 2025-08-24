import { useState, useEffect, useRef } from 'react';
import { useAudioAnalyzer } from '@/MetricDustVisualizer/hooks/useAudioAnalyzer';
import { getTrackFromReference, setupTrackAnalyzer } from '@/MetricDustVisualizer/hooks/trackUtils';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';

interface UseAudioDataProps {
  micEnabled: boolean;
  voiceAssistantAudioTrack?: TrackReferenceOrPlaceholder;
}

export const useAudioData = ({ micEnabled, voiceAssistantAudioTrack }: UseAudioDataProps) => {
  const [liveKitAudioData, setLiveKitAudioData] = useState<Uint8Array | null>(null);
  const [useTrackInsteadOfMic, setUseTrackInsteadOfMic] = useState(false);
  
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  
  // Use microphone audio data as fallback
  const { audioData: micAudioData } = useAudioAnalyzer({
    micEnabled: micEnabled && !useTrackInsteadOfMic
  });
  
  useEffect(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    const track = voiceAssistantAudioTrack ? getTrackFromReference(voiceAssistantAudioTrack) : undefined;
    
    if (track) {
      const result = setupTrackAnalyzer(track);
      
      if (result.success && result.analyser && result.cleanup) {
        analyserRef.current = result.analyser;
        cleanupRef.current = result.cleanup;
        setUseTrackInsteadOfMic(true);
        
        const analyzeAudio = () => {
          if (analyserRef.current) {
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(dataArray);
            setLiveKitAudioData(new Uint8Array(dataArray));
            animationFrameRef.current = requestAnimationFrame(analyzeAudio);
          }
        };
        
        analyzeAudio();
      } else {
        setUseTrackInsteadOfMic(false);
      }
    } else {
      setUseTrackInsteadOfMic(false);
    }
    
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [voiceAssistantAudioTrack]);
  
  return { audioData: useTrackInsteadOfMic ? liveKitAudioData : micAudioData };
};


