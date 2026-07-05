import { useSyncExternalStore } from "react";

function subscribe(query: string) {
  return (callback: () => void) => {
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", callback);
    return () => mediaQueryList.removeEventListener("change", callback);
  };
}

/**
 * Tracks whether a CSS media query currently matches, via useSyncExternalStore
 * (the correct primitive for subscribing to an external browser API — avoids
 * the setState-in-effect pattern a naive implementation would use).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore<boolean>(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}
