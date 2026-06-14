import Hero from "@/components/hero";
import TechBackground from "@/components/tech-background";
import About from "@/components/about";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <>
      <TechBackground />
      <main className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Experience />
      </main>
    </>
  );
}
