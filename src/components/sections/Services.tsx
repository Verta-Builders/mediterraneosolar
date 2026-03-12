"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Sun, Thermometer, Zap, X, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import ServiceCardBg, { type CardBgVariant } from "@/components/ui/ServiceCardBg";

type ServiceId = "solar" | "hvac" | "electrical" | null;

const CARD_VARIANTS: CardBgVariant[] = ["sunbeams", "breeze", "lightning"];

export default function Services() {
  const t = useTranslations("Services");
  const [activeModal, setActiveModal] = useState<ServiceId>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  const services = [
    {
      id: "solar" as const,
      icon: <Sun className="w-6 h-6" />,
      title: t("solar.title"),
      desc: t("solar.description"),
      modalText: t("solar.modalText"),
      points: [t("solar.keyInfo.0"), t("solar.keyInfo.1"), t("solar.keyInfo.2")],
      image: "/assets/services/panel.webp"
    },
    {
      id: "hvac" as const,
      icon: <Thermometer className="w-6 h-6" />,
      title: t("hvac.title"),
      desc: t("hvac.description"),
      modalText: t("hvac.modalText"),
      points: [t("hvac.keyInfo.0"), t("hvac.keyInfo.1"), t("hvac.keyInfo.2")],
      image: "/assets/services/hvac.webp"
    },
    {
      id: "electrical" as const,
      icon: <Zap className="w-6 h-6" />,
      title: t("electrical.title"),
      desc: t("electrical.description"),
      modalText: t("electrical.modalText"),
      points: [t("electrical.keyInfo.0"), t("electrical.keyInfo.1"), t("electrical.keyInfo.2")],
      image: "/assets/services/electricity.webp"
    }
  ];

  const activeService = services.find(s => s.id === activeModal);

  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-green-600 font-bold tracking-widest text-xs uppercase mb-2 block animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t("tagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {t("title")}
            </h2>
            <p className="text-neutral-500 mt-4 max-w-xl font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              {t("description")}
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-neutral-200 hover:bg-neutral-900 hover:text-white transition-all duration-300 text-sm font-semibold animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 whitespace-nowrap"
          >
            {t("getQuote")}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`group relative flex flex-col h-full p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 overflow-hidden`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Themed WebGL background */}
              <ServiceCardBg variant={CARD_VARIANTS[idx]} />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900 font-heading tracking-tight">{service.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6 font-light">{service.desc}</p>
                <button
                  onClick={() => setActiveModal(service.id)}
                  className="text-green-600 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer bg-transparent border-none p-0 mt-auto"
                >
                  {t("learnMore")} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
      {activeModal && activeService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" aria-modal="true" role="dialog">
          <div
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModal(null)}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
            {/* Image Section */}
            <div className="relative h-48 md:h-auto md:w-3/5 shrink-0 bg-neutral-100">
              <Image
                src={activeService.image}
                alt={activeService.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-4 left-4 text-white md:hidden">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-2">
                  {activeService.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading shadow-black/50 drop-shadow-md">{activeService.title}</h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-6 py-8 md:p-10 flex-1 overflow-y-auto">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="hidden md:flex w-12 h-12 bg-green-50 rounded-xl items-center justify-center text-green-600 mb-6">
                {activeService.icon}
              </div>

              <h3 className="hidden md:block text-3xl font-bold mb-4 text-neutral-900 font-heading tracking-tight">
                {activeService.title}
              </h3>

              <p className="text-neutral-600 text-base leading-relaxed mb-8">
                {activeService.modalText}
              </p>

              <div className="space-y-4 mb-8">
                {activeService.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                <a
                  href="#contact"
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-300 text-sm font-semibold shadow-lg shadow-green-600/20"
                >
                  {t("getQuote")}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
