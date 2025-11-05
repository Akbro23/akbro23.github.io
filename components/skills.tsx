"use client";

import Section from "@/components/section";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = [
  {
    name: "AI",
    skills: ["PyTorch", "Scikit-Learn", "Numpy", "Pandas"],
  },
  {
    name: "Backend",
    skills: ["Django", "FastAPI", "Firebase", "Kafka"],
  },
  {
    name: "Frontend",
    skills: ["Next.js", "React", "Tailwind", "Shadcn", "HTML", "CSS"],
  },
  {
    name: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "FireStore"],
  },
  {
    name: "DevOps",
    skills: ["Git", "GitHub", "Docker"],
  },
  {
    name: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "C++", "C"],
  },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredSkills = selectedCategory
    ? categories.find((category) => category.name === selectedCategory)?.skills
    : categories.flatMap((category) => category.skills);

  return (
    <section id="skills" className="py-32">
      <Section>
        <div className="flex items-center justify-center gap-4 mx-auto">
          <Code2 className="w-10 h-10" />
          <h2 className="font-bold text-2xl lg:text-4xl">Skills</h2>
        </div>
        <div className="mt-16 flex flex-col gap-12">
          <div className="flex flex-wrap gap-4">
            <Button
              variant={`${!selectedCategory ? "default" : "outline"}`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={`${
                  selectedCategory === category.name ? "default" : "outline"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills?.map((skill, index) => (
              <div
                key={index}
                className="border border-primary bg-transparent rounded-lg py-2 text-center hover:bg-input dark:hover:border-input transition text-muted-foreground text-sm"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </section>
  );
}
