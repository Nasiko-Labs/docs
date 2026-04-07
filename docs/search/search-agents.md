---
id: search-agents
title: Search Agents
---

# Search Agents

Full-text search across agents. Supports prefix matching, fuzzy search, and tag-based filtering.

<div className="endpoint-header">
  <span className="badge badge--get">GET</span>
  <code>/api/v1/search/agents</code>
  <span>🔒 Requires Auth</span>
</div>

## Query Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `q` | ✅ | | Search query (minimum 2 characters) |
| `limit` | | 10 | Maximum results |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/search/agents?q=weather&limit=5" \
  -H "Authorization: Bearer <token>"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/search/agents",
    headers={"Authorization": "Bearer <token>"},
    params={"q": "weather", "limit": 5},
)
results = response.json()
for agent in results["data"]:
    print(f"{agent['agent_name']}: {agent['description']}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/search/agents?q=weather&limit=5",
  { headers: { Authorization: "Bearer <token>" } }
);
const { data, total_matches } = await res.json();
```

</TabItem>
</Tabs>

## Response

```json
{
  "data": [
    {
      "agent_id": "agent-abc123",
      "agent_name": "weather-agent",
      "description": "Fetches current weather for any city",
      "tags": ["weather", "data"],
      "score": 0.97
    }
  ],
  "query": "weather",
  "total_matches": 1,
  "showing": 1,
  "status_code": 200,
  "message": "Search completed"
}
```
