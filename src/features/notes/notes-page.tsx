import { NotebookText } from "lucide-react";

import { NewNoteDialog } from "@/features/notes/components/new-note-dialog";
import { NoteCard } from "@/features/notes/components/note-card";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { CardGridSkeleton } from "@/shared/components/feedback/loading";
import { PageHeader } from "@/shared/components/page-header";
import { useApp } from "@/shared/providers/use-app";

export default function NotesPage() {
  const { notes, isLoading } = useApp();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notes"
        description="Everything you've written down, organized by course."
        actions={<NewNoteDialog />}
      />
      {isLoading ? (
        <CardGridSkeleton count={4} className="lg:grid-cols-3" />
      ) : notes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={NotebookText}
          title="No notes yet"
          description="Create your first note to start building your course library."
        />
      )}
    </div>
  );
}
