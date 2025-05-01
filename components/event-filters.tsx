"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Event, EventType } from "@/lib/types"

interface EventFiltersProps {
  events: Event[]
  onFilterChange: (filteredEvents: Event[]) => void
}

export function EventFilters({ events, onFilterChange }: EventFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([])
  const [selectedCollege, setSelectedCollege] = useState<string>("")
  const [sortBy, setSortBy] = useState<"date" | "name">("date")

  // Get unique colleges from events
  const colleges = Array.from(new Set(events.map((event) => event.college)))

  // Get all event types
  const eventTypes: EventType[] = ["Hackathon", "Workshop", "Conference", "Tech Talk", "Career Fair"]

  const applyFilters = useCallback(() => {
    let filtered = [...events]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) => event.name.toLowerCase().includes(query) || event.description.toLowerCase().includes(query),
      )
    }

    // Filter by event types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((event) => selectedTypes.includes(event.type))
    }

    // Filter by college
    if (selectedCollege) {
      filtered = filtered.filter((event) => event.college === selectedCollege)
    }

    // Sort events
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else {
        return a.name.localeCompare(b.name)
      }
    })

    onFilterChange(filtered)
  }, [searchQuery, selectedTypes, selectedCollege, sortBy, events, onFilterChange])

  useEffect(() => {
    let filtered = [...events]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) => event.name.toLowerCase().includes(query) || event.description.toLowerCase().includes(query),
      )
    }

    // Filter by event types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((event) => selectedTypes.includes(event.type))
    }

    // Filter by college
    if (selectedCollege) {
      filtered = filtered.filter((event) => event.college === selectedCollege)
    }

    // Sort events
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else {
        return a.name.localeCompare(b.name)
      }
    })

    onFilterChange(filtered)
  }, [searchQuery, selectedTypes, selectedCollege, sortBy, events])

  const handleTypeToggle = (type: EventType) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10">
                <Filter className="mr-2 h-4 w-4" />
                Event Type
                {selectedTypes.length > 0 && (
                  <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                    {selectedTypes.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {eventTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => handleTypeToggle(type)}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Select value={selectedCollege} onValueChange={setSelectedCollege}>
            <SelectTrigger className="h-10 w-[180px]">
              <SelectValue placeholder="College" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colleges</SelectItem>
              {colleges.map((college) => (
                <SelectItem key={college} value={college}>
                  {college}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as "date" | "name")}>
            <SelectTrigger className="h-10 w-[180px]">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(selectedTypes.length > 0 || selectedCollege) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedTypes.map((type) => (
            <Badge key={type} variant="secondary" className="gap-1">
              {type}
              <button onClick={() => handleTypeToggle(type)} className="ml-1 rounded-full text-xs hover:bg-secondary">
                ✕
              </button>
            </Badge>
          ))}
          {selectedCollege && (
            <Badge variant="secondary" className="gap-1">
              {selectedCollege}
              <button onClick={() => setSelectedCollege("")} className="ml-1 rounded-full text-xs hover:bg-secondary">
                ✕
              </button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedTypes([])
              setSelectedCollege("")
            }}
            className="text-xs"
          >
            Clear all
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
