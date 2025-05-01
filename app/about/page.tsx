import { PageTransition } from "@/components/page-transition"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Globe, Code, Database } from "lucide-react"
import { HackathonGallery } from "@/components/hackathon-gallery"

export default function AboutPage() {
  const features = [
    {
      icon: Calendar,
      title: "Event Aggregation",
      description:
        "We collect events from various colleges and universities to provide a centralized platform for discovering academic and professional opportunities.",
    },
    {
      icon: Users,
      title: "Community Submissions",
      description:
        "Our platform allows users to submit events, creating a collaborative environment where everyone can contribute to the knowledge base.",
    },
    {
      icon: Globe,
      title: "Wide Coverage",
      description:
        "From hackathons to career fairs, we cover a diverse range of events to cater to different interests and career paths.",
    },
    {
      icon: Code,
      title: "Modern Technology",
      description:
        "Built with Next.js, Tailwind CSS, and Framer Motion to provide a smooth and responsive user experience.",
    },
    {
      icon: Database,
      title: "Structured Data",
      description:
        "Events are categorized and tagged for easy filtering and searching, making it simple to find relevant opportunities.",
    },
  ]

  return (
    <PageTransition className="container py-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">About EventHub</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            EventHub is a platform designed to aggregate and showcase events from colleges and universities, making it
            easier for students and professionals to discover opportunities.
          </p>
        </div>

        <HackathonGallery />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">How It Works</h2>
          <p className="text-muted-foreground">
            Our platform collects event data through a combination of web scraping, API integrations with college event
            systems, and user submissions. All events are verified by our team before being published to ensure accuracy
            and relevance.
          </p>

          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Get Involved</h3>
            <p className="text-muted-foreground">
              We welcome contributions from the community. If you know of an event that should be featured on our
              platform, please submit it through our form. If you're interested in contributing to the development of
              EventHub, check out our GitHub repository.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
