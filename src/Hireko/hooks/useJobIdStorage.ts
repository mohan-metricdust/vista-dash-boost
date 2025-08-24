
import { useState, useEffect } from 'react';

export const useJobIdStorage = () => {
  const [storedJobId, setStoredJobId] = useState<string | null>(null);

  // Store job ID when on anonymous interview page
  const storeJobId = (jobId: string) => {
    localStorage.setItem('currentJobId', jobId);
    setStoredJobId(jobId);
    console.log('Stored job ID:', jobId);
  };

  // Get stored job ID
  const getStoredJobId = (): string | null => {
    const jobId = localStorage.getItem('currentJobId');
    return jobId;
  };

  // Clear stored job ID
  const clearStoredJobId = () => {
    localStorage.removeItem('currentJobId');
    setStoredJobId(null);
    console.log('Cleared stored job ID');
  };

  // Initialize from localStorage on mount
  useEffect(() => {
    const jobId = getStoredJobId();
    if (jobId) {
      setStoredJobId(jobId);
    }
  }, []);

  return {
    storedJobId,
    storeJobId,
    getStoredJobId,
    clearStoredJobId
  };
};
