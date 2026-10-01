# Nasiko documentation

Customer-facing docs for Nasiko, the OpenRuntime for agents, coding harnesses, frameworks and tools. Built with [Mintlify](https://mintlify.com).

**Headline:** Nasiko — The OpenRuntime for agents, coding harnesses, frameworks and tools.

**Byline:** Use any harness. Reach any model. Measure every token. Change nothing.

Authoring rules, vocabulary, and accuracy constraints: [AGENTS.md](AGENTS.md).

## Preview

```bash
npm i -g mint
mint dev
```

Open http://localhost:3000. `docs.json` is the nav, theme, and redirects.

Local search and the assistant stay off until you authenticate the CLI with a Mintlify account:

```bash
mint login
mint status
mint dev
```

That login is only for your laptop (`~/.config/mintlify/`). It is not required in the PR and does not turn on search on the published site.

## After merge (Mintlify deploy)

Search and the live site come from a **successful Mintlify deploy** of this repo, not from anything in the PR.

1. In the [Mintlify dashboard](https://dashboard.mintlify.com), confirm this GitHub repo is the connected source and that the **Mintlify GitHub App** is installed on the org that owns it.
2. Confirm the dashboard **production branch** is the branch this PR merges into (usually `main`).
3. After merge, wait until the dashboard Overview shows a **successful** deploy of that commit. A green GitHub check is not enough if Mintlify failed to build.
4. Open the live docs URL and search for a new page title (for example "TokenOps" or "Route models"). Indexing usually finishes with the deploy. If results are empty or stale, wait a few minutes or click **Deploy** again on the Overview page.
5. Spot-check a few old URLs from the `redirects` list in `docs.json` so bookmarks still land.

If the Mintlify build fails with `ENAMETOOLONG` on an OpenAPI page, an operation `summary` in `api-reference/openapi.json` is too long for a filename. Keep summaries to one short line; put the rest in `description`. Refresh the snapshot from a running server's `/api/openapi.json` when routes change.

Preview deployments on the PR (if the GitHub App is installed) are optional. They do not replace the production deploy or its search index.

## Sources of truth

Do not copy commands or routes from other pages. Check:

- CLI: `nasiko/cli/src/commands/` and `nasiko <command> --help`
- HTTP: `nasiko/server/src/lib.rs` and `/api/openapi.json` on a running server
- Refresh `api-reference/openapi.json` from that URL when routes change

## Layout

| Area | Role |
| --- | --- |
| Get started | Introduction, coding-agent quickstart, deploy quickstart, install |
| Coding agents | Discovery, reporting, routing, per-harness |
| TokenOps / Model routing / Governance / Build | The three pillars plus deploy lifecycle |
| Dashboard / Self-hosting | UI and operators |
| Reference | CLI, OpenAPI, config files, changelog |
| `internal/` | Not published (`.mintignore`) |

When you move a page, add a redirect in `docs.json`.
