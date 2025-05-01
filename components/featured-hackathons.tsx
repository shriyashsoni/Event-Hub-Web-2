"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockEvents, featuredHackathonImages } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

export function FeaturedHackathons() {
  const router = useRouter()
  const hackathons = mockEvents.filter((event) => event.type === "Hackathon").slice(0, 3)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Featured Hackathons</h2>
        <Button variant="ghost" size="sm" className="gap-1" onClick={() => router.push("/")}>
          View all
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {hackathons.map((hackathon, index) => (
          <motion.div
            key={hackathon.id}
            className="group relative overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={hackathon.image || "/placeholder.svg"}
                alt={hackathon.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image fails to load - use one of our featured images instead
                  const randomIndex = Math.floor(Math.random() * featuredHackathonImages.length)
                  e.currentTarget.src = featuredHackathonImages[randomIndex]
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
              <div className="flex h-full flex-col justify-end">
                <h3 className="text-lg font-bold">{hackathon.name}</h3>
                <p className="text-sm text-white/80">{hackathon.college}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
