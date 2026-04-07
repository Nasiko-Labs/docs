---
id: overview
title: Overview
---

# Observability

Nasiko's observability layer gives you full visibility into agent execution. It exposes:

- **Sessions** — top-level groupings of interactions
- **Traces** — complete execution paths within a session
- **Spans** — individual steps within a trace (LLM calls, tool invocations, etc.)
- **Agent Stats** — aggregate metrics per agent: cost, latency, trace counts

## Data Model

```
Session
└── Trace
    └── Span (root)
        ├── Span (child)
        └── Span (child)
```

Each trace and span includes cost, token usage, and latency metadata.
