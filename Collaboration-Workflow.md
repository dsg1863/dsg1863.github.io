# Collaboration Workflow

How Lula Rocha and Prof. João Bonelli work together in this repo without overwriting each other's work.

## The one rule

Never assume your local copy is up to date. Pull `main` before you start and before you push.

## The workflow

Every time you sit down to work:

```bash
git checkout main
git pull origin main
git checkout -b yourname-what-you-are-doing
```

Work, commit on your branch, then publish:

```bash
git checkout main
git pull origin main
git merge yourname-what-you-are-doing
git push origin main
```

- `main` holds only stable, published work.
- One branch per task, small commits.
- If you each work in your own class's folders (`1aa-*` vs `1ab-*`), merges stay clean.

## If you forgot to pull

Git will reject your push with "fetch first" or "non-fast-forward".

This is Git protecting the repo, not an error. Just run:

```bash
git pull origin main
git push origin main
```

## If you both changed the same lines

Git will stop and mark the conflict in the file.

1. Open the file and keep the correct content from both sides.
2. If unsure, talk briefly and agree on one version.
3. Then:

```bash
git add the-file
git commit
git push origin main
```

## Never do this

- Do not force-push `main` (unless both of you explicitly agree).
- Do not push without pulling first.
- Do not assume "my local copy is the latest" without checking.
