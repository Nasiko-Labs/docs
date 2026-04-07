---
id: list-sessions
title: List Sessions
---

# List Chat Sessions

Returns a paginated list of chat sessions for the authenticated user.

`GET /api/v1/chat/session/list` — 🔒 Requires Auth

## Query Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `limit` | | 20 | Sessions per page |
| `cursor` | | | Pagination cursor |
| `direction` | | `desc` | `asc` or `desc` |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/chat/session/list?limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/chat/session/list",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    params={"limit": 10},
)
sessions = response.json()["data"]["sessions"]
for s in sessions:
    print(f"{s['session_id']} — {s['created_at']}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/chat/session/list?limit=10",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const { data } = await res.json();
const { sessions, next_cursor } = data;
```

</TabItem>
</Tabs>
