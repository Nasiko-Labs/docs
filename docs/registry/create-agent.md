---
id: create-agent
title: Register an Agent
---

# Register an Agent

Creates a new agent entry in the registry.

`POST /api/v1/registry` — 🌐 Public

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique agent identifier |
| `name` | string | ✅ | Display name |
| `description` | string | ✅ | What this agent does |
| `url` | string | ✅ | Service endpoint URL |
| `owner_id` | string | ✅ | Owner's user ID |
| `version` | string | | Semver version (default: `1.0.0`) |
| `protocolVersion` | string | | A2A protocol version (default: `0.2.9`) |
| `preferredTransport` | string | | Transport protocol (default: `JSONRPC`) |
| `tags` | string[] | | Searchable tags |
| `iconUrl` | string | | URL to agent icon |
| `documentationUrl` | string | | URL to agent docs |
| `skills` | Skill[] | | List of agent skills |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://nasiko.dev/api/v1/registry \
  -H "Content-Type: application/json" \
  -d '{
    "id": "agent-abc123",
    "name": "Weather Agent",
    "description": "Fetches current weather for any city",
    "url": "https://weather-agent.example.com",
    "owner_id": "user-xyz789",
    "version": "1.0.0",
    "tags": ["weather", "data"]
  }'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    "https://nasiko.dev/api/v1/registry",
    json={
        "id": "agent-abc123",
        "name": "Weather Agent",
        "description": "Fetches current weather for any city",
        "url": "https://weather-agent.example.com",
        "owner_id": "user-xyz789",
        "version": "1.0.0",
        "tags": ["weather", "data"],
    },
)
print(response.json())
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const response = await fetch("https://nasiko.dev/api/v1/registry", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: "agent-abc123",
    name: "Weather Agent",
    description: "Fetches current weather for any city",
    url: "https://weather-agent.example.com",
    owner_id: "user-xyz789",
    version: "1.0.0",
    tags: ["weather", "data"],
  }),
});
const data = await response.json();
```

</TabItem>
</Tabs>

## Response

**Status:** `201 Created`

```json
{
  "data": {
    "id": "agent-abc123",
    "name": "Weather Agent",
    "description": "Fetches current weather for any city",
    "url": "https://weather-agent.example.com",
    "version": "1.0.0",
    "owner_id": "user-xyz789",
    "tags": ["weather", "data"],
    "created_at": "2026-03-06T10:00:00Z"
  },
  "status_code": 201,
  "message": "Agent created successfully"
}
```
