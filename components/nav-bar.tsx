import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

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
  return (
    <div className="mt-2 fixed w-full z-20">
      <div className="py-4 px-6 relative max-w-5xl mx-auto z-10 border rounded-2xl bg-background/50 backdrop-blur-lg">
        <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
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
      </div>
    </div>
  );
}
