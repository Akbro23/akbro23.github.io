import Hero from "@/components/hero";
import TechBackground from "@/components/tech-background";
import About from "@/components/about";
import Projects from "@/components/projects";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <TechBackground />
      <main className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Swap variant to compare: "editorial" | "centerpiece" */}
        <Hero variant="centerpiece" />
        <About />
        <Projects />
        <Education />
        <Experience />
        <Cta />
      </main>
    </>
  );
}
