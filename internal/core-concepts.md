---
title: "Core concepts"
description: "The vocabulary you need before going deeper into Nasiko's architecture"
---

This page defines the terms used throughout the architecture docs. Read it once, then use it as a
reference — most of these concepts get their own dedicated page linked below.

## Control plane

The **control plane** is the single server that runs the whole platform: it deploys agent
containers, terminates all incoming HTTPS traffic, enforces authentication and rate limits, routes
user queries to an agent, proxies every agent-to-agent call, and exposes the APIs behind the web UI
and CLI. There's no separate gateway process in front of it — the control plane is the sole
ingress. See the [architecture overview](architecture-overview.md) for the full request-flow
diagram.

## Agent

An **agent** is a container that speaks the A2A protocol —
it accepts a task, does work (often by calling an LLM and tools), and returns a result. Agents are
the unit of deployment: each one is built as a standalone container image and deployed
independently. Agents never receive a public IP or DNS name; the only way to reach one is through
the control plane's proxy at `/api/agents/{id}/*`.

## Session

A **session** is one end-to-end query from a user, identified by the A2A `contextId`. Every hop
that happens while answering that query — the routing decision, the chosen agent's own LLM calls,
any agents it calls in turn — is recorded as spans on a single trace. A session is what you see as
one row in the observability dashboard's session list, and drilling into it shows every hop that
contributed to the answer. See [observability internals](observability-internals.md) for how sessions, traces,
and cost data connect.

## Flow

A **flow** is the call chain that results from a single query fanning out across multiple agents —
agent A calls agent B, which calls agent C, and so on. All hops in a flow share the same W3C
`traceparent`, which is how the control plane recognizes them as one flow rather than unrelated
calls. The control plane enforces cascade limits on every flow to stop runaway or looping
agent-to-agent calls:

| Limit | What it stops |
| --- | --- |
| Max call depth | Chains that nest too many agent-to-agent hops deep |
| Max fan-out | A single agent calling too many other agents at once |
| Token budget | A flow consuming more LLM tokens than allowed |
| Wall-clock timeout | A flow that runs too long end to end |
| Cycle detection | Agents calling each other in a loop |

These limits are enforced centrally at the proxy — the same chokepoint every agent-to-agent call
already passes through — so they apply consistently no matter which agents are involved.

## Routing engine, orchestrator, and orchestration

Nasiko uses three related but distinct terms here — worth keeping apart, because it's easy to
assume they're all the same mechanism:

- The **routing engine** is a selection mechanism: given a query and a fleet of candidate agents, a
  three-stage pipeline (shortlist → rerank → select) picks one. It does not run an agentic loop
  itself — it's a selection step, not an execution step. Today it's invoked specifically to
  auto-assign an agent to a MAF workflow step that doesn't name one explicitly. See
  [orchestrator internals](orchestrator-internals.md) for the pipeline itself.
- The **orchestrator** is what actually handles a live chat query that doesn't name a specific
  agent: a multi-turn ReAct loop that exposes every agent you can access as a callable tool and lets
  an LLM decide which one (or several) to call, across as many as ten turns. It doesn't use the
  routing engine's pipeline — no shortlist or rerank happens here.
- **Orchestration** (or **multi-agent flow**, MAF) refers to running a pre-defined, ordered workflow
  across multiple agents — planning steps, executing them in sequence, and synthesizing a final
  answer. This is a different mechanism from both of the above: it's not a live, LLM-directed loop,
  it's a workflow you define once and run repeatably. See [MAF internals](maf-internals.md).

In short: the routing engine answers "which one agent should get this MAF step?" The orchestrator
answers "which agent(s) should handle this chat message, live?" MAF answers "how do several agents
work through a workflow I defined ahead of time?"

## Access control

Nasiko separates two independent access-control questions, and both are enforced server-side:

- **User → agent.** Can this signed-in user call this agent at all? Access comes from ownership,
  team ownership, an agent being marked public, or an explicit grant to a user, team, or
  department. This is what gates the chat UI, agent management actions, and secrets access.
- **Agent → agent.** Once a call is already authorized for a user, can agent A call agent B during
  a flow? This is an allowlist, and it's **default-deny**: both the calling agent and the target
  need an explicit row before the call is permitted — there's no default-open state. This check
  runs before every inter-agent call and also pre-filters which agents the orchestrator can reach.

These two mechanisms are independent by design — a user having access to an agent doesn't
automatically let that agent call every other agent, and vice versa. See
[access control internals](acl-internals.md) for how to configure both.

## Build and deploy artifact model

Agents are packaged and distributed as **OCI images** — the same image format used by Docker and
container registries generally. Nasiko has two ways to get an agent's image onto the platform:

- **Push a pre-built image.** You build the image yourself and push it straight to Nasiko's
  embedded container registry, then request a deployment.
- **Upload source.** You upload a source archive and the control plane builds the image for you,
  through a background build worker that retries failed builds automatically.

Either way, the image is the deployment artifact: once it's in the registry, deploying it wires up
networking, injects secrets, and instruments it for observability with no changes to your agent's
code. See [agent-runtime internals](agent-runtime-internals.md) for the full build-to-deploy
walkthrough.

## Where to go next

- [Architecture overview](architecture-overview.md)
- [Orchestrator internals](orchestrator-internals.md)
- [ACL internals](acl-internals.md)

