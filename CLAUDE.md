# german/: Operating Rules

This folder is its own git repo (`origin` = `https://github.com/TienDatPham/german-courses`, branch `main`). It sits inside the `second-brain` working folder, but `second-brain` ignores it (`.gitignore`). The rules in the parent `CLAUDE.md` still apply; the points below add to them.

## Rules
1. **Source books are read-only.** The PDFs live in `../raw/german/` and are never edited, moved or deleted. Nothing from `raw/` is copied into this repo except exercise text needed for the sheets.
2. **Generated pages are not hand-edited.** `*-flashcards.html` and the exercise sheets come from the skills; change the source or the skill, then regenerate. Flashcard files are overwritten on each run.
3. **Vocabulary tables are Dan's data.** `new-words/*.md` rows are appended, never deleted or rewritten, unless Dan asks for a correction. Keep the header `Worter | Definition | Beispiel | Note`.
4. **No fabrication.** Definitions and examples come from your own German knowledge; say when unsure ("Noch prüfen" in Note). Exercise text is copied from the book, not invented; no solutions are made up.
5. **Self-contained pages.** One HTML file per page, no network access, no external fonts or scripts, dark mode via `prefers-color-scheme`, text inserted with `textContent` (no HTML injection). Wrap `localStorage` access in try/catch.
6. **`index.html` lists every page.** When a page is added, renamed or removed, update `index.html` (relative links only) in the same change.

## Skills (defined in `../.claude/skills/`)
- `/flashcard <table.md>` and `/flashcard --random X`
- `/neue-worter [-f] <word list>`
- `/ubung-erstellen --exercise <pdf> [--answer <pdf>]`

## Git
- This repo gets only the `german/` folder. Nothing from the parent repo goes here, and nothing from here goes to `second-brain`.
- "git commit and push" is handled as described in the parent `CLAUDE.md`: run the normal steps (status, stage by name, commit with the attribution line, push to `origin main`) inside this folder, then report.
- Never commit `.env` or secrets. Line-ending (LF/CRLF) warnings from git are harmless.

## Language
Reports to Dan in English; page content in German (UI labels in German, as in the existing pages).
