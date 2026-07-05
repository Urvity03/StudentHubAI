import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { AuthCard } from "@/features/auth/components/auth-card";
import { FormFieldError } from "@/features/auth/components/form-field-error";
import { signupSchema, type SignupValues } from "@/features/auth/lib/schemas";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useApp } from "@/shared/providers/use-app";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useApp();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (values: SignupValues) => {
    setFormError(null);
    try {
      await signUp(values.name, values.email, values.password);
      navigate("/verify-email", { state: { email: values.email } });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <AuthCard
      title="Create your account"
      description="Set up your academic command center."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" autoComplete="name" placeholder="Aditi Rao" {...register("name")} />
          <FormFieldError message={errors.name?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@university.edu" {...register("email")} />
          <FormFieldError message={errors.email?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" {...register("password")} />
          <FormFieldError message={errors.password?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" autoComplete="new-password" {...register("confirmPassword")} />
          <FormFieldError message={errors.confirmPassword?.message} />
        </div>
        {formError ? <p className="text-sm font-medium text-destructive">{formError}</p> : null}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
          Create account
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthCard>
  );
}
