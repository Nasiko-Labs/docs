---
id: build-records
title: Build Records
---

# Build Records

Build records track container image builds for agent versions. These endpoints are called by the Kubernetes build worker.

:::info Internal Use
These endpoints are primarily used by the Nasiko build pipeline. Most developers interact with builds indirectly via [Upload](/upload/upload-zip) and [Update](/lifecycle/update-agent).
:::

---

## Create Build Record

`POST /api/v1/agents/build` — 🌐 Public

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `agent_id` | string | ✅ | Agent UUID |
| `status` | string | ✅ | Build status |
| `version_tag` | string | | Image version tag |
| `image_reference` | string | | Full image reference |
| `github_url` | string | | Source GitHub URL |
| `k8s_job_name` | string | | Kubernetes job name |
| `logs` | string | | Build logs |
| `error_message` | string | | Error details on failure |

### Build Status Values

| Status | Meaning |
|--------|---------|
| `queued` | Waiting to start |
| `building` | In progress |
| `success` | Completed successfully |
| `failed` | Build failed |

---

## Update Build Status

`PUT /api/v1/agents/build/{build_id}/status` — 🌐 Public

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `build_id` | Build record ID |

### Request Body

Same fields as Create Build Record.

---

## Get Version Mapping

Maps a semantic version to its Docker image tag.

`GET /api/v1/agents/build/version-mapping` — 🌐 Public

### Query Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `agent_id` | ✅ | Agent UUID |
| `semantic_version` | ✅ | Semver string (e.g., `v1.0.0`) |

### Example

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl "https://nasiko.dev/api/v1/agents/build/version-mapping?agent_id=agent-abc123&semantic_version=v1.0.0"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.get(
    "https://nasiko.dev/api/v1/agents/build/version-mapping",
    params={"agent_id": "agent-abc123", "semantic_version": "v1.0.0"},
)
mapping = response.json()
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const params = new URLSearchParams({
  agent_id: "agent-abc123",
  semantic_version: "v1.0.0",
});
const res = await fetch(
  `https://nasiko.dev/api/v1/agents/build/version-mapping?${params}`
);
const mapping = await res.json();
```

</TabItem>
</Tabs>
