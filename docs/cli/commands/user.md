---
title: user
sidebar_position: 11
---

# nasiko user

Superuser-level user administration commands.

## `nasiko user register`

Register a new user on the platform.

```
Usage: nasiko user register [OPTIONS]

Options:
  -u, --username TEXT    Username [prompted if omitted]
  -e, --email TEXT       Email address [prompted if omitted]
  -s, --super-user       Grant superuser privileges [default: False]
```

**Example:**

```bash
nasiko user register --username alice --email alice@example.com
nasiko user register --username admin --email admin@example.com --super-user
```

---

## `nasiko user list`

List registered users.

```
Usage: nasiko user list [OPTIONS]

Options:
  -l, --limit INTEGER    Max users to return [default: 50]
```

---

## `nasiko user get`

Get details for a specific user.

```
Usage: nasiko user get USER_ID

Arguments:
  USER_ID    User ID [required]
```

---

## `nasiko user regenerate-credentials`

Regenerate access key and secret for a user.

```
Usage: nasiko user regenerate-credentials USER_ID

Arguments:
  USER_ID    User ID [required]
```

---

## `nasiko user revoke`

Revoke a user's access (deactivate without deleting).

```
Usage: nasiko user revoke USER_ID

Arguments:
  USER_ID    User ID [required]
```

---

## `nasiko user reinstate`

Reinstate a previously revoked user.

```
Usage: nasiko user reinstate USER_ID

Arguments:
  USER_ID    User ID [required]
```

---

## `nasiko user delete`

Permanently delete a user.

```
Usage: nasiko user delete [OPTIONS] USER_ID

Arguments:
  USER_ID    User ID [required]

Options:
  --confirm    Confirm deletion without prompt [default: False]
```

**Example:**

```bash
nasiko user delete abc-123 --confirm
```
