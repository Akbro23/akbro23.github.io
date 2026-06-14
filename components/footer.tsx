import SocialLinks from "@/components/social-links";

export default function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4 border-t border-border pt-10 sm:items-start">
        <div className="w-full max-w-[10rem]">
          <SocialLinks compact />
        </div>

        <p className="meta">© {new Date().getFullYear()} Akbar Tokochev</p>
      </div>
    </footer>
  );
}
