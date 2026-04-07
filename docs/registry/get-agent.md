---
id: get-agent
title: Get Agent Details
---

# Get Agent Details

Two endpoints retrieve a registry entry: by name (public) or by ID (authenticated).

---

## By Name

`GET /api/v1/registry/agent/name/{agent_name}` — 🌐 Public

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `agent_name` | The agent's slug name |

### Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/registry/agent/name/weather-agent
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/registry/agent/name/weather-agent"
)
agent = response.json()["data"]
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/registry/agent/name/weather-agent"
);
const { data } = await res.json();
```

</TabItem>
</Tabs>

---

## By ID

`GET /api/v1/registry/agent/id/{agent_id}` — 🔒 Requires Auth

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `agent_id` | The agent's UUID |

### Examples

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/registry/agent/id/agent-abc123 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/registry/agent/id/agent-abc123",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
agent = response.json()["data"]
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/registry/agent/id/agent-abc123",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const { data } = await res.json();
```

</TabItem>
</Tabs>
