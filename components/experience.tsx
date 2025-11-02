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
        highlights: ["Automated", "Developed", "Reduced"],
      },
      {
        name: "Software Engineer Intern",
        duration: "Jul 2024 - Jul 2024",
        location: "Ankara, Turkey",
        highlights: ["Automated", "Developed", "Reduced"],
      },
    ],
  },
  {
    company: "Beko",
    href: "https://www.bekocorporate.com/",
    positions: [
      {
        name: "Software Engineer Intern",
        highlights: ["Automated", "Developed", "Reduced"],
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
        <div className="mt-16 flex flex-col gap-12">
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
    {positions.map((position, index) => (
      <div
        key={index}
        className="mt-4 flex flex-col lg:flex-row justify-between gap-2"
      >
        <div>
          <p>{position.name}</p>
          <ul className="list-disc list-inside text-muted-foreground text-sm">
            {position.highlights.map((hi, index) => (
              <li key={index}>{hi}</li>
            ))}
          </ul>
        </div>
        <div className="lg:text-right">
          <p>{position.duration}</p>
          <p className="text-sm text-muted-foreground">{position.location}</p>
        </div>
      </div>
    ))}
  </div>
);
