import { SubmitEventForm } from "@/components/submit-event-form"
import { PageTransition } from "@/components/page-transition"
import { ProtectedRoute } from "@/components/protected-route"

export default function SubmitEventPage() {
  return (
    <ProtectedRoute>
      <PageTransition className="container py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Submit Event</h1>
            <p className="text-muted-foreground">
              Add a new event to our aggregator. All submissions will be reviewed before publishing.
            </p>
          </div>
          <SubmitEventForm />
        </div>
      </PageTransition>
    </ProtectedRoute>
  )
}
