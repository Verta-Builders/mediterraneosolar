"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const SLIDE_IMAGES = [
  "/assets/hero/panels-on-roofs.webp",
  "/assets/hero/electricity.webp",
  "/assets/hero/trees-alicante.webp",
];

const SLIDE_INTERVAL = 6000;

export default function Hero() {
  const t = useTranslations("Hero");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [timerKey, setTimerKey] = useState(0);
  const slideCount = SLIDE_IMAGES.length;

  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const goToSlide = useCallback((index: number) => {
    setTextVisible(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setTextVisible(true);
      setTimerKey((prev) => prev + 1);
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
    <section ref={targetRef} id="home" className="relative w-full h-screen overflow-hidden bg-neutral-900">

      {/* Slider Images */}
      <div className="absolute inset-0 w-full h-full">
        {SLIDE_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-20 pointer-events-none" />
            
            <motion.div
              className="absolute inset-0 w-full h-[120%] -top-[10%]"
              style={{ y }}
            >
              <div
                className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out ${
                  index === currentSlide ? "scale-105" : "scale-100"
                }`}
              >
                <Image
                  src={image}
                  alt={t(`slides.${index}.alt`)}
                  fill
                  priority={index === 0}
                  className="object-cover pointer-events-none"
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto">

          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-green-400 text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm transition-all duration-500 ease-out"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>{t(`slides.${currentSlide}.tagline`)}</span>
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

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {SLIDE_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative h-1.5 w-16 bg-white/20 rounded-full overflow-hidden transition-all hover:bg-white/30 cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <div
                key={timerKey}
                className="absolute inset-y-0 left-0 bg-green-300 rounded-full"
                style={{
                  animation: `heroProgressFill ${SLIDE_INTERVAL}ms linear forwards`,
                }}
              />
            )}
            {index < currentSlide && (
              <div className="absolute inset-0 bg-white/50 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Progress bar animation keyframes */}
      <style jsx>{`
        @keyframes heroProgressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
