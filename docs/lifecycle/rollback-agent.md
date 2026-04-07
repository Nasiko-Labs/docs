---
id: rollback-agent
title: Rollback Agent
---

# Rollback Agent

Rolls an agent back to a previous version. Optionally cleans up failed deployments.

`POST /api/v1/agents/{agent_id}/rollback` — 🔒 Requires Auth

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `agent_id` | Agent UUID |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `target_version` | string | | Version to roll back to. Omit for the previous version. |
| `cleanup_failed` | boolean | | Remove failed deployments (default: `true`) |
| `reason` | string | | Reason for rollback (logged) |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
# Roll back to previous version
curl -X POST https://nasiko.dev/api/v1/agents/agent-abc123/rollback \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"reason": "Performance regression in 1.1.0"}'

# Roll back to specific version
curl -X POST https://nasiko.dev/api/v1/agents/agent-abc123/rollback \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"target_version": "1.0.0", "reason": "Critical bug in 1.1.0"}'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    "https://nasiko.dev/api/v1/agents/agent-abc123/rollback",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    json={
        "target_version": "1.0.0",
        "reason": "Critical bug in 1.1.0",
        "cleanup_failed": True,
    },
)
result = response.json()["data"]
print(f"Rolled back from {result['rolled_back_from']} to {result['rolled_back_to']}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/agents/agent-abc123/rollback",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target_version: "1.0.0",
      reason: "Critical bug in 1.1.0",
    }),
  }
);
const { data } = await res.json();
```

</TabItem>
</Tabs>

## Response

```json
{
  "data": {
    "message": "Rollback successful",
    "agent_id": "agent-abc123",
    "rolled_back_to": "1.0.0",
    "rolled_back_from": "1.1.0",
    "status": "running",
    "status_code": 200
  }
}
```
