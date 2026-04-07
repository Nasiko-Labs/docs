---
id: upload-zip
title: Upload Agent (Zip)
---

# Upload Agent from Zip

Uploads a `.zip` file containing agent code. Nasiko validates the package, extracts capabilities, and triggers the build pipeline.

`POST /api/v1/agents/upload` — 🔒 Requires Auth

**Content-Type:** `multipart/form-data`

## Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | binary | ✅ | The `.zip` archive |
| `agent_name` | string | | Override the agent name |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://nasiko.dev/api/v1/agents/upload \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "file=@my-agent.zip"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

with open("my-agent.zip", "rb") as f:
    response = httpx.post(
        "https://nasiko.dev/api/v1/agents/upload",
        headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
        files={"file": ("my-agent.zip", f, "application/zip")},
    )
result = response.json()
print(result["data"]["agent_name"])
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const formData = new FormData();
formData.append("file", zipFile); // zipFile is a File or Blob

const res = await fetch("https://nasiko.dev/api/v1/agents/upload", {
  method: "POST",
  headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
  body: formData,
});
const { data } = await res.json();
console.log(data.agent_name, data.version);
```

</TabItem>
</Tabs>

## Response

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
  "status_code": 200,
  "message": "Agent upload initiated"
}
```

## Package Requirements

Your `.zip` must contain a valid agent package at the root level. Nasiko inspects the package to auto-generate capabilities.
