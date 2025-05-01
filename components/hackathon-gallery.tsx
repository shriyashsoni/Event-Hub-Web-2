"use client"

import { motion } from "framer-motion"
import { featuredHackathonImages } from "@/lib/mock-data"

export function HackathonGallery() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {featuredHackathonImages.map((image, index) => (
        <motion.div
          key={index}
          className="overflow-hidden rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={`Hackathon ${index + 1}`}
            className="aspect-video w-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load - use one of our featured images instead
              const randomIndex = Math.floor(Math.random() * featuredHackathonImages.length)
              e.currentTarget.src = featuredHackathonImages[randomIndex]
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
