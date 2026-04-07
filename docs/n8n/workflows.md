---
id: workflows
title: List Workflows
---

# List N8N Workflows

Returns workflows from your connected N8N instance.

`GET /api/v1/agents/n8n/workflows` — 🔒 Requires Auth

Requires [connected N8N credentials](/n8n/connect).

## Query Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `active_only` | | `false` | Return only active workflows |
| `limit` | | 20 | Maximum number of workflows |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
# All workflows
curl "https://nasiko.dev/api/v1/agents/n8n/workflows" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Active workflows only
curl "https://nasiko.dev/api/v1/agents/n8n/workflows?active_only=true&limit=50" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/agents/n8n/workflows",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    params={"active_only": "true", "limit": 50},
)
workflows = response.json()
for wf in workflows:
    print(f"{wf['id']} — {wf['name']}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/agents/n8n/workflows?active_only=true",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const workflows = await res.json();
```

</TabItem>
</Tabs>
