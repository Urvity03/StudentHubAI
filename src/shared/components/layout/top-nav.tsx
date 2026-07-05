import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Settings, User as UserIcon } from "lucide-react";

import { BrandMark } from "@/shared/components/layout/brand-mark";
import { SidebarNav } from "@/shared/components/layout/sidebar-nav";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";

/** Top bar shown on every dashboard page: mobile nav trigger, theme toggle, user menu. */
export function TopNav() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetHeader className="h-14 justify-center border-b border-border px-4">
              <SheetTitle asChild>
                <BrandMark to="/dashboard" />
              </SheetTitle>
            </SheetHeader>
            <SidebarNav onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="lg:hidden">
          <BrandMark to="/dashboard" />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account menu">
              <Avatar className="size-8">
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-medium text-foreground">Aditi Rao</p>
              <p className="text-xs text-muted-foreground">aditi.rao@university.edu</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/profile">
                <UserIcon className="size-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings">
                <Settings className="size-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/">
                <LogOut className="size-4" /> Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
