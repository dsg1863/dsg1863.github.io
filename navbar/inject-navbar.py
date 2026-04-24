#!/usr/bin/env python3

from __future__ import annotations

import argparse
import os
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
SEMESTER_RE = re.compile(r"^(\d{4})-(\d)$")
SCRIPT_RE = re.compile(r"<script[^>]*src=[\"'][^\"']*(navbar-universal\.js|navbar-\d{4}-\d\.js)[^\"']*[\"'][^>]*>\s*</script>|<script[^>]*src=[\"'][^\"']*(navbar-universal\.js|navbar-\d{4}-\d\.js)[^\"']*[\"'][^>]*>", re.IGNORECASE)
HEAD_RE = re.compile(r"</head\s*>", re.IGNORECASE)


def semester_sort_key(name: str) -> tuple[int, int]:
    match = SEMESTER_RE.match(name)
    if not match:
        raise ValueError(f"Invalid semester folder: {name}")
    return int(match.group(1)), int(match.group(2))


def iter_target_files(start_semester: str) -> list[Path]:
    minimum = semester_sort_key(start_semester)
    files: list[Path] = []

    for semester_dir in sorted(ROOT.iterdir()):
        if not semester_dir.is_dir():
            continue
        if not SEMESTER_RE.match(semester_dir.name):
            continue
        if semester_sort_key(semester_dir.name) < minimum:
            continue

        for html_file in sorted(semester_dir.rglob("*.html")):
            relative = html_file.relative_to(ROOT)
            if len(relative.parts) < 3:
                continue
            files.append(html_file)

    return files


def make_script_tag(html_file: Path) -> str:
    relative_src = Path(
        os.path.relpath(ROOT / "navbar/navbar-universal.js", start=html_file.parent)
    ).as_posix()
    return f'<script src="{relative_src}" defer></script>'


def inject_script(html_file: Path) -> bool:
    content = html_file.read_text(encoding="utf-8")

    script_tag = make_script_tag(html_file)
    existing_match = SCRIPT_RE.search(content)

    if existing_match:
        if script_tag in existing_match.group(0):
            return False
        updated_content = SCRIPT_RE.sub(script_tag, content, count=1)
        html_file.write_text(updated_content, encoding="utf-8")
        return True

    replacement = f"    {script_tag}\n</head>"
    updated_content, count = HEAD_RE.subn(replacement, content, count=1)

    if count == 0:
        raise ValueError(f"Missing </head> in {html_file}")

    html_file.write_text(updated_content, encoding="utf-8")
    return True


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Inject the universal navbar script into semester project pages."
    )
    parser.add_argument(
        "--start-semester",
        default="2026-1",
        help="First semester folder to process, default: 2026-1",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Report which files would change without writing them",
    )
    args = parser.parse_args()

    changed_files: list[Path] = []
    for html_file in iter_target_files(args.start_semester):
        content = html_file.read_text(encoding="utf-8")
        if not HEAD_RE.search(content):
            raise ValueError(f"Missing </head> in {html_file}")
        current_tag = make_script_tag(html_file)
        existing_match = SCRIPT_RE.search(content)
        if existing_match and current_tag in existing_match.group(0):
            continue
        changed_files.append(html_file)

    if args.check:
        for path in changed_files:
            print(path.relative_to(ROOT))
        print(f"\n{len(changed_files)} file(s) need navbar injection.")
        return 0

    updated_count = 0
    for html_file in changed_files:
        if inject_script(html_file):
            print(f"updated {html_file.relative_to(ROOT)}")
            updated_count += 1

    print(f"\nUpdated {updated_count} file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
