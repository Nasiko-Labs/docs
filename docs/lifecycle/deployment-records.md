---
id: deployment-records
title: Deployment Records
---

# Deployment Records

Deployment records track Kubernetes deployments for agent versions.

:::info Internal Use
These endpoints are called by the build pipeline. Use [Update Agent](/lifecycle/update-agent) to trigger deployments.
:::

---

## Create Deployment Record

`POST /api/v1/agents/deploy` — 🌐 Public

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `agent_id` | string | ✅ | Agent UUID |
| `status` | string | ✅ | Deployment status |
| `build_id` | string | | Associated build ID |
| `service_url` | string | | URL where the agent is deployed |
| `k8s_deployment_name` | string | | Kubernetes deployment name |
| `namespace` | string | | K8s namespace (default: `nasiko-agents`) |
| `error_message` | string | | Error details on failure |

### Deployment Status Values

| Status | Meaning |
|--------|---------|
| `starting` | Initializing |
| `running` | Live and serving traffic |
| `stopped` | Stopped |
| `failed` | Deployment failed |

---

## Update Deployment Status

`PUT /api/v1/agents/deployment/{deployment_id}/status` — 🌐 Public

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `deployment_id` | Deployment record ID |

### Request Body

Same fields as Create Deployment Record.
