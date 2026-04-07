---
id: clone-repo
title: Clone Repository as Agent
---

# Clone Repository as Agent

Clones a GitHub repository and registers it as an agent on the Nasiko platform.

`POST /api/v1/github/clone` — 🔒 Requires Auth

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `repository_full_name` | string | ✅ | `owner/repo` (e.g., `octocat/my-agent`) |
| `branch` | string | | Branch to clone (default: repo default branch) |
| `agent_name` | string | | Override the agent name |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://nasiko.dev/api/v1/github/clone \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "repository_full_name": "octocat/my-agent",
    "branch": "main",
    "agent_name": "my-agent"
  }'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    "https://nasiko.dev/api/v1/github/clone",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    json={
        "repository_full_name": "octocat/my-agent",
        "branch": "main",
        "agent_name": "my-agent",
    },
)
result = response.json()
print(result["data"]["agent_name"])
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch("https://nasiko.dev/api/v1/github/clone", {
  method: "POST",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    repository_full_name: "octocat/my-agent",
    branch: "main",
    agent_name: "my-agent",
  }),
});
const result = await res.json();
```

</TabItem>
</Tabs>

## Response

**Status:** `201 Created`

```json
{
  "data": {
    "success": true,
    "agent_name": "my-agent",
    "status": "uploading",
    "capabilities_generated": true,
    "orchestration_triggered": true,
    "version": "1.0.0"
  },
  "status_code": 201,
  "message": "Repository cloned and agent registered"
}
```
