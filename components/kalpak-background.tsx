"use client";

import { useEffect, useState } from "react";
import { computeDots, H, KalpakGradient, LEAF_TIP_X, W } from "@/components/kalpak-motif";

// The kalpak ornament as a static background pair.
// Swap with TechBackground in app/page.tsx.

const STEP = 6; // dot grid spacing, motif units
const R = 2; // dot radius

export default function KalpakBackground() {
  const [dots, setDots] = useState<[number, number][]>([]);
  useEffect(() => setDots(computeDots(STEP)), []);

  const circles = dots.map(([x, y]) => (
    <circle key={`${x},${y}`} cx={x} cy={y} r={R} />
  ));

  // A mirrored pair framing the content like the hat's panels, arrows
  // pointing outward. Each fills the gap between the content column (main's
  // max-w-xl = 36rem) and the screen edge, hugging the content side; it
  // shrinks to fit (never clipped) and disappears when there is no gap.
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden text-foreground opacity-[0.38]"
    >
      {[false, true].map((flip) => (
        <svg
          key={String(flip)}
          // Start at the leaf so the motif sits flush against the content.
          viewBox={`${LEAF_TIP_X - R} 0 ${W - LEAF_TIP_X + R} ${H}`}
          // xMin (the leaf side) = the content side; the CSS flip mirrors
          // that for the left one, so both arrows point outward.
          preserveAspectRatio="xMinYMid meet"
          className={`absolute top-1/2 h-[min(92dvh,1000px)] w-[max(0px,calc(50vw-18rem-2vw))] -translate-y-1/2 ${flip ? "right-[calc(50%+18rem)] -scale-x-100" : "left-[calc(50%+18rem)]"}`}
          fill={`url(#kalpak-grad-${flip ? 1 : 0})`}
        >
          <KalpakGradient id={`kalpak-grad-${flip ? 1 : 0}`} />
          {circles}
        </svg>
      ))}
    </div>
  );
}
