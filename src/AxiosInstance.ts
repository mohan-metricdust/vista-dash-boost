
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from "axios";
import SecureLS from "secure-ls";
import { toast } from "sonner";

// Create a custom instance with axios defaults but without automatically transforming headers
export const axiosInstance = axios.create({
  timeout: 30000
});

// Override the default header normalization behavior
axiosInstance.defaults.headers.common = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'AuthorizationRegion': 'us-east-1',
  'user_alias': 'user-alias-123',
};

// Remove the default transformRequest that might be altering headers
delete axiosInstance.defaults.transformRequest;

// ✅ Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    try {
      const secureLS = new SecureLS();
      let token = "";
      let company = "";

      try {
        const userInfo = secureLS.get("_secure_user_info");
        token = userInfo?.signInUserSession?.accessToken?.jwtToken || "";
      } catch (e) {
        console.error("Error retrieving token:", e);
      }

      try {
        company = secureLS.get("tenant_name") || "";
      } catch (e) {
        console.error("Error retrieving tenant name:", e);
      }

      // Create a new headers object to avoid header case normalization
      if (!config.headers) {
        config.headers = {} as import("axios").AxiosRequestHeaders;
      }

      // Directly set headers with exact case preservation
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      if (company) {
        config.headers['AuthorizationTenant'] = 'test';
        // config.headers['AuthorizationTenant'] = company;
      }

      config.headers['AuthorizationRegion'] = 'us-east-1';

      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return config;
    }
  },
  (error: AxiosError) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
      if (error.response?.status === 400) {
        try {
          const secureLS = new SecureLS();
          secureLS.removeAll();
          localStorage.clear();
          // Use window.location.replace to avoid browser "unsaved changes" popup
          toast.error("Your session has expired. Please login again.");
        } catch (e) {
          console.error("Error handling 403 response:", e);
        }
      }

    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    return Promise.reject(error);
  }
);
