---
title: observe
sidebar_position: 9
---

# nasiko observe

Read observability sessions, traces, spans, and summary statistics for deployed agents.

:::tip
`nasiko observability` is a hidden alias for this group and works identically.
:::

## `nasiko observe sessions`

List observability sessions, optionally filtered by agent.

```
Usage: nasiko observe sessions [OPTIONS] [AGENT_ID]

Arguments:
  AGENT_ID    Filter to a specific agent (optional)

Options:
  -d, --days INTEGER       Lookback window in days [default: 7]
  -l, --limit INTEGER      Max sessions to return [default: 20]
  -f, --format TEXT        Output format: table, json, summary [default: table]
```

**Example:**

```bash
nasiko observe sessions --days 7 --format table
nasiko observe sessions abc-123 --days 30 --format json
```

---

## `nasiko observe session`

Get detailed information about a single observability session.

```
Usage: nasiko observe session [OPTIONS] SESSION_ID

Arguments:
  SESSION_ID    Session ID [required]

Options:
  -f, --format TEXT    Output format: detailed, json, traces [default: detailed]
```

---

## `nasiko observe trace`

Inspect a specific trace within a project.

```
Usage: nasiko observe trace [OPTIONS] PROJECT_ID TRACE_ID

Arguments:
  PROJECT_ID    Project ID [required]
  TRACE_ID      Trace ID [required]

Options:
  -f, --format TEXT    Output format: tree, json, spans [default: tree]
```

---

## `nasiko observe span`

Get details for a single span.

```
Usage: nasiko observe span [OPTIONS] SPAN_ID

Arguments:
  SPAN_ID    Span ID [required]

Options:
  -f, --format TEXT    Output format: detailed, json [default: detailed]
```

---

## `nasiko observe stats`

Get summary statistics for an agent.

```
Usage: nasiko observe stats [OPTIONS] AGENT_ID

Arguments:
  AGENT_ID    Agent ID [required]

Options:
  -d, --days INTEGER    Lookback window in days [default: 7]
  -f, --format TEXT     Output format: summary, json [default: summary]
```

**Example:**

```bash
nasiko observe stats my-agent-id --days 30 --format json
```
