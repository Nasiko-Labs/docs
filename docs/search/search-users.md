---
id: search-users
title: Search Users
---

# Search Users

Search for users by username or display name with autocomplete support.

<div className="endpoint-header">
  <span className="badge badge--get">GET</span>
  <code>/api/v1/search/users</code>
  <span>🔒 Requires Auth</span>
</div>

## Query Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `q` | ✅ | | Search query (minimum 2 characters) |
| `limit` | | 10 | Maximum results |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/search/users?q=john&limit=5" \
  -H "Authorization: Bearer <token>"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/search/users",
    headers={"Authorization": "Bearer <token>"},
    params={"q": "john", "limit": 5},
)
users = response.json()
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/search/users?q=john&limit=5",
  { headers: { Authorization: "Bearer <token>" } }
);
const users = await res.json();
```

</TabItem>
</Tabs>
