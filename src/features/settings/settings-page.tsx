import { useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import { useTheme } from "@/app/providers/theme-provider";
import { PageHeader } from "@/shared/components/page-header";
import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";

const THEME_OPTIONS = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="Settings" description="Manage your preferences." />

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {THEME_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-[var(--radius-md)] border p-4 text-sm font-medium transition-colors",
                  theme === option.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:bg-secondary",
                )}
              >
                <option.icon className="size-4" />
                {option.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Email notifications</p>
              <p className="text-xs text-muted-foreground">Weekly digest of your upcoming week.</p>
            </div>
            <Button
              variant={emailNotifications ? "default" : "outline"}
              size="sm"
              onClick={() => setEmailNotifications((v) => !v)}
            >
              {emailNotifications ? "On" : "Off"}
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Deadline reminders</p>
              <p className="text-xs text-muted-foreground">Get notified 24 hours before something's due.</p>
            </div>
            <Button
              variant={deadlineReminders ? "default" : "outline"}
              size="sm"
              onClick={() => setDeadlineReminders((v) => !v)}
            >
              {deadlineReminders ? "On" : "Off"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() =>
              toast({ title: "Not available yet", description: "Account deletion will be enabled once accounts are live." })
            }
          >
            Delete account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
