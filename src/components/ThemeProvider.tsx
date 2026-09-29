"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
});

const THEME_KEY = "biduko-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === "dark" || stored === "light") return stored;
      } catch {}
    }
    return "light";
  });

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch {}

    const targetTheme: Theme = stored === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", targetTheme);
  }, []);

  const applyTheme = useCallback((t: Theme, persist: boolean) => {
    document.documentElement.setAttribute("data-theme", t);
    setTheme(t);
    if (persist) {
      try { localStorage.setItem(THEME_KEY, t); } catch {}
    }
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next, true);
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
