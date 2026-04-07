---
id: create-session
title: Create Session
---

# Create Chat Session

Creates a new chat session. Sessions store conversation history and can be associated with a specific agent.

`POST /api/v1/chat/session` — 🔒 Requires Auth

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `agent_id` | string | | Associate session with an agent |
| `agent_url` | string | | Direct agent endpoint URL |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://nasiko.dev/api/v1/chat/session \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent-abc123",
    "agent_url": "https://weather-agent.example.com"
  }'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    "https://nasiko.dev/api/v1/chat/session",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    json={
        "agent_id": "agent-abc123",
        "agent_url": "https://weather-agent.example.com",
    },
)
session_id = response.json()["data"]["session_id"]
print(f"Session: {session_id}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch("https://nasiko.dev/api/v1/chat/session", {
  method: "POST",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    agent_id: "agent-abc123",
    agent_url: "https://weather-agent.example.com",
  }),
});
const { data } = await res.json();
const sessionId = data.session_id;
```

</TabItem>
</Tabs>
