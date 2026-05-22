"use client";

import { useEffect, useRef } from "react";

const keywords = [
  "AWS", "CINCH", "CLOUD", "COST", "SCORE", "DEPLOY",
  "CI/CD", "SECURE", "AUDIT", "FIX", "SPEED", "FULL",
  "STACK", "API", "NEXT", "SEO", "K8s", "TERRAFORM",
  "DOCKER", "LINUX", "MONITOR", "BACKUP", "SCALE",
  "BUILD", "SHIP", "OPS", "PROD", "STAGE", "TEST",
];

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    resize();
    window.addEventListener("resize", resize);

    const cols = Math.ceil(canvas.offsetWidth / 16);
    const drops: number[] = Array(cols).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.06)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const kw = keywords[Math.floor(Math.random() * keywords.length)];
        const x = i * 20 + 10;
        const y = drops[i] * 14;

        ctx.fillStyle = Math.random() > 0.95 ? "#2563eb" : "#6b7280";
        ctx.globalAlpha = 0.5 + Math.random() * 0.3;
        ctx.fillText(kw, x, y);
        ctx.globalAlpha = 1;

        if (y > canvas.offsetHeight + 20 && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
    />
  );
}
