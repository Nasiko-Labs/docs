---
id: spans
title: Spans
---

# Span Details

Returns detailed information for a single span: parsed JSON input/output, attributes, events, annotations, and metrics.

`GET /api/v1/observability/span/{span_id}` — 🔒 Requires Auth

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `span_id` | Span node ID (e.g., `U3Bhbjo1Mw==`) |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/observability/span/U3Bhbjo1Mw==" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/observability/span/U3Bhbjo1Mw==",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)
span = response.json()
print(f"Name: {span['name']}")
print(f"Duration: {span['duration_ms']}ms")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/observability/span/U3Bhbjo1Mw==",
  { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
);
const span = await res.json();
```

</TabItem>
</Tabs>
