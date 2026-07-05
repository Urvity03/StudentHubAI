import { BrandMark } from "@/shared/components/layout/brand-mark";
import { SidebarNav } from "@/shared/components/layout/sidebar-nav";

/** Fixed desktop sidebar. Hidden below `lg`; the TopNav's Sheet takes over on smaller screens. */
export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <BrandMark to="/dashboard" />
      </div>
      <SidebarNav />
    </aside>
  );
}
