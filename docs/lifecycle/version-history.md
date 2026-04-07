---
id: version-history
title: Version History
---

# Version History

Returns the full version history for an agent, including build IDs, deployment IDs, and rollback metadata.

`GET /api/v1/agents/{agent_id}/versions` — 🔒 Requires Auth

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `agent_id` | Agent UUID |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/agents/agent-abc123/versions \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/agents/agent-abc123/versions",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
history = response.json()
print(f"Current: {history['current_version']}")
for v in history["versions"]:
    print(f"  {v['version']} — {v['status']} ({v['created_at']})")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/agents/agent-abc123/versions",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const history = await res.json();
```

</TabItem>
</Tabs>

## Response

```json
{
  "agent_id": "agent-abc123",
  "current_version": "1.1.0",
  "versions": [
    {
      "version": "1.1.0",
      "status": "active",
      "created_at": "2026-03-06T12:00:00Z",
      "build_ids": ["build-def456"],
      "deployment_ids": ["deploy-ghi789"],
      "git_commit": "abc123def456"
    },
    {
      "version": "1.0.0",
      "status": "inactive",
      "created_at": "2026-03-01T10:00:00Z",
      "build_ids": ["build-abc123"],
      "deployment_ids": ["deploy-def456"]
    }
  ],
  "status_code": 200,
  "message": "Version history retrieved"
}
```
