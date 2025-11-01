import Hero from "@/components/hero";
import BackgroundLines from "@/components/background-lines";

export default function Home() {
  return (
    <section className="relative mx-auto max-w-6xl shadow-lg bg-background">
      <BackgroundLines />

      <Hero />
    </section>
  );
}
