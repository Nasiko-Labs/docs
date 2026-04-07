---
id: connect
title: Connect N8N
---

# Connect Your N8N Instance

Saves your N8N connection credentials after verifying connectivity. All N8N operations use these stored credentials.

`POST /api/v1/agents/n8n/connect` — 🔒 Requires Auth

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `connection_name` | string | ✅ | Label for this connection |
| `n8n_url` | string | ✅ | Your N8N instance URL |
| `api_key` | string | ✅ | N8N API key |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://nasiko.dev/api/v1/agents/n8n/connect \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "connection_name": "My N8N",
    "n8n_url": "https://n8n.mycompany.com",
    "api_key": "n8n_api_abcdef123456"
  }'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    "https://nasiko.dev/api/v1/agents/n8n/connect",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    json={
        "connection_name": "My N8N",
        "n8n_url": "https://n8n.mycompany.com",
        "api_key": "n8n_api_abcdef123456",
    },
)
print(response.json())
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch("https://nasiko.dev/api/v1/agents/n8n/connect", {
  method: "POST",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    connection_name: "My N8N",
    n8n_url: "https://n8n.mycompany.com",
    api_key: "n8n_api_abcdef123456",
  }),
});
```

</TabItem>
</Tabs>

:::note
Nasiko tests the connection before saving. If the URL or API key is invalid, the request returns an error and credentials are not stored.
:::
