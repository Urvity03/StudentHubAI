import { Monitor, Moon, Sun } from "lucide-react";

import { useTheme } from "@/app/providers/theme-provider";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

/** Light / dark / system theme switcher, used in the top nav. */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          {resolvedTheme === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setTheme("light")} className="justify-between">
          <span className="flex items-center gap-2">
            <Sun className="size-4" /> Light
          </span>
          {theme === "light" && <span className="text-primary">•</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("dark")} className="justify-between">
          <span className="flex items-center gap-2">
            <Moon className="size-4" /> Dark
          </span>
          {theme === "dark" && <span className="text-primary">•</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("system")} className="justify-between">
          <span className="flex items-center gap-2">
            <Monitor className="size-4" /> System
          </span>
          {theme === "system" && <span className="text-primary">•</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
