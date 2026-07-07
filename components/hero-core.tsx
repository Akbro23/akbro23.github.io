"use client";

import dynamic from "next/dynamic";

// WebGL is client-only: ssr:false keeps it out of the static prerender so there
// is no window/document access during export. A glass ring stands in while the
// scene chunk loads.
const HeroCoreScene = dynamic(() => import("./hero-core-scene"), {
  ssr: false,
  loading: () => <div className="glass absolute inset-[6%] rounded-full" />,
});

export default function HeroCore() {
  return (
    <div
      aria-hidden
      className="relative aspect-square w-full max-w-[27rem] place-self-center lg:max-w-[34rem]"
    >
      {/* Framing ring behind the transparent canvas */}
      <div className="glass pointer-events-none absolute inset-[6%] rounded-full opacity-70" />
      <HeroCoreScene />
    </div>
  );
}
