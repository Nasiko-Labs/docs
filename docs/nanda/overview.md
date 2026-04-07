---
id: overview
title: Overview
---

# NANDA Registry

The NANDA Registry is a public directory of A2A-compatible agents. All NANDA endpoints are **unauthenticated** — they expose the public agent ecosystem.

## What is NANDA?

NANDA (Networked Agent Directory and Namespace Architecture) is an open registry for discovering AI agents that communicate via the A2A protocol.

## Agent Types

| Type | Description |
|------|-------------|
| `skill` | Task-specific capability agents |
| `persona` | Character or role-based agents |
| `communication` | Messaging and notification agents |
| `iot` | IoT device interface agents |

## Health Check

```
GET /api/v1/nanda/health
```

Returns `200` if the NANDA API is reachable.
