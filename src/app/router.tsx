/* eslint-disable react-refresh/only-export-components -- router config intentionally colocates lazy page imports with the exported router object */
import { lazy, Suspense, type JSX, type LazyExoticComponent } from "react";
import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/shared/components/layout/app-layout";
import { AuthLayout } from "@/shared/components/layout/auth-layout";
import { MarketingLayout } from "@/shared/components/layout/marketing-layout";
import { PageLoading } from "@/shared/components/feedback/loading";
import { ProtectedRoute, GuestRoute } from "@/shared/components/route-guards";
import NotFoundPage from "@/pages/not-found-page";
import RootErrorPage from "@/pages/root-error-page";

const LandingPage = lazy(() => import("@/features/landing/landing-page"));
const LoginPage = lazy(() => import("@/features/auth/login-page"));
const SignupPage = lazy(() => import("@/features/auth/signup-page"));
const ForgotPasswordPage = lazy(() => import("@/features/auth/forgot-password-page"));
const VerifyEmailPage = lazy(() => import("@/features/auth/verify-email-page"));

const DashboardHomePage = lazy(() => import("@/features/dashboard/dashboard-home-page"));
const NotesPage = lazy(() => import("@/features/notes/notes-page"));
const AssignmentsPage = lazy(() => import("@/features/assignments/assignments-page"));
const DeadlinesPage = lazy(() => import("@/features/deadlines/deadlines-page"));
const AttendancePage = lazy(() => import("@/features/attendance/attendance-page"));
const TimetablePage = lazy(() => import("@/features/timetable/timetable-page"));
const CalendarPage = lazy(() => import("@/features/calendar/calendar-page"));
const CgpaPage = lazy(() => import("@/features/cgpa/cgpa-page"));
const ResourcesPage = lazy(() => import("@/features/resources/resources-page"));
const AiAssistantPage = lazy(() => import("@/features/ai-assistant/ai-assistant-page"));
const AnalyticsPage = lazy(() => import("@/features/analytics/analytics-page"));
const ProfilePage = lazy(() => import("@/features/profile/profile-page"));
const SettingsPage = lazy(() => import("@/features/settings/settings-page"));

/** Wraps a lazily-loaded page in the shared full-page loading fallback. */
function withSuspense(Component: LazyExoticComponent<() => JSX.Element>) {
  return (
    <Suspense fallback={<PageLoading />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <MarketingLayout />,
    errorElement: <RootErrorPage />,
    children: [{ path: "/", element: withSuspense(LandingPage) }],
  },
  {
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    errorElement: <RootErrorPage />,
    children: [
      { path: "/login", element: withSuspense(LoginPage) },
      { path: "/signup", element: withSuspense(SignupPage) },
      { path: "/forgot-password", element: withSuspense(ForgotPasswordPage) },
      { path: "/verify-email", element: withSuspense(VerifyEmailPage) },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <RootErrorPage />,
    children: [
      { index: true, element: withSuspense(DashboardHomePage) },
      { path: "notes", element: withSuspense(NotesPage) },
      { path: "assignments", element: withSuspense(AssignmentsPage) },
      { path: "deadlines", element: withSuspense(DeadlinesPage) },
      { path: "attendance", element: withSuspense(AttendancePage) },
      { path: "timetable", element: withSuspense(TimetablePage) },
      { path: "calendar", element: withSuspense(CalendarPage) },
      { path: "cgpa", element: withSuspense(CgpaPage) },
      { path: "resources", element: withSuspense(ResourcesPage) },
      { path: "assistant", element: withSuspense(AiAssistantPage) },
      { path: "analytics", element: withSuspense(AnalyticsPage) },
      { path: "profile", element: withSuspense(ProfilePage) },
      { path: "settings", element: withSuspense(SettingsPage) },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
