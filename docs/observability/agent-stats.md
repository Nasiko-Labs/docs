---
id: agent-stats
title: Agent Stats
---

# Agent Project Stats

Returns aggregate statistics for an agent: trace counts, total cost, latency percentiles, and annotation names.

`GET /api/v1/observability/agent/{agent_id}/stats` — 🔒 Requires Auth

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `agent_id` | Agent UUID |

## Query Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `start_time` | ✅ | Start time filter (ISO datetime, e.g., `2026-01-05T17:30:00.000Z`) |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/observability/agent/agent-abc123/stats?start_time=2026-03-01T00:00:00.000Z" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/observability/agent/agent-abc123/stats",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    params={"start_time": "2026-03-01T00:00:00.000Z"},
)
stats = response.json()
print(f"Traces: {stats['trace_count']}")
print(f"Total cost: ${stats['cost_summary']['total_cost']:.4f}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/observability/agent/agent-abc123/stats?start_time=2026-03-01T00:00:00.000Z",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const stats = await res.json();
console.log(`Traces: ${stats.trace_count}`);
```

</TabItem>
</Tabs>
