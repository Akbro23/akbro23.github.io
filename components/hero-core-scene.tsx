"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useIsDark } from "@/components/use-is-dark";
import * as THREE from "three";

// Accent green matches --primary (dark). CYAN is a secondary cool accent and
// ELEC is the bright signal color, used only inside this object. WebGL can't
// read CSS vars, so these are hardcoded.
const GREEN = "#3ee38f";
const CYAN = "#38e0d8";
const ELEC = "#aefcf0";

// --- Core tuning ---
const OUTER_R = 1.5; // outer shell radius (also the network + spike base)
const OUTER_DETAIL = 1; // icosahedron subdivisions (1 = 42 nodes / 120 edges)
const SPIKE_DETAIL = 0; // 0 = 12 spikes, 1 = 42 spikes
const SPIKE_LEN = 0.42; // how far spikes extend past the outer shell
const PULSE_COUNT = 12; // electric signals travelling the network

const key = (v: THREE.Vector3) =>
  `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
const randInt = (n: number) => Math.floor(Math.random() * n);

// Raw GL points render as squares. This soft radial-gradient sprite makes every
// point (nodes + travelling pulses) a round glow instead. Built once, client
// only (the scene is ssr:false).
let glowTex: THREE.CanvasTexture | null = null;
function getGlowTexture() {
  if (glowTex) return glowTex;
  const s = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  glowTex = new THREE.CanvasTexture(canvas);
  return glowTex;
}

// Deduped unique vertex directions of an icosahedron — one per node.
function uniqueDirs(radius: number, detail: number) {
  const ico = new THREE.IcosahedronGeometry(radius, detail);
  const pos = ico.attributes.position;
  const seen = new Set<string>();
  const dirs: THREE.Vector3[] = [];
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const k = key(v);
    if (seen.has(k)) continue;
    seen.add(k);
    dirs.push(v.clone());
  }
  ico.dispose();
  return dirs;
}

// Vertices + adjacency list of the icosahedron edge graph.
function buildGraph(radius: number, detail: number) {
  const ico = new THREE.IcosahedronGeometry(radius, detail);
  const pos = ico.attributes.position;
  const map = new Map<string, number>();
  const verts: THREE.Vector3[] = [];
  const idxOf = (v: THREE.Vector3) => {
    const k = key(v);
    let id = map.get(k);
    if (id === undefined) {
      id = verts.length;
      map.set(k, id);
      verts.push(v.clone());
    }
    return id;
  };
  const adj: number[][] = [];
  const edges = new Set<string>();
  const addEdge = (x: number, y: number) => {
    if (x === y) return;
    const k = x < y ? `${x}-${y}` : `${y}-${x}`;
    if (edges.has(k)) return;
    edges.add(k);
    (adj[x] ??= []).push(y);
    (adj[y] ??= []).push(x);
  };
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 3) {
    a.fromBufferAttribute(pos, i);
    b.fromBufferAttribute(pos, i + 1);
    c.fromBufferAttribute(pos, i + 2);
    const ia = idxOf(a);
    const ib = idxOf(b);
    const ic = idxOf(c);
    addEdge(ia, ib);
    addEdge(ib, ic);
    addEdge(ic, ia);
  }
  ico.dispose();
  return { verts, adj };
}

// Radial spikes as a single lineSegments geometry with a green (base) -> cyan
// (tip) vertex-color gradient. Raw three (no drei <Line>/meshline) so we don't
// drag in a second three instance.
function useSpikes(baseR: number, len: number, detail: number) {
  return useMemo(() => {
    const dirs = uniqueDirs(baseR, detail);
    const linePos: number[] = [];
    const lineCol: number[] = [];
    const tips: THREE.Vector3[] = [];
    const cBase = new THREE.Color(GREEN);
    const cTip = new THREE.Color(CYAN);
    for (const d of dirs) {
      const tip = d.clone().setLength(baseR + len);
      linePos.push(d.x, d.y, d.z, tip.x, tip.y, tip.z);
      lineCol.push(cBase.r, cBase.g, cBase.b, cTip.r, cTip.g, cTip.b);
      tips.push(tip);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
    geom.setAttribute("color", new THREE.Float32BufferAttribute(lineCol, 3));
    return { geom, tips };
  }, [baseR, len, detail]);
}

type Pulse = { from: number; to: number; t: number; speed: number };

// Electric signals random-walking the edge graph. Lives inside the rotating
// outer group so signals ride the visible wireframe.
function Network({ animate }: { animate: boolean }) {
  // Additive blending glows hard on the dark background, so dim the pulses in
  // dark mode to match how subtle they read on light.
  const dark = useIsDark();
  const graph = useMemo(() => buildGraph(OUTER_R, OUTER_DETAIL), []);
  const posAttr = useMemo(() => {
    const a = new THREE.BufferAttribute(
      new Float32Array(PULSE_COUNT * 3),
      3,
    );
    a.setUsage(THREE.DynamicDrawUsage);
    return a;
  }, []);

  const pulses = useMemo<Pulse[]>(() => {
    const ps: Pulse[] = [];
    for (let i = 0; i < PULSE_COUNT; i++) {
      const from = randInt(graph.verts.length);
      const nbrs = graph.adj[from];
      ps.push({
        from,
        to: nbrs[randInt(nbrs.length)],
        t: Math.random(),
        speed: 0.55 + Math.random() * 0.5,
      });
    }
    // Seed initial positions so the first frame is valid.
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      const f = graph.verts[p.from];
      const to = graph.verts[p.to];
      posAttr.setXYZ(
        i,
        f.x + (to.x - f.x) * p.t,
        f.y + (to.y - f.y) * p.t,
        f.z + (to.z - f.z) * p.t,
      );
    }
    posAttr.needsUpdate = true;
    return ps;
  }, [graph, posAttr]);

  useFrame((_, delta) => {
    if (!animate) return;
    const step = Math.min(delta, 0.05);
    for (let i = 0; i < pulses.length; i++) {
      const p = pulses[i];
      p.t += p.speed * step;
      while (p.t >= 1) {
        p.t -= 1;
        const nbrs = graph.adj[p.to].filter((n) => n !== p.from);
        const pool = nbrs.length ? nbrs : graph.adj[p.to];
        p.from = p.to;
        p.to = pool[randInt(pool.length)];
      }
      const f = graph.verts[p.from];
      const to = graph.verts[p.to];
      posAttr.setXYZ(
        i,
        f.x + (to.x - f.x) * p.t,
        f.y + (to.y - f.y) * p.t,
        f.z + (to.z - f.z) * p.t,
      );
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry>
        <primitive attach="attributes-position" object={posAttr} />
      </bufferGeometry>
      <pointsMaterial
        color={ELEC}
        map={getGlowTexture()}
        size={0.26}
        sizeAttenuation
        transparent
        opacity={dark ? 0.85 : 1}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function OuterShell({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geom = useMemo(
    () => new THREE.IcosahedronGeometry(OUTER_R, OUTER_DETAIL),
    [],
  );
  const spikes = useSpikes(OUTER_R, SPIKE_LEN, SPIKE_DETAIL);

  useFrame((_, delta) => {
    if (!animate || !group.current) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x += delta * 0.056;
  });

  return (
    <group ref={group}>
      {/* Holographic wireframe skin */}
      <mesh geometry={geom}>
        <meshBasicMaterial color={GREEN} wireframe transparent opacity={0.4} />
      </mesh>
      {/* Glowing vertices */}
      <points geometry={geom}>
        <pointsMaterial
          color={GREEN}
          map={getGlowTexture()}
          size={0.13}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>

      {/* Radial spikes (green base -> cyan tip) */}
      <lineSegments geometry={spikes.geom}>
        <lineBasicMaterial vertexColors transparent opacity={0.9} />
      </lineSegments>
      {/* Glowing spike tips */}
      {spikes.tips.map((t, i) => (
        <mesh key={i} position={t}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color={CYAN} />
        </mesh>
      ))}

      {/* Electric signals travelling the edges */}
      <Network animate={animate} />
    </group>
  );
}

function InnerShell({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geom = useMemo(() => new THREE.IcosahedronGeometry(0.85, 0), []);

  useFrame((_, delta) => {
    if (!animate || !group.current) return;
    group.current.rotation.y -= delta * 0.24;
    group.current.rotation.x -= delta * 0.084;
  });

  return (
    <group ref={group}>
      <mesh geometry={geom}>
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.32} />
      </mesh>
      <points geometry={geom}>
        <pointsMaterial
          color={CYAN}
          map={getGlowTexture()}
          size={0.11}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function Scene({ animate }: { animate: boolean }) {
  return (
    <>
      <OuterShell animate={animate} />
      <InnerShell animate={animate} />

      {/* Energy core */}
      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshBasicMaterial color={GREEN} transparent opacity={0.95} />
      </mesh>

      {/* Particle halo */}
      <Sparkles
        count={40}
        scale={5.5}
        size={2.4}
        speed={animate ? 0.3 : 0}
        color={GREEN}
        opacity={0.5}
      />
    </>
  );
}

export default function HeroCoreScene() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      frameloop={animate ? "always" : "demand"}
    >
      <Scene animate={animate} />
    </Canvas>
  );
}
