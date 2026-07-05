import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/shared/ui/button";

/** Router-level error element — catches errors in loaders/renders outside any feature ErrorBoundary. */
export default function RootErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "An unexpected error occurred.";

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" />
      </div>
      <div className="space-y-1.5">
        <h1 className="text-xl font-semibold text-foreground">Something went wrong</h1>
        <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
      </div>
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
}
