import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import envelopeIcon from "@iconify-icons/basil/envelope-outline";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Akbro23",
    external: true,
    icon: (
      <>
        <Image
          src="/github-logo.svg"
          alt=""
          fill
          className="object-contain dark:hidden"
        />
        <Image
          src="/github-logo-white.svg"
          alt=""
          fill
          className="hidden object-contain dark:block"
        />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://de.linkedin.com/in/akbartokochev",
    external: true,
    icon: (
      <Image src="/linkedin-logo.png" alt="" fill className="object-contain" />
    ),
  },
  // Telegram hidden for now (less relevant for this audience).
  // {
  //   label: "Telegram",
  //   href: "https://t.me/AkbarT23",
  //   external: true,
  //   icon: (
  //     <Image src="/telegram-logo.svg" alt="" fill className="object-contain" />
  //   ),
  // },
  {
    label: "Email",
    href: "mailto:atokochev@gmail.com",
    external: false,
    icon: <Icon icon={envelopeIcon} className="size-full text-primary" />,
  },
];

export default function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <ButtonGroup
      className={cn(
        "glass w-full overflow-hidden",
        compact ? "rounded-xl" : "rounded-2xl",
      )}
    >
      {socials.map((social, index) => (
        <Fragment key={social.label}>
          {index > 0 && <ButtonGroupSeparator className="bg-border" />}
          <Button
            asChild
            variant="ghost"
            className={cn("flex-1 rounded-none", compact ? "h-10" : "h-14")}
          >
            <Link
              href={social.href}
              aria-label={social.label}
              {...(social.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className={cn("relative", compact ? "size-4" : "size-6")}>
                {social.icon}
              </span>
            </Link>
          </Button>
        </Fragment>
      ))}
    </ButtonGroup>
  );
}
