import { EventDashboard } from "@/components/event-dashboard"
import { PageTransition } from "@/components/page-transition"
import { FeaturedHackathons } from "@/components/featured-hackathons"
import { HackathonCarousel } from "@/components/hackathon-carousel"

export default function Home() {
  return (
    <PageTransition className="container py-8">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Event Dashboard</h1>
          <p className="text-muted-foreground">
            Discover and track events from colleges and universities in one place.
          </p>
        </div>

        <HackathonCarousel />

        <FeaturedHackathons />

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">All Events</h2>
          <p className="text-muted-foreground">Browse and filter all upcoming events</p>
        </div>

        <EventDashboard />
      </div>
    </PageTransition>
  )
}
