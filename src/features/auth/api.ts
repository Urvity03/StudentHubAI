import { supabase } from "@/shared/lib/supabase";
import type {
  LoginValues,
  SignupValues,
  ForgotPasswordValues,
} from "@/features/auth/lib/schemas";

export async function signIn(values: LoginValues): Promise<{ success: true }> {
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function signUp(values: SignupValues): Promise<{ success: true }> {
  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        name: values.name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function requestPasswordReset(
  values: ForgotPasswordValues,
): Promise<{ success: true }> {
  const { error } = await supabase.auth.resetPasswordForEmail(
    values.email,
    {
      redirectTo: `${window.location.origin}/reset-password`,
    },
  );

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}