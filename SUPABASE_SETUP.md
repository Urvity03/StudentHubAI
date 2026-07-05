# Supabase setup

1. Create a Supabase project.
2. Enable authentication for email/password.
3. Create tables for users, notes, assignments, attendance, deadlines, timetable, resources, and conversations.
4. Add the environment variables below to a .env file:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

5. Replace the current in-memory provider implementation with Supabase-backed queries and mutations.
