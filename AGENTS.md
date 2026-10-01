# Documentation project instructions

## About this project

- This is the Nasiko documentation site, built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter (`title`, `description`)
- Navigation, redirects, and theme live in `docs.json`. When you move a page, add a redirect
- The product source is the `nasiko` repo. The CLI is defined in `cli/src/commands/`, HTTP routes
  are assembled in `server/src/lib.rs`, and the OpenAPI spec is served at `/api/openapi.json`.
  Check commands and endpoints against the source, not against other pages

## Positioning

- **Headline:** Nasiko — The OpenRuntime for agents, coding harnesses, frameworks and tools.
- **Byline:** Use any harness. Reach any model. Measure every token. Change nothing.
- **Describing line (do not edit):** Find the coding agents already running. See what each one
  costs, by harness, model and team. Reach any model from any harness. One command on a laptop,
  the same command across an estate — and nothing changes about how anyone works.
- **Non-invasive** is about architecture: Nasiko discovers the harness you already run and it keeps
  running unchanged. No wrapper, no SDK in your code path.
- **Non-intrusive** is about the developer's day: one command, one click per agent, same workflow.
- The three pillars are **TokenOps**, **Policy, security and governance**, and **Orchestration**.

## Vocabulary

| Use | Avoid | Never |
|---|---|---|
| OpenRuntime; agents, coding harnesses, frameworks, tools | "platform" as the category noun | control plane |
| non-invasive, non-intrusive, in place | seamless, effortless | agent runtime |
| route to models, select a model, at the boundary | run / serve / host models | runtime for models |
| harness portability, switching cost | future-proof | agent workload plane |
| discovered vs reporting | revolutionary, game-changing, unlock, best-in-class | Meta-Harness |

- Verbs are the tell. Agents and tools are **run**. Models are **routed to**, **selected**,
  **switched**, or **allowlisted**.
- The server you deploy is the **Nasiko server** (or "your Nasiko cluster" when talking about the
  CLI's connection target). Don't call it a control plane.
- "Platform" is fine as an ordinary word ("platform credentials", "platform admin"), never as the
  name of what Nasiko is.

## Accuracy rules

- **Document only what ships.** No roadmap, no "coming soon" for unbuilt features. If a behavior
  differs from the positioning, describe the behavior. Examples that must stay accurate:
  - Cursor supports session reporting only. Model routing is available for Claude Code, Codex, and
    OpenCode.
  - Telemetry delivery is fail-open for the harness (events queue locally). Routed model calls fail
    closed: if Nasiko can't issue a credential, the harness gets an error rather than silently
    calling the vendor directly.
  - Spend caps and alerts are not a product surface. Flow token limits and context budgets are.
- Mark Enterprise-only features with an `<Info>` callout that says **Enterprise** so open-source
  users know what applies to them.

## Terminology

- The cost/usage product is **TokenOps**. The API route path is `finops` — refer to it as TokenOps
  in prose, and only mention `finops` when naming an actual endpoint.
- **Routing engine** = picks which *agent* answers. **LLM router** = picks which *model* a call is
  routed to. **Orchestrator** = the live ReAct loop over accessible agents. **MAF** = a pre-defined
  multi-agent workflow. These are four different mechanisms; don't use them interchangeably.
- A **coding agent** or **harness** is a developer tool such as Claude Code, Codex, OpenCode, or
  the Cursor CLI. A **deployed agent** is an A2A agent you build and run on Nasiko.
- The dashboard screen is **TokenOps**, not "Usage".

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references
- Task pages stay short and link to the CLI reference (`/reference/cli/...`) for every flag

## Content boundaries

Docs are split into **customer-facing** (everything outside `internal/`, published) and
**internal-only** (`internal/`, excluded from the build by `.mintignore`).

The audience for the published site is broad: developers running coding agents, developers
building agents, admins managing access, leaders reading TokenOps, and self-hosting operators.
Most tasks should have a dashboard path documented, not only a CLI one.

**Never publish** — put it in `internal/` instead:

- Source-level internals: Rust trait definitions, type/struct names, `tokio::spawn` behavior
- Database table or column names, Redis key formats, stream and consumer-group names
- Checks that are deferred, bypassed, or "not load-bearing yet" — anything that maps a gap
- Roadmap and design intent ("this is the seam we extend for X")
- Internal test and benchmark fixtures
- **System-design and vocabulary pages.** Don't use the words "architecture" or "core concepts"
  in customer-facing docs, and don't add a page that plays that role. Where a published page needs
  a term like session or flow, define it inline in product terms.

**Keep published** — self-hosting customers need these:

- Environment-variable configuration tables
- HTTP API endpoint tables
- Infrastructure topology (Postgres, Redis, S3, Tempo, Loki) and backup guidance
- The `nasiko-ee` admin CLI, Helm charts, cluster provisioning
- Security posture stated behaviorally (what *is* enforced, not what isn't)

Rule of thumb: **a customer needs to know how it behaves and how to configure it. They don't need to
know what it's called in the source tree, or where it falls short.**

Never link from a published page into `internal/` — that produces a broken link on the live site.
