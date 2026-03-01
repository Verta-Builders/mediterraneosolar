"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const t = useTranslations("Hero");

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop",
      alt: t("slide1Alt"),
    },
    {
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop",
      alt: t("slide2Alt"),
    },
    {
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop",
      alt: t("slide3Alt"),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-neutral-900">
      
      {/* Slider Images */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
            <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-1000 zoom-in-95 fade-in-0">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-primary-300 text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
            <span>{t("tagline")}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight text-white leading-[1.05] mb-8 drop-shadow-sm">
            {t("title").split(".").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i !== arr.length - 1 && <br className="hidden md:block" />}
                {i === arr.length - 1 && "."}
              </span>
            ))}
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#services" 
              className="px-8 py-4 bg-white text-neutral-900 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-white/5"
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
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/30 hover:bg-primary-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
