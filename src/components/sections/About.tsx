"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ProjectCarousel from "@/components/ui/ProjectCarousel";

export default function About() {
  const t = useTranslations("About");

  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1600&auto=format&fit=crop",
      alt: t("carouselAlt") + " 1",
    },
    {
      src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1600&auto=format&fit=crop",
      alt: t("carouselAlt") + " 2",
    },
    {
      src: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?q=80&w=1600&auto=format&fit=crop",
      alt: t("carouselAlt") + " 3",
    },
    {
      src: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=1600&auto=format&fit=crop",
      alt: t("carouselAlt") + " 4",
    },
    {
      src: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=1600&auto=format&fit=crop",
      alt: t("carouselAlt") + " 5",
    },
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
