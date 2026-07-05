# Architecture

## Overview
StudentHubAI is a React + TypeScript + Vite single-page application organized by feature folders. Shared UI primitives live in the shared layer, while feature-specific state, page components, and route-level concerns stay colocated with their product domain.

## Runtime structure
- App shell: [src/app/App.tsx](src/app/App.tsx)
- Routing: [src/app/router.tsx](src/app/router.tsx)
- Shared providers: [src/shared/providers/app-provider.tsx](src/shared/providers/app-provider.tsx)
- Route guards: [src/shared/components/route-guards.tsx](src/shared/components/route-guards.tsx)

## Design principles
- Feature folders own their screens and components.
- Shared providers keep auth and core student data consistent across the app.
- The router uses lazy-loaded routes with suspense and designated error boundaries.
- Reusable UI and layout primitives are centralized in the shared layer.

## Future Supabase integration
The current provider layer is designed to be the seam for Supabase-backed persistence. Replace the in-memory provider implementation with Supabase data access without changing page components.
