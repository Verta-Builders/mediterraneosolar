import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Zap, Instagram, Facebook, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const tContact = useTranslations("Contact.info");

  return (
    <footer className="bg-neutral-950 pt-24 pb-12 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main CTA */}
        {/* <div className="grid md:grid-cols-2 gap-12 mb-24 items-center border-b border-white/10 pb-24">
          <div>
            <h2 className="text-4xl font-bold mb-4 font-heading">{t("ready")}</h2>
            <p className="text-neutral-400 font-light">{t("readyDesc")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <a href="#contact" className="bg-green-600 text-white px-8 py-4 rounded-full text-center font-bold transition-all duration-300 hover:bg-green-500 hover:shadow-xl hover:shadow-green-900/30 hover:-translate-y-1 active:translate-y-0 active:scale-95 shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 group">
              {tNav("getInTouch")}
            </a>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative -mt-4 w-48 h-16 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <Image src="/assets/brand/logo-name-white.png" alt="Mediterraneo Solar" fill className="object-contain" />
              </div>
              {/* <span className="text-xl font-bold tracking-tight text-white transition-colors duration-300">Mediterraneo Solar</span> */}
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              {t("slogan")}
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{t("seeMore")}</h4>
            <ul className="space-y-4 text-sm text-neutral-400 font-medium">
              <li><a href="#home" className="hover:text-green-400 transition-colors">{tNav("home")}</a></li>
              <li><a href="#services" className="hover:text-green-400 transition-colors">{tNav("services")}</a></li>
              <li><a href="#why-us" className="hover:text-green-400 transition-colors">{tNav("whyUs")}</a></li>
              <li><a href="#about" className="hover:text-green-400 transition-colors">{tNav("ourWork")}</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{t("followUs")}</h4>
            <ul className="space-y-4 text-sm text-neutral-400 font-medium">
              <li>
                <a href="https://www.instagram.com/mediterraneosolar/" target="_blank" rel="noopener noreferrer" className="group hover:text-green-400 transition-colors flex items-center gap-2">
                  <Instagram className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/placasypanelessolares/" target="_blank" rel="noopener noreferrer" className="group hover:text-green-400 transition-colors flex items-center gap-2">
                  <Facebook className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{tContact("title")}</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-green-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed group-hover:text-white transition-colors cursor-default max-w-[200px]">{tContact("address")}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-green-400 shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:info@mediterraneosolar.com" className="hover:text-white transition-colors">{tContact("email")}</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-green-400 shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+34664419949" className="hover:text-white transition-colors">{tContact("phone")}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-neutral-600 font-medium">
          <p>{t("rights")}</p>
          <div className="flex flex-wrap justify-center gap-4 md:space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">{t("privacy")}</Link>
            <Link href="/legal" className="hover:text-white transition-colors">{t("aviso")}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
