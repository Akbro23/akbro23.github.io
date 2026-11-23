// Background options: TechBackground (grid + Strands) or KalpakBackground (dot ornament).
// import TechBackground from "@/components/tech-background";
// import KalpakBackground from "@/components/kalpak-background";
// Hero options: RobotCore (3D H1-2) or KalpakEmblem (dot ornament). With the
// emblem, leave KalpakBackground off so the motif doesn't appear twice.
// import RobotCore from "@/components/robot-core";
import KalpakEmblem from "@/components/kalpak-emblem";
import Education from "@/components/education";
import SocialLinks from "@/components/social-links";
import * as motion from "motion/react-client";

const ease = [0.16, 1, 0.3, 1] as const;

// Single centred column sized to one desktop screen. `min-h-dvh` with centred
// justification keeps it one page where there is room and lets it scroll
// instead of clipping on short or zoomed viewports.
export default function Home() {
  return (
    <>
      {/* <KalpakBackground /> */}
      <main className="relative mx-auto flex min-h-dvh w-full max-w-xl flex-col items-center justify-center gap-4 px-4 pb-8 pt-14 text-center sm:gap-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
          className="w-full"
        >
          <KalpakEmblem />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Akbar Tokochev
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.45 }}
          className="max-w-[56ch] text-balance leading-relaxed text-muted-foreground"
        >
          MSc Computer Science at KIT, with experience in full-stack, AI, and
          robotics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.6 }}
          className="w-full max-w-xs"
        >
          <SocialLinks compact />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.75 }}
          className="w-full"
        >
          <Education />
        </motion.div>
      </main>
    </>
  );
}
