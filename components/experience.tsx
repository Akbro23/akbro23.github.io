import Section, { SectionHeading } from "@/components/section";
import bagIcon from "@iconify-icons/basil/bag-outline";
import Link from "next/link";
import * as motion from "motion/react-client";

const ease = [0.16, 1, 0.3, 1] as const;

const experienceData = [
  {
    company: "TechNarts",
    href: "https://technarts.com/",
    positions: [
      {
        name: "Software Engineer",
        duration: "Nov 2024 - Oct 2025",
        location: "Ankara, Turkey",
        highlights: [
          "Worked on network device management app using Django, React, Kafka, Redis, PostgreSQL, and Docker",
          "Built an event-driven email notification system with Kafka and Django for real-time task status alerts",
          "Developed parsers for vendor APIs to extract and store structured network device data across thousands of entries",
          "Led migration of a project to a new internal library, enabling code reuse and reducing development time",
          "Modeled new database schemas and implemented corresponding frontend views to meet client requirements",
        ],
      },
      {
        name: "Software Engineer Intern",
        duration: "Jul 2024 - Jul 2024",
        location: "Ankara, Turkey",
        highlights: [
          "Built a Django app that lets users review restaurant meals and receive personalized recommendations",
          "Automated model retraining with Celery and Redis to keep recommendations up to date with new reviews",
          "Containerized all services using Docker Compose for a reproducible development environment",
        ],
      },
    ],
  },
  {
    company: "Beko",
    href: "https://www.bekocorporate.com/",
    positions: [
      {
        name: "Software Engineer Intern",
        duration: "Jul 2023 - Aug 2023",
        location: "Ankara, Turkey",
        highlights: [
          "Reduced a 10-minute manual workflow to a single click by building a Python GUI app",
          "Automated manual data entry from Excel files using Robotic Process Automation",
          "Eliminated N+1 database bottleneck in legacy code, driving a 36x runtime improvement (3 min → 5 sec)",
        ],
      },
    ],
  },
];

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading icon={bagIcon} title="Experience" />

      <div className="mt-10 flex flex-col gap-12">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease, delay: index * 0.06 }}
            className="grid gap-5 lg:grid-cols-[13rem_1fr] lg:gap-10"
          >
            <div className="lg:pt-1">
              <Link href={exp.href} target="_blank" rel="noopener noreferrer">
                <h3 className="text-xl font-semibold tracking-tight transition-colors hover:text-primary">
                  {exp.company}
                </h3>
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {exp.positions.map((pos) => (
                <div
                  key={pos.name + pos.duration}
                  className="glass glass-hover rounded-2xl p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <p className="font-semibold">{pos.name}</p>
                    <div className="shrink-0 sm:text-right">
                      <span className="meta">{pos.duration}</span>
                      <span className="meta block sm:mt-0.5">
                        {pos.location}
                      </span>
                    </div>
                  </div>
                  <ul className="mt-4 flex flex-col gap-2">
                    {pos.highlights.map((hi) => (
                      <li
                        key={hi}
                        className="relative pl-5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="absolute left-0 top-[0.6em] size-1.5 rounded-[2px] bg-primary" />
                        {hi}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
