# Goal

The Rosetta stone, but you can touch it.

Natural Breadcrumbs helps people understand one research paper at a time by mapping notation to runnable Python, diagrams, and plain English — then linking each paper to its neighbors.

## The problem

Academic papers are dense by necessity — page limits, peer reviewers who expect jargon, citation conventions that assume shared context. Many papers are more approachable than they look once notation and context are unpacked. But not all — some concepts are genuinely hard. The site should be honest about that.

The [Framework Lexicon](https://june.kim/framework-lexicon) maps vocabulary between researchers. The [Lean artifact](https://github.com/kimjune01/natural-framework) machine-checks the claims. The [cognition series](https://june.kim/cognition) explains the motivation in prose. But none of these are *navigable as a learning experience* — one is a table, one is source code, one is a blog.

This site is the missing layer: the Rosetta stone you can walk through, the papers you can read without a PhD, the ideas demonstrated in code you already know.

We face none of academia's constraints. No page limits. No jargon requirements. No assumed context. Every concept gets as much space as it needs.

## The reader

Two readers, one site. The academic's needs win when they conflict with the programmer's.

**Primary: the adjacent academic.** Expert in one ACT subfield, siloed. Knows their own notation cold but hasn't read the neighboring papers. Arrives from Fritz's page and wants to see how support connects to Hoare logic. Arrives from Hedges and wants to see how equilibrium predicates relate to contracts. Uses the cross-links and notation tables. The code examples are a bonus, not the draw — the draw is seeing their work in context. We assume freshman CS at minimum (they all took algorithms), but not fluency in any particular programming language.

**Secondary: the curious programmer.** Reads Hacker News. Knows freshman CS — pigeonhole principle, big-O, basic probability, what `assert` does. Has never opened a category theory paper. Has heard the word "monad" in a Haskell joke but couldn't define it. Would click a link titled "why Hoare logic is just assert/run/assert" but would bounce off one titled "posetal imperative multicategories." Willing to spend 15–30 minutes to understand one paper's key idea. Uses the code examples and diagrams. The cross-links are a bonus.

**When they conflict:** The academic's needs win. If a page could be more precise at the cost of being less approachable, be precise. The programmer can follow a Wikipedia link for background. The academic can't unsee a sloppy translation.

**Not the reader:** Someone learning Python. Someone seeking a bottom-up category theory curriculum. Someone needing formal fidelity beyond disclosed translation limits.

Python is the medium, not the subject. We assume the reader can read code. We don't assume they can read math outside their own subfield.

## The product

An interactive paper decoder — part reading guide, part REPL, part knowledge graph.

### Primary function: paper decoder
Each paper gets a page that unpacks its key idea into plain English, diagrams, and runnable code.

### Secondary function: notation crosswalk (planned)
A symbol grid for quick lookup — every symbol translated to Python. Data exists in `src/data/symbols.ts`; route not yet shipped.

### Later function: knowledge graph
Cross-links between papers, blog posts, and foundations emerge as pages accumulate.

### Three source layers, one site

1. **Papers** (the Lexicon authors) — the theorems, translated to runnable code
2. **Blog posts** (the [cognition series](https://june.kim/cognition)) — the motivation, in prose. Already written.
3. **Foundations** (Wikipedia, external) — boolean logic, entropy, Bayes' theorem, stochasticity, CLT. Link out shamelessly. Don't rewrite what's already well-explained.

### Site structure

**Landing page** — not the symbol grid. A plain-English orientation: what this site is, who it's for, and a table of papers with one-sentence descriptions. "Start here." The symbol grid is secondary navigation for returning readers.

**Paper pages** (one per paper in the Lexicon) — the core. Each paper gets a route:

- `/natural-breadcrumbs/staton-2025/` — Program Logics via Distributive Monoidal Categories
- `/natural-breadcrumbs/fritz-2020/` — A Synthetic Approach to Markov Kernels
- `/natural-breadcrumbs/fritz-perrone-2021/` — Support as Monad Morphism
- `/natural-breadcrumbs/gaboardi-2021/` — Graded Hoare Logic
- `/natural-breadcrumbs/kura-2026/` — Indexed Graded Monads
- `/natural-breadcrumbs/hedges-2018/` — Compositional Game Theory
- `/natural-breadcrumbs/capucci-2021/` — Categorical Cybernetics
- `/natural-breadcrumbs/baez-fritz-2011/` — Entropy Characterization
- `/natural-breadcrumbs/liell-cock-2025/` — Compositional Imprecise Probability
- `/natural-breadcrumbs/sato-2023/` — Divergences on Monads

**How to use this site** (`/natural-breadcrumbs/how/`) — for readers unfamiliar with browser REPLs. What is the green box? What does "Run" do? Can I break anything? (No.) How to modify an example. How to read Python if you're a Haskell/OCaml/math person. Short page, mostly screenshots. Gets an academic who's never used a Jupyter notebook to the point where they can click Run and modify a variable.

**Symbol grid** (`/natural-breadcrumbs/symbols/`) — appendix. Quick reference for returning readers. No heavy notation on the landing page — save it for here. Click a symbol, see the code, run it.

**Framework page** (`/natural-breadcrumbs/framework/`) — orientation to the Natural Framework's own vocabulary. The six stages (Perceive → Cache → Filter → Attend → Remember → Consolidate), where they came from (Landauer's principle, pigeonhole argument, information budget), and how the framework's terms map to the paper terms. Short lineage: Landauer 1961 → Shannon → Fritz → this pipeline. This is the page that helps a reader who arrived from the Lexicon or the blog understand the framework's own lingo before diving into individual papers.

**History page** (`/natural-breadcrumbs/history/`) — stretch goal. The five lineages (program correctness, category theory, information theory, game theory, cybernetics) traced from Turing and Church to the present. Fun to write, unproven as a user need. Build it if the core pages work.

### Paper page ingredients

Not all required. Pick what serves the paper. The list:

- One-sentence summary (no jargon)
- Diagrams / SVGs where they help
- Link to the cognition series post that motivated the connection
- Notation table (new symbols → Python)
- The punchline theorem in both paper notation and Python
- Confidence tag (exact / simplified / analogy)
- Two REPLs: Python (Pyodide) for intuition, BiwaScheme for categorical structure. Both preloaded with the key example, both client-side, no server needed. The programmer sees plain functions. The academic sees composition-native Scheme. Same theorem, two languages.
- Inline Lean snippets where available (syntax-highlighted, read-only). Only on Staton page currently — not a general ingredient yet.
- Outward links (Wikipedia, arXiv, blog) — grouped by type: other papers, blog motivation, foundations
- Neighbor links to related paper pages
- Explicit prereqs at the top if needed ("assumes you've seen X, 2 min") — or "no prerequisites" if it's an entry point
- Translation notes near the end — what's simplified, what's lost, what's exact. Negation comes after understanding, not before.
- Shared Pyodide runtime across all REPLs on a page (module-level singleton, one download)
- Output hidden until Run — no placeholder text, no empty box
- Page-number deep links to the paper ("start at Section 5.1, p.20")

### The knowledge graph

Each page is a node, not a chapter. The reader lands on one node and follows edges. Some edges go through the pipeline. Some go directly between papers. Some go to Wikipedia. No forced path. Every node is an entry point.

Three kinds of edges:
- **Paper ↔ Paper**: shared concepts (e.g. Fritz and Staton both use copy-discard categories)
- **Paper ↔ Blog post**: motivation (e.g. Staton 2025 ↔ /ambient-category)
- **Paper ↔ Wikipedia**: foundations (e.g. Fritz 2020 ↔ Markov chain, Staton 2025 ↔ Hoare logic)

The pipeline is one path through the graph — a thematic crosslink, not the required route. The reader might care about the pipeline. Or they might care about how their own paper connects to an adjacent field. Both are valid.

## Core user loop

Arrive from a paper, blog, or link → read the claim in plain English → look at the diagram → run/modify the example → map a few symbols to code patterns → follow a neighbor link or open the original paper → leave with one durable insight.

## Design principles

- **Code is the explanation.** If you can't run it, it's not explained.
- **Diagrams decompress.** Dense papers need visual unpacking — SVGs, flow diagrams, charts. Don't rely on text alone.
- **The reaction is "duh."** Every concept should feel obvious once you see the code and the diagram. If the reader says "of course, that's just X" — you succeeded.
- **Wikipedia density.** One tight paragraph per concept. The REPL and diagrams do the decompression. The reader chooses their depth.
- **No hidden prerequisites.** Each page is self-contained for its core idea. But if a concept is genuinely hard and builds on another page's idea, say so at the top: "This page assumes you've seen [Hoare triples](/natural-breadcrumbs/staton-2025/). 2 minutes." Prereqs are explicit, linked, and estimated. Never hidden.
- **Jargon earns its way in.** Every technical term appears first in code, then gets its math name. Never the reverse.
- **Confidence is explicit.** Each Python translation is tagged (see editorial rules).
- **Link out freely.** Wikipedia, arXiv, blog posts. Don't rewrite what's already well-explained. Spend words on the part nobody else has written.

## Editorial rules

Each Python example states its relationship to the paper:

- **Exact**: this code IS the theorem. The Python computes the same thing the paper proves. If the paper says "support_bind is the monad multiplication," the Python demonstrates that exact law.
- **Simplified**: same idea, fewer dimensions. The paper works over arbitrary measurable spaces; the Python uses finite dicts. The structure is preserved; the generality is not.
- **Analogy**: structural parallel, different category. The paper proves compositionality for optics; the Python shows compositionality for plain functions. Same pattern, different setting. Labeled clearly.

When a translation is lossy, say so. When a concept is genuinely hard even after unpacking, say so. Trust comes from honesty, not from pretending everything is simple.

### Selection discipline

A paper gets a page only if it's referenced from the [cognition series](https://june.kim/cognition). That's the filter. If the blog never needed the paper to make its argument, the paper doesn't belong here. This keeps the scope tied to the framework's actual usage, not to completeness ambitions.

## What this is NOT

- Not a Python tutorial. Python is the medium, not the subject.
- Not comprehensive. It covers the papers in the Lexicon and the cognition series, not all of category theory.
- Not bottom-up. It doesn't start with "what is a category." It starts with one paper's key idea and links outward.
- Not a replacement for the papers. After reading a page, you should be able to open the actual paper and follow the main argument. That's the goal — not to spare you from reading the paper, but to make the paper readable.

## Success criteria

**Per-page bar** (what each page must achieve):
- A cold reader can explain the page's theorem in plain English.
- A cold reader can modify the example and predict what should happen.
- A cold reader can map at least three paper symbols to code constructs.
- A cold reader can decide whether to continue to the original paper rather than bouncing.

**Site-wide bar** (when all ten pages are done):
- A programmer who spends an hour can follow the main argument of any paper in the Lexicon.
- A researcher in one subfield can navigate to adjacent work and understand the connection.

## Checkpoints

Each checkpoint is where I apply Attend — revisit goal.md, assess what worked, tighten or loosen the page template, update editorial rules based on what I learned building the previous pages. This is the author learning loop. No analytics needed — I'm the test reader and the test academic.

**Checkpoint 1**: Staton 2025 page, end to end. Does the format click? What ingredients did the page actually need? What was dead weight? Update goal.md. **Done.** Reference implementation: [`src/pages/staton-2025/index.astro`](src/pages/staton-2025/index.astro).

**Checkpoint 2**: Three pages (Staton, Fritz, Baez-Fritz-Leinster). Do cross-links work? Does arriving from one page and clicking to another feel natural? Which page template ingredients generalized and which were paper-specific? Update goal.md. **Done.**

**Checkpoint 3**: All ten paper pages + landing page. **Done.** Shipped: landing page with paper index, ten paper pages with dual REPLs, cross-links with emoji prefixes. Not yet shipped: `/how/`, `/symbols/`, `/framework/`, `/history/` — these are planned, not blocked on.

## Foundations: Category Theory for Programmers

Based on Bartosz Milewski's blog series (CC BY-SA 4.0). 24 chapters, each getting a breadcrumbs page in the same format as the paper pages — runnable Python, diagrams, notation tables, plain English.

**Audience:** Milewski's audience (programmers). The paper pages above assume concepts that live here. A paper page links *down* to a foundation page when it uses a concept the reader might not have seen.

**Attribution:** CC BY-SA 4.0. Every page cites Milewski as the source. The license requires share-alike, which Natural Breadcrumbs already satisfies.

**Format differences from paper pages:**
- Source is a blog post, not a research paper — no arXiv link, no page-number deep links
- Code examples translate Haskell to Python (Milewski uses Haskell throughout)
- Confidence tags still apply: exact / simplified / analogy
- Cross-links go *up* to paper pages that use the concept and *across* to other foundation chapters

**Selection discipline:** All 24 chapters from the three-part series. Unlike paper pages (which require a cognition series reference), the foundations section is comprehensive — it's a curriculum, not a curated selection.

**Routes:** `/natural-breadcrumbs/milewski-01/` through `/natural-breadcrumbs/milewski-24/`

## Stretch goals
- "Reading mode" — paste a paper abstract, every symbol gets hover tooltips
- Bidirectional links — the Lexicon links to this site, this site links to the Lexicon
- Annotation layer — readers suggest better Python translations via PR
- Visual state traces — see data flow through the pipeline stages
- Graph visualization — interactive map of all nodes and edges
