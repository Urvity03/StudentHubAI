import { Loader2 } from "lucide-react";

import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";

/** Full-viewport loading state used while the router lazily loads a page chunk. */
export function PageLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="size-5 animate-spin" />
      <p className="text-sm">Loading…</p>
    </div>
  );
}

/** Skeleton grid for card-based dashboard content while mock data resolves. */
export function CardGridSkeleton({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-[var(--radius-lg)] border border-border p-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

/** Skeleton rows for list-based content (notes, assignments, resources, etc.). */
export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="divide-y divide-border rounded-[var(--radius-lg)] border border-border">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="size-9 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}
