
import { useState, useEffect, useRef } from 'react';

interface UseAudioAnalyzerProps {
  micEnabled: boolean;
}

export const useAudioAnalyzer = ({ micEnabled }: UseAudioAnalyzerProps) => {
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const isInitializedRef = useRef(false);
  
  useEffect(() => {
    // Create default audio data to ensure visualizer has something to display immediately
    if (!audioData && !isInitializedRef.current) {
      const defaultData = new Uint8Array(128).fill(10);
      // Add some variation to make it look natural
      for (let i = 0; i < defaultData.length; i++) {
        defaultData[i] = Math.floor(Math.random() * 30) + 5;
      }
      setAudioData(defaultData);
    }
    
    // Initialize audio context and analyzer
    const setupAudio = async () => {
      if (!micEnabled) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        
        // Stop media stream if it exists
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => track.stop());
          mediaStreamRef.current = null;
        }
        
        // Don't reset audio data, just stop updating it
        return;
      }
      
      try {
        // Initialize audio context if it doesn't exist
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        // Create analyzer node if it doesn't exist
        if (!analyserRef.current && audioContextRef.current) {
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 256;
          analyserRef.current.smoothingTimeConstant = 0.8;
        }
        
        // Get microphone stream
        if (!mediaStreamRef.current) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
          } catch (err) {
            console.error('Error accessing microphone:', err);
            // Create some fake data to make the visualizer look alive even without mic access
            const fakeDataUpdate = () => {
              const fakeData = new Uint8Array(128);
              for (let i = 0; i < fakeData.length; i++) {
                fakeData[i] = Math.floor(Math.random() * 50) + 10;
              }
              setAudioData(fakeData);
              animationFrameRef.current = requestAnimationFrame(fakeDataUpdate);
            };
            fakeDataUpdate();
            return;
          }
        }
        
        if (audioContextRef.current && analyserRef.current && mediaStreamRef.current) {
          // Only connect if not already connected
          if (!sourceRef.current) {
            sourceRef.current = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
            sourceRef.current.connect(analyserRef.current);
          }
          
          // Start analyzing audio
          analyzeAudio();
          isInitializedRef.current = true;
        }
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };
    
    const analyzeAudio = () => {
      if (!analyserRef.current) return;
      
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Create a copy of the array to ensure React detects the change
      const dataCopy = new Uint8Array(dataArray);
      setAudioData(dataCopy);
      
      // Continue analyzing
      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
    };
    
    setupAudio();
    
    return () => {
      // Clean up
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [micEnabled]);

  return { audioData };
};
