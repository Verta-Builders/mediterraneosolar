"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselImage {
  src: string;
  alt: string;
}

interface ProjectCarouselProps {
  images: CarouselImage[];
}

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);


  // Duplicate the set for seamless infinite loop
  const allImages = [...images, ...images];

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  const openModal = (index: number) => {
    setSelectedIndex(index % images.length);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) => (prev + 1) % images.length);
    },
    [images.length]
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nextImage, prevImage]);

  if (images.length === 0) return null;

  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/* Animated track */}
        <div className="project-track flex gap-6 pb-4">
          {allImages.map((image, index) => (
            <div
              key={index}
              className="group min-w-[280px] md:min-w-[320px] overflow-hidden rounded-2xl border border-neutral-100 shadow-sm bg-white cursor-pointer"
              onClick={() => openModal(index)}
            >
              <div className="relative h-56 lg:h-80 w-full overflow-hidden bg-neutral-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .project-track {
            width: min-content;
            animation: project-scroll 30s linear infinite;
          }

          .project-track:hover {
            animation-play-state: paused;
          }

          @keyframes project-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-25%);
            }
          }
        `}</style>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xs"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-[110] p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Arrow - Visible on desktop */}
          <button
            onClick={prevImage}
            className="absolute left-4 z-[110] p-4 text-white/70 hover:text-white transition-colors hidden md:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Image Container */}
          <div 
            className="relative w-full h-[80vh] md:h-[90vh] max-w-7xl mx-auto px-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEndEvent}
          >
            <Image
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              fill
              className="object-contain select-none pointer-events-none"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next Arrow - Visible on desktop */}
          <button
            onClick={nextImage}
            className="absolute right-4 z-[110] p-4 text-white/70 hover:text-white transition-colors hidden md:block"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </>
  );
}
