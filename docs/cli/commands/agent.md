---
title: agent
sidebar_position: 4
---

# nasiko agent

Deploy, inspect, and manage agents on the Nasiko platform.

## `nasiko agent deploy`

Deploy an agent from a local directory, zip archive, or GitHub repository.

```
Usage: nasiko agent deploy [OPTIONS] [SOURCE]

Arguments:
  SOURCE    Agent source: directory path, .zip file, or owner/repo GitHub ref
            [default: .]

Options:
  -n, --name TEXT    Agent name (inferred from source if omitted)
```

The `deploy` command auto-detects the source type:

- **Directory** — packages and uploads the directory contents
- **`.zip` file** — uploads the archive directly
- **`owner/repo`** — clones from GitHub and uploads

**Examples:**

```bash
# Deploy from current directory
nasiko agent deploy

# Deploy from a specific directory with a name
nasiko agent deploy ./my-agent --name my-agent

# Deploy from a zip file
nasiko agent deploy agent-v2.zip --name my-agent

# Deploy from GitHub
nasiko agent deploy my-org/my-repo --name my-agent
```

---

## `nasiko agent list`

List available agents.

```
Usage: nasiko agent list [OPTIONS]

Options:
  -f, --format TEXT    Output format: table, json, list [default: table]
  -d, --details        Show additional details [default: False]
```

**Example:**

```bash
nasiko agent list --format json --details
```

---

## `nasiko agent list-uploaded`

List uploaded agent packages (pre-deployment artifacts).

```
Usage: nasiko agent list-uploaded
```

---

## `nasiko agent get`

Get full details for a specific agent. Provide either `--name` or `--agent-id`, but not both.

```
Usage: nasiko agent get [OPTIONS]

Options:
  --name TEXT         Agent name
  --agent-id TEXT     Agent ID
  -f, --format TEXT   Output format: details, json [default: details]
```

**Example:**

```bash
nasiko agent get --name my-agent --format json
```

---

## Deprecated commands

These commands are hidden and will be removed in a future release:

| Command | Replacement |
|---------|-------------|
| `nasiko agent upload-zip <file>` | `nasiko agent deploy <file>` |
| `nasiko agent upload-directory <path>` | `nasiko agent deploy <path>` |

---

## `nasiko agent n8n`

Nested N8N commands are also available under `nasiko agent n8n`. They are identical to the top-level [`nasiko n8n`](./n8n.md) commands.
