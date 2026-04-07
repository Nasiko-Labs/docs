---
id: delete-agent
title: Delete Agent
---

# Delete Agent

Deletes an agent and all associated resources: Kubernetes deployments, permissions, registry entries, and database records. This action is irreversible.

`DELETE /api/v1/registry/agent/{agent_id}` — 🔒 Requires Auth

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `agent_id` | The agent's UUID |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X DELETE https://nasiko.dev/api/v1/registry/agent/agent-abc123 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.delete(
    "https://nasiko.dev/api/v1/registry/agent/agent-abc123",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/registry/agent/agent-abc123",
  {
    method: "DELETE",
    headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
  }
);
```

</TabItem>
</Tabs>

## Response

**Status:** `200 OK`

```json
{
  "message": "Agent deleted successfully",
  "status_code": 200
}
```

:::danger
Deletion removes all Kubernetes deployments, build records, and registry data. There is no undo.
:::
