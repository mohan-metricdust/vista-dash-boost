
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export interface InterviewData {
  userInfo: {
    name: string;
    email: string;
  };
  LIVEKIT_URL?: string;
  token?: string;
}

export const useInterviewData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [decodingError, setDecodingError] = useState<string | null>(null);

  const decodeInterviewData = useCallback((encodedData: string): { name: string; email: string } => {
    try {
      const decoded = JSON.parse(atob(encodedData));
      return decoded;
    } catch (error) {
      throw new Error('Failed to decode interview data');
    }
  }, []);

  const decodeLiveKitCredentials = useCallback((encodedCode: string): { livekit_url: string; token: string; userInfo?: any } => {
    console.log(encodedCode, "encodedCredentials");
    try {
      const decoded = JSON.parse(atob(encodedCode));
      console.log(decoded, "decoded credentials");
      return decoded;
    } catch (error) {
      throw new Error('Failed to decode LiveKit credentials');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams(location.search);
      console.log(query,"query")
      const credentials = query.get('credentials');
      console.log(credentials,"creds")
      
      // Check if this is a UnifiedInterviewPage that needs credentials
      const isUnifiedInterviewPage = location.pathname.includes('/interview/') && 
                                   (location.pathname.includes('/definedUser') || 
                                    location.pathname.includes('/playground/userInfo/'));

      // Check if this is an anonymous interview page
      const isAnonymousInterviewPage = location.pathname.includes('/anonymousInterview/');
      
      if (!isUnifiedInterviewPage && !isAnonymousInterviewPage) {
        // This hook is only for UnifiedInterviewPage and anonymous interview pages
        return;
      }

      // Handle anonymous interview pages
      if (isAnonymousInterviewPage) {
        console.log("here inside anonymousinterview")
        // For anonymous interview, we might have userInfo in URL params
        const userInfo = params.userInfo;
        
        if (!credentials && userInfo) {
          // Case: userInfo exists but no credentials - prefill form
          try {
            const userInfoData = decodeInterviewData(userInfo);
            
            const parsedData: InterviewData = {
              userInfo: userInfoData,
              // No LiveKit credentials when credentials is missing
            };

            setInterviewData(parsedData);
          } catch (error) {
            console.error('Error decoding user info for anonymous interview:', error);
            setDecodingError('Failed to decode user information');
          }
        } else if (credentials && userInfo) {
          // Case: both userInfo and credentials exist - go directly to interview
          try {
            const userInfoData = decodeInterviewData(userInfo);
            const liveKitCredentials = decodeLiveKitCredentials(credentials);
            
            const parsedData: InterviewData = {
              userInfo: userInfoData,
              LIVEKIT_URL: liveKitCredentials.livekit_url,
              token: liveKitCredentials.token
            };

            setInterviewData(parsedData);
          } catch (error) {
            console.error('Error processing anonymous interview data:', error);
            setDecodingError('Failed to decode interview setup data');
          }
        }
        // If neither userInfo nor credentials, let the form handle initial state
        return;
      }

      // Handle unified interview pages
      // For definedUser interviews, userInfo is now embedded in credentials
      if (location.pathname.includes('/definedUser')) {
        console.log("am i here")
        if (!credentials) {
          console.error('Missing credentials for defined user interview');
          return;
        }


        try {
          // Decode LiveKit credentials which now include userInfo
          const liveKitCredentials = decodeLiveKitCredentials(credentials);
          console.log(liveKitCredentials, "livekitcreds");
          
          // Extract userInfo from credentials
          const userInfoData = liveKitCredentials.userInfo || { name: 'User', email: 'user@example.com' };
          
          const parsedData: InterviewData = {
            userInfo: userInfoData,
            LIVEKIT_URL: liveKitCredentials.livekit_url,
            token: liveKitCredentials.token
          };

          setInterviewData(parsedData);
        } catch (error) {
          console.error('Error processing defined user interview data:', error);
          setDecodingError('Failed to decode interview setup data');
        }
        return;
      }

      // Handle playground interviews (existing logic with userInfo in URL)
      // Extract userInfo from pathname for playground interviews
      const pathParts = location.pathname.split('/');
      const userInfoIndex = pathParts.findIndex(part => part === 'userInfo');
      const userInfo = userInfoIndex !== -1 ? pathParts[userInfoIndex + 1] : null;

      // If there's no credentials parameter, this means we're on UserInfoFormPage (not UnifiedInterviewPage)
      // In this case, we should only decode userInfo if userInfo exists, but not expect LiveKit credentials
      if (!credentials) {
        if (userInfo) {
          try {
            // Decode user info from userInfo for prefilling the form
            const userInfoData = decodeInterviewData(userInfo);
            
            const parsedData: InterviewData = {
              userInfo: userInfoData,
              // No LiveKit credentials when credentials is missing
            };

            setInterviewData(parsedData);
            console.log('User info loaded for form prefill:', parsedData);
          } catch (error) {
            console.error('Error decoding user info:', error);
            setDecodingError('Failed to decode user information');
          }
        }
        return;
      }

      // If we reach here, we have both userInfo and credentials (playground UnifiedInterviewPage)
      if (!userInfo) {
        console.error('Missing userInfo in URL for playground interview page');
        return;
      }

      try {
        // Decode user info from userInfo
        const userInfoData = decodeInterviewData(userInfo);
        
        // Decode LiveKit credentials from credentials
        const liveKitCredentials = decodeLiveKitCredentials(credentials);
        console.log(liveKitCredentials, "livekitcreds");
        
        const parsedData: InterviewData = {
          userInfo: userInfoData,
          LIVEKIT_URL: liveKitCredentials.livekit_url,
          token: liveKitCredentials.token
        };

        setInterviewData(parsedData);
        console.log('Interview data loaded:', parsedData);
      } catch (error) {
        console.error('Error processing interview data:', error);
        setDecodingError('Failed to decode interview setup data');
      }
    };

    fetchData();
  }, [location, navigate, params.userInfo, decodeInterviewData, decodeLiveKitCredentials]);

  return { interviewData, decodingError };
};
