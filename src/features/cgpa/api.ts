import { createMockResource } from "@/shared/lib/create-mock-resource";
import type { SemesterGpa } from "@/features/cgpa/types";

const MOCK_SEMESTERS: SemesterGpa[] = [
  { id: "s-1", semester: "Sem 1", gpa: 3.4, credits: 16 },
  { id: "s-2", semester: "Sem 2", gpa: 3.6, credits: 17 },
  { id: "s-3", semester: "Sem 3", gpa: 3.5, credits: 18 },
  { id: "s-4", semester: "Sem 4", gpa: 3.8, credits: 16 },
  { id: "s-5", semester: "Sem 5", gpa: 3.7, credits: 17 },
];

export const useSemesterGpas = createMockResource(MOCK_SEMESTERS);

export function calculateCgpa(semesters: SemesterGpa[]): number {
  const totalCredits = semesters.reduce((sum, s) => sum + s.credits, 0);
  const weightedSum = semesters.reduce((sum, s) => sum + s.gpa * s.credits, 0);
  return totalCredits === 0 ? 0 : weightedSum / totalCredits;
}
