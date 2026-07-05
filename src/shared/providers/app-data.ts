import type { Assignment } from "@/features/assignments/types";
import type { CourseAttendance } from "@/features/attendance/types";
import type { CalendarEvent } from "@/features/calendar/types";
import type { Deadline } from "@/features/deadlines/types";
import type { Note } from "@/features/notes/types";
import type { Resource } from "@/features/resources/types";
import type { SemesterGpa } from "@/features/cgpa/types";
import type { TimetableSlot } from "@/features/timetable/types";
import type { Conversation } from "@/features/ai-assistant/types";

export interface AppSeedData {
  user: {
    id: string;
    name: string;
    email: string;
    university: string;
    major: string;
    avatarInitials: string;
  };
  notes: Note[];
  assignments: Assignment[];
  attendance: CourseAttendance[];
  deadlines: Deadline[];
  timetable: TimetableSlot[];
  calendarEvents: CalendarEvent[];
  resources: Resource[];
  gpas: SemesterGpa[];
  conversations: Conversation[];
}

export const initialAppData: AppSeedData = {
  user: {
    id: "user-1",
    name: "Aditi Rao",
    email: "aditi.rao@university.edu",
    university: "State University",
    major: "Computer Science",
    avatarInitials: "AR",
  },
  notes: [
    {
      id: "note-1",
      title: "Chapter 4 summary",
      course: "Organic Chemistry",
      excerpt: "Recrystallization and purification techniques covered in the lab session.",
      updatedAt: "2h ago",
      pinned: true,
    },
    {
      id: "note-2",
      title: "Microeconomics revision",
      course: "Economics",
      excerpt: "Key differences between oligopoly and monopolistic competition.",
      updatedAt: "Yesterday",
      pinned: false,
    },
  ],
  assignments: [
    {
      id: "a-1",
      title: "Physics problem set",
      course: "Physics",
      dueDate: "May 12",
      status: "in-progress",
    },
    {
      id: "a-2",
      title: "Calculus portfolio",
      course: "Mathematics",
      dueDate: "May 15",
      status: "submitted",
      grade: "A-",
    },
    {
      id: "a-3",
      title: "Literature reflection",
      course: "English",
      dueDate: "May 18",
      status: "not-started",
    },
  ],
  attendance: [
    { id: "att-1", course: "Organic Chemistry", attended: 12, total: 14, requiredPercent: 75 },
    { id: "att-2", course: "Economics", attended: 9, total: 10, requiredPercent: 80 },
    { id: "att-3", course: "Physics", attended: 11, total: 13, requiredPercent: 85 },
  ],
  deadlines: [
    { id: "d-1", title: "Calculus midterm review", course: "Mathematics", dueLabel: "Due today", urgency: "urgent" },
    { id: "d-2", title: "Lab report submission", course: "Organic Chemistry", dueLabel: "Due tomorrow", urgency: "upcoming" },
    { id: "d-3", title: "Essay draft", course: "English", dueLabel: "Overdue", urgency: "overdue" },
  ],
  timetable: [
    { id: "t-1", day: "Mon", time: "09:00", course: "Physics", room: "Lab 2" },
    { id: "t-2", day: "Wed", time: "11:00", course: "Economics", room: "R-12" },
    { id: "t-3", day: "Fri", time: "14:00", course: "Organic Chemistry", room: "Sci 4" },
  ],
  calendarEvents: [
    { id: "c-e-1", title: "Physics lab", date: "2026-07-08", time: "09:00", category: "class" },
    { id: "c-e-2", title: "Calculus midterm", date: "2026-07-10", time: "13:00", category: "exam" },
    { id: "c-e-3", title: "Essay draft", date: "2026-07-12", time: "17:00", category: "deadline" },
  ],
  resources: [
    { id: "r-1", title: "Organic chemistry slides", course: "Organic Chemistry", type: "slides", addedAt: "3 days ago" },
    { id: "r-2", title: "Microeconomics article", course: "Economics", type: "pdf", addedAt: "1 week ago" },
    { id: "r-3", title: "Calulus video walkthrough", course: "Mathematics", type: "video", addedAt: "2 days ago" },
  ],
  gpas: [
    { id: "g-1", semester: "Fall 2025", gpa: 3.68, credits: 18 },
    { id: "g-2", semester: "Spring 2025", gpa: 3.72, credits: 16 },
  ],
  conversations: [
    {
      id: "conv-1",
      title: "Explain the Carnot cycle",
      lastMessagePreview: "So the efficiency only depends on the two temperatures?",
      updatedAt: "2 hours ago",
      messages: [
        { id: "msg-1", role: "user", content: "Can you explain the Carnot cycle simply?", timestamp: "10:02 AM" },
        {
          id: "msg-2",
          role: "assistant",
          content: "The Carnot cycle is an idealized thermodynamic cycle that helps define the maximum efficiency of a heat engine.",
          timestamp: "10:02 AM",
        },
      ],
    },
  ],
};
