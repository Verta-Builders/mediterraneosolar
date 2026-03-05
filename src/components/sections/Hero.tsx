"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop",
];

const SLIDE_INTERVAL = 6000;

export default function Hero() {
  const t = useTranslations("Hero");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const slideCount = SLIDE_IMAGES.length;

  const goToSlide = useCallback((index: number) => {
    setTextVisible(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setTextVisible(true);
    }, 400);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slideCount);
  }, [currentSlide, slideCount, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-neutral-900">
      
      {/* Slider Images */}
      <div className="absolute inset-0 w-full h-full">
        {SLIDE_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
            <img
              src={image}
              alt={t(`slides.${index}.alt`)}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-green-400 text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>{t("tagline")}</span>
          </div>
          
          {/* Animated Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight text-white leading-[1.05] mb-8 drop-shadow-sm transition-all duration-500 ease-out"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {t(`slides.${currentSlide}.title`)}
          </h1>
          
          {/* Animated Description */}
          <p
            className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-10 max-w-2xl mx-auto transition-all duration-500 ease-out delay-100"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(12px)",
            }}
          >
            {t(`slides.${currentSlide}.description`)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#services" 
              className="px-8 py-4 bg-white text-neutral-900 rounded-full text-sm font-bold hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-white/5"
            >
              {t("explore")}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-sm font-bold hover:bg-white/20 transition-all duration-300"
            >
              {t("speakToSales")}
            </a>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {SLIDE_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/30 hover:bg-green-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

