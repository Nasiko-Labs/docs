# Nasiko Docs

This docs site is built with [Docusaurus](https://docusaurus.io/) and `docusaurus-plugin-openapi-docs`.

## Install

```bash
npm install
```

## Run Locally

```bash
npm start
```

## Build

```bash
npm run build
```

## Configure Interactive API Base URL

The "Try it out / Send API Request" panel in API Reference uses the OpenAPI `servers` URL.

### Source of truth

- `static/openapi.json`
  - top-level: `servers`
  - operation-level: `paths.*.*.servers`

Use a base URL **without** a trailing slash to avoid `//` in rendered endpoint URLs.

Examples:

- Local: `http://localhost:9100`
- Production: `https://nasiko.dev`

### After changing the base URL

Regenerate API docs and rebuild:

```bash
npx docusaurus clean-api-docs all
npx docusaurus gen-api-docs all
npm run build
```

If you're running the dev server, restart it after regenerating:

```bash
npm start
```

If the browser still shows stale API URLs, hard refresh (`Cmd+Shift+R` / `Ctrl+Shift+R`).
