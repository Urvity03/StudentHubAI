import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; direction: "up" | "down" | "flat" };
  className?: string;
  href?: string;
}

const trendColor: Record<NonNullable<StatCardProps["trend"]>["direction"], string> = {
  up: "text-success",
  down: "text-destructive",
  flat: "text-muted-foreground",
};

/** Compact metric card used across the dashboard home, analytics, and CGPA pages. */
export function StatCard({ label, value, icon: Icon, trend, className, href }: StatCardProps) {
  const content = (
    <Card className={cn("transition-shadow duration-[var(--duration-base)] hover:shadow-sm", className)}>
      <CardContent className="flex items-start justify-between p-5">
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">{value}</p>
          {trend ? (
            <p className={cn("text-xs font-medium", trendColor[trend.direction])}>{trend.value}</p>
          ) : null}
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 text-primary">
          <Icon className="size-4.5" />
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
