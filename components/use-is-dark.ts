"use client";

import { useEffect, useState } from "react";

// Tracks the `dark` class on <html> (set by next-themes) so canvas visuals can
// pick theme-appropriate colors. Updates only on theme toggle, so useState here
// is fine (no per-frame re-renders).
export function useIsDark() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return dark;
}

export function canvasColors(dark: boolean) {
  return dark
    ? { accent: "#3ee38f", line: "#3ee38f", grid: "#33454e", dim: "#5b6b74" }
    : { accent: "#0f9d58", line: "#0f9d58", grid: "#c3ccd2", dim: "#8b979e" };
}
