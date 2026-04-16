---
title: Setup and Local Operations
sidebar_position: 2
---

# CLI Setup and Local Operations

This page focuses on bootstrap/setup flows, local Docker stack management, and image build/push commands.

## Setup workflows

The CLI exposes two bootstrap entry points that serve different use cases:

```bash
nasiko setup bootstrap [options]
nasiko cluster bootstrap [options]
```

Use this quick rule:

- `nasiko cluster bootstrap`: simpler "operator" command with a smaller option surface.
- `nasiko setup bootstrap`: full "power user" command with advanced Terraform/artifact backend controls.

### What bootstrap actually does

Both commands run the same high-level workflow:

1. Connect to an existing cluster (`--kubeconfig`) OR provision a new one (`--provider`).
2. Optionally clean existing Nasiko resources (`--clean-existing`).
3. Configure a registry (Harbor or cloud registry).
4. Deploy BuildKit.
5. Deploy core Nasiko apps (backend/web/auth/router and dependencies).
6. Wait for superuser initialization and print/save superuser credentials.
7. Save deployment artifacts/metadata under local state and optional artifact backend.

The setup flow also attempts to deploy Kubernetes Dashboard manifests and then prints the primary service access endpoints.

### Prerequisites before first run

- Kubernetes tooling: `kubectl`, `helm`
- Docker (for local image workflows)
- Cloud credentials if provisioning infrastructure (`NASIKO_PROVIDER=aws|digitalocean`)
- Registry credentials when using Harbor (`NASIKO_REGISTRY_PASS` required)
- Optional config file in the repo root (`.nasiko-local.env`, `.nasiko.env`, `.nasiko-aws.env`, `.nasiko-do.env`, `.env`)

### `nasiko cluster bootstrap` options (streamlined)

Use this when you want the short command surface:

- `--config, -c`: env file path
- `--kubeconfig`: existing cluster kubeconfig (skips provisioning)
- `--provider`: `aws` or `digitalocean` (used for new cluster or cloud registry)
- `--cluster-name`: cluster identifier (default: `nasiko-cluster`)
- `--region`: cloud region
- `--terraform-dir, -t`: Terraform modules path
- `--state-dir`: state directory
- `--registry-type`: `harbor` or `cloud` (default here is `harbor`)
- Harbor-related: `--domain`, `--email`, `--registry-user`, `--registry-pass`
- Cloud-registry-related: `--cloud-reg-name`
- App/env inputs: `--openai-key`, `--public-registry-user`
- Superuser seed: `--superuser-username`, `--superuser-email`
- `--clean-existing / --no-clean-existing`

### `nasiko setup bootstrap` options (advanced/full)

This command includes everything above plus advanced state/artifact configuration:

- Terraform backend:
  - `--tf-backend` (`local|s3|gcs|remote`)
  - `--tf-backend-bucket`
  - `--tf-backend-region`
  - `--tf-backend-key-prefix`
  - `--tf-backend-dynamodb-table`
  - `--tf-backend-s3-endpoint`
  - `--tf-backend-s3-use-path-style`
  - `--tf-cloud-org`
  - `--tf-cloud-workspace`
- Artifact backend (kubeconfig/credentials/metadata storage):
  - `--artifact-backend` (`local|s3`)
  - `--artifact-bucket`
  - `--artifact-region`
  - `--artifact-prefix`
  - `--artifact-s3-endpoint`
  - `--artifact-s3-use-path-style`

Important default difference:

- `nasiko cluster bootstrap` defaults `--registry-type` to `harbor`
- `nasiko setup bootstrap` defaults `--registry-type` to `cloud`

### Start-from-scratch workflows

#### 1) Existing cluster + cloud registry

```bash
nasiko setup bootstrap \
  --kubeconfig ./kubeconfig.yaml \
  --provider digitalocean \
  --registry-type cloud \
  --cloud-reg-name nasiko-images \
  --cluster-name nasiko-cluster
```

#### 2) Provision new cluster on DigitalOcean

```bash
export NASIKO_PROVIDER=digitalocean
export NASIKO_REGION=nyc3
nasiko setup bootstrap --registry-type cloud --cluster-name nasiko-cluster
```

#### 3) Existing cluster + Harbor

```bash
nasiko cluster bootstrap \
  --kubeconfig ./kubeconfig.yaml \
  --registry-type harbor \
  --registry-pass '<strong-password>' \
  --registry-user admin
```

### Interacting with the platform after bootstrap

1. Save the superuser `access_key` and `access_secret` printed by bootstrap.
2. Point CLI/API calls to your gateway URL.
3. Log in via CLI and verify auth.

Example:

```bash
export NASIKO_API_URL=http://localhost:8000
nasiko auth login --access-key <ACCESS_KEY> --access-secret <ACCESS_SECRET>
nasiko auth status
nasiko agent list
```

### Setup command groups

```bash
nasiko setup k8s ...
nasiko setup harbor ...
nasiko setup cloud-reg ...
nasiko setup buildkit ...
nasiko setup core ...
```

### Cluster setup command tree

The `cluster` group includes setup-focused paths alongside cluster lifecycle:

```bash
nasiko cluster connect <name> [--url <url>]
nasiko cluster create local|local-k8s|remote ...
nasiko cluster bootstrap ...
nasiko cluster setup registry harbor|cloud ...
nasiko cluster setup buildkit ...
nasiko cluster setup core ...
nasiko cluster cleanup ...
nasiko cluster init-superuser ...
nasiko cluster get-superuser ...
```

Common setup commands:

```bash
nasiko setup configure-github-oauth
nasiko setup cleanup
nasiko setup init-superuser
nasiko setup get-superuser
```

## Local stack commands

The local group is for Docker Compose-based local development:

```bash
nasiko local up
nasiko local status
nasiko local logs
nasiko local deploy-agent <agent_name> [agent_path]
nasiko local restart
nasiko local update
nasiko local down
```

Important runtime expectations:

- Docker daemon must be running
- Docker Compose v2 must be available
- `docker-compose.nasiko.yml` must exist at expected project root

Default local API assumption for direct backend calls in some flows is:

```bash
http://localhost:8000
```

Override with:

```bash
export NASIKO_API_URL=http://localhost:9100
```

Use `http://localhost:9100` when you want to hit Kong/local gateway routes.

## Image build and push

List known services:

```bash
nasiko images list
```

Build:

```bash
nasiko images build
```

Push:

```bash
nasiko images push
```

Build and push:

```bash
nasiko images build-push
```

If `--tag` is omitted, image commands default to the current git short commit hash.

Common options:

- `--username`, `-u`
- `--tag`, `-t`
- `--service`, `-s` (repeatable)
- `--platform`
- `--multi-platform`
- `--no-cache`
- `--dry-run`

## Environment variables used heavily in setup/local

- `KUBECONFIG`
- `NASIKO_PROVIDER`
- `NASIKO_REGION`
- `NASIKO_CLUSTER_NAME`
- `NASIKO_API_URL`
- `NASIKO_PUBLIC_REGISTRY_USER`
- `OPENAI_API_KEY`
- `NASIKO_CONTAINER_REGISTRY_TYPE`

## Operational caveats

Based on current CLI code:

- `local` and `images` commands assume a specific monorepo layout.
- Some setup commands may patch Kubernetes resources directly and require cluster-admin level permissions.
- Setup commands that print superuser access credentials should be run in secure environments only.
