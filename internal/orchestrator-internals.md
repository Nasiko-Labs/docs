# Orchestrator internals

**Internal only.** Extracted from `platform/orchestrator.mdx`. The customer-facing page
keeps the behavioral contract (three stages, fail-forward degradation, where the pipeline
runs) and the flow-guard limits and env vars. Everything below is source-level.

## The `RoutingEngine` trait

Agent selection is implemented behind one trait with a single method:

```rust
#[async_trait]
pub trait RoutingEngine: Send + Sync {
    async fn route(&self, req: RouteRequest, pool: &PgPool) -> Result<RouteResult, RouterError>;
}
```

A `RouteRequest` carries the query text, the caller's user and session id, and any file
parts. A successful `route()` returns `RouteResult { agent, fallback_used }`.

**Extension seam.** This is where the platform layers organization-scoped routing — an
RBAC-aware candidate pre-filter in front of the same three stages — without touching the
pipeline itself. Not customer-facing: it describes where we intend to extend, not what
the product does today.

On Stage 3 fallback the reasoning string is literally `"fallback: {error}"`.

## Routing decision logging

Every `route()` call fires a `tokio::spawn` at the very end to write a `RouterLogEntry`
into `router_request_log`. The response has already been sent to the caller by the time
this write happens — this is why logging can never add latency to a routed request.

The log entry captures more than the final pick:

- agents considered, and the selection reasoning text
- `fallback_used`
- per-stage candidate counts: `stage1_candidates`, `stage2_candidates`
- per-stage latencies: `registry_fetch_ms`, `selection_llm_ms`, `total_latency_ms`
- the embedding model used
- a foreign key into `token_usage` for the Stage 3 selector call's own token cost,
  tracked under `operation_type = 'router_selection'`

That last row is what makes the routing decision show up as its own line item in
TokenOps rather than being folded into the chosen agent's spend. The *fact* that routing
is metered separately is a customer-visible benefit and stays on the public page; the
table wiring does not.

### `agent_selection_stats` and the staleness window

An hourly background job refreshes the `agent_selection_stats` materialized view from
`router_request_log`. This view backs `GET /api/orchestrator/stats`.

> **Known gap.** Because it's a materialized view refreshed on an interval rather than a
> live query, the stats endpoint can lag the underlying log table by **up to an hour**.
> Query `router_request_log` directly, or read a specific session's trace, when you need
> up-to-the-second numbers. Not stated publicly — the public page simply points people at
> session traces for live data.

## Flow guard state layout

The guard's five cascade limits are backed by a single Redis hash per flow, keyed by the
W3C `traceparent`'s trace id:

```
flow:<trace_id>
```

Fields held in that hash: current depth, the call chain (a comma-joined list of agent
ids), total invocation count, total tokens used, and the flow's start time. The key is
initialized when the flow starts and expires on `NASIKO_FLOW_STATE_TTL_SECS` (default
`300`s) so an abandoned flow doesn't leak state.

Ordering and atomicity:

1. `before_call` runs *before* an agent is invoked — reject early rather than pay for a
   call that will be rejected anyway.
2. Depth and fan-out counters are incremented atomically as part of recording the
   invocation.
3. A second check runs immediately after the increment, in case a concurrent hop pushed a
   counter over the limit between the pre-check and the increment.

Rejection variants: `MaxDepthExceeded`, `CycleDetected`, `MaxFanOutExceeded`,
`TokenBudgetExhausted`, `FlowTimeout`, and `GuardUnavailable`.

The **fail-closed on Redis unavailability** behavior and its rationale stay on the public
page — a self-hosting operator needs to know an outage rejects agent-to-agent calls
rather than silently disabling limits.

## `FlowEventBus`

Broadcasts flow-status updates in-process for the UI's live flow view (`/api/flows/*`),
independent of the Redis-backed guard state. Single-process only; not a durable channel.
