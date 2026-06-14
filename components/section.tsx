import { ReactNode } from "react";
import { Icon, type IconifyIcon } from "@iconify/react";
import { cn } from "@/lib/utils";

// Semantic section wrapper: stable anchor id, scroll offset for the fixed nav,
// and consistent vertical rhythm. Panels/cards are applied by each section so
// no two sections share an identical layout.
export default function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-28 py-16 sm:py-24", className)}
    >
      {children}
    </section>
  );
}

// Section heading: a small glass-tile icon plus the title. No section-number
// eyebrow, no status dot. The icon carries the topic; the title carries the rest.
export function SectionHeading({
  icon,
  title,
}: {
  icon: IconifyIcon;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon icon={icon} className="size-8 shrink-0 text-primary" />
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
