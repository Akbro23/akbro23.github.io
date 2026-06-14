"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

// A friendly line-art humanoid robot bust. It rests with closed content eyes, a
// soft blush, and a gentle smile, idling with a head tilt, antenna beacon, and
// chest light. On hover it wakes up: eyes open wide and sparkly and track the
// cursor, blush deepens, the smile grows, and a heart floats up. Reduced motion
// renders a calm static pose.
const tiltSplines = "0.16 1 0.3 1; 0.16 1 0.3 1";
const clamp = (n: number) => Math.max(-1, Math.min(1, n));

export default function HeroRobot() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Eye offset for cursor tracking (active only while hovered).
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const eyeX = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.4 });
  const eyeY = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (!hovered) {
      rawX.set(0);
      rawY.set(0);
      return;
    }
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = svgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.42;
      rawX.set(clamp((e.clientX - cx) / (r.width / 2)) * 4);
      rawY.set(clamp((e.clientY - cy) / (r.height / 2)) * 3);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [hovered, reduce, rawX, rawY]);

  const tween = { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const };
  const blushSpring = { type: "spring" as const, stiffness: 300, damping: 18 };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 360"
      role="img"
      aria-label="A small friendly humanoid robot"
      className="h-auto w-full max-w-[20rem] overflow-visible"
      fill="none"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Invisible hit area so the whole bust responds to hover. */}
      <rect x="0" y="0" width="300" height="360" className="fill-transparent" />

      {/* Shoulders / bust (static) */}
      <path
        d="M 64 360 L 74 286 Q 86 252 122 248 L 178 248 Q 214 252 226 286 L 236 360"
        className="stroke-muted-foreground/55"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Chest heart, gently beating */}
      <motion.path
        d="M150 307 C139 298 139 292 145 292 C148 292 150 294 150 296 C150 294 152 292 155 292 C161 292 161 298 150 307 Z"
        className="fill-primary"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={
          reduce
            ? undefined
            : { scale: [1, hovered ? 1.3 : 1.18, 1], opacity: [0.55, 1, 0.55] }
        }
        transition={{
          duration: hovered ? 0.55 : 1.6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: hovered ? 0.06 : 0.5,
        }}
      />

      {/* Neck */}
      <rect
        x="136"
        y="214"
        width="28"
        height="38"
        rx="6"
        className="fill-background-light/40 stroke-muted-foreground/55"
        strokeWidth="3"
      />

      {/* Head group: gentle idle tilt around the neck pivot (150, 248). */}
      <g>
        {!reduce && (
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values="-2.6 150 248; 2.6 150 248; -2.6 150 248"
            keyTimes="0; 0.5; 1"
            calcMode="spline"
            keySplines={tiltSplines}
            dur="9s"
            repeatCount="indefinite"
          />
        )}

        {/* Antenna */}
        <line
          x1="150"
          y1="96"
          x2="150"
          y2="64"
          className="stroke-muted-foreground/70"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="150" cy="60" r="4" className="fill-primary" />
        {!reduce && (
          <circle cx="150" cy="60" r="4" className="fill-none stroke-primary">
            <animate attributeName="r" values="4; 13" keyTimes="0; 1" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8; 0" keyTimes="0; 1" dur="2.4s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Affection heart, floats up on hover */}
        <motion.path
          d="M150 42 C138 33 138 26 144 26 C148 26 150 29 150 31 C150 29 152 26 156 26 C162 26 162 33 150 42 Z"
          className="fill-primary"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ opacity: 0, y: 8, scale: 0.4 }}
          animate={
            reduce
              ? undefined
              : { opacity: hovered ? 1 : 0, y: hovered ? 0 : 8, scale: hovered ? 1 : 0.4 }
          }
          transition={{ type: "spring", stiffness: 320, damping: 15 }}
        />

        {/* Side modules (ears) */}
        <rect x="82" y="138" width="10" height="34" rx="4" className="fill-background-light/40 stroke-muted-foreground/70" strokeWidth="3" />
        <rect x="208" y="138" width="10" height="34" rx="4" className="fill-background-light/40 stroke-muted-foreground/70" strokeWidth="3" />

        {/* Head shell */}
        <rect
          x="92"
          y="96"
          width="116"
          height="120"
          rx="30"
          className="fill-background-light/40 stroke-muted-foreground/70"
          strokeWidth="3"
        />

        {/* Eyes: closed and content at rest, opening wide on hover. */}
        <g>
          {/* Resting: closed happy eyes */}
          <motion.g
            initial={{ opacity: 1 }}
            animate={reduce ? undefined : { opacity: hovered ? 0 : 1 }}
            transition={tween}
          >
            <path d="M 116 153 Q 128 164 140 153" className="fill-none stroke-primary" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 160 153 Q 172 164 184 153" className="fill-none stroke-primary" strokeWidth="4.5" strokeLinecap="round" />
          </motion.g>

          {/* Hover: open sparkly eyes that track the cursor */}
          <motion.g
            style={{ x: eyeX, y: eyeY }}
            initial={{ opacity: 0 }}
            animate={reduce ? undefined : { opacity: hovered ? 1 : 0 }}
            transition={tween}
          >
            <rect x="115" y="142" width="25" height="23" rx="11.5" className="fill-primary" />
            <rect x="160" y="142" width="25" height="23" rx="11.5" className="fill-primary" />
            <circle cx="132" cy="149" r="3" className="fill-white/85" />
            <circle cx="177" cy="149" r="3" className="fill-white/85" />
          </motion.g>
        </g>

        {/* Blush: soft and always on, a touch stronger on hover */}
        <motion.ellipse
          cx="116"
          cy="180"
          rx="9"
          ry="5.5"
          className="fill-primary"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ opacity: 0.28 }}
          animate={reduce ? undefined : { opacity: hovered ? 0.45 : 0.28 }}
          transition={blushSpring}
        />
        <motion.ellipse
          cx="184"
          cy="180"
          rx="9"
          ry="5.5"
          className="fill-primary"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ opacity: 0.28 }}
          animate={reduce ? undefined : { opacity: hovered ? 0.45 : 0.28 }}
          transition={blushSpring}
        />

        {/* Mouth: a soft resting smile, a bigger happy smile on hover */}
        <motion.path
          d="M 140 186 Q 150 192 160 186"
          className="fill-none stroke-muted-foreground/70"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 1 }}
          animate={reduce ? undefined : { opacity: hovered ? 0 : 1 }}
          transition={tween}
        />
        <motion.path
          d="M 136 184 Q 150 198 164 184"
          className="fill-none stroke-primary"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={reduce ? undefined : { opacity: hovered ? 1 : 0 }}
          transition={tween}
        />
      </g>
    </svg>
  );
}
