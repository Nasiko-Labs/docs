---
id: credentials
title: Manage Credentials
---

# Manage N8N Credentials

Read, update, or delete your stored N8N credentials.

---

## Get Credentials

`GET /api/v1/agents/n8n/credentials` — 🔒 Requires Auth

Returns stored credentials without the API key.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/agents/n8n/credentials \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/agents/n8n/credentials",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
creds = response.json()
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch("https://nasiko.dev/api/v1/agents/n8n/credentials", {
  headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
});
const creds = await res.json();
```

</TabItem>
</Tabs>

---

## Update Credentials

`PUT /api/v1/agents/n8n/credentials` — 🔒 Requires Auth

All fields are optional — send only what you want to update.

| Field | Type | Description |
|-------|------|-------------|
| `connection_name` | string | New connection label |
| `n8n_url` | string | New N8N instance URL |
| `api_key` | string | New API key |
| `is_active` | boolean | Enable or disable this connection |

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X PUT https://nasiko.dev/api/v1/agents/n8n/credentials \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"api_key": "n8n_api_newkey789"}'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

httpx.put(
    "https://nasiko.dev/api/v1/agents/n8n/credentials",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    json={"api_key": "n8n_api_newkey789"},
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
await fetch("https://nasiko.dev/api/v1/agents/n8n/credentials", {
  method: "PUT",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ api_key: "n8n_api_newkey789" }),
});
```

</TabItem>
</Tabs>

---

## Delete Credentials

`DELETE /api/v1/agents/n8n/credentials` — 🔒 Requires Auth

Permanently removes your N8N credentials.

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X DELETE https://nasiko.dev/api/v1/agents/n8n/credentials \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

httpx.delete(
    "https://nasiko.dev/api/v1/agents/n8n/credentials",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
await fetch("https://nasiko.dev/api/v1/agents/n8n/credentials", {
  method: "DELETE",
  headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
});
```

</TabItem>
</Tabs>
