"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Icon } from "@iconify/react";
import menuIcon from "@iconify-icons/basil/menu-outline";
import crossIcon from "@iconify-icons/basil/cross-outline";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", name: "About" },
  { href: "#projects", name: "Projects" },
  { href: "#skills", name: "Skills" },
  { href: "#education", name: "Education" },
  { href: "#experience", name: "Experience" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Active-section tracking via IntersectionObserver (no scroll listeners).
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <nav className="glass mx-2 mt-3 rounded-2xl bg-background/85 px-3 py-2.5 sm:px-4 lg:mx-auto lg:max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          {/* Monogram */}
          <Link
            href="#hero"
            className="meta text-sm font-semibold tracking-[0.15em] text-foreground transition-colors hover:text-primary"
            aria-label="Back to top"
          >
            AT<span className="text-primary">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative rounded-lg px-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-primary" />
                  )}
                </Link>
              );
            })}
            <div className="ml-1">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="relative grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-accent"
            >
              <Icon
                icon={menuIcon}
                className={cn(
                  "absolute size-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
                )}
              />
              <Icon
                icon={crossIcon}
                className={cn(
                  "absolute size-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-2 flex flex-col gap-1 border-t border-border pt-3">
                {links.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
