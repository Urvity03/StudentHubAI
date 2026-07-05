# StudentHubAI

The academic command center for students — notes, assignments, timetable, CGPA tracking, and an AI study assistant in one place.

This is the frontend MVP: a complete, production-ready UI built on mock data. No backend is wired up yet — every data hook lives behind a small seam (`features/*/api.ts`) so Supabase can be connected later without touching any component.

## Stack

- React 19 + TypeScript (strict)
- Vite 8
- Tailwind CSS v4 (CSS-first config, see `src/index.css`)
- shadcn/ui-style primitives (`src/shared/ui/`)
- React Router 7
- React Hook Form + Zod for form validation
- Recharts for the CGPA and analytics charts

## Getting started

```bash
npm install
npm run dev
```

- `npm run build` — type-checks (`tsc -b`) then builds for production
- `npm run lint` — ESLint across the whole project
- `npm run preview` — serve the production build locally

## Project structure

```
src/
├── app/                 # App shell: router, providers (theme)
├── features/            # One folder per product area (notes, assignments,
│                         # attendance, timetable, calendar, cgpa, resources,
│                         # ai-assistant, analytics, auth, dashboard, profile,
│                         # settings, landing). Each feature owns its types,
│                         # its mock `api.ts`, and its components.
├── shared/
│   ├── ui/               # shadcn-style primitives (button, card, dialog, ...)
│   ├── components/       # App-wide composed components (layout, feedback,
│   │                      page header, stat card, theme toggle)
│   ├── hooks/             # Cross-feature hooks (use-toast, use-media-query)
│   ├── lib/                # cn() helper, mock-resource factory
│   └── config/              # Nav config (single source of truth for sidebar)
└── pages/                # Route-level fallbacks (404, router error boundary)
```

## Connecting Supabase later

Every feature's `api.ts` exports hooks (`useNotes`, `useAssignments`, etc.) built with `createMockResource` from `shared/lib/create-mock-resource.ts`. When Supabase is introduced:

1. Replace the mock hook body with a real Supabase query (e.g. via `@supabase/supabase-js` + a query library).
2. Keep the same return shape (`{ data, isLoading, error }`).
3. No consuming component changes — they only ever call the hook, never touch data fetching directly.

Auth works the same way: `features/auth/api.ts` exports `signIn`, `signUp`, and `requestPasswordReset`, each shaped to match the eventual `supabase.auth.*` calls.

## Engineering standards

This project follows `ENGINEERING_CONSTITUTION.md` at the repo root. Read it before making structural changes — in particular the layer-boundary rules (§1.3) and the frontend standards (§3).
