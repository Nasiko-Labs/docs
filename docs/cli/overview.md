---
title: Overview
sidebar_position: 1
---

# Nasiko CLI Overview

The Nasiko CLI helps you authenticate, manage clusters, deploy agents, connect GitHub and n8n, run search and observability commands, and operate local/dev infrastructure.

## Install

Install from PyPI:

```bash
pip install nasiko
```

Note: the CLI code in this repository defines the project name as `nasiko-cli` in `pyproject.toml`, but the executable command is `nasiko`.

After install, confirm the command is available:

```bash
nasiko --version
```

## Global command shape

```bash
nasiko [global options] <command or group> [subcommand] [options]
```

Global options:

- `--version`: print CLI version and exit
- `--cluster`, `-n`: set the cluster name for this invocation

## Top-level commands

- `nasiko use`
- `nasiko current`
- `nasiko init`
- `nasiko docs`
- `nasiko list-clusters`

## Command groups

- `nasiko auth ...`
- `nasiko cluster ...`
- `nasiko setup ...`
- `nasiko github ...`
- `nasiko agent ...`
- `nasiko n8n ...`
- `nasiko chat ...`
- `nasiko search ...`
- `nasiko observe ...`
- `nasiko access ...`
- `nasiko user ...`
- `nasiko local ...`
- `nasiko images ...`

## Quick start

1. Bootstrap or connect your platform (see `CLI Setup and Local Operations` for full command options):

```bash
nasiko setup bootstrap --help
# or
nasiko cluster bootstrap --help
```

2. Log in:

```bash
nasiko auth login --access-key <ACCESS_KEY> --access-secret <ACCESS_SECRET>
```

3. Verify auth:

```bash
nasiko auth status
nasiko current
```

4. List available agents:

```bash
nasiko agent list
```

5. Deploy an agent from a directory:

```bash
nasiko agent deploy ./path/to/agent --name my-agent
```

## Where values come from

At startup, the CLI loads environment files in this order (first match wins unless `--config` is passed):

1. `--config` / `-c` path
2. `.nasiko-local.env`
3. `.nasiko.env`
4. `.nasiko-aws.env`
5. `.nasiko-do.env`
6. `.env`

See CLI Auth and Configuration for details.
