---
id: intro
title: Introduction
sidebar_position: 1
slug: /intro
---

# Nasiko API

Nasiko is an **agent registry and observability platform**. Register, deploy, update, and monitor AI agents — whether they're containerized services, n8n workflows, or anything that speaks the A2A protocol.

## Base URL

```
https://nasiko.dev/api/v1
```

All endpoints are prefixed with `/api/v1`.

## Response Format

Every response uses a consistent envelope:

```json
{
  "data": { ... },
  "status_code": 200,
  "message": "Success"
}
```

## Authentication

Most endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your-token>
```

See [Authentication](/authentication) to get your token via JWT or GitHub OAuth.

## Rate Limits

The API does not currently enforce public rate limits.
