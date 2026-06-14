import Section, { SectionHeading } from "@/components/section";
import universityIcon from "@iconify-icons/basil/university-outline";
import Link from "next/link";
import * as motion from "motion/react-client";

const ease = [0.16, 1, 0.3, 1] as const;

const educationData = [
  {
    name: "Karlsruhe Institute of Technology",
    href: "https://www.kit.edu/",
    degree: "MSc Computer Science",
    highlights: [],
    duration: "Oct 2025 - Sep 2027",
    location: "Karlsruhe, Germany",
  },
  {
    name: "Middle East Technical University",
    href: "https://www.metu.edu.tr/",
    degree: "BSc Computer Engineering",
    highlights: ["GPA: 3.62 / 4.00", "100% merit-based scholarship"],
    duration: "Sep 2021 - Jun 2025",
    location: "Ankara, Turkey",
  },
  {
    name: "University of Alberta",
    href: "https://www.ualberta.ca/",
    degree: "Exchange Program",
    highlights: ["GPA: 3.7 / 4.0"],
    duration: "Sep 2023 - Dec 2023",
    location: "Edmonton, Canada",
  },
];

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading icon={universityIcon} title="Education" />

      <div className="relative mt-10">
        {/* Timeline rail */}
        <div className="absolute bottom-3 left-[8px] top-3 w-px bg-border" />

        <div className="flex flex-col gap-5">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease, delay: index * 0.08 }}
              className="relative pl-9 sm:pl-12"
            >
              {/* Node */}
              <span
                className={
                  "absolute left-0 top-6 size-[17px] rounded-full border-2 " +
                  (index === 0
                    ? "border-primary bg-primary"
                    : "border-primary bg-background-dark")
                }
              />

              <div className="glass glass-hover rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <Link href={edu.href} target="_blank" rel="noopener noreferrer">
                      <h3 className="text-lg font-semibold tracking-tight transition-colors hover:text-primary sm:text-xl">
                        {edu.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-muted-foreground">{edu.degree}</p>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <p className="meta">{edu.duration}</p>
                    <p className="meta mt-0.5">{edu.location}</p>
                  </div>
                </div>
                {edu.highlights.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {edu.highlights.map((hi) => (
                      <li
                        key={hi}
                        className="rounded-md border border-border bg-background-light/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {hi}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
