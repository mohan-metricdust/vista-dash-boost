
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import type { LocalAudioTrack, RemoteAudioTrack } from 'livekit-client';

/**
 * Get the actual track from a track reference
 */
export const getTrackFromReference = (
  trackReference: TrackReferenceOrPlaceholder
): LocalAudioTrack | RemoteAudioTrack | undefined => {
  // Check if the reference has a publication with a track
  if ('publication' in trackReference && trackReference.publication?.track) {
    return trackReference.publication.track as LocalAudioTrack | RemoteAudioTrack;
  }
  
  return undefined;
};

/**
 * Set up an audio analyzer for a track
 */
export const setupTrackAnalyzer = (track: LocalAudioTrack | RemoteAudioTrack) => {
  try {
    const mediaStreamTrack = track.mediaStreamTrack;
    if (!mediaStreamTrack) {
      return { success: false };
    }

    const stream = new MediaStream([mediaStreamTrack]);
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;
    source.connect(analyser);

    const cleanup = async () => {
      try {
        // Disconnect source first
        if (source) {
          source.disconnect();
        }
        
        // Only close the AudioContext if it's not already closed
        if (audioContext && audioContext.state !== 'closed') {
          await audioContext.close();
        }
      } catch (error) {
        // Silently handle cleanup errors to prevent console spam
        console.debug('AudioContext cleanup warning:', error);
      }
    };

    return {
      success: true,
      analyser,
      cleanup
    };
  } catch (error) {
    console.error('Error setting up track analyzer:', error);
    return { success: false };
  }
};
