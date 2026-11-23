"use client";

import { useEffect, useState } from "react";
import { ARROW_TIP_X, computeDots, H, KalpakGradient, LEAF_TIP_X } from "@/components/kalpak-motif";

// Hero emblem: two kalpak motifs back to back, leaf tips facing each other
// across a centre gap and arrows pointing out. Swap with RobotCore in app/page.tsx.

const GRID = 15; // dot spacing, motif units
const DOT = 3.4; // dot radius
const LINE = 27; // line width
const TAPER = 55; // length of the pointed ends
const GAP = 60; // space between the two motifs
const HEIGHT = 288; // px
const TOP = 1; // gradient brightness at the top
const BOTTOM = 0.25; // ...and at the bottom

const SPAN = ARROW_TIP_X - LEAF_TIP_X + GAP / 2; // centre to arrow tip

export default function KalpakEmblem() {
  const [dots, setDots] = useState<[number, number][]>([]);
  useEffect(() => setDots(computeDots(GRID, LINE, TAPER)), []);

  return (
    <svg
      aria-hidden
      // x=0 is the centre of the gap.
      viewBox={`${-SPAN - DOT} 0 ${2 * (SPAN + DOT)} ${H}`}
      className="mx-auto w-auto max-w-full text-foreground"
      style={{ height: HEIGHT }}
      fill="url(#kalpak-emblem-grad)"
    >
      <KalpakGradient id="kalpak-emblem-grad" top={TOP} bottom={BOTTOM} />
      {dots.map(([x, y]) => {
        const dx = x - LEAF_TIP_X + GAP / 2;
        return (
          <g key={`${x},${y}`}>
            <circle cx={dx} cy={y} r={DOT} />
            <circle cx={-dx} cy={y} r={DOT} />
          </g>
        );
      })}
    </svg>
  );
}
