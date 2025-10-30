"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // for hamburger icon

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Games", href: "/games" },
    // { name: "Music", href: "/music" },
  ];

  return (
    <header className="sticky top-0 left-0 w-full bg-purple-100 backdrop-blur-md border-b border-gray-200 shadow-sm z-90">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Site name */}
        <Link
          href="/"
          className="text-xl font-semibold hover:text-purple-700 transition-colors"
        >
          Zachary Aamold
        </Link>

        {/* Desktop Nav */}
        <nav className="md:flex hidden space-x-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-purple-700 text-white shadow-sm"
                    : "hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 shadow-inner">
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)} // close menu on click
                    className={`block px-6 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-purple-700 text-white"
                        : "hover:bg-purple-100 hover:text-purple-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
