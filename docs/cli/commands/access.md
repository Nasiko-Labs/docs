---
title: access
sidebar_position: 10
---

# nasiko access

Grant and revoke access relationships between users, agents, and a target agent.

## `nasiko access grant-user`

Grant one or more users access to an agent.

```
Usage: nasiko access grant-user [OPTIONS] AGENT_ID

Arguments:
  AGENT_ID    Target agent ID [required]

Options:
  -u, --user-id TEXT    User ID to grant access (repeatable) [required]
```

**Example:**

```bash
nasiko access grant-user abc-123 --user-id user-1 --user-id user-2
```

---

## `nasiko access grant-agent`

Grant one or more agents access to a target agent (agent-to-agent communication).

```
Usage: nasiko access grant-agent [OPTIONS] AGENT_ID

Arguments:
  AGENT_ID    Target agent ID [required]

Options:
  -a, --agent-id TEXT    Agent ID to grant access (repeatable) [required]
```

**Example:**

```bash
nasiko access grant-agent abc-123 --agent-id agent-456
```

---

## `nasiko access list`

List all access grants for an agent.

```
Usage: nasiko access list AGENT_ID

Arguments:
  AGENT_ID    Agent ID [required]
```

---

## `nasiko access revoke-user`

Revoke user access from an agent.

```
Usage: nasiko access revoke-user [OPTIONS] AGENT_ID

Arguments:
  AGENT_ID    Target agent ID [required]

Options:
  -u, --user-id TEXT    User ID to revoke (repeatable) [required]
```

---

## `nasiko access revoke-agent`

Revoke agent-to-agent access.

```
Usage: nasiko access revoke-agent [OPTIONS] AGENT_ID

Arguments:
  AGENT_ID    Target agent ID [required]

Options:
  -a, --agent-id TEXT    Agent ID to revoke (repeatable) [required]
```
