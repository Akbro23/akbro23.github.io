import Section from "@/components/section";
import Link from "next/link";

const educationData = [
  {
    name: "Karlsruhe Institute of Technology",
    href: "https://www.kit.edu/",
    degree: "MSc Computer Science",
    date: "Oct 2025 - Sep 2027",
    location: "Karlsruhe, Germany",
  },
  {
    name: "Middle East Technical University",
    href: "https://www.metu.edu.tr/",
    degree: "BSc Computer Engineering",
    date: "Sep 2021 - Jun 2025",
    location: "Ankara, Turkey",
  },
  {
    name: "University of Alberta",
    href: "https://www.ualberta.ca/",
    degree: "Exchange Program",
    date: "Sep 2023 - Dec 2023",
    location: "Edmonton, Canada",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-32">
      <Section>
        <h2 className="text-center font-bold text-4xl">Education</h2>
        <div className="mt-16">
          <div className="flex flex-col gap-12">
            {educationData.map((edu) => (
              <EducationCard
                key={edu.name}
                name={edu.name}
                href={edu.href}
                degree={edu.degree}
                date={edu.date}
                location={edu.location}
              />
            ))}
          </div>
        </div>
      </Section>
    </section>
  );
}

const EducationCard = ({
  name,
  href,
  degree,
  date,
  location,
}: {
  name: string;
  href: string;
  degree: string;
  date: string;
  location: string;
}) => (
  <div className="flex flex-col lg:flex-row justify-between">
    <div>
      <Link href={href} target="_blank">
        <h3 className="text-2xl font-semibold text-primary underline hover:no-underline transition">
          {name}
        </h3>
      </Link>
      <p className="mt-2">{degree}</p>
    </div>
    <div className="lg:text-right">
      <p>{date}</p>
      <p className="text-muted-foreground">{location}</p>
    </div>
  </div>
);
