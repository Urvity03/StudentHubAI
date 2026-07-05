import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loader2, MailCheck } from "lucide-react";

import { AuthCard } from "@/features/auth/components/auth-card";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/hooks/use-toast";

interface VerifyEmailLocationState {
  email?: string;
}

export default function VerifyEmailPage() {
  const location = useLocation();
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);
  const email = (location.state as VerifyEmailLocationState | null)?.email ?? "your email";

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsResending(false);
    toast({ title: "Verification email resent", description: `We sent another link to ${email}.` });
  };

  return (
    <AuthCard
      title="Verify your email"
      description={`We sent a verification link to ${email}.`}
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to log in
        </Link>
      }
    >
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="size-5" />
        </div>
        <p className="text-sm text-muted-foreground">
          Click the link in that email to activate your account. Once verified, you can log in.
        </p>
        <Button variant="outline" size="sm" onClick={handleResend} disabled={isResending}>
          {isResending ? <Loader2 className="size-4 animate-spin" /> : null}
          Resend email
        </Button>
      </div>
    </AuthCard>
  );
}
