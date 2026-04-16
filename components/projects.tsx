import Section from "@/components/section";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";

type Project = {
  name: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
};

const projectsData: Project[] = [
  {
    name: "AI Flashcards",
    description: "AI-powered flashcards to help with your studies",
    techStack: ["FastAPI", "LangChain", "Next.js"],
    demoUrl: "https://akbro23.github.io/ai-flashcards-frontend/",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32">
      <Section>
        <div className="flex items-center justify-center gap-4 mx-auto">
          <LayoutGrid className="w-10 h-10" />
          <h2 className="font-bold text-2xl lg:text-4xl">Projects</h2>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </Section>
    </section>
  );
}

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: index * 0.1,
      duration: 0.7,
      ease: "easeInOut",
    }}
    viewport={{ once: true }}
    className="w-full md:w-[calc(50%-8px)] bg-linear-to-br from-background-light to-background border rounded-xl p-6 flex flex-col gap-4"
  >
    <div>
      <h3 className="font-semibold text-lg">{project.name}</h3>
      <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
    </div>
    <div className="flex flex-wrap gap-2">
      {project.techStack.map((tech, i) => (
        <span
          key={i}
          className="text-xs border rounded px-2 py-1 text-muted-foreground"
        >
          {tech}
        </span>
      ))}
    </div>
    <div className="mt-auto flex gap-4">
      {project.demoUrl && (
        <Link
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary underline hover:no-underline transition"
        >
          Live Demo →
        </Link>
      )}
      {project.githubUrl && (
        <Link
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary underline hover:no-underline transition"
        >
          GitHub →
        </Link>
      )}
    </div>
  </motion.div>
);
