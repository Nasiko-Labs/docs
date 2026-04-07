---
id: authentication
title: Authentication
sidebar_position: 2
---

# Authentication

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Nasiko uses JWT tokens for authentication. The primary flow is to call the login API with your `access_key` and `access_secret`, receive a token, and use that token on protected requests.

## Login with Access Credentials

Use the access credentials issued when a user is created (for example, from `POST /api/v1/user/register`) to get a JWT from the login endpoint.

Login endpoint:

```
POST https://nasiko.dev/auth/users/login
```

🌐 Public

Request body:

```json
{
  "access_key": "ak_live_xxxxx",
  "access_secret": "as_live_xxxxx"
}
```

Get a token:

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -sS -X POST "https://nasiko.dev/auth/users/login" \
  -H "Content-Type: application/json" \
  -d '{"access_key":"ak_live_xxxxx","access_secret":"as_live_xxxxx"}' | jq .
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

access_key = "ak_live_xxxxx"
access_secret = "as_live_xxxxx"

login_res = httpx.post(
    "https://nasiko.dev/auth/users/login",
    json={"access_key": access_key, "access_secret": access_secret},
)
token = login_res.json()["token"]

protected_res = httpx.get(
    "https://nasiko.dev/api/v1/your-protected-endpoint",
    headers={"Authorization": f"Bearer {token}"},
)
print(protected_res.status_code)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const accessKey = "ak_live_xxxxx";
const accessSecret = "as_live_xxxxx";

const loginRes = await fetch("https://nasiko.dev/auth/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    access_key: accessKey,
    access_secret: accessSecret,
  }),
});
const { token } = await loginRes.json();

const res = await fetch("https://nasiko.dev/api/v1/your-protected-endpoint", {
  headers: { Authorization: `Bearer ${token}` },
});
console.log(res.status);
```

</TabItem>
</Tabs>

Response example:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 43200,
  "is_super_user": false
}
```

Use the token on protected endpoints:

```
Authorization: Bearer <token>
```

## GitHub OAuth Flow

### 1. Initiate Login

Fetch the authorization URL:

```
GET /api/v1/auth/github/login-user
```

🌐 Public

**Response:**
```json
{
  "auth_url": "https://github.com/login/oauth/authorize?client_id=..."
}
```

Redirect the user to `auth_url`.

### 2. Handle Callback

GitHub redirects back to:

```
GET /api/v1/auth/github/callback?code=<code>&state=<state>
```

🌐 Public

This endpoint exchanges the code for a token, creates or retrieves the user record, and establishes a session.

### 3. Use Your Token

Pass your session token on every protected request:

```
Authorization: Bearer <your-session-token>
```

## Token Status

Check whether your GitHub token is connected:

```
GET /api/v1/auth/github/token
```

🔒 Requires Auth

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
const { has_token, github_username } = await res.json();
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

If the user has not connected GitHub yet, this endpoint can return:

```json
{
  "detail": "No GitHub credentials found for user"
}
```

## Logout

Remove your stored GitHub token:

```
POST /api/v1/auth/github/logout
```

🔒 Requires Auth

If no GitHub credentials are stored, the response can be:

```json
{
  "success": false,
  "message": "No GitHub credentials found to remove"
}
```

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
