import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/app/providers/theme-provider";
import { router } from "@/app/router";
import { Toaster } from "@/shared/components/toaster";
import { AppProvider } from "@/shared/providers/app-provider";
import { TooltipProvider } from "@/shared/ui/tooltip";

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <TooltipProvider delayDuration={200}>
          <RouterProvider router={router} />
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
