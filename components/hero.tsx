import Image from "next/image";
import SocialLinks from "@/components/social-links";

export default function Hero() {
  return (
    <section id="hero" className="relative py-32 md:py-64 grid grid-cols-6">
      <div className="col-span-6 grid grid-cols-1 lg:grid-cols-2 gap-12 place-items-center">
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start gap-y-6 px-8">
          <h1 className="tracking-tight text-6xl md:text-8xl font-bold text-center lg:text-left">
            Akbar Tokochev
          </h1>
          <p className="text-muted-foreground text-2xl md:text-4xl text-center lg:text-left">
            Software Engineer
          </p>
        </div>

        <div className="order-1 lg:order-2 relative w-50 h-50 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow">
          <Image
            src="/me.jpg"
            alt="Akbar Tokochev"
            className="object-cover"
            fill
          />
        </div>
      </div>

      <div className="mt-16 lg:mt-32 col-span-4 col-start-2">
        <SocialLinks />
      </div>
    </section>
  );
}
