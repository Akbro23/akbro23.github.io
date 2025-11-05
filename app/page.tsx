import Hero from "@/components/hero";
import BackgroundLines from "@/components/background-lines";
import About from "@/components/about";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Skills from "@/components/skills";


export default function Home() {
  return (
    <div className="relative mx-auto max-w-6xl shadow-lg bg-background divide-y">
      <BackgroundLines />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
    </div>
  );
}
