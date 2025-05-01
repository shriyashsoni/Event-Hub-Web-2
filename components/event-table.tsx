"use client"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Info } from "lucide-react"
import type { Event, EventType } from "@/lib/types"

interface EventTableProps {
  events: Event[]
  onEventSelect: (event: Event) => void
}

export function EventTable({ events, onEventSelect }: EventTableProps) {
  const getBadgeVariant = (type: EventType) => {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>College</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No events found.
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{format(new Date(event.date), "MMM dd, yyyy")}</TableCell>
                <TableCell>{event.college}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(event.type)}>{event.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEventSelect(event)}>
                      <Info className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={event.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Visit website</span>
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
