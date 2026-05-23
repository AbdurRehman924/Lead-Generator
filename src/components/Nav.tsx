"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <nav className="fixed top-0 w-full z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold tracking-tight">
          <span className="text-gray-400">[ </span>
          <span className="text-gray-900 dark:text-white">Cinch</span>
          <span className="text-gray-400"> ]</span>
        </Link>
        <div className="flex items-center gap-4">
          <a href="https://github.com/AbdurRehman924" className="text-xs sm:text-sm tracking-wider uppercase text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
          <a href="https://artariq.dev" className="text-xs sm:text-sm tracking-wider uppercase text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Portfolio</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
