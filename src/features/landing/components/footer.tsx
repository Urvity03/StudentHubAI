import { BrandMark } from "@/shared/components/layout/brand-mark";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "AI Assistant", href: "#features" },
  ],
  Company: [
    { label: "Log in", href: "/login" },
    { label: "Sign up", href: "/signup" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="space-y-2">
          <BrandMark />
          <p className="max-w-xs text-sm text-muted-foreground">
            The academic command center for students who'd rather study than manage tabs.
          </p>
        </div>
        <div className="flex gap-16">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                {section}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 w-full max-w-6xl px-4 text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} StudentHubAI. All rights reserved.
      </div>
    </footer>
  );
}
