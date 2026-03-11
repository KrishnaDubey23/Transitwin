"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#technology", label: "Technology" },
  { href: "#impact", label: "Impact" },
  { href: "#demo", label: "Demo" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]"
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold text-[#111111] hover:opacity-80 transition-opacity"
          >
            TransitWin
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#111111] hover:text-[#6B6B6B] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="#demo"
              className="text-sm text-[#111111] hover:text-[#6B6B6B] transition-colors hidden md:block"
            >
              Dashboard
            </Link>
            <Link
              href="#demo"
              className="text-sm text-[#111111] hover:text-[#6B6B6B] transition-colors hidden md:block"
            >
              Login
            </Link>
            <Link
              href="#demo"
              className="hidden sm:inline-flex rounded-full border border-[#111111] bg-white px-5 py-2.5 text-sm font-medium text-[#111111] transition-all hover:bg-[#111111] hover:text-white"
            >
              Find Smart Route
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#111111]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#E5E5E5] overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 text-[#111111] hover:bg-[#FAFAFA]"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#demo"
                  onClick={() => setMobileOpen(false)}
                  className="block mx-4 mt-4 text-center rounded-full border border-[#111111] bg-white py-3 text-sm font-medium text-[#111111] hover:bg-[#111111] hover:text-white"
                >
                  Find Smart Route
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
