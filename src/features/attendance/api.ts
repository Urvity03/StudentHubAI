import { createMockResource } from "@/shared/lib/create-mock-resource";
import type { CourseAttendance } from "@/features/attendance/types";

const MOCK_ATTENDANCE: CourseAttendance[] = [
  { id: "att-1", course: "Signals & Systems", attended: 27, total: 30, requiredPercent: 75 },
  { id: "att-2", course: "Organic Chemistry", attended: 22, total: 30, requiredPercent: 75 },
  { id: "att-3", course: "Microeconomics", attended: 18, total: 28, requiredPercent: 75 },
  { id: "att-4", course: "Software Engineering", attended: 25, total: 26, requiredPercent: 75 },
];

export const useAttendance = createMockResource(MOCK_ATTENDANCE);
