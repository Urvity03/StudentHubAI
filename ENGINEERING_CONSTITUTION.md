# ENGINEERING_CONSTITUTION.md

*This document governs every line of code written in this repository. It is not a style guide — it is the law. Any deviation requires an explicit, reviewed ADR (see §14), not a one-off exception in a PR.*

---

# ENGINEERING_CONSTITUTION.md

*This document governs every line of code written in this repository. It is not a style guide — it is the law. Any deviation requires an explicit, reviewed ADR (see §14), not a one-off exception in a PR.*

> **Frontend-application adaptation note (StudentHubAI):** this Constitution was originally written for a Python/FastAPI multi-service backend (MLCopilot). This repository is a React + TypeScript + Vite + Supabase SPA, so the sections below apply as follows until a real backend exists:
> - **Directly applicable as written:** §1.3 (layer boundaries — translated as UI → hooks → `api.ts` seam, enforced in this repo), §3 (Frontend Standards), §6.2/6.3/6.4 (TypeScript/naming/comments), §8 (Git Workflow), §13 (Code Review Checklist, frontend items), §15 (Definition of Done, frontend items).
> - **Not yet applicable:** §2 (FastAPI/SQLAlchemy backend standards), §4 (Database Standards), most of §9/§10 backend items — these become relevant once Supabase is wired up, and should be revisited (via ADR) at that point rather than ignored indefinitely.
> - **Applied with translation:** §7 Testing Standards → Vitest/Playwright equivalents of the same intent (golden-dataset-style fixtures aren't relevant yet since there's no ML pipeline in this app; the "no bugfix without a regression test" principle still applies).

---



### 1.1 Folder Structure (canonical, do not deviate without an ADR)

```
mlcopilot/
├── apps/
│   ├── web/                     # Next.js frontend — presentation only, no business logic
│   └── core-api/                # FastAPI — auth, projects, orchestration, thin HTTP layer
├── services/
│   ├── ledger/
│   ├── facts-layer/
│   ├── graph-engine/
│   ├── reasoning-engine/
│   ├── replay-engine/
│   ├── pattern-memory/
│   ├── experiment-service/
│   ├── notifications/
│   └── reporting/
├── packages/
│   ├── sdk-python/
│   └── shared-types/             # generated from OpenAPI — never hand-edited
├── infra/
├── docs/
│   └── adr/
└── tests/
    └── golden-datasets/
```

Each `services/*` directory is a **standalone deployable unit** with its own `Dockerfile`, its own dependency manifest, and no filesystem-level imports from another service. Cross-service communication is via the queue or a documented internal API — never a shared Python import path. This is non-negotiable: it's what keeps the service boundaries in §1.3 real instead of aspirational.

### 1.2 Dependency Direction

Dependencies flow **one way, inward**, per service:

```
API/HTTP layer  →  Service layer  →  Repository layer  →  Database
```

- The API layer may depend on the Service layer. The Service layer may depend on the Repository layer. **Never the reverse.**
- The Repository layer knows nothing about HTTP, FastAPI, or Pydantic request/response models — it speaks only in domain objects and SQLAlchemy models.
- The Service layer contains all business logic and is the only layer allowed to orchestrate multiple repositories or call another internal service.
- Cross-service dependencies (e.g., Reasoning Engine depending on Graph Engine) are always through that service's published internal client, never a direct DB read of another service's tables.

### 1.3 Layer Boundaries

| Layer | May depend on | Must NOT depend on |
|---|---|---|
| API/routes | Service layer, Pydantic schemas | SQLAlchemy models directly, other services' internals |
| Service layer | Repository layer, other services' internal clients | FastAPI request/response objects |
| Repository layer | SQLAlchemy models, DB session | Service layer, API layer, business logic |
| Frontend components | Hooks, API client layer | Direct fetch calls, other components' internal state |

A Pull Request that imports a repository directly into a route handler, or a SQLAlchemy model into a Pydantic schema file, fails review on architecture grounds alone — this is checked explicitly in the review checklist (§16).

### 1.4 Service Ownership

Every service in `services/*` has exactly one owning team (or, pre-team-scale, one clearly named accountable engineer in `docs/OWNERS.md`). Cross-service schema changes (e.g., a new Ledger event type that Graph Engine must consume) require sign-off from both owners before merge — this is enforced via CODEOWNERS, not convention.

### 1.5 Module Isolation

No service may import another service's internal modules. The only sanctioned inter-service contracts are: (1) the Ledger event schema, (2) each service's published internal REST/RPC client in `packages/shared-types`, (3) the queue message schema. If two services need to share logic, that logic is extracted to `packages/` as a versioned, independently-tested package — it is never copy-pasted, and it is never imported cross-service ad hoc.

---

## 2. Backend Standards

### 2.1 FastAPI Conventions

- One `APIRouter` per resource, mounted with an explicit `prefix` and `tags`.
- Route handlers are **thin**: parse/validate input (via Pydantic), call exactly one service method, return the result. No business logic in a route handler — if a handler has an `if` statement doing anything besides input shape checking, it belongs in the service layer.
- All request/response models are explicit Pydantic classes, never raw `dict`.
- Dependencies (DB session, current user, feature flags) are injected via FastAPI's `Depends`, never imported as globals.

### 2.2 SQLAlchemy Conventions

- Models live in `repository/models/`, one file per aggregate root.
- No lazy-loading relationships relied upon across a service boundary — a repository method returns fully-hydrated domain objects with explicit eager loading, or the caller explicitly requests a related-object fetch.
- All queries are scoped by `org_id`/`project_id` at the repository layer by default — there is no "unscoped" query method available to callers; if you need a genuinely global query (admin tooling), it lives in an explicitly named `admin_repository` with its own review scrutiny.

### 2.3 Repository Pattern

- One repository class per aggregate (`ProjectRepository`, `DatasetRepository`, `GraphNodeRepository`, etc.).
- Repository methods are named for intent, not SQL shape: `get_open_recommendations_for_project(project_id)`, not `find_by_status_and_project`.
- Repositories never contain business rules — they contain query construction and persistence only.

### 2.4 Service Layer

- One service class per business capability, injected with the repositories it needs via constructor injection.
- Services are the only place allowed to raise domain-specific exceptions (see §2.6).
- Services are the only place allowed to call another internal service's client.

### 2.5 Dependency Injection

- All cross-cutting dependencies (DB session, current user/org context, config, LLM client) are provided via FastAPI `Depends` at the route layer and passed down explicitly — no service or repository reaches into a global singleton for its dependencies. This is what makes every layer independently unit-testable without spinning up the full app.

### 2.6 Error Handling

- Domain exceptions are defined per service (`LeakageCheckFailed`, `InsufficientCausalHistory`, `ProjectNotFound`) and inherit from a shared `MLCopilotError` base.
- A single global exception handler in each service's FastAPI app translates domain exceptions to the standard `{error:{code,message}}` response shape (§4) — individual route handlers never construct error responses manually.
- Errors are never silently swallowed. A `try/except` with no re-raise and no logged context is a review-blocking finding.

### 2.7 Logging

- Structured JSON logging only, one logger per module (`logging.getLogger(__name__)`), never `print`.
- Every log line in a request-handling path includes the request's correlation ID (propagated via middleware) so a single request can be traced across services.
- No raw customer data (dataset contents, PII) in log messages — log identifiers (`dataset_id`, `project_id`), never payload contents.

### 2.8 Configuration Management

- All configuration via environment variables, loaded once at startup into a validated Pydantic `Settings` object — never read from `os.environ` scattered through the codebase.
- The app fails fast at boot if a required setting is missing — no silent defaults for anything security- or correctness-critical (DB URL, secret keys, LLM provider credentials).

### 2.9 Async Guidelines

- Route handlers are `async def` by default; any call to a blocking library (e.g., certain ML/stats libraries) is offloaded via a thread pool executor, never awaited directly in the event loop.
- Long-running work (Facts Layer probes, SHAP computation, graph rebuilds) is never performed inline in a request handler — it is always dispatched to a background worker and the API returns a job reference immediately (HTTP 202).

### 2.10 Background Jobs

- Every job is idempotent — re-running a job with the same input must not produce duplicate Ledger events, graph nodes, or facts. This is enforced via a deterministic idempotency key derived from the job's input, checked before write.
- Every job has an explicit timeout and a defined retry policy (max retries, backoff) — no unbounded retries.
- Job failures are logged with full context and surfaced to the Notification Service if user-visible.

---

## 3. Frontend Standards

### 3.1 React Architecture

- Functional components with hooks only. No class components.
- Server state (API data) lives in React Query. Local/UI-only state lives in component state or Zustand. **Never duplicate server state into local state** — this is a review-blocking pattern (it's the most common source of stale-data bugs).

### 3.2 Component Organization / Feature Folders

```
apps/web/src/
├── features/
│   ├── investigation/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   └── types.ts
│   ├── graph/
│   └── replay/
├── shared/
│   ├── components/      # truly generic, used by 2+ features
│   ├── hooks/
│   └── ui/               # design-system primitives (shadcn-based)
```

A component belongs in `shared/` only once it is actually used by two or more features — premature generalization into `shared/` before that is a review-blocking finding, not a nice-to-have.

### 3.3 State Management

- Global client state is minimized by design — most state should be derivable from React Query cache or URL params (filters, selected node, etc. belong in the URL, not a store), so that state is shareable and refresh-safe.

### 3.4 API Layer

- All backend calls go through a single generated client (from `packages/shared-types`' OpenAPI spec) — no hand-written `fetch` calls to backend endpoints anywhere in feature code.
- Every feature's `api.ts` wraps the generated client in React Query hooks (`useProjectGraph`, `useSubmitReplay`) — components never call the raw client directly.

### 3.5 Forms

- All forms use a single form library (React Hook Form) with schema-based validation (Zod), sharing the same schema definitions as the backend's Pydantic models where the shape overlaps (kept in sync via `shared-types`).

### 3.6 Validation

- Client-side validation is always a UX convenience, never the source of truth — every input is re-validated server-side regardless of client validation state. A PR that relies solely on client validation for a security- or data-integrity-relevant field fails review.

### 3.7 Error Boundaries

- Every top-level route is wrapped in an error boundary with a feature-specific fallback (not a generic "something went wrong") — per the product principle that error states are designed, not defaulted (see prior Frontend Design work).

### 3.8 Accessibility

- WCAG AA minimum on all shipped screens: contrast ratios verified, all interactive elements keyboard-reachable, ARIA labels on custom canvas/graph visualizations with a text-equivalent summary available. Accessibility is checked in the PR checklist (§16), not treated as a follow-up ticket.

---

## 4. Database Standards

### 4.1 Naming

- Tables: `snake_case`, plural (`graph_nodes`, `training_jobs`).
- Columns: `snake_case`, singular concepts (`created_at`, `project_id`).
- Foreign keys: `{referenced_table_singular}_id` (`project_id`, `dataset_version_id`).
- Enums: defined as Postgres enums or constrained varchar with a check constraint, named `{table}_{column}_enum`.

### 4.2 Indexes

- Every foreign key column is indexed.
- Every column used in a `WHERE` clause of a repository method's primary access pattern is indexed — added in the same migration as the query that needs it, never as an afterthought.
- Composite indexes are ordered by selectivity (most selective column first) and documented with a comment explaining the query they support.

### 4.3 Migrations

- One migration per logical schema change, generated via Alembic, always reviewed for a corresponding down-migration.
- Migrations never contain data backfills mixed with schema changes — backfills are separate, explicitly named migrations or scripts, run and verified independently.
- No migration is merged without having been run against a copy of realistic-volume data in CI or staging.

### 4.4 Transactions

- Any operation that writes to more than one table atomically (e.g., creating a graph node and its Ledger event reference) is wrapped in an explicit transaction at the service layer — never assumed from ORM auto-commit behavior.

### 4.5 Foreign Keys

- Every relationship is enforced at the database level with a real foreign key constraint — "application-level only" referential integrity is not acceptable for this codebase, given the cost of a broken causal graph.

### 4.6 Soft Deletes

- No hard deletes on any table that feeds the causal graph or audit trail (`graph_nodes`, `graph_edges`, `ledger_events`, `facts`, `audit_logs`) — these use `archived_at`/`resolved_at` timestamps, consistent with the append-only philosophy in the frozen architecture. Hard deletes are permitted only for genuinely ephemeral data (temporary upload records, expired sessions).

### 4.7 Versioning

- Any entity whose history matters to the product (datasets, the graph) is versioned via an explicit version table/snapshot mechanism (`dataset_versions`, `graph_snapshots`) — never via in-place mutation of a "current" row.

### 4.8 Audit Logs

- Every write to a security- or billing-relevant table (org membership, plan changes, admin actions) produces an `audit_logs` row, written in the same transaction as the underlying change — not as a best-effort side effect.

---

## 5. API Standards

- **REST conventions:** resource-oriented URLs (`/v2/projects/{id}/graph`, not `/v2/getProjectGraph`); nouns, not verbs, in paths.
- **Status codes:** `200` (success), `201` (created), `202` (accepted/async), `204` (success, no body), `400` (validation error), `401`/`403` (auth), `404` (not found), `409` (conflict), `422` (semantic validation failure), `429` (rate limited), `5xx` (server fault — always logged with full context).
- **Pagination:** cursor-based on every list endpoint, response shape `{items: [...], next_cursor: string | null}` — offset pagination is not permitted on any new endpoint.
- **Filtering/sorting:** query params (`?status=open&sort=-created_at`), documented explicitly per endpoint in the OpenAPI spec — no undocumented filter params.
- **Versioning:** path-based (`/v1`, `/v2`); a breaking change to an existing endpoint's response shape requires a new version, not an in-place change.
- **Request validation:** every endpoint's input is a Pydantic model with explicit types and constraints — no raw dict/`Any` bodies.
- **Response validation:** every endpoint declares a `response_model` — FastAPI's automatic response filtering is the enforcement mechanism, not manual serialization.
- **OpenAPI generation:** the spec is generated automatically from the FastAPI app on every build and diffed against the previous version in CI — an accidental breaking change is caught by this diff before merge, not after.

---

## 6. Coding Standards

### 6.1 Python

- Formatting: `black`, line length 100. Import sorting: `isort`. Linting: `ruff`. Static analysis: `mypy` in strict mode on `services/` and `apps/core-api/`.
- Type hints are mandatory on every function signature (parameters and return type) — an untyped `def` in reviewed code is a review-blocking finding.
- Docstrings (Google style) required on every public class and function in `services/*` — private/internal helpers may omit if the function name is fully self-explanatory, but this is the exception, not the default.

### 6.2 TypeScript

- `strict: true` in `tsconfig.json`, no `any` without an inline comment justifying it and a linked follow-up if it's temporary.
- Formatting/linting: `prettier` + `eslint` with the React/hooks rule sets enabled.

### 6.3 Naming Conventions

- **Files:** `snake_case.py` (Python), `kebab-case.tsx` or `PascalCase.tsx` for React components (component files match the component name).
- **Classes:** `PascalCase` (`GraphNodeRepository`).
- **Functions/variables:** `snake_case` (Python), `camelCase` (TypeScript).
- **Constants:** `UPPER_SNAKE_CASE`, defined in a dedicated `constants.py`/`constants.ts` per module, never inline magic numbers/strings.
- **Enums:** `PascalCase` type name, `UPPER_SNAKE_CASE` or descriptive member names, mirrored exactly between Python and TypeScript via `shared-types` generation — never manually kept in sync.

### 6.4 Comments

- Comments explain **why**, not **what** — a comment restating what the next line of code obviously does is a review-blocking finding (it's noise, and it rots).

---

## 7. Testing Standards

- **Unit tests:** every service-layer method and every Facts Layer probe has a unit test; repository methods are tested against a real test database (via testcontainers), not mocked, since query correctness is the whole point.
- **Integration tests:** every API endpoint has at least one integration test exercising the full route→service→repository→DB path.
- **E2E tests:** Playwright covers the core product loop (upload → investigation → training → causal trace → replay) end to end; run on every merge to `main`.
- **Coverage:** minimum 80% line coverage on `services/*`, enforced in CI as a merge gate — coverage on `apps/web` is tracked but not gated at the same threshold, since UI coverage numbers are a weaker signal than backend logic coverage.
- **Fixtures/Factories:** test data built via factory functions (not hand-written fixture JSON scattered per test) so schema changes only require updating one factory.
- **Golden datasets:** `tests/golden-datasets/` contains versioned, checked-in synthetic datasets with known properties (known leakage, known duplicates, known drift) — the Facts Layer regression suite runs against these on every PR and is a **hard merge-blocking gate**, given this is the product's core trust mechanism.
- **Regression testing:** any bug fix must include a regression test reproducing the original bug before the fix — a bugfix PR without a corresponding test is not mergeable.

---

## 8. Git Workflow

- **Branch naming:** `feature/{ticket-id}-short-description`, `fix/{ticket-id}-short-description`, `chore/short-description`.
- **Commit conventions:** Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`) — this is what powers automated CHANGELOG generation.
- **PR template** (required fields): Summary, Motivation/linked ticket, Screenshots (for UI changes), Testing performed, Risk/rollback plan, Checklist (link to §16).
- **Review checklist:** see §16 — a PR cannot merge without every applicable item checked.
- **Merge strategy:** squash merge only, so `main` history is one commit per logical change.
- **Release strategy:** trunk-based development with feature flags for incomplete work — no long-lived feature branches beyond a single sprint.
- **Semantic versioning:** applies to `packages/sdk-python` and `packages/shared-types` specifically (published artifacts); internal services are deployed continuously and don't carry independent semver.

---

## 9. Security Standards

- **Secrets:** never committed; loaded via a secrets manager at runtime; `.env.example` (no real values) checked in for local dev reference.
- **Authentication:** managed provider (per frozen architecture); JWT bearer tokens, short-lived access + rotating refresh.
- **Authorization:** every repository query scoped by `org_id`/`project_id` by default (§2.2) — the authorization bypass test suite (per the frozen Sprint 21 plan) is a permanent, recurring CI job, not a one-time audit.
- **Input validation:** all inputs validated via Pydantic/Zod schemas before touching business logic; file uploads validated by content-sniffing, not just extension/MIME header.
- **SQL injection:** parameterized queries only via the ORM — raw SQL string interpolation is a review-blocking finding with no exceptions.
- **XSS:** React's default escaping relied upon; any `dangerouslySetInnerHTML` usage requires explicit security review and sign-off, logged in an ADR.
- **CSRF:** header-based JWT auth (not cookie sessions) as the primary mitigation; if cookies are ever introduced for any flow, SameSite=strict + CSRF tokens are mandatory.
- **Rate limiting:** enforced at the API gateway per-token and per-IP, with stricter limits on unauthenticated endpoints.
- **Dependency scanning:** automated (Dependabot or equivalent) on every repository, with a defined SLA for patching critical CVEs (documented in `docs/SECURITY.md`).

---

## 10. Performance Standards

- **Caching:** Redis cache for hot read paths, explicit invalidation on write — no cache without a documented invalidation strategy.
- **Streaming:** any file processing (dataset ingestion, schema inference) is chunked/streamed — loading a full file into memory is a review-blocking finding for any dataset-handling code path.
- **Async processing:** anything expected to take >1s happens off the request path via the job queue (§2.10).
- **Pagination:** no unbounded list endpoint — every list response is paginated, no exceptions.
- **Memory limits:** worker processes have explicit memory limits configured; a probe/job that risks exceeding available memory on large inputs must degrade gracefully (sampling) rather than crash the worker.
- **Large file handling:** enforced size caps per plan tier at the upload layer, with clear user-facing errors before any processing is attempted.

---

## 11. Observability

- **Logging:** structured JSON, correlation IDs propagated across every service hop (§2.7).
- **Tracing:** OpenTelemetry spans on every inter-service call and every background job execution.
- **Metrics:** per-service request latency/error rate, queue depth, LLM cost/latency per call — dashboarded, not just logged.
- **Alerts:** defined for Facts Layer/Reasoning Engine failure rate thresholds, queue depth exceeding a backlog threshold, and any 5xx rate spike — alerting thresholds are documented per service in `docs/`.
- **Health checks:** every service exposes a `/healthz` endpoint checking its own critical dependencies (DB connection, queue connection) — used by the deployment platform for readiness/liveness.

---

## 12. Documentation Standards

- **README:** every top-level `apps/`/`services/` directory has its own README covering purpose, local setup, and how to run its tests — the root README links to all of them rather than duplicating content.
- **API docs:** auto-generated from the OpenAPI spec (§5), published and kept current automatically — never hand-maintained separately.
- **Architecture docs:** `docs/architecture/` holds the living version of the frozen Engineering Blueprint — updates require an ADR, not a silent edit.
- **ADRs:** any deviation from this Constitution, or any significant architectural decision not already covered here, is recorded in `docs/adr/` using a standard template (Context, Decision, Consequences, Status) — no undocumented architectural decisions.
- **CHANGELOG:** auto-generated from Conventional Commits on every release of a versioned package (§8).

---

## 13. Code Review Checklist

Every PR must satisfy all applicable items before merge:

**Architecture**
- [ ] No cross-layer import violations (§1.3)
- [ ] No cross-service filesystem imports (§1.1/1.5)
- [ ] New shared logic extracted to `packages/`, not copy-pasted

**Backend**
- [ ] Route handlers contain no business logic
- [ ] All queries scoped by `org_id`/`project_id`
- [ ] Domain exceptions used, not silent failures
- [ ] Long-running work dispatched to a background job, not inline
- [ ] New background jobs are idempotent with a defined retry policy

**Frontend**
- [ ] No hand-written `fetch` calls outside the generated API client
- [ ] No server-state duplicated into local state
- [ ] Error and loading states designed, not default/generic
- [ ] Accessibility: keyboard nav + ARIA labels present on new interactive elements

**Database**
- [ ] New foreign keys indexed
- [ ] Migration includes a working down-migration
- [ ] No hard deletes on graph/ledger/audit tables

**API**
- [ ] Request/response models are explicit Pydantic classes
- [ ] New list endpoints are paginated
- [ ] OpenAPI diff reviewed for unintended breaking changes

**Testing**
- [ ] New logic has unit tests; new endpoints have integration tests
- [ ] Bugfixes include a regression test
- [ ] Facts Layer changes pass the golden-dataset regression suite
- [ ] Coverage threshold maintained on `services/*`

**Security**
- [ ] No secrets in code or logs
- [ ] No raw SQL string interpolation
- [ ] File upload validation present for any new upload path

**Reasoning/Guardrail-specific (Reasoning Engine PRs only)**
- [ ] Every generated claim is checked against the Facts Layer/Graph Engine payload
- [ ] Confidence level (`confirmed`/`likely`/`hypothesis`) is present and correctly derived, never defaulted
- [ ] No new LLM prompt path bypasses the output validator

**Documentation**
- [ ] README updated if setup/run instructions changed
- [ ] ADR added if this PR deviates from or extends this Constitution

---

## 14. Amendments to This Constitution

This document is versioned in `docs/`. Any change to a rule in this Constitution requires its own PR, its own ADR justifying the change, and sign-off from the Principal Engineer role (or its designated successor) — it cannot be changed as a side effect of an unrelated feature PR.

---

## 15. Definition of Done (repository-wide)

A unit of work (feature, fix, or sprint deliverable) is **Done** only when all of the following are true:

1. Code merged to `main` via squash merge, passing all CI gates (lint, type-check, tests, coverage, OpenAPI diff, golden-dataset regression).
2. Every applicable item in the Code Review Checklist (§13) is satisfied.
3. Tests exist at the appropriate level (unit for logic, integration for API surface, e2e for user-facing flows) and pass in CI, not just locally.
4. Documentation (README, API docs, ADR if applicable) is updated in the same PR — not deferred to a follow-up ticket.
5. Observability is in place: new services/endpoints emit structured logs and are covered by existing tracing/metrics without additional manual wiring.
6. Security review items relevant to the change (auth scoping, input validation, secrets handling) are explicitly addressed, not assumed.
7. The change is deployed and verified against its NFR targets where applicable (latency, coverage of the golden-dataset suite, load behavior) — not just "works on my machine."
8. No new item is silently added to the Technical Debt Plan without being explicitly logged there with a trigger condition (per the frozen Engineering Blueprint's §9 format).

If any of these is not true, the work is not Done — regardless of whether it demos successfully.
