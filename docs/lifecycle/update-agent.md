---
id: update-agent
title: Update Agent
---

# Update Agent

Deploys new code for an existing agent. Supports rolling and blue-green deployment strategies with flexible version bumping.

`PUT /api/v1/agents/{agent_id}/update` — 🔒 Requires Auth

**Content-Type:** `multipart/form-data`

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `agent_id` | Agent UUID |

## Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | binary | | New `.zip` (optional for GitHub-sourced agents) |
| `version` | string | | `auto`, `major`, `minor`, `patch`, or exact semver (default: `auto`) |
| `update_strategy` | string | | `rolling` or `blue-green` (default: `rolling`) |
| `cleanup_old` | boolean | | Remove old deployments (default: `true`) |

## Version Strategies

| Strategy | Behavior |
|----------|----------|
| `auto` | Increments patch version |
| `major` | 1.0.0 → 2.0.0 |
| `minor` | 1.0.0 → 1.1.0 |
| `patch` | 1.0.0 → 1.0.1 |
| `1.2.0` | Uses exact specified version |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X PUT https://nasiko.dev/api/v1/agents/agent-abc123/update \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "file=@my-agent-v2.zip" \
  -F "version=minor" \
  -F "update_strategy=rolling"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

with open("my-agent-v2.zip", "rb") as f:
    response = httpx.put(
        "https://nasiko.dev/api/v1/agents/agent-abc123/update",
        headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
        files={"file": ("my-agent-v2.zip", f, "application/zip")},
        data={"version": "minor", "update_strategy": "rolling"},
    )
result = response.json()
print(f"Updated to {result['data']['new_version']}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const formData = new FormData();
formData.append("file", zipFile);
formData.append("version", "minor");
formData.append("update_strategy", "rolling");

const res = await fetch(
  "https://nasiko.dev/api/v1/agents/agent-abc123/update",
  {
    method: "PUT",
    headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
    body: formData,
  }
);
const { data } = await res.json();
console.log(`Updated to ${data.new_version}`);
```

</TabItem>
</Tabs>

## Response

```json
{
  "data": {
    "message": "Agent update initiated",
    "agent_id": "agent-abc123",
    "new_version": "1.1.0",
    "previous_version": "1.0.0",
    "build_id": "build-def456",
    "deployment_id": "deploy-ghi789",
    "update_strategy": "rolling",
    "status": "building",
    "status_code": 200
  },
  "status_code": 200,
  "message": "Update initiated"
}
```
