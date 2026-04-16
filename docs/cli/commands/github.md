---
title: github
sidebar_position: 5
---

# nasiko github

Manage the GitHub integration used by agent and source workflows.

## `nasiko github connect`

Start the GitHub OAuth connection flow.

```
Usage: nasiko github connect
```

Opens the GitHub OAuth authorization flow to link your GitHub account with Nasiko.

---

## `nasiko github disconnect`

Remove the GitHub connection from your Nasiko account.

```
Usage: nasiko github disconnect
```

---

## `nasiko github repos`

List GitHub repositories accessible through your linked account.

```
Usage: nasiko github repos
```

---

## `nasiko github status`

Show the current GitHub connection status.

```
Usage: nasiko github status
```

---

## `nasiko github clone`

Clone a GitHub repository for agent workflows.

```
Usage: nasiko github clone [OPTIONS] [REPO]

Arguments:
  REPO    Repository in owner/repo format

Options:
  -b, --branch TEXT    Branch to clone
```

**Example:**

```bash
nasiko github clone my-org/my-repo --branch main
```
