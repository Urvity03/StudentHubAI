import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { AuthCard } from "@/features/auth/components/auth-card";
import { FormFieldError } from "@/features/auth/components/form-field-error";
import { loginSchema, type LoginValues } from "@/features/auth/lib/schemas";
import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useApp } from "@/shared/providers/use-app";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useApp();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    setFormError(null);
    try {
      await signIn(values.email, values.password);
      toast({ title: "Welcome back", description: "You're signed in." });
      navigate("/dashboard");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <AuthCard
      title="Log in to StudentHubAI"
      description="Pick up right where you left off."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@university.edu" {...register("email")} />
          <FormFieldError message={errors.email?.message} />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" autoComplete="current-password" {...register("password")} />
          <FormFieldError message={errors.password?.message} />
        </div>
        {formError ? <p className="text-sm font-medium text-destructive">{formError}</p> : null}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
          Log in
        </Button>
      </form>
    </AuthCard>
  );
}
