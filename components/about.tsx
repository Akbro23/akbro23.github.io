import Section from "@/components/section";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-16">
      <Section>
        <h2 className="text-center font-bold text-4xl">About</h2>
        <div className="mt-16 grid grid-cols-10">
          <p className="col-span-8 col-start-2 text-muted-foreground">
            I am a first-year Master&apos;s student in Computer Science at{" "}
            <Link
              href="https://www.kit.edu/"
              target="_blank"
              className="underline text-primary"
            >
              Karlsruhe Institute of Technology
            </Link>{" "}
            in Germany. Previously, I worked at{" "}
            <Link
              href="https://technarts.com/"
              target="_blank"
              className="underline text-primary"
            >
              TechNarts
            </Link>{" "}
            as a software engineer focusing on both backend and frontend
            development.
            <br />
            <br />I completed my Bachelor&apos;s degree in Computer Engineering
            from{" "}
            <Link
              href="https://www.metu.edu.tr/"
              target="_blank"
              className="underline text-primary"
            >
              Middle East Technical University
            </Link>{" "}
            in Turkey and also spent an exchange semester at the{" "}
            <Link
              href="https://www.ualberta.ca/"
              target="_blank"
              className="underline text-primary"
            >
              University of Alberta
            </Link>{" "}
            in Canada.
          </p>
        </div>
      </Section>
    </section>
  );
}
