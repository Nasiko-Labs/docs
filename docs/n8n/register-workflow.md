---
id: register-workflow
title: Register N8N Workflow as Agent
---

# Register N8N Workflow as Agent

Registers an n8n workflow as an A2A-compatible agent. The authenticated user becomes the owner.

`POST /api/v1/agents/n8n/register` — 🔒 Requires Auth

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `workflow_id` | string | ✅ | N8N workflow ID to register |
| `agent_name` | string | | Custom agent name (auto-generated if omitted) |
| `agent_description` | string | | Agent description |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://nasiko.dev/api/v1/agents/n8n/register \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "workflow_id": "wf-abc123",
    "agent_name": "invoice-processor",
    "agent_description": "Processes and routes invoice documents"
  }'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    "https://nasiko.dev/api/v1/agents/n8n/register",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
    json={
        "workflow_id": "wf-abc123",
        "agent_name": "invoice-processor",
        "agent_description": "Processes and routes invoice documents",
    },
)
print(response.json())
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch("https://nasiko.dev/api/v1/agents/n8n/register", {
  method: "POST",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    workflow_id: "wf-abc123",
    agent_name: "invoice-processor",
    agent_description: "Processes and routes invoice documents",
  }),
});
const result = await res.json();
```

</TabItem>
</Tabs>
