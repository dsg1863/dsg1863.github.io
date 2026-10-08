# DSG1863 Student Websites — Project Context

This is the canonical project memory for AI agents working in this repository.
It is agent-neutral (not tied to Claude, OpenCode, or any specific tool).
Read it at session start; update it whenever project state, conventions, or pending items change.

Repo: `dsg1863/dsg1863.github.io` → live at https://dsg1863.github.io. Publishes student classwork sites each semester.

## People & classes
- **Prof. Lula Rocha** (repo owner) → class **1AB**
- **Prof. João Bonelli** → class **1AA** (also pushes to the repo)
- Folder convention (decided 2026-10-07): **lowercase** `1aa-nome-sobrenome` / `1ab-...` — do NOT use uppercase
- Index links use Title Case student names (e.g. `1ab-beatriz-braga` → "Beatriz Braga")

## Workflow (Lula's choice)
- Branch per task named `lula-*`, then merge to `main` (see `Collaboration-Workflow.md`)
- Always `git pull origin main` first — João pushes frequently
- Validation rules in `Project-Publish-Checklist.md` (case-sensitive paths, no spaces/accents in filenames, asset existence, navbar)
- Navbar: `python3 navbar/inject-navbar.py` (use `--check` to preview); auto-detects semester from URL

## 2026-2 semester state (as of 2026-10-08)
- Semester page: bg `#000559`, links `#00d67c`, PUC shield opacity 0.3, favicon `imagens/fav-blue.png`
- Published: 10 × 1AA (João, incl. mariana-araujo) + 13 × 1AB (Lula, incl. maria-fernanda-bonaldo); navbar injected only into 1AB (42 pages)
- Maria Fernanda Bonaldo: student sent site as zip; `index.html` extracted from zip; `index.docx` removed by Lula; navbar injected manually (injector with default args would also touch 1AA/2026-1 pages — on hold). Gotcha: Lula once deleted `2026-2/index.html` thinking it was a leftover — it's the semester listing page, restore from git if that happens again
- Vitor Peixoto: GLightbox gallery lives at `obra-lightbox.html`; original `obra.html` preserved untouched by request
- Gabriela Loureiro: 77 MB GIF compressed to 20 MB (432×768, 12fps, 64 colors) — she requires GIF (autoplay+loop), unused MP4 removed; `memorias.html` grid overflow fixed via scoped `.img-memo img.destaque` rule (`.destaque` is shared with other pages — never edit it globally)

## Pending / known issues
- **Nuno Pereira**: `style.css` missing from his zip → page live but unstyled, waiting for him to send it
- Maria Fernanda Bonaldo's `style.css` has an unclosed `{` on `.card-content h2` (~line 217) that silently kills the following `.card` rule — her bug, mention to her if relevant
- **1AA navbar**: NOT injected (Lula said hold off — his explicit call, ask before doing)
- 1AA known issues deliberately unfixed per Lula: filenames with spaces/accents, 15–26 MB images, duplicate assets

## Gotchas learned
- YouTube embeds fail on `file://` preview (Error 153) but work on live HTTPS — don't "fix" this
- GIF vs MP4: students may require GIF for autoplay+loop without controls, even when much larger
- Keep student originals when asked (e.g. Vitor's `obra.html`) — create copies with suffix like `-lightbox`

## History of this file
- 2026-10-07 — Moved here from `~/.claude/projects/-Users-rocha/memory/` so any agent can find it; `AGENTS.md` at repo root points here
