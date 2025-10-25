import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 mt-12 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-3 text-zinc-900 dark:text-zinc-100">Shop</div>
          <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <Link href="/products" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">All Products</Link>
            <Link href="/collections" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Collections</Link>
            <Link href="/players" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Players</Link>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3 text-zinc-900 dark:text-zinc-100">Support</div>
          <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <div className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">FAQ</div>
            <div className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">Shipping</div>
            <div className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">Returns</div>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3 text-zinc-900 dark:text-zinc-100">Company</div>
          <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <div className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">About</div>
            <div className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">Careers</div>
            <div className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">Press</div>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3 text-zinc-900 dark:text-zinc-100">Newsletter</div>
          <div className="flex gap-2">
            <Input 
              type="email"
              aria-label="Email" 
              placeholder="you@example.com" 
              className="h-10 flex-1" 
            />
            <Button className="h-10 px-4">Join</Button>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <div>© {new Date().getFullYear()} SignAuthentics</div>
          <div className="flex gap-4">
            <div className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">Terms</div>
            <div className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">Privacy</div>
            <div className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">Cookies</div>
          </div>
        </div>
      </div>
    </footer>
  );
}


