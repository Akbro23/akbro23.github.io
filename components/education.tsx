import Link from "next/link";

const educationData = [
  {
    name: "Karlsruhe Institute of Technology",
    short: "KIT",
    href: "https://www.kit.edu/",
    degree: "MSc Computer Science",
    duration: "2025 - 2027",
  },
  {
    name: "Middle East Technical University",
    short: "METU",
    href: "https://www.metu.edu.tr/",
    degree: "BSc Computer Engineering",
    duration: "2021 - 2025",
  },
  {
    name: "University of Alberta",
    short: "UAlberta",
    href: "https://www.ualberta.ca/",
    degree: "Exchange semester",
    duration: "2023",
  },
];

// One line per school. The full name is the link on wider screens and the
// abbreviation takes over on narrow ones, so every entry stays on a single row.
export default function Education() {
  return (
    <section id="education" aria-label="Education" className="w-full">
      <ul className="glass divide-y divide-border rounded-2xl text-left">
        {educationData.map((edu) => (
          <li
            key={edu.name}
            className="flex items-baseline justify-between gap-4 px-4 py-2 sm:px-5"
          >
            <span className="min-w-0">
              <Link
                href={edu.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold transition-colors hover:text-primary"
              >
                <span className="sm:hidden">{edu.short}</span>
                <span className="hidden sm:inline">{edu.name}</span>
              </Link>
              <span className="meta ml-2">{edu.degree}</span>
            </span>
            <span className="meta shrink-0">{edu.duration}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
