import { ThemeToggle } from "./theme-toggle";

// The page is a single screen, so there is nothing to navigate to: the only
// control left is the theme switch.
export default function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-end px-4 py-3 sm:px-6 lg:px-8">
        <ThemeToggle />
      </div>
    </header>
  );
}
