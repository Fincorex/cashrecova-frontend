

# CashRecova — Build Roadmap & Task List

## Overview
CashRecova is a non-custodial lending infrastructure platform. This document is the single source of truth for all build tasks. Each task maps to one pull request and one ticket.

**Task ID format**: `CASH-{phase}.{task}` (e.g., `CASH-0.1`)
**Branch format**: as specified per task
**Rule**: One concern per PR. Never bundle unrelated changes.

---

## EPIC 0 — Foundation & Developer Experience

**Goal**: Establish the complete technical foundation before any business logic is written. Every developer joining the team should be able to clone this repo and have a fully working, consistent environment within minutes.

---

### CASH-0.1 — Fix & Standardise Developer Tooling

**Branch**: `fix/dev-tooling-standardise`
**Priority**: P0 — must be merged before any other work starts

**User Story**:
> As a developer joining the CashRecova team, I want a consistent, automated code quality pipeline so that I spend zero time on formatting debates and can trust that anything merged has passed static analysis and tests.

**Description**:
Several tools are already installed (Pint, PHPStan, Husky) but there are issues to fix and gaps to fill:

- The Husky pre-commit hook runs every check **twice** due to duplication — fix it
- The pre-commit hook runs Pint with auto-fix but CI runs Pint with `--test` (fails without fixing) — standardise: Husky auto-fixes, CI reports-only
- Add `composer test` to the pre-commit hook (currently missing — code that breaks tests can still be committed)
- Add named Composer scripts: `lint`, `analyse`, `test`, `check` (runs all three)
- Update `phpstan.neon` paths to include `app/Modules/` for when modules are scaffolded in CASH-0.3
- Raise PHPStan to level 8 (currently level 6) and generate a baseline to suppress existing violations
- Update CI workflow: add PostgreSQL 16 and Redis service containers (needed for CASH-0.6 onwards)
- Add `docker-compose.yml` for local development (PostgreSQL 16, Redis 7, Mailpit)
- Update `.env.example` with all required variables (DB, Redis, queue, mail, app URL)
- Migrate test suite from PHPUnit to **Pest** for better DX (feature and unit tests)
- Add `phpunit.xml` / `pest.php` to exclude `vendor/` and `node_modules/`
- Add `.env.testing` example for CI test environment

**Acceptance Criteria**:
- [ ] Pre-commit hook runs exactly once, not twice
- [ ] `composer lint` runs `./vendor/bin/pint` (auto-fixes locally)
- [ ] `composer analyse` runs `./vendor/bin/phpstan analyse --memory-limit=512M`
- [ ] `composer test` runs the Pest test suite
- [ ] `composer check` runs lint → analyse → test in sequence, exits non-zero on any failure
- [ ] Pre-commit hook runs: empty-file check → PHP syntax check → `composer lint` → `composer analyse` → `composer test`
- [ ] CI runs Pint with `--test` flag (no auto-fix in CI, just fail)
- [ ] CI has PostgreSQL 16 and Redis 7 service containers configured
- [ ] CI coverage threshold remains at 90%
- [ ] PHPStan is at level 8 with a `phpstan-baseline.neon` for any existing violations
- [ ] `phpstan.neon` includes `app/Modules/` in paths
- [ ] `docker-compose.yml` brings up PostgreSQL, Redis, and Mailpit
- [ ] `.env.example` has all variables documented with inline comments
- [ ] Pest is installed and all existing tests are migrated and passing
- [ ] `README.md` has a "Getting Started" section covering docker-compose + composer setup

**Dependencies**: None — this is the first task.

---

### CASH-0.2 — Replace Sanctum with Passport

**Branch**: `feat/install-passport`
**Priority**: P0

**User Story**:
> As the platform operator, I want OAuth 2.0 via Laravel Passport so that lender backends can authenticate using client credentials (M2M) and dashboard users can authenticate with full OAuth flows, giving us industry-standard auth for a financial API.

**Description**:
Sanctum is installed by default but is not suitable for M2M (machine-to-machine) API authentication at scale. Replace it with Laravel Passport which supports OAuth 2.0 client credentials grant (for lender backends) and password/auth-code grants (for dashboard users).

- Remove `laravel/sanctum` from `composer.json` and all references
- Remove the Sanctum migration (`create_personal_access_tokens_table`)
- Install `laravel/passport`
- Run `php artisan passport:install --uuids` (use UUIDs for client IDs)
- Configure Passport in `config/auth.php` — set API guard driver to `passport`
- Add `HasApiTokens` trait to `User` model (Passport version)
- Publish Passport config and migrations
- Add Passport encryption keys to `.env.example` with instructions
- Add Passport keys to CI env setup step
- Ensure Passport keys are in `.gitignore`
- Add `AppServiceProvider` boot configuration for Passport token expiry
- Document token TTLs: access token 1 hour, refresh token 30 days (configurable via env)

**Acceptance Criteria**:
- [ ] `laravel/sanctum` is fully removed (composer.json, config, migrations, service provider)
- [ ] `laravel/passport` is installed and migrations are published
- [ ] `php artisan passport:install --uuids` runs without errors
- [ ] API guard in `config/auth.php` uses `passport` driver
- [ ] `User` model uses Passport's `HasApiTokens`
- [ ] Passport encryption keys are generated and `.gitignored`
- [ ] `.env.example` documents all Passport-related variables
- [ ] CI pipeline generates Passport keys as part of setup step
- [ ] Token TTLs are configurable via environment variables
- [ ] All existing tests pass after the swap
- [ ] No references to Sanctum remain anywhere in the codebase

**Dependencies**: CASH-0.1

---

### CASH-0.3 — PostgreSQL & Redis Configuration

**Branch**: `feat/postgres-redis-config`
**Priority**: P0

**User Story**:
> As a developer, I want the application configured for PostgreSQL and Redis out of the box so that I can run the stack locally with docker-compose and be confident the dev environment matches production.

**Description**:
Laravel ships defaulting to SQLite. CashRecova requires PostgreSQL 16 for schema-per-tenant multi-tenancy and RLS policies, and Redis for queues, cache, and idempotency key storage.

- Update `config/database.php` — set default connection to `pgsql`
- Remove SQLite references from default config
- Update `.env.example` with PostgreSQL connection variables (host, port, db, user, password)
- Update `.env.example` with Redis connection variables
- Set `CACHE_STORE=redis` and `QUEUE_CONNECTION=redis` in `.env.example`
- Configure Redis prefix per environment to avoid key collisions
- Add `config/database.php` PostgreSQL-specific settings: `application_name`, `search_path`, `sslmode`
- Update `phpunit.xml` / Pest config to use a separate `cashrecova_test` database for tests
- Update CI workflow to create the test database and run migrations against PostgreSQL (not SQLite)
- Confirm `docker-compose.yml` from CASH-0.1 creates `cashrecova`, `cashrecova_test` databases on startup
- Update `database/seeders/DatabaseSeeder.php` to be a no-op (no demo data in base)

**Acceptance Criteria**:
- [ ] Default database connection is `pgsql`
- [ ] No SQLite references remain in default config or `.env.example`
- [ ] `php artisan migrate` runs successfully against a local PostgreSQL instance
- [ ] CI runs migrations against the PostgreSQL service container
- [ ] Cache driver defaults to Redis
- [ ] Queue driver defaults to Redis
- [ ] `.env.example` has all PostgreSQL and Redis variables with inline comments
- [ ] A separate `cashrecova_test` database is used for the test suite
- [ ] `docker-compose.yml` initialises both `cashrecova` and `cashrecova_test` databases
- [ ] All tests pass against PostgreSQL

**Dependencies**: CASH-0.1

---

### CASH-0.4 — Module Architecture Scaffold

**Branch**: `feat/module-architecture`
**Priority**: P0

**User Story**:
> As a developer, I want a clearly defined modular folder structure so that each domain concern lives in its own bounded context and I know exactly where to put new code without asking anyone.

**Description**:
Define and scaffold the module structure that all future development will follow. This is not `nwidart/laravel-modules` — we use a custom lightweight convention that keeps things in `app/Modules/` and avoids third-party module boilerplate overhead.

Each module follows this internal structure:
```
app/Modules/{ModuleName}/
  Http/
    Controllers/
    Requests/
    Resources/
  Models/
  Services/
  Events/
  Listeners/
  Jobs/
  Policies/
  Repositories/
  Providers/
    {ModuleName}ServiceProvider.php
  routes/
    v1.php
  database/
    migrations/
    factories/
    seeders/
  Tests/
    Feature/
    Unit/
```

Tasks:
- Create the `app/Modules/` directory with the above structure for all 8 modules:
  `Auth`, `LoanEngine`, `CreditDecisioning`, `PaymentOrchestration`, `MandateManagement`, `RecoveryEngine`, `BillingEngine`, `Notifications`
- Each module gets a `{ModuleName}ServiceProvider.php` that registers its routes, migrations, and bindings
- Register all module service providers in `bootstrap/providers.php`
- Update `composer.json` autoload to include `app/Modules/` in PSR-4 map
- Update `phpstan.neon` to include `app/Modules/` paths
- Create a base `ModuleServiceProvider` abstract class in `app/Support/` with shared registration logic
- Add an artisan command `make:module {name}` to scaffold a new module following the convention
- Each module has a placeholder `README.md` describing its domain responsibility

**Acceptance Criteria**:
- [ ] All 8 modules are scaffolded with the full directory structure
- [ ] Each module has a `{ModuleName}ServiceProvider` registered in `bootstrap/providers.php`
- [ ] `composer dump-autoload` resolves all module namespaces correctly
- [ ] PHPStan passes with all module paths included
- [ ] `php artisan make:module {name}` creates a new module with the full structure
- [ ] Module migrations are discoverable via each module's ServiceProvider (not just `database/migrations/`)
- [ ] `php artisan migrate` picks up migrations from all module `database/migrations/` directories
- [ ] Base `ModuleServiceProvider` handles route and migration registration via a single `boot()` pattern
- [ ] Each module's `Tests/` directory is registered with Pest

**Dependencies**: CASH-0.1, CASH-0.3

---

### CASH-0.5 — Versioned API Routing & Base Response Format

**Branch**: `feat/api-versioning`
**Priority**: P0

**User Story**:
> As a lender integrating with CashRecova, I want versioned API endpoints (e.g., `/api/v1/`) so that my integration is never broken by platform upgrades, and I receive consistent, predictable JSON responses regardless of which endpoint I call.

**Description**:
Establish the versioned routing system and base JSON response format. All future endpoints must conform to this structure.

Routing:
- All API routes live under `/api/v{n}/`
- Each module registers its own routes from `app/Modules/{Name}/routes/v1.php` via its ServiceProvider
- `routes/api.php` becomes the version prefix loader only — no route definitions here
- Create a versioning middleware that sets `X-API-Version` response header

Base Response Format (all responses must match):
```json
{
  "success": true,
  "data": {},
  "message": "...",
  "meta": {
    "request_id": "uuid",
    "version": "v1",
    "timestamp": "ISO8601"
  }
}
```

Error Response:
```json
{
  "success": false,
  "error": {
    "code": "LOAN_NOT_FOUND",
    "message": "Human readable message",
    "details": {}
  },
  "meta": {
    "request_id": "uuid",
    "version": "v1",
    "timestamp": "ISO8601"
  }
}
```

- Create `app/Support/Http/ApiResponse.php` — a fluent response builder
- Create `app/Support/Http/BaseApiController.php` — all module controllers extend this
- Create `app/Http/Middleware/ApiVersionMiddleware.php` — attaches version headers
- Create `app/Exceptions/Handler.php` overrides to render all exceptions as the standard error format
- Add `Deprecation` header support for when a version is being sunset
- Create a `GET /api/v1/health` endpoint that returns platform status (used by CI and monitoring)

**Acceptance Criteria**:
- [ ] All routes are registered under `/api/v1/` prefix
- [ ] `GET /api/v1/health` returns `200` with the standard success envelope
- [ ] Every successful API response matches the defined success envelope
- [ ] Every error API response matches the defined error envelope
- [ ] `X-API-Version: v1` header is present on all responses
- [ ] `X-Request-Id` header with a UUID is present on all responses
- [ ] Validation errors return `422` with the standard error format listing field errors in `details`
- [ ] Unauthenticated requests return `401` with the standard error format
- [ ] 404 routes return `404` with the standard error format (not Laravel's default HTML)
- [ ] `ApiResponse` builder has `success()`, `error()`, `paginated()` static methods
- [ ] All module routes load correctly via their ServiceProvider — no routes defined in `routes/api.php` directly
- [ ] Feature test covers the health endpoint and each error type

**Dependencies**: CASH-0.4

---

### CASH-0.6 — Tenant Schema Provisioning

**Branch**: `feat/tenant-provisioning`
**Priority**: P0

**User Story**:
> As the platform operator, I want each lender to have their own isolated PostgreSQL schema so that one lender's data is physically separated from another's, and a bug or misconfigured query can never leak data across tenants.

**Description**:
Build the tenant provisioning system. When a new lender is onboarded, a dedicated PostgreSQL schema is created and seeded with all tenant-specific tables.

- Create `tenants` table in the `public` schema (id, slug, name, status, created_at)
- Create `Tenant` Eloquent model in `app/Models/Tenant.php` (public schema)
- Create `app/Support/Tenancy/TenantSchemaManager.php` — handles:
  - `createSchema(string $slug)` — creates the schema and runs tenant migrations
  - `dropSchema(string $slug)` — drops the schema (for testing/offboarding)
  - `schemaExists(string $slug)` — checks existence
- Create an artisan command: `tenant:provision {slug}` that creates and seeds a tenant schema
- Create an artisan command: `tenant:migrate {slug}` that runs fresh migrations for a specific tenant
- Create an artisan command: `tenant:migrate --all` that runs migrations across all tenant schemas
- All tenant-specific migrations live in `app/Modules/*/database/migrations/` and are tagged as tenant migrations
- Public schema migrations live in `database/migrations/` as normal
- Add a `TenantMigrationRepository` that tracks which migrations have run per schema
- Feature test: provision a test tenant, confirm schema exists, confirm tables exist, drop it after

**Acceptance Criteria**:
- [ ] `php artisan tenant:provision {slug}` creates a PostgreSQL schema named `tenant_{slug}`
- [ ] After provisioning, all tenant-specific tables exist in the new schema
- [ ] `php artisan tenant:migrate --all` runs pending migrations across every tenant schema
- [ ] Public schema (`public`) only contains platform-level tables (tenants, api_keys, etc.)
- [ ] `TenantSchemaManager::dropSchema()` used in tests cleans up correctly
- [ ] Tenant provisioning is wrapped in a database transaction — partial failures rollback
- [ ] Feature test provisions a tenant, asserts schema and tables exist, drops it
- [ ] Running `tenant:provision` with an existing slug fails gracefully with a clear error
- [ ] CI can provision a test tenant schema as part of the test setup

**Dependencies**: CASH-0.3, CASH-0.4

---

### CASH-0.7 — Tenant Middleware (API Key → Schema Resolution)

**Branch**: `feat/tenant-middleware`
**Priority**: P0

**User Story**:
> As a lender, I want every API request I make to automatically route to my isolated data schema so that I never need to pass a tenant identifier manually and there is zero risk of reading another lender's data.

**Description**:
Build the middleware that powers per-request tenant resolution. Every inbound API request carries an API key. The middleware resolves which tenant that key belongs to, then sets the PostgreSQL `search_path` so all subsequent queries in the request hit only that tenant's schema.

- Create `api_keys` table in the `public` schema (id, tenant_id, key_prefix, key_hash, name, last_used_at, expires_at, revoked_at, created_at)
- Create `ApiKey` model in `app/Models/ApiKey.php`
- Create `app/Http/Middleware/ResolveTenantMiddleware.php`:
  - Reads `Authorization: Bearer {key}` header
  - Looks up key by prefix (first 8 chars), then bcrypt-verifies hash
  - Resolves the `Tenant` model
  - Sets `DB::statement("SET search_path TO tenant_{slug}, public")`
  - Stores tenant on the request: `$request->tenant()`
  - Returns `401` with standard error format if key is missing, invalid, expired, or revoked
- Create `app/Support/Tenancy/TenantContext.php` — singleton holding current tenant for the request lifecycle
- Apply `ResolveTenantMiddleware` to all `/api/*` routes
- API key lookup must use the key prefix for indexed lookup (never full-scan hashing all keys)
- Update `last_used_at` on the key after successful resolution (queued, non-blocking)

**Acceptance Criteria**:
- [ ] All `/api/v1/` routes require a valid API key
- [ ] `Authorization: Bearer {invalid}` returns `401` with the standard error envelope
- [ ] A valid API key sets the correct `search_path` for the request
- [ ] `$request->tenant()` returns the resolved `Tenant` model in any controller
- [ ] `TenantContext::current()` returns the tenant anywhere in the application (services, jobs, etc.)
- [ ] Expired API keys return `401`
- [ ] Revoked API keys return `401`
- [ ] API key lookup queries use the key prefix index — confirmed via query log in tests
- [ ] `last_used_at` is updated asynchronously (does not add latency to the request)
- [ ] `GET /api/v1/health` is exempt from tenant resolution (public endpoint)
- [ ] Feature tests cover: valid key, invalid key, expired key, revoked key

**Dependencies**: CASH-0.5, CASH-0.6

---

### CASH-0.8 — PostgreSQL Row Level Security Policies

**Branch**: `feat/rls-policies`
**Priority**: P0

**User Story**:
> As the platform operator, I want PostgreSQL Row Level Security enforced on all tenant tables so that even if application code has a bug that fails to set the search_path, the database itself refuses cross-tenant data access as a second line of defence.

**Description**:
Schema-per-tenant already provides strong isolation. RLS is added as defence-in-depth — a second layer that the database enforces regardless of application-layer mistakes.

- Create a dedicated PostgreSQL application role: `cashrecova_app` (used by the app, not a superuser)
- Enable RLS on all tenant tables (to be done as part of each module's migration, but establish the pattern here)
- Create a base migration helper/trait `WithRlsPolicy` that modules use when creating tenant tables
- The RLS policy pattern:
  - App sets `SET app.current_tenant_slug = '{slug}'` at connection start (done in middleware)
  - Policy: `USING (true)` — because schema isolation already restricts to one tenant's tables, RLS acts as a catch-all if `search_path` is misconfigured
  - For the `public` schema tables (tenants, api_keys): RLS restricts to matching `tenant_id` column using `current_setting('app.current_tenant_id')::uuid`
- Create a migration that sets up the `cashrecova_app` role with appropriate grants
- Update `ResolveTenantMiddleware` (from CASH-0.7) to also set `app.current_tenant_id` session variable
- Document the RLS policy pattern in a `docs/rls-policy.md` for developers adding new tables
- Add a test that connects as `cashrecova_app` role and confirms cross-tenant query returns empty (not an error)

**Acceptance Criteria**:
- [ ] `cashrecova_app` PostgreSQL role exists with least-privilege grants
- [ ] Application connects using `cashrecova_app`, not a superuser
- [ ] `app.current_tenant_id` session variable is set on every request by middleware
- [ ] `WithRlsPolicy` trait is available for use in module migrations
- [ ] RLS is documented in `docs/rls-policy.md` with a code example for new tables
- [ ] A test verifies that querying a public schema table without setting `app.current_tenant_id` returns zero rows
- [ ] All existing migrations pass and tables are created correctly under the new role
- [ ] CI creates the `cashrecova_app` role as part of the test database setup

**Dependencies**: CASH-0.7

---

### CASH-0.9 — Audit Log Infrastructure

**Branch**: `feat/audit-log`
**Priority**: P0

**User Story**:
> As the platform operator and future compliance officer, I want an immutable audit trail of every data mutation so that we can reconstruct exactly what happened to any loan, payment, or mandate at any point in time — required for CBN compliance and lender dispute resolution.

**Description**:
Build a centralised, immutable audit log that captures every state change across the platform. This is infrastructure — it logs automatically without modules having to implement it manually.

- Create `audit_logs` table in each tenant schema:
  ```
  id (uuid), entity_type, entity_id, action (created/updated/deleted),
  actor_type (api_key/dashboard_user/system), actor_id,
  old_values (jsonb), new_values (jsonb),
  ip_address, user_agent, request_id, created_at
  ```
- Create `app/Support/Audit/Auditable.php` trait — models use this to opt into audit logging
- Create `app/Support/Audit/AuditLogger.php` — writes audit entries
- Create `app/Support/Audit/AuditObserver.php` — Eloquent observer that fires on `created`, `updated`, `deleted`
- Exclude sensitive fields from audit log values (configurable per model via `$auditExclude = ['password', 'bvn', ...]`)
- Audit log entries are **never updated or deleted** — enforce via PostgreSQL trigger that rejects `UPDATE`/`DELETE` on `audit_logs`
- `GET /api/v1/audit-logs` endpoint (Auth module, admin role only) — paginated, filterable by entity/date
- Audit log writes are asynchronous (queued job) to avoid adding latency to the request

**Acceptance Criteria**:
- [ ] Any model using the `Auditable` trait is automatically logged on create/update/delete
- [ ] Audit entries capture old and new values as JSONB
- [ ] Fields listed in `$auditExclude` are redacted with `[REDACTED]` in audit entries
- [ ] A PostgreSQL trigger prevents any `UPDATE` or `DELETE` on `audit_logs`
- [ ] Attempting to delete an audit log entry throws a `PostgresException`
- [ ] Audit log writes are dispatched as queued jobs — no synchronous DB write on the request path
- [ ] `GET /api/v1/audit-logs` returns paginated entries in the standard response envelope
- [ ] Feature test: create a model → verify audit entry exists with correct old/new values
- [ ] Feature test: confirm excluded fields appear as `[REDACTED]`
- [ ] PHPStan passes with all audit classes

**Dependencies**: CASH-0.5, CASH-0.6

---

## EPIC 1 — Auth Module

**Goal**: Secure, multi-tenant authentication for both M2M (lender backend) and human (dashboard) consumers. Everything downstream depends on this.

---

### CASH-1.1 — Tenant Onboarding

**Branch**: `feat/auth-tenant-onboarding`

**User Story**:
> As the platform operator, I want to onboard a new lender via an internal API call so that a fully isolated tenant environment is provisioned automatically without manual database intervention.

**Description**:
- `POST /api/v1/admin/tenants` — internal endpoint (protected by a master API key, not tenant-scoped)
- Creates `Tenant` record, provisions schema via `TenantSchemaManager`, issues first API key
- Tenant status: `pending`, `active`, `suspended`
- Onboarding fires a `TenantProvisioned` event (for future webhook notification)
- `PATCH /api/v1/admin/tenants/{id}/suspend` and `activate`
- All endpoints require `X-Master-Key` header (separate from tenant API keys)

**Acceptance Criteria**:
- [ ] `POST /api/v1/admin/tenants` creates tenant, provisions schema, returns first API key
- [ ] Duplicate tenant slug returns `409 Conflict`
- [ ] Schema provisioning failure rolls back tenant record creation
- [ ] `TenantProvisioned` event is fired on successful onboarding
- [ ] Tenant can be suspended — suspended tenant's API keys return `403`
- [ ] Master key is separate from tenant API keys and configured via environment variable
- [ ] Feature tests cover: happy path, duplicate slug, provisioning failure, suspension

**Dependencies**: CASH-0.7, CASH-0.9

---

### CASH-1.2 — API Key Management

**Branch**: `feat/auth-api-keys`

**User Story**:
> As a lender, I want to create, rotate, and revoke API keys for my integration so that I can manage access for different services and revoke compromised keys instantly without contacting support.

**Description**:
- `POST /api/v1/keys` — create a new API key (name, expiry, scopes)
- `GET /api/v1/keys` — list keys (shows prefix and metadata, never the full key)
- `DELETE /api/v1/keys/{id}` — revoke a key
- `POST /api/v1/keys/{id}/rotate` — rotate key (atomically: revoke old, issue new)
- Key scopes: `loans:read`, `loans:write`, `payments:write`, `mandates:write`, `admin` (expandable)
- Full key is returned **once only** on creation — stored only as bcrypt hash
- Key format: `cr_live_{32-char-random}` (prefix `cr_test_` for test mode)

**Acceptance Criteria**:
- [ ] Full API key is returned only on creation, never again
- [ ] Keys are stored as bcrypt hash in the database
- [ ] Key rotation atomically revokes old key and issues new one in a transaction
- [ ] Revoked keys return `401` immediately on next request
- [ ] Keys with insufficient scope for an endpoint return `403`
- [ ] `GET /api/v1/keys` never exposes the full key — only prefix and metadata
- [ ] Keys can optionally have an expiry date
- [ ] Feature tests: create, list, revoke, rotate, scope enforcement

**Dependencies**: CASH-1.1

---

### CASH-1.3 — Passport M2M Client Credentials

**Branch**: `feat/auth-passport-m2m`

**User Story**:
> As a lender's backend system, I want to authenticate using OAuth 2.0 client credentials so that I can obtain short-lived access tokens without user interaction, following industry-standard M2M auth patterns.

**Description**:
- Configure Passport client credentials grant
- Each tenant gets a Passport `Client` linked to their tenant record
- `POST /oauth/token` with `grant_type=client_credentials` returns a scoped access token
- Access token TTL: 1 hour (configurable)
- Token scopes mirror the API key scopes from CASH-1.2
- Middleware to accept either Bearer API key (CASH-0.7) or Passport Bearer token
- Add Passport client creation to the tenant onboarding flow (CASH-1.1)

**Acceptance Criteria**:
- [ ] `POST /oauth/token` with valid client credentials returns a JWT access token
- [ ] Access tokens expire after 1 hour (configurable via env)
- [ ] Tokens are scoped — a token with `loans:read` cannot call `POST /api/v1/loans`
- [ ] Both API key and Passport token are accepted on all protected routes
- [ ] Invalid client credentials return `401`
- [ ] Tenant provisioning automatically creates a Passport client
- [ ] Feature tests cover token issuance, expiry, scope enforcement

**Dependencies**: CASH-1.1, CASH-0.2

---

### CASH-1.4 — Dashboard User & RBAC

**Branch**: `feat/auth-dashboard-rbac`

**User Story**:
> As a lender admin, I want to invite team members to the dashboard with specific roles (admin, ops, viewer) so that I control exactly what each person can see and do within my tenant.

**Description**:
- `users` table in tenant schema (separate from public schema `tenants` table)
- Roles: `admin` (full access), `ops` (can trigger actions, no settings), `viewer` (read-only)
- `POST /api/v1/users/invite` — send invite email with signed link
- `POST /api/v1/users/accept-invite` — set password, activate account
- `GET/PATCH/DELETE /api/v1/users/{id}` — user management (admin only)
- Passport password grant for dashboard login
- `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`, `POST /api/v1/auth/refresh`
- TOTP MFA: `POST /api/v1/auth/mfa/setup`, `POST /api/v1/auth/mfa/verify`
- Gate policies for each role using Laravel's `Gate` + Passport scopes

**Acceptance Criteria**:
- [ ] Three roles exist: `admin`, `ops`, `viewer` with documented permission matrix
- [ ] Invite link expires after 48 hours
- [ ] TOTP MFA can be enabled per user; once enabled, login requires OTP
- [ ] `viewer` role cannot call any `POST/PATCH/DELETE` endpoints — returns `403`
- [ ] `admin` can deactivate other users (not themselves)
- [ ] Password reset flow works via email
- [ ] Feature tests cover: invite, accept, login, MFA, role enforcement for each role

**Dependencies**: CASH-1.1, CASH-1.3

---

### CASH-1.5 — Rate Limiting Per Tenant

**Branch**: `feat/auth-rate-limiting`

**User Story**:
> As the platform operator, I want configurable rate limits per tenant so that a single lender cannot degrade the platform for others and we have a mechanism to enforce usage tiers.

**Description**:
- Rate limits stored per tenant in the `tenants` table: `rate_limit_per_minute`, `rate_limit_per_day`
- Default limits: 120 requests/minute, 50,000 requests/day
- Use Redis for rate limit counters (atomic increment)
- Separate limits per API key (not just per tenant)
- Response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- `429 Too Many Requests` with standard error envelope when exceeded
- Payment endpoints have a stricter per-minute limit (configurable)
- Admin can update tenant limits via `PATCH /api/v1/admin/tenants/{id}/rate-limits`

**Acceptance Criteria**:
- [ ] Exceeding per-minute limit returns `429` with retry-after header
- [ ] Rate limit headers are present on every API response
- [ ] Limits are stored per-tenant and configurable without code changes
- [ ] Redis is used for counters — no database queries on the rate limit check path
- [ ] Different endpoints can have different multipliers on the base limit
- [ ] Feature tests verify limit enforcement and header values

**Dependencies**: CASH-1.1, CASH-0.3

---

## EPIC 2 — Loan Engine

**Goal**: The full loan lifecycle from origination through to closure.

---

### CASH-2.1 — Borrower Model with PII Encryption

**Branch**: `feat/loan-borrower-model`

**User Story**:
> As a lender, I want to register borrowers with encrypted PII so that sensitive data (BVN, account numbers) is protected at rest and we meet data protection obligations.

**Description**:
- `borrowers` table in tenant schema
- Fields: id, first_name, last_name, email, phone, bvn (encrypted), date_of_birth, address (jsonb), metadata (jsonb), status, created_at
- BVN, account numbers, and date of birth encrypted using AES-256 at the field level
- Encryption key per tenant (derived from master key + tenant slug)
- `Borrower` model with `Auditable` trait
- `POST /api/v1/borrowers` — create borrower
- `GET /api/v1/borrowers/{id}` — get borrower (BVN masked in response: `BVN: ***1234`)
- `PATCH /api/v1/borrowers/{id}` — update borrower
- BVN uniqueness enforced per tenant (on the encrypted value's HMAC)

**Acceptance Criteria**:
- [ ] BVN is stored encrypted — raw value is never in the database
- [ ] BVN is masked in API responses (last 4 digits only)
- [ ] Duplicate BVN within a tenant returns `409 Conflict`
- [ ] Encryption key is per-tenant (changing master key does not decrypt another tenant's data)
- [ ] `Auditable` trait logs borrower creation and updates (BVN appears as `[REDACTED]` in audit log)
- [ ] Feature tests: create, get (confirm masking), duplicate BVN detection

**Dependencies**: CASH-0.9, CASH-1.1

---

### CASH-2.2 — Loan Model & State Machine

**Branch**: `feat/loan-state-machine`

**User Story**:
> As a lender, I want a loan to progress through well-defined states (draft → active → repaying → defaulted → recovered/closed) so that I always know the exact status of every loan and invalid transitions are impossible.

**Description**:
- `loans` table in tenant schema
- States: `draft`, `pending_disbursement`, `active`, `repaying`, `overdue`, `defaulted`, `recovered`, `closed`, `cancelled`
- State machine: only valid transitions allowed (e.g., `draft → pending_disbursement`, never `draft → defaulted`)
- `LoanStateMachine` class enforces transitions, fires `LoanStateChanged` event on every transition
- `loans` table: id, borrower_id, amount, currency, interest_rate, interest_type (flat/reducing), duration_days, status, disbursed_at, due_date, metadata (jsonb)
- `Loan` model with `Auditable` trait
- Transition guard: loan cannot leave `draft` without an active mandate (enforced as a gate, not hard constraint — mandate module plugs in later)

**Acceptance Criteria**:
- [ ] Invalid state transitions throw `InvalidLoanTransitionException` and return `422`
- [ ] Every state transition fires a `LoanStateChanged` event with old and new state
- [ ] `LoanStateChanged` is logged to the audit trail
- [ ] State machine is unit-tested for every valid and invalid transition
- [ ] `Loan` model has helper methods: `isActive()`, `isOverdue()`, `isDefaulted()`, `canDisburse()`
- [ ] Disbursement guard fires `LoanDisbursementBlocked` event if mandate is not active (mandate module hooks into this later)

**Dependencies**: CASH-2.1

---

### CASH-2.3 — Interest Calculation Engine

**Branch**: `feat/loan-interest-engine`

**User Story**:
> As a lender, I want interest calculated correctly for flat-rate and reducing-balance loan types so that repayment schedules are mathematically accurate and auditable.

**Description**:
- `app/Modules/LoanEngine/Services/InterestCalculator.php`
- Supports: `flat` (interest on original principal), `reducing_balance` (interest on outstanding principal)
- Input: principal, rate (%), duration (days or months), compounding period
- Output: total interest, total repayable, effective APR
- All calculations use `brick/money` or `bcmath` for precision — never floating point
- Interest rate stored as basis points in the database (e.g., 500 = 5.00%) to avoid float storage

**Acceptance Criteria**:
- [ ] Flat rate calculation is correct to 2 decimal places for given test vectors
- [ ] Reducing balance calculation is correct for monthly compounding
- [ ] No floating point arithmetic used anywhere in interest calculation
- [ ] APR calculation matches standard formula
- [ ] Unit tests cover: flat rate, reducing balance, edge cases (0%, 100%, very short/long duration)
- [ ] PHPStan passes with strict types on the calculator

**Dependencies**: CASH-2.2

---

### CASH-2.4 — Repayment Schedule Generator

**Branch**: `feat/loan-repayment-schedule`

**User Story**:
> As a lender and borrower, I want a full repayment schedule generated at loan creation so that both parties know exactly when each instalment is due, how much it is, and how much is interest vs. principal.

**Description**:
- `repayment_schedules` table: id, loan_id, instalment_number, due_date, principal_due, interest_due, total_due, status (pending/paid/partial/overdue), paid_at
- `RepaymentScheduleGenerator` service creates all instalment rows at loan activation
- Supports: weekly, bi-weekly, monthly repayment frequencies
- Final instalment adjusts for rounding differences (no penny gaps)
- `GET /api/v1/loans/{id}/schedule` — returns full schedule
- Schedule is regenerated if loan terms are amended (pre-disbursement only)
- `LoanScheduleGenerated` event fired on creation

**Acceptance Criteria**:
- [ ] Schedule instalments sum exactly to `principal + total_interest` (no rounding drift)
- [ ] Final instalment absorbs any rounding difference (never a phantom extra instalment)
- [ ] Supported frequencies: weekly, bi-weekly, monthly
- [ ] Schedule cannot be regenerated after disbursement
- [ ] `GET /api/v1/loans/{id}/schedule` returns all instalments in the standard envelope
- [ ] Unit tests verify sum accuracy for flat and reducing balance across all frequencies

**Dependencies**: CASH-2.3

---

### CASH-2.5 — Default & Overdue Tracking

**Branch**: `feat/loan-default-tracking`

**User Story**:
> As a lender, I want overdue and defaulted loans identified automatically so that I can act on them without manually checking every loan's due date.

**Description**:
- Scheduled job: `MarkOverdueLoansJob` — runs daily, transitions `active` loans with past-due instalments to `overdue`
- Scheduled job: `MarkDefaultedLoansJob` — runs daily, transitions loans overdue by more than the configured grace period (default 30 days) to `defaulted`
- Grace period configurable per tenant in `tenants` table
- `LoanBecameOverdue` and `LoanDefaulted` events fired (Recovery Engine listens to these)
- `GET /api/v1/loans?status=overdue` and `?status=defaulted` filtered list endpoints

**Acceptance Criteria**:
- [ ] `MarkOverdueLoansJob` correctly identifies loans with any unpaid instalment past due date
- [ ] `MarkDefaultedLoansJob` respects per-tenant grace period
- [ ] Both jobs are idempotent — running twice does not double-transition
- [ ] `LoanBecameOverdue` event fires when a loan transitions to overdue
- [ ] `LoanDefaulted` event fires when a loan transitions to defaulted
- [ ] Both jobs are registered in the Laravel scheduler
- [ ] Feature tests use time-travel to simulate overdue and default transitions

**Dependencies**: CASH-2.4

---

### CASH-2.6 — Loan Origination API

**Branch**: `feat/loan-origination-api`

**User Story**:
> As a lender's system, I want a single API endpoint to originate a loan for a borrower so that I can automate the full loan creation flow from my platform.

**Description**:
- `POST /api/v1/loans` — create loan in `draft` state
- `POST /api/v1/loans/{id}/submit` — submit for disbursement (triggers credit check gate)
- `POST /api/v1/loans/{id}/disburse` — mark as disbursed (lender confirms funds sent, or triggers payment orchestration)
- `GET /api/v1/loans/{id}` — loan detail
- `GET /api/v1/loans` — paginated list with filters (status, borrower_id, date range)
- Disbursement blocked if no active mandate on the borrower (returns `422` with `MANDATE_REQUIRED` error code)
- Idempotency key required on `POST /api/v1/loans`

**Acceptance Criteria**:
- [ ] `POST /api/v1/loans` creates a loan in `draft` state and returns it
- [ ] Disbursement with no active mandate returns `422` with `MANDATE_REQUIRED` error code
- [ ] Duplicate idempotency key returns the original loan (no second creation)
- [ ] `GET /api/v1/loans` supports pagination (`page`, `per_page`) and filtering
- [ ] All endpoints return the standard response envelope
- [ ] Scope enforcement: `loans:write` required for create/disburse, `loans:read` for GET
- [ ] Feature tests cover the full origination flow: create → submit → disburse

**Dependencies**: CASH-2.5, CASH-0.7

---

## EPIC 3 — Mandate Management

**Goal**: Legal authorisation to debit borrowers. No mandates = no recovery. This is the gatekeeper for loan disbursement.

---

### CASH-3.1 — Mandate Model (Multi-Account)

**Branch**: `feat/mandate-model`

**User Story**:
> As the platform, I want to store and manage multiple mandates per borrower (across different accounts and payment methods) so that the Recovery Engine can attempt debits across all authorised accounts.

**Description**:
- `mandates` table in tenant schema
- Fields: id, borrower_id, type (bank_account/card/mobile_money), provider (nibss/flutterwave/safaricom), account_reference (encrypted), status (pending/active/failed/revoked), is_primary (bool), metadata (jsonb), activated_at, expires_at
- One borrower can have many mandates (different accounts/cards)
- At most one `is_primary = true` per borrower
- `Mandate` model with `Auditable` trait
- `MandateActivated`, `MandateFailed`, `MandateRevoked` events
- `GET /api/v1/borrowers/{id}/mandates` — list mandates

**Acceptance Criteria**:
- [ ] A borrower can have multiple mandates of different types
- [ ] Only one mandate can be `is_primary` per borrower (enforced at DB and model level)
- [ ] Account reference is stored encrypted
- [ ] All status transitions fire the appropriate event
- [ ] `Auditable` trait logs all mandate changes
- [ ] Feature tests cover multi-mandate creation and primary flag enforcement

**Dependencies**: CASH-2.1

---

### CASH-3.2 — NIBSS eMandate Integration (Nigeria)

**Branch**: `feat/mandate-nibss`

**User Story**:
> As a lender operating in Nigeria, I want to register NIBSS eMandates for borrowers so that I have legal authorisation to directly debit their bank accounts in compliance with CBN direct debit regulations.

**Description**:
- Integrate with NIBSS eMandate API (or the bank's NIBSS gateway)
- `POST /api/v1/mandates/nibss` — initiate mandate registration
- Webhook handler: `POST /api/v1/webhooks/nibss` — receive mandate status updates from NIBSS
- NIBSS mandate flow: initiate → OTP/authorisation by account holder → activated callback
- Abstract NIBSS behind `app/Modules/MandateManagement/Services/Providers/NibssProvider.php` implementing `MandateProviderInterface`
- Store NIBSS mandate reference in `mandates.metadata`
- Mandate activation updates loan disbursement gate

**Acceptance Criteria**:
- [ ] `POST /api/v1/mandates/nibss` initiates a mandate and returns pending status with reference
- [ ] NIBSS webhook correctly verifies the HMAC signature before processing
- [ ] Mandate transitions to `active` on successful NIBSS callback
- [ ] Mandate transitions to `failed` on rejection callback
- [ ] `LoanDisbursementBlocked` gate is cleared when mandate activates
- [ ] `MandateProviderInterface` is implemented so adding a new provider requires no changes to mandate model/controller
- [ ] Feature tests mock the NIBSS API and test both success and failure webhooks

**Dependencies**: CASH-3.1, CASH-0.5

---

### CASH-3.3 — Card Tokenization via Flutterwave

**Branch**: `feat/mandate-card-token`

**User Story**:
> As a lender, I want to tokenize borrower card details via Flutterwave so that I can charge cards for repayments without storing raw card data and without PCI DSS scope expansion.

**Description**:
- Flutterwave card tokenization flow: lender redirects borrower to Flutterwave hosted page → token returned via webhook
- `POST /api/v1/mandates/card` — initiate card tokenization, returns hosted page URL
- Webhook: `POST /api/v1/webhooks/flutterwave/card` — receive token
- Store token encrypted in `mandates.account_reference`
- Abstract behind `CardTokenizationProvider` implementing `MandateProviderInterface`
- Card type (Visa/Mastercard), last 4 digits, expiry stored in `mandates.metadata` for display

**Acceptance Criteria**:
- [ ] Initiation returns a Flutterwave hosted payment link
- [ ] Flutterwave webhook is signature-verified before processing
- [ ] Card token stored encrypted, never in plaintext
- [ ] Card display metadata (last 4, expiry, brand) stored in metadata
- [ ] Mandate transitions to `active` on successful tokenization webhook
- [ ] Feature tests mock Flutterwave webhook responses

**Dependencies**: CASH-3.1

---

### CASH-3.4 — Mandate Activation Webhook Handler

**Branch**: `feat/mandate-webhook-handler`

**User Story**:
> As the platform, I want a centralised, signature-verified webhook handler for all mandate providers so that mandate status updates are processed reliably and consistently regardless of provider.

**Description**:
- `POST /api/v1/webhooks/{provider}` — centralised webhook router
- Signature verification per provider (HMAC-SHA256 for Flutterwave, NIBSS has its own signing)
- Webhook events processed via queued jobs (not synchronously in the HTTP handler — return `200` immediately)
- `webhook_deliveries` table: logs every inbound webhook (payload, signature, status, processed_at)
- Idempotency: duplicate webhook payloads (same event ID) are ignored
- Failed webhook jobs retry with exponential backoff (max 5 attempts)

**Acceptance Criteria**:
- [ ] Invalid webhook signatures return `400` and log to `webhook_deliveries` with `signature_failed` status
- [ ] Valid webhook returns `200 OK` immediately; processing is async
- [ ] Duplicate webhook event IDs are ignored (idempotent)
- [ ] Failed processing jobs retry up to 5 times with exponential backoff
- [ ] All inbound webhooks are logged to `webhook_deliveries` regardless of validity
- [ ] Feature tests verify signature validation, idempotency, and async dispatch

**Dependencies**: CASH-3.2, CASH-3.3

---

## EPIC 4 — Payment Orchestration

**Goal**: A PSP-agnostic abstraction layer. Adding a new country's payment provider requires one new adapter, zero changes to business logic.

---

### CASH-4.1 — PSP Abstraction Layer

**Branch**: `feat/psp-abstraction`

**User Story**:
> As a developer, I want a PSP-agnostic payment interface so that the loan engine and recovery engine never reference a specific PSP and adding a new country's payment rail requires only a new adapter.

**Description**:
- `app/Modules/PaymentOrchestration/Contracts/PaymentProviderInterface.php`:
  ```php
  interface PaymentProviderInterface {
    public function charge(ChargeRequest $request): ChargeResponse;
    public function refund(RefundRequest $request): RefundResponse;
    public function getTransaction(string $reference): TransactionResponse;
  }
  ```
- `PaymentProviderFactory` — resolves the correct provider based on mandate type + country
- Country-to-provider mapping in config: `config/payment_providers.php`
- `ChargeRequest` / `ChargeResponse` value objects (typed, no arrays)
- `payments` table: id, loan_id, mandate_id, amount, currency, provider, provider_reference, status, metadata (jsonb), attempted_at, settled_at
- `Payment` model with `Auditable` trait

**Acceptance Criteria**:
- [ ] `PaymentProviderInterface` is the only thing the Loan/Recovery engines reference
- [ ] `PaymentProviderFactory` resolves the correct adapter from country + mandate type
- [ ] All charge requests and responses use typed value objects (no raw arrays)
- [ ] Adding a new provider requires only: creating an adapter class + one line in config
- [ ] `payments` table and model are in place
- [ ] Unit tests mock the interface and confirm factory resolves correctly

**Dependencies**: CASH-3.1, CASH-0.5

---

### CASH-4.2 — Flutterwave Adapter

**Branch**: `feat/psp-flutterwave`

**User Story**:
> As a lender operating in Nigeria, I want repayments collected via Flutterwave direct debit and card charging so that borrowers are debited on their due dates without manual intervention.

**Description**:
- `app/Modules/PaymentOrchestration/Providers/FlutterwaveAdapter.php` implementing `PaymentProviderInterface`
- Supports: card charge (via stored token), direct debit (via mandate reference)
- HTTP client: `guzzlehttp/guzzle` with retry middleware (3 retries on 5xx, exponential backoff)
- All Flutterwave API calls logged to `provider_api_logs` table (request/response, duration, status)
- Handle Flutterwave-specific error codes and map to CashRecova error codes
- `FLUTTERWAVE_SECRET_KEY` and `FLUTTERWAVE_PUBLIC_KEY` in `.env`

**Acceptance Criteria**:
- [ ] `charge()` calls Flutterwave and returns a typed `ChargeResponse`
- [ ] HTTP 5xx from Flutterwave retries up to 3 times before failing
- [ ] Every Flutterwave API call is logged to `provider_api_logs`
- [ ] Flutterwave error codes are mapped to CashRecova standard error codes
- [ ] Feature tests use Flutterwave sandbox and/or HTTP mock
- [ ] API credentials are never logged

**Dependencies**: CASH-4.1

---

### CASH-4.3 — Idempotency Middleware for Payments

**Branch**: `feat/payment-idempotency`

**User Story**:
> As a lender, I want payment API calls to be idempotent so that if my system retries a request due to a network timeout, I am guaranteed not to charge the borrower twice.

**Description**:
- `Idempotency-Key` header required on: `POST /api/v1/payments`, `POST /api/v1/loans/{id}/disburse`, and all write endpoints in the recovery engine
- Keys stored in Redis per tenant: `idempotency:{tenant_id}:{key}` → serialised response, TTL 24h
- On duplicate key: return the stored response with `X-Idempotency-Replayed: true` header
- Key must be a UUID (validated)
- Missing key on required endpoints returns `422` with `IDEMPOTENCY_KEY_REQUIRED` error code
- Idempotency check happens before any DB writes

**Acceptance Criteria**:
- [ ] Duplicate `Idempotency-Key` returns the original response, no second DB write
- [ ] `X-Idempotency-Replayed: true` header on replayed responses
- [ ] Non-UUID key format returns `422`
- [ ] Missing key on a required endpoint returns `422` with `IDEMPOTENCY_KEY_REQUIRED`
- [ ] Idempotency store uses Redis with 24h TTL
- [ ] Check occurs before any business logic or DB transaction
- [ ] Feature tests: same key twice, different keys, missing key

**Dependencies**: CASH-0.3, CASH-0.5

---

### CASH-4.4 — Payment Attempt Model & Status Tracking

**Branch**: `feat/payment-model`

**User Story**:
> As a lender, I want a complete history of every payment attempt for every loan so that I can audit repayment collection and identify patterns in failures.

**Description**:
- `payment_attempts` table: id, payment_id, attempt_number, amount, status (pending/success/failed/reversed), failure_reason, provider_response (jsonb), attempted_at
- `PaymentAttempted`, `PaymentSucceeded`, `PaymentFailed` events
- `PaymentSucceeded` listener: update instalment status → trigger billing fee deduction → fire lender webhook
- `PaymentFailed` listener: increment attempt counter → notify Recovery Engine
- `GET /api/v1/loans/{id}/payments` — full payment history

**Acceptance Criteria**:
- [ ] Every charge attempt (success or failure) creates a `payment_attempts` record
- [ ] `PaymentSucceeded` triggers instalment status update and billing fee deduction
- [ ] `PaymentFailed` fires event that Recovery Engine can listen to
- [ ] Provider raw response stored in `provider_response` for debugging
- [ ] `GET /api/v1/loans/{id}/payments` returns paginated history
- [ ] Feature tests cover success, failure, and partial payment scenarios

**Dependencies**: CASH-4.2, CASH-4.3

---

### CASH-4.5 — Inbound PSP Webhook Handler

**Branch**: `feat/psp-webhook-handler`

**User Story**:
> As the platform, I want PSP payment result webhooks processed reliably so that payment statuses are updated in real time even when our outbound API call does not return a definitive result.

**Description**:
- Extends the webhook infrastructure from CASH-3.4
- Register Flutterwave payment webhook events: `charge.completed`, `transfer.completed`, `charge.failed`
- Map Flutterwave events to CashRecova `PaymentSucceeded` / `PaymentFailed` events
- Reconcile: match inbound webhook to `payment_attempts` via provider reference
- Handle out-of-order webhooks (e.g., success webhook arrives after timeout retry already marked it failed)

**Acceptance Criteria**:
- [ ] `charge.completed` webhook correctly marks payment as succeeded
- [ ] `charge.failed` webhook correctly marks payment as failed
- [ ] Webhook processing is idempotent (same event ID processed twice = no duplicate state change)
- [ ] Out-of-order webhook handling: if payment already `succeeded`, a late `failed` webhook is ignored
- [ ] Feature tests mock all Flutterwave webhook shapes

**Dependencies**: CASH-4.4, CASH-3.4

---

## EPIC 5 — Recovery Engine

**Goal**: Fully automated, multi-account recovery. This is the platform's core differentiator.

---

### CASH-5.1 — Recovery Scheduler

**Branch**: `feat/recovery-scheduler`

**User Story**:
> As the platform, I want overdue loans automatically queued for recovery so that no human intervention is needed to initiate repayment collection on due dates.

**Description**:
- `recovery_jobs` table: id, loan_id, instalment_id, status, scheduled_at, attempts, next_retry_at, last_attempt_at, resolution (recovered/escalated/cancelled)
- `ScheduleRecoveryJob` artisan command / scheduled task: runs daily, creates `recovery_jobs` for all overdue instalments
- `ProcessRecoveryJob` queued job: executes a single recovery attempt
- Jobs are idempotent — running scheduler twice for the same day creates no duplicates

**Acceptance Criteria**:
- [ ] Scheduler creates exactly one `recovery_jobs` record per overdue instalment
- [ ] Running the scheduler twice is idempotent
- [ ] `ProcessRecoveryJob` is dispatched for each new recovery job
- [ ] Recovery jobs are tenant-scoped
- [ ] Scheduler is registered in `routes/console.php`
- [ ] Feature tests with time-travel verify correct jobs are created for overdue loans

**Dependencies**: CASH-2.5, CASH-4.4

---

### CASH-5.2 — Multi-Account Retry Logic

**Branch**: `feat/recovery-multi-account`

**User Story**:
> As the platform, I want the Recovery Engine to attempt collection across all of a borrower's connected mandates in priority order so that maximum recovery is achieved even when the primary account has insufficient funds.

**Description**:
- Mandate priority order: `is_primary = true` first, then by type (bank_account > card > mobile_money), then by `activated_at` (oldest first)
- `ProcessRecoveryJob` iterates through mandates in order:
  - Attempt charge via `PaymentProviderFactory`
  - On `insufficient_funds`: move to next mandate, try partial if configured
  - On success: mark recovery job resolved, update instalment
  - On all mandates exhausted: increment `attempts`, schedule `next_retry_at`
- Max attempts configurable per tenant (default 5)
- Each attempt logged to `payment_attempts`

**Acceptance Criteria**:
- [ ] Primary mandate is always tried first
- [ ] On primary failure, next mandate in priority order is tried
- [ ] All attempts are logged to `payment_attempts`
- [ ] Recovery job `attempts` counter increments on full-cycle failure
- [ ] On max attempts reached, job status is set to `exhausted` (triggers CASH-5.5)
- [ ] Unit tests cover priority ordering with mocked mandate list and mocked PSP responses

**Dependencies**: CASH-5.1, CASH-4.1

---

### CASH-5.3 — Salary Date Detection

**Branch**: `feat/recovery-salary-detection`

**User Story**:
> As the platform, I want the Recovery Engine to detect a borrower's salary credit date via Mono transaction data so that recovery retries are scheduled the day after salary arrives, maximising collection success rates.

**Description**:
- `app/Modules/RecoveryEngine/Services/SalaryDetectionService.php`
- Uses Mono transaction history to identify recurring large credits (salary pattern)
- Detection logic: credits > 3× average transaction in the last 3 months, recurring within ±3 days of same date
- Stores detected salary day (1–31) in borrower metadata
- Recovery scheduler uses salary day when `next_retry_at` would otherwise fall on a weekend or non-salary period
- Falls back to standard retry if no salary pattern detected
- `salary_profiles` table: borrower_id, detected_day, confidence_score, last_detected_at

**Acceptance Criteria**:
- [ ] Service correctly identifies salary day from mock Mono transaction data
- [ ] No salary pattern detected gracefully falls back to standard retry schedule
- [ ] Detected salary day is stored and used by the recovery scheduler
- [ ] Retry is scheduled for salary_day + 1 when a salary date is known
- [ ] Confidence score is stored (low confidence = standard retry used instead)
- [ ] Unit tests cover detection with various transaction patterns

**Dependencies**: CASH-5.2

---

### CASH-5.4 — Partial Payment Handling

**Branch**: `feat/recovery-partial-payment`

**User Story**:
> As the platform, I want to accept partial payments so that borrowers with insufficient funds still reduce their balance rather than being marked fully failed, improving recovery rates.

**Description**:
- Charge `available_balance` (from Mono balance check) if less than `amount_due` and `available_balance > minimum_partial_threshold` (configurable, default ₦500)
- `repayment_schedules` instalment status: `partial` — tracks how much has been paid vs outstanding
- Remaining balance on a partially paid instalment is added to the next recovery attempt
- `PartialPaymentReceived` event fires → notifies lender webhook
- Partial payment still deducts platform fee (pro-rated)

**Acceptance Criteria**:
- [ ] Charge is attempted for available balance when below instalment amount but above threshold
- [ ] Instalment status updates to `partial` with correct `paid_amount` and `outstanding_amount`
- [ ] Outstanding balance carries forward to next recovery attempt
- [ ] `PartialPaymentReceived` event fires and is forwarded to lender webhook
- [ ] Platform fee deducted pro-rata on partial payments
- [ ] Feature tests cover partial payment creation and carry-forward logic

**Dependencies**: CASH-5.2

---

### CASH-5.5 — Escalation Workflow

**Branch**: `feat/recovery-escalation`

**User Story**:
> As a lender, I want to be notified when a recovery job is exhausted after all retry attempts so that I can take manual action (legal, collections agency) before writing off the debt.

**Description**:
- `EscalationWorkflow` triggered when `recovery_jobs.attempts >= max_attempts`
- Actions on escalation:
  1. Transition loan to `defaulted` (via `LoanStateMachine`)
  2. Fire `RecoveryExhausted` event
  3. Dispatch webhook to lender with full loan + payment history summary
  4. Create `escalation_cases` record with all relevant context
- `GET /api/v1/escalations` — list escalated cases (lender-visible)
- Lender can `POST /api/v1/escalations/{id}/resolve` to mark manually resolved
- `escalation_cases` table: id, loan_id, recovery_job_id, status, total_attempted, total_recovered, created_at, resolved_at

**Acceptance Criteria**:
- [ ] Loan transitions to `defaulted` automatically on escalation
- [ ] Lender webhook is dispatched with full summary within 5 minutes of escalation
- [ ] `escalation_cases` record created with complete context
- [ ] `GET /api/v1/escalations` returns paginated list with filters
- [ ] Manual resolution by lender updates status and fires `EscalationResolved` event
- [ ] Feature test covers the full path: max retries → escalation → lender webhook

**Dependencies**: CASH-5.4, CASH-8.1

---

## EPIC 6 — Credit Decisioning

**Goal**: Integrate external data sources to power risk scoring at loan origination.

---

### CASH-6.1 — Mono Bank Data Integration

**Branch**: `feat/credit-mono`

**User Story**:
> As a lender, I want to link a borrower's bank account via Mono so that I can access verified transaction history and account balances for credit assessment.

**Description**:
- Mono Connect flow: generate link token → borrower completes Mono widget → exchange code for account ID
- `POST /api/v1/borrowers/{id}/mono/link` — generate Mono Connect link
- Webhook: `POST /api/v1/webhooks/mono` — receive account linked event
- `mono_accounts` table: id, borrower_id, mono_account_id, institution_name, account_name, currency, balance, last_synced_at
- `GET /api/v1/borrowers/{id}/mono/transactions` — fetch via Mono API (paginated)
- `GET /api/v1/borrowers/{id}/mono/balance` — current balance
- Mono account used by Recovery Engine salary detection (CASH-5.3) and by Credit Decisioning scoring

**Acceptance Criteria**:
- [ ] Mono Connect link generation works and returns a valid link token
- [ ] Mono webhook is signature-verified
- [ ] Account details stored on successful linking
- [ ] Transactions are fetchable and paginated
- [ ] `mono_accounts.balance` is used by recovery engine for partial payment check
- [ ] Feature tests mock Mono API responses

**Dependencies**: CASH-2.1, CASH-3.4

---

### CASH-6.2 — CRC Credit Bureau Integration

**Branch**: `feat/credit-crc`

**User Story**:
> As a lender, I want to pull a CRC credit report for a borrower at loan origination so that I can see their credit history before approving.

**Description**:
- `CrcBureauAdapter` implementing `CreditBureauInterface`
- `GET /api/v1/borrowers/{id}/credit-report/crc` — fetch CRC report
- Report cached per borrower for 24h (Redis) to avoid excessive bureau charges
- Report stored in `credit_reports` table (raw response as JSONB, parsed summary fields)
- `credit_reports`: id, borrower_id, bureau (crc/firstcentral), bvn, score, total_facilities, performing_facilities, non_performing_facilities, raw_response (jsonb), fetched_at

**Acceptance Criteria**:
- [ ] CRC API is called with BVN and returns a parsed report
- [ ] Report is cached for 24h — second call within 24h returns cache, no bureau API call
- [ ] Raw response stored in `credit_reports.raw_response`
- [ ] `CreditBureauInterface` allows FirstCentral to be added without changing the adapter pattern
- [ ] Feature tests mock CRC API

**Dependencies**: CASH-2.1

---

### CASH-6.3 — FirstCentral Bureau Integration

**Branch**: `feat/credit-firstcentral`

**User Story**:
> As a lender, I want to optionally pull a FirstCentral credit report alongside CRC so that I have a second data point for high-value loan decisions.

**Description**:
- `FirstCentralBureauAdapter` implementing `CreditBureauInterface`
- Same pattern as CASH-6.2
- `GET /api/v1/borrowers/{id}/credit-report/firstcentral`
- Caching and storage same as CRC

**Acceptance Criteria**:
- [ ] FirstCentral adapter follows same interface as CRC
- [ ] Report cached and stored identically to CRC
- [ ] Feature tests mock FirstCentral API

**Dependencies**: CASH-6.2

---

### CASH-6.4 — Risk Scoring Engine

**Branch**: `feat/credit-risk-scoring`

**User Story**:
> As a lender, I want a composite risk score for a borrower derived from bureau data and Mono transaction history so that I have a single, consistent signal to base my loan approval decision on.

**Description**:
- `RiskScoringEngine` service: composes bureau score + Mono income/spending analysis
- Score: 0–1000 (higher = lower risk)
- Factors: bureau score (weighted 40%), income stability (30%), debt-to-income ratio (20%), spending patterns (10%)
- `risk_assessments` table: id, borrower_id, loan_id, score, breakdown (jsonb), recommendation (approve/review/decline), assessed_at
- `POST /api/v1/loans/{id}/assess` — run risk assessment, returns score + recommendation
- Assessment stored; re-assessment requires explicit call (not automatic)
- Lender can override recommendation (logged to audit trail)

**Acceptance Criteria**:
- [ ] Score calculation uses all four weighted factors
- [ ] `risk_assessments` record created on every assessment
- [ ] Breakdown JSONB shows per-factor contribution
- [ ] Lender override is captured in the audit log
- [ ] Minimum data requirements: at least one bureau report OR Mono account required to run assessment
- [ ] Unit tests for score calculation with mocked inputs

**Dependencies**: CASH-6.3, CASH-6.1

---

## EPIC 7 — Billing Engine

**Goal**: The platform's revenue mechanism. Every transaction generates a fee deducted from the lender's pre-funded wallet.

---

### CASH-7.1 — Wallet Ledger

**Branch**: `feat/billing-wallet-ledger`

**User Story**:
> As a lender, I want a wallet balance that I pre-fund so that CashRecova can automatically deduct fees per transaction without requiring manual invoicing.

**Description**:
- `wallets` table in public schema: id, tenant_id, balance (numeric, stored in kobo/cents), currency, low_balance_threshold, created_at
- `wallet_transactions` table: id, wallet_id, type (credit/debit), amount, reference, description, balance_after, created_at
- Wallet balance never goes negative — debit rejected if insufficient (loan with suspended billing)
- All balance changes go through `WalletService::credit()` and `WalletService::debit()` — never direct DB updates
- Ledger is append-only (no updates to `wallet_transactions`)
- `GET /api/v1/wallet` — current balance and recent transactions
- `POST /api/v1/wallet/fund` — internal/admin endpoint to top up wallet

**Acceptance Criteria**:
- [ ] Balance cannot go negative — debit on zero balance returns `INSUFFICIENT_WALLET_BALANCE`
- [ ] `wallet_transactions` is append-only (no UPDATE allowed — enforced via PostgreSQL trigger)
- [ ] `balance_after` on each row is consistent with running sum of all prior transactions
- [ ] All debits and credits go through `WalletService` — no direct SQL in other modules
- [ ] `GET /api/v1/wallet` returns balance and last 20 transactions
- [ ] Feature tests verify ledger integrity (sum of transactions = current balance)

**Dependencies**: CASH-1.1

---

### CASH-7.2 — Per-Transaction Fee Deduction

**Branch**: `feat/billing-fee-deduction`

**User Story**:
> As the platform operator, I want a fee automatically deducted from the lender's wallet on every successful payment collection so that revenue is captured without manual billing.

**Description**:
- Fee configuration in `tenants` table: `fee_per_collection` (fixed, in kobo), `fee_percentage` (optional, basis points)
- `PaymentSucceeded` listener deducts fee from lender wallet via `WalletService::debit()`
- Fee deduction is atomic with payment success update (single transaction)
- If wallet has insufficient balance: payment still recorded as succeeded, but `billing_status = suspended` flagged on tenant
- Fee deduction logged to `wallet_transactions` with reference to `payment_attempts.id`

**Acceptance Criteria**:
- [ ] Fee is deducted atomically when `PaymentSucceeded` event fires
- [ ] Fee deduction references the `payment_attempts.id` in `wallet_transactions`
- [ ] Insufficient wallet balance does not fail the payment — it flags billing as suspended
- [ ] Tenant with `billing_status = suspended` receives a `LOW_WALLET_BALANCE` error on next collection attempt
- [ ] Feature tests verify deduction, insufficient balance handling, and audit trail

**Dependencies**: CASH-7.1, CASH-4.4

---

### CASH-7.3 — Failed Payment Charge

**Branch**: `feat/billing-failed-charge`

**User Story**:
> As the platform operator, I want to charge lenders a smaller fee for each failed collection attempt so that recovery engine costs are covered even when collection is unsuccessful.

**Description**:
- `fee_per_failed_attempt` field in `tenants` table (configurable, default lower than success fee)
- `PaymentFailed` listener charges the failed attempt fee via `WalletService::debit()`
- Failed charge only deducted if `payment_attempts.failure_reason != 'mandate_invalid'` (mandate failures are not charged — PSP not called)
- Fee waived if wallet balance < failed fee (no negative balance, no suspension for failed fee alone)

**Acceptance Criteria**:
- [ ] Failed attempt fee is deducted when `PaymentFailed` fires
- [ ] No fee charged on `mandate_invalid` failures
- [ ] No fee charged if wallet balance would go negative
- [ ] Fee deduction references the `payment_attempts.id`
- [ ] Feature tests for: standard failure, mandate invalid failure, zero wallet balance

**Dependencies**: CASH-7.2

---

### CASH-7.4 — API Usage Metering

**Branch**: `feat/billing-api-metering`

**User Story**:
> As the platform operator, I want to record every API call made per tenant so that I can offer usage-based billing tiers in the future and tenants can see their own usage.

**Description**:
- `api_usage_logs` table in public schema: id, tenant_id, endpoint, method, response_status, duration_ms, date (date only, for aggregation)
- Middleware `MeterApiUsageMiddleware` logs every request (async, queued job)
- Daily aggregated counts stored in `api_usage_daily` table (tenant_id, date, endpoint, request_count)
- `GET /api/v1/billing/usage` — returns daily usage for current month
- Usage data retained for 90 days (purge job)

**Acceptance Criteria**:
- [ ] Every API request is logged (async — no latency impact)
- [ ] Daily aggregation job runs nightly
- [ ] `GET /api/v1/billing/usage` returns per-endpoint daily counts for current month
- [ ] Usage logs purged after 90 days
- [ ] Feature tests verify logging and aggregation

**Dependencies**: CASH-7.1

---

### CASH-7.5 — Low Wallet Balance Alerts

**Branch**: `feat/billing-balance-alerts`

**User Story**:
> As a lender, I want to be notified when my wallet balance falls below a configurable threshold so that I can top up before collection fails due to insufficient billing funds.

**Description**:
- `low_balance_threshold` on `wallets` table (configurable by tenant)
- After every debit in `WalletService`, check if balance < threshold
- If yes: fire `WalletBalanceLow` event
- `WalletBalanceLow` listener: dispatch lender webhook + in-app notification
- Alert cooldown: only re-alert after 24h to avoid spam
- `PATCH /api/v1/wallet/threshold` — lender updates their threshold

**Acceptance Criteria**:
- [ ] Alert fires when balance drops below threshold
- [ ] Alert does not fire again within 24h of the last alert
- [ ] Lender receives webhook notification with current balance and threshold
- [ ] Threshold is configurable by lender (not just by admin)
- [ ] Feature tests cover: balance below threshold, 24h cooldown, threshold update

**Dependencies**: CASH-7.2

---

## EPIC 8 — Notifications & Event Delivery

**Goal**: Reliable, signed outbound event delivery to lenders plus a polling fallback.

---

### CASH-8.1 — Outbound Webhook Delivery

**Branch**: `feat/notif-webhook-delivery`

**User Story**:
> As a lender's system, I want to receive signed webhook events from CashRecova so that my system is notified of every important state change in real time without polling.

**Description**:
- `webhook_endpoints` table per tenant: id, url, secret (hashed), events (jsonb array of subscribed events), is_active, created_at
- All outbound webhooks signed with HMAC-SHA256 using the endpoint secret: `X-CashRecova-Signature: sha256={hmac}`
- `WebhookDelivery` queued job handles delivery
- Retry: exponential backoff — 1m, 5m, 30m, 2h, 24h (5 attempts)
- After 5 failures: endpoint marked `failing`, lender notified via email
- `outbound_webhook_logs` table: endpoint_id, event, payload (jsonb), response_status, response_body, attempt, delivered_at
- `POST /api/v1/webhooks/endpoints` — register endpoint
- `GET /api/v1/webhooks/endpoints/{id}/deliveries` — delivery log (last 100)
- `POST /api/v1/webhooks/endpoints/{id}/test` — send a test payload

**Acceptance Criteria**:
- [ ] All outbound webhooks include `X-CashRecova-Signature` header
- [ ] Signature verified by a test receiver using the stored secret
- [ ] Failed deliveries retry on exponential schedule up to 5 attempts
- [ ] Endpoint marked `failing` after 5 consecutive failures
- [ ] All delivery attempts logged to `outbound_webhook_logs`
- [ ] `POST /api/v1/webhooks/endpoints/{id}/test` sends a `ping` event
- [ ] Feature tests mock HTTP delivery and verify signing, retries, failure marking

**Dependencies**: CASH-1.1, CASH-0.3

---

### CASH-8.2 — Cursor-Based Event Log (Polling Fallback)

**Branch**: `feat/notif-event-log`

**User Story**:
> As a lender's system, I want to poll a paginated event log so that I can catch any events my webhook endpoint missed due to downtime, without asking support to replay webhooks.

**Description**:
- `platform_events` table per tenant: id (uuid v7 — sortable), event_type, payload (jsonb), created_at
- Every internal event (`LoanStateChanged`, `PaymentSucceeded`, `PaymentFailed`, etc.) creates a `platform_events` record
- `GET /api/v1/events?after={cursor}&limit={n}` — cursor-based pagination (cursor = last event ID)
- Response includes `next_cursor` for the next page
- Events retained for 90 days
- `GET /api/v1/events/{id}` — single event detail

**Acceptance Criteria**:
- [ ] Every major platform event creates a `platform_events` record
- [ ] `GET /api/v1/events?after={cursor}` returns events after the given cursor in chronological order
- [ ] `next_cursor` is null when there are no more events
- [ ] Events older than 90 days are purged by a scheduled job
- [ ] UUIDv7 used for event IDs (time-sortable without created_at index)
- [ ] Feature tests verify cursor pagination, event ordering, and purge

**Dependencies**: CASH-8.1

---

### CASH-8.3 — Notification Preferences

**Branch**: `feat/notif-preferences`

**User Story**:
> As a lender, I want to subscribe my webhook endpoint to only the specific events I care about so that I am not overwhelmed with irrelevant notifications.

**Description**:
- Event subscription stored in `webhook_endpoints.events` (jsonb array)
- Available events enum in `config/events.php`: all valid event types
- `PATCH /api/v1/webhooks/endpoints/{id}/subscriptions` — update subscriptions
- Webhook dispatcher checks subscription before delivering
- Subscribe to `*` for all events
- `GET /api/v1/events/types` — returns all subscribable event types with descriptions

**Acceptance Criteria**:
- [ ] Webhook endpoint only receives events it is subscribed to
- [ ] `*` wildcard subscribes to all events
- [ ] Subscription update is immediately effective (no cache delay)
- [ ] `GET /api/v1/events/types` returns a documented list of all event types
- [ ] Feature tests verify filtering, wildcard, and update

**Dependencies**: CASH-8.1, CASH-8.2

---

## Appendix — Branch Naming Convention

```
feat/   → new feature
fix/    → bug fix
chore/  → tooling, config, dependencies
refactor/ → code restructure, no behaviour change
test/   → tests only
docs/   → documentation only
```

## Appendix — PR Checklist (all PRs)

Before requesting review, every PR must:
- [ ] Pass `composer check` (lint + analyse + test) locally
- [ ] Include feature tests covering the acceptance criteria
- [ ] Have no PHPStan errors at level 8
- [ ] Follow the standard API response envelope for any new endpoints
- [ ] Reference the task ID in the PR title: `[CASH-0.1] Fix dev tooling`
- [ ] Have a migration for any new tables (with a rollback `down()` method)
- [ ] Not introduce any `dd()`, `dump()`, `var_dump()`, or debug output

## Appendix — Event Catalogue

| Event | Fired By | Consumed By |
|---|---|---|
| `TenantProvisioned` | Auth | Notifications |
| `LoanStateChanged` | LoanEngine | Notifications, BillingEngine |
| `LoanBecameOverdue` | LoanEngine | RecoveryEngine |
| `LoanDefaulted` | LoanEngine | RecoveryEngine, Notifications |
| `MandateActivated` | MandateManagement | LoanEngine |
| `MandateFailed` | MandateManagement | Notifications |
| `PaymentAttempted` | PaymentOrchestration | BillingEngine |
| `PaymentSucceeded` | PaymentOrchestration | LoanEngine, BillingEngine, Notifications |
| `PaymentFailed` | PaymentOrchestration | RecoveryEngine, BillingEngine, Notifications |
| `PartialPaymentReceived` | RecoveryEngine | LoanEngine, Notifications |
| `RecoveryExhausted` | RecoveryEngine | LoanEngine, Notifications |
| `WalletBalanceLow` | BillingEngine | Notifications |