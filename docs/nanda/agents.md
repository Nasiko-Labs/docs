---
id: agents
title: Agents
---

# NANDA Agents

Discover and browse agents in the public NANDA registry.

---

## List All Agents

<div className="endpoint-header">
  <span className="badge badge--get">GET</span>
  <code>/api/v1/nanda/agents</code>
  <span>🌐 Public</span>
</div>

### Query Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `limit` | | Max results (default: 20) |
| `page` | | Page number |
| `agent_type` | | Filter: `skill`, `persona`, `communication`, `iot`, `all` |
| `status` | | Filter: `online`, `offline` |
| `category` | | Filter by category |

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
# All agents
curl "https://nasiko.dev/api/v1/nanda/agents?limit=20"

# Online skill agents only
curl "https://nasiko.dev/api/v1/nanda/agents?agent_type=skill&status=online"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/nanda/agents",
    params={"agent_type": "skill", "status": "online", "limit": 20},
)
agents = response.json()
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/nanda/agents?agent_type=skill&status=online"
);
const agents = await res.json();
```

</TabItem>
</Tabs>

---

## Get Agent by ID

<div className="endpoint-header">
  <span className="badge badge--get">GET</span>
  <code>/api/v1/nanda/agents/{`{agent_id}`}</code>
  <span>🌐 Public</span>
</div>

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/nanda/agents/nanda-agent-001"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get("https://nasiko.dev/api/v1/nanda/agents/nanda-agent-001")
agent = response.json()
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/nanda/agents/nanda-agent-001"
);
const agent = await res.json();
```

</TabItem>
</Tabs>

---

## Search Agents

<div className="endpoint-header">
  <span className="badge badge--get">GET</span>
  <code>/api/v1/nanda/agents/search</code>
  <span>🌐 Public</span>
</div>

| Query Param | Required | Description |
|-------------|----------|-------------|
| `query` | ✅ | Search string |
| `limit` | | Max results |

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/nanda/agents/search?query=weather&limit=5"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/nanda/agents/search",
    params={"query": "weather", "limit": 5},
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/nanda/agents/search?query=weather"
);
```

</TabItem>
</Tabs>

---

## Get Online Agents

<div className="endpoint-header">
  <span className="badge badge--get">GET</span>
  <code>/api/v1/nanda/agents/online</code>
  <span>🌐 Public</span>
</div>

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/nanda/agents/online?limit=50"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/nanda/agents/online",
    params={"limit": 50},
)
online_agents = response.json()
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/nanda/agents/online?limit=50"
);
```

</TabItem>
</Tabs>

---

## Get Agents by Category

<div className="endpoint-header">
  <span className="badge badge--get">GET</span>
  <code>/api/v1/nanda/agents/category/{`{category}`}</code>
  <span>🌐 Public</span>
</div>

| Path Param | Description |
|------------|-------------|
| `category` | `skill`, `persona`, `communication`, or `iot` |

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/nanda/agents/category/skill?limit=20"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/nanda/agents/category/skill",
    params={"limit": 20},
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/nanda/agents/category/skill?limit=20"
);
```

</TabItem>
</Tabs>

---

## Get Agent Facts

<div className="endpoint-header">
  <span className="badge badge--get">GET</span>
  <code>/api/v1/nanda/agents/{`{agent_id}`}/facts</code>
  <span>🌐 Public</span>
</div>

Returns detailed metadata and facts about a specific agent.

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/nanda/agents/nanda-agent-001/facts"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/nanda/agents/nanda-agent-001/facts"
)
facts = response.json()
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/nanda/agents/nanda-agent-001/facts"
);
const facts = await res.json();
```

</TabItem>
</Tabs>
