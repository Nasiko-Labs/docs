---
id: get-history
title: Get Chat History
---

# Get Chat History

Returns messages for a session with cursor-based pagination.

`GET /api/v1/chat/session/{session_id}` — 🔒 Requires Auth

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `session_id` | Session UUID |

## Query Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `limit` | | 20 | Messages per page |
| `cursor` | | | Pagination cursor from previous response |
| `direction` | | `asc` | `asc` or `desc` |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/chat/session/sess-abc123?limit=50&direction=asc" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/chat/session/sess-abc123",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    params={"limit": 50, "direction": "asc"},
)
result = response.json()["data"]
messages = result["messages"]
next_cursor = result.get("next_cursor")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/chat/session/sess-abc123?limit=50",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const { data } = await res.json();
const { messages, next_cursor } = data;
```

</TabItem>
</Tabs>
