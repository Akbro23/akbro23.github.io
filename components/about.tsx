import Section, { SectionHeading } from "@/components/section";
import Link from "next/link";
import lightningIcon from "@iconify-icons/basil/lightning-outline";
import * as motion from "motion/react-client";
import AboutGraphic from "@/components/about-graphic";

const ease = [0.16, 1, 0.3, 1] as const;

const linkClass =
  "text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary";

export default function About() {
  return (
    <Section id="about">
      <SectionHeading icon={lightningIcon} title="About" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="glass mt-8 rounded-2xl p-6 sm:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-[60ch] space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            I&apos;m a Master&apos;s student in Computer Science at{" "}
            <Link href="https://www.kit.edu/" target="_blank" className={linkClass}>
              Karlsruhe Institute of Technology
            </Link>
            , going deep on AI and robotics. Before that I earned my
            Bachelor&apos;s in Computer Engineering at{" "}
            <Link href="https://www.metu.edu.tr/" target="_blank" className={linkClass}>
              Middle East Technical University
            </Link>{" "}
            in Turkey, with an exchange semester at the{" "}
            <Link
              href="https://www.ualberta.ca/"
              target="_blank"
              className={linkClass}
            >
              University of Alberta
            </Link>{" "}
            in Canada.
          </p>
          <p>
            Previously I worked at{" "}
            <Link href="https://technarts.com/" target="_blank" className={linkClass}>
              TechNarts
            </Link>{" "}
            as a software engineer across backend and frontend. I also interned
            at{" "}
            <Link
              href="https://www.bekocorporate.com/"
              target="_blank"
              className={linkClass}
            >
              Beko
            </Link>
            , where I built a Python tool that replaced a tedious manual
            workflow.
          </p>
          </div>

          <div className="hidden lg:flex lg:justify-center lg:pl-4">
            <AboutGraphic />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
