import React, { useRef, useEffect } from "react";

const SineWaveDivider = ({
  height = 80,
  background = "#fff",
  speed = 0.7, // Lower for slower animation
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = (canvas.width = canvas.offsetWidth);
    const h = (canvas.height = height);

    // WAVE PROPERTIES
    const waves = [
      {
        amplitude: 5,
        frequency: 0.016,
        phase: 0,
        color: "rgba(90,180,255,0.7)",
        particles: true,
      },
      {
        amplitude: 9,
        frequency: 0.021,
        phase: Math.PI/3,
        color: "rgba(180,90,255,0.5)",
        particles: false,
      },
      {
        amplitude: 13,
        frequency: 0.027,
        phase: Math.PI/2,
        color: "rgba(120,255,200,0.6)",
        particles: true,
      },
      {
        amplitude: 17,
        frequency: 0.021,
        phase: Math.PI/3,
        color: "rgba(180,90,255,0.5)",
        particles: false,
      },
      {
        amplitude: 21,
        frequency: 0.027,
        phase: Math.PI/2,
        color: "rgba(120,255,200,0.6)",
        particles: true,
      },
    ];

    let animationFrameId;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, h);

      // Background color
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, h);

      waves.forEach((wave, idx) => {
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          // Start and end at the base line
          let percent = (x / width);
          let fadeEdge = Math.sin(percent * Math.PI); // 0 at edges, 1 at center
          const y =
            h / 2 +
            fadeEdge *
              wave.amplitude *
              Math.sin(
                wave.frequency * (x + t) +
                  wave.phase
              );
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2 + idx % 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = wave.color;
        ctx.stroke();
        ctx.restore();

        // Sparkling particles
        if (wave.particles) {
          for (let i = 0; i < 40; i++) {
            let x = (width / 40) * i + (t * 0.07 * (idx + 1)) % (width / 3);
            let percent = (x / width);
            let fadeEdge = Math.sin(percent * Math.PI);
            const y =
              h / 2 +
              fadeEdge *
                wave.amplitude *
                Math.sin(
                  wave.frequency * (x + t) +
                  wave.phase
                );
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, 1 + Math.random(), 0, 2 * Math.PI);
            ctx.fillStyle = wave.color;
            ctx.globalAlpha = 0.3 + 0.7 * Math.random();
            ctx.shadowBlur = 6;
            ctx.shadowColor = wave.color;
            ctx.fill();
            ctx.restore();
          }
        }
      });

      t += speed;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
    // eslint-disable-next-line
  }, [height, background, speed]);

  return (
    <div
      style={{
        width: "50%",
        background,
        overflow: "hidden",
        marginTop: "20px",
        position:'fixed',
        left:'770px',
        bottom:'5px'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "140px",
          height,
          display: "block",
          background,
          margin: "0 auto",
          opacity: 0.8
        }}
        width={window.innerWidth}
        height={height}
      />
    </div>
  );
};

export default SineWaveDivider;
