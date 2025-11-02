import Hero from "@/components/hero";
import BackgroundLines from "@/components/background-lines";


export default function Home() {
  return (
    <div className="relative mx-auto max-w-6xl shadow-lg bg-background">
      <BackgroundLines />
      <Hero />
    </div>
  );
}
