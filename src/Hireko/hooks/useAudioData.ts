
import { useState, useEffect, useRef } from 'react';
import { useAudioAnalyzer } from './useAudioAnalyzer';
import { getTrackFromReference, setupTrackAnalyzer } from './utils/trackUtils';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';

interface UseAudioDataProps {
  micEnabled: boolean;
  voiceAssistantAudioTrack?: TrackReferenceOrPlaceholder;
  localMicTrack?: TrackReferenceOrPlaceholder;
  preferredSource?: 'voiceAssistant' | 'localMic' | 'microphone';
}

/**
 * Custom hook to handle audio data from different sources
 */
export const useAudioData = ({ 
  micEnabled, 
  voiceAssistantAudioTrack, 
  localMicTrack,
  preferredSource = 'voiceAssistant'
}: UseAudioDataProps) => {
  // State for different audio sources
  const [voiceAssistantAudioData, setVoiceAssistantAudioData] = useState<Uint8Array | null>(null);
  const [localMicAudioData, setLocalMicAudioData] = useState<Uint8Array | null>(null);
  
  // Refs for voice assistant track analyzer
  const voiceAssistantAnalyserRef = useRef<AnalyserNode | null>(null);
  const voiceAssistantAnimationFrameRef = useRef<number | null>(null);
  const voiceAssistantCleanupRef = useRef<(() => void) | null>(null);
  
  // Refs for local mic track analyzer
  const localMicAnalyserRef = useRef<AnalyserNode | null>(null);
  const localMicAnimationFrameRef = useRef<number | null>(null);
  const localMicCleanupRef = useRef<(() => void) | null>(null);
  
  // Use microphone audio data as fallback
  const { audioData: micAudioData } = useAudioAnalyzer({ micEnabled });
  
  // Set up voice assistant audio analyzer
  useEffect(() => {
    // Clean up any existing voice assistant analyzer
    if (voiceAssistantCleanupRef.current) {
      voiceAssistantCleanupRef.current();
      voiceAssistantCleanupRef.current = null;
    }
    
    if (voiceAssistantAnimationFrameRef.current) {
      cancelAnimationFrame(voiceAssistantAnimationFrameRef.current);
      voiceAssistantAnimationFrameRef.current = null;
    }
    
    // Get the actual track from the reference
    const track = voiceAssistantAudioTrack ? getTrackFromReference(voiceAssistantAudioTrack) : undefined;
    
    // If we have a valid audio track, set up analyzer
    if (track && micEnabled) {
      console.log('Setting up voice assistant audio analyzer for track:', track);
      const result = setupTrackAnalyzer(track);
      
      if (result.success && result.analyser && result.cleanup) {
        voiceAssistantAnalyserRef.current = result.analyser;
        voiceAssistantCleanupRef.current = result.cleanup;
        
        // Start analyzing the audio data
        const analyzeAudio = () => {
          if (voiceAssistantAnalyserRef.current) {
            const bufferLength = voiceAssistantAnalyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            voiceAssistantAnalyserRef.current.getByteFrequencyData(dataArray);
            
            // Update state with the new audio data
            setVoiceAssistantAudioData(new Uint8Array(dataArray));
            
            // Continue analyzing
            voiceAssistantAnimationFrameRef.current = requestAnimationFrame(analyzeAudio);
          }
        };
        
        // Start the analysis loop
        analyzeAudio();
      } else {
        console.log('Failed to setup voice assistant track analyzer');
        setVoiceAssistantAudioData(null);
      }
    } else {
      console.log('No voice assistant track available or mic disabled');
      setVoiceAssistantAudioData(null);
    }
    
    // Clean up function
    return () => {
      if (voiceAssistantCleanupRef.current) {
        voiceAssistantCleanupRef.current();
      }
      
      if (voiceAssistantAnimationFrameRef.current) {
        cancelAnimationFrame(voiceAssistantAnimationFrameRef.current);
      }
    };
  }, [voiceAssistantAudioTrack, micEnabled]);
  
  // Set up local mic audio analyzer
  useEffect(() => {
    // Clean up any existing local mic analyzer
    if (localMicCleanupRef.current) {
      localMicCleanupRef.current();
      localMicCleanupRef.current = null;
    }
    
    if (localMicAnimationFrameRef.current) {
      cancelAnimationFrame(localMicAnimationFrameRef.current);
      localMicAnimationFrameRef.current = null;
    }
    
    // Get the actual track from the reference
    const track = localMicTrack ? getTrackFromReference(localMicTrack) : undefined;
    
    // If we have a valid audio track, set up analyzer
    if (track && micEnabled) {
      console.log('Setting up local mic audio analyzer for track:', track);
      const result = setupTrackAnalyzer(track);
      
      if (result.success && result.analyser && result.cleanup) {
        localMicAnalyserRef.current = result.analyser;
        localMicCleanupRef.current = result.cleanup;
        
        // Start analyzing the audio data
        const analyzeAudio = () => {
          if (localMicAnalyserRef.current) {
            const bufferLength = localMicAnalyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            localMicAnalyserRef.current.getByteFrequencyData(dataArray);
            
            // Update state with the new audio data
            setLocalMicAudioData(new Uint8Array(dataArray));
            
            // Continue analyzing
            localMicAnimationFrameRef.current = requestAnimationFrame(analyzeAudio);
          }
        };
        
        // Start the analysis loop
        analyzeAudio();
      } else {
        console.log('Failed to setup local mic track analyzer');
        setLocalMicAudioData(null);
      }
    } else {
      console.log('No local mic track available or mic disabled');
      setLocalMicAudioData(null);
    }
    
    // Clean up function
    return () => {
      if (localMicCleanupRef.current) {
        localMicCleanupRef.current();
      }
      
      if (localMicAnimationFrameRef.current) {
        cancelAnimationFrame(localMicAnimationFrameRef.current);
      }
    };
  }, [localMicTrack, micEnabled]);
  
  // Determine which audio data to use based on preference and availability
  const getVisualizationAudioData = () => {
    switch (preferredSource) {
      case 'voiceAssistant':
        return voiceAssistantAudioData || micAudioData;
      case 'localMic':
        return localMicAudioData || micAudioData;
      case 'microphone':
        return micAudioData;
      default:
        return voiceAssistantAudioData || localMicAudioData || micAudioData;
    }
  };
  
  const visualizationAudioData = getVisualizationAudioData();
  
  return { 
    visualizationAudioData,
    voiceAssistantAudioData,
    localMicAudioData,
    micAudioData,
    hasVoiceAssistantTrack: !!voiceAssistantAudioData,
    hasLocalMicTrack: !!localMicAudioData
  };
};
