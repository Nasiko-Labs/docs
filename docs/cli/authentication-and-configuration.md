---
title: Authentication and Configuration
sidebar_position: 3
---

# CLI Auth and Configuration

This page documents how the CLI resolves API URLs, loads environment values, and stores credentials.

## Login and session lifecycle

Login command:

```bash
nasiko auth login --access-key <ACCESS_KEY> --access-secret <ACCESS_SECRET>
```

Useful auth commands:

```bash
nasiko auth status
nasiko auth logout
```

Behind the scenes:

- Login uses `POST {base_url}/auth/users/login`.
- Status checks validate auth with `GET {base_url}/auth/validate` and may fall back to `GET {base_url}/api/v1/healthcheck`.
- The CLI stores a JWT and reuses it for authenticated commands.
- Access key format is validated by `auth login` and must start with `NASK_`.
- `auth login` supports `--save-credentials/--no-save` and `--api-url`.

## Token and credential storage

The CLI uses OS keyring when available. If keyring is unavailable, it falls back to encrypted local files under `~/.nasiko/`.

Storage is cluster-scoped (derived from active cluster):

- `token_<cluster>.enc`
- `credentials_<cluster>.enc`

Legacy plain token files can also be cleaned when you clear auth state.

## Config file loading

Config files are loaded very early (before command parsing) so env-driven defaults are available during option resolution.

Load order:

1. `--config` or `-c` (explicit file path, highest priority)
2. `.nasiko-local.env`
3. `.nasiko.env`
4. `.nasiko-aws.env`
5. `.nasiko-do.env`
6. `.env`

## API base URL resolution

The CLI resolves base URL in this order:

1. Explicit URL passed by command internals (if any)
2. Active cluster metadata from `~/.nasiko/context.json` + state files
3. `NASIKO_API_URL` environment variable
4. Default fallback (`http://localhost:8000`)

## Cluster targeting

You can target a cluster for a single command:

```bash
nasiko --cluster my-cluster agent list
```

This sets `NASIKO_CLUSTER_NAME` for that invocation.

To inspect configured clusters:

```bash
nasiko list-clusters
```

## Common env variables

- `NASIKO_API_URL`
- `NASIKO_CLUSTER_NAME`
- `NASIKO_DEBUG`
- `KUBECONFIG`
- `NASIKO_PROVIDER`
- `NASIKO_REGION`
- `NASIKO_PUBLIC_REGISTRY_USER`

## Troubleshooting

- If `nasiko auth status` says you are not authenticated, run `nasiko auth login` again.
- If API requests fail unexpectedly, check `NASIKO_API_URL` and cluster selection.
- If keyring is unavailable in your environment, ensure `~/.nasiko` is writable for encrypted fallback files.
