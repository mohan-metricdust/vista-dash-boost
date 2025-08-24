import { environment } from "@/assets/configurations/configuration";
import { axiosInstance } from "@/interceptor/axios/AxiosInstance";

export const getTenantNameByEmailId = async (email) => {
  try {
 
    const apiUrl = environment.GET_TENET_BY_EMAILID.replace("<email>", email)
      

    const response = await axiosInstance.get(apiUrl);

    if (response) {
      return response;
    } else {
      throw new Error("No data received from server");
    }
  } catch (error: any) {
    console.error("Error getting tenant name", error);
    throw new Error(
      error.response?.data?.message || "Failed to get tenant name"
    );
  }
};

export const getLogoByTenantName = async (tenant) => {
  try {
 
    const apiUrl = environment.GET_TENANT_LOGO.replace("<tenant>", tenant)
      
    const response = await axiosInstance.get(apiUrl,{ responseType: 'blob' });

    if (response) {
      return response;
    } else {
      throw new Error("No data received from server");
    }
  } catch (error: any) {
    console.error("Error getting tenant name", error);
    throw new Error(
      error.response?.data?.message || "Failed to get tenant name"
    );
  }
};

export const getBrandingColorByTenantName = async (tenant) => {
  try {
 
    const apiUrl = environment.GET_BRANDING_COLOR_API.replace("<tenant>", tenant)
      
    const response = await axiosInstance.get(apiUrl);

    if (response) {
      return response;
    } else {
      throw new Error("No data received from server");
    }
  } catch (error: any) {
    console.error("Error getting branding color", error);
    throw new Error(
      error.response?.data?.message || "Failed to get branding color"
    );
  }
};