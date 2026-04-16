---
title: local
sidebar_position: 12
---

# nasiko local

Operate the local Docker Compose development stack and deploy agents locally.

:::note
Local stack commands expect a `docker-compose.nasiko.yml` file in the expected repository layout.
:::

## `nasiko local up`

Start the local Nasiko stack.

```
Usage: nasiko local up [OPTIONS]

Options:
  -c, --config TEXT            Config file path
  --registry-url TEXT          Container registry URL
  --version TEXT               Image version tag
  --mongo-password TEXT        MongoDB password
  --jwt-secret TEXT            JWT signing secret
  --encryption-key TEXT        Encryption key
  --auth-mode TEXT             Authentication mode
  --github-client-id TEXT      GitHub OAuth client ID
  --github-client-secret TEXT  GitHub OAuth client secret
  --openai-key TEXT            OpenAI API key
  --openrouter-key TEXT        OpenRouter API key
  --build / --no-build         Build images before starting [default: no-build]
  --detach / --attach          Run in background [default: detach]
```

**Example:**

```bash
nasiko local up --detach
nasiko local up --build --openai-key sk-...
```

---

## `nasiko local down`

Stop the local stack.

```
Usage: nasiko local down [OPTIONS]

Options:
  -v, --volumes    Also remove volumes (wipes data) [default: False]
```

**Example:**

```bash
nasiko local down --volumes
```

---

## `nasiko local status`

Show the status of running compose services.

```
Usage: nasiko local status
```

---

## `nasiko local logs`

View logs from the local stack.

```
Usage: nasiko local logs [OPTIONS] [SERVICE...]

Arguments:
  SERVICE    One or more service names (optional, defaults to all)

Options:
  -f, --follow          Follow log output [default: False]
  -n, --lines INTEGER   Number of lines to show [default: 100]
```

**Example:**

```bash
nasiko local logs nasiko-backend --follow --lines 50
```

---

## `nasiko local deploy-agent`

Deploy an agent to the local development API.

```
Usage: nasiko local deploy-agent [OPTIONS] AGENT_NAME [AGENT_PATH]

Arguments:
  AGENT_NAME    Name of the agent [required]
  AGENT_PATH    Path to agent directory [default: ./agents/{agent_name}]
```

The API URL defaults to `http://localhost:8000` unless overridden by environment configuration.

**Example:**

```bash
nasiko local deploy-agent my-agent ./agents/my-agent
```

---

## `nasiko local shell`

Open a shell into a running service container.

```
Usage: nasiko local shell SERVICE

Arguments:
  SERVICE    Service name [required]
```

**Example:**

```bash
nasiko local shell nasiko-backend
```

---

## `nasiko local restart`

Restart one or all services.

```
Usage: nasiko local restart [SERVICE]

Arguments:
  SERVICE    Service to restart (optional, restarts all if omitted)
```

---

## `nasiko local update`

Pull latest images and restart services.

```
Usage: nasiko local update [SERVICES...]

Arguments:
  SERVICES    One or more services to update (optional, updates all if omitted)
```
