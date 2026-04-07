---
id: download-agent
title: Download Agent Files
---

# Download Agent Files

Downloads agent source files as a tarball. Used by the build pipeline to fetch agent code for building.

`GET /api/v1/agents/{agent_name}/download` — 🌐 Public

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `agent_name` | Agent slug name |

## Query Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `version` | | Specific version (e.g., `1.0.0`). Defaults to latest. |

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
# Latest version
curl -O https://nasiko.dev/api/v1/agents/weather-agent/download

# Specific version
curl -O "https://nasiko.dev/api/v1/agents/weather-agent/download?version=1.0.0"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/agents/weather-agent/download",
    params={"version": "1.0.0"},
)
with open("weather-agent-1.0.0.tar.gz", "wb") as f:
    f.write(response.content)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch(
  "https://nasiko.dev/api/v1/agents/weather-agent/download?version=1.0.0"
);
const buffer = await res.arrayBuffer();
// Node.js: fs.writeFileSync("agent.tar.gz", Buffer.from(buffer));
```

</TabItem>
</Tabs>

## Response

Returns a binary tarball (`application/gzip`).
