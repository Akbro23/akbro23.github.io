# Portfolio Redesign — "Cyber-Glass" Overhaul

Date: 2026-06-14
Status: Approved direction, pending spec review

## Goal

Overhaul Akbar Tokochev's developer portfolio so it has a distinct character:
techy, robotics-adjacent, glassy, and deliberately not "AI-generated-looking."
This is a **visual + structural overhaul**, not a content rewrite. All facts
(education, experience, projects, skills, links) are preserved.

## Design Read

Developer portfolio, overhaul redesign, for recruiters and engineering peers,
with a cyber-glass / neon-depth (depth via glass, not light) dark-tech language,
on the existing Next.js + Tailwind v4 + Motion stack, Geist + Geist Mono,
restrained electric-green accent on charcoal.

Dials: `DESIGN_VARIANCE 7 · MOTION_INTENSITY 6 · VISUAL_DENSITY 4`.

## Hard Constraints (from the anti-slop audit)

These are explicit decisions, not preferences. They override default instincts.

- **No glows.** No neon glow, no outer/box glow, no cursor-aware ambient glow.
  Depth comes from glass layering and tinted shadow only.
- **No status-readout / HUD gimmicks.** No `● online` dots, no
  `software_engineer · AI · robotics` machine-readout strips, no decorative
  status dots anywhere.
- **No section-number eyebrows** (`01 / ABOUT`, `001 · Capabilities`, etc.).
- **Eyebrows capped** at one per three sections total (hero counts as one).
- **Zero em-dashes** (`—` / `–` as separator) anywhere visible. Use periods,
  commas, colons, or a spaced hyphen.
- **One accent color** (electric green) used identically across the whole page,
  in both light and dark.
- **One corner-radius system**, applied consistently.
- **Page theme lock:** the whole page is dark, or the whole page is light, per
  the toggle. No section inverts mid-scroll.
- **Reduced motion + reduced transparency** honored. Glass degrades to
  solid-fill; motion degrades to static.

## Visual System

### Color
- Base: deep charcoal-black (`oklch ~0.16`) in dark; clean off-white frosted in
  light. No pure black, no pure white.
- Layered near-black/near-white panel surfaces for depth.
- Accent: **electric signal-green**, pushed vivid (around
  `oklch(0.80 0.20 150)`). Used sparingly and flat: links, active states,
  hairline edges, active-section nav indicator, focus rings. Never as a glow.
- Both themes keep the green identity; the toggle stays.

### Glass
- Frosted panels: `backdrop-filter: blur(...)`, 1px hairline border that is
  brighter on the top/left edge (simulated light from above), a faint inner
  highlight (`inset` box-shadow), and a soft shadow tinted to the background hue.
- Glass implemented as reusable CSS utility classes in `globals.css`, not
  ad-hoc per component.
- `prefers-reduced-transparency` fallback: solid panel fill, no blur.

### Background
- A quiet, near-static technical dot / coordinate grid replacing the current
  `background-lines`. Optional very slow ambient drift, reduced-motion safe.
  No moving light, no glow.

### Typography
- Body: Geist Sans (already wired via `next/font`).
- Character: Geist Mono for metadata, dates, locations, and tech tags. The
  sans-display vs mono tension carries the "engineered" feel.
- Display headlines: large, confident, `tracking-tight`. Hero name is the
  largest moment on the page.
- Emphasis within a headline uses italic/bold of the same family, never a
  second font family.

### Shape / Motion
- One radius scale (soft, ~12-16px on panels; pill for interactive controls if
  used, applied consistently).
- Motion (lively but tasteful): staggered scroll reveals (Motion `whileInView`),
  hover depth/lift on glass cards, optional slow background drift. Every
  animation is motivated (hierarchy, feedback, or sequence). No pinned/parallax
  hijacks. All wrapped for `prefers-reduced-motion`.

## Section-by-Section

All sections live inside the existing single-page layout. IA, anchor IDs
(`#hero`, `#about`, `#skills`, `#education`, `#experience`, `#projects`), and
all external links are preserved.

1. **Nav** — floating glass pill, blurred, single line at desktop (height
   <= 80px). Active-section aware with a flat green indicator. Theme toggle
   retained.
2. **Hero** — name in large display type; a short, human, point-of-view
   subtitle (replaces the bare "Software Engineer"); photo in a glass-ringed
   frame (no rim glow); social links as glass chips. Hero fits the viewport:
   headline <= 2 lines, subtext <= 20 words, no status strip, no scroll cue.
3. **About** — single glass panel, existing copy with a light human voice pass
   (every change subject to user approval). Headline only, no section-index
   eyebrow.
4. **Skills** — keep the existing category-filter interaction. Restyle chips as
   glass tiles; filter controls as consistent toggles. Active state uses the
   flat green accent. **Re-enable the Robotics / ROS2 category** (currently
   commented out) since robotics is the theme.
5. **Education** — technical-log treatment: a thin vertical rail with nodes,
   glass entry cards, mono dates/locations. Reads like a system record.
6. **Experience** — same log/rail language as Education but must be a distinct
   layout variant (not a third identical split), to satisfy layout-repetition
   rules. Mono dates/locations, glass cards, existing bullet content.
7. **Projects** — glass cards with hover depth/lift and a flat green hairline on
   hover. Mono tech tags. Designed to scale gracefully as more projects are
   added. Existing demo/GitHub link logic preserved.

## Voice Pass (subject to per-line approval)

- Hero subtitle gains a point of view instead of the bare role label.
- About copy lightly tightened toward a human, engineered tone.
- No buzzwords ("seamless", "elevate", "next-gen"), no em-dashes, no fake
  metrics. Every visible string re-read before ship.

## Technical Approach

- Stack unchanged: Next.js 16, Tailwind v4, Motion (`motion/react`). No new
  heavy dependencies.
- `lucide-react` is retained (project already depends on it) despite the skill's
  general preference, to avoid icon churn.
- Glass + grid + accent system added as Tailwind v4 theme tokens and utility
  layers in `app/globals.css`.
- Components refactored to consume the shared system. Content data structures
  (experience, education, projects, skills arrays) are preserved as-is.
- Motion code isolated in client-leaf components (`'use client'`), with
  `useReducedMotion` guards and effect cleanup.

## Out of Scope

- No content/fact rewrites beyond the approved voice pass.
- No new pages or routes; this stays a single-page site.
- No analytics/tracking changes; section IDs and link targets stay stable.

## Success Criteria

- The page passes the design-taste Pre-Flight Check (no em-dashes, theme lock,
  one accent, one radius system, eyebrow cap, no status dots, no glows,
  reduced-motion + reduced-transparency fallbacks, hero fits viewport).
- Looks cohesive and distinct in both light and dark modes.
- All existing content and links intact.
- Lighthouse: LCP < 2.5s, CLS < 0.1 (hero image `priority`).
