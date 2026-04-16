---
title: Command Reference
sidebar_position: 4
---

# CLI Command Reference

This reference covers every command available in the Nasiko CLI. Each command group has a dedicated page with full usage, options, and examples.

## Global options

These options apply to any command:

| Option | Description |
|--------|-------------|
| `--version` | Print CLI version and exit |
| `--cluster`, `-n` | Set cluster context for the current command |

Environment files are loaded at startup (first match wins): `.nasiko-local.env`, `.nasiko.env`, `.nasiko-aws.env`, `.nasiko-do.env`, `.env`. Set `NASIKO_DEBUG=true` to enable full tracebacks.

## Top-level commands

These commands are available directly on `nasiko` without a group prefix:

| Command | Description |
|---------|-------------|
| `nasiko use <cluster>` | Set the active cluster context |
| `nasiko current` | Show active cluster, API URL, and auth status |
| `nasiko init` | Interactive first-run setup wizard |
| `nasiko docs [topic]` | Show built-in terminal documentation |
| `nasiko list-clusters` | List all configured cluster profiles |

Available `docs` topics: `install`, `quickstart`, `concepts`, `auth`, `cluster`, `github`, `agent`, `chat`, `observability`, `access`, `local`, `n8n`, `images`, `user`, `search`, `env`.

## Command groups

| Group | Description |
|-------|-------------|
| [**auth**](./commands/auth.md) | Login, logout, and session status |
| [**cluster**](./commands/cluster.md) | Cluster profiles, infrastructure lifecycle, and bootstrap |
| [**setup**](./commands/setup.md) | Advanced infrastructure setup with Terraform/artifact backends |
| [**agent**](./commands/agent.md) | Deploy and inspect agents |
| [**github**](./commands/github.md) | GitHub integration and repository management |
| [**n8n**](./commands/n8n.md) | N8N connection and workflow registration |
| [**chat**](./commands/chat.md) | Interactive chat sessions with agents |
| [**search**](./commands/search.md) | Search users and agents |
| [**observe**](./commands/observe.md) | Observability sessions, traces, spans, and stats |
| [**access**](./commands/access.md) | Grant and revoke user/agent access |
| [**user**](./commands/user.md) | Superuser-level user administration |
| [**local**](./commands/local.md) | Local Docker Compose dev stack |
| [**images**](./commands/images.md) | Build and push platform container images |

## Recommended learning order

1. `nasiko init` or `nasiko setup bootstrap`
2. `nasiko auth login` and `nasiko auth status`
3. `nasiko agent list` and `nasiko agent deploy`
4. `nasiko observe sessions` for runtime visibility
