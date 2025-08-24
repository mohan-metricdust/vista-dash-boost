import { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCommonAudioProcessor } from '@/hooks/useCommonAudioProcessor';

interface MediaPreviewProps {
  micEnabled: boolean;
  videoEnabled: boolean;
  themeColor1: string;
  themeColor2: string;
  onVideoToggle: () => void;
  onMicToggle: () => void;
  permissionsChecked: boolean;
  cameraPermissionDenied: boolean;
  microphonePermissionDenied: boolean;
  onVideoStateChange?: (isOn: boolean) => void;
  onMicStateChange?: (isOn: boolean) => void;
}

const MediaPreview = ({
  micEnabled,
  videoEnabled,
  themeColor1,
  themeColor2,
  onVideoToggle,
  onMicToggle,
  permissionsChecked,
  cameraPermissionDenied,
  microphonePermissionDenied,
  onVideoStateChange,
  onMicStateChange
}: MediaPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>('');
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>('');
  const [isVideoOn, setIsVideoOn] = useState(videoEnabled);
  const [isAudioOn, setIsAudioOn] = useState(micEnabled);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);

  // Use the common audio processor for real audio level detection
  const audioLevels = useCommonAudioProcessor(audioData);

  // Get available devices
  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        const audioInputs = devices.filter(device => device.kind === 'audioinput');
        
        setVideoDevices(videoInputs);
        setAudioDevices(audioInputs);
        
        // Set default devices - prefer front camera on mobile
        if (videoInputs.length > 0 && !selectedVideoDevice) {
          // Check if this is a mobile device
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          
          if (isMobile && videoInputs.length > 1) {
            // Try to find a front-facing camera (user camera)
            const frontCamera = videoInputs.find(device => 
              device.label.toLowerCase().includes('front') || 
              device.label.toLowerCase().includes('user') ||
              device.label.toLowerCase().includes('facing')
            );
            setSelectedVideoDevice(frontCamera?.deviceId || videoInputs[0].deviceId || 'default');
          } else {
            setSelectedVideoDevice(videoInputs[0].deviceId || 'default');
          }
        }
        if (audioInputs.length > 0 && !selectedAudioDevice) {
          setSelectedAudioDevice(audioInputs[0].deviceId || 'default');
        }
      } catch (error) {
        console.error('Error getting devices:', error);
      }
    };

    if (micEnabled || videoEnabled) {
      getDevices();
    }
  }, [micEnabled, videoEnabled, selectedVideoDevice, selectedAudioDevice]);

  // Set up video stream
  useEffect(() => {
    const setupVideoStream = async () => {
      if (videoEnabled && videoRef.current && isVideoOn) {
        try {
          // Stop existing video stream
          if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
          }

          // Create constraints with mobile device preferences
          const constraints: MediaStreamConstraints = {
            video: { 
              facingMode: 'user',
              width: { ideal: 640, max: 1280 },
              height: { ideal: 480, max: 720 }
            },
            audio: false
          };

          // Add device ID if selected
          if (selectedVideoDevice && selectedVideoDevice !== 'default') {
            (constraints.video as any).deviceId = { exact: selectedVideoDevice };
          }

          console.log('📹 Setting up video stream with constraints:', constraints);
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          
          // Check if videoRef is still valid before setting srcObject
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            console.log('📹 Video stream set successfully');
          }
          setVideoStream(stream);
        } catch (error) {
          console.error('📹 Error accessing video:', error);
          
          // Fallback with simpler constraints
          try {
            const fallbackStream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: 'user' },
              audio: false
            });
            
            if (videoRef.current) {
              videoRef.current.srcObject = fallbackStream;
              console.log('📹 Fallback video stream set successfully');
            }
            setVideoStream(fallbackStream);
          } catch (fallbackError) {
            console.error('📹 Fallback video access also failed:', fallbackError);
          }
        }
      } else if (videoRef.current) {
        videoRef.current.srcObject = null;
        if (videoStream) {
          videoStream.getTracks().forEach(track => track.stop());
          setVideoStream(null);
        }
      }
    };

    setupVideoStream();
  }, [videoEnabled, selectedVideoDevice, isVideoOn]);

  // Set up audio stream and real-time analysis with proper cleanup
  useEffect(() => {
    let isMounted = true;
    
    const setupAudioStream = async () => {
      console.log('🎤 AUDIO SETUP: Starting audio setup...', { micEnabled, isAudioOn, selectedAudioDevice });
      
      // Clean up previous setup first
      if (sourceRef.current) {
        console.log('🎤 AUDIO SETUP: Disconnecting previous source');
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      if (animationFrameRef.current) {
        console.log('🎤 AUDIO SETUP: Cancelling previous animation frame');
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        console.log('🎤 AUDIO SETUP: Closing previous audio context');
        await audioContextRef.current.close();
        audioContextRef.current = null;
      }
      
      if (micEnabled && selectedAudioDevice && isAudioOn && isMounted) {
        try {
          console.log('🎤 AUDIO SETUP: Setting up new audio stream...');
          
          // Stop existing audio stream
          if (audioStream) {
            console.log('🎤 AUDIO SETUP: Stopping existing audio stream');
            audioStream.getTracks().forEach(track => {
              console.log(`🎤 AUDIO SETUP: Stopping track - ${track.kind}, state: ${track.readyState}`);
              track.stop();
            });
          }

          const stream = await navigator.mediaDevices.getUserMedia({
            audio: { 
              deviceId: selectedAudioDevice ? { exact: selectedAudioDevice } : undefined
            },
            video: false
          });
          
          if (!isMounted) {
            console.log('🎤 AUDIO SETUP: Component unmounted, cleaning up stream');
            stream.getTracks().forEach(track => track.stop());
            return;
          }
          
          console.log('🎤 AUDIO SETUP: Audio stream obtained, setting up analysis...');
          setAudioStream(stream);

          // Set up audio analysis with fresh context
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 1024; // Higher resolution for better detection
          analyserRef.current.smoothingTimeConstant = 0.1; // Very responsive
          analyserRef.current.minDecibels = -100;
          analyserRef.current.maxDecibels = -10;

          console.log('🎤 AUDIO SETUP: Audio context and analyser created', {
            fftSize: analyserRef.current.fftSize,
            smoothingTimeConstant: analyserRef.current.smoothingTimeConstant
          });

          sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
          sourceRef.current.connect(analyserRef.current);
          console.log('🎤 AUDIO SETUP: Source connected to analyser');

          // Start analyzing audio with faster updates
          let frameCount = 0;
          const analyzeAudio = () => {
            if (!isMounted || !analyserRef.current) {
              console.log('🎤 AUDIO ANALYSIS: Stopping - component unmounted or analyser missing');
              return;
            }
            
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(dataArray);
            
            // Log audio data periodically for debugging
            frameCount++;
            if (frameCount % 60 === 0) { // Log every 60 frames (~1 second at 60fps)
              const avgLevel = Array.from(dataArray).reduce((sum, val) => sum + val, 0) / dataArray.length;
              console.log(`🎤 AUDIO ANALYSIS: Frame ${frameCount}, avg level: ${avgLevel.toFixed(2)}`);
            }
            
            // Force new array reference for React re-render
            setAudioData(prev => {
              const newData = new Uint8Array(dataArray);
              return newData;
            });
            
            animationFrameRef.current = requestAnimationFrame(analyzeAudio);
          };
          
          console.log('🎤 AUDIO SETUP: Starting audio analysis loop');
          analyzeAudio();

        } catch (error) {
          console.error('🎤 AUDIO SETUP: Error accessing audio:', error);
          setAudioData(null);
        }
      } else {
        console.log('🎤 AUDIO SETUP: Cleaning up - conditions not met', { micEnabled, isAudioOn, selectedAudioDevice });
        
        // Clean up when audio is disabled
        if (audioStream) {
          console.log('🎤 AUDIO SETUP: Stopping audio stream tracks');
          audioStream.getTracks().forEach(track => track.stop());
          setAudioStream(null);
        }
        setAudioData(null);
      }
    };

    setupAudioStream();
    
    return () => {
      console.log('🎤 AUDIO CLEANUP: Component unmounting, cleaning up...');
      isMounted = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [micEnabled, selectedAudioDevice, isAudioOn]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const refreshDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(device => device.kind === 'videoinput');
      const audioInputs = devices.filter(device => device.kind === 'audioinput');
      
      setVideoDevices(videoInputs);
      setAudioDevices(audioInputs);
    } catch (error) {
      console.error('Error refreshing devices:', error);
    }
  };

  const handleVideoToggle = () => {
    if (videoEnabled) {
      const newState = !isVideoOn;
      setIsVideoOn(newState);
      onVideoStateChange?.(newState);
    } else {
      // If permissions not granted, trigger permission request
      onVideoToggle();
    }
  };

  const handleMicToggle = () => {
    if (micEnabled) {
      const newState = !isAudioOn;
      setIsAudioOn(newState);
      onMicStateChange?.(newState);
    } else {
      // If permissions not granted, trigger permission request
      onMicToggle();
    }
  };

  // Sync local state with permission changes
  useEffect(() => {
    if (videoEnabled) {
      setIsVideoOn(true);
      onVideoStateChange?.(true);
    } else {
      setIsVideoOn(false);
      onVideoStateChange?.(false);
    }
  }, [videoEnabled]);

  useEffect(() => {
    if (micEnabled) {
      setIsAudioOn(true);
      onMicStateChange?.(true);
    } else {
      setIsAudioOn(false);
      onMicStateChange?.(false);
    }
  }, [micEnabled]);


  // Calculate real audio level from audioLevels
  const audioLevel = Math.min(Math.max(audioLevels.overall * 100, 0), 100);

  // Handle permissions denied case - only show if BOTH permissions are denied
  if (permissionsChecked && !micEnabled && !videoEnabled) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Check your audio and video devices</h3>
        
        <div className="space-y-4">
          {/* Video Preview - Both Permissions Denied State */}
          <div className="space-y-3">
            <div className="relative bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden border border-white/30" style={{ aspectRatio: '16/9' }}>
              <div className="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="text-white/80 text-center">
                  <VideoOff className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-medium">Camera and microphone permissions required</p>
                </div>
              </div>
              
              {/* Control buttons overlay - disabled state for denied permissions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                <Button
                  onClick={onVideoToggle}
                  size="lg"
                  disabled={false}
                  className="w-12 h-12 rounded-full backdrop-blur-md border border-white/20 transition-all duration-200 p-0 opacity-50 hover:opacity-80"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    minWidth: '48px',
                    minHeight: '48px'
                  }}
                >
                  <VideoOff className="w-5 h-5 text-white" />
                </Button>
                
                <Button
                  onClick={onMicToggle}
                  size="lg"
                  disabled={false}
                  className="w-12 h-12 rounded-full backdrop-blur-md border border-white/20 transition-all duration-200 p-0 opacity-50 hover:opacity-80"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    minWidth: '48px',
                    minHeight: '48px'
                  }}
                >
                  <MicOff className="w-5 h-5 text-white" />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }


  return (
    <div className="w-full">
      
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Check your audio and video devices</h3>
      
      <div className="space-y-4">
        {/* Video Preview */}
        <div className="space-y-3">
          <div className="relative bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden border border-white/30" style={{ aspectRatio: '16/9' }}>
            {(isVideoOn && videoEnabled) ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="text-white/80 text-center">
                  <VideoOff className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-medium">
                    {!videoEnabled ? 'Camera permission required' : 'Video is off'}
                  </p>
                </div>
              </div>
            )}
            
            {/* Control buttons overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
              <Button
                onClick={handleVideoToggle}
                size="lg"
                className="w-12 h-12 rounded-full backdrop-blur-md border border-white/20 transition-all duration-200 p-0"
                style={{
                  background: (isVideoOn && videoEnabled)
                    ? `linear-gradient(135deg, ${themeColor1}80, ${themeColor2}80)`
                    : 'rgba(255, 255, 255, 0.1)',
                  minWidth: '48px',
                  minHeight: '48px',
                  opacity: !videoEnabled ? 0.7 : 1
                }}
              >
                {(isVideoOn && videoEnabled) ? (
                  <Video className="w-5 h-5 text-white" />
                ) : (
                  <VideoOff className="w-5 h-5 text-white" />
                )}
              </Button>
              
              <Button
                onClick={handleMicToggle}
                size="lg"
                className="w-12 h-12 rounded-full backdrop-blur-md border border-white/20 transition-all duration-200 p-0"
                style={{
                  background: (isAudioOn && micEnabled)
                    ? `linear-gradient(135deg, ${themeColor1}80, ${themeColor2}80)`
                    : 'rgba(255, 255, 255, 0.1)',
                  minWidth: '48px',
                  minHeight: '48px',
                  opacity: !micEnabled ? 0.7 : 1
                }}
              >
                {(isAudioOn && micEnabled) ? (
                  <Mic className="w-5 h-5 text-white" />
                ) : (
                  <MicOff className="w-5 h-5 text-white" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Warning Message - Only show when one or both are disabled but permissions exist */}
        {((!isVideoOn && videoEnabled) || (!isAudioOn && micEnabled)) && (
          <div className="p-3 bg-orange-50/80 backdrop-blur-sm border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 text-orange-800">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="font-medium text-sm">
                Please turn on your{' '}
                {(!isVideoOn && videoEnabled) && (!isAudioOn && micEnabled) 
                  ? 'camera and microphone'
                  : (!isVideoOn && videoEnabled) 
                    ? 'camera' 
                    : 'microphone'
                } to continue with the interview.
              </p>
            </div>
          </div>
        )}

        {/* Device Selection - Compact layout */}
        <div className="space-y-4">
          {/* Video Devices - Show if video is enabled */}
          {videoEnabled && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4" style={{ color: themeColor1 }} />
                <span className="font-medium text-gray-800 text-sm">Video devices</span>
              </div>
              
              <Select value={selectedVideoDevice} onValueChange={setSelectedVideoDevice}>
                <SelectTrigger className="w-full h-10 backdrop-blur-md bg-white/20 border border-white/30 text-gray-800 font-medium text-sm">
                  <SelectValue placeholder="Select video device" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-white/90 border border-white/30">
                  {videoDevices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId || 'default'} className="text-gray-800 hover:bg-white/20 focus:bg-white/20 text-sm">
                      {device.label || `Camera ${device.deviceId.slice(0, 5)}...`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Audio Devices - Show if mic is enabled */}
          {micEnabled && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4" style={{ color: themeColor1 }} />
                <span className="font-medium text-gray-800 text-sm">Audio devices</span>
              </div>
              
              <Select value={selectedAudioDevice} onValueChange={setSelectedAudioDevice}>
                <SelectTrigger className="w-full h-10 backdrop-blur-md bg-white/20 border border-white/30 text-gray-800 font-medium text-sm">
                  <SelectValue placeholder="Select audio device" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-white/90 border border-white/30">
                  {audioDevices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId || 'default'} className="text-gray-800 hover:bg-white/20 focus:bg-white/20 text-sm">
                      {device.label || `Microphone ${device.deviceId.slice(0, 5)}...`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Audio Level Bar - Show when mic is enabled, always responsive */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4" style={{ color: themeColor1 }} />
                  <span className="font-medium text-gray-800 text-sm">Audio Level</span>
                </div>
                <div className="w-full h-2 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                 <div 
                    className="h-full transition-all duration-100 rounded-full"
                    style={{
                      width: `${audioLevel}%`,
                      background: `linear-gradient(90deg, ${themeColor1}, ${themeColor2})`
                    }}
                  />
                </div>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default MediaPreview;