import { createContext } from "react";

import type { Assignment } from "@/features/assignments/types";
import type { CourseAttendance } from "@/features/attendance/types";
import type { CalendarEvent } from "@/features/calendar/types";
import type { Deadline } from "@/features/deadlines/types";
import type { Note } from "@/features/notes/types";
import type { Resource } from "@/features/resources/types";
import type { SemesterGpa } from "@/features/cgpa/types";
import type { TimetableSlot } from "@/features/timetable/types";
import type { Conversation } from "@/features/ai-assistant/types";

interface AppUser {
  id: string;
  name: string;
  email: string;
  university: string;
  major: string;
  avatarInitials: string;
}

export interface AppState {
  user: AppUser;
  notes: Note[];
  assignments: Assignment[];
  attendance: CourseAttendance[];
  deadlines: Deadline[];
  timetable: TimetableSlot[];
  calendarEvents: CalendarEvent[];
  resources: Resource[];
  gpas: SemesterGpa[];
  conversations: Conversation[];
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  createNote: (input: { title: string; course: string; content: string }) => void;
  updateProfile: (input: Partial<AppUser>) => void;
  addConversationMessage: (conversationId: string, content: string) => Promise<void>;
}

export const AppContext = createContext<AppState | undefined>(undefined);
