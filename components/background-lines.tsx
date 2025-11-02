export default function BackgroundLines() {
  return (
    <div className="absolute inset-0 pointer-events-none flex justify-between no-pad">
      {Array.from({ length: 7 }).map((_, idx) => (
        <div key={idx} className="w-px h-full bg-border/30"></div>
      ))}
    </div>
  );
}
