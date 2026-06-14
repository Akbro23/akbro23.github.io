"use client";

import { useReducedMotion } from "motion/react";

// A small articulated robotic arm. Three joints (shoulder, elbow, wrist) drawn
// in a clean line style, doing a slow pick-and-place cycle with a radar blip at
// the gripper. Motion is SMIL so the nested joint rotations compose correctly;
// when the user prefers reduced motion we render a fixed resting pose instead.
const ease = "0.16 1 0.3 1; 0.16 1 0.3 1";

export default function AboutGraphic() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 240 240"
      role="img"
      aria-label="Animated robotic arm performing a pick-and-place motion"
      className="h-auto w-full max-w-[17rem] overflow-visible"
      fill="none"
    >
      {/* Reach envelope: faint dashed arc showing the arm's range. */}
      <path
        d="M 40 150 A 80 80 0 0 1 200 150"
        className="stroke-primary/20"
        strokeWidth="1"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />

      {/* Static base mount. */}
      <rect
        x="96"
        y="196"
        width="48"
        height="12"
        rx="3"
        className="fill-foreground/5 stroke-muted-foreground/40"
        strokeWidth="1.5"
      />
      <line
        x1="104"
        y1="208"
        x2="100"
        y2="218"
        className="stroke-muted-foreground/40"
        strokeWidth="1.5"
      />
      <line
        x1="136"
        y1="208"
        x2="140"
        y2="218"
        className="stroke-muted-foreground/40"
        strokeWidth="1.5"
      />

      {/* Shoulder group: rotates around (120,196). */}
      <g
        transform={reduce ? "rotate(-8 120 196)" : undefined}
        style={{ transformOrigin: "0 0" }}
      >
        {!reduce && (
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values="-20 120 196; 10 120 196; -20 120 196"
            keyTimes="0; 0.5; 1"
            calcMode="spline"
            keySplines={ease}
            dur="7s"
            repeatCount="indefinite"
          />
        )}

        {/* Upper arm */}
        <line
          x1="120"
          y1="196"
          x2="120"
          y2="112"
          className="stroke-muted-foreground/70"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Elbow group: rotates around (120,112). */}
        <g transform={reduce ? "rotate(26 120 112)" : undefined}>
          {!reduce && (
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values="30 120 112; -10 120 112; 30 120 112"
              keyTimes="0; 0.5; 1"
              calcMode="spline"
              keySplines={ease}
              dur="7s"
              repeatCount="indefinite"
            />
          )}

          {/* Forearm */}
          <line
            x1="120"
            y1="112"
            x2="120"
            y2="48"
            className="stroke-muted-foreground/70"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Wrist group: rotates around (120,48). */}
          <g transform={reduce ? "rotate(-14 120 48)" : undefined}>
            {!reduce && (
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="-14 120 48; 8 120 48; -14 120 48"
                keyTimes="0; 0.5; 1"
                calcMode="spline"
                keySplines={ease}
                dur="7s"
                repeatCount="indefinite"
              />
            )}

            {/* Gripper */}
            <line
              x1="110"
              y1="48"
              x2="130"
              y2="48"
              className="stroke-primary"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="111"
              y1="48"
              x2="111"
              y2="34"
              className="stroke-primary"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="129"
              y1="48"
              x2="129"
              y2="34"
              className="stroke-primary"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Effector blip */}
            <circle cx="120" cy="30" r="3" className="fill-primary" />
            {!reduce && (
              <circle cx="120" cy="30" r="3" className="fill-none stroke-primary">
                <animate
                  attributeName="r"
                  values="3; 13"
                  keyTimes="0; 1"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8; 0"
                  keyTimes="0; 1"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Wrist joint */}
            <circle
              cx="120"
              cy="48"
              r="5"
              className="fill-background-light stroke-primary"
              strokeWidth="2"
            />
          </g>

          {/* Elbow joint */}
          <circle
            cx="120"
            cy="112"
            r="6"
            className="fill-background-light stroke-primary"
            strokeWidth="2.5"
          />
        </g>
      </g>

      {/* Shoulder joint (static pivot) */}
      <circle
        cx="120"
        cy="196"
        r="7"
        className="fill-background-light stroke-primary"
        strokeWidth="2.5"
      />
    </svg>
  );
}
