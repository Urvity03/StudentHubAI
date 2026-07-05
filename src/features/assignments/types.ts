export type AssignmentStatus = "not-started" | "in-progress" | "submitted" | "graded";

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: AssignmentStatus;
  grade?: string;
}
