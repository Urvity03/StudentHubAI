import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Calendar,
  CalendarClock,
  CalendarDays,
  CheckSquare,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Library,
  MessageSquare,
  NotebookText,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

/**
 * Single source of truth for dashboard navigation, consumed by both the
 * desktop Sidebar and the mobile Sheet nav — this is what keeps the two
 * surfaces from drifting out of sync (Constitution: no duplicated code).
 */
export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Academics",
    items: [
      { label: "Notes", href: "/dashboard/notes", icon: NotebookText },
      { label: "Assignments", href: "/dashboard/assignments", icon: CheckSquare },
      { label: "Deadlines", href: "/dashboard/deadlines", icon: CalendarClock },
      { label: "Attendance", href: "/dashboard/attendance", icon: ClipboardList },
      { label: "Timetable", href: "/dashboard/timetable", icon: Calendar },
      { label: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
      { label: "CGPA Tracker", href: "/dashboard/cgpa", icon: GraduationCap },
      { label: "Resources", href: "/dashboard/resources", icon: Library },
    ],
  },
  {
    label: "AI",
    items: [{ label: "Study Assistant", href: "/dashboard/assistant", icon: MessageSquare }],
  },
  {
    label: "Insights",
    items: [{ label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 }],
  },
];

export const ALL_NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((section) => section.items);
