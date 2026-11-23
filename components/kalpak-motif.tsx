// Ak-kalpak panel ornament, traced from a front-on photo of the hat,
// rendered as dot art. Shared by KalpakBackground and KalpakEmblem.

export const W = 500;
export const H = 980; // the motif mirrors about y = H/2
export const LEAF_TIP_X = 138; // leftmost point (the leaf's outer edge)
export const ARROW_TIP_X = 484; // rightmost point
export const LINE = 20; // default even line width; only the free ends taper
export const TAPER = 60; // default length over which free ends narrow to a point

// [path, taper start, taper end]. Even-width lines with pointed ends, like
// the embroidery. Top half; the bottom half is its mirror.
type Stroke = [string, boolean, boolean];
const TOP: Stroke[] = [
  ["M163 78 C170 120 182 148 205 172", true, false], // top tail
  ["M210 238 C228 236 236 256 222 270 C206 284 176 276 168 252 C160 222 176 186 205 172 C240 158 270 190 278 230 C286 270 282 296 262 318", false, false], // small spiral, flowing down
  ["M262 318 C232 338 220 384 236 422 C252 460 300 472 338 460 C372 446 382 400 368 364 C354 330 318 322 294 338 C272 352 270 386 288 402 C304 414 324 404 320 388", false, false], // big spiral, swelling down to the axis
  ["M168 280 C176 320 168 370 146 408", false, true], // tail dropping left
  ["M396 372 C414 400 424 440 418 478", true, false], // horn beside the big spiral
  ["M434 428 C438 448 440 466 436 486", true, false], // spike above the arrow
];
// On the mirror axis, drawn once.
const ARROW: Stroke = ["M330 490 H484", false, true]; // grows out of the spirals' meeting point
const CORE: Stroke = ["M236 490 H330", false, false]; // ties the leaf to the spirals at the centre
const LEAF = "M148 490 C160 468 196 462 236 482 C200 510 164 512 148 490 Z"; // closed eye

// Vertical fade over the motif's height, as strengths of the text colour:
// bright at the top, darker at the bottom (keep the bottom high enough that
// no part vanishes). userSpaceOnUse so it spans the motif, not each dot.
// Needs `color` set (fills with currentColor).
export function KalpakGradient({ id, top = 1, bottom = 0.4 }: { id: string; top?: number; bottom?: number }) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={H}>
      <stop offset={0} stopColor="currentColor" stopOpacity={top} />
      <stop offset={1} stopColor="currentColor" stopOpacity={bottom} />
    </linearGradient>
  );
}

// Stamp discs along the path so free ends can narrow to a point.
function strokeTapered(
  ctx: CanvasRenderingContext2D,
  el: SVGPathElement,
  [d, a, b]: Stroke,
  line: number,
  taper: number,
) {
  el.setAttribute("d", d);
  const len = el.getTotalLength();
  for (let s = 0; s <= len; s += 0.5) {
    const k = taper > 0 ? Math.min(1, a ? s / taper : 1, b ? (len - s) / taper : 1) : 1;
    const p = el.getPointAtLength(s);
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(0.5, (line * k) / 2), 0, Math.PI * 2);
    ctx.fill();
  }
}

// Grid points (spacing `step`) inside the motif drawn at line width `line`.
// Keeping only whole grid points means every dot is whole (a pattern-filled
// stroke would slice dots at its edges). Browser-only.
export function computeDots(step: number, line = LINE, taper = TAPER): [number, number][] {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  if (!ctx) return [];
  // Path geometry is measured on a detached SVG path element.
  const el = document.createElementNS("http://www.w3.org/2000/svg", "path");

  for (const flip of [false, true]) {
    ctx.setTransform(1, 0, 0, flip ? -1 : 1, 0, flip ? H : 0);
    for (const s of TOP) strokeTapered(ctx, el, s, line, taper);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  strokeTapered(ctx, el, ARROW, line, taper);
  strokeTapered(ctx, el, CORE, line, taper);
  ctx.lineWidth = line;
  ctx.lineJoin = "miter";
  ctx.miterLimit = 10;
  ctx.stroke(new Path2D(LEAF));

  const px = ctx.getImageData(0, 0, W, H).data;
  const dots: [number, number][] = [];
  // Sample the top half down to the axis row, then mirror the dots, so the
  // halves match exactly (raster sampling alone is off by a pixel).
  for (let y = (H / 2) % step; y <= H / 2; y += step)
    for (let x = step / 2; x < W; x += step)
      if (px[(Math.round(y) * W + Math.round(x)) * 4 + 3] > 127) {
        dots.push([x, y]);
        if (y < H / 2) dots.push([x, H - y]);
      }
  return dots;
}
