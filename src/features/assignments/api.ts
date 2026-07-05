import { createMockResource } from "@/shared/lib/create-mock-resource";
import type { Assignment } from "@/features/assignments/types";

const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: "a-1", title: "Problem set 6", course: "Signals & Systems", dueDate: "Tomorrow, 11:59 PM", status: "in-progress" },
  { id: "a-2", title: "Lab report: titration", course: "Organic Chemistry", dueDate: "In 3 days", status: "not-started" },
  { id: "a-3", title: "Case study response", course: "Microeconomics", dueDate: "In 5 days", status: "not-started" },
  { id: "a-4", title: "Essay draft 2", course: "Psychology", dueDate: "Submitted", status: "submitted" },
  { id: "a-5", title: "Problem set 5", course: "Signals & Systems", dueDate: "Graded", status: "graded", grade: "94/100" },
];

export const useAssignments = createMockResource(MOCK_ASSIGNMENTS);
