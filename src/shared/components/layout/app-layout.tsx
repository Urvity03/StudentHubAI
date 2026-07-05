import { Outlet } from "react-router-dom";

import { ErrorBoundary } from "@/shared/components/feedback/error-boundary";
import { Sidebar } from "@/shared/components/layout/sidebar";
import { TopNav } from "@/shared/components/layout/top-nav";

/** Root shell for every authenticated /dashboard/* route. */
export function AppLayout() {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
            <ErrorBoundary fallbackTitle="This page couldn't load">
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}
