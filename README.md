# Rao Muhammad Anwer — Academic Profile

This is a compact, responsive academic website for Rao Muhammad Anwer. Its visual
system is intentionally simple: white paper, charcoal text, one cobalt accent, system
sans-serif typography, and thin rules that organize the content like an academic index.

## Files

- `index.html` — profile, biography, research, funding, academic leadership, selected
  publications, patents, teaching, people, collaborators, and contact details.
- `publications.html` — searchable, chronologically grouped publication archive.
- `publications-data.js` — structured CV publication data used by the archive.
- `publications-page.js` — publication filtering, year grouping, and sort controls.
- `people.html` — supervision directory for postdoctoral researchers, PhD
  students, master’s students, research assistants, and visiting students.
- `styles.css` — the complete responsive visual system; no framework or webfont.
- `script.js` — mobile navigation, publication filtering, and the current footer year.
- `CV.pdf` — source curriculum vitae and downloadable publication record.

## Preview

Run a static server from the repository root:

```bash
python3 -m http.server 4173
```

Then visit:

- `http://localhost:4173/`
- `http://localhost:4173/publications.html`
- `http://localhost:4173/people.html`

## Content updates

- Keep career metrics, appointments, funding, patents, teaching, and supervision dates
  aligned with the current `CV.pdf`.
- Edit selected publication rows inside `.publication-table`.
- Keep publication `data-year` values as `2026`, `2025`, or `earlier` so the filters
  continue to work.
- Keep `publications-data.js` aligned with the numbered record beginning on page 2 of
  `CV.pdf`; the duplicate DEFT entry is represented once with both CV numbers.
- The portrait is referenced as `images/Rao-Muhammad-Anwer-secondary.jpeg`.

This version has no build step, external package, animation, or runtime dependency.
