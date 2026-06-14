"use client";

import { Icon } from "@iconify/react";
import sunIcon from "@iconify-icons/basil/sun-outline";
import moonIcon from "@iconify-icons/basil/moon-outline";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {/* Display is driven by the .dark class, so there is no hydration flash. */}
      <Icon icon={sunIcon} className="size-5 dark:hidden" />
      <Icon icon={moonIcon} className="hidden size-5 dark:block" />
    </Button>
  );
}
