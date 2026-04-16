import Section from '@/components/section';
import Link from 'next/link';

export default function About() {
  return (
    <section
      id="about"
      className="py-32"
    >
      <Section>
        <h2 className="text-center font-bold text-2xl lg:text-4xl">About</h2>
        <div className="mt-16">
          <p className="text-muted-foreground">
            I'm a Master&apos;s student in Computer Science at{' '}
            <Link
              href="https://www.kit.edu/"
              target="_blank"
              className="underline text-primary"
            >
              Karlsruhe Institute of Technology
            </Link>
            , where I'm diving deeper into AI and robotics. I completed my
            Bachelor&apos;s degree in Computer Engineering from{' '}
            <Link
              href="https://www.metu.edu.tr/"
              target="_blank"
              className="underline text-primary"
            >
              Middle East Technical University
            </Link>{' '}
            in Turkey, with an exchange semester at the{' '}
            <Link
              href="https://www.ualberta.ca/"
              target="_blank"
              className="underline text-primary"
            >
              University of Alberta
            </Link>{' '}
            in Canada.
            <br />
            <br />
            Previously, I worked at{' '}
            <Link
              href="https://technarts.com/"
              target="_blank"
              className="underline text-primary"
            >
              TechNarts
            </Link>{' '}
            as a software engineer focusing on both backend and frontend
            development. I also interned at{' '}
            <Link
              href="https://www.bekocorporate.com/"
              target="_blank"
              className="underline text-primary"
            >
              Beko
            </Link>
            , where I built a Python tool that eliminated a tedious manual
            workflow
          </p>
        </div>
      </Section>
    </section>
  );
}
