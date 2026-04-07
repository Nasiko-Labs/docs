---
id: list-upload-agents
title: List Uploaded Agents
---

# List Uploaded Agents

Returns agents the authenticated user has directly uploaded (as opposed to agents accessible from the registry).

`GET /api/v1/user/upload-agents` — 🔒 Requires Auth

## Query Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `limit` | | 20 | Maximum number of agents to return |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/user/upload-agents?limit=50" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/user/upload-agents",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    params={"limit": 50},
)
agents = response.json()["data"]
for agent in agents:
    print(f"{agent['agent_name']} — {agent['status']}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/user/upload-agents?limit=50",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const { data } = await res.json();
```

</TabItem>
</Tabs>
