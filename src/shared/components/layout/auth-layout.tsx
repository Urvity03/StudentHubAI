import { Outlet } from "react-router-dom";

import { BrandMark } from "@/shared/components/layout/brand-mark";
import { ThemeToggle } from "@/shared/components/theme-toggle";

/** Centered card layout shared by login, signup, forgot-password, and verify-email. */
export function AuthLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="flex h-16 items-center justify-between px-4 sm:px-6">
        <BrandMark />
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
