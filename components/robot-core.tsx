"use client";

import dynamic from "next/dynamic";

const RobotCoreScene = dynamic(() => import("./robot-core-scene"), {
  ssr: false,
  loading: () => null,
});

// Portrait box: the H1-2 is a standing figure, so a square canvas would be
// mostly empty air either side of it.
export default function RobotCore() {
  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-[3/4] w-full max-w-[10rem] sm:max-w-[11rem]"
    >
      <RobotCoreScene />
    </div>
  );
}
