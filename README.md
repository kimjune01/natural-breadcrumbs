# Natural Breadcrumbs

An interactive notation guide for applied category theory — a pinyin chart for mathematical symbols.

## Relationship to Natural Framework

The [Natural Framework](https://github.com/kimjune01/natural-framework) is a Lean 4 artifact formalizing a stochastic information-processing pipeline. It bridges Markov categories, Hoare logic, and graded program logics.

This site is the **onramp**. The Lean proof is the destination; this is the trailhead. It translates every symbol in the framework's papers into Python you can run in the browser.

The [Framework Lexicon](https://june.kim/framework-lexicon) maps vocabulary across research communities. This site maps vocabulary from math to code.

## Stack

- **Astro** + React + Tailwind + MDX
- **Pyodide** for client-side Python REPL
- Deployed to S3/CloudFront at `june.kim/notation/`

## Dev

```
pnpm install
pnpm dev
```

## Deploy

Built as a static site. Output goes to `dist/`, which gets synced to S3 as part of the june.kim deploy pipeline.
