import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, MailCheck } from "lucide-react";

import { AuthCard } from "@/features/auth/components/auth-card";
import { FormFieldError } from "@/features/auth/components/form-field-error";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/features/auth/lib/schemas";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useApp } from "@/shared/providers/use-app";

export default function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const { requestPasswordReset } = useApp();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (values: ForgotPasswordValues) => {
    await requestPasswordReset(values.email);
    setSentTo(values.email);
  };

  if (sentTo) {
    return (
      <AuthCard title="Check your email" description={`We sent a reset link to ${sentTo}.`}>
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="size-5" />
          </div>
          <p className="text-sm text-muted-foreground">
            Didn&apos;t get it? Check your spam folder, or try again with a different address.
          </p>
          <Button variant="outline" size="sm" onClick={() => setSentTo(null)}>
            Use a different email
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email and we'll send you a reset link."
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to log in
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@university.edu" {...register("email")} />
          <FormFieldError message={errors.email?.message} />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
          Send reset link
        </Button>
      </form>
    </AuthCard>
  );
}
