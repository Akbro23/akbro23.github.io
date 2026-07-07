import Section, { SectionHeading } from "@/components/section";
import { Icon } from "@iconify/react";
import appsIcon from "@iconify-icons/basil/apps-outline";
import arrowUpIcon from "@iconify-icons/basil/arrow-up-outline";
import Link from "next/link";
import * as motion from "motion/react-client";

const ease = [0.16, 1, 0.3, 1] as const;

const featured = {
  name: "LIPM Walking Visualizer",
  description:
    "An interactive 3D visualizer of the Linear Inverted Pendulum Model, the classic simplification behind humanoid walking-pattern generation. Adjust the parameters and watch the center-of-mass trajectory and footstep plan update in real time.",
  techStack: ["Next.js", "Three.js", "TypeScript"],
  demoUrl: "https://lipm-visualization.vercel.app/",
  video: "/projects/lipm.mp4",
};

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading icon={appsIcon} title="Work" />

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 0.85, ease }}
        className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12"
      >
        {/* Media */}
        <div className="glass overflow-hidden rounded-2xl p-2">
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-background-dark">
            <video
              src={featured.video}
              className="size-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </div>

        {/* Editorial text */}
        <div>
          {/* <p className="meta text-primary">Featured project</p> */}
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {featured.name}
          </h3>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-muted-foreground">
            {featured.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {featured.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-background-light/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-6">
            <Link
              href={featured.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-light"
            >
              View live demo
              <Icon
                icon={arrowUpIcon}
                className="size-4 rotate-45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            {/* <Link
              href="https://github.com/Akbro23"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              More on GitHub
              <Icon
                icon={arrowUpIcon}
                className="size-4 rotate-45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link> */}
          </div>
        </div>
      </motion.article>
    </Section>
  );
}
