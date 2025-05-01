"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { featuredHackathonImages } from "@/lib/mock-data"

export function HackathonCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredHackathonImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredHackathonImages.length) % featuredHackathonImages.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval)
  }, [autoplay])

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div
        className="relative h-[300px] w-full overflow-hidden rounded-lg"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={featuredHackathonImages[currentIndex]}
            alt={`Hackathon image ${currentIndex + 1}`}
            className="absolute h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onError={(e) => {
              // Fallback if image fails to load - use one of our featured images instead
              const randomIndex = Math.floor(Math.random() * featuredHackathonImages.length)
              e.currentTarget.src = featuredHackathonImages[randomIndex]
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold">Featured Hackathons</h3>
          <p className="text-sm">Discover exciting hackathon events near you</p>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2">
          {featuredHackathonImages.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-white/50"
              } transition-all duration-300`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
