
import { useEffect, useRef, useState } from 'react';
import { VideoTrack, useTracks, useLocalParticipant } from '@livekit/components-react';
import { Track, LocalParticipant } from 'livekit-client';
import { Canvas } from '@react-three/fiber';
import MicAudioVisualizer from '@/components/visualizers/MicAudioVisualizer';
import { VideoOff, User } from 'lucide-react';

interface LiveKitVideoSectionProps {
  videoEnabled: boolean;
  micEnabled: boolean;
  themeColor1: string;
  mode: 'interview' | 'playground';
  micTrackRef?: any;
  localMicAudioData?: Uint8Array | null;
  videoTrackRef?: any;
}

const LiveKitVideoSection = ({
  videoEnabled,
  micEnabled,
  themeColor1,
  mode,
  micTrackRef,
  localMicAudioData,
  videoTrackRef
}: LiveKitVideoSectionProps) => {
  const tracks = useTracks();
  const localParticipant = useLocalParticipant();
  
  // Filter local tracks
  const localTracks = tracks.filter(
    ({ participant }) => participant instanceof LocalParticipant
  );
  
  const localVideoTrack = videoTrackRef || localTracks.find(
    ({ source }) => source === Track.Source.Camera
  );

  // Debug logging
  useEffect(() => {
    if (localMicAudioData && localMicAudioData.length > 0) {
      const avgAmplitude = Array.from(localMicAudioData).reduce((sum, val) => sum + val, 0) / localMicAudioData.length;
      if (avgAmplitude > 10) {
        console.log('LiveKitVideoSection: Local mic audio data for glass sphere:', avgAmplitude);
      }
    }
  }, [localMicAudioData]);

  return (
    <div className="w-full h-full relative">
      {/* Video Display */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        {videoEnabled && localVideoTrack ? (
          <VideoTrack
            trackRef={localVideoTrack}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800/20 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <VideoOff className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Video Disabled</p>
            </div>
          </div>
        )}
      </div>

      {/* Mic Audio Visualizer Overlay - Only show when mic is enabled */}
      {micEnabled && localMicAudioData && (
        <div className="absolute bottom-4 left-4 w-40 h-40 rounded-full overflow-hidden">
          <Canvas className="w-full h-full" camera={{ position: [0, 0, 3], fov: 60 }}>
            <MicAudioVisualizer
              audioData={localMicAudioData}
            />
          </Canvas>
        </div>
      )}

      {/* User indicator when no video */}
      {!videoEnabled && (
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 rounded-full backdrop-blur-sm bg-white/20 border border-white/30 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveKitVideoSection;
