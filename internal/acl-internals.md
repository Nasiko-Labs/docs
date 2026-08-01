# Access control internals

**Internal only.** Extracted from `platform/acl.mdx`. The customer-facing page keeps the
two-layer model, the default-deny warning, the role hierarchy and capability thresholds,
superuser independence, and org-scoped visibility — all stated behaviorally.

## Storage

| Table | Holds |
| --- | --- |
| `agent_grants` | One row per explicit grant; targets a user, a team, or a department |
| `agent_acl` | One row per `(caller_agent_id, target_agent_id)` pair that is explicitly permitted |

The agent's own row carries `is_public` and a soft-delete marker.

## User → agent resolution

Every route touching a specific agent resolves access through **one shared function**
rather than per-route checks. It honors, in order: ownership, team ownership, the
`is_public` flag, and an explicit `agent_grants` row. A soft-deleted agent is denied to
everyone unconditionally, ahead of all four.

Because it's a single function, adding a new agent-scoped route inherits the full check
automatically — the failure mode to watch for is a route that resolves the agent itself
and forgets to call it.

Mutating operations (update, delete, secrets, ACL changes) use a **stricter** variant:
only ownership or superuser passes. Neither `is_public` nor an invoke-level grant confers
management rights. The reason this distinction is load-bearing: view-level access is far
more commonly granted than manage-level, so conflating them would let `is_public` silently
double as a management grant.

## Agent → agent enforcement

The `agent_acl` lookup runs immediately before the platform invokes a target agent, as one
of two things a single call guard verifies per hop — the ACL pair and the flow guard's
cascade limits, in the same pass. Either rejection aborts before the target's container is
reached.

The management API's ACL-listing response returns `unrestricted: false` **always**, by
construction — there is no code path that returns `true`. This is what makes "default-deny,
unconditionally" a structural property rather than a configuration default.

> **Scope note.** This enforcement covers hops the platform's own orchestrator makes.
> MAF step-to-agent calls do **not** pass through it — see
> [maf-internals.md](maf-internals.md). The public docs no longer advertise this bypass.

Management routes: `GET`/`POST /api/agents/{id}/acl` and
`DELETE /api/agents/{id}/acl/{target_id}`, all gated by the manage-level check above.

## Role ranking

Roles rank strictly: `admin` > `department_manager` > `team_lead` > `team_member` >
`member`. An **unrecognized role value ranks below all five** — it is treated as having no
elevated capability rather than defaulting to trusted. Worth knowing when adding a tier or
migrating role strings: a typo fails safe, but silently.

Role and the superuser flag are independent booleans checked separately everywhere they
matter.

## Org-scoped visibility

A non-superuser's visible *user* set is bounded by their position in the org hierarchy: a
management role sees people within their own scope (their team, or their department and
everything under it); a baseline user sees themselves plus whatever their role otherwise
entitles them to. Superusers bypass the scoping entirely.

This is what keeps user-listing and user-search endpoints from leaking the full roster of
every organization on a shared platform to every signed-in account — the relevant property
for a multi-tenant deployment.
