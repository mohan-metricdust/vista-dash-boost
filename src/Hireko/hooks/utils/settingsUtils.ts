interface InterviewSettings {
  renderID: string;
  isScreenShareMandatory: boolean;
}

const DEFAULT_SETTINGS: InterviewSettings = {
  renderID: "particle-sphere",
  isScreenShareMandatory: false
};

export const parseSettingsFromQuery = (searchParams: URLSearchParams): InterviewSettings => {
  try {
    const settingsParam = searchParams.get('settings');
    if (!settingsParam) {
      return DEFAULT_SETTINGS;
    }

    const decodedSettings = JSON.parse(atob(settingsParam));
    
    return {
      renderID: decodedSettings.renderID || DEFAULT_SETTINGS.renderID,
      isScreenShareMandatory: Boolean(decodedSettings.isScreenShareMandatory)
    };
  } catch (error) {
    console.error('Error parsing settings from query params:', error);
    return DEFAULT_SETTINGS;
  }
};

export const encodeSettingsToQuery = (settings: InterviewSettings): string => {
  try {
    return btoa(JSON.stringify(settings));
  } catch (error) {
    console.error('Error encoding settings to query:', error);
    return '';
  }
};