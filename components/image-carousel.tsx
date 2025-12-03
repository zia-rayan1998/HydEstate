"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageCarouselProps {
  images: string[]
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative group">
      {/* Main Image */}
      <div className="relative h-96 md:h-[500px] w-full overflow-hidden rounded-2xl bg-muted">
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Property image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-20 w-24 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
              index === currentIndex ? "ring-2 ring-blue-500 scale-105" : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}
