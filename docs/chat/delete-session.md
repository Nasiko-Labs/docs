---
id: delete-session
title: Delete Session
---

# Delete Chat Session

Permanently deletes a session and its message history.

`DELETE /api/v1/chat/session/{session_id}` — 🔒 Requires Auth

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `session_id` | Session UUID to delete |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl -X DELETE https://nasiko.dev/api/v1/chat/session/sess-abc123 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

httpx.delete(
    "https://nasiko.dev/api/v1/chat/session/sess-abc123",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
await fetch("https://nasiko.dev/api/v1/chat/session/sess-abc123", {
  method: "DELETE",
  headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
});
```

</TabItem>
</Tabs>
