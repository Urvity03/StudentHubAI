import { Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Card, CardContent } from "@/shared/ui/card";

const TESTIMONIALS = [
  {
    quote:
      "I stopped missing assignment deadlines the week I started using this. The weekly digest alone is worth it.",
    name: "Priya N.",
    role: "Final-year CS student",
    initials: "PN",
  },
  {
    quote:
      "The CGPA tracker told me exactly what I needed on my remaining exams. Took so much of the guessing out of finals season.",
    name: "Marcus T.",
    role: "Mechanical engineering, Year 3",
    initials: "MT",
  },
  {
    quote:
      "Having the AI assistant actually reference my own notes instead of giving generic answers is what sold me.",
    name: "Sofia R.",
    role: "Psychology major",
    initials: "SR",
  },
];

export function TestimonialsSection() {
  return (
    <section className="border-b border-border/60 py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Students are getting their time back</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name}>
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
