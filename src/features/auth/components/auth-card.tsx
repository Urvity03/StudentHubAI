import type * as React from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/** Shared visual frame for login, signup, forgot-password, and verify-email. */
export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="space-y-6 rounded-[var(--radius-xl)] border border-border bg-card p-7 shadow-sm animate-slide-up">
      <div className="space-y-1.5 text-center">
        <h1 className="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
      {footer ? <div className="text-center text-sm text-muted-foreground">{footer}</div> : null}
    </div>
  );
}
