import { useState } from "react";

import { PageHeader } from "@/shared/components/page-header";
import { useToast } from "@/shared/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";

export default function ProfilePage() {
  const { toast } = useToast();
  const [name, setName] = useState("Aditi Rao");
  const [university, setUniversity] = useState("State University");
  const [major, setMajor] = useState("Computer Science");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Your personal and academic details." />
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg">AR</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change photo
            </Button>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="full-name">Full name</Label>
              <Input id="full-name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" type="email" value="aditi.rao@university.edu" disabled />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="university">University</Label>
              <Input id="university" value={university} onChange={(event) => setUniversity(event.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="major">Major</Label>
              <Input id="major" value={major} onChange={(event) => setMajor(event.target.value)} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => void handleSave()} disabled={isSaving}>
              {isSaving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
