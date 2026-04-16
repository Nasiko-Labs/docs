---
title: search
sidebar_position: 8
---

# nasiko search

Search for users and agents on the platform.

## `nasiko search users`

Search for users by query string.

```
Usage: nasiko search users [OPTIONS] QUERY

Arguments:
  QUERY    Search query (minimum 2 characters) [required]

Options:
  -l, --limit INTEGER    Max results to return [default: 10]
```

**Example:**

```bash
nasiko search users "alice" --limit 5
```

---

## `nasiko search agents`

Search for agents by query string.

```
Usage: nasiko search agents [OPTIONS] QUERY

Arguments:
  QUERY    Search query (minimum 2 characters) [required]

Options:
  -l, --limit INTEGER    Max results to return [default: 10]
```

**Example:**

```bash
nasiko search agents "support" --limit 20
```
