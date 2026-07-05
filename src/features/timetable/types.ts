export interface TimetableSlot {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  time: string;
  course: string;
  room: string;
}
