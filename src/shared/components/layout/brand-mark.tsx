import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export function BrandMark({ to = "/", className }: { to?: string; className?: string }) {
  return (
    <Link to={to} className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span className="flex size-7 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground">
        <Sparkles className="size-4" />
      </span>
      <span className="text-[15px]">StudentHub<span className="text-primary">AI</span></span>
    </Link>
  );
}
