import type { LoginValues, SignupValues, ForgotPasswordValues } from "@/features/auth/lib/schemas";

const MOCK_LATENCY_MS = 600;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock auth API. Each function's signature matches what the eventual
 * Supabase Auth call will look like (`supabase.auth.signInWithPassword`,
 * `signUp`, `resetPasswordForEmail`), so swapping the implementation later
 * doesn't require touching any component that calls these.
 */
export async function signIn(values: LoginValues): Promise<{ success: true }> {
  await wait(MOCK_LATENCY_MS);
  if (values.password.length < 6) {
    throw new Error("Incorrect email or password.");
  }
  return { success: true };
}

export async function signUp(values: SignupValues): Promise<{ success: true }> {
  await wait(MOCK_LATENCY_MS);
  void values;
  return { success: true };
}

export async function requestPasswordReset(
  values: ForgotPasswordValues,
): Promise<{ success: true }> {
  await wait(MOCK_LATENCY_MS);
  void values;
  return { success: true };
}
