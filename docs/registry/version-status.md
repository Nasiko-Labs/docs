---
id: version-status
title: Update Version Status
---

# Update Version Status

Updates the status of a specific agent version (e.g., from `building` to `active`). Used by the build pipeline.

`PUT /api/v1/registry/agent/{agent_name}/version/status` — 🌐 Public

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `agent_name` | Agent slug name |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | ✅ | New status value (e.g., `active`, `building`, `failed`) |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X PUT https://nasiko.dev/api/v1/registry/agent/weather-agent/version/status \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.put(
    "https://nasiko.dev/api/v1/registry/agent/weather-agent/version/status",
    json={"status": "active"},
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/registry/agent/weather-agent/version/status",
  {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "active" }),
  }
);
```

</TabItem>
</Tabs>
