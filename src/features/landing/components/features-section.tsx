import {
  BarChart3,
  Calendar,
  CheckSquare,
  GraduationCap,
  Library,
  MessageSquare,
} from "lucide-react";

import { Card, CardContent } from "@/shared/ui/card";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "AI study assistant",
    description:
      "Ask it to summarize a lecture, quiz you before an exam, or explain a concept your professor rushed through.",
  },
  {
    icon: CheckSquare,
    title: "Assignments & deadlines",
    description:
      "Every due date across every course, ranked by what actually needs your attention this week.",
  },
  {
    icon: Calendar,
    title: "Timetable & calendar",
    description: "Classes, study blocks, and deadlines in one view — no more juggling five different apps.",
  },
  {
    icon: GraduationCap,
    title: "CGPA tracker",
    description: "See exactly what grade you need on what's left to hit the GPA you're aiming for.",
  },
  {
    icon: Library,
    title: "Resource library",
    description: "Course readings, slides, and shared notes, organized by subject and searchable in seconds.",
  },
  {
    icon: BarChart3,
    title: "Progress analytics",
    description: "A clear picture of attendance, workload, and grade trends across the semester.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-b border-border/60 py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything a semester throws at you, handled
          </h2>
          <p className="mt-3 text-muted-foreground">
            StudentHubAI replaces the six tabs you'd normally have open with one.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="transition-shadow duration-[var(--duration-base)] hover:shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
