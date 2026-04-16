---
title: images
sidebar_position: 13
---

# nasiko images

Build and push container images for Nasiko platform components.

:::note
Image commands assume a full monorepo layout with `core/` and `web/` directories.
:::

## `nasiko images build`

Build container images for one or more services.

```
Usage: nasiko images build [OPTIONS]

Options:
  -u, --username TEXT      Registry username [default: karannasiko]
                           [env: NASIKO_PUBLIC_REGISTRY_USER]
  -t, --tag TEXT           Image tag [default: git short hash]
  -s, --service TEXT       Service to build (repeatable, builds all if omitted)
  --platform TEXT          Target platform (e.g. linux/amd64)
  --multi-platform         Build for multiple platforms [default: False]
  --no-cache               Disable Docker build cache [default: False]
  --dry-run                Print commands without executing [default: False]
```

**Example:**

```bash
nasiko images build --service nasiko-backend --tag v1.0.0
```

---

## `nasiko images push`

Push built images to the registry.

```
Usage: nasiko images push [OPTIONS]

Options:
  -u, --username TEXT      Registry username [default: karannasiko]
                           [env: NASIKO_PUBLIC_REGISTRY_USER]
  -t, --tag TEXT           Image tag
  -s, --service TEXT       Service to push (repeatable)
  --dry-run                Print commands without executing [default: False]
```

---

## `nasiko images build-push`

Build and push images in a single step.

```
Usage: nasiko images build-push [OPTIONS]

Options:
  -u, --username TEXT      Registry username [default: karannasiko]
                           [env: NASIKO_PUBLIC_REGISTRY_USER]
  -t, --tag TEXT           Image tag [default: git short hash]
  -s, --service TEXT       Service to build and push (repeatable)
  --platform TEXT          Target platform
  --multi-platform         Build for multiple platforms [default: False]
  --no-cache               Disable Docker build cache [default: False]
  --dry-run                Print commands without executing [default: False]
```

**Example:**

```bash
nasiko images build-push --username mydockeruser --service nasiko-backend --multi-platform
```

---

## `nasiko images list`

List available services and their image names.

```
Usage: nasiko images list
```
