# Internal documentation

**Not published.** Everything in this folder is excluded from the live docs site by
`.mintignore` at the repo root. Do not link to these pages from any file outside
`internal/` — a customer-facing page linking here produces a broken link on the
published site.

## Why this folder exists

The customer-facing docs describe *what the platform does and how to use it*. This
folder holds the material that was previously mixed into those pages but shouldn't
ship to customers:

| Category | Examples |
| --- | --- |
| Source-level internals | Rust trait definitions and method tables, type names, `tokio::spawn` behavior, wrapper structs |
| Storage layout | Database table and column names, Redis key formats, stream and consumer-group names |
| Unshipped or incomplete controls | Checks that are deliberately deferred, bypasses that exist today, "not load-bearing yet" |
| Roadmap and design intent | "This is the seam we extend for X", planned-but-absent capability |
| Internal test scaffolding | Benchmark and conformance fixture agents |
| System design and vocabulary pages | The architecture overview and core-concepts pages — see below |

## The architecture pages

`architecture-overview.md` and `core-concepts.md` were previously published. They are internal by
explicit decision: **the words "architecture" and "core concepts" are not used with customers.**

Do not reintroduce them, or a page like them, to the published site. If a customer-facing page needs
a concept these define (session, flow, control plane), explain it inline on that page in product
terms rather than linking to a definitions page.

## What deliberately stayed customer-facing

The audience includes self-hosting enterprise customers, so these are **not** internal
and remain on the published site:

- Environment-variable configuration tables — operators need them to run a control plane
- HTTP API endpoint tables — customers integrate against them
- Infrastructure topology (Postgres, Redis, S3/MinIO, Tempo, Loki) and backup guidance
- The `nasiko-ee` admin CLI, Helm charts, and cluster provisioning
- Behavior-level security posture (secrets are AES-256-GCM encrypted at rest; uploaded
  MCP servers run hardened and network-segmented; agent-to-agent access is default-deny)

The rule of thumb: **a customer needs to know how it behaves and how to configure it.
They do not need to know what it's called in the source tree or where it falls short.**

## Contents

| Page | Extracted from |
| --- | --- |
| [architecture-overview.md](architecture-overview.md) | was `architecture/overview.mdx` (whole page) |
| [core-concepts.md](core-concepts.md) | was `architecture/core-concepts.mdx` (whole page) |
| [orchestrator-internals.md](orchestrator-internals.md) | `platform/orchestrator.mdx` |
| [acl-internals.md](acl-internals.md) | `platform/acl.mdx` |
| [mcp-gateway-internals.md](mcp-gateway-internals.md) | was `platform/mcp-gateway.mdx` (whole page) |
| [observability-internals.md](observability-internals.md) | was `platform/observability.mdx` (whole page) |
| [agent-runtime-internals.md](agent-runtime-internals.md) | `platform/agent-registry.mdx` |
| [maf-internals.md](maf-internals.md) | `platform/maf.mdx` |

## The two reference pages

`platform/observability.mdx` and `platform/mcp-gateway.mdx` were removed from the published
site outright — "Observability reference" and "MCP gateway reference" were judged too
implementation-level for customers. Each page's content was absorbed into the internals file
above that already covered its subject; neither has a customer-facing reference page anymore.

Two tables from each were **kept published** rather than moved here, per the rule below —
operators and API integrators need them:

| Moved from | Moved to |
| --- | --- |
| observability `/api/observability/*` route table, `OTEL_*` / `TEMPO_URL` / `LOKI_URL` config | `product/observability.mdx` |
| MCP gateway management route table (`/api/mcp/*`) | `mcp-hub/overview.mdx` |

Remaining `platform/` pages that are still reference-shaped and are the next candidates if
this trimming continues: `orchestrator.mdx` (stage-degradation behavior, flow-guard env
vars), `acl.mdx`, and `agent-registry.mdx`.

## Known gaps disclosed here, not publicly

Consolidated for awareness — each is explained in context on the page listed:

- **MAF steps bypass both the flow guard and agent-to-agent ACL** — [maf-internals.md](maf-internals.md)
- **A MAF step created with an explicit agent id is not re-checked against the creator's access to that agent** — [maf-internals.md](maf-internals.md)
- **The per-connector secret token injected into uploaded MCP servers is generated but never verified** — [mcp-gateway-internals.md](mcp-gateway-internals.md)
- **`GET /api/orchestrator/stats` can lag by up to an hour** (materialized view refreshed hourly) — [orchestrator-internals.md](orchestrator-internals.md)
- **In-progress registry blob uploads are held in memory and sticky to one control-plane instance** — `architecture/overview.mdx` (stated publicly as a scaling caveat, which is appropriate)
