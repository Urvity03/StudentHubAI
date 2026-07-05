import { useMemo, useState, type ReactNode } from "react";

import type { Assignment } from "@/features/assignments/types";
import type { CourseAttendance } from "@/features/attendance/types";
import type { CalendarEvent } from "@/features/calendar/types";
import type { Deadline } from "@/features/deadlines/types";
import type { Note } from "@/features/notes/types";
import type { Resource } from "@/features/resources/types";
import type { SemesterGpa } from "@/features/cgpa/types";
import type { TimetableSlot } from "@/features/timetable/types";
import type { ChatMessage, Conversation } from "@/features/ai-assistant/types";
import { AppContext, type AppState } from "@/shared/providers/app-context";
import { initialAppData } from "@/shared/providers/app-data";

interface AppUser {
  id: string;
  name: string;
  email: string;
  university: string;
  major: string;
  avatarInitials: string;
}

const initialUser: AppUser = initialAppData.user;
const initialNotes: Note[] = initialAppData.notes;
const initialAssignments: Assignment[] = initialAppData.assignments;
const initialAttendance: CourseAttendance[] = initialAppData.attendance;
const initialDeadlines: Deadline[] = initialAppData.deadlines;
const initialTimetable: TimetableSlot[] = initialAppData.timetable;
const initialCalendarEvents: CalendarEvent[] = initialAppData.calendarEvents;
const initialResources: Resource[] = initialAppData.resources;
const initialGpas: SemesterGpa[] = initialAppData.gpas;
const initialConversations: Conversation[] = initialAppData.conversations;

function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser>(() => initialUser);
  const [notes, setNotes] = useState<Note[]>(() => initialNotes);
  const [assignments] = useState<Assignment[]>(() => initialAssignments);
  const [attendance] = useState<CourseAttendance[]>(() => initialAttendance);
  const [deadlines] = useState<Deadline[]>(() => initialDeadlines);
  const [timetable] = useState<TimetableSlot[]>(() => initialTimetable);
  const [calendarEvents] = useState<CalendarEvent[]>(() => initialCalendarEvents);
  const [resources] = useState<Resource[]>(() => initialResources);
  const [gpas] = useState<SemesterGpa[]>(() => initialGpas);
  const [conversations, setConversations] = useState<Conversation[]>(() => initialConversations);
  const [isAuthenticated, setIsAuthenticated] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("studenthubai-auth") === "true");
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!email || password.length < 6) {
      throw new Error("Incorrect email or password.");
    }
    setUser((current) => ({ ...current, email, name: current.name || "Student" }));
    setIsAuthenticated(true);
    window.localStorage.setItem("studenthubai-auth", "true");
    setIsLoading(false);
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!name || !email || password.length < 6) {
      throw new Error("Please fill in all fields with a valid password.");
    }
    setUser({ ...initialUser, name, email, avatarInitials: name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() });
    setIsAuthenticated(true);
    window.localStorage.setItem("studenthubai-auth", "true");
    setIsLoading(false);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    window.localStorage.removeItem("studenthubai-auth");
  };

  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!email) {
      throw new Error("Please enter a valid email.");
    }
    setIsLoading(false);
  };

  const createNote = (input: { title: string; course: string; content: string }) => {
    const note: Note = {
      id: `note-${Date.now()}`,
      title: input.title,
      course: input.course,
      excerpt: input.content.slice(0, 96),
      updatedAt: "Just now",
      pinned: false,
    };
    setNotes((current) => [note, ...current]);
  };

  const updateProfile = (input: Partial<AppUser>) => {
    setUser((current) => ({ ...current, ...input }));
  };

  const addConversationMessage = async (conversationId: string, content: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
      timestamp: "Just now",
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, lastMessagePreview: content, updatedAt: "Just now", messages: [...conversation.messages, userMessage] }
          : conversation,
      ),
    );

    await new Promise((resolve) => setTimeout(resolve, 500));

    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now()}-a`,
      role: "assistant",
      content: `I’ve captured your note about “${content}”. I can help you break it down into next steps or quiz you on it.`,
      timestamp: "Just now",
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, lastMessagePreview: assistantMessage.content, messages: [...conversation.messages, assistantMessage] }
          : conversation,
      ),
    );
  };

  const value = useMemo<AppState>(
    () => ({
      user,
      notes,
      assignments,
      attendance,
      deadlines,
      timetable,
      calendarEvents,
      resources,
      gpas,
      conversations,
      isAuthenticated,
      isLoading,
      signIn,
      signUp,
      signOut,
      requestPasswordReset,
      createNote,
      updateProfile,
      addConversationMessage,
    }),
    [assignments, attendance, calendarEvents, conversations, deadlines, gpas, isAuthenticated, isLoading, notes, resources, timetable, user],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider };
