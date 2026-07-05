import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/shared/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.14),transparent_70%)]"
      />
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28">
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          Built for the semester grind
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          One hub for every course,
          <br className="hidden sm:block" /> deadline, and{" "}
          <span className="relative inline-block whitespace-nowrap">
            <span className="relative z-10">3 a.m. question</span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 -z-0 h-3 -skew-x-6 bg-accent/30 sm:h-4"
            />
          </span>
          .
        </h1>
        <p className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          StudentHubAI pulls your notes, assignments, timetable, and CGPA into one place —
          and gives you an AI study partner that actually knows your workload.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link to="/signup">
              Start free <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/login">I already have an account</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">No credit card. Set up in under two minutes.</p>
      </div>
    </section>
  );
}
