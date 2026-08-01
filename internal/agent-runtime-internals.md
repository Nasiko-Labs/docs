# Agent runtime internals

**Internal only.** Extracted from `platform/agent-registry.mdx`. The customer-facing page
keeps the two runtimes and what each supports, the operations available (deploy, scale,
restart, status, logs, endpoint resolution), the `AGENT_RUNTIME` selector, both image
on-ramps, and the fact that server-side builds are queued with a capped retry count.

## The `ContainerRuntime` trait

Every deployment operation goes through one trait, regardless of active runtime:

| Method | Behavior |
| --- | --- |
| `deploy` | Create or update from a spec. No-op if the image is unchanged; atomic replace if changed. Returns the observed status immediately — on Kubernetes the pod may still be `Pending`, so a caller needing `Running` polls `status` separately. |
| `destroy` | Remove all resources for a container id. Idempotent. |
| `scale` | Set replica count. `0` stops the agent; **Docker clamps anything above `1` down to `1` with a warning**, since Docker has no native multi-replica concept. |
| `restart` | Docker stops and recreates from the same image; Kubernetes triggers a rollout restart. Either way this is how a running agent picks up rotated secrets. |
| `status` / `list` | Observed state. A missing resource reports `Unknown` rather than erroring, so callers poll without special-casing "not found yet." |
| `endpoint` | `localhost:port` under Docker, a Service DNS name under Kubernetes. |
| `logs` | Container stdout/stderr, with a tail option. |
| `build` | Builds an image from a source tarball (used by the build worker). |
| `refresh_secrets` | Re-injects decrypted secrets; run before a scale-up so new replicas never start with stale credentials. |
| `try_delete_autoscaler` | Removes the runtime's autoscaling resource (a KEDA `ScaledObject` under Kubernetes) if one exists, best-effort. |

The Docker replica clamp is worth surfacing to anyone debugging "I scaled to 3 and got 1" —
the public page states the single-replica limitation without framing it as a trait
behavior.

Both implementations are wrapped in `InstrumentedRuntime` before anything else touches
them — see [observability-internals.md](observability-internals.md).

## The build worker

Server-side builds are queued as rows in a **`build_jobs`** table and picked up by a
background worker spawned once at server startup. The worker polls every five seconds, or
wakes immediately on an in-process notification when a job is queued. Every job targets
exactly one of an agent build or an MCP connector build, never both.

### Claim and execute are deliberately split

- **Claiming** a job — marking it `in_progress`, incrementing its attempt counter — happens
  inline in the worker's own loop. Pure database I/O, essentially no panic risk.
- **Executing** the build — extracting source, invoking `ContainerRuntime::build`,
  deploying, waiting for readiness — happens in a **separately spawned task**.

A panic during the build therefore can't take the worker loop down with it. The outer loop
catches the panicked task's join result and resets that one job; every other queued job is
unaffected.

### Retry cap

Capped at three attempts (`MAX_ATTEMPTS`). A job exceeding it is marked `failed`
immediately rather than retried — **including when the claim itself would push the counter
past the limit**, so an already-exhausted job never gets a wasted extra try.

### The stuck-job sweep

Every ten minutes (plus once at startup), the worker looks for jobs still marked
`in_progress` after **an hour** — long enough that a legitimately slow build won't trigger
it, short enough to catch a job orphaned by a crashed replica with no restart to reset it.
Jobs that have already exhausted attempts are marked permanently `failed` so anything
waiting on a status poll or stream stops waiting rather than hanging forever; everything
else resets to `pending`.

> A panicked build task is reset **immediately**, not left for the sweep. The sweep exists
> for the case a panic-catch cannot cover: an entire replica dying mid-build with no chance
> to run its own recovery logic. Both mechanisms are needed; neither subsumes the other.

## Registry storage

The embedded OCI registry at `/v2/*` is S3-backed with blob dedup across layers.
In-progress chunked blob uploads are buffered **in memory on the receiving instance**,
making a single image push sticky to that instance until it completes. This one is stated
publicly in `architecture/overview.mdx` as a scaling caveat, which is the right call for a
self-hosting operator sizing a multi-replica deployment.
