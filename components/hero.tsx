import SocialLinks from "@/components/social-links";
import HeroRobot from "@/components/hero-robot";
import * as motion from "motion/react-client";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="grid min-h-[90dvh] grid-cols-1 items-center gap-10 pt-28 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
    >
      {/* Left: identity + voice */}
      <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-6xl font-bold leading-[0.9] tracking-tight md:text-7xl xl:text-8xl"
        >
          Akbar
          <br />
          Tokochev
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          I build software across AI, robotics, and the full stack. Currently
          deepening the robotics side with an MSc at KIT.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.32 }}
          className="mt-9 w-full max-w-sm"
        >
          <SocialLinks />
        </motion.div>
      </div>

      {/* Right: robot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.14 }}
        className="order-1 flex justify-center lg:order-2 lg:justify-end"
      >
        <HeroRobot />
      </motion.div>
    </section>
  );
}
