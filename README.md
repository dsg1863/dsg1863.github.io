# DSG1863 — Práticas Experimentais III

Student websites from the Department of Arts & Design at PUC-Rio.

- **Teachers:** João Bonelli (class 1AA) & Lula Rocha (class 1AB)
- **Live at:** https://dsg1863.github.io
- **Department:** https://dad.puc-rio.br

## Structure

- `2024-2/` … `2026-2/` — one folder per semester, containing student sites (`1aa-nome-sobrenome/`, `1ab-nome-sobrenome/`)
- `navbar/` — universal navbar (runtime script + injector)
- `topbar/` — semester navigation
- `css/`, `imagens/` — shared assets
- `index.html` — home page

## Publishing a student site

1. Place the student's folder in the current semester directory (lowercase, no spaces or accents).
2. Add the student's link to the semester's `index.html`.
3. For 1AB sites, inject the navbar: `python3 navbar/inject-navbar.py`
   (see `navbar/Inject-Navbar-Instructions.md`)
4. Validate with `Project-Publish-Checklist.md` before pushing.

## Collaboration

Two teachers push to this repo. See `Collaboration-Workflow.md` — pull `main` before starting, branch per task, merge when done.
