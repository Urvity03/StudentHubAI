import * as React from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/shared/ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Feature-specific fallback content. Falls back to a generic message if omitted. */
  fallbackTitle?: string;
  fallbackDescription?: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Catches render errors within a subtree and shows a designed fallback
 * instead of a blank screen, per Constitution §3.7. Wrap each top-level
 * route (see router.tsx) so one feature's crash never takes down the shell.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold">
              {this.props.fallbackTitle ?? "Something went wrong"}
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              {this.props.fallbackDescription ??
                "This part of the page couldn't load. You can try again, or head back to the dashboard."}
            </p>
          </div>
          <Button size="sm" onClick={this.handleReset}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
