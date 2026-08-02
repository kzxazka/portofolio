"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
  title: string;
}

export function ImageCarousel({ images, title }: CarouselProps) {
  const validImages = images.filter((img) => typeof img === "string" && img.trim() !== "");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (validImages.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [validImages.length, isHovered]);

  if (validImages.length === 0) return null;

  if (validImages.length === 1) {
    return (
      <div className="w-full h-[220px] sm:h-[380px] md:h-[460px] rounded-3xl overflow-hidden mb-12 border border-zinc-800/80 shadow-2xl bg-zinc-950">
        <img 
          src={validImages[0]} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  return (
    <div 
      className="relative w-full h-[220px] sm:h-[380px] md:h-[460px] rounded-3xl overflow-hidden mb-12 border border-zinc-800 shadow-2xl bg-zinc-950 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div className="w-full h-full relative">
        {validImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              idx === currentIndex 
                ? "opacity-100 scale-100 z-10" 
                : "opacity-0 scale-95 z-0 pointer-events-none"
            }`}
          >
            <img 
              src={img} 
              alt={`${title} - screenshot ${idx + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        type="button"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-zinc-950/60 px-3 py-1.5 rounded-full border border-zinc-800/50 backdrop-blur-sm">
        {validImages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? "bg-emerald-500 w-5" 
                : "bg-zinc-600 hover:bg-zinc-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
