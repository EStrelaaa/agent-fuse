# fuse-agent

A proof-of-concept showing how to use FUSE to expose arbitrary data (in this case, emails from a database) as a filesystem for an AI agent.

Read the full writeup: [FUSE is all you need]([https://example.com/blog](https://jakobemmerling.de/posts/fuse-is-all-you-need/))

## What's in here

- A FUSE filesystem that maps email folders and messages from a database to files and directories
- A simple agent loop using the Anthropic Agent SDK that can navigate and organize emails via standard Unix commands

## Running locally

You'll need Docker

```bash
# Set your API key
export ANTHROPIC_API_KEY=sk-...

# Run it
pnpm start
```

This builds the container, mounts the FUSE filesystem at `/workspace`, seeds some example emails, and drops you into an agent chat.

## Project structure

```
src/
  main.ts          # Entry point: mounts FS, seeds DB, starts agent
  agent.ts         # Agent loop with Bash/Read/Glob tools
  db/              # Database schema and seed data (PGlite + Drizzle)
  fuse/
    ops/           # FUSE operations: readdir, read, rename, etc.
    helpers.ts     # Utilities for path parsing, virtual folders
```
