---
title: n8n
sidebar_position: 6
---

# nasiko n8n

Manage N8N connection details and workflow registration. These commands are also available under `nasiko agent n8n`.

## `nasiko n8n connect`

Configure a connection to an N8N instance.

```
Usage: nasiko n8n connect [OPTIONS]

Options:
  --url TEXT              N8N instance URL [required, prompted]
  --api-key TEXT          N8N API key [required, hidden input]
  --connection-name TEXT  Name for this connection [required, prompted]
```

**Example:**

```bash
nasiko n8n connect \
  --url https://n8n.example.com \
  --api-key '<api-key>' \
  --connection-name default
```

---

## `nasiko n8n credentials`

Display stored N8N connection credentials.

```
Usage: nasiko n8n credentials
```

---

## `nasiko n8n register`

Register an N8N workflow as a Nasiko agent.

```
Usage: nasiko n8n register [OPTIONS] WORKFLOW_ID

Arguments:
  WORKFLOW_ID    N8N workflow ID [required]

Options:
  -n, --name TEXT          Agent name
  -d, --description TEXT   Agent description
```

**Example:**

```bash
nasiko n8n register abc123 --name "Support Bot" --description "Customer support workflow"
```

---

## `nasiko n8n update`

Update an existing N8N connection.

```
Usage: nasiko n8n update [OPTIONS]

Options:
  --name TEXT        Connection name
  --url TEXT         N8N instance URL
  --api-key TEXT     N8N API key
  --active TEXT      Set active status
```

---

## `nasiko n8n delete`

Delete the stored N8N connection.

```
Usage: nasiko n8n delete
```

---

## `nasiko n8n workflows`

List workflows from the connected N8N instance.

```
Usage: nasiko n8n workflows [OPTIONS]

Options:
  --active-only BOOLEAN    Show only active workflows [default: True]
  -l, --limit INTEGER      Max number of workflows [default: 100]
```

**Example:**

```bash
nasiko n8n workflows --active-only false --limit 50
```
