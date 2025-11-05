import Section from "@/components/section";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

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
          "Reduced Django app container build time by 37% by proposing and adopting UV package manager",
          "Synchronized PostgreSQL with DGraph by utilizing Debezium and creating custom Kafka sink connector",
          "Led migration of a project to a new internal library, enabling code reuse and reducing development time",
          "Developed email notification system using Kafka and Django commands to alert about task statuses",
        ],
      },
      {
        name: "Software Engineer Intern",
        duration: "Jul 2024 - Jul 2024",
        location: "Ankara, Turkey",
        highlights: [
          "Developed Django app for personalized restaurant meal recommendations",
          "Integrated recommendation model using Surprise library",
          "Configured periodic model retraining using Celery",
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
        highlights: [
          "Automated manual dishwasher software process, reducing the time by 93% from 15 minutes to 1 minute, by developing Python GUI app",
          "Optimized header generation app by 97% from 3 minutes to 5 seconds by reducing number of database calls",
          "Developed new features for existing apps to make them automation friendly",
        ],
        duration: "Jul 2023 - Aug 2023",
        location: "Ankara, Turkey",
      },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32">
      <Section>
        <div className="flex items-center justify-center gap-4 mx-auto">
          <BriefcaseBusiness className="w-10 h-10" />
          <h2 className="font-bold text-2xl lg:text-4xl">Experience</h2>
        </div>
        <div className="mt-16 flex flex-col gap-16">
          {experienceData.map((exp, index) => (
            <ExperienceCard
              key={index}
              company={exp.company}
              href={exp.href}
              positions={exp.positions}
            />
          ))}
        </div>
      </Section>
    </section>
  );
}

const ExperienceCard = ({
  company,
  href,
  positions,
}: {
  company: string;
  href: string;
  positions: {
    name: string;
    duration: string;
    location: string;
    highlights: string[];
  }[];
}) => (
  <div>
    <Link href={href} target="_blank">
      <h3 className="inline text-xl lg:text-2xl font-semibold text-primary underline hover:no-underline transition">
        {company}
      </h3>
    </Link>
    <div className="mt-4 flex flex-col gap-8">
      {positions.map((position, index) => (
        <div key={index} className="flex flex-col gap-2 lg:gap-0">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
            <p className="font-semibold">{position.name}</p>
            <div className="lg:text-right whitespace-nowrap">
              <p>{position.duration}</p>
              <p className="text-sm text-muted-foreground">
                {position.location}
              </p>
            </div>
          </div>
          <ul className="pl-4 list-disc text-muted-foreground text-sm space-y-1 lg:w-3/4">
            {position.highlights.map((hi, i) => (
              <li key={i}>{hi}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);
