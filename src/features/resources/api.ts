import { createMockResource } from "@/shared/lib/create-mock-resource";
import type { Resource } from "@/features/resources/types";

const MOCK_RESOURCES: Resource[] = [
  { id: "r-1", title: "Lecture slides — Week 8", course: "Signals & Systems", type: "slides", addedAt: "2 days ago" },
  { id: "r-2", title: "Titration procedure handout", course: "Organic Chemistry", type: "pdf", addedAt: "3 days ago" },
  { id: "r-3", title: "Market structures explainer", course: "Microeconomics", type: "video", addedAt: "1 week ago" },
  { id: "r-4", title: "Course syllabus", course: "Software Engineering", type: "link", addedAt: "3 weeks ago" },
];

export const useResources = createMockResource(MOCK_RESOURCES);
