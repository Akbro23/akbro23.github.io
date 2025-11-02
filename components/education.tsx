import Section from "@/components/section";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

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
    highlights: [
      "GPA: 3.62 / 4.00 (4.00 is the best)",
      "100% merit-based scholarship",
    ],
    duration: "Sep 2021 - Jun 2025",
    location: "Ankara, Turkey",
  },
  {
    name: "University of Alberta",
    href: "https://www.ualberta.ca/",
    degree: "Exchange Program",
    highlights: ["GPA: 3.7 / 4.0 (4.0 is the best)"],
    duration: "Sep 2023 - Dec 2023",
    location: "Edmonton, Canada",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-32">
      <Section>
        <div className="flex items-center justify-center gap-4 mx-auto">
          <GraduationCap className="w-10 h-10" />
          <h2 className="font-bold text-2xl lg:text-4xl">Education</h2>
        </div>

        <div className="mt-16 flex flex-col gap-12">
          {educationData.map((edu) => (
            <EducationCard
              key={edu.name}
              name={edu.name}
              href={edu.href}
              degree={edu.degree}
              highlights={edu.highlights}
              duration={edu.duration}
              location={edu.location}
            />
          ))}
        </div>
      </Section>
    </section>
  );
}

const EducationCard = ({
  name,
  href,
  degree,
  highlights,
  duration,
  location,
}: {
  name: string;
  href: string;
  degree: string;
  highlights: string[];
  duration: string;
  location: string;
}) => (
  <div className="flex flex-col lg:flex-row justify-between gap-1">
    <div>
      <Link href={href} target="_blank">
        <h3 className="text-xl lg:text-2xl font-semibold text-primary underline hover:no-underline transition">
          {name}
        </h3>
      </Link>
      <p className="mt-2 font-semibold">{degree}</p>
      <ul className="pl-4 list-disc text-muted-foreground text-sm">
        {highlights.map((hi, index) => (
          <li key={index}>{hi}</li>
        ))}
      </ul>
    </div>
    <div className="lg:text-right">
      <p>{duration}</p>
      <p className="text-sm text-muted-foreground">{location}</p>
    </div>
  </div>
);
