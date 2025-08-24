import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useThemeConfig } from '@/Hireko/hooks/useThemeConfig';
import { useInterviewData } from '@/Hireko/hooks/useInterviewData';
import { parseSettingsFromQuery } from '@/Hireko/hooks/utils/settingsUtils';

import { LiveKitRoom, RoomAudioRenderer, StartAudio, useVoiceAssistant, useRemoteParticipants, useRoomContext, useLocalParticipant, useTracks } from '@livekit/components-react';
import { Track, LocalParticipant } from 'livekit-client';
import InterviewHeader from '@/components/InterviewHeader';
import InterviewVisualizerArea from '@/components/InterviewVisualizerArea';
import LiveKitChatSection from '@/components/LiveKitChatSection';
import LiveKitVideoSection from '@/components/LiveKitVideoSection';
import MobileInterviewLayout from '@/components/MobileInterviewLayout';
import ScreenSharePrompt from '@/components/ScreenSharePrompt';
import { useIsMobile } from '@/Hireko/hooks/use-mobile';
import { useState, useEffect, useCallback } from 'react';
import { useAudioData } from '@/Hireko/hooks/useAudioData';
import '@livekit/components-styles';

const InterviewContent = () => {
  const location = useLocation();
  const { config } = useThemeConfig();
  const { interviewData } = useInterviewData();
  const navigate = useNavigate();
  const room = useRoomContext();
  const isMobile = useIsMobile();
  const [permissionsRequested, setPermissionsRequested] = useState(false);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [showScreenSharePrompt, setShowScreenSharePrompt] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [microphonePermissionGranted, setMicrophonePermissionGranted] = useState(false);
  const [agentConnected, setAgentConnected] = useState(false);
  
  const localParticipant = useLocalParticipant();

  // Get renderID and mandatory screen share from settings query parameter
  const queryParams = new URLSearchParams(location.search);
  const settings = parseSettingsFromQuery(queryParams);
  const renderID = settings.renderID;
  const mandatoryScreenShare = settings.isScreenShareMandatory;

  // Check if device supports screen sharing
  const supportsScreenShare = typeof navigator !== 'undefined' && 
    navigator.mediaDevices;


  // Debug config loading
  useEffect(() => {
    console.log('UnifiedInterviewPage - Config loaded:', config);
    console.log('UnifiedInterviewPage - Logo path:', config?.directory_search_theme?.logo_path);
    console.log('UnifiedInterviewPage - Supports screen share:', supportsScreenShare);
    console.log('UnifiedInterviewPage - Mandatory screen share:', mandatoryScreenShare);
    console.log('UnifiedInterviewPage - RenderID:', renderID);
    console.log('UnifiedInterviewPage - Settings from query:', settings);
    console.log('UnifiedInterviewPage - Raw query params:', queryParams.toString());
  }, [config, supportsScreenShare, mandatoryScreenShare, renderID, settings, queryParams]);

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

  const localScreenShareTrack = localTracks.find(
    ({ source }) => source === Track.Source.ScreenShare
  );

  // Get actual track states - check if track exists and is enabled (not muted)
  const videoTrack = localVideoTrack?.publication?.track;
  const actualVideoEnabled = videoTrack && !videoTrack.isMuted && localVideoTrack?.publication?.isEnabled;
  
  const micTrack = localMicTrack?.publication?.track;
  const actualMicEnabled = micTrack && !micTrack.isMuted && localMicTrack?.publication?.isEnabled;

  // Check screen share status
  const screenShareTrack = localScreenShareTrack?.publication?.track;
  const actualScreenShareEnabled = screenShareTrack && !screenShareTrack.isMuted && localScreenShareTrack?.publication?.isEnabled;

  console.log('Track states:', {
    videoTrack: !!videoTrack,
    videoMuted: videoTrack?.isMuted,
    videoEnabled: localVideoTrack?.publication?.isEnabled,
    actualVideoEnabled,
    micTrack: !!micTrack,
    micMuted: micTrack?.isMuted,
    micEnabled: localMicTrack?.publication?.isEnabled,
    actualMicEnabled,
    screenShareTrack: !!screenShareTrack,
    screenShareMuted: screenShareTrack?.isMuted,
    screenShareEnabled: localScreenShareTrack?.publication?.isEnabled,
    actualScreenShareEnabled,
    localVideoTrack: !!localVideoTrack,
    localVideoTrackHasPublication: !!localVideoTrack?.publication,
    supportsScreenShare
  });

  // Update screen share state
  useEffect(() => {
    setScreenShareEnabled(!!actualScreenShareEnabled);
  }, [actualScreenShareEnabled]);

  // Determine if this is playground mode
  const isPlaygroundMode = location.pathname.includes('/playground/');

  // Get LiveKit voice assistant audio track and remote participants
  const voiceAssistant = useVoiceAssistant();
  const { audioTrack } = voiceAssistant;
  const remoteParticipants = useRemoteParticipants();

  // Check if agent is connected AND has active audio track
  const isAgentConnected = remoteParticipants.length > 0 && !!audioTrack?.publication?.track;

  // Update agent connected state
  useEffect(() => {
    setAgentConnected(isAgentConnected);
  }, [isAgentConnected]);

  // Screen share prompt logic for mandatory screen share
  useEffect(() => {
    if (!mandatoryScreenShare || !supportsScreenShare || isMobile) return;
    
    // Wait for agent to connect, then show prompt if screen share not enabled
    if (agentConnected && !actualScreenShareEnabled && permissionsRequested) {
      const timer = setTimeout(() => {
        setShowScreenSharePrompt(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [mandatoryScreenShare, supportsScreenShare, isMobile, agentConnected, actualScreenShareEnabled, permissionsRequested]);

  // Hide prompt when screen share is enabled
  useEffect(() => {
    if (actualScreenShareEnabled) {
      setShowScreenSharePrompt(false);
    }
  }, [actualScreenShareEnabled]);

  // Keep screen share enabled when agent is connected and mandatory
  useEffect(() => {
    if (mandatoryScreenShare && agentConnected && !actualScreenShareEnabled && supportsScreenShare && !isMobile && permissionsRequested) {
      // Auto-retry enabling screen share if it gets disabled during mandatory mode
      const retryTimer = setTimeout(() => {
        setShowScreenSharePrompt(true);
      }, 3000);
      
      return () => clearTimeout(retryTimer);
    }
  }, [mandatoryScreenShare, agentConnected, actualScreenShareEnabled, supportsScreenShare, isMobile, permissionsRequested]);

  // Get audio data for ParticleSphere (voice assistant audio)
  const { voiceAssistantAudioData } = useAudioData({
    micEnabled: actualMicEnabled,
    voiceAssistantAudioTrack: audioTrack,
    preferredSource: 'voiceAssistant'
  });

  // Get audio data for Glass Sphere (local mic only)
  const { localMicAudioData } = useAudioData({
    micEnabled: actualMicEnabled,
    localMicTrack: actualMicEnabled ? localMicTrack : undefined,
    preferredSource: 'localMic'
  });

  // Debug: Log audio data
  useEffect(() => {
    if (voiceAssistantAudioData && voiceAssistantAudioData.length > 0) {
      const avgAmplitude = Array.from(voiceAssistantAudioData).reduce((sum, val) => sum + val, 0) / voiceAssistantAudioData.length;
      if (avgAmplitude > 10) {
        console.log('UnifiedInterviewPage: Voice assistant audio data:', avgAmplitude);
      }
    }
    if (localMicAudioData && localMicAudioData.length > 0) {
      const avgAmplitude = Array.from(localMicAudioData).reduce((sum, val) => sum + val, 0) / localMicAudioData.length;
      if (avgAmplitude > 10) {
        console.log('UnifiedInterviewPage: Local mic audio data:', avgAmplitude);
      }
    }
  }, [voiceAssistantAudioData, localMicAudioData]);

  // Request permissions on page load with separate permission handling
  useEffect(() => {
    const requestPermissions = async () => {
      if (permissionsRequested) return;
      
      try {
        console.log('Requesting media permissions individually...');
        
        // Request permissions separately to handle each independently
        let cameraPermissionGranted = false;
        let microphonePermissionGranted = false;
        
        // Try to get camera permission
        try {
          const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
          cameraPermissionGranted = true;
          setCameraPermissionGranted(true);
          videoStream.getTracks().forEach(track => track.stop());
          console.log('Camera permission granted');
        } catch (error) {
          console.log('Camera permission denied or not available:', error);
          setCameraPermissionGranted(false);
        }
        
        // Try to get microphone permission
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          microphonePermissionGranted = true;
          setMicrophonePermissionGranted(true);
          audioStream.getTracks().forEach(track => track.stop());
          console.log('Microphone permission granted');
        } catch (error) {
          console.log('Microphone permission denied or not available:', error);
          setMicrophonePermissionGranted(false);
        }
        
        // Small delay to ensure LiveKit is ready
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Enable tracks based on granted permissions
        if (microphonePermissionGranted) {
          try {
            await localParticipant.localParticipant.setMicrophoneEnabled(true);
            console.log('Microphone track enabled');
          } catch (error) {
            console.error('Error enabling microphone:', error);
          }
        }
        
        if (cameraPermissionGranted) {
          try {
            await localParticipant.localParticipant.setCameraEnabled(true);
            console.log('Camera track enabled');
          } catch (error) {
            console.error('Error enabling camera:', error);
          }
        }
        
        setPermissionsRequested(true);
        console.log('Permissions handling complete. Camera:', cameraPermissionGranted, 'Microphone:', microphonePermissionGranted);
        
      } catch (error) {
        console.error('Error requesting media permissions:', error);
        setPermissionsRequested(true);
      }
    };

    if (localParticipant.localParticipant && !permissionsRequested) {
      requestPermissions();
    }
  }, [localParticipant.localParticipant, permissionsRequested, isMobile]);

  // Block refresh and show warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = 'Your interview session will be lost if you leave this page. Are you sure?';
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    const handleUnload = () => {
      // Disable camera and other tracks before unload
      if (localParticipant.localParticipant) {
        try {
          localParticipant.localParticipant.setCameraEnabled(false);
          localParticipant.localParticipant.setMicrophoneEnabled(false);
          localParticipant.localParticipant.setScreenShareEnabled(false);
          console.log('All tracks disabled on unload');
        } catch (trackError) {
          console.error('Error disabling tracks on unload:', trackError);
        }
      }
      
      // End the call when page is being unloaded
      if (room) {
        room.disconnect();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [room, localParticipant.localParticipant]);

  if (!interviewData) {
    return null;
  }

  const themeColor1 = config?.directory_search_theme.theme_color_1 || '#3B82F6';

  // Toggle functions that actually control the tracks
  const toggleMic = async () => {
    try {
      const currentState = actualMicEnabled;
      await localParticipant.localParticipant.setMicrophoneEnabled(!currentState);
      console.log('Microphone toggled to:', !currentState);
    } catch (error) {
      console.error('Error toggling microphone:', error);
    }
  };

  const toggleVideo = async () => {
    try {
      const currentState = actualVideoEnabled;
      await localParticipant.localParticipant.setCameraEnabled(!currentState);
      console.log('Camera toggled to:', !currentState);
    } catch (error) {
      console.error('Error toggling camera:', error);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!supportsScreenShare) {
        console.warn('Screen sharing not supported on this device');
        return;
      }
      
      const currentState = actualScreenShareEnabled;
      await localParticipant.localParticipant.setScreenShareEnabled(!currentState);
      console.log('Screen share toggled to:', !currentState);
      setScreenShareEnabled(!currentState);
      if (!currentState) {
        setShowScreenSharePrompt(false); // Hide prompt if user enables screen share
      }
    } catch (error) {
      console.error('Error toggling screen share:', error);
    }
  };

  const endCall = async () => {
    try {
      console.log('Ending call...');
  
      const participant = localParticipant?.localParticipant;
  
      if (participant) {
        console.log('🔴 END CALL: Stopping LiveKit tracks...');
  
        const allPublications = [
          ...participant.videoTrackPublications.values(),
          ...participant.audioTrackPublications.values(),
        ];
  
        allPublications.forEach((pub, index) => {
          const track = pub.track;
          if (track) {
            const mediaStreamTrack = (track as any).mediaStreamTrack;
            if (mediaStreamTrack?.readyState === 'live') {
              console.log(`🔴 Stopping MediaStreamTrack ${index + 1} (${track.kind})`);
              mediaStreamTrack.stop();
            }
  
            // Stop LiveKit track
            track.stop();
  
            // Unpublish from room
            participant.unpublishTrack(track);
          }
        });
  
        // Disable device access
        await Promise.all([
          participant.setCameraEnabled(false),
          participant.setMicrophoneEnabled(false),
          participant.setScreenShareEnabled(false),
        ]);
  
        console.log('✅ All tracks unpublished, stopped, and disabled');
      }
  
      // Disconnect from room
      if (room) {
        await room.disconnect();
        console.log('✅ Disconnected from LiveKit room');
      }
  
      // Trigger cleanup of any lingering media streams
      setTimeout(() => {
        navigator.mediaDevices?.getUserMedia({ video: false, audio: false }).catch(() => {});
      }, 100);
  
    } catch (error) {
      console.error('❌ Error ending call:', error);
    }
  };
  

  // Mobile Layout
  if (isMobile) {
    return (
      <>
        <MobileInterviewLayout
          videoEnabled={actualVideoEnabled}
          micEnabled={actualMicEnabled}
          themeColor1={themeColor1}
          onToggleVideo={toggleVideo}
          onToggleMic={toggleMic}
          onEndCall={endCall}
          audioTrack={audioTrack}
          mode={isPlaygroundMode ? "playground" : "interview"}
          isAgentConnected={isAgentConnected}
          config={config}
          renderID={renderID}
          voiceAssistantAudioData={voiceAssistantAudioData}
        />

        {/* LiveKit Audio Components */}
        <RoomAudioRenderer />
        <StartAudio label="Click to enable audio playbook" />
      </>
    );
  }

  // Desktop and Tablet Layout - Responsive with orbits moved down
  return (
    <div
  className="min-vh-100 bg-gradient position-relative overflow-hidden"
  style={{
    background: "linear-gradient(135deg, #f8fafc, #eff6ff, #fff7ed)"
  }}
>
  {/* Background Orbs */}
  {/* <div className="position-fixed top-0 start-0 w-100 h-100 pointer-events-none">
    <div
      className="position-absolute top-50 end-0 translate-middle-y"
      style={{ width: "24rem", height: "24rem" }}
    >
      <div
        className="position-absolute w-100 h-100 rounded-circle"
        style={{
          background:
            "linear-gradient(135deg, rgba(147,197,253,0.2), rgba(129,140,248,0.2))",
          filter: "blur(3rem)"
        }}
      ></div>
      <div
        className="position-absolute top-0 start-0 w-100 h-100 rounded-circle m-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(96,165,250,0.3), rgba(37,99,235,0.3))",
          filter: "blur(2rem)",
          backdropFilter: "blur(4px)"
        }}
      ></div>
      <div
        className="position-absolute top-0 start-0 w-100 h-100 rounded-circle m-5 border shadow"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(219,234,254,0.3))",
          backdropFilter: "blur(8px)",
          borderColor: "rgba(255,255,255,0.2)",
          boxShadow: "0 0 40px rgba(59,130,246,0.1)"
        }}
      ></div>
      <div
        className="position-absolute top-0 start-0 w-100 h-100 rounded-circle m-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.4), transparent)",
          backdropFilter: "blur(12px)"
        }}
      ></div>
    </div>
  </div> */}

  {/* Fixed Header */}
  <div
    className="position-fixed top-0 start-0 end-0 d-flex align-items-center bg-white bg-opacity-10 backdrop-blur border-bottom border-white border-opacity-25"
    style={{ height: "4rem", zIndex: 50 }}
  >
    <InterviewHeader
      domain={interviewData.userInfo.name}
      skill={interviewData.userInfo.email}
      videoEnabled={actualVideoEnabled}
      micEnabled={actualMicEnabled}
      themeColor1={themeColor1}
      onToggleMic={toggleMic}
      onEndCall={endCall}
      mode={isPlaygroundMode ? "playground" : "interview"}
      config={config}
      screenShareEnabled={screenShareEnabled}
      onToggleScreenShare={toggleScreenShare}
    />
  </div>

  {/* Main Content */}
  <div className="container-fluid pt-5" style={{ paddingTop: "6rem" }}>
    <div className="row gx-3 gy-3 flex-lg-row">
      {/* Left Side (Visualizer) */}
      <div className="col-lg-8 col-12">
        <div className="bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-25 rounded p-3 p-sm-4" style={{ height: 'calc(100vh - 150px)' }}>
          <div className="d-flex justify-content-between mb-3">
            <span className="fs-6 fw-medium text-dark">AI Visualizer</span>
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle"
                style={{
                  width: "0.75rem",
                  height: "0.75rem",
                  backgroundColor: isAgentConnected ? "#4ade80" : "#f97316"
                }}
              ></div>
              <span className="ms-2 small text-muted">
                {isAgentConnected ? "Agent Connected" : "Agent Connecting..."}
              </span>
            </div>
          </div>
          <div style={{height:'100%'}}>
            <InterviewVisualizerArea
              selectedVisualizer={renderID || "particleSpherical"}
              audioData={voiceAssistantAudioData}
              micEnabled={actualMicEnabled}
              themeColor1={themeColor1}
            />
          </div>
        </div>
      </div>

      {/* Right Side (Chat + Video) */}
      <div className="col-lg-4 col-12 d-flex flex-column gap-3">
        {/* Chat Section */}
        <div className="flex-fill bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-25 rounded overflow-hidden">
          <div className="p-2">
            <span className="fs-6 fw-medium text-dark">Chat</span>
          </div>
          <div
  className="chat-container"
  style={{
    height: "calc(100vh - 150px)", // Fixed height relative to viewport
    width: "100%",
    maxWidth: "100%",
    overflowY: "auto", // Enable vertical scrolling
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column"
  }}
>
  <LiveKitChatSection
    audioTrack={audioTrack}
    themeColor1={themeColor1}
    mode={isPlaygroundMode ? "playground" : "interview"}
    style={{
      width: "100%",
      maxWidth: "100%",
      wordWrap: "break-word",
      whiteSpace: "normal",
      flex: 1,
      overflow: "hidden"
    }}
  />
</div>

        </div>

        {/* Video Section */}
      </div>
    </div>
  </div>

  {/* LiveKit Audio Components */}
  <RoomAudioRenderer />
  <StartAudio label="Click to enable audio playbook" />
</div>


  );
};

const UnifiedInterviewPage = () => {
  // const { config, loading: themeLoading } = useThemeConfig();
  const { interviewData, decodingError } = useInterviewData();

  if (!interviewData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
        {/* Background Orbs - Moved down below header */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-48 right-20 w-96 h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-indigo-400/20 rounded-full blur-3xl"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-full blur-2xl backdrop-blur-sm"></div>
            <div className="absolute inset-8 bg-gradient-to-br from-white/20 to-blue-100/30 rounded-full backdrop-blur-md border border-white/20 shadow-2xl shadow-blue-500/10"></div>
            <div className="absolute inset-16 bg-gradient-to-br from-white/40 to-transparent rounded-full backdrop-blur-lg"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div 
            className="animate-spin rounded-full h-32 w-32 border-b-2"
            style={{ borderColor: '#3B82F6' }}
          ></div>
        </div>
      </div>
    );
  }

  if (decodingError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
        {/* Background Orbs - Moved down below header */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-48 right-20 w-96 h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-indigo-400/20 rounded-full blur-3xl"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-full blur-2xl backdrop-blur-sm"></div>
            <div className="absolute inset-8 bg-gradient-to-br from-white/20 to-blue-100/30 rounded-full backdrop-blur-md border border-white/20 shadow-2xl shadow-blue-500/10"></div>
            <div className="absolute inset-16 bg-gradient-to-br from-white/40 to-transparent rounded-full backdrop-blur-lg"></div>
          </div>
        </div>
        
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
          <div className="text-center backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl">
            <h1 className="text-2xl font-medium text-red-500 mb-4">Error</h1>
            <p className="text-gray-800">{decodingError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      serverUrl={interviewData.LIVEKIT_URL}
      token={interviewData.token}
      connect={true}
      audio={true}
      video={false}
      onConnected={() => {
        console.log('Connected to LiveKit room');
      }}
      onDisconnected={() => {
        console.log('Disconnected from LiveKit room');
      }}
    >
      <InterviewContent />
    </LiveKitRoom>
  );
};

export default UnifiedInterviewPage;