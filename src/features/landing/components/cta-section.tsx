import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/button";

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center rounded-[var(--radius-xl)] border border-border bg-secondary/40 px-6 py-14 text-center sm:px-10">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Get your semester under control
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Join students who stopped tracking deadlines across five different apps.
        </p>
        <Button size="lg" className="mt-7" asChild>
          <Link to="/signup">
            Create your free account <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
