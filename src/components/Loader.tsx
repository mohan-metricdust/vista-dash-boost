// Loader.jsx
import React from "react";

/**
 * Bootstrap Loader
 * Props:
 * - text?: string                      // optional label under/next to spinner
 * - variant?: "border" | "grow"        // spinner style (Bootstrap has both)
 * - size?: "sm" | "md" | "lg"          // spinner size
 * - overlay?: boolean                  // show as centered overlay
 * - fullscreen?: boolean               // overlay covers full viewport
 * - vertical?: boolean                 // stack spinner + text vertically
 * - className?: string                 // extra classes
 * - spinnerClassName?: string          // extra spinner classes
 * - ariaLabel?: string                 // accessibility label
 */
export default function Loader({
  text,
  variant = "border",
  size = "md",
  overlay = false,
  fullscreen = false,
  vertical = true,
  className = "",
  spinnerClassName = "",
  ariaLabel = "Loading...",
}) {
  const spinnerBase =
    variant === "grow" ? "spinner-grow" : "spinner-border";

  const sizeClass =
    size === "sm" ? `${spinnerBase}-sm`
    : size === "lg" ? "spinner-lg" // custom-ish; we’ll scale via style below
    : "";

  const spinnerStyle =
    size === "lg"
      ? { width: "3rem", height: "3rem" }
      : undefined;

  const content = (
    <div
      className={`d-inline-flex ${vertical ? "flex-column" : "align-items-center"} gap-2 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={`${spinnerBase} ${sizeClass} ${spinnerClassName}`}
        style={spinnerStyle}
        aria-label={ariaLabel}
      />
      {text ? (
        <span className="text-muted small">{text}</span>
      ) : (
        <span className="visually-hidden">{ariaLabel}</span>
      )}
    </div>
  );

  if (!overlay) return content;

  // Overlay container (centered). For card/section: place Loader as last child.
  return (
    <div
      className={`position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center ${fullscreen ? "position-fixed" : ""}`}
      style={{
        zIndex: 1050,
        backgroundColor: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(2px)",
      }}
    >
      {content}
    </div>
  );
}
