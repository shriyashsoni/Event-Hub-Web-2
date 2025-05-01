export type EventType = "Hackathon" | "Workshop" | "Conference" | "Tech Talk" | "Career Fair"

export interface Event {
  id: string
  name: string
  date: string
  location: string
  college: string
  type: EventType
  description: string
  link: string
  image: string
}
