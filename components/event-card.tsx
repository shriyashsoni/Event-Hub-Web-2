"use client"

import { format } from "date-fns"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/types"

interface EventCardProps {
  event: Event
  onSelect: (event: Event) => void
}

export function EventCard({ event, onSelect }: EventCardProps) {
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "Hackathon":
        return "default"
      case "Workshop":
        return "secondary"
      case "Conference":
        return "destructive"
      case "Tech Talk":
        return "outline"
      case "Career Fair":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // Fallback if image fails to load - use one of our featured images instead
              const fallbackImages = [
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hackathon%20Animated%20Type-Cknohf1qdWHJ6VpwpOxWlY8IKw1hY8.gif",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hackathon%20signs%20round%20design%20template%20thin%20line%20vector%20image%20on%20VectorStock-EE5ukjXdhYx8GYZ53nyizYSuLPt3r3.jpeg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brilliant%20Cloud%20is%20sponsoring%20the%20Devos%20Hackathon%2C%20organized%20by%20Poridhi_io-0Hby0WwdCctiwBTMvo42xrBN1EkhIz.jpeg",
              ]
              const randomIndex = Math.floor(Math.random() * fallbackImages.length)
              e.currentTarget.src = fallbackImages[randomIndex]
            }}
          />
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant={getBadgeVariant(event.type)} className="mb-2">
                {event.type}
              </Badge>
              <h3 className="line-clamp-1 text-lg font-bold">{event.name}</h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow">
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {format(new Date(event.date), "MMM dd, yyyy")}
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <p className="line-clamp-2 text-muted-foreground mt-2">{event.description.substring(0, 80)}...</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Button variant="default" className="w-full" onClick={() => onSelect(event)}>
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
