"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { EventCard } from "@/components/event-card"
import { EventFilters } from "@/components/event-filters"
import { EventDetailDialog } from "@/components/event-detail-dialog"
import { mockEvents } from "@/lib/mock-data"
import type { Event } from "@/lib/types"

export function EventDashboard() {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const handleFilterChange = useCallback((filtered: Event[]) => {
    setFilteredEvents(filtered)
  }, [])

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event)
  }

  const handleCloseDialog = () => {
    setSelectedEvent(null)
  }

  return (
    <div className="space-y-6">
      <EventFilters events={mockEvents} onFilterChange={handleFilterChange} />

      {filteredEvents.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-medium">No events found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your filters to find more events.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <EventCard event={event} onSelect={handleEventSelect} />
            </motion.div>
          ))}
        </div>
      )}

      <EventDetailDialog event={selectedEvent} open={!!selectedEvent} onOpenChange={handleCloseDialog} />
    </div>
  )
}
