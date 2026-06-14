// Quiet technical field: a fixed dot + coordinate grid sitting behind all
// content. No motion, no glow. Depth comes from the glass panels layered above.
export default function TechBackground() {
  return (
    <div
      aria-hidden
      className="tech-grid pointer-events-none fixed inset-0 -z-10"
    >
      {/* Soft vignette so the grid fades at the edges instead of hard-stopping. */}
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
