---
id: list-my-agents
title: List My Agents
---

# List My Agents

Two endpoints list agents for the authenticated user — a compact list and a full-detail list.

---

## Simple List

`GET /api/v1/registry/user/agents` — 🔒 Requires Auth

Returns a condensed list of agent names and IDs.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/registry/user/agents \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/registry/user/agents",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
agents = response.json()["data"]
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch("https://nasiko.dev/api/v1/registry/user/agents", {
  headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
});
const { data } = await res.json();
```

</TabItem>
</Tabs>

---

## Full Info List

`GET /api/v1/registry/user/agents/info` — 🔒 Requires Auth

Returns full agent cards including capabilities, skills, and metadata.

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/registry/user/agents/info \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/registry/user/agents/info",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
agents = response.json()["data"]
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/registry/user/agents/info",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const { data } = await res.json();
```

</TabItem>
</Tabs>
