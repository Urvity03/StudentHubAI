import type { LucideIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * Standard empty-state layout used across every module (notes, assignments,
 * resources, conversations, etc.) so empty screens read as an invitation to
 * act, not a dead end — see Constitution §3.7 intent.
 */
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-border px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <Icon className="size-5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
      {action ? (
        <Button size="sm" onClick={action.onClick} className="mt-1">
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}
