# junekim-reading

Textbooks and research papers translated into runnable code with SVG diagrams. Live at [june.kim/reading](https://june.kim/reading/).

## Structure

```
/reading/                         📚  Landing page: glossary, foundations, papers
/reading/category-theory/         🐱  Milewski — Category Theory for Programmers (24 ch)
/reading/game-theory/             🎲  Nordstrom — Introduction to Game Theory (14 sec)
/reading/probability/             🎰  Grinstead & Snell — Introduction to Probability (12 ch)
/reading/info-theory/             📡  Shannon 1948 + Wikipedia — Information Theory (8 sec)
/reading/natural-breadcrumbs/     🍞  21 research papers decoded
/reading/scientific-method/       🔬  14 works: Bacon → Descartes → Hume → Boole → Popper → Kuhn → Mayo
/reading/cognitive-architectures/ 🏛️  5 papers: Minsky → Soar → Transformer → LLM survey → Agent stack
/reading/lean/                        Lean 4 proof navigator
```

## Sources and licenses

Every page attributes its source and inherits the source license. The site itself is CC BY-SA 4.0.

| Source | License | Content |
|---|---|---|
| Bartosz Milewski | CC BY-SA 4.0 | Category theory foundations |
| Jennifer Nordstrom | CC BY-SA 4.0 | Game theory foundations |
| Grinstead & Snell | GFDL | Probability foundations |
| Shannon 1948 | Public domain | Information theory |
| Wikipedia | CC BY-SA 4.0 | Information theory (properties, proofs) |
| 21 arXiv papers | Paper pages are CC BY-SA derivatives | Applied category theory |
| Minsky 1986 | Original expressions (CC BY-SA) | Society of Mind — design patterns |
| Laird 2022 | Original expressions (CC BY-SA) | Soar cognitive architecture |
| Vaswani et al. 2017 | Original expressions (CC BY-SA) | Transformer architecture |
| Zhao et al. 2023 | Original expressions (CC BY-SA) | LLM survey |
| Arunkumar et al. 2026 | Original expressions (CC BY-SA) | Agent architectures |

Permissive sources (MIT, Apache, CC BY) are linked as external pointers, not incorporated as derivatives. Only copyleft and public domain content is compiled into this site. See [Canon](https://june.kim/canon) for the rationale.

## Each page has

- Plain English explanation
- SVG diagrams (inline, currentColor, dark/light mode)
- Runnable Scheme REPL (BiwaScheme, primary)
- Runnable Python REPL (Pyodide, in details/summary)
- Notation reference table
- Neighbor links (prev/next, cross-references, Wikipedia)
- Source attribution with license

## Stack

- **Astro** + React + Tailwind
- **Pyodide** for client-side Python
- **BiwaScheme** for client-side Scheme
- Deployed to S3/CloudFront at `june.kim/reading/`

## Dev

```
pnpm install
pnpm dev        # localhost:12345
```

## Deploy

Built as a static site. Output goes to `dist/`, synced to S3 via the june.kim deploy pipeline (`bash deploy.sh` in the blog repo).

## Adding a new book

1. Verify the source is copyleft or public domain
2. Add a directory under `src/pages/` (e.g., `src/pages/algebra/`)
3. Create an index page and chapter pages following the existing template
4. Pick an emoji, add a `favicon` prop to the Layout
5. Add the book to the foundations table on `src/pages/index.astro`
6. Add the domain to PageLeft's copyleft allowlist if applicable
7. Update this README
