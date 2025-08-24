import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, ArrowRight } from 'lucide-react';
import { useThemeConfig } from '@/Hireko/hooks/useThemeConfig';
import { useIsMobile } from '@/Hireko/hooks/use-mobile';
import { motion } from 'framer-motion';
import { getAnonymousInterviewToken, getInterviewToken, getUserToken, InterviewTokenError } from '@/services/interviewService';
import { toast } from 'sonner';
import MediaPreview from '@/components/visualizers/MediaPreview';
import { parseSettingsFromQuery, encodeSettingsToQuery } from '@/Hireko/hooks/utils/settingsUtils';

const TermsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { config, loading } = useThemeConfig();
  const isMobile = useIsMobile();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [permissionsChecked, setPermissionsChecked] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
  const [microphonePermissionDenied, setMicrophonePermissionDenied] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  // Get parameters from URL and query params
  const userInfo = params.userInfo;
  const jobId = params.jobId;
  const userSessionID = params.userSessionID;
  
  // Parse settings from query parameters
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const settings = useMemo(() => parseSettingsFromQuery(searchParams), [searchParams]);
  
  // Use settings renderID
  const finalRenderID = settings.renderID;

  // Set CSS custom properties for the gradient
  useEffect(() => {
    if (config) {
      const themeColor1 = config.directory_search_theme.theme_color_1;
      const themeColor2 = config.directory_search_theme.theme_color_2;
      document.documentElement.style.setProperty('--theme-color-1', themeColor1);
      document.documentElement.style.setProperty('--theme-color-2', themeColor2);
    }
  }, [config]);

  // Check permissions on mount (don't request automatically)
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        // Check permission state without requesting
        const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
        const microphonePermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        
        console.log('Initial permission states:', {
          camera: cameraPermission.state,
          microphone: microphonePermission.state
        });
        
        // Check camera permissions
        if (cameraPermission.state === 'granted') {
          setVideoEnabled(true);
          console.log('Camera permission already granted');
        } else if (cameraPermission.state === 'denied') {
          setCameraPermissionDenied(true);
        }
        
        // Check microphone permissions
        if (microphonePermission.state === 'granted') {
          setMicEnabled(true);
          console.log('Microphone permission already granted');
        } else if (microphonePermission.state === 'denied') {
          setMicrophonePermissionDenied(true);
        }
        
        // If both permissions are already granted, get the media stream
        if (cameraPermission.state === 'granted' && microphonePermission.state === 'granted') {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          setMediaStream(stream);
          console.log('Both permissions already granted, showing preview');
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
      } finally {
        setPermissionsChecked(true);
      }
    };

    checkPermissions();
  }, []);

  // Function to request camera permission
  const handleRequestCameraPermissions = async () => {
    try {
      const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
      
      if (cameraPermission.state === 'denied') {
        toast.error('Please enable camera permissions in your browser settings and refresh the page.');
        return;
      }
      
      if (cameraPermission.state === 'prompt' || cameraPermission.state === 'granted') {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoEnabled(true);
        setCameraPermissionDenied(false);
        
        // Stop the stream since we only needed it to get permission
        stream.getTracks().forEach(track => track.stop());
        
        toast.success('Camera permission granted!');
      }
    } catch (error: any) {
      console.error('Camera permission denied:', error);
      if (error.name === 'NotAllowedError') {
        toast.error('Camera permission denied. Please try again or enable in browser settings.');
        setCameraPermissionDenied(true);
      } else {
        toast.error('Unable to access camera. Please check your device and try again.');
      }
    }
  };

  // Function to request microphone permission
  const handleRequestMicrophonePermissions = async () => {
    try {
      const microphonePermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      
      if (microphonePermission.state === 'denied') {
        toast.error('Please enable microphone permissions in your browser settings and refresh the page.');
        return;
      }
      
      if (microphonePermission.state === 'prompt' || microphonePermission.state === 'granted') {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicEnabled(true);
        setMicrophonePermissionDenied(false);
        
        // Stop the stream since we only needed it to get permission
        stream.getTracks().forEach(track => track.stop());
        
        toast.success('Microphone permission granted!');
      }
    } catch (error: any) {
      console.error('Microphone permission denied:', error);
      if (error.name === 'NotAllowedError') {
        toast.error('Microphone permission denied. Please try again or enable in browser settings.');
        setMicrophonePermissionDenied(true);
      } else {
        toast.error('Unable to access microphone. Please check your device and try again.');
      }
    }
  };

  // Clean up media stream on unmount
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaStream]);

  const themeColor1 = config?.directory_search_theme.theme_color_1 || '#3B82F6';
  const themeColor2 = config?.directory_search_theme.theme_color_2 || '#10B981';

  // Create dynamic gradient orb styles
  const dynamicOrbStyle1 = {
    background: `linear-gradient(135deg, ${themeColor1}20, ${themeColor1}40)`
  };
  
  const dynamicOrbStyle2 = {
    background: `linear-gradient(135deg, ${themeColor2}20, ${themeColor2}40)`
  };

  const handleVideoToggle = () => {
    // If video permission is not granted, request it
    if (!videoEnabled) {
      handleRequestCameraPermissions();
      return;
    }
    // Otherwise, just toggle the UI state
    setIsVideoOn(!isVideoOn);
  };

  const handleMicToggle = () => {
    // If microphone permission is not granted, request it
    if (!micEnabled) {
      handleRequestMicrophonePermissions();
      return;
    }
    // Otherwise, just toggle the UI state
    setIsAudioOn(!isAudioOn);
  };

  // Enhanced mobile detection function
  const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Check for mobile user agents
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    const isMobileUA = mobileRegex.test(userAgent);
    
    // Check for touch capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check screen size
    const isSmallScreen = window.innerWidth <= 768 || window.screen.width <= 768;
    
    // Check for specific mobile platforms
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    
    console.log('📱 Mobile Detection:', {
      userAgent,
      isMobileUA,
      isTouchDevice,
      isSmallScreen,
      isIOS,
      isAndroid,
      hookIsMobile: isMobile,
      finalDecision: isMobileUA || (isTouchDevice && isSmallScreen)
    });
    
    return isMobileUA || (isTouchDevice && isSmallScreen) || isIOS || isAndroid;
  };

  const handleContinueToInterview = async () => {
    // Check if screen share is mandatory and user is on mobile device
    const isOnMobileDevice = isMobileDevice();
    
    if (settings.isScreenShareMandatory && isOnMobileDevice) {
      console.log('📱 Showing mobile warning - Screen share mandatory on mobile device');
      setShowMobileWarning(true);
      return;
    }

    // Check if both mic and video are on and enabled
    if (isAgreed && micEnabled && videoEnabled && isVideoOn && isAudioOn) {
      setIsProcessing(true);
      
      const maxRetries = 3;
      let retryCount = 0;
      
      // Helper function to handle API response and navigation 
      const handleInterviewResponse = (response: any) => {
        let token, livekit_url;
        
        // Handle different response formats
        if (userSessionID) {
          // getUserToken returns same format as getAnonymousInterviewToken
          token = response.token;
          livekit_url = response.livekit_url;
        } else {
          // Handle jobId flow responses
          const entryPoint = sessionStorage.getItem('entryPoint');
          const isAnonymousEntry = entryPoint === 'anonymousInterview';
          
          if (isAnonymousEntry) {
            // getAnonymousInterviewToken returns data directly
            token = response.token;
            livekit_url = response.livekit_url;
          
          } else {
            // getInterviewToken returns data nested under session_data
            token = response.session_data?.token;
            livekit_url = response.session_data?.livekit_url;
           
          }
        }

        const encodedCode = btoa(JSON.stringify({
          token,
          livekit_url,
         }));

        // Clean up sessionStorage if jobId flow
        if (!userSessionID) {
          sessionStorage.removeItem('entryPoint');
        }

        // Navigate to final URL with encoded settings
        const originalSettingsParam = searchParams.get('settings');
        
        console.log('📍 TERMS PAGE: Navigating to interview page...', {
          credentials: encodedCode.substring(0, 50) + '...',
          settings: originalSettingsParam?.substring(0, 50) + '...'
        });
        
        // Use replace: true to prevent going back to terms page
        // navigate(`/interview/definedUser?credentials=${encodedCode}&settings=${originalSettingsParam}`, { replace: true });
        
        console.log('📍 TERMS PAGE: Navigation completed');
        return response;
      };

      const attemptApiCall = async (): Promise<any> => {
        try {
        console.log('Terms page URL parameters:', { jobId, userInfo, userSessionID, renderID: finalRenderID });
        
        // Check if this is a userSessionID flow or traditional jobId flow
        if (userSessionID) {
          // This is the defined user flow with userSessionID
          if (!userSessionID || !finalRenderID) {
            console.error('Missing required URL parameters for userSessionID flow');
            toast.error('Missing required information');
            setIsProcessing(false);
            return;
          }

          // Make API call for userSessionID flow
          if (config && userSessionID) {
            console.log('Making getUserToken API call with userSessionID:', userSessionID, 'Attempt:', retryCount + 1);

            const response = await getUserToken({
              userSessionID: userSessionID,
              config
            });

            // Handle response and navigate using common logic
            return handleInterviewResponse(response);
          } else {
            console.log('Missing required data for userSessionID API call');
            throw new Error('Missing configuration or userSessionID');
          }
        } else {
          // This is the traditional jobId flow
          if (!userInfo || !jobId || !finalRenderID) {
            console.error('Missing required URL parameters for jobId flow');
            toast.error('Missing required information');
            setIsProcessing(false);
            return;
          }

          // Decode userInfo to get user info
          let userInfoData = null;
          try {
            const decodedUserInfo = JSON.parse(atob(userInfo));
            userInfoData = {
              name: decodedUserInfo.name || '',
              email: decodedUserInfo.email || '',
              phone: decodedUserInfo.phone || '',
              userAlias: decodedUserInfo.email || '',
              userAliasType: 'email'
            };
            console.log('Decoded user info from userInfo:', userInfoData);
          } catch (error) {
            console.error('Error decoding userInfo:', error);
            toast.error('Invalid user information');
            setIsProcessing(false);
            return;
          }

          // Check entry point from session storage to decide which API to use
          const entryPoint = sessionStorage.getItem('entryPoint');
          const isAnonymousSessionEntry = entryPoint === 'anonymousInterviewSession';
          const isAnonymousEntry = entryPoint === 'anonymousInterview';
          
          console.log('Entry point for API decision:', entryPoint);

          // Make API call if we have all required data
          if (userInfoData && config && jobId) {
            console.log('Making API call with jobId:', jobId, 'Attempt:', retryCount + 1);
            console.log('Entry point:', entryPoint);
            console.log('Using getInterviewToken:', isAnonymousSessionEntry);

            let response;
            if (isAnonymousSessionEntry) {
              // Use getInterviewToken for anonymousInterviewSession entry point
              console.log('Using getInterviewToken for anonymousInterviewSession entry point');
              response = await getInterviewToken({
                jobId: jobId,
                userInfo: userInfoData,
                config
              });
            } else if (isAnonymousEntry) {
              // Use getAnonymousInterviewToken for other entry points
              console.log('Using getAnonymousInterviewToken for regular anonymous entry point');
              response = await getAnonymousInterviewToken({
                jobId: jobId,
                userInfo: userInfoData,
                config
              });
            }
            else {
              console.log('Using getInterviewToken for anonymousInterviewSession entry point because no entrypoint');
              response = await getInterviewToken({
                jobId: jobId,
                userInfo: userInfoData,
                config
              });
            }

            // Handle response and navigate using common logic
            return handleInterviewResponse(response);
          } else {
            console.log('Missing required data for API call');
            throw new Error('Missing configuration or user data');
          }
        }
        } catch (error) {
          retryCount++;
          console.error(`API call attempt ${retryCount} failed:`, error);
          
          // Check if it's a job ID error - no retries needed
          if (error instanceof InterviewTokenError && error.isJobIdError) {
            throw error;
          }
          
          if (retryCount >= maxRetries) {
            // Final attempt failed, throw the error
            throw error;
          }
          
          // Wait before retry (exponential backoff)
          const delay = Math.pow(2, retryCount - 1) * 1000; // 1s, 2s, 4s
          console.log(`Retrying in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries})`);
          
          await new Promise(resolve => setTimeout(resolve, delay));
          return attemptApiCall(); // Recursive retry
        }
      };

      try {
        await attemptApiCall();
      } catch (error) {
        console.error('All API attempts failed:', error);
        
        // Handle InterviewTokenError specifically
        if (error instanceof InterviewTokenError) {
          toast.error(error.message);
        } else {
          toast.error('Something went wrong. Try again after sometime or contact the administrator');
        }
      } finally {
        setIsProcessing(false);
      }
    } else {
      toast.error('Please ensure both video and microphone are active to continue.');
    }
  };

  // Check if all requirements are met - both permissions AND devices must be active
  const canContinue = isAgreed && micEnabled && videoEnabled && isVideoOn && isAudioOn;

  if (loading || !permissionsChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center minimal-glassmorphic-background">
        <div className="minimal-gradient-orbs">
          <div className="gradient-orb orb-blue"></div>
          <div className="gradient-orb orb-orange"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="minimal-glass-loading h-32 w-32 mx-auto mb-4"></div>
          <p className="minimal-glass-text-light">Loading configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Background orbs positioned relative to card - Hidden on mobile for better performance */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {/* Primary Orb - adjusted for responsive */}
        <div className="absolute -top-16 sm:-top-24 -right-16 sm:-right-32 w-64 sm:w-96 h-64 sm:h-96">
          <div className="absolute inset-0 rounded-full blur-3xl" style={dynamicOrbStyle1}></div>
          <div className="absolute inset-4 rounded-full blur-2xl backdrop-blur-sm" style={{...dynamicOrbStyle1, opacity: 0.6}}></div>
          <div className="absolute inset-8 bg-gradient-to-br from-white/20 to-blue-100/30 rounded-full backdrop-blur-md border border-white/20 shadow-2xl shadow-blue-500/10"></div>
          <div className="absolute inset-16 bg-gradient-to-br from-white/40 to-transparent rounded-full backdrop-blur-lg"></div>
        </div>
        
        {/* Secondary Orb - adjusted for responsive */}
        <div className="absolute -bottom-8 sm:-bottom-16 -left-8 sm:-left-16 w-48 sm:w-64 h-48 sm:h-64">
          <div className="absolute inset-0 rounded-full blur-3xl" style={dynamicOrbStyle2}></div>
          <div className="absolute inset-6 rounded-full blur-2xl backdrop-blur-sm" style={{...dynamicOrbStyle2, opacity: 0.6}}></div>
          <div className="absolute inset-8 bg-gradient-to-tr from-white/15 to-orange-100/25 rounded-full backdrop-blur-md border border-white/15 shadow-xl shadow-orange-500/5"></div>
          <div className="absolute inset-12 bg-gradient-to-tr from-white/30 to-transparent rounded-full backdrop-blur-lg"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col p-4 pt-24 pb-8 lg:h-screen">
        <div className="w-full max-w-7xl mx-auto relative flex-1 flex flex-col min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col min-h-0"
          >
            {isProcessing ? (
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl flex-1 flex items-center justify-center">
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center">
                    <div 
                      className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-b-2 mx-auto mb-4"
                      style={{ 
                        borderColor: config?.directory_search_theme.theme_color_1 || '#3B82F6' 
                      }}
                    ></div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Setting up Interview</h2>
                    <p className="text-sm sm:text-base text-gray-600">Please wait while we prepare your session...</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Desktop Layout */}
                <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl max-w-5xl mx-auto flex-1 flex-col min-h-0 hidden lg:flex">
                  <CardHeader className="text-center px-4 sm:px-6 pt-6 pb-4 flex-shrink-0">
                    <CardTitle className="text-xl sm:text-2xl font-light text-gray-800">
                      <span 
                        className="text-transparent bg-clip-text font-normal"
                        style={{
                          background: config 
                            ? `linear-gradient(135deg, ${config.directory_search_theme.theme_color_1}, ${config.directory_search_theme.theme_color_2})`
                            : 'linear-gradient(135deg, #3B82F6, #10B981)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >Terms and Conditions</span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 px-4 sm:px-6 pb-6 flex-1 flex flex-col overflow-hidden min-h-0">
                    {/* Two Sections Layout - Constrained height with scrolling */}
                    <div className="grid grid-cols-2 gap-4 flex-1 min-h-0 overflow-hidden">
                      {/* Left Section - Terms and Conditions */}
                      <div className="flex flex-col min-h-0">
                        {/* Terms Content with fixed height and scrolling */}
                        <ScrollArea className="flex-1 rounded-lg backdrop-blur-sm bg-white/5 border border-white/20 min-h-0">
                          <div className="p-3 sm:p-4">
                            <div className="space-y-3 sm:space-y-4 text-gray-700">
                              <section>
                                <h4 className="text-base sm:text-lg font-semibold mb-2 text-black">
                                  1. Interview Participation
                                </h4>
                                <p className="text-sm sm:text-base text-gray-700">By participating in this interview, you agree to allow recording of audio and video during the session for evaluation purposes.</p>
                              </section>

                              <section>
                                <h4 className="text-base sm:text-lg font-semibold mb-2 text-black">
                                  2. Information Accuracy
                                </h4>
                                <p className="text-sm sm:text-base text-gray-700">You agree to provide accurate information about your skills and experience during the interview process.</p>
                              </section>

                              <section>
                                <h4 className="text-base sm:text-lg font-semibold mb-2 text-black">
                                  3. Professional Conduct
                                </h4>
                                <p className="text-sm sm:text-base text-gray-700">You agree to maintain professional conduct throughout the interview and respect the confidentiality of any proprietary information shared.</p>
                              </section>

                              <section>
                                <h4 className="text-base sm:text-lg font-semibold mb-2 text-black">
                                  4. Data Usage
                                </h4>
                                <p className="text-sm sm:text-base text-gray-700">You consent to the use of your interview data for evaluation purposes. All recorded data will be handled according to our privacy policy.</p>
                              </section>

                              <section>
                                <h4 className="text-base sm:text-lg font-semibold mb-2 text-black">
                                  5. Privacy Policy
                                </h4>
                                <p className="text-sm sm:text-base text-gray-700">Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service.</p>
                              </section>

                              <section>
                                <h4 className="text-base sm:text-lg font-semibold mb-2 text-black">
                                  6. Recording Consent
                                </h4>
                                <p className="text-sm sm:text-base text-gray-700">By proceeding, you explicitly consent to the recording of your interview session, including audio and video components.</p>
                              </section>

                              <section>
                                <h4 className="text-base sm:text-lg font-semibold mb-2 text-black">
                                  7. Technical Requirements
                                </h4>
                                <p className="text-sm sm:text-base text-gray-700">You acknowledge that a stable internet connection and functioning camera/microphone are required for participation.</p>
                              </section>

                              <section>
                                <h4 className="text-base sm:text-lg font-semibold mb-2 text-black">
                                  8. Interview Process
                                </h4>
                                <p className="text-sm sm:text-base text-gray-700">The interview may include various assessment methods including technical questions, behavioral assessments, and practical demonstrations.</p>
                              </section>
                            </div>
                          </div>
                        </ScrollArea>
                      </div>

                      {/* Right Section - Media Preview */}
                      <div className="flex flex-col min-h-0">
                        <div className="backdrop-blur-sm bg-white/5 border border-white/20 rounded-lg flex-1 min-h-0 h-full flex flex-col">
                           <div className="p-3 sm:p-4 flex-1 h-full">
                              <MediaPreview
                               micEnabled={micEnabled}
                               videoEnabled={videoEnabled}
                               themeColor1={themeColor1}
                               themeColor2={themeColor2}
                               onVideoToggle={handleVideoToggle}
                               onMicToggle={handleMicToggle}
                               permissionsChecked={permissionsChecked}
                               cameraPermissionDenied={cameraPermissionDenied}
                               microphonePermissionDenied={microphonePermissionDenied}
                               onVideoStateChange={setIsVideoOn}
                               onMicStateChange={setIsAudioOn}
                               />
                           </div>
                         </div>
                      </div>
                    </div>

                    {/* Agreement Checkbox at Bottom */}
                    <div className="flex items-center space-x-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-lg p-3 flex-shrink-0">
                      <Checkbox 
                        id="terms-agreement"
                        checked={isAgreed}
                        onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                        className="border-2 border-gray-300 shadow-sm data-[state=checked]:border-transparent flex-shrink-0"
                        style={{
                          background: isAgreed && config 
                            ? `linear-gradient(135deg, ${config.directory_search_theme.theme_color_1}, ${config.directory_search_theme.theme_color_2})`
                            : isAgreed 
                            ? 'linear-gradient(135deg, #3B82F6, #10B981)'
                            : 'transparent'
                        }}
                      />
                      <label 
                        htmlFor="terms-agreement" 
                        className="text-sm sm:text-base text-gray-700 font-medium cursor-pointer flex-1 leading-5"
                      >
                        I have read and agree to the Terms and Conditions
                      </label>
                    </div>

                    {/* Continue Button */}
                    <div className="space-y-3 pt-2 flex-shrink-0">
                      <Button
                        onClick={handleContinueToInterview}
                        disabled={!canContinue || isProcessing}
                        className={`w-full py-3 px-8 text-base font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
                          canContinue
                            ? 'text-white shadow-blue-500/25 border-transparent' 
                            : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                        }`}
                        style={{
                          background: canContinue && config 
                            ? `linear-gradient(135deg, ${config.directory_search_theme.theme_color_1}, ${config.directory_search_theme.theme_color_2})`
                            : canContinue 
                            ? 'linear-gradient(135deg, #3B82F6, #10B981)'
                            : undefined
                        }}
                      >
                        <span className="flex items-center gap-2">
                          Continue to Interview
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        By continuing, you acknowledge that you have read and understood our terms.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Mobile Layout */}
                <div className="flex flex-col h-full lg:hidden">
                  {/* Header */}
                  <div className="text-center px-4 pt-6 pb-4 flex-shrink-0">
                    <h1 className="text-xl font-light text-gray-800">
                      <span 
                        className="text-transparent bg-clip-text font-normal"
                        style={{
                          background: config 
                            ? `linear-gradient(135deg, ${config.directory_search_theme.theme_color_1}, ${config.directory_search_theme.theme_color_2})`
                            : 'linear-gradient(135deg, #3B82F6, #10B981)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >Terms and Conditions</span>
                    </h1>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto px-4 space-y-4">
                    {/* Terms and Conditions - Show first 4, then scrollable */}
                    <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl">
                      <CardContent className="p-4">
                        <div className="space-y-4 text-gray-700">
                          <section>
                            <h4 className="text-base font-semibold mb-2 text-black">
                              1. Interview Participation
                            </h4>
                            <p className="text-sm text-gray-700">By participating in this interview, you agree to allow recording of audio and video during the session for evaluation purposes.</p>
                          </section>

                          <section>
                            <h4 className="text-base font-semibold mb-2 text-black">
                              2. Information Accuracy
                            </h4>
                            <p className="text-sm text-gray-700">You agree to provide accurate information about your skills and experience during the interview process.</p>
                          </section>

                          <section>
                            <h4 className="text-base font-semibold mb-2 text-black">
                              3. Professional Conduct
                            </h4>
                            <p className="text-sm text-gray-700">You agree to maintain professional conduct throughout the interview and respect the confidentiality of any proprietary information shared.</p>
                          </section>

                          <section>
                            <h4 className="text-base font-semibold mb-2 text-black">
                              4. Data Usage
                            </h4>
                            <p className="text-sm text-gray-700">You consent to the use of your interview data for evaluation purposes. All recorded data will be handled according to our privacy policy.</p>
                          </section>

                          {/* Scrollable additional terms */}
                          <div className="max-h-40 overflow-y-auto border-t border-white/20 pt-4">
                            <section className="mb-4">
                              <h4 className="text-base font-semibold mb-2 text-black">
                                5. Privacy Policy
                              </h4>
                              <p className="text-sm text-gray-700">Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service.</p>
                            </section>

                            <section className="mb-4">
                              <h4 className="text-base font-semibold mb-2 text-black">
                                6. Recording Consent
                              </h4>
                              <p className="text-sm text-gray-700">By proceeding, you explicitly consent to the recording of your interview session, including audio and video components.</p>
                            </section>

                            <section className="mb-4">
                              <h4 className="text-base font-semibold mb-2 text-black">
                                7. Technical Requirements
                              </h4>
                              <p className="text-sm text-gray-700">You acknowledge that a stable internet connection and functioning camera/microphone are required for participation.</p>
                            </section>

                            <section>
                              <h4 className="text-base font-semibold mb-2 text-black">
                                8. Interview Process
                              </h4>
                              <p className="text-sm text-gray-700">The interview may include various assessment methods including technical questions, behavioral assessments, and practical demonstrations.</p>
                            </section>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Media Preview - Full height */}
                    <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl min-h-96">
                      <CardContent className="p-4 h-full">
                        <MediaPreview
                          micEnabled={micEnabled}
                          videoEnabled={videoEnabled}
                          themeColor1={themeColor1}
                          themeColor2={themeColor2}
                          onVideoToggle={handleVideoToggle}
                          onMicToggle={handleMicToggle}
                          permissionsChecked={permissionsChecked}
                          cameraPermissionDenied={cameraPermissionDenied}
                          microphonePermissionDenied={microphonePermissionDenied}
                          onVideoStateChange={setIsVideoOn}
                          onMicStateChange={setIsAudioOn}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Bottom Fixed Section - Checkbox and Button */}
                  <div className="px-4 pb-8 pt-4 bg-gradient-to-t from-slate-50 via-blue-50 to-transparent space-y-4 flex-shrink-0">
                    {/* Agreement Checkbox */}
                    <div className="flex items-center space-x-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-3">
                      <Checkbox 
                        id="terms-agreement-mobile"
                        checked={isAgreed}
                        onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                        className="border-2 border-gray-300 shadow-sm data-[state=checked]:border-transparent flex-shrink-0"
                        style={{
                          background: isAgreed && config 
                            ? `linear-gradient(135deg, ${config.directory_search_theme.theme_color_1}, ${config.directory_search_theme.theme_color_2})`
                            : isAgreed 
                            ? 'linear-gradient(135deg, #3B82F6, #10B981)'
                            : 'transparent'
                        }}
                      />
                      <label 
                        htmlFor="terms-agreement-mobile" 
                        className="text-sm text-gray-700 font-medium cursor-pointer flex-1 leading-5"
                      >
                        I have read and agree to the Terms and Conditions
                      </label>
                    </div>

                    {/* Continue Button */}
                    <div className="space-y-3">
                      <Button
                        onClick={handleContinueToInterview}
                        disabled={!canContinue || isProcessing}
                        className={`w-full py-3 px-8 text-base font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
                          canContinue
                            ? 'text-white shadow-blue-500/25 border-transparent' 
                            : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                        }`}
                        style={{
                          background: canContinue && config 
                            ? `linear-gradient(135deg, ${config.directory_search_theme.theme_color_1}, ${config.directory_search_theme.theme_color_2})`
                            : canContinue 
                            ? 'linear-gradient(135deg, #3B82F6, #10B981)'
                            : undefined
                        }}
                      >
                        <span className="flex items-center gap-2">
                          Continue to Interview
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        By continuing, you acknowledge that you have read and understood our terms.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Warning Dialog */}
      <Dialog open={showMobileWarning} onOpenChange={setShowMobileWarning}>
        <DialogContent className="backdrop-blur-md bg-white/95 border border-white/20 shadow-xl max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800 text-center">
              Interview Not Supported on Mobile
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-4 space-y-4">
              <p>
                This interview requires screen sharing functionality, which is not available on mobile devices.
              </p>
              <p className="font-medium">
                Please use a desktop or laptop computer to participate in this interview.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => {
                setShowMobileWarning(false);
                navigate(-1); // Go back to previous page
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
            >
              I Understand
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TermsPage;