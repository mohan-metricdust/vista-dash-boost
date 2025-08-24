import LivekitAgent from "@/components/LiveKitAgent";
import UnifiedInterviewPage from "@/Hireko/UnifiedInterviewPage";
import MetricDustVisualizer from "@/MetricDustVisualizer";
import { MetricDustMesh } from "@/MetricDustVisualizer/MetricDustMesh";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAudioData } from '@/MetricDustVisualizer/hooks/useAudioData';
import { LiveKitRoom, RoomAudioRenderer, StartAudio, useVoiceAssistant, useRemoteParticipants, useRoomContext, useLocalParticipant, useTracks } from '@livekit/components-react';
import { axiosInstance } from "@/AxiosInstance";
import { InterviewTokenError } from '@/services/interviewService';
import { getAnonymousInterviewToken, getUserToken } from '@/services/interviewService';
import Loader from "@/components/Loader";

export const getInterviewToken = async ({
  jobId,
  userInfo,

}: {
  jobId: string;
  userInfo: {
    name: string;
    email: string;
    phone?: string;
 
  };

}) => {
  // Real API URL with jobId
  const jobID = "job_fbbb8dee-a365-4cc0-bce2-2479eee23a6a";
  const UnifiedFunnelInitialization_StartSessionWithJobId = "https://7dtgfy71ie.execute-api.us-west-2.amazonaws.com/beta/CandidateLeadService/stage/beta/tenant/<tenant>/UnifiedFunnelInitSession/jobID/<jobId>/funnel_id/<funnelID>";
  const url = UnifiedFunnelInitialization_StartSessionWithJobId.replace("<tenant>", "test").replace("<jobId>", jobID).replace("<funnelID>", "anonymous_recruitment_funnel");

  const payload = {
    USERINFO: {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone
    }
  };

  console.log('Making interview token API call to UnifiedFunnelInitialization_StartSessionWithJobId:', url);
  console.log('Request payload:', payload);

  try {
    // Use axiosInstance.post for the API call
    const response = await axiosInstance.post(url, JSON.stringify(payload));

    console.log('Interview token API response:', response);
    return response.data;
  } catch (error: any) {
    console.error('Interview token API call failed:', error);

    let errorMessage = 'Something went wrong. Try again after sometime or contact the administrator';
    let isJobIdError = false;

    const parseErrorMessage = (message: string): string => {
  try {
    // First level parsing
    const parsed = JSON.parse(message);
    if (parsed.error && typeof parsed.error === 'string') {
      // Check if it's nested JSON
      if (parsed.error.includes('{')) {
        try {
          const nestedParsed = JSON.parse(parsed.error.replace(/\\\"/g, '"'));
          return nestedParsed.error || parsed.error;
        } catch {
          return parsed.error;
        }
      }
      return parsed.error;
    }
    return message;
  } catch {
    return message;
  }
};

const checkForJobIdError = (errorMessage: string): boolean => {
  const lowerMessage = errorMessage.toLowerCase();
  console.log(lowerMessage, "lowerMessage")
  return lowerMessage.includes('tenant mismatch') || lowerMessage.includes('item not found');
};


    // Handle API error response
    if (error.response?.data) {
      const errorData = error.response.data;
      console.log('API Error Response:', errorData);

      if (errorData.message) {
        const parsedMessage = parseErrorMessage(errorData.message);
        console.log(parsedMessage, "parsedMessage")
        // Check if error requires jobId validation message
        if (checkForJobIdError(parsedMessage)) {
          errorMessage = 'Please enter a valid Job ID and try again.';
          isJobIdError = true;
        }
        // For all other errors, use generic message
      } else if (errorData.error) {
        // Check if error requires jobId validation message
        if (checkForJobIdError(errorData.error)) {
          errorMessage = 'Please enter a valid Job ID and try again.';
          isJobIdError = true;
        }
        // For all other errors, use generic message
      }
    }

    // Throw custom error with parsed message
    throw new InterviewTokenError(errorMessage, isJobIdError, error);
  }
};

const TalkToAI = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState<{ message: string; data: any } | null>(null);
  
  useEffect(() => {
      const initializeSession = async () => {
        if (!showForm && email) { // Only proceed if form is submitted and email exists
          try {
            const response = await getInterviewToken({
              jobId: 'job_fbbb8dee-a365-4cc0-bce2-2479eee23a6a',
              userInfo: {
                name: 'Rahul',
                email: email, // Using email from the form
                phone: '8989898989'
              }
            });

            const token = response.session_data?.token;
            const livekit_url = response.session_data?.livekit_url;

            const encodedCode = btoa(JSON.stringify({
              token,
              livekit_url,
            }));

            const originalSettingsParam = 'eyJyZW5kZXJJRCI6ICJwYXJ0aWNsZS1zcGhlcmUifQ=='
            navigate(`/interview/definedUser?credentials=${encodedCode}&settings=${originalSettingsParam}`, { replace: true });
            setIsLoading(false);
          } catch (error: any) {
            console.error('Failed to initialize session:', error);
            setIsLoading(false);
            setError({
              message: error.message || 'Failed to initialize session',
              data: error.response?.data || {}
            });
            setShowForm(true); // Show the form again so user can retry
          }
        }
      };
      
      initializeSession();
  }, [email, showForm, navigate]); // Run effect when email or showForm changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setIsLoading(true);
    setError(null); // Clear any previous errors
  };

  return (
  <>
    {/* Form Modal */}
    {showForm && (
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <h5 className="mb-3">Enter Your Email</h5>
            {error && (
              <div className="alert alert-danger">
                <h6 className="alert-heading">Error</h6>
                <p className="mb-1">{error.message}</p>
                {error.data && (
                  <div className="mt-2">
                    <small className="d-block font-monospace bg-light p-2 rounded">
                      {JSON.stringify(error.data, null, 2)}
                    </small>
                  </div>
                )}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
    {isLoading ? (
      <Loader overlay fullscreen text="Loading...." size="lg" />
    ) : !showForm ? (
      <UnifiedInterviewPage />
    ) : null}
  </>
);
}



export default TalkToAI;


