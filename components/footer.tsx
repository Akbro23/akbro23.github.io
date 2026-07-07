import Link from "next/link";
import SocialLinks from "@/components/social-links";

const navLinks = [
  { href: "#about", name: "About" },
  { href: "#projects", name: "Work" },
  { href: "#education", name: "Education" },
  { href: "#experience", name: "Experience" },
  { href: "#contact", name: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 border-t border-border pt-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-5">
          <Link
            href="#hero"
            className="meta text-sm font-semibold tracking-[0.15em] text-foreground transition-colors hover:text-primary"
            aria-label="Back to top"
          >
            AT<span className="text-primary">.</span>
          </Link>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <p className="meta">© {new Date().getFullYear()} Akbar Tokochev</p>
        </div>

        <div className="w-full max-w-[12rem] sm:w-auto">
          <SocialLinks compact />
        </div>
      </div>
    </footer>
  );
}
