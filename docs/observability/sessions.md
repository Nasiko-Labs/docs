---
id: sessions
title: Sessions
---

# Observability Sessions

---

## List All Sessions

`GET /api/v1/observability/session/list` — 🔒 Requires Auth

Returns sessions across all agents the user has access to.

### Query Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `start_time` | | ISO datetime filter (e.g., `2026-01-01T00:00:00.000Z`) |

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/observability/session/list?start_time=2026-03-01T00:00:00.000Z" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/observability/session/list",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    params={"start_time": "2026-03-01T00:00:00.000Z"},
)
sessions = response.json()
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/observability/session/list?start_time=2026-03-01T00:00:00.000Z",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const sessions = await res.json();
```

</TabItem>
</Tabs>

---

## Get Session Details

`GET /api/v1/observability/session/{session_id}` — 🔒 Requires Auth

Returns detailed session data including traces, cost summary, and token usage.

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `session_id` | Session ID (e.g., `ca364f5ebe8845a3a9a7f2cf68948c2f`) |

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/observability/session/ca364f5ebe8845a3a9a7f2cf68948c2f \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/observability/session/ca364f5ebe8845a3a9a7f2cf68948c2f",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
session = response.json()
print(f"Cost: ${session['cost_summary']['total_cost']:.4f}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/observability/session/ca364f5ebe8845a3a9a7f2cf68948c2f",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const session = await res.json();
```

</TabItem>
</Tabs>
