"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Site name */}
        <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          Zachary Aamold
        </Link>

        {/* Navigation buttons */}
        <nav className="flex space-x-4">
          <Link
            href="/portfolio"
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all"
          >
            Portfolio
          </Link>
          <Link
            href="/games"
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all"
          >
            Games
          </Link>
          <Link
            href="/music"
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all"
          >
            Music
          </Link>
        </nav>
      </div>
    </header>
  );
}