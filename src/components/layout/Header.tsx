"use client";
import * as React from "react";
import Link from "next/link";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, ShoppingCart, User, Globe, Coins, Moon, Sun } from "lucide-react";

export default function Header() {
  const { locale, setLocale, currency, setCurrency, dark, toggleDark } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-zinc-900/70 dark:border-zinc-800">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          SignAuthentics
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm text-zinc-700 dark:text-zinc-300">
          {[
            ["Home", "/"],
            ["Players", "/players"],
            ["Clubs", "/clubs"],
            ["Collections", "/collections"],
            ["Auctions", "/auctions"],
            ["News", "/news"],
          ].map(([label, href]) => (
            <Link 
              key={href as string} 
              href={href as string} 
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {label as string}
            </Link>
          ))}
        </nav>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-2">
          <div className="relative flex items-center gap-2">
            <Search className="size-5 text-zinc-500 dark:text-zinc-400" />
            <Input 
              aria-label="Search" 
              placeholder="Search players, clubs..." 
              className="h-10 w-72" 
            />
          </div>
          <Button variant="ghost" aria-label="Wishlist" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
            <Heart className="size-5" />
          </Button>
          <Button variant="ghost" aria-label="Account" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
            <User className="size-5" />
          </Button>
          <Button variant="ghost" aria-label="Cart" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
            <ShoppingCart className="size-5" />
          </Button>
          <Button 
            variant="ghost" 
            aria-label="Toggle locale" 
            onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <Globe className="size-5" />
            <span className="sr-only">Locale</span>
          </Button>
          <Button 
            variant="ghost" 
            aria-label="Toggle currency" 
            onClick={() => setCurrency(currency === "VND" ? "EUR" : "VND")}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <Coins className="size-5" />
            <span className="sr-only">Currency</span>
          </Button>
          <Button 
            variant="ghost" 
            onClick={toggleDark}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            <span className="sr-only">{dark ? "Switch to light mode" : "Switch to dark mode"}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}


