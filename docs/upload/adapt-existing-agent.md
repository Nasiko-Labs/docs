---
id: adapt-existing-agent
title: Adapt an Existing Agent
---

# Adapt an Existing Agent for Nasiko

This guide explains how to take an existing agent built with any framework, such as the OpenAI SDK, LangChain, CrewAI, or custom Python code, and make it publishable and runnable on Nasiko.

The core idea is simple: **an agent on Nasiko is a Docker container that runs an HTTP server speaking the A2A JSON-RPC protocol on port `5000`.**

Nasiko can auto-generate the `AgentCard.json` metadata during upload. What you must provide is a deployable container that accepts A2A requests over HTTP.

## Mental model

Adapting an existing agent means wrapping its logic with an A2A-compatible HTTP endpoint and packaging it for upload.

There are three concerns:

| Concern | What it means |
|---------|---------------|
| Packaging | Include the files Nasiko's upload validator requires. |
| Runtime | Run an HTTP server on `0.0.0.0:5000`. |
| Protocol | Accept A2A `message/send` requests and return an A2A `Task` with artifacts. |

The `AgentCard.json` file is optional. If it is missing, Nasiko generates one during upload by inspecting the agent code. You can still provide it yourself when you want direct control over name, version, skills, and metadata.

## Prerequisites

Before adapting an agent, make sure you have:

- Docker installed.
- The Nasiko CLI installed.
- An existing agent or function you can call from Python.
- Any required API keys available as environment variables.

## Required files

Nasiko validates the uploaded agent directory and rejects the upload if required files are missing or malformed.

| File | Required? | Validation rule |
|------|-----------|-----------------|
| `Dockerfile` | Yes | Must exist, be non-empty, and contain a `FROM` instruction. |
| `docker-compose.yml` | Yes | Must exist, be non-empty, parse as YAML, and contain a `services:` section. |
| Entry point | Yes | One of `src/main.py`, `main.py`, `src/__main__.py`, or `__main__.py`. Must be non-empty. |
| At least one `.py` file | Yes | The directory must contain Python files. |
| `AgentCard.json` | No | Auto-generated if missing. |
| `pyproject.toml` / `requirements.txt` | No | Not validated by upload. Dependencies are commonly installed directly in the Dockerfile. |

:::note
`pyproject.toml` is optional and is not part of upload validation. Many agents install dependencies directly in the Dockerfile with `pip install`.
:::

If you do not pass an explicit agent name during upload, Nasiko auto-detects the name from `docker-compose.yml`, using `container_name` first and then falling back to the first service name.

## Runtime contract

Your container must follow these platform assumptions:

- Listen on `0.0.0.0:5000` inside the container.
- Do not bind only to `localhost` or `127.0.0.1`.
- Serve the A2A JSON-RPC endpoint at the root path `/`.
- Read configuration and secrets from environment variables.

Nasiko deploys every uploaded agent assuming internal port `5000` and routes to it through the platform gateway. Internally, the agent is reached at a service URL such as:

```text
http://agent-<name>:5000
http://<container_name>:5000
```

During deployment, Nasiko injects environment variables into the container, including:

| Environment variable | Purpose |
|----------------------|---------|
| `AGENT_NAME` | The deployed agent name. |
| `OWNER_ID` | The owning user ID. |
| `OPENAI_API_KEY` | OpenAI key when configured for the platform. |
| Observability variables | Runtime tracing and observability configuration. |
| `WEBHOOK_URL` | Webhook URL for n8n-style agents. |

For local development, attach the container to an external `agents-net` Docker network. The example below includes this network.

## A2A protocol contract

Nasiko sends A2A JSON-RPC requests to your agent. The most common method is `message/send`.

### Request shape

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "message": {
      "role": "user",
      "parts": [{"kind": "text", "text": "Hello!"}]
    },
    "sessionId": "abc-123"
  }
}
```

Important details:

- The method is `message/send`. Some agents also support `message/stream`.
- User text lives in `params.message.parts[].text` where `part.kind == "text"`.
- For the session key, prefer `params.sessionId`, fall back to `params.contextId`, and generate one if neither is present.

### Response shape

Your agent should return a JSON-RPC response whose `result` is an A2A `Task`.

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "id": "task-uuid",
    "kind": "task",
    "status": {"state": "completed", "timestamp": "2026-01-01T00:00:00"},
    "artifacts": [{"parts": [{"kind": "text", "text": "Hi there!"}]}],
    "contextId": "abc-123"
  }
}
```

## Choose an implementation path

There are two supported ways to make your agent A2A-compliant.

| Path | Best for | Trade-off |
|------|----------|-----------|
| Option A: Hand-rolled FastAPI wrapper | Existing agents you want to adapt quickly. | Less code and framework-agnostic, but you implement the minimal response shape yourself. |
| Option B: `a2a-sdk` | Full protocol features such as streaming, task state history, and task store support. | More setup, but protocol lifecycle behavior is handled for you. |

For most existing agents, start with Option A.

## Option A: Minimal FastAPI adapter

This is the simplest path for adapting an arbitrary existing agent. The wrapper:

- Exposes `POST /`.
- Rejects methods other than `message/send` with a 404.
- Extracts text from A2A message parts.
- Calls your existing agent logic.
- Returns a JSON-RPC `Task` with `status.state = "completed"` and a text artifact.
- Exposes `GET /health`.
- Runs with `uvicorn` on `0.0.0.0:5000`.

### Project structure

```text
my-agent/
  Dockerfile
  docker-compose.yml
  src/
    __main__.py
    models.py
    agent.py
```

### `Dockerfile`

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY src/ /app
RUN pip install --no-cache-dir \
    fastapi==0.135.1 uvicorn==0.41.0 pydantic==2.12.5 \
    openai==1.82.0
RUN useradd -r -s /bin/false appuser && mkdir -p /app/.phoenix && chown -R appuser:appuser /app
USER appuser
ENV PYTHONUNBUFFERED=1
ENV HOME=/app
CMD ["python", "__main__.py"]
```

`COPY src/ /app` flattens `src/` into `/app`, so the command runs `python __main__.py`. Keep imports relative to that runtime layout.

### `docker-compose.yml`

The `5010:5000` host mapping is only for local testing. The internal container port must stay `5000`.

```yaml
services:
  my-agent:
    build: .
    container_name: my-agent
    ports:
      - "5010:5000"
    env_file:
      - .env
    networks:
      - agents-net
networks:
  agents-net:
    external: true
```

### `src/__main__.py`

```python
import logging, uuid, os
from datetime import datetime
from typing import Optional
import uvicorn
from fastapi import FastAPI, HTTPException
from agent import Agent
from models import (JsonRpcRequest, JsonRpcResponse, Message, Task,
                    TaskStatus, Artifact, ArtifactPart)

app = FastAPI()
agent: Optional[Agent] = None

@app.on_event("startup")
async def startup():
    global agent
    agent = Agent()

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/")
async def handle_rpc(request: JsonRpcRequest):
    if request.method != "message/send":
        raise HTTPException(404, detail=f"Method {request.method} not found")
    message_data = request.params.get("message", {})
    user_message = Message(**message_data)
    input_text = "".join(p.text for p in user_message.parts if p.kind == "text" and p.text)
    session_id = request.params.get("sessionId", str(uuid.uuid4()))
    response_text = agent.process_message(input_text, session_id)
    task = Task(
        id=str(uuid.uuid4()),
        status=TaskStatus(state="completed", timestamp=datetime.now().isoformat()),
        artifacts=[Artifact(parts=[ArtifactPart(text=response_text)])],
        contextId=session_id,
    )
    return JsonRpcResponse(id=request.id, result=task)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
```

### `src/models.py`

```python
import uuid
from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field

class JsonRpcRequest(BaseModel):
    jsonrpc: Literal["2.0"]
    id: str
    method: str
    params: Dict[str, Any]

class MessagePart(BaseModel):
    kind: str
    text: Optional[str] = Field(default=None, max_length=50000)

class Message(BaseModel):
    role: str
    parts: List[MessagePart]
    messageId: Optional[str] = None

class ArtifactPart(BaseModel):
    kind: str = "text"
    text: str

class Artifact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    kind: str = "text"
    parts: List[ArtifactPart]

class TaskStatus(BaseModel):
    state: str
    timestamp: str

class Task(BaseModel):
    id: str
    kind: str = "task"
    status: TaskStatus
    artifacts: List[Artifact] = []
    contextId: Optional[str] = None

class JsonRpcResponse(BaseModel):
    jsonrpc: Literal["2.0"] = "2.0"
    id: str
    result: Task
```

### `src/agent.py`

This is the file you rewrite. Put your existing agent, framework client, or orchestration code here.

```python
class Agent:
    def __init__(self):
        # init your existing agent / client / framework here
        self.sessions: dict[str, list] = {}

    def process_message(self, text: str, session_id: str = "default") -> str:
        # call your existing agent logic, return a string reply
        ...
```

## Option B: Use `a2a-sdk`

Use the SDK path when you want fuller protocol support, including streaming, task lifecycle states, task storage, and state history.

Install the HTTP server extras in your container:

```dockerfile
RUN pip install --no-cache-dir "a2a-sdk[http-server]>=0.3.0"
```

The high-level pattern is:

1. Implement an `AgentExecutor` subclass.
2. Implement `execute(context, event_queue)` and `cancel(...)`.
3. In `execute`, build a `TaskUpdater`.
4. Call `updater.submit()` if there is no current task.
5. Call `updater.start_work()`.
6. Extract text from `context.message.parts`; each `part.root` can be a `TextPart`.
7. Run your existing agent logic.
8. Call `updater.add_artifact([TextPart(text=response_text)])`.
9. Call `updater.complete()`.
10. Wire it to an HTTP server with `DefaultRequestHandler`, `InMemoryTaskStore`, and `A2AStarletteApplication`.

The server still needs to bind to `0.0.0.0:5000`, and the A2A app must be mounted at `/`.

Use Option A unless you specifically need streaming or full task lifecycle features.

## Adapt your existing agent

Use this sequence when converting a real project.

1. Create a new agent directory with `Dockerfile`, `docker-compose.yml`, and `src/`.
2. Put your existing agent code in `src/`.
3. Expose a callable such as `Agent.process_message(text, session_id) -> str`.
4. Add the A2A wrapper: `src/__main__.py` and `src/models.py`.
5. Make sure the server binds to `0.0.0.0:5000`.
6. Serve A2A JSON-RPC at `/`.
7. Add runtime dependencies to the Dockerfile `pip install` line.
8. Read secrets and configuration from environment variables.
9. Optionally provide `AgentCard.json` to control name, version, and skills.
10. Test locally.
11. Upload with the Nasiko CLI.

## AgentCard.json

`AgentCard.json` describes the agent for the registry. It is optional during upload.

If `AgentCard.json` is absent, Nasiko generates one by inspecting the entry point and code. The generator uses a server-side OpenAI key when available. If generation fails or no key is configured, Nasiko creates a minimal fallback card.

The `version` in `AgentCard.json` controls the deployed version directory, such as `agents/<name>/v1.0.0/`. If the version is absent, Nasiko defaults to `v1.0.0`.

Top-level registry validation requires:

- `name`
- `description`
- `url`
- `version`
- `capabilities`
- `skills`

Recommended capability keys:

- `streaming`
- `pushNotifications`
- `stateTransitionHistory`
- `chat_agent`

Set `chat_agent: true` for agents intended to appear in the chat UI.

### Template

```json
{
  "protocolVersion": "0.2.9",
  "name": "My Agent",
  "description": "What the agent does.",
  "url": "http://localhost:5000/",
  "preferredTransport": "JSONRPC",
  "provider": { "organization": "...", "url": "..." },
  "iconUrl": "http://localhost:5000/icon.png",
  "version": "1.0.0",
  "documentationUrl": "http://localhost:5000/docs",
  "capabilities": {
    "streaming": false,
    "pushNotifications": false,
    "stateTransitionHistory": true,
    "chat_agent": true
  },
  "securitySchemes": {},
  "security": [],
  "defaultInputModes": ["text/plain"],
  "defaultOutputModes": ["text/plain"],
  "skills": [
    {
      "id": "general-chat",
      "name": "General Chat",
      "description": "...",
      "tags": ["..."],
      "examples": ["..."]
    }
  ],
  "supportsAuthenticatedExtendedCard": false,
  "signatures": []
}
```

MIME shorthand is normalized during processing:

| Shorthand | Normalized value |
|-----------|------------------|
| `text` | `text/plain` |
| `json` | `application/json` |
| `image` | `image/png` |

## Test locally

Create an `.env` file with any keys your agent needs, then build and run the container.

```bash
cp .env.example .env          # add your keys
docker network create agents-net
docker compose up --build -d
curl -X POST http://localhost:5010/ \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":"1","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"Hello!"}]}}}'
```

Expect a JSON-RPC response where:

- `result.status.state` is `completed`
- `result.artifacts[0].parts[0].text` contains the agent reply

## Upload and publish

Upload the agent directory with the CLI:

```bash
nasiko agent upload-directory ./my-agent
```

Or upload a zip file:

```bash
nasiko agent upload my-agent.zip
```

If you provide an agent name argument or option, Nasiko uses it. Otherwise, the name is auto-detected from `docker-compose.yml`.

On upload, Nasiko:

1. Validates the directory structure.
2. Generates `AgentCard.json` if it is missing.
3. Copies the agent into a versioned directory such as `agents/<name>/v<version>/`.
4. Triggers orchestration to build the image.
5. Deploys the container on internal port `5000`.
6. Registers the agent in the registry.
7. Creates owner permissions.

When you re-upload a directory, version subdirectories such as `v1.0.2/` are skipped during zip packaging.

## Troubleshooting

| Problem | Likely cause |
|---------|--------------|
| Container is unreachable | The server is binding to `localhost` instead of `0.0.0.0`. |
| Requests return 404 | A2A is served on a path other than `/`, or the method is not `message/send`. |
| Deployment fails routing | The container is not listening internally on port `5000`. |
| Chat UI cannot read responses | The agent is returning a non-A2A response shape instead of a JSON-RPC `Task` with artifacts. |
| Upload is rejected for Dockerfile | `Dockerfile` is missing, empty, or does not contain `FROM`. |
| Upload is rejected for compose file | `docker-compose.yml` is missing, empty, invalid YAML, or lacks `services:`. |
| Runtime import error | A dependency was not added to the Dockerfile `pip install` line. |
| Multi-turn chat does not work | The adapter is not preserving `sessionId` or `contextId`. |
| Confusion about Python packaging | `pyproject.toml` is optional and is not required by upload validation. |

