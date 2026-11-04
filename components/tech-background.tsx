"use client";

import Strands from "@/components/Strands";
import { useReducedMotion } from "motion/react";

// Origin grid on the page, plus a weave whose palette matches the robot's
// prism lights. Shifted up so the band sits nearer the figure.
export default function TechBackground() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="tech-grid pointer-events-none fixed inset-0 -z-10"
    >
      <div className="absolute inset-0 -translate-y-[12vh]">
        <Strands
          colors={["#5ce1ff", "#3d7cff", "#c084fc", "#ff6b8a", "#ffc14a"]}
          count={3}
          speed={reduce ? 0.001 : 0.5}
          amplitude={1}
          waviness={1}
          thickness={0.7}
          glow={2.6}
          taper={3}
          spread={1}
          intensity={0.4}
          saturation={1.6}
          opacity={0.55}
          scale={1.5}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 25%, transparent 35%, var(--background-dark) 95%)",
        }}
      />
    </div>
  );
}
