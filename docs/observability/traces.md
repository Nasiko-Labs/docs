---
id: traces
title: Traces
---

# Trace Details

Returns a trace with its full nested span structure, cost summary, and latency metrics.

`GET /api/v1/observability/trace/{project_id}/{trace_id}` — 🔒 Requires Auth

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `project_id` | Project ID (e.g., `UHJvamVjdDoy`) |
| `trace_id` | Trace ID (e.g., `e56c41d91c7174fe571f45b18f676d7f`) |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/observability/trace/UHJvamVjdDoy/e56c41d91c7174fe571f45b18f676d7f \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/observability/trace/UHJvamVjdDoy/e56c41d91c7174fe571f45b18f676d7f",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
trace = response.json()
print(f"Total latency: {trace['latency_ms']}ms")
print(f"Cost: ${trace['cost_summary']['total_cost']:.4f}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/observability/trace/UHJvamVjdDoy/e56c41d91c7174fe571f45b18f676d7f",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const trace = await res.json();
```

</TabItem>
</Tabs>

## Response Shape

```json
{
  "trace_id": "e56c41d91c7174fe571f45b18f676d7f",
  "spans_tree": { ... },
  "cost_summary": {
    "total_cost": 0.0023,
    "input_tokens": 1200,
    "output_tokens": 340
  },
  "latency_ms": 1847,
  "span_lookup": { ... }
}
```
