import { createMockResource } from "@/shared/lib/create-mock-resource";
import type { CourseProgress, WeeklyStudyHours } from "@/features/analytics/types";

const MOCK_STUDY_HOURS: WeeklyStudyHours[] = [
  { week: "W1", hours: 11 },
  { week: "W2", hours: 14 },
  { week: "W3", hours: 9 },
  { week: "W4", hours: 17 },
  { week: "W5", hours: 15 },
  { week: "W6", hours: 19 },
];

const MOCK_COURSE_PROGRESS: CourseProgress[] = [
  { id: "cp-1", course: "Signals & Systems", completion: 78 },
  { id: "cp-2", course: "Organic Chemistry", completion: 62 },
  { id: "cp-3", course: "Microeconomics", completion: 85 },
  { id: "cp-4", course: "Software Engineering", completion: 54 },
];

export const useWeeklyStudyHours = createMockResource(MOCK_STUDY_HOURS);
export const useCourseProgress = createMockResource(MOCK_COURSE_PROGRESS);
