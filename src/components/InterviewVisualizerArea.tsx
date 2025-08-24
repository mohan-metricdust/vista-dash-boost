
import VisualizerContainer from '@/components/VisualizerContainer';

interface InterviewVisualizerAreaProps {
  selectedVisualizer: string;
  audioData: Uint8Array | null;
  micEnabled: boolean;
  themeColor1: string;
}

const InterviewVisualizerArea = ({
  selectedVisualizer,
  audioData,
  micEnabled,
  themeColor1
}: InterviewVisualizerAreaProps) => {
  return (
    <div className="position-relative overflow-hidden bg-transparent">
  <VisualizerContainer
    type={selectedVisualizer}
    audioData={audioData}
    // className="w-100 h-100 position-relative bg-transparent"
    style={{ background: "transparent", zIndex: 10 }}
    themeColor1={themeColor1}
    themeColor2={themeColor1}
    micEnabled={micEnabled}
  />
</div>

  );
};

export default InterviewVisualizerArea;
