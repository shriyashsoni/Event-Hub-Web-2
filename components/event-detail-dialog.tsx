"use client"

import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Building, ExternalLink, Share2 } from "lucide-react"
import type { Event } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { featuredHackathonImages } from "@/lib/mock-data"

interface EventDetailDialogProps {
  event: Event | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventDetailDialog({ event, open, onOpenChange }: EventDetailDialogProps) {
  const { toast } = useToast()

  if (!event) return null

  const handleShare = () => {
    navigator.clipboard.writeText(event.link)
    toast({
      title: "Link copied!",
      description: "Event link copied to clipboard",
    })
  }

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[550px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-xl">{event.name}</DialogTitle>
                <DialogDescription>
                  <Badge className="mt-1">{event.type}</Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load - use one of our featured images instead
                      const randomIndex = Math.floor(Math.random() * featuredHackathonImages.length)
                      e.currentTarget.src = featuredHackathonImages[randomIndex]
                    }}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(event.date), "EEEE, MMMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">College</p>
                    <p className="text-sm text-muted-foreground">{event.college}</p>
                  </div>
                </div>

                <div>
                  <p className="mb-1 font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" asChild>
                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Event Website
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
