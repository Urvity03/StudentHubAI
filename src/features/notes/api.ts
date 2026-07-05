import { createMockResource } from "@/shared/lib/create-mock-resource";
import type { Note } from "@/features/notes/types";

const MOCK_NOTES: Note[] = [
  {
    id: "note-1",
    title: "Convolution theorem proof",
    course: "Signals & Systems",
    excerpt: "Fourier transform of a convolution equals the product of the individual transforms...",
    updatedAt: "2 hours ago",
    pinned: true,
  },
  {
    id: "note-2",
    title: "Midterm review — thermodynamics",
    course: "Thermal Physics",
    excerpt: "First law, entropy, Carnot cycle efficiency, key equations to memorize before Thursday...",
    updatedAt: "Yesterday",
    pinned: true,
  },
  {
    id: "note-3",
    title: "Seminar notes: market structures",
    course: "Microeconomics",
    excerpt: "Monopolistic competition differs from oligopoly in the number of firms and barriers...",
    updatedAt: "2 days ago",
    pinned: false,
  },
  {
    id: "note-4",
    title: "Lab write-up outline",
    course: "Organic Chemistry",
    excerpt: "Recrystallization procedure, expected yield calculation, safety considerations...",
    updatedAt: "4 days ago",
    pinned: false,
  },
];

/**
 * Mock notes resource. The consuming page (`notes-page.tsx`) only ever calls
 * this hook — when Supabase is wired up, this file is the only thing that
 * changes (a real query replaces `MOCK_NOTES`).
 */
export const useNotes = createMockResource(MOCK_NOTES);
