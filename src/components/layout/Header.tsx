"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Zap } from "lucide-react";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import MobileMenu from "@/components/layout/MobileMenu";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("Navigation");
  const [scrolled, setScrolled] = useState(false);
  const [overDarkSection, setOverDarkSection] = useState(true); // start true since hero is dark

  useEffect(() => {
    const darkSectionIds = ["home", "global-impact"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const headerBottom = window.scrollY + 80; // approximate header height
      let isDark = false;

      for (const id of darkSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (headerBottom >= top && window.scrollY < bottom) {
            isDark = true;
            break;
          }
        }
      }

      setOverDarkSection(isDark);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 md:py-5 ${scrolled ? "glass-nav shadow-sm md:shadow-none" : "bg-white shadow-sm md:shadow-none md:bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-11 h-11 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <Image src="/assets/brand/mediterraneosolar-logo.png" alt="Mediterraneo Solar" fill className="object-contain" />
          </div>
          <span className={`text-lg font-bold tracking-tight transition-colors ${overDarkSection ? 'text-neutral-900 md:text-white' : 'text-neutral-900'}`}>
            Mediterraneo Solar
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className={`hidden md:flex items-center space-x-10 text-sm font-medium transition-colors ${overDarkSection ? 'text-white/90' : 'text-neutral-900'}`}>
          <a href="#home" className={`hover:text-green-600 transition-colors ${overDarkSection ? 'hover:text-white' : 'hover:text-green-600'}`}>{t("home")}</a>
          <a href="#services" className={`hover:text-green-600 transition-colors ${overDarkSection ? 'hover:text-white' : 'hover:text-green-600'}`}>{t("services")}</a>
          <a href="#why-us" className={`hover:text-green-600 transition-colors ${overDarkSection ? 'hover:text-white' : 'hover:text-green-600'}`}>{t("whyUs")}</a>
          <a href="#about" className={`hover:text-green-600 transition-colors ${overDarkSection ? 'hover:text-white' : 'hover:text-green-600'}`}>{t("ourWork")}</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className={`hidden sm:block ${overDarkSection ? 'bg-white/10 rounded-full backdrop-blur-md' : ''}`}>
            <LanguageSwitcher isDark={overDarkSection} />
          </div>

          <a
            href="#contact"
            className={`hidden lg:flex px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 items-center justify-center
              ${overDarkSection ? 'bg-white text-neutral-900 hover:text-green-600' : 'bg-green-600 text-white hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/25'}
            `}
          >
            {t("getInTouch")}
          </a>

          <div className={overDarkSection ? 'md:bg-white md:rounded-md' : ''}>
            <MobileMenu />
          </div>
        </div>

      </div>
    </nav>
  );
}
