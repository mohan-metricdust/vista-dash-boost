import { Globe } from "@/components/Globe";
import "bootstrap/dist/css/bootstrap.min.css";

export function GlobeDemo() {
  return (
    <div
      className="position-relative d-flex align-items-center justify-content-center overflow-hidden"
      style={{ minHeight: "300px" }}
    >
      <span
        className="position-absolute text-center fw-semibold"
        style={{
          fontSize: "4rem",
          background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.7))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          zIndex: 2,
          top: "-30px"
        }}
      >
        MetricDust
      </span>

      <div style={{ 
        position: "absolute",
        width: "90%",
        height: "260px",
        zIndex: 1,
        transform: "rotateZ(-540deg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}>
        <Globe className="w-100 h-100" />
      </div>
    </div>
  );
}
