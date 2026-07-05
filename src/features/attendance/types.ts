export interface CourseAttendance {
  id: string;
  course: string;
  attended: number;
  total: number;
  requiredPercent: number;
}
