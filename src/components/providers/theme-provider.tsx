"use client";

import * as React from "react";

type Currency = "VND" | "EUR";
type Locale = "vi" | "en";

type ThemeContextValue = {
  accent: string;
  setAccent: (hex: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  dark: boolean;
  toggleDark: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccent] = React.useState<string>("#1E90FF");
  const [currency, setCurrency] = React.useState<Currency>("VND");
  const [locale, setLocale] = React.useState<Locale>("vi");
  const [dark, setDark] = React.useState(true); // Default to dark mode

  React.useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark;
    
    setDark(shouldBeDark);
  }, []);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [accent, dark]);

  const value: ThemeContextValue = {
    accent,
    setAccent,
    currency,
    setCurrency,
    locale,
    setLocale,
    dark,
    toggleDark: () => setDark((d) => !d),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}


