# AGENTS.md

Guidance for AI agents (any tool: Claude, OpenCode, etc.) working in this repository.

## Project memory — read first

Read **`.agent-memory/project-context.md`** at the start of every session. It holds:

- who owns what (Lula = 1AB, João = 1AA)
- naming and workflow conventions
- current semester state
- pending tasks and known issues
- gotchas learned

**Update that file whenever project state, conventions, or pending items change.** It is the shared memory across sessions and across agents.

## Key docs

- `Collaboration-Workflow.md` — git workflow between the two teachers (always pull first, branch per task, merge to `main`)
- `Project-Publish-Checklist.md` — validation rules before publishing a student site (paths, case, assets, navbar)

## About this repo

Static site on GitHub Pages (no build step). Student websites live under semester folders (`2026-2/`, `2026-1/`, …). Shared infrastructure: `navbar/` (universal navbar injector), `topbar/` (semester navigation), `css/`, `imagens/`.
