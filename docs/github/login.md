---
id: login
title: GitHub Login
---

# GitHub Login & Token Management

---

## Initiate User Login

`GET /api/v1/auth/github/login-user` — 🌐 Public

Starts the GitHub OAuth flow for user authentication. Returns the authorization URL to redirect the user to.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/auth/github/login-user
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get("https://nasiko.dev/api/v1/auth/github/login-user")
auth_url = response.json()["auth_url"]
print(f"Redirect user to: {auth_url}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch("https://nasiko.dev/api/v1/auth/github/login-user");
const { auth_url } = await res.json();
window.location.href = auth_url; // redirect
```

</TabItem>
</Tabs>

---

## Connect GitHub Account

For users already logged in who want to connect GitHub for repository access:

`GET /api/v1/auth/github/login` — 🔒 Requires Auth

Returns a GitHub OAuth URL scoped to repository access.

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/auth/github/login \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/auth/github/login",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
auth_url = response.json()["auth_url"]
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch("https://nasiko.dev/api/v1/auth/github/login", {
  headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
});
const { auth_url } = await res.json();
```

</TabItem>
</Tabs>

---

## Check Token Status

`GET /api/v1/auth/github/token` — 🔒 Requires Auth

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://nasiko.dev/api/v1/auth/github/token \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/auth/github/token",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
status = response.json()
print(status["has_token"])  # True
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch("https://nasiko.dev/api/v1/auth/github/token", {
  headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
});
const status = await res.json();
```

</TabItem>
</Tabs>

**Response:**
```json
{
  "has_token": true,
  "github_username": "octocat"
}
```

---

## Logout from GitHub

`POST /api/v1/auth/github/logout` — 🔒 Requires Auth

Removes your stored GitHub access token.

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://nasiko.dev/api/v1/auth/github/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

httpx.post(
    "https://nasiko.dev/api/v1/auth/github/logout",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
await fetch("https://nasiko.dev/api/v1/auth/github/logout", {
  method: "POST",
  headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
});
```

</TabItem>
</Tabs>
