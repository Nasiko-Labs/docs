---
id: repositories
title: List Repositories
---

# List GitHub Repositories

Returns all repositories accessible to the authenticated user's GitHub account.

`GET /api/v1/github/repositories` — 🔒 Requires Auth

Requires a connected GitHub account (see [GitHub Login](/github/login)).

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/github/repositories \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/github/repositories",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
repos = response.json()
for repo in repos:
    print(repo["full_name"])
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch("https://nasiko.dev/api/v1/github/repositories", {
  headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
});
const repos = await res.json();
console.log(repos.map((r) => r.full_name));
```

</TabItem>
</Tabs>
