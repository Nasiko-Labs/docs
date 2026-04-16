---
title: chat
sidebar_position: 7
---

# nasiko chat

Start and manage interactive chat sessions with deployed agents.

## `nasiko chat start`

Begin an interactive chat session with an agent.

```
Usage: nasiko chat start [OPTIONS] AGENT_NAME

Arguments:
  AGENT_NAME    Name of the agent to chat with [required]
```

**Example:**

```bash
nasiko chat start my-agent
```

---

## `nasiko chat sessions`

List chat sessions.

```
Usage: nasiko chat sessions [OPTIONS]

Options:
  -l, --limit INTEGER      Number of sessions to return [default: 10]
  --cursor TEXT             Pagination cursor
  --direction TEXT          Pagination direction [default: after]
```

---

## `nasiko chat history`

Get messages from a chat session.

```
Usage: nasiko chat history [OPTIONS] SESSION_ID

Arguments:
  SESSION_ID    Chat session ID [required]

Options:
  -l, --limit INTEGER      Number of messages to return [default: 50]
  --cursor TEXT             Pagination cursor
  --direction TEXT          Pagination direction [default: after]
```

---

## `nasiko chat drop`

Delete a chat session.

```
Usage: nasiko chat drop SESSION_ID

Arguments:
  SESSION_ID    Chat session ID to delete [required]
```

---

## `nasiko chat send`

Send a single message to an agent without entering interactive mode.

```
Usage: nasiko chat send [OPTIONS]

Options:
  -u, --url TEXT           Agent endpoint URL [required, prompted]
  -s, --session-id TEXT    Session ID [required, prompted]
  -m, --message TEXT       Message content [required, prompted]
```

**Example:**

```bash
nasiko chat send \
  --url https://nasiko.dev/api/v1/chat \
  --session-id abc-123 \
  --message "What is the status of ticket #456?"
```

---

## Deprecated commands

These commands are hidden and will be removed in a future release:

| Command | Replacement |
|---------|-------------|
| `nasiko chat create-session --agent <name>` | `nasiko chat start <name>` |
| `nasiko chat list-sessions` | `nasiko chat sessions` |
| `nasiko chat delete-session <id>` | `nasiko chat drop <id>` |
