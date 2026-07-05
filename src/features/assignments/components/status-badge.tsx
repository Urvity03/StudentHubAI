import { Badge } from "@/shared/ui/badge";
import type { AssignmentStatus } from "@/features/assignments/types";

const STATUS_CONFIG: Record<AssignmentStatus, { label: string; variant: "default" | "secondary" | "success" | "warning" }> = {
  "not-started": { label: "Not started", variant: "secondary" },
  "in-progress": { label: "In progress", variant: "warning" },
  submitted: { label: "Submitted", variant: "default" },
  graded: { label: "Graded", variant: "success" },
};

export function AssignmentStatusBadge({ status }: { status: AssignmentStatus }) {
  const config = STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
