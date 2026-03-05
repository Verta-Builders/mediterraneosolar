"use client";

interface CarouselImage {
  src: string;
  alt: string;
}

interface ProjectCarouselProps {
  images: CarouselImage[];
}

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
  if (images.length === 0) return null;

  // Duplicate the set for seamless infinite loop
  const allImages = [...images, ...images];

  return (
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
            className="group min-w-[280px] md:min-w-[320px] overflow-hidden rounded-2xl border border-neutral-100 shadow-sm bg-white"
          >
            <div className="relative h-56 w-full overflow-hidden bg-neutral-100">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
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
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
