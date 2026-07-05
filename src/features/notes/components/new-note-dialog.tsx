import { useState } from "react";
import { Plus } from "lucide-react";

import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

export function NewNoteDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleCreate = () => {
    setOpen(false);
    toast({ title: "Note created", description: "Your note has been saved." });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-4" /> New note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New note</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="note-title">Title</Label>
            <Input id="note-title" placeholder="e.g. Chapter 4 summary" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="note-course">Course</Label>
            <Input id="note-course" placeholder="e.g. Organic Chemistry" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="note-body">Content</Label>
            <Textarea id="note-body" rows={5} placeholder="Start writing..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Save note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
