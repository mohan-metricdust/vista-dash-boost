
import { useEffect } from 'react';
import { useThemeConfig } from './useThemeConfig';

export const useDynamicHead = () => {
  const { config, loading } = useThemeConfig();

  useEffect(() => {
    if (loading || !config) return;

    const tenantName = config.tenant_company_name || 'Interview';
    const logoPath = config.directory_search_theme.logo_path;
    const titleCaseName = tenantName
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
    
    // Update page title
    document.title = `${titleCaseName} Interview Dashboard`;
    
    // Update favicon if logo path is available
    if (logoPath) {
      const resolvedLogoPath = logoPath.startsWith('/') ? logoPath : `/${logoPath}`;
      
      // Remove existing favicon links
      const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
      existingFavicons.forEach(link => link.remove());
      
      // Add new favicon
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.href = resolvedLogoPath;
      document.head.appendChild(favicon);
      
      // Add apple touch icon for better mobile support
      const appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      appleTouchIcon.href = resolvedLogoPath;
      document.head.appendChild(appleTouchIcon);
    }
    
    // Update Open Graph meta tags for link sharing
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };
    
    // Update Twitter meta tags
    const updateTwitterMetaTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };
    
    // Update meta tags for sharing
    updateMetaTag('og:title', `${tenantName} Interview Dashboard`);
    updateMetaTag('og:description', `Professional AI-powered interview platform by ${tenantName}`);
    updateTwitterMetaTag('twitter:title', `${tenantName} Interview Dashboard`);
    updateTwitterMetaTag('twitter:description', `Professional AI-powered interview platform by ${tenantName}`);
    
    if (logoPath) {
      const resolvedLogoPath = logoPath.startsWith('/') ? logoPath : `/${logoPath}`;
      const fullLogoUrl = `${window.location.origin}${resolvedLogoPath}`;
      updateMetaTag('og:image', fullLogoUrl);
      updateTwitterMetaTag('twitter:image', fullLogoUrl);
    }
    
    console.log('Dynamic head updated:', {
      title: document.title,
      favicon: logoPath,
      tenantName
    });
    
  }, [config, loading]);

  return { config, loading };
};
