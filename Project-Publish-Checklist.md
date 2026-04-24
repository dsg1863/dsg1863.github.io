# Student Project GitHub Compatibility Checklist

This checklist is intentionally narrow.

It is only for checking whether a student project is safe to publish on GitHub Pages without breaking because of:

- bad filenames
- broken paths
- missing assets
- case mismatches
- duplicated extensions
- junk files
- cross-platform issues from macOS or Windows

It is not for design review.

It does not cover:

- layout improvements
- visual polish
- hover states
- media-query quality
- typography choices
- spacing refinements

## 1. Folder and file names

Check all filenames and folder names in the student project.

- Avoid spaces in filenames and folder names.
- Avoid accents in filenames and folder names.
- Avoid special characters like `&`, `%`, `?`, `#`, `+`.
- Prefer lowercase names.
- Prefer simple separators like `-` or `_`.
- Remove duplicated extensions such as:
  - `foto.JPG.jpg`
  - `audio.mp3.mp3`
  - `index.html.html`

If a file or folder is renamed, update all references to it.

## 2. Case-sensitive path check

GitHub Pages is case-sensitive.

A path that works locally on one machine may fail when published.

Check:

- HTML references
- CSS asset URLs
- JS asset URLs
- image paths
- audio/video paths
- favicon paths

Make sure the case matches exactly.

Examples:

- code uses `Imagens/foto.png`
- real folder is `imagens/foto.png`

This can break on GitHub Pages.

## 3. Asset existence check

Every referenced file must actually exist.

Check:

- images
- CSS files
- JS files
- audio
- video
- PDFs
- icons
- fonts

Make sure:

- the file exists
- the filename is correct
- the extension is correct
- the path is correct relative to the page using it

## 4. Broken internal links

Open the student project and click all internal links.

Check:

- home page links
- page-to-page links
- “voltar” links
- links in menus
- button links
- card links

Make sure:

- every link opens a real file
- no link points to an old filename
- no link points to a deleted folder

## 5. CSS and JS loading

For every HTML page:

- confirm linked CSS files exist
- confirm linked JS files exist
- confirm paths are correct

If CSS or JS was moved or renamed, update the references.

## 6. HTML file basics

Each HTML file should at least have:

- `<!DOCTYPE html>`
- `<meta charset="utf-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- a closing `</head>`
- a closing `</body>`
- a closing `</html>`

Missing structural tags can break script injection, asset loading, or browser behavior.

## 7. Local absolute paths

Do not publish paths that point to a specific computer.

Remove things like:

- `/Users/name/...`
- `C:\Users\...`
- `file:///...`

Use relative paths instead.

## 8. Cross-platform junk files

Remove local OS junk files before publishing.

Common examples:

- `.DS_Store`
- `._filename`
- `Thumbs.db`

These should not be committed as part of the student project.

## 9. Encoding and unsafe path characters

Visible text can contain accents.

But filenames and asset paths should be safer.

Check for:

- broken encoding in HTML/CSS/JS
- strange hidden characters in filenames
- copied text that created bad filenames

Safer rule:

- visible text can use accents
- filenames and paths should usually stay ASCII-only

## 10. Navbar check if required

If the project should have the semester navbar:

- confirm the universal navbar script is present
- confirm the navbar appears
- confirm it links back to the correct semester index

For `2026-1` onward:

- use `navbar/navbar-universal.js`

If using the injector:

Preview:

```bash
python3 navbar/inject-navbar.py --check
```

Apply:

```bash
python3 navbar/inject-navbar.py
```

## 11. Secrets and unsafe files

Make sure the student project does not include:

- `.env`
- `.env.local`
- `*.pem`
- `*.key`
- private keys
- access tokens
- passwords hardcoded into files

## 12. Final publish check

Before publishing, confirm all of the following:

- filenames are safe
- no duplicated extensions remain
- paths are correct
- case matches exactly
- linked assets exist
- internal links work
- CSS and JS files load
- no local absolute paths remain
- no OS junk files remain
- no secrets are present
- navbar works if required

If all items above are true, the project is much less likely to break on GitHub Pages.
