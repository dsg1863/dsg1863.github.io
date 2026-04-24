# Inject Navbar Instructions

This project uses a shared navbar runtime plus a small injector script to add the navbar loader to semester project pages.

Files:
- Runtime: `navbar/navbar-universal.js`
- Legacy styles: `navbar/navbar-styles.css`
- Injector: `navbar/inject-navbar.py`

This workflow is intended for macOS.

## What the injector does

The injector scans semester folders and adds this script tag to student project HTML files:

```html
<script src="../../navbar/navbar-universal.js" defer></script>
```

The exact relative path is calculated automatically for each file.

The runtime script then:
- detects the semester from the page path
- creates the bottom-right "Projetos YYYY-S" navbar link
- applies its own isolated styling for `2026-1` onward

## What it does not change

The injector is set up to skip semester landing pages such as:

```text
2026-1/index.html
2026-2/index.html
```

It targets student project pages inside each semester folder.

## Before you run it

On macOS, open Terminal and go to the site folder:

```bash
cd "/Volumes/Crucial X9/dsg1863.github.io"
```

## Check what would change

To preview which files need navbar injection:

```bash
python3 navbar/inject-navbar.py --check
```

## Run the injector

To process `2026-1` and every later semester folder:

```bash
python3 navbar/inject-navbar.py
```

## Run it for a future semester

If you want to start from a later semester, use `--start-semester`:

```bash
python3 navbar/inject-navbar.py --start-semester 2026-2
```

Examples:
- `2026-1` processes `2026-1`, `2026-2`, `2027-1`, and later
- `2026-2` skips `2026-1` and starts at `2026-2`

## Typical semester workflow on Mac

1. Add the new semester folder and student project files to the site.
2. Open Terminal.
3. Go to the repo folder:

```bash
cd "/Volumes/Crucial X9/dsg1863.github.io"
```

4. Preview changes:

```bash
python3 navbar/inject-navbar.py --start-semester 2026-2 --check
```

5. Apply changes:

```bash
python3 navbar/inject-navbar.py --start-semester 2026-2
```

6. Open the semester locally in a browser and click into student pages to confirm the navbar appears in the bottom-right corner.
7. Commit and publish when ready.

## Local testing on macOS

You can test by opening the main site locally in your browser and navigating into a semester page.

Example local file path:

```text
file:///Volumes/Crucial%20X9/dsg1863.github.io/index.html
```

The universal navbar is designed to work both:
- on GitHub Pages
- when opening local files on macOS

## If a page already has an old navbar script

The injector can replace old semester navbar script tags such as:

```html
<script src="../../navbar/navbar-2025-2.js"></script>
```

with the universal script tag.

## Legacy CSS note

Older student pages from previous semesters may still reference:

```html
<link rel="stylesheet" type="text/css" href="../../navbar/navbar-styles.css">
```

Keep `navbar/navbar-styles.css` in the repo for backward compatibility with those older pages.

For `2026-1` onward, the universal runtime is self-styled and does not depend on that external CSS file.

## Recommended check after running

Use this command to confirm there is nothing left to inject:

```bash
python3 navbar/inject-navbar.py --check
```

Expected result:

```text
0 file(s) need navbar injection.
```
