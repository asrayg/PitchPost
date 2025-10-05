"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔹 Add subtle shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ href, label }) => (
    <Link
      href={href}
      className="relative text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition group"
    >
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-all ${
        scrolled
          ? "bg-white/70 dark:bg-neutral-900/70 shadow-md"
          : "bg-white/50 dark:bg-neutral-900/50 border-b border-gray-200/50 dark:border-neutral-800/50"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* 🔹 Logo + Title */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/pitchpost_logo.png"
            alt="PitchPost logo"
            className="h-9 w-9 rounded-lg shadow-sm"
          />
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Pitch<span className="text-blue-600">Post</span>
          </h1>
        </Link>

        {/* 🔹 Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#upcoming" label="Upcoming" />
          <NavLink href="#past" label="Past" />
          <NavLink href="#map" label="Map" />

          <a
            href="https://forms.gle/Ujare6w8eHNj7K8GA"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-lg shadow hover:opacity-90 hover:shadow-lg transition"
          >
            Submit
          </a>
        </nav>

        {/* 🔹 Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* 🔹 Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-t border-gray-200 dark:border-neutral-800 flex flex-col px-6 py-4 space-y-3">
          <Link
            href="#upcoming"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Upcoming
          </Link>
          <Link
            href="#past"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Past
          </Link>
          <Link
            href="#map"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Map
          </Link>
          <a
            href="https://forms.gle/Ujare6w8eHNj7K8GA"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg text-center shadow hover:opacity-90 transition"
          >
            Submit
          </a>
        </div>
      </div>
    </header>
  );
}
