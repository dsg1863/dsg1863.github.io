# Collaboration Workflow

This document explains how Lula Rocha and Prof. Joao Bonelli should work together in this repository without overwriting each other's work.

## Core rule

Never assume your local copy is up to date.

Before starting work, always update your local repository from GitHub first.

## Current setup

- Main branch: `main`
- Remote: `origin`
- Repository: `dsg1863/dsg1863.github.io`

## Recommended rule of thumb

- Use `main` only for stable, published work.
- Do new work in a branch.
- Merge to `main` only after updating from GitHub and checking the result.

This is the safest workflow when two teachers are editing the same website.

## Daily workflow

### 1. Start the day

Open Terminal inside the repo and run:

```bash
git checkout main
git pull origin main
```

This updates your local `main` with the latest work from GitHub.

### 2. Create a branch for your work

Example:

```bash
git checkout -b lula-update-2026-1-links
```

Prof. Joao should also create his own branch when he starts new work:

```bash
git checkout -b joao-update-1aa-projects
```

### 3. Work normally

Edit files, test locally, and commit on your branch.

Example:

```bash
git add .
git commit -m "Update 2026-1 links"
```

### 4. Update from main before pushing

Before sending your branch to GitHub, bring in the newest `main`:

```bash
git checkout main
git pull origin main
git checkout lula-update-2026-1-links
git rebase main
```

If there are no conflicts, your branch is now based on the latest published version.

### 5. Push the branch

```bash
git push -u origin lula-update-2026-1-links
```

### 6. Merge to main

Safest option:

- Open the branch on GitHub
- Create a Pull Request
- Review the changes
- Merge into `main`

Fast option if the change is simple and you are sure it is safe:

```bash
git checkout main
git pull origin main
git merge lula-update-2026-1-links
git push origin main
```

## Scenario 1: Prof. Joao updates something, and you have not started yet

What happens:

- He pushes his work to GitHub first.
- Your local copy becomes older than GitHub.

What you should do:

```bash
git checkout main
git pull origin main
```

Result:

- Your local repo now includes his changes.
- You can start your own branch from the updated version.

## Scenario 2: You update something, and Prof. Joao has not started yet

What happens:

- You push your work first.
- His local copy becomes older than GitHub.

What Prof. Joao should do:

```bash
git checkout main
git pull origin main
```

Result:

- His local repo now includes your changes.
- He can start a new branch from the updated version.

## Scenario 3: Both of you change different files

Example:

- Lula updates `2026-1/index.html`
- Joao adds files in `2026-1/1AA_julia/`

What happens:

- Git usually merges this cleanly.

Safe workflow:

1. Each person works in their own branch.
2. The first person merges to `main`.
3. The second person runs:

```bash
git checkout main
git pull origin main
git checkout my-branch
git rebase main
```

4. If rebase succeeds, the second person pushes and merges their branch.

Result:

- Both sets of changes are preserved.

## Scenario 4: Both of you change the same file, but in different parts

Example:

- Lula adds links for `1AB` students in `2026-1/index.html`
- Joao adds links for `1AA` students in the same file

What happens:

- Git may merge automatically if the edits are far apart.
- If Git cannot merge automatically, it creates a conflict.

What to do:

```bash
git checkout main
git pull origin main
git checkout my-branch
git rebase main
```

If there is a conflict:

1. Open the file.
2. Git will show conflict markers.
3. Keep the correct content from both sides.
4. Then run:

```bash
git add path/to/file
git rebase --continue
```

Result:

- The final file contains both sets of intended changes.

## Scenario 5: Both of you change the same exact line

Example:

- Both of you edit the same link, same path, or same text in the same line

What happens:

- Git will stop and ask for manual conflict resolution.

What to do:

1. Talk briefly and decide which version is correct.
2. Edit the file manually.
3. Continue the rebase:

```bash
git add path/to/file
git rebase --continue
```

Result:

- One final agreed version is kept.

## Scenario 6: One person forgets to pull and tries to push directly to main

What happens:

- Git rejects the push with a message like "fetch first" or "non-fast-forward".

This is good.

It means Git is protecting the remote repository from accidental overwrite.

What to do:

```bash
git checkout main
git pull --rebase origin main
```

If there are local uncommitted changes, commit or stash them first.

Then push again:

```bash
git push origin main
```

## Scenario 7: Someone force-pushes main

What happens:

- Remote history changes.
- The other person's local `main` may no longer match GitHub history.

This should be rare.

Only do this if both people explicitly agree that the local repo should replace remote history.

If it happens, the other person should sync carefully:

```bash
git fetch origin
git checkout main
git reset --hard origin/main
```

Warning:

- This discards local uncommitted changes on `main`.
- Do not run it unless you are sure your local work is already committed somewhere else or no longer needed.

## Best practices for this project

- One branch per task.
- Small commits with clear messages.
- Pull from `main` before starting work.
- Rebase your branch on the newest `main` before merging.
- Use Pull Requests when the change is not trivial.
- Do not force-push `main` in normal day-to-day work.
- If both of you are editing `2026-1/index.html`, coordinate first.
- If one person is handling `1AA` and the other is handling `1AB` or `1AF`, keep that split explicit.

## Suggested branch naming

- `lula-2026-1-links`
- `lula-navbar-update`
- `joao-1aa-upload`
- `joao-index-links`

## Practical minimum workflow

If you want the shortest safe version, use this every time:

```bash
git checkout main
git pull origin main
git checkout -b my-branch-name
```

Work, then:

```bash
git add .
git commit -m "Describe the change"
git checkout main
git pull origin main
git checkout my-branch-name
git rebase main
git push -u origin my-branch-name
```

Then merge to `main` on GitHub.

## What not to do

- Do not both work directly on `main` at the same time.
- Do not push without pulling first.
- Do not use `--force` on `main` unless both people agree.
- Do not assume "my local copy is latest" without checking.

## Recommended decision

For this project, the best default workflow is:

1. Update local `main`
2. Create a branch
3. Work and commit
4. Rebase on latest `main`
5. Push branch
6. Merge branch into `main`

That gives both teachers a clear, safe, low-risk workflow.
