---
id: upsert-agent
title: Create or Update Agent
---

# Create or Update Agent

Creates the agent if it doesn't exist; updates it if it does. Identified by name.

`PUT /api/v1/registry/agent/{agent_name}` — 🌐 Public

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `agent_name` | Agent slug name to create or update |

## Request Body

Same fields as [Register an Agent](/registry/create-agent). Required: `id`, `name`, `description`, `url`, `owner_id`.

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X PUT https://nasiko.dev/api/v1/registry/agent/weather-agent \
  -H "Content-Type: application/json" \
  -d '{
    "id": "agent-abc123",
    "name": "Weather Agent",
    "description": "Fetches current and forecast weather",
    "url": "https://weather-agent.example.com",
    "owner_id": "user-xyz789",
    "version": "1.1.0"
  }'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.put(
    "https://nasiko.dev/api/v1/registry/agent/weather-agent",
    json={
        "id": "agent-abc123",
        "name": "Weather Agent",
        "description": "Fetches current and forecast weather",
        "url": "https://weather-agent.example.com",
        "owner_id": "user-xyz789",
        "version": "1.1.0",
    },
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/registry/agent/weather-agent",
  {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: "agent-abc123",
      name: "Weather Agent",
      description: "Fetches current and forecast weather",
      url: "https://weather-agent.example.com",
      owner_id: "user-xyz789",
      version: "1.1.0",
    }),
  }
);
```

</TabItem>
</Tabs>

## Response

**Status:** `200 OK`
