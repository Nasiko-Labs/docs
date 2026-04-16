---
title: auth
sidebar_position: 1
---

# nasiko auth

Authenticate with the Nasiko platform and manage session state.

## `nasiko auth login`

Login to Nasiko with access key and secret.

```
Usage: nasiko auth login [OPTIONS]

Options:
  -k, --access-key TEXT       Access key (must start with NASK_)
  -s, --access-secret TEXT    Access secret (hidden prompt if omitted)
  --save-credentials / --no-save
                              Save credentials locally for future sessions
                              [default: save-credentials]
  --api-url TEXT              Override API base URL for this login
```

The login command sends a `POST` request to `{api_url}/auth/users/login` with your access key and secret. On success it stores the returned token locally, scoped to the active cluster context.

If `--access-key` or `--access-secret` are omitted, you will be prompted interactively. The access key is validated client-side to start with `NASK_` before any network request is made.

**Example:**

```bash
nasiko auth login --access-key NASK_abc123 --access-secret mySecret
```

---

## `nasiko auth status`

Check authentication status and connectivity.

```
Usage: nasiko auth status
```

Prints the current login state, active cluster, API URL, and whether the stored token is still valid.

**Example:**

```bash
nasiko auth status
```

---

## `nasiko auth logout`

Clear current session token and optionally remove all stored auth credentials.

```
Usage: nasiko auth logout [OPTIONS]

Options:
  --clear-all    Remove all locally stored auth data [default: False]
```

Without `--clear-all`, only the current session token is removed. With `--clear-all`, all saved credentials across clusters are wiped.

**Example:**

```bash
nasiko auth logout --clear-all
```
