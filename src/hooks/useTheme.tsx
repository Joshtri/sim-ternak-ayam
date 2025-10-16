import { useEffect, useState } from "react";

const THEME_KEY = "theme"; // Single source of truth

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(THEME_KEY);

        return saved === "dark" || saved === "light" ? saved : "light";
      } catch {
        return "light";
      }
    }

    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    // Only add 'dark' class when dark mode, remove it for light mode
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save to localStorage with error handling
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Silently fail if localStorage is not available
    }

    // Remove HeroUI's theme key if it exists (cleanup)
    try {
      localStorage.removeItem("heroui-theme");
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [theme]);

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
  };

  return { theme, setTheme, toggleTheme };
}
