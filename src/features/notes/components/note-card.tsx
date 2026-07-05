import { Pin } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import type { Note } from "@/features/notes/types";

export function NoteCard({ note }: { note: Note }) {
  return (
    <Card className="cursor-pointer transition-shadow duration-[var(--duration-base)] hover:shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary">{note.course}</Badge>
          {note.pinned ? <Pin className="size-3.5 shrink-0 fill-current text-primary" /> : null}
        </div>
        <h3 className="mt-3 text-sm font-semibold text-foreground">{note.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{note.excerpt}</p>
        <p className="mt-3 text-xs text-muted-foreground">Updated {note.updatedAt}</p>
      </CardContent>
    </Card>
  );
}
