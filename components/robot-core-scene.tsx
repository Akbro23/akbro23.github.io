"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useIsDark } from "@/components/use-is-dark";
import * as THREE from "three";

const MODEL = "/robot/h1_2.glb";

// The H1-2 faces +x in its own frame, which is screen-right once the model is
// turned Y-up. This yaw brings it round to face the camera.
const BASE_YAW = -Math.PI / 2;

const RED = "#ff3b5c";
const ORANGE = "#ff7a2f";
const YELLOW = "#ffe14a";
const GREEN = "#3ee38f";
const CYAN = "#38e0d8";
const AZURE = "#3aa0ff";
const VIOLET = "#9a6bff";
const MAGENTA = "#ff49c8";

// Tight colour ring. One stop per band of the spectrum so a small yaw still
// walks the metal through a full prism instead of repeating two hues.
const RING: { az: number; el: number; color: string }[] = [
  { az: -90, el: 18, color: RED },
  { az: -68, el: 8, color: ORANGE },
  { az: -46, el: 22, color: YELLOW },
  { az: -24, el: 6, color: GREEN },
  { az: -6, el: 20, color: CYAN },
  { az: 12, el: 8, color: AZURE },
  { az: 34, el: 24, color: VIOLET },
  { az: 56, el: 6, color: MAGENTA },
  { az: 78, el: 16, color: RED },
  { az: 98, el: 28, color: ORANGE },
  { az: 0, el: -30, color: YELLOW },
  { az: 180, el: 16, color: VIOLET },
];

function ringPos(az: number, el: number, r = 2.1): [number, number, number] {
  const a = (az * Math.PI) / 180;
  const e = (el * Math.PI) / 180;
  return [r * Math.cos(e) * Math.sin(a), r * Math.sin(e), r * Math.cos(e) * Math.cos(a)];
}

// Every H1-2 joint turns about one basis axis of its own body frame, and every
// joint sits at the body origin, so rotating the node *is* driving the joint.
// Taken straight from h1_2_handless.xml.
const AXIS: Record<string, "x" | "y" | "z"> = {
  hip_yaw: "z",
  hip_pitch: "y",
  hip_roll: "x",
  knee: "y",
  ankle_pitch: "y",
  ankle_roll: "x",
  torso: "z",
  shoulder_pitch: "y",
  shoulder_roll: "x",
  shoulder_yaw: "z",
  elbow: "y",
  wrist_roll: "x",
  wrist_pitch: "y",
  wrist_yaw: "z",
};

function axisOf(body: string): "x" | "y" | "z" | null {
  const joint = body.replace(/^(left|right)_/, "").replace(/_link$/, "");
  return AXIS[joint] ?? null;
}

// The idle loop, in radians on top of the model's zero pose (which is already a
// clean standing pose). Deliberately small: a weight shift through the torso, a
// breath, and arms that swing slightly out of phase.
function idleAngle(body: string, t: number): number {
  switch (body) {
    case "torso_link":
      return Math.sin(t * 0.31) * 0.09;
    case "left_shoulder_pitch_link":
      return Math.sin(t * 0.62) * 0.07;
    case "right_shoulder_pitch_link":
      return Math.sin(t * 0.62 + 2.3) * 0.07;
    case "left_shoulder_roll_link":
      return 0.06 + Math.sin(t * 0.47) * 0.03;
    case "right_shoulder_roll_link":
      return -0.06 - Math.sin(t * 0.47 + 1.1) * 0.03;
    case "left_elbow_link":
      return 0.16 + Math.sin(t * 0.62 + 0.6) * 0.05;
    case "right_elbow_link":
      return 0.16 + Math.sin(t * 0.62 + 2.9) * 0.05;
    case "left_hip_pitch_link":
    case "right_hip_pitch_link":
      return Math.sin(t * 0.55) * 0.015;
    case "left_knee_link":
      return 0.05 + Math.sin(t * 0.55) * 0.02;
    case "right_knee_link":
      return 0.05 + Math.sin(t * 0.55 + 1.4) * 0.02;
    default:
      return 0;
  }
}

type Driven = { node: THREE.Object3D; rest: THREE.Quaternion; axis: "x" | "y" | "z"; name: string };

// Brushed metal needs something to reflect or it reads as a flat silhouette.
// RoomEnvironment is bundled with three, so this is a studio lightbox generated
// on the GPU at runtime rather than an HDR fetched over the network.
function StudioEnvironment() {
  const gl = useThree((s) => s.gl);

  const texture = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const generated = pmrem.fromScene(room, 0.04).texture;
    room.dispose();
    pmrem.dispose();
    return generated;
  }, [gl]);

  useEffect(() => () => texture.dispose(), [texture]);

  // `attach` hands the texture to the parent scene's `environment` slot, so the
  // scene object itself is never mutated by hand.
  return <primitive object={texture} attach="environment" />;
}

function Robot({ animate, dark }: { animate: boolean; dark: boolean }) {
  const { scene } = useGLTF(MODEL);
  const turntable = useRef<THREE.Group>(null);
  const clock = useRef(0);

  // Re-light the hardware. The MJCF ships everything at rgba 0.1, which is
  // invisible on a dark page, so the body becomes a brighter dark metal that
  // picks up the green rim light.
  const driven = useMemo(() => {
    const list: Driven[] = [];
    const delta = new THREE.Quaternion();

    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.castShadow = false;
        o.receiveShadow = false;
        return;
      }
      const axis = axisOf(o.name);
      if (axis) {
        list.push({ node: o, rest: o.quaternion.clone(), axis, name: o.name });
      }
    });

    // Hold the opening frame in the posed position rather than the raw zero
    // pose, so the first paint already looks deliberate.
    for (const d of list) {
      const angle = idleAngle(d.name, 0);
      if (angle === 0) continue;
      delta.setFromAxisAngle(
        new THREE.Vector3(d.axis === "x" ? 1 : 0, d.axis === "y" ? 1 : 0, d.axis === "z" ? 1 : 0),
        angle,
      );
      d.node.quaternion.copy(d.rest).multiply(delta);
    }

    return list;
  }, [scene]);

  // The MJCF ships every link as flat matte rgba 0.1, which renders as a dead
  // silhouette. Both themes get the same dark machined body; on the dark page
  // the form is carried by the rim lights and sharper specular rather than by
  // lightening the paint, which is what made it look washed out before.
  useEffect(() => {
    scene.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      const mat = o.material as THREE.MeshStandardMaterial;
      const isLogo = o.name.includes("logo");
      if (isLogo) {
        mat.color.set(dark ? "#f4f7f9" : "#20262b");
        mat.metalness = 0.2;
        mat.roughness = 0.5;
        mat.envMapIntensity = 1;
      } else {
        mat.color.set(dark ? "#4a555f" : "#434d56");
        // Held back from full metal on purpose: at metalness ~0.8 the body
        // reflects almost no diffuse light, so the directional lights only
        // produce thin specular slivers and the rims stop reading.
        mat.metalness = dark ? 0.58 : 0.6;
        mat.roughness = dark ? 0.3 : 0.32;
        mat.envMapIntensity = dark ? 1.15 : 0.7;
      }
      mat.needsUpdate = true;
    });
  }, [scene, dark]);

  const delta = useMemo(() => new THREE.Quaternion(), []);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    if (!animate) return;
    clock.current += Math.min(dt, 0.05);
    const t = clock.current;

    for (const d of driven) {
      const angle = idleAngle(d.name, t);
      if (angle === 0) continue;
      vec.set(d.axis === "x" ? 1 : 0, d.axis === "y" ? 1 : 0, d.axis === "z" ? 1 : 0);
      delta.setFromAxisAngle(vec, angle);
      d.node.quaternion.copy(d.rest).multiply(delta);
    }

    if (turntable.current) {
      // A slow sweep rather than a full spin, so the robot always faces you.
      turntable.current.rotation.y = BASE_YAW + Math.sin(t * 0.22) * 0.42;
    }
  });

  return (
    <>
      <StudioEnvironment />
      <hemisphereLight
        intensity={dark ? 0.2 : 0.38}
        color="#d5dde2"
        groundColor={dark ? "#0b1220" : "#6b7480"}
      />
      <directionalLight position={[2.4, 4.2, 5]} intensity={dark ? 1 : 1.7} />
      {RING.map(({ az, el, color }) => (
        <directionalLight
          key={`${az}:${el}:${color}`}
          position={ringPos(az, el)}
          intensity={dark ? 2.4 : 1.15}
          color={color}
        />
      ))}

      <group ref={turntable} rotation={[0, BASE_YAW, 0]}>
        {/* MuJoCo is Z-up and the pelvis sits at z=1.03, so rotate into Y-up and
            drop the model to centre the standing figure on the origin. */}
        <group position={[0, -0.92, 0]}>
          <primitive object={scene} rotation={[-Math.PI / 2, 0, 0]} />
        </group>
      </group>
    </>
  );
}

export default function RobotCoreScene() {
  const reduce = useReducedMotion();
  const dark = useIsDark();
  const animate = !reduce;

  return (
    <Canvas
      camera={{ position: [0.6, 0.25, 4.1], fov: 30 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      frameloop={animate ? "always" : "demand"}
    >
      <Suspense fallback={null}>
        <Robot animate={animate} dark={dark} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL);
