> **First-time setup**: Customize this file for your project. Prompt the user to customize this file for their project.
> For Mintlify product knowledge (components, configuration, writing standards),
> install the Mintlify skill: `npx skills add https://mintlify.com/docs`

# Documentation project instructions

## About this project

- This is a documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Use the Mintlify MCP server, `https://mcp.mintlify.com`, to edit content and settings via MCP
- Use the Mintlify docs MCP server, `https://www.mintlify.com/docs/mcp`, to query information about using Mintlify via MCP

## Terminology

- The cost/usage product is **TokenOps**. The API route path is `finops` — refer to it as TokenOps
  in prose, and only mention `finops` when naming an actual endpoint.
- **Routing engine** = picks which *agent* answers. **LLM router** = picks which *model* runs.
  **Orchestrator** = the live ReAct loop over accessible agents. **MAF** = a pre-defined workflow.
  These are four different mechanisms; don't use them interchangeably.
- The dashboard screen is **TokenOps**, not "Usage".

## Style preferences

{/* Add any project-specific style rules below */}

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references

## Content boundaries

Docs are split into **customer-facing** (everything outside `internal/`, published) and
**internal-only** (`internal/`, excluded from the build by `.mintignore`).

The audience for the published site is broad: CXOs and non-developers reading dashboards, admins
managing access, developers building agents, and self-hosting operators running a control plane.
Write for all four — most tasks should have a dashboard path documented, not only a CLI one.

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
- Infrastructure topology (Postgres, Redis, S3/MinIO, Tempo, Loki) and backup guidance
- The `nasiko-ee` admin CLI, Helm charts, cluster provisioning
- Security posture stated behaviorally (what *is* enforced, not what isn't)

Rule of thumb: **a customer needs to know how it behaves and how to configure it. They don't need to
know what it's called in the source tree, or where it falls short.**

Never link from a published page into `internal/` — that produces a broken link on the live site.
