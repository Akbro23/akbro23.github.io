"use client";

import Section, { SectionHeading } from "@/components/section";
import stackIcon from "@iconify-icons/basil/stack-outline";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "motion/react";

const categories = [
  {
    name: "Languages",
    skills: ["Python", "C", "C++", "JavaScript", "TypeScript", "Matlab"],
  },
  {
    name: "AI",
    skills: [
      "LangChain",
      "PyTorch",
      "Scikit-Learn",
      "Numpy",
      "Pandas",
      "Weights & Biases",
    ],
  },
  {
    name: "Robotics",
    skills: ["ROS2", "LeRobot", "MuJoCo"],
  },
  {
    name: "Backend",
    skills: ["Django", "FastAPI", "Firebase", "Kafka"],
  },
  {
    name: "Frontend",
    skills: ["Next.js", "React", "Three.js", "Tailwind", "Shadcn", "HTML", "CSS"],
  },
  {
    name: "Database",
    skills: ["SQL", "PostgreSQL", "MongoDB", "Redis", "FireStore"],
  },
  {
    name: "DevOps",
    skills: ["Linux", "Git", "GitHub", "Docker"],
  },
];

export default function Skills() {
  const [selected, setSelected] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const filtered = selected
    ? (categories.find((c) => c.name === selected)?.skills ?? [])
    : categories.flatMap((c) => c.skills);

  return (
    <Section id="skills">
      <SectionHeading icon={stackIcon} title="Skills" />

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterPill
          active={!selected}
          onClick={() => setSelected(null)}
          label="All"
        />
        {categories.map((c) => (
          <FilterPill
            key={c.name}
            active={selected === c.name}
            onClick={() => setSelected(c.name)}
            label={c.name}
          />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((skill, i) => (
          <motion.div
            key={`${selected ?? "all"}-${skill}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: Math.min(i * 0.03, 0.3),
              ease: [0.16, 1, 0.3, 1],
            }}
            className="glass glass-hover rounded-xl px-3 py-3 text-center font-mono text-sm text-foreground/85"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-4",
        active
          ? "border border-transparent bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary"
          : "glass text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </Button>
  );
}
