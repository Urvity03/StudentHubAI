import * as React from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = "studenthubai-theme";

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined);

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
}

function subscribeToSystemTheme(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSystemThemeSnapshot(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(getStoredTheme);
  // useSyncExternalStore is the correct primitive for reading external state
  // (the OS color-scheme preference) — it avoids the setState-in-effect
  // anti-pattern that a naive matchMedia + useEffect subscription falls into.
  const systemTheme = React.useSyncExternalStore<"light" | "dark">(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    () => "light",
  );
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const setTheme = React.useCallback((next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- the useTheme hook is intentionally colocated with its provider
export function useTheme() {
  const context = React.useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
