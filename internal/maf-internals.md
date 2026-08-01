# MAF internals

**Internal only.** Extracted from `platform/maf.mdx`. The customer-facing page keeps the
define/generate/run model, what a step carries, the reliability guarantees stated
behaviorally (queued off the request path, retried, resumed after restart), the worked
example, and the full route surface.

**This page holds the most sensitive material in `internal/`.** Two of the gaps below are
security-relevant.

## Execution pipeline

"Planner" means two different things depending on when it runs:

- **Draft-time planning** (`POST /api/maf/generate`) — one LLM call turns a
  natural-language description plus the user's registered agents into a full draft. Optional;
  only shapes what gets saved as the workflow definition.
- **Run-time planning** — *every* execution re-plans at the start of the run, regardless of
  whether the workflow was hand-written or generated. A fresh LLM call turns each step's
  stored task description into a concrete prompt template and an extraction goal, generated
  new on every run rather than reused from creation time.

The **executor** then walks steps in order. Per step: build a context block from every
prior step's extracted result → ask an LLM to fill the current step's prompt template from
that context (**skipped entirely, no LLM call, if the template has no placeholders left**)
→ call the step's agent → ask an LLM to extract what the next step needs from the raw reply
→ persist status, prompt, extracted result, and token/latency numbers. A final LLM call
synthesizes every step's output.

**Cost consequence:** a single execution can involve as many as four distinct kinds of LLM
call (plan, per-step prompt-fill, per-step extract, final synthesis) *on top of* the agent
calls themselves. Worth knowing when a customer asks why a 3-step workflow burned more
tokens than 3 chat messages. The public page does not enumerate this.

## The worker: Redis Streams, not a database poll

Unlike the build worker (which polls Postgres — see
[agent-runtime-internals.md](agent-runtime-internals.md)), the MAF worker is a Redis Streams
consumer:

| | |
| --- | --- |
| Stream | `nasiko:maf:execute` |
| Consumer group | `maf-workers` |
| Consumer name | hostname + OS process id |

The unique per-process consumer name is what lets multiple replicas pull from the same
stream without double-processing a message.

**Crash recovery.** A message a consumer read but never acknowledged — because that process
died mid-execution — stays in the group's pending entries list. Every worker runs
`XAUTOCLAIM` once at startup and again periodically, reclaiming any message pending for
more than **ten minutes** and reprocessing it. An execution in flight when a replica was
killed gets picked up automatically.

Retries are capped by `MAF_MAX_ATTEMPTS` (default `3`), tracked per execution row. A failed
run with attempts remaining resets to `pending` and re-enqueues; one that has exhausted them
is marked terminally `failed`.

> **Durability note.** A queued-but-unclaimed execution has no second copy anywhere. This is
> the one genuinely non-disposable thing in Redis, and it *is* stated publicly in
> `platform/backup-and-restore.mdx` — a self-hosting operator must size Redis durability for
> it.

---

## Known gap 1 — MAF bypasses the flow guard and agent-to-agent ACL

**Not published.** A MAF step calling its agent is a **direct call from the executor to that
agent's resolved endpoint**. It does not traverse the call path that routed chat and the
ReAct orchestrator use. Consequently:

- **No flow guard.** Max depth, max fan-out, token budget, wall-clock timeout, and cycle
  detection do not apply. The design rationale: those limits bound an open-ended,
  LLM-directed call chain that could recurse or fan out unpredictably, whereas a MAF
  workflow is a fixed, pre-defined linear sequence someone wrote or reviewed.
- **No `agent_acl` check.** There is no allowlist lookup on a step-to-agent call. A step can
  call any agent it has been assigned, regardless of whether an `agent_acl` row would permit
  that pairing.

The only access control actually acting on which agents a MAF execution reaches is the
**workflow-authoring boundary** — who can create a workflow and which agent ids they name in
it.

The customer-facing page now states that authoring boundary positively ("who can author a
workflow, and which agents they name in it, is what governs which agents a workflow
reaches") without enumerating what a step skips. That statement is accurate and actionable;
the enumeration is a map of the hole.

## Known gap 2 — explicit agent ids are not re-checked against the creator's access

**Not published.** A step created **with** an explicit `agent_id` is validated only for
existence and non-soft-deletion. It is **not** re-checked against whether the creating user
actually has access to that agent.

A step created **without** an agent is auto-assigned via the three-stage routing engine,
correctly scoped to the agents the creating user can access — with a keyword-match fallback
against that user's own registered agents if the engine errors.

So the safe path validates and the explicit path does not. This matters most for workflows
built programmatically from agent ids not derived from the creating user's own
accessible-agent list.

**Combined effect of gaps 1 and 2:** a user who can create a workflow can name any existing
agent id and have it invoked, with no ACL check at creation and no ACL or flow-guard check
at execution. Treat workflow-creation permission as equivalent to broad agent-invocation
permission until this is closed.

---

## What a MAF execution *does* still get

- Per-step `traceparent` derived deterministically from execution id + step index (UUIDv5),
  so each step lands as its own distinct trace in Tempo even though the execution shares one
  MAF execution id. Useful when the same agent appears in more than one step and you need to
  tell their token usage apart.
- Per-step token tracking, combining run-time LLM calls with the called agent's own reported
  usage. The executor **polls Tempo briefly** for the agent's span before finalizing a step's
  total, since an agent's usage data is rarely available the instant its call returns.
