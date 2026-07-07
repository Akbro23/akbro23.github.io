"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { canvasColors, useIsDark } from "@/components/use-is-dark";

const N = 14; // grid is N x N

type Cell = { x: number; y: number };
const key = (x: number, y: number) => y * N + x;

// A* over a random obstacle grid. The frontier expands, the shortest route is
// traced, then it replans on a fresh grid. Reduced motion shows one solved grid.
function plan(grid: boolean[]) {
  const start = { x: 0, y: 0 };
  const goal = { x: N - 1, y: N - 1 };
  const open: number[] = [key(0, 0)];
  const came = new Map<number, number>();
  const g = new Map<number, number>([[key(0, 0), 0]]);
  const h = (x: number, y: number) => Math.abs(goal.x - x) + Math.abs(goal.y - y);
  const f = new Map<number, number>([[key(0, 0), h(0, 0)]]);
  const visited: number[] = [];

  while (open.length) {
    open.sort((a, b) => (f.get(a) ?? 1e9) - (f.get(b) ?? 1e9));
    const cur = open.shift()!;
    const cx = cur % N;
    const cy = Math.floor(cur / N);
    visited.push(cur);
    if (cx === goal.x && cy === goal.y) {
      const path: Cell[] = [];
      let k: number | undefined = cur;
      while (k !== undefined) {
        path.unshift({ x: k % N, y: Math.floor(k / N) });
        k = came.get(k);
      }
      return { visited, path };
    }
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (grid[key(nx, ny)]) continue;
      const nk = key(nx, ny);
      const tentative = (g.get(cur) ?? 1e9) + 1;
      if (tentative < (g.get(nk) ?? 1e9)) {
        came.set(nk, cur);
        g.set(nk, tentative);
        f.set(nk, tentative + h(nx, ny));
        if (!open.includes(nk)) open.push(nk);
      }
    }
  }
  return { visited, path: [] as Cell[] };
}

function makeGrid() {
  for (let attempt = 0; attempt < 40; attempt++) {
    const grid = Array.from({ length: N * N }, () => Math.random() < 0.24);
    grid[key(0, 0)] = false;
    grid[key(N - 1, N - 1)] = false;
    const res = plan(grid);
    if (res.path.length) return { grid, ...res };
  }
  const grid = Array.from({ length: N * N }, () => false);
  return { grid, ...plan(grid) };
}

export default function AboutPathfinding() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const dark = useIsDark();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let size = 0;
    let pad = 0;
    let cell = 0;
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      size = Math.min(w, h);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pad = (Math.max(w, h) - size) / 2;
      cell = size / N;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Offsets so the square grid centers in the (possibly non-square) canvas.
    const offX = () => (canvas.clientWidth - size) / 2;
    const offY = () => (canvas.clientHeight - size) / 2;

    // --- Animation speed (tweak these) ---
    const PATH_SPEED = 0.3; // cells/frame the bold green route draws (lower = slower)
    const FRONTIER_DIVISOR = 90; // higher = slower frontier expansion
    const HOLD_FRAMES = 100; // frames the finished route holds before replanning
    const CELL_FADE_MS = 320; // fade-in duration per frontier cell (higher = softer)

    let state = makeGrid();
    let visN = 0;
    let pathN = 0;
    let hold = 0;
    let revealAt: number[] = []; // timestamp each frontier cell became visible

    const draw = () => {
      const c = canvasColors(dark);
      const ox = offX();
      const oy = offY();
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      // Grid lines
      ctx.strokeStyle = c.grid;
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 1;
      for (let i = 0; i <= N; i++) {
        ctx.beginPath();
        ctx.moveTo(ox + i * cell, oy);
        ctx.lineTo(ox + i * cell, oy + size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ox, oy + i * cell);
        ctx.lineTo(ox + size, oy + i * cell);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Obstacles
      ctx.fillStyle = c.dim;
      ctx.globalAlpha = 0.55;
      for (let i = 0; i < N * N; i++) {
        if (state.grid[i]) {
          const x = i % N;
          const y = Math.floor(i / N);
          ctx.fillRect(ox + x * cell + 1, oy + y * cell + 1, cell - 2, cell - 2);
        }
      }
      ctx.globalAlpha = 1;

      // Visited frontier. Each cell fades in from its reveal time so the search
      // grows softly instead of popping in.
      const nowT = performance.now();
      ctx.fillStyle = c.accent;
      for (let i = 0; i < visN && i < state.visited.length; i++) {
        const k = state.visited[i];
        const x = k % N;
        const y = Math.floor(k / N);
        const t = Math.min(1, (nowT - (revealAt[i] ?? 0)) / CELL_FADE_MS);
        ctx.globalAlpha = t * 0.16;
        const inset = 1 + (1 - t) * (cell - 2) * 0.3; // slight grow-in
        ctx.fillRect(ox + x * cell + inset, oy + y * cell + inset, cell - 2 * inset, cell - 2 * inset);
      }
      ctx.globalAlpha = 1;

      // Path: drawn as one continuous polyline. The head interpolates between
      // cells by the fractional part of pathN so growth is smooth, not stepped.
      if (pathN > 0 && state.path.length) {
        const cX = (p: Cell) => ox + p.x * cell + cell / 2;
        const cY = (p: Cell) => oy + p.y * cell + cell / 2;
        const total = state.path.length;
        const prog = Math.min(pathN, total - 1);
        const full = Math.floor(prog);
        const frac = prog - full;

        ctx.strokeStyle = c.accent;
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(cX(state.path[0]), cY(state.path[0]));
        for (let i = 1; i <= full; i++) {
          ctx.lineTo(cX(state.path[i]), cY(state.path[i]));
        }

        // Interpolated head between path[full] and path[full+1]
        let hx = cX(state.path[full]);
        let hy = cY(state.path[full]);
        if (full < total - 1 && frac > 0) {
          const a = state.path[full];
          const b = state.path[full + 1];
          hx = cX(a) + (cX(b) - cX(a)) * frac;
          hy = cY(a) + (cY(b) - cY(a)) * frac;
          ctx.lineTo(hx, hy);
        }
        ctx.stroke();

        ctx.fillStyle = c.accent;
        ctx.beginPath();
        ctx.arc(hx, hy, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Start + goal
      const s = state.path[0] ?? { x: 0, y: 0 };
      ctx.fillStyle = c.accent;
      ctx.beginPath();
      ctx.arc(ox + s.x * cell + cell / 2, oy + s.y * cell + cell / 2, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = c.accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ox + (N - 1) * cell + cell / 2, oy + (N - 1) * cell + cell / 2, 6, 0, Math.PI * 2);
      ctx.stroke();
    };

    let raf = 0;
    if (reduce) {
      visN = state.visited.length;
      pathN = state.path.length;
      draw();
    } else {
      const loop = () => {
        if (visN < state.visited.length) {
          const step = Math.max(2, Math.ceil(state.visited.length / FRONTIER_DIVISOR));
          const next = Math.min(visN + step, state.visited.length);
          const now = performance.now();
          for (let i = visN; i < next; i++) revealAt[i] = now;
          visN = next;
        } else if (pathN < state.path.length) {
          pathN += PATH_SPEED;
        } else {
          hold += 1;
          if (hold > HOLD_FRAMES) {
            state = makeGrid();
            visN = 0;
            pathN = 0;
            hold = 0;
            revealAt = [];
          }
        }
        draw();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce, dark]);

  return <canvas ref={canvasRef} className="size-full" aria-hidden />;
}
