import { useAudioData } from '@/MetricDustVisualizer/hooks/useAudioData';
import MetricDustVisualizer from '@/MetricDustVisualizer';
import { LiveKitRoom, RoomAudioRenderer, StartAudio, useVoiceAssistant, useRemoteParticipants, useRoomContext, useLocalParticipant, useTracks } from '@livekit/components-react';
import { LocalParticipant, Track } from 'livekit-client';
import { useEffect, useState } from 'react';
import { VisualizerContainer } from './VisualizerContainer';

export interface InterviewData {
    userInfo: {
      name: string;
      email: string;
    };
    livekit_url?: string;
    token?: string;
}

interface LiveKitAgentProps {
    isSessionActive: boolean;
    onSessionStateChange?: (isActive: boolean) => void;
}

const LivekitAgent: React.FC<LiveKitAgentProps> = ({ isSessionActive, onSessionStateChange }) => {
    const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isLivekitConnected = Boolean(interviewData?.livekit_url && interviewData?.token);
    console.log('isLivekitConnected:', isLivekitConnected, 'isSessionActive:', isSessionActive);

    const getInterviewToken = async () => {
        console.log('Starting interview session...');
        setIsLoading(true);
        const jobID = "job_fbbb8dee-a365-4cc0-bce2-2479eee23a6a";
        const UnifiedFunnelInitialization_StartSessionWithJobId = "https://7dtgfy71ie.execute-api.us-west-2.amazonaws.com/beta/CandidateLeadService/stage/beta/tenant/<tenant>/UnifiedFunnelInitSession/jobID/<jobId>/funnel_id/<funnelID>";
        const url = UnifiedFunnelInitialization_StartSessionWithJobId.replace("<tenant>", "test").replace("<jobId>", jobID).replace("<funnelID>", "anonymous_recruitment_funnel");
       
        const payload = {
          USERINFO: {
            name: "metricdust",
            email: "lohith@metricdust.com",
            phone: "+1 425-900-9663"
          }
        };
       
        console.log('Making interview token API call to UnifiedFunnelInitialization_StartSessionWithJobId:', url);
        console.log('Request payload:', payload);
       
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
     
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
     
          const result = await response.json();
          console.log("result", result.session_data);
          setInterviewData(result.session_data);
          setIsLoading(true);
       
        } catch (error) {
          console.error('Interview token API call failed', error);
          setIsLoading(false);
          // Notify parent component about the failure
          if (onSessionStateChange) {
            onSessionStateChange(false);
          }
        }
    };

    useEffect(() => {
        if (isSessionActive) {
            console.log("Starting session - calling getInterviewToken");
            getInterviewToken();
        } else {
            console.log("Stopping session - clearing interview data");
            setInterviewData(null);
            setIsLoading(false);
        }
    }, [isSessionActive]);

    const handleDisconnect = () => {
        console.log('Disconnecting from LiveKit room');
        setInterviewData(null);
        if (onSessionStateChange) {
            onSessionStateChange(false);
        }
    };

    return (
        <>
          {isLivekitConnected ? (
            <LiveKitRoom
              serverUrl={interviewData.livekit_url}
              token={interviewData.token}
              connect={true}
              audio={true}
              video={false}
              onConnected={() => {
                setIsLoading(true)
                console.log('Connected to LiveKit room');
              }}
              onDisconnected={() => {
                console.log('Disconnected from LiveKit room');
                handleDisconnect();
              }}
            >
              <VisualizerContainer />
              <RoomAudioRenderer />
              <StartAudio label="Click to enable audio playbook" />
            </LiveKitRoom>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {isLoading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" style={{ animationDuration: '0.5s' }}></div>
                  <p className="text-gray-600">Connecting to session...</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </>
    );
};

export default LivekitAgent;