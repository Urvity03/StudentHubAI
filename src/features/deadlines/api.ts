import { createMockResource } from "@/shared/lib/create-mock-resource";
import type { Deadline } from "@/features/deadlines/types";

const MOCK_DEADLINES: Deadline[] = [
  { id: "d-1", title: "Problem set 6", course: "Signals & Systems", dueLabel: "Tomorrow, 11:59 PM", urgency: "urgent" },
  { id: "d-2", title: "Lab report: titration", course: "Organic Chemistry", dueLabel: "In 3 days", urgency: "upcoming" },
  { id: "d-3", title: "Case study response", course: "Microeconomics", dueLabel: "In 5 days", urgency: "upcoming" },
  { id: "d-4", title: "Group project checkpoint", course: "Software Engineering", dueLabel: "In 9 days", urgency: "upcoming" },
];

export const useDeadlines = createMockResource(MOCK_DEADLINES);
