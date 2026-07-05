import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

import { Button } from "@/shared/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Compass className="size-6" />
      </div>
      <div className="space-y-1.5">
        <p className="font-mono text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-xl font-semibold text-foreground">This page doesn't exist</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          The page you're looking for may have moved or never existed.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
}
