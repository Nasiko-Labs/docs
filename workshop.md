---
title: "Nasiko workshop install: instructions for a coding agent"
description: "Install Nasiko on a workshop laptop. Instructions for a coding agent."
noindex: true
---

# Nasiko workshop install: instructions for a coding agent

You are a coding agent (Claude Code or similar) helping a workshop attendee install Nasiko on their own laptop. Follow these steps in order, on your own, and keep going until the install is finished. Check that each step worked before moving to the next one.

More information is in the README at https://github.com/nasiko-labs/nasiko/ if you need it.

## Ground rules

- Work in the attendee's home directory unless they say otherwise.
- Never print, log or echo secret values (API keys, generated secrets). Confirm that a value is set without showing it.
- Never commit or push anything to git.
- If a step needs the attendee's password (for example `sudo`), stop and ask them before running it.
- The dashboard login is always username `admin` and password `changeme`. Do not change these and do not generate a different password.
- Do not change the port settings in step 4. They keep every Nasiko service on this laptop only.
- The first builds take several minutes. That is normal. Wait for them; do not cancel and restart.
- Keep the attendee informed with one short line per step, for example "Step 3 of 8: configuring .env".
- If a step fails, use the Troubleshooting table at the end, retry once, and if it still fails, tell the attendee exactly what failed and what you tried.

## Step 1: Check the platform

Run `uname -s`.

- `Darwin` means macOS. `Linux` means Linux (this includes WSL on Windows).
- If this is Windows without WSL, stop and tell the attendee to open a WSL terminal and run you there.

Remember which OS this is. Step 3 uses `sed -i.bak`, which works on both.

## Step 2: Check the prerequisites

### Docker (required)

```sh
docker compose version
docker info > /dev/null && echo "Docker is running"
```

- If `docker compose version` fails, Docker with Compose V2 is not installed. Stop and tell the attendee to install Docker Desktop or OrbStack (macOS), or Docker Engine with the Compose plugin (Linux), then run you again.
- If Docker is installed but `docker info` fails, Docker is not running. Ask the attendee to start Docker Desktop or OrbStack, wait for them to confirm, and check again.
- If Docker commands reach the wrong engine on macOS, run `docker context use orbstack` (or `desktop-linux` for Docker Desktop).

### Git (required)

Run `git --version`. If it is missing, tell the attendee to install it (on macOS, `xcode-select --install`) and wait.

### Rust 1.85 or newer (required, install it if missing)

The Nasiko CLI is built from source, so Rust is needed.

```sh
cargo --version
```

- If `cargo` is not found, install Rust without prompts:

  ```sh
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
  . "$HOME/.cargo/env"
  ```

- If the version is older than 1.85, run `rustup update stable`.
- Run `cargo --version` again and confirm it is 1.85 or newer.
- Every later shell command that uses `cargo` or `nasiko` must have Rust on the PATH. If a new shell cannot find them, run `. "$HOME/.cargo/env"` first.

### A coding agent to connect (optional check)

Note which of these exist, for the summary at the end: `claude --version`, `codex --version`, `opencode --version`. Missing ones are fine.

## Step 3: Download and configure Nasiko

### Download

If a `nasiko` folder from an earlier attempt already exists in the home directory, reuse it and run `git pull` instead of cloning again.

```sh
cd ~
git clone https://github.com/Nasiko-Labs/nasiko.git
cd nasiko
```

All later steps run from inside this `nasiko` folder.

### Create `.env` and generate secrets

```sh
cp .env.example .env
sed -i.bak "s|^SECRETS_ENCRYPTION_KEY=.*|SECRETS_ENCRYPTION_KEY=$(openssl rand -base64 32)|" .env
sed -i.bak "s|^JWT_SECRET=.*|JWT_SECRET=$(openssl rand -base64 48)|" .env
sed -i.bak "s|^AGENT_JWT_SECRET=.*|AGENT_JWT_SECRET=$(openssl rand -base64 48)|" .env
rm -f .env.bak
```

If `.env` already existed from an earlier attempt, keep its secrets and skip the `cp` and `sed` lines above.

### Set the workshop login

The login must be `admin` / `changeme` for everyone in the workshop.

```sh
grep -q '^ADMIN_USERNAME=' .env && sed -i.bak 's|^ADMIN_USERNAME=.*|ADMIN_USERNAME=admin|' .env || echo 'ADMIN_USERNAME=admin' >> .env
grep -q '^ADMIN_PASSWORD=' .env && sed -i.bak 's|^ADMIN_PASSWORD=.*|ADMIN_PASSWORD=changeme|' .env || echo 'ADMIN_PASSWORD=changeme' >> .env
rm -f .env.bak
grep '^ADMIN_' .env
```

Confirm the output shows `ADMIN_USERNAME=admin` and `ADMIN_PASSWORD=changeme`.

### Add an OpenAI key, only if one is already available

Check whether `OPENAI_API_KEY` is already set in the attendee's environment, without printing it:

```sh
[ -n "$OPENAI_API_KEY" ] && echo "OPENAI_API_KEY is set" || echo "OPENAI_API_KEY is not set"
```

- If it is set, write it into `.env` (replace the existing `OPENAI_API_KEY=` line if there is one, otherwise append it). Do not print the value.
- If it is not set, leave `.env` as it is. Do not ask the attendee for a key. The workshop adds a model provider later, in the dashboard.

## Step 4: Keep every port on this laptop

By default the stack listens on every network interface, so anyone on the same Wi-Fi could reach its database. This file binds every port to the laptop only. Create it exactly as written:

```sh
cat > docker-compose.override.yml <<'EOF'
services:
  server:         { ports: !override ["127.0.0.1:8080:8080"] }
  postgres:       { ports: !override ["127.0.0.1:5432:5432"] }
  redis:          { ports: !override ["127.0.0.1:6379:6379"] }
  rustfs:         { ports: !override ["127.0.0.1:9000:9000"] }
  otel-collector: { ports: !override ["127.0.0.1:4317:4317", "127.0.0.1:4318:4318"] }
  tempo:          { ports: !override ["127.0.0.1:3200:3200"] }
  loki:           { ports: !override ["127.0.0.1:3100:3100"] }
EOF
docker compose config > /dev/null && echo "Compose config is valid"
```

## Step 5: Start the platform and build the CLI

Both take several minutes the first time. Run them at the same time to save time.

Start the platform in the background and log its output:

```sh
nohup docker compose up -d --build > nasiko-compose.log 2>&1 &
```

While that runs, build the CLI in the foreground:

```sh
cargo install --path cli --force
nasiko --version
```

Then wait for the platform. Check every 20 seconds, for up to 20 minutes:

```sh
docker compose ps
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8080
```

The platform is ready when the services show as running (or healthy) and the `curl` command returns `200`, `301`, `302` or `307`. If `docker compose up` fails, read the end of `nasiko-compose.log`, fix the cause if it is in the Troubleshooting table, and run `docker compose up -d --build` again.

## Step 6: Connect the coding agents

```sh
nasiko agents discover
nasiko connect http://localhost:8080 --name local
nasiko auth login
```

- `nasiko agents discover` only lists the coding agents on this laptop. It changes nothing.
- `nasiko auth login` signs in with `admin` / `changeme` and installs reporting for every agent it found.
- If `nasiko auth login` opens a browser, waits for input you cannot provide, or fails, do not keep retrying. Finish the install and tell the attendee they can sign in at http://localhost:8080 with `admin` / `changeme`, and run `nasiko auth login` themselves when the presenter gets to that step.

## Step 7: Finish

Give the attendee a short summary:

- Nasiko is running at http://localhost:8080. Sign in with username `admin` and password `changeme`.
- Whether the `nasiko` CLI is installed (with its version).
- Which coding agents were found and whether `nasiko auth login` succeeded.
- These agent-specific notes, for the agents that were found:
  - **Claude Code:** reports after every turn. Nothing else to do.
  - **Codex:** the next time it starts, type `/hooks` and trust the Nasiko entries, or nothing will report.
  - **OpenCode:** restart it so it loads the plugin.
- Anything that failed, and what they should ask a workshop helper about.
- Tell them they're ready, and to follow along with the presenter for the next step.

Do not configure the LLM router, add model providers or change any settings in the dashboard. The workshop does those together.

## Troubleshooting

| You see | Do this |
|---|---|
| The first build is slow | Normal: it compiles Rust inside Docker. Keep waiting. |
| `docker compose` is not found, or only `docker-compose` works | Docker Compose V2 is needed. Ask the attendee to update Docker Desktop or install the Compose plugin. |
| Cannot connect to the Docker daemon | Docker is not running. Ask the attendee to start Docker Desktop or OrbStack. |
| Docker commands hit the wrong engine (macOS) | `docker context use orbstack` (or `desktop-linux`). |
| A port is already in use (8080, 5432, 6379 and so on) | Find what is using it with `lsof -i :<port>`. Tell the attendee what it is and ask before stopping anything. |
| The build runs out of memory or is very slow | Ask the attendee to give Docker at least 4 CPUs and 8 GB of memory in its settings, then retry. |
| `cargo: command not found` after installing Rust | Run `. "$HOME/.cargo/env"` and try again. |
| `nasiko: command not found` after the CLI build | Run `. "$HOME/.cargo/env"`, or use `~/.cargo/bin/nasiko`. |
| "Too many failed sign-ins" | Wait 15 minutes, then sign in with `admin` / `changeme`. |
| `nasiko auth login` says the login expired | Logins last 7 days; run it again. |
| Codex sessions don't appear | In Codex, type `/hooks` and trust the Nasiko entries. |

If something isn't covered here, check the README at https://github.com/nasiko-labs/nasiko/ before giving up.

## Clean up after the workshop (only if the attendee asks)

```sh
nasiko agents uninstall claude      # stop reporting; history stays
docker compose down                 # stop Nasiko; add -v to delete its data too
```
