import AboutPathfinding from "@/components/about-pathfinding";

// Framed A* path-planning visual beside the About bio.
export default function AboutVisual() {
  return (
    <div className="relative aspect-square w-full max-w-[20rem] place-self-center">
      <div className="glass absolute inset-0 rounded-2xl" />
      <div className="absolute inset-0 p-3">
        <AboutPathfinding />
      </div>
    </div>
  );
}
