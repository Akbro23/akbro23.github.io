import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className="relative grid grid-cols-4 bg-linear-to-br from-background-light to-background rounded-2xl *:py-6 *:lg:py-10 shadow border overflow-hidden *:hover:bg-background-light hover:shadow-lg transition *:transition">
      <Link href="https://github.com/Akbro23" target="_blank">
        <div className="relative w-8 h-8 mx-auto">
          <Image
            src="/github-logo-white.svg"
            alt="GitHub"
            fill
            className="object-contain"
          />
        </div>
      </Link>
      <Link href="https://de.linkedin.com/in/akbartokochev" target="_blank">
        <div className="relative w-8 h-8 mx-auto">
          <Image
            src="/linkedin-logo.png"
            alt="Linkedin"
            fill
            className="object-contain"
          />
        </div>
      </Link>
      <Link href="https://t.me/AkbarT23" target="_blank">
        <div className="relative w-8 h-8 mx-auto">
          <Image
            src="/telegram-logo.svg"
            alt="Telegram"
            fill
            className="object-contain"
          />
        </div>
      </Link>
      <Link
        href="mailto:atokochev@gmail.com"
        className="flex flex-col justify-center items-center"
      >
        <Mail className="w-8 h-8" />
      </Link>
    </div>
  );
}
