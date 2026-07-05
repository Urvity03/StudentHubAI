import { FileText, Link2, PlayCircle, Presentation } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { ResourceType } from "@/features/resources/types";

const ICONS: Record<ResourceType, LucideIcon> = {
  pdf: FileText,
  slides: Presentation,
  link: Link2,
  video: PlayCircle,
};

export function ResourceIcon({ type, className }: { type: ResourceType; className?: string }) {
  const Icon = ICONS[type];
  return <Icon className={className} />;
}
