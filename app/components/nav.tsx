"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  isExternal?: boolean;
};

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Achievements", href: "/achievements" },
  { name: "Contact", href: "/#contact" },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 pt-6`}
    >
      <div className={`max-w-7xl mx-auto rounded-2xl border transition-all duration-300 px-6 py-4 flex items-center justify-between shadow-2xl ${
        isScrolled 
          ? "bg-zinc-950/80 backdrop-blur-lg border-zinc-800/80 shadow-black/40" 
          : "bg-zinc-900/30 backdrop-blur-md border-zinc-900/60 shadow-black/20"
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            frankazastain.dev
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm transition-colors flex items-center gap-0.5 group ${
                  isActive 
                    ? "text-emerald-400 font-medium" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span translate="no" className="notranslate">{item.name}</span>
                {item.href.startsWith("http") && (
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors duration-200 focus:outline-none border border-transparent hover:border-zinc-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 px-2">
          <div className="flex flex-col space-y-2 p-4 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                    isActive 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white border border-transparent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span translate="no" className="notranslate">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
