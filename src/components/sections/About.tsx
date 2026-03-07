"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ProjectCarousel from "@/components/ui/ProjectCarousel";

export default function About() {
  const t = useTranslations("About");

  const carouselImages = [
    { src: "/assets/projects/20250109_154218.jpg", alt: t("carouselAlt") + " 1" },
    { src: "/assets/projects/20250428_132344.jpg", alt: t("carouselAlt") + " 2" },
    { src: "/assets/projects/20250730_135111.jpg", alt: t("carouselAlt") + " 3" },
    { src: "/assets/projects/20250904_184611.jpg", alt: t("carouselAlt") + " 4" },
    { src: "/assets/projects/20260120_161442.jpg", alt: t("carouselAlt") + " 5" },
    { src: "/assets/projects/solar-panel-roof-1.jpg", alt: t("carouselAlt") + " 6" },
    { src: "/assets/projects/solar-panel-roof-2.jpg", alt: t("carouselAlt") + " 7" },
    { src: "/assets/projects/solar-panel-roof-3.jpg", alt: t("carouselAlt") + " 8" },
    { src: "/assets/projects/solar-panel-villa-1.jpg", alt: t("carouselAlt") + " 9" },
    { src: "/assets/projects/solar-panel-villa-2.jpg", alt: t("carouselAlt") + " 10" },
  ];

  return (
    <section id="about" className="overflow-hidden bg-white py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">

          {/* Left Column — Work Ethics & Standards */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            <span className="text-green-600 font-bold tracking-widest text-xs uppercase mb-2 block animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t("tagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {t("title")}
            </h2>
            <p className="text-neutral-500 font-light leading-relaxed mb-8 text-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              {t("description")}
            </p>

            <div className="space-y-4 mb-10">
              {(["ethics1", "ethics2", "ethics3"] as const).map((key, idx) => (
                <div
                  key={key}
                  className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700"
                  style={{ animationDelay: `${300 + idx * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <p className="text-neutral-600 text-sm leading-relaxed font-light">
                    {t(key)}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="text-neutral-900 font-semibold border-b border-neutral-300 hover:border-green-600 pb-1 inline-flex items-center gap-2 transition-all animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700 group"
            >
              {t("cta")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Column — Infinite Scrolling Project Carousel */}
          <div className="lg:col-span-2 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <ProjectCarousel images={carouselImages} />
          </div>

        </div>
      </div>
    </section>
  );
}
