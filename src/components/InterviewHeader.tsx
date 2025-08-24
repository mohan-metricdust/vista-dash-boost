
import { TrackToggle } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { Button } from '@/components/ui/button';
import { Phone, MonitorSpeaker, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InterviewHeaderProps {
  domain: string;
  skill: string;
  videoEnabled: boolean;
  micEnabled: boolean;
  themeColor1: string;
  // onToggleVideo: () => void;
  onToggleMic: () => void;
  onEndCall: () => void;
  mode: 'interview' | 'playground';
  screenShareEnabled?: boolean;
  onToggleScreenShare?: () => void;
  config?: {
    directory_search_theme: {
      logo_path: string;
      [key: string]: any;
    };
    tenant_company_name: string;
    [key: string]: any;
  };
}

const InterviewHeader = ({

  onEndCall,
  screenShareEnabled = false,
  onToggleScreenShare,
  config
}: InterviewHeaderProps) => {
  const navigate = useNavigate();
  const logoPath = config?.directory_search_theme.logo_path || '';
  // Ensure logo path is properly resolved - if it starts with /, it's already absolute
  const resolvedLogoPath = logoPath.startsWith('/') ? logoPath : `/${logoPath}`;

  return (
    <div className="d-flex align-items-center justify-content-between w-100 p-4 h-100">
  {/* Left - Logo */}
  <div className="flex-shrink-0">
    {logoPath ? (
      <img
        src={resolvedLogoPath}
        alt="Logo"
        className="img-fluid"
        style={{ height: "4rem", width: "auto", objectFit: "contain" }}
        onError={(e) => {
          const target = e.target;
          // target.style.display = "none";
          // target.nextElementSibling?.classList.remove("d-none");
        }}
      />
    ) : null}
    <div
      className={`d-flex align-items-center justify-content-center text-muted fw-medium rounded px-2`}
      style={{
        width: "2.5rem",
        height: "1.5rem",
        backdropFilter: "blur(8px)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        fontSize: "0.75rem"
      }}
    >
      {!logoPath && "logo"}
    </div>
  </div>

  {/* Right - Control buttons */}
  <div className="d-flex align-items-center gap-2">
    <TrackToggle
      source={Track.Source.Microphone}
      className="btn d-flex align-items-center justify-content-center"
      style={{
        width: "3rem",
        height: "3rem",
        borderRadius: "0.75rem",
        backdropFilter: "blur(8px)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "#374151",
        transition: "all 0.2s"
      }}
    />


    {/* <TrackToggle
      source={Track.Source.ScreenShare}
      className="btn d-flex align-items-center justify-content-center"
      style={{
        width: "3rem",
        height: "3rem",
        borderRadius: "0.75rem",
        backdropFilter: "blur(8px)",
        background: screenShareEnabled
          ? "rgba(59,130,246,0.2)"
          : "rgba(255,255,255,0.1)",
        color: screenShareEnabled ? "#2563eb" : "#374151",
        border: screenShareEnabled
          ? "1px solid #bfdbfe"
          : "1px solid rgba(255,255,255,0.2)",
        transition: "all 0.2s"
      }}
    /> */}

    <Button
      variant="ghost"
      size="icon"
      className="btn d-flex align-items-center justify-content-center"
      style={{
        width: "3rem",
        height: "3rem",
        borderRadius: "0.75rem",
        backdropFilter: "blur(8px)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(235, 16, 16, 0.2)",
        color: "#dd0e26ff",
        transition: "all 0.2s"
      }}
    >
      <Info style={{ width: "1.25rem", height: "1.25rem" }} />
    </Button>

    <Button
      onClick={() => {
        navigate('/');
      }}
      className="d-flex align-items-center gap-2"
      style={{
        backgroundColor: "#ef4444",
        color: "#fff",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.75rem",
        fontWeight: 500
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ef4444")}
    >
      <Phone
        style={{ width: "1rem", height: "1rem", transform: "rotate(135deg)" }}
      />
      <span>End Call</span>
    </Button>
  </div>
</div>

  );
};

export default InterviewHeader;
