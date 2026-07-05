export type DeadlineUrgency = "overdue" | "urgent" | "upcoming";

export interface Deadline {
  id: string;
  title: string;
  course: string;
  dueLabel: string;
  urgency: DeadlineUrgency;
}
