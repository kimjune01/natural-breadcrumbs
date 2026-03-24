# Foundations Expansion Plan

Three new foundation sections for Natural Breadcrumbs. Same format as Milewski (🐱) and Nordstrom (🎲): runnable Python/Scheme REPLs, SVG diagrams, CC-compatible attribution.

## 1. Probability & Statistics 🎰

**Source:** Grinstead & Snell, *Introduction to Probability* (GFDL, no invariant sections)
- https://math.dartmouth.edu/~prob/prob/prob.pdf
- Full probability textbook: conditional probability, Bayes, distributions, expectation, Markov chains
- Published by AMS

**Runner-up:** OpenIntro Statistics (CC BY-SA 3.0) — lighter on probability, more polished pedagogy. Use for supplementary examples if Grinstead is too dense.

**Why it matters:** Fritz 2020 (Markov categories), Baez-Fritz 2011 (entropy), Fritz-Perrone 2021 (support), Staton 2025 (stochastic Hoare logic), and Panangaden 2009 (bisimulation metrics) all assume probability. Readers coming from the game theory or category theory foundations hit a wall when distributions appear.

**Sections (~10):**
- Sample spaces and events
- Conditional probability
- Bayes' theorem
- Random variables and expectation
- Variance and standard deviation
- Common distributions (uniform, binomial, Poisson, normal)
- Joint distributions and independence
- Markov chains
- Law of large numbers
- Central limit theorem

**Route:** `/reading/game-theory/nordstrom-prob-NN/` or `/reading/probability/grinstead-NN/`

## 2. Logic & Proofs 🔑

**Approach: pointers, not derivatives.** The best logic sources are permissive (CC BY, MIT, Apache), not copyleft. Rewriting them as breadcrumbs pages would create CC BY-SA derivatives of permissive content — legal but unnecessary work, and the originals are already well-written for their audience.

Instead: link to them from relevant paper pages and foundations pages as "further reading." Only build breadcrumbs pages for topics that connect directly to paper pages and aren't already covered (Hoare logic is already in Staton 2025).

**External pointers (link, don't rewrite):**
- [forall x: Calgary](https://forallx.openlogicproject.org/) (CC BY 4.0) — propositional and predicate logic
- [Open Logic Project](https://openlogicproject.org/) (CC BY 4.0) — formal proof systems, model theory
- [Logic and Proof](https://leanprover-community.github.io/logic_and_proof/) (Apache 2.0) — induction, Lean-flavored proofs
- [Software Foundations vol. 2](https://softwarefoundations.cis.upenn.edu/plf-current/index.html) (MIT) — Hoare logic, wp, decorated programs

**Already covered on the site:**
- Hoare triples → Staton 2025 page
- Graded Hoare logic → Gaboardi 2021 page
- Curry-Howard → Milewski ch9
- Topoi / internal logic → Milewski ch23

## 3. Abstract Algebra 🔗

**Source:** Judson, *Abstract Algebra: Theory and Applications* (GFDL)
- http://abstract.ups.edu/
- Groups and rings in depth, monoids briefly
- Has Sage integration (maps to Python REPL approach)

**Gap:** Semirings aren't in any open textbook. Wikipedia's semiring article (CC BY-SA 4.0) is the best source, supplemented with original content.

**Why it matters:** Milewski's category theory foundations assume algebraic vocabulary (monoids, groups, rings) without defining it. Kidney-Wu 2021 (semiring-parameterized monads) needs semirings. The type algebra in Milewski ch6 is a semiring. Lawvere theories (ch24) generalize universal algebra.

**Sections (~8):**
- Sets and functions (review)
- Groups: definition, examples, subgroups
- Group homomorphisms
- Rings and fields
- Monoids (connecting to Milewski ch3, ch12)
- Semirings (connecting to Milewski ch6, Kidney-Wu 2021)
- Lattices and partial orders (connecting to Milewski ch3)
- Universal algebra (connecting to Milewski ch24)

**Route:** `/reading/algebra-NN/`

## Execution order

1. **Probability first.** Most paper pages assume it. Highest unblock value. Build from Grinstead (GFDL).
2. **Algebra second.** Build from Judson (GFDL). Fills the semiring gap.
3. **Logic: pointers only.** Add links to permissive sources from relevant pages. No new breadcrumbs pages needed.

## Emoji assignments

- 🎰 Probability & Statistics (Grinstead & Snell)
- 🔑 Logic & Proofs (forall x + Open Logic + Avigad + SF)
- 🔗 Abstract Algebra (Judson)

## License compatibility

The site's derivative works are CC BY-SA 4.0. All sources above are compatible:
- **GFDL** (no invariant sections) → derivatives can be relicensed as CC BY-SA 4.0
- **CC BY-SA 3.0/4.0** → same license family, compatible
- **CC BY 4.0** → more permissive, compatible (no share-alike even required)
- **Apache 2.0, MIT** → maximally permissive, compatible

Avoid NC-licensed sources (e.g., Doerr & Levasseur) to keep commercial rights open.

## PageLeft indexing

Only copyleft sources enter Canon. Permissive sources are linked, not indexed.

Index on PageLeft (copyleft):
- `math.dartmouth.edu` (GFDL) — Grinstead probability
- `abstract.ups.edu` (GFDL) — Judson algebra
- Breadcrumbs derivative pages (CC BY-SA 4.0) — indexed via the blog deploy pipeline

Link only (permissive, not Canon):
- `forallx.openlogicproject.org` (CC BY 4.0)
- `openlogicproject.org` (CC BY 4.0)
- `leanprover-community.github.io` (Apache 2.0)
- `softwarefoundations.cis.upenn.edu` (MIT)
