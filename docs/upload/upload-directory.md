---
id: upload-directory
title: Upload Agent (Directory)
---

# Upload Agent from Directory

Uploads an agent from a local filesystem path. Useful for server-side automation.

`POST /api/v1/agents/upload-directory` — 🔒 Requires Auth

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `directory_path` | string | ✅ | Absolute path to the agent directory |
| `agent_name` | string | | Override the agent name |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://nasiko.dev/api/v1/agents/upload-directory \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "directory_path": "/home/user/agents/my-agent",
    "agent_name": "my-agent"
  }'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    "https://nasiko.dev/api/v1/agents/upload-directory",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    json={
        "directory_path": "/home/user/agents/my-agent",
        "agent_name": "my-agent",
    },
)
result = response.json()
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/agents/upload-directory",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      directory_path: "/home/user/agents/my-agent",
      agent_name: "my-agent",
    }),
  }
);
const result = await res.json();
```

</TabItem>
</Tabs>
