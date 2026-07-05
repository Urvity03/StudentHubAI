import { useEffect, useRef, useState } from "react";

interface MockResourceState<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

/**
 * Simulates an async data-fetching hook backed by static mock data.
 *
 * This is the single seam every feature reads through instead of calling
 * `fetch`/mock arrays directly from components (Constitution §3.4/§3.6 intent).
 * When Supabase is introduced, only the body of the hook created by this
 * factory changes — no consuming component needs to change.
 */
export function createMockResource<T>(data: T, delayMs = 350) {
  return function useMockResource(): MockResourceState<T> {
    const [state, setState] = useState<MockResourceState<T>>({
      data: undefined,
      isLoading: true,
      error: undefined,
    });
    const dataRef = useRef(data);

    useEffect(() => {
      let cancelled = false;
      const timer = setTimeout(() => {
        if (!cancelled) {
          setState({ data: dataRef.current, isLoading: false, error: undefined });
        }
      }, delayMs);

      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
      // `delayMs` is fixed per hook instance (captured from the factory's
      // closure, not a prop), so it's intentionally excluded from deps below.
    }, []);

    return state;
  };
}
