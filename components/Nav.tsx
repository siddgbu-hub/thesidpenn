"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import themeConfig from "../theme.config";
import Logo from "./Logo";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-[#1a1a18]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo />
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {themeConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-ui text-sm uppercase tracking-widest ${
                  pathname === link.href ? "font-bold text-[#1a1a18]" : "text-[#1a1a18]/70 hover:text-[#1a1a18]"
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1a1a18] hover:text-[#1a1a18]/70 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-[#1a1a18]/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {themeConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-ui ${
                  pathname === link.href ? "font-bold text-[#1a1a18] bg-[#1a1a18]/5" : "text-[#1a1a18]/80 hover:text-[#1a1a18] hover:bg-[#1a1a18]/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
