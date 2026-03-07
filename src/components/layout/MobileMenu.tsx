"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface MobileMenuProps {
  overDarkSection: boolean;
  scrolled: boolean;
}

export default function MobileMenu({ overDarkSection, scrolled }: MobileMenuProps) {
  const t = useTranslations("Navigation");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wait for client mount so we can portal into document.body
  useEffect(() => setMounted(true), []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const links = [
    { href: "#home", label: t("home") },
    { href: "#services", label: t("services") },
    { href: "#why-us", label: t("whyUs") },
    { href: "#about", label: t("ourWork") },
  ];

  // The mobile nav should follow the header's color logic:
  // - overDarkSection or scrolled (glass-nav) → dark bg, white text
  // - otherwise → light bg, dark text
  const isDarkNav = overDarkSection || scrolled;

  // The overlay is rendered via a portal so it escapes the header's
  // backdrop-filter stacking context (glass-nav creates a containing
  // block that breaks `position: fixed` in children).
  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 z-[100] flex flex-col pt-6 px-6 backdrop-blur-xl ${
            isDarkNav
              ? "bg-neutral-900/95"
              : "bg-white"
          }`}
        >
          <div className={`flex items-center justify-between h-14 pb-4 border-b ${
            isDarkNav ? "border-white/10" : "border-neutral-100"
          }`}>
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="relative w-9 h-9 flex items-center justify-center overflow-hidden">
                <Image src="/assets/brand/mediterraneosolar-logo.png" alt="Mediterraneo Solar" fill className="object-contain" />
              </div>
              <span className={`text-lg font-bold tracking-tight ${
                isDarkNav ? "text-white" : "text-neutral-900"
              }`}>Mediterraneo Solar</span>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className={`p-2 rounded-full transition-colors ${
                isDarkNav
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-neutral-500 hover:bg-neutral-100"
              }`}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 mt-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-bold tracking-tight transition-colors ${
                  isDarkNav
                    ? "text-white/90 hover:text-white"
                    : "text-neutral-900 hover:text-green-600"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className={`mt-auto pb-10 pt-8 border-t ${isDarkNav ? "border-white/10" : "border-neutral-100"}`}>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center justify-center py-4 rounded-full font-bold transition-colors shadow-lg ${
                isDarkNav
                  ? "bg-white text-neutral-900 hover:bg-white/90 shadow-white/10"
                  : "bg-green-600 text-white hover:bg-green-500 shadow-green-500/25"
              }`}
            >
              {t("getInTouch")}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        className={`p-2 rounded-md transition-colors ${
          overDarkSection
            ? "text-white hover:bg-white/10"
            : "text-neutral-900 hover:bg-neutral-100"
        }`}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
