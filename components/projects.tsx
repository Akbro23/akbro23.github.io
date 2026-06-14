import Section, { SectionHeading } from '@/components/section';
import { Icon } from '@iconify/react';
import appsIcon from '@iconify-icons/basil/apps-outline';
import arrowUpIcon from '@iconify-icons/basil/arrow-up-outline';
import Link from 'next/link';
import * as motion from 'motion/react-client';

const ease = [0.16, 1, 0.3, 1] as const;

type Project = {
  name: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  video?: string;
  poster?: string;
};

const projectsData: Project[] = [
  {
    name: 'LIPM Walking Visualizer',
    description:
      'Interactive 3D visualizer of the Linear Inverted Pendulum Model for humanoid robot walking pattern generation.',
    techStack: ['Next.js', 'Three.js', 'TypeScript'],
    demoUrl: 'https://lipm-visualization.vercel.app/',
    video: '/projects/lipm.mp4',
  },
];

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        icon={appsIcon}
        title="Projects"
      />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease, delay: index * 0.08 }}
      className="glass glass-hover flex flex-col gap-4 rounded-2xl p-6"
    >
      {project.video && (
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-background-dark">
          <video
            src={project.video}
            poster={project.poster}
            className="size-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border bg-background-light/50 px-2 py-1 font-mono text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {(project.demoUrl || project.githubUrl) && (
        <div className="mt-auto flex flex-wrap gap-4 pt-2">
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-light"
            >
              Live Demo
              <Icon
                icon={arrowUpIcon}
                className="size-4 rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-light"
            >
              GitHub
              <Icon
                icon={arrowUpIcon}
                className="size-4 rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}
