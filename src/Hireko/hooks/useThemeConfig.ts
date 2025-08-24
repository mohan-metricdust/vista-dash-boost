
import { useState, useEffect } from 'react';

interface ThemeConfig {
  directory_search_theme: {
    theme_color_1: string;
    theme_color_2: string;
    theme_color_3: string;
    logo_path: string;
    login_background_image: string;
    logo_test: string;
    'home-customers': string;
    avatar_icon: string;
    office_icon: string;
    'home-office-locations': string;
    logo_favicon: string;
    'home-employees': string;
  };
  tenant_company_name: string;
  api_key: string;
  invalidation: boolean;
  cognito: {
    cognito_domain_url: string;
    cognito_user_pool_id: string;
    cognito_client_name: string;
    cognito_user_pool_name: string;
    cognito_domain_name: string;
    cognito_client_id: string;
  };
  other_public_configs: Record<string, any>;
}

export const useThemeConfig = () => {
  const [config, setConfig] = useState<ThemeConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        console.log('Loading theme configuration from deployed location...');
        const response = await fetch('/assets/Json/tenant_configuration.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch configuration: ${response.status}`);
        }
        
        const configData = await response.json();
        setConfig(configData as ThemeConfig);
        console.log('Theme configuration loaded successfully:', configData);
      } catch (error) {
        console.error('Failed to load theme configuration:', error);
        // Set a fallback configuration to prevent app crash
        const fallbackConfig: ThemeConfig = {
          directory_search_theme: {
            theme_color_1: "#6fca9f",
            theme_color_2: "#00a1cc",
            theme_color_3: "#374151",
            logo_path: "",
            login_background_image: "",
            logo_test: "",
            'home-customers': "",
            avatar_icon: "",
            office_icon: "",
            'home-office-locations': "",
            logo_favicon: "",
            'home-employees': ""
          },
          tenant_company_name: "test",
          api_key: "",
          invalidation: true,
          cognito: {
            cognito_domain_url: "beta-test-hirekoai.auth.us-east-1.amazoncognito.com",
            cognito_user_pool_id: "us-east-1_T0pr0EaBz",
            cognito_client_name: "beta-test-hirekoai-appclient",
            cognito_user_pool_name: "beta-test-hirekoai",
            cognito_domain_name: "beta-test-hirekoai",
            cognito_client_id: "ije8v68vpkq0ou0dqgi1nk12d"
          },
          other_public_configs: {}
        };
        setConfig(fallbackConfig);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  return { config, loading };
};
