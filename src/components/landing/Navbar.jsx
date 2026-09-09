import React, { useState, useEffect } from "react";
import { Leaf, Phone, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${scrolled ? "bg-green-600" : "bg-white/15 backdrop-blur-sm"}`}>
            <Leaf className={`w-5 h-5 ${scrolled ? "text-white" : "text-green-400"}`} />
          </div>
          <span className={`font-bold text-lg tracking-tight ${scrolled ? "text-stone-900" : "text-white"}`}>
            UZG Jardinería
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-stone-500 hover:text-stone-900" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+34623063799"
            className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all ${
              scrolled
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-white/25"
            }`}
          >
            <Phone className="w-4 h-4" />
            623 06 37 99
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg ${scrolled ? "text-stone-900" : "text-white"}`}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-stone-700 font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+34623063799"
              className="flex items-center gap-2 text-green-600 font-semibold py-2"
            >
              <Phone className="w-4 h-4" />
              623 06 37 99
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}