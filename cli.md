---
title: "Nasiko CLI install: instructions for a coding agent"
description: "Install the Nasiko CLI on a workshop laptop. Instructions for a coding agent."
noindex: true
---

# Nasiko CLI install: instructions for a coding agent

You are a coding agent (Claude Code or similar) helping a workshop attendee install the Nasiko CLI on their laptop. The attendee already runs the Nasiko Desktop App; you only need to install the `nasiko` command-line tool. Follow these steps in order, on your own, and check that each step worked before moving to the next one.

More information is in the README at https://github.com/nasiko-labs/nasiko/ if you need it.

## Ground rules

- Only install the CLI. Do not start Docker, do not run `docker compose`, and do not change anything in the Desktop App.
- Do not run `nasiko connect`, `nasiko auth login` or any other `nasiko` command except `nasiko --version`. The workshop runs those together later.
- Never print, log or echo secret values. Never commit or push anything to git.
- If a step needs the attendee's password (for example `sudo`, or an installer prompt), stop and ask them before running it.
- The build takes several minutes. That is normal. Wait for it; do not cancel and restart.
- Keep the attendee informed with one short line per step, for example "Step 2 of 5: installing Rust".
- If a step fails, use the Troubleshooting table at the end, retry once, and if it still fails, tell the attendee exactly what failed and what you tried.

## Step 1: Check the platform

Run `uname -s` (on Windows PowerShell, check `$env:OS` instead).

- `Darwin` is macOS. `Linux` is Linux (including WSL).
- `Windows_NT` is native Windows. Use the Windows notes in each step.

## Step 2: Check the prerequisites

### Git

Run `git --version`.

- macOS: if it is missing, run `xcode-select --install`, tell the attendee to accept the prompt, and wait.
- Linux: if it is missing, ask before running `sudo apt-get install -y git` (or the distro's equivalent).
- Windows: if it is missing, run `winget install --id Git.Git -e`, then open a new terminal.

### Rust 1.85 or newer (install it if missing)

```sh
cargo --version
```

- macOS or Linux, if `cargo` is not found:

  ```sh
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
  . "$HOME/.cargo/env"
  ```

- Windows, if `cargo` is not found: run `winget install --id Rustlang.Rustup -e`, then open a new terminal. If the build later complains about a missing linker, the Visual Studio C++ Build Tools are needed: tell the attendee and ask before installing them.
- If the version is older than 1.85, run `rustup update stable`.
- Run `cargo --version` again and confirm it is 1.85 or newer.
- If a new shell cannot find `cargo` on macOS or Linux, run `. "$HOME/.cargo/env"` first.

## Step 3: Download the Nasiko repo

If a `nasiko` folder from an earlier attempt already exists in the home directory, reuse it and run `git pull` instead of cloning again.

```sh
cd ~
git clone https://github.com/Nasiko-Labs/nasiko.git
cd nasiko
```

## Step 4: Build and install the CLI

From inside the `nasiko` folder:

```sh
cargo install --path cli --force
nasiko --version
```

The build takes several minutes the first time. When it finishes, `nasiko --version` should print a version number. If `nasiko` is not found, try `~/.cargo/bin/nasiko --version` and see the Troubleshooting table.

## Step 5: Finish

Give the attendee a short summary:

- The `nasiko` CLI is installed, with its version.
- **Open a new terminal window** before using it, so `nasiko` is on the PATH.
- Do not run any `nasiko` commands yet. The presenter will walk the room through connecting Claude Code to the router.
- Anything that failed, and what to ask a workshop helper about.

## Troubleshooting

| You see | Do this |
|---|---|
| The build is slow | Normal: it compiles Rust. Keep waiting. |
| `cargo: command not found` after installing Rust | macOS/Linux: run `. "$HOME/.cargo/env"`. Windows: open a new terminal. |
| `nasiko: command not found` after the build | Open a new terminal, or run `. "$HOME/.cargo/env"`, or use `~/.cargo/bin/nasiko`. |
| Linker errors (`cc` not found, `link.exe` not found) | macOS: `xcode-select --install`. Linux: ask before installing `build-essential`. Windows: the Visual Studio C++ Build Tools are needed; ask before installing. |
| OpenSSL or `pkg-config` errors on Linux | Ask before installing `pkg-config` and `libssl-dev` (or the distro's equivalent). |
| The build runs out of memory | Close other heavy apps and run `cargo install --path cli --force` again. |

If something isn't covered here, check the README at https://github.com/nasiko-labs/nasiko/ before giving up.
