import SocialLinks from "@/components/social-links";
import HeroCore from "@/components/hero-core";
import * as motion from "motion/react-client";

const ease = [0.16, 1, 0.3, 1] as const;

// Two hero variants share the same copy. Swap in one line from page.tsx:
//   <Hero variant="editorial" />  or  <Hero variant="centerpiece" />
type HeroVariant = "editorial" | "centerpiece";

function Copy({ align }: { align: "left" | "center" }) {
  const items = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${items}`}>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease, delay: 0.3 }}
        className="mt-4 text-6xl font-bold leading-[0.9] tracking-tight md:text-7xl xl:text-8xl"
      >
        Akbar
        <br />
        Tokochev
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease, delay: 0.55 }}
        className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl"
      >
        I build software across AI, robotics, and the full stack. Now deepening
        the robotics side with an MSc at KIT.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease, delay: 0.8 }}
        className={`mt-9 flex w-full max-w-sm flex-col gap-4 ${
          align === "center" ? "items-center" : "items-start"
        }`}
      >
        <SocialLinks />
      </motion.div>
    </div>
  );
}

export default function Hero({ variant = "editorial" }: { variant?: HeroVariant }) {
  if (variant === "centerpiece") {
    return (
      <section
        id="hero"
        className="grid min-h-[100dvh] grid-cols-1 items-center gap-10 pb-16 pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
      >
        <div className="order-2 lg:order-1">
          <Copy align="left" />
        </div>
        {/* Entrance is opacity/position only. Do NOT animate scale here: it
            scales the WebGL canvas container, so r3f measures it too small and
            the core visibly jumps to full size on first scroll. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, ease, delay: 0.45 }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <HeroCore />
        </motion.div>
      </section>
    );
  }

  // Editorial: name-forward, asymmetric single column.
  return (
    <section
      id="hero"
      className="flex min-h-[100dvh] flex-col justify-center pb-16 pt-24 lg:max-w-3xl"
    >
      <Copy align="left" />
    </section>
  );
}
