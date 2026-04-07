---
id: statistics
title: Statistics
---

# NANDA Agent Statistics

Returns aggregate counts and metrics across all agents in the NANDA registry.

<div className="endpoint-header">
  <span className="badge badge--get">GET</span>
  <code>/api/v1/nanda/statistics</code>
  <span>🌐 Public</span>
</div>

## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/nanda/statistics"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get("https://nasiko.dev/api/v1/nanda/statistics")
stats = response.json()
print(f"Total agents: {stats['total_agents']}")
print(f"Online: {stats['online_agents']}")
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const res = await fetch("https://nasiko.dev/api/v1/nanda/statistics");
const stats = await res.json();
console.log(`Total agents: ${stats.total_agents}`);
```

</TabItem>
</Tabs>
