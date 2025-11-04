"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  {
    href: "#about",
    name: "About",
  },
  {
    href: "#",
    name: "Skills",
  },
  {
    href: "#education",
    name: "Education",
  },
  {
    href: "#experience",
    name: "Experience",
  },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full z-20">
      <div className="mt-2 py-4 px-2 relative max-w-5xl mx-2 lg:mx-auto z-10 border rounded-2xl bg-background/50 backdrop-blur-lg">
        <div className="hidden lg:flex justify-center items-center gap-8 text-sm text-muted-foreground">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>
        <div
          className="lg:hidden flex flex-col gap-6"
          data-state={isOpen ? "active" : "inactive"}
        >
          <div className="flex justify-end items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => setIsOpen((prev) => !prev)}>
              <X className="absolute scale-0 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-180 transition-transform" />
              <Menu className="scale-100 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 transition-transform" />
            </Button>
          </div>

          <div className="hidden in-data-[state=active]:flex flex-col gap-4 mx-auto w-fit py-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
