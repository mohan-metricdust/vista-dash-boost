/**
 * Common type definitions for the audio visualizer components
 */
// import { ChatMessageType } from '@/components/interview/types';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';

/**
 * Base props for all audio visualizer components
 */
export interface AudioVisualizerProps {
  /**
   * Flag indicating whether the microphone is enabled
   * When false, the visualizer will show a static state or placeholder
   */
  micEnabled: boolean;
  
  /**
   * Optional width for the visualizer container
   * Default: '100%'
   */
  width?: string | number;
  
  /**
   * Optional height for the visualizer container
   * Default: '100%'
   */
  height?: string | number;
  
  /**
   * Optional className to apply to the container element
   */
  className?: string;
  
  /**
   * Optional style object to apply to the container element
   */
  style?: React.CSSProperties;
  
  /**
   * Optional LiveKit tracks
   */
  tracks?: any[];
  
  /**
   * Optional LocalParticipant from LiveKit
   */
  localParticipant?: any;
  
  /**
   * Optional voice assistant from LiveKit
   */
  voiceAssistant?: any;
  
  /**
   * Optional room connection state from LiveKit
   */
  roomState?: any;
  
  /**
   * Optional room name from LiveKit
   */
  name?: string;
  
  /**
   * Optional transcript messages
   */
  // transcripts?: ChatMessageType[];
  
  /**
   * Optional voice assistant audio track reference
   */
  voiceAssistantAudioTrack?: TrackReferenceOrPlaceholder;
}
