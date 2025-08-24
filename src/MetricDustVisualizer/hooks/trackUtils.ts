
import { isTrackReference } from '@livekit/components-react';
import { Track, createAudioAnalyser } from 'livekit-client';
import type { LocalAudioTrack, RemoteAudioTrack } from 'livekit-client';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';

/**
 * Get an audio track from a track reference
 * @param trackReference The track reference to extract a track from
 * @returns The audio track if available, undefined otherwise
 */
export const getTrackFromReference = (
  trackReference: TrackReferenceOrPlaceholder
): LocalAudioTrack | RemoteAudioTrack | undefined => {
  if (!trackReference) return undefined;
  
  if (isTrackReference(trackReference)) {
    const track = trackReference.publication?.track;
    if (track && (track.kind === 'audio')) {
      return track as unknown as LocalAudioTrack | RemoteAudioTrack;
    }
  } else if (trackReference instanceof Track && trackReference.kind === 'audio') {
    return trackReference as unknown as LocalAudioTrack | RemoteAudioTrack;
  }
  
  return undefined;
};

/**
 * Setup an audio analyzer for a track
 * @param track The audio track to analyze
 * @returns An object containing the analyzer, a cleanup function, and other relevant data
 */
export const setupTrackAnalyzer = (track: LocalAudioTrack | RemoteAudioTrack) => {
  try {
    const { analyser, cleanup } = createAudioAnalyser(track, {
      fftSize: 256,
      smoothingTimeConstant: 0.8
    });
    
    return {
      analyser,
      cleanup,
      success: true
    };
  } catch (error) {
    console.error('Error setting up LiveKit audio analyzer:', error);
    return {
      success: false
    };
  }
};
