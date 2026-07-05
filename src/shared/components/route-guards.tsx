import { Navigate, useLocation } from "react-router-dom";

import { useApp } from "@/shared/providers/use-app";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
