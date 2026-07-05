import { NavLink } from "react-router-dom";

import { NAV_SECTIONS } from "@/shared/config/nav-config";
import { cn } from "@/shared/lib/utils";

/**
 * The actual nav link list. Shared between the fixed desktop Sidebar and
 * the mobile Sheet so both surfaces render identically from one source.
 */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-4">
      {NAV_SECTIONS.map((section) => (
        <div key={section.label} className="space-y-1">
          <p className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            {section.label}
          </p>
          {section.items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/dashboard"}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground/80 hover:bg-secondary hover:text-foreground",
                )
              }
            >
              <item.icon className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  );
}
