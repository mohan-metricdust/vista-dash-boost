
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, VideoOff } from 'lucide-react';
import { useTracks, useLocalParticipant, TrackToggle } from '@livekit/components-react';
import { Track, LocalParticipant } from 'livekit-client';
import { Canvas } from '@react-three/fiber';
import MicAudioVisualizer from '@/components/visualizers/MicAudioVisualizer';
import InterviewVisualizerArea from '@/components/InterviewVisualizerArea';
import MobileChatPanel from './MobileChatPanel';

import { useAudioData } from '@/Hireko/hooks/useAudioData';

interface MobileInterviewLayoutProps {
  videoEnabled: boolean;
  micEnabled: boolean;
  themeColor1: string;
  onToggleVideo: () => void;
  onToggleMic: () => void;
  onEndCall: () => void;
  audioTrack: any;
  mode: 'interview' | 'playground';
  isAgentConnected: boolean;
  config?: any;
  renderID?: string;
  voiceAssistantAudioData?: Uint8Array | null;
}

const MobileInterviewLayout = ({
  videoEnabled,
  micEnabled,
  themeColor1,
  // onToggleVideo,
  onToggleMic,
  onEndCall,
  audioTrack,
  mode,
  isAgentConnected,
  config,
  renderID,
  voiceAssistantAudioData
}: MobileInterviewLayoutProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const localParticipant = useLocalParticipant();

  // Create and manage camera stream with front camera preference for mobile
  useEffect(() => {
    const createCameraStream = async () => {
      if (videoEnabled) {
        try {
          console.log('📱 Starting camera setup...');
          
          // Create basic constraints first
          const constraints: MediaStreamConstraints = {
            video: {
              facingMode: 'user',
              width: { ideal: 320, max: 640 },
              height: { ideal: 240, max: 480 }
            },
            audio: false
          };
          
          console.log('📱 Camera constraints:', constraints);
          
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          
          console.log('📱 Camera stream created successfully');
          setCameraStream(stream);
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            console.log('📱 Video element updated with stream');
          }
        } catch (error) {
          console.error('📱 Error accessing camera:', error);
          
          // Fallback to very basic constraints
          try {
            console.log('📱 Trying fallback camera constraints...');
            const fallbackStream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: false
            });
            
            console.log('📱 Fallback camera stream created');
            setCameraStream(fallbackStream);
            
            if (videoRef.current) {
              videoRef.current.srcObject = fallbackStream;
              console.log('📱 Fallback video element updated');
            }
          } catch (fallbackError) {
            console.error('📱 Fallback camera access failed:', fallbackError);
          }
        }
      } else {
        // Clean up stream when video is disabled
        if (cameraStream) {
          console.log('📱 Cleaning up camera stream');
          cameraStream.getTracks().forEach(track => track.stop());
          setCameraStream(null);
          
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        }
      }
    };

    createCameraStream();
    
    // Cleanup on unmount
    return () => {
      if (cameraStream) {
        console.log('📱 Component unmounting, cleaning up camera stream');
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoEnabled]);

  // Update video element when stream changes
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);


  // Use useTracks to get proper track references
  const tracks = useTracks();
  
  // Filter local tracks
  const localTracks = tracks.filter(
    ({ participant }) => participant instanceof LocalParticipant
  );
  
  const localVideoTrack = localTracks.find(
    ({ source }) => source === Track.Source.Camera
  );

  const localMicTrack = localTracks.find(
    ({ source }) => source === Track.Source.Microphone
  );

  // Get local mic audio data for glass sphere
  const { localMicAudioData } = useAudioData({
    micEnabled,
    localMicTrack: micEnabled ? localMicTrack : undefined,
    preferredSource: 'localMic'
  });

  const logoPath = config?.directory_search_theme.logo_path || '';
  const resolvedLogoPath = logoPath.startsWith('/') ? logoPath : `/${logoPath}`;


  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 overflow-hidden relative">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 backdrop-blur-md bg-white/10 border-b border-white/20 relative z-10 flex-shrink-0">
        {/* Empty space for balance */}
        <div className="w-6"></div>
        
        {/* Centered Logo */}
        <div className="flex-shrink-0">
        {logoPath ? (
          <img 
            src={resolvedLogoPath} 
              alt="Logo" 
              className="h-10 w-auto object-contain"
            />
          ) : (
            <div className="w-16 h-10 backdrop-blur-md bg-white/20 border border-white/30 rounded-lg flex items-center justify-center text-sm font-medium text-gray-800">
              logo
            </div>
          )}
        </div>
        
        {/* Empty space for balance - Remove screen share menu */}
        <div className="w-6"></div>
      </div>

      {/* Main Content Area - Properly constrained between header and footer */}
      <div className="flex-1 relative px-4 py-4 overflow-hidden min-h-0">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
            isAgentConnected ? 'bg-green-400' : 'bg-orange-400'
          }`}></div>
          <span className="text-xs sm:text-sm text-gray-600 font-medium sm:inline">
            {isAgentConnected ? 'Agent Connected' : 'Agent Connecting...'}
          </span>
        </div>
        
        {/* Visualizer - Constrained to available space */}
        <div className="w-full h-full relative overflow-hidden">
          <InterviewVisualizerArea 
            selectedVisualizer={renderID || "bubbleVisualizer"}
            audioData={voiceAssistantAudioData}
            micEnabled={micEnabled}
            themeColor1={themeColor1}
          />

          {/* Floating Video Panel - Use camera stream */}
          <div className="absolute bottom-24 right-0 w-32 h-24 rounded-xl overflow-hidden backdrop-blur-md bg-white/20 border border-white/30 relative pointer-events-auto z-50">
            {/* {videoEnabled && cameraStream ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800/20">
                <VideoOff className="w-6 h-6 text-gray-600" />
              </div>
            )} */}
            
            {/* Video Controls */}
            <div className="absolute top-1 right-1 flex space-x-1 pointer-events-auto z-[60]">
              <TrackToggle 
                source={Track.Source.Camera}
                className="w-5 h-5 rounded-full backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 p-0 flex items-center justify-center pointer-events-auto z-[70]"
              />
            </div>

            {/* Mic Audio Visualizer for Local Mic - Bottom left of video */}
            {micEnabled && localMicAudioData && (
              <div className="absolute bottom-1 left-1 w-30 h-30 overflow-hidden">
                <Canvas className="w-full h-full" camera={{ position: [0, 0, 2.5], fov: 75 }}>
                  <MicAudioVisualizer
                    audioData={localMicAudioData}
                  />
                </Canvas>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Footer Control Panel - Fixed at bottom with proper spacing */}
      <div className="flex items-center justify-between p-6 backdrop-blur-md bg-white/10 border-t border-white/20 flex-shrink-0 relative z-40">
        {/* Chat Button - Left */}
        <Button
          onClick={() => setIsChatOpen(true)}
          size="icon"
          className="w-12 h-12 rounded-full backdrop-blur-md bg-white/20 border-2 border-white/30 text-gray-800 hover:text-gray-900 hover:bg-white/30"
        >
          <MessageCircle className="w-5 h-5" style={{ color: themeColor1 }} />
        </Button>

        {/* Mic Button - Center */}
        <TrackToggle 
          source={Track.Source.Microphone}
          className="w-16 h-16 rounded-full backdrop-blur-md bg-white/20 border-2 border-white/30 hover:bg-white/30"
        />

        {/* End Call Button - Right */}
        <Button
          onClick={onEndCall}
          size="icon"
          className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white border-2 border-red-400"
        >
          <Phone className="w-5 h-5 transform rotate-[135deg]" />
        </Button>
      </div>

      {/* Mobile Chat Panel */}
      <MobileChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        audioTrack={audioTrack}
        themeColor1={themeColor1}
        mode={mode}
      />

    </div>
  );
};

export default MobileInterviewLayout;
