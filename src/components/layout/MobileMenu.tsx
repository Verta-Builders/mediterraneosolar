"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Menu, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileMenu() {
  const t = useTranslations("Navigation");
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="text-neutral-900 p-2 hover:bg-neutral-100 rounded-md transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col pt-6 px-6"
          >
            <div className="flex items-center justify-between h-14 border-b border-neutral-100 pb-4">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <span className="text-lg font-bold tracking-tight text-neutral-900">Mediterraneo</span>
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 p-2 hover:bg-neutral-100 rounded-full transition-colors"
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
                  className="text-2xl font-bold tracking-tight text-neutral-900 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-8 pt-8 border-t border-neutral-100">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  {t("getInTouch")}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
