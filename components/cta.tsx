import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import envelopeIcon from "@iconify-icons/basil/envelope-outline";
import * as motion from "motion/react-client";

const ease = [0.16, 1, 0.3, 1] as const;

// The single contact-intent CTA on the page. Hero uses "View work", so there is
// no duplicate intent. Centered band, distinct from every other section layout.
export default function Cta() {
  return (
    <section id="contact" className="scroll-mt-28 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 0.85, ease }}
        className="glass mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl px-6 py-14 text-center sm:px-12"
      >
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Have something you want built?
        </h2>
        <p className="max-w-md leading-relaxed text-muted-foreground">
          I&apos;m open to roles and collaborations in AI, robotics, and
          full-stack engineering.
        </p>
        <Button asChild size="lg">
          <Link href="mailto:atokochev@gmail.com">
            <Icon icon={envelopeIcon} className="size-4" />
            Get in touch
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
