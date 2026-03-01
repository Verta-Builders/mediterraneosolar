import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Zap, Instagram, Facebook, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const tContact = useTranslations("Contact.info");

  return (
    <footer className="bg-neutral-950 pt-24 pb-12 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main CTA */}
        <div className="grid md:grid-cols-2 gap-12 mb-24 items-center border-b border-white/10 pb-24">
          <div>
            <h2 className="text-4xl font-bold mb-4 font-heading">{t("ready")}</h2>
            <p className="text-neutral-400 font-light">{t("readyDesc")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <a href="#contact" className="bg-primary text-white px-8 py-4 rounded-full text-center font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              {tNav("getInTouch")}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Mediterraneo Solar</span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Tu partner experto en instalaciones fotovoltaicas y climatización de confianza.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{t("seeMore")}</h4>
            <ul className="space-y-4 text-sm text-neutral-400 font-medium">
              <li><a href="#home" className="hover:text-primary transition-colors">{tNav("home")}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">{tNav("services")}</a></li>
              <li><a href="#why-us" className="hover:text-primary transition-colors">{tNav("about")}</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">{tNav("faq")}</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{t("followUs")}</h4>
            <ul className="space-y-4 text-sm text-neutral-400 font-medium">
              <li>
                <a href="https://www.instagram.com/mediterraneosolar/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/placasypanelessolares/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{tContact("title")}</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">Partida Alzabaras Bajo, 1127A,<br/>03290 Elx, Alicante, España</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info.mediterraneosolar@gmail.com" className="hover:text-white transition-colors">{tContact("email")}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
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
