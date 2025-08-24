
import { environment } from '@/assets/configurations/configuration';
import { axiosInstance } from '@/AxiosInstance';

// Custom error class for interview token errors
export class InterviewTokenError extends Error {
  public isJobIdError: boolean;
  public originalError: any;

  constructor(message: string, isJobIdError: boolean = false, originalError?: any) {
    super(message);
    this.name = 'InterviewTokenError';
    this.isJobIdError = isJobIdError;
    this.originalError = originalError;
  }
}

// Helper function to parse nested JSON error messages
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

// Helper function to check if error requires job ID validation message
const checkForJobIdError = (errorMessage: string): boolean => {
  const lowerMessage = errorMessage.toLowerCase();
  console.log(lowerMessage, "lowerMessage")
  return lowerMessage.includes('tenant mismatch') || lowerMessage.includes('item not found');
};

export const getLiveKitToken = async ({
  stage,
  tenant,
  userSessionId,
  profileId,
}: {
  stage: string;
  tenant: string;
  userSessionId: string;
  profileId: string;
}) => {
  const url = environment.GENERATE_TOKEN.replace("<tenant>", tenant).replace("<userSessionId>", userSessionId).replace("<profileId>", profileId)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching LiveKit token:', error);
    throw error;
  }
};



export const getLivekitForPlayground = async ({ userInfo,
  config,
  profession,
  professionId,
  skills,
  difficultyLevel,
  experienceLevel }) => {
  const identity = btoa(userInfo.email);
  const url = environment.getOrCreateUserCallDetails.replace("<tenant>", config.tenant_company_name).replace("<category>", "free_hireko_playground").replace("<identity>", identity)


  const payload = {
    userInfo,
    profession,
    professionId,
    skills,
    difficultyLevel,
    experienceLevel
  };

  console.log('Making API call to playground:', url);
  console.log('Request payload:', payload);

  try {
    // Use axiosInstance.post for the API call
    const response = await axiosInstance.post(url, JSON.stringify(payload));

    console.log('API response:', response);
    return response.data;
  } catch (error) {
    console.error('API call failed', error);


  }

}

export const getAnonymousInterviewToken = async ({
  jobId,
  userInfo,
  config
}: {
  jobId: string;
  userInfo: {
    name: string;
    email: string;
    phone?: string;
    userAlias?: string;
    userAliasType?: string;
  };
  config: any;
}) => {

  const url = environment.GENERATE_TOKEN_BY_JOBID.replace("<tenant>", config.tenant_company_name).replace("<jobId>", jobId)


  const payload = {
    USERINFO: {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone || "",
      USER_ALIAS_COMBO: {
        userAlias: userInfo.userAlias || userInfo.email,
        userAliasType: userInfo.userAliasType || "email"
      }
    }
  };

  console.log('Making API call to sessionwithjobId:', url);
  console.log('Request payload:', payload);

  try {
    // Use axiosInstance.post for the API call
    const response = await axiosInstance.post(url, JSON.stringify(payload));

    console.log('API response:', response);
    return response.data;
  } catch (error) {
    console.error('API call failed', error);


  }
};

export const getInterviewToken = async ({
  jobId,
  userInfo,
  config,
}: {
  jobId: string;
  userInfo: {
    name: string;
    email: string;
    phone?: string;

  };
  config: any;
}) => {
  // Real API URL with jobId
  const url = environment.UnifiedFunnelInitialization_StartSessionWithJobId.replace("<tenant>", config.tenant_company_name).replace("<jobId>", jobId).replace("<funnelID>", "anonymous_recruitment_funnel")



  const payload = {
    USERINFO: {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone || ""
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

export const getUserToken = async ({
  userSessionID,
  config,
}: {
  userSessionID: string;
  config: any;
}) => {
  const url = environment.AssembleAndStartSession.replace("<tenant>", config.tenant_company_name).replace("<user_session_id>", userSessionID)





  try {
    const response = await axiosInstance.post(url);

    console.log('User token API response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('User token API call failed:', error);

    let errorMessage = 'Something went wrong. Try again after sometime or contact the administrator';
    let isUserSessionError = false;

    // Handle API error response
    if (error.response?.data) {
      const errorData = error.response.data;
      console.log('API Error Response:', errorData);

      if (errorData.message) {
        const parsedMessage = parseErrorMessage(errorData.message);

        // Check if error is related to userSession
        if (parsedMessage.toLowerCase().includes('usersession') ||
          parsedMessage.toLowerCase().includes('user session') ||
          parsedMessage.toLowerCase().includes('session')) {
          errorMessage = 'Please enter a valid User Session ID and try again.';
          isUserSessionError = true;
        }
        // For all other errors, use generic message
      } else if (errorData.error) {
        // Check if error is related to userSession
        if (errorData.error.toLowerCase().includes('JobIdNotFound') ||
          errorData.error.toLowerCase().includes('user session') ||
          errorData.error.toLowerCase().includes('session')) {
          errorMessage = 'Please enter a valid User Session ID and try again.';
          isUserSessionError = true;
        }
        // For all other errors, use generic message
      }
    }

    // Throw custom error with parsed message
    throw new InterviewTokenError(errorMessage, isUserSessionError, error);
  }
};