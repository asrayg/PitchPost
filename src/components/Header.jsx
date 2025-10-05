"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // lightweight icon set

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/pitchpost_logo.png"
            alt="Pitch Competitions Hub"
            className="h-8 w-8 rounded-md"
          />
          <h1 className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
            PitchPost
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#upcoming"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
          >
            Upcoming
          </Link>
          <Link
            href="#past"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
          >
            Past
          </Link>
          <Link
            href="#map"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
          >
            Map
          </Link>
          <a
            href="https://forms.gle/Ujare6w8eHNj7K8GA"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 px-6 py-3 space-y-3">
          <Link
            href="#upcoming"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600"
          >
            Upcoming
          </Link>
          <Link
            href="#past"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600"
          >
            Past
          </Link>
          <Link
            href="#map"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600"
          >
            Map
          </Link>
          <a
            href="https://forms.gle/Ujare6w8eHNj7K8GA"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </a>
        </div>
      )}
    </header>
  );
}
