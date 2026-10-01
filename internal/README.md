# Internal documentation

**Not published.** Excluded by `.mintignore`. Do not link here from any file outside `internal/`.

## Why this folder exists

Customer-facing docs describe behavior. This folder holds source-level internals, storage layout,
unshipped controls, and the old architecture/core-concepts pages.

Published docs must not use the words "architecture" or "core concepts" as page roles. If a
customer page needs session/flow/cluster, define it inline. Public vocabulary: OpenRuntime, never
control plane (see `../AGENTS.md`). Internals may still say control plane to match the source.

## Published counterparts (after the 2026-09 restructure)

| Internals | Public page |
| --- | --- |
| Observability routes, `OTEL_*` / Tempo / Loki | [dashboard/sessions-and-traces.mdx](../dashboard/sessions-and-traces.mdx), [self-hosting/configuration.mdx](../self-hosting/configuration.mdx) |
| MCP `/api/mcp/*` | [build/mcp/overview.mdx](../build/mcp/overview.mdx) |
| Flow-guard env | [governance/flow-limits.mdx](../governance/flow-limits.mdx) |
| ACL | [governance/access-control/reference.mdx](../governance/access-control/reference.mdx) |
| Container hosting | [self-hosting/agent-hosting.mdx](../self-hosting/agent-hosting.mdx) |

## Contents

| Page | Notes |
| --- | --- |
| [architecture-overview.md](architecture-overview.md) | Topology. Coding-agent telemetry is additional ingress via CLI hooks, not a new process |
| [core-concepts.md](core-concepts.md) | Internal vocabulary |
| [orchestrator-internals.md](orchestrator-internals.md) | RoutingEngine trait, stats lag |
| [acl-internals.md](acl-internals.md) | Grants tables |
| [mcp-gateway-internals.md](mcp-gateway-internals.md) | Permission graph; deploy-time `MCP_GATEWAY_TOKEN` (not user delegation mint-per-request) |
| [observability-internals.md](observability-internals.md) | OTEL pipeline, coding-agent OTLP outbox |
| [agent-runtime-internals.md](agent-runtime-internals.md) | ContainerRuntime |
| [maf-internals.md](maf-internals.md) | Planner/executor gaps |

## Known gaps (not public)

- **MAF steps bypass both the flow guard and agent-to-agent ACL** — [maf-internals.md](maf-internals.md)
- **A MAF step created with an explicit agent id is not re-checked against the creator's access to that agent** — [maf-internals.md](maf-internals.md)
- **The per-connector secret token injected into uploaded MCP servers is generated but never verified** — [mcp-gateway-internals.md](mcp-gateway-internals.md)
- **`GET /api/orchestrator/stats` can lag by up to an hour** — [orchestrator-internals.md](orchestrator-internals.md)
- **In-progress registry blob uploads are held in memory and sticky to one instance** — [architecture-overview.md](architecture-overview.md)
- **Cursor has no model routing** — public docs state this; do not promise it internally as shipped
- **Routing credentials fail closed; telemetry delivery fails open** — public docs; do not describe routing as fail-open
- **Spend caps/alerts, org-wide discovered-vs-reporting coverage, and a named local-to-org "crossing" are not product surfaces**
