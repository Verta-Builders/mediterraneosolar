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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary shadow-lg shadow-black/5 overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-5 h-5 fill-current text-primary" />
            {/* Placeholder for real logo */}
            {/* <Image src="/assets/brand/LOGO-SOLO.png" alt="Mediterraneo Solar" fill className="object-cover" /> */}
          </div>
          <span className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? 'text-neutral-900' : 'text-white'}`}>
            Mediterraneo Solar
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className={`hidden md:flex items-center space-x-10 text-sm font-medium transition-colors ${scrolled ? 'text-neutral-600' : 'text-white/80'}`}>
          <a href="#home" className={`hover:text-primary transition-colors ${scrolled ? 'hover:text-primary' : 'hover:text-white'}`}>{t("home")}</a>
          <a href="#services" className={`hover:text-primary transition-colors ${scrolled ? 'hover:text-primary' : 'hover:text-white'}`}>{t("services")}</a>
          <a href="#why-us" className={`hover:text-primary transition-colors ${scrolled ? 'hover:text-primary' : 'hover:text-white'}`}>{t("about")}</a>
          <a href="#faq" className={`hover:text-primary transition-colors ${scrolled ? 'hover:text-primary' : 'hover:text-white'}`}>{t("faq")}</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className={`hidden sm:block ${scrolled ? '' : 'bg-white/10 rounded-md backdrop-blur-md'}`}>
            <LanguageSwitcher />
          </div>
          
          <a 
            href="#contact" 
            className="hidden lg:flex px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 items-center justify-center"
          >
            {t("getInTouch")}
          </a>
          
          <div className={scrolled ? '' : 'bg-white rounded-md'}>
            <MobileMenu />
          </div>
        </div>

      </div>
    </nav>
  );
}
