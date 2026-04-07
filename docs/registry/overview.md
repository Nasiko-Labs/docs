---
id: overview
title: Overview
---

# Agent Registry

The Agent Registry is the source of truth for all agents on the platform. Each entry is an **A2A-compatible agent card** — a structured description of an agent's identity, capabilities, transport preferences, and skills.

## Key Concepts

| Concept | Description |
|---------|-------------|
| `agent_id` | Unique stable identifier (UUID) |
| `agent_name` | Human-readable slug (e.g., `weather-agent`) |
| `version` | Semver string (e.g., `1.0.0`) |
| `owner_id` | User ID of the agent owner |
| `url` | Endpoint where the agent serves A2A requests |

## Agent Card Structure

Registry entries follow the [A2A Agent Card spec](https://google.github.io/A2A/). Required fields:

- `id` — unique agent ID
- `name` — display name
- `description` — what the agent does
- `url` — service endpoint
- `owner_id` — owner's user ID
