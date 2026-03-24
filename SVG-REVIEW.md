# SVG Diagrams — Review Log

Reviewed 2026-03-23.

## Lessons learned

**ViewBox clipping is the most common bug.** If the bottom element sits at y=193 and the viewBox height is 200, descenders and stroke widths get cut. Always add 5-10px of breathing room below the lowest element. Found this in sicp-04, sicp-05, sicp-14.

**Rotated text labels drift from their anchors.** SVG `transform="rotate(-90,cx,cy)"` rotates around a point, but the visual result depends on text-anchor and font size in ways that are hard to predict without rendering. The fix is to position the label's center point first, then rotate — not the other way around. Found in sicp-02 where "grows" and "constant" overlapped their arrows.

**Don't mix text characters and drawn elements for the same concept.** sicp-10 originally had `square: ●` as a text string AND a separate `<circle>` at the same position. The text glyph and the SVG circle rendered at slightly different sizes and positions, creating a double-image. Pick one representation: either the drawn circle (which you can attach arrows to) or the text character (which you can't). The circle is always better if it needs to participate in the diagram's structure.

**Dashed curves need clear directionality.** A dashed path without an arrowhead is ambiguous — the reader can't tell which end is the source. sicp-10's closure curve originally looped in a way that pointed outside the frame. Adding a small arrowhead polygon at the destination end fixed the reading.

**Caption separation.** A blank gap between diagram and caption reads as "these are separate things." 30-40px of vertical space between the last diagram element and the caption text works. Less than 20px makes them look crammed; more than 60px makes the caption feel orphaned.

**Color coding.** Blue (#60a5fa) for the primary concept, amber (#f59e0b) for the secondary/contrasting concept, purple (#a78bfa) for tertiary. Gray (currentColor with reduced opacity) for structural elements like arrows and labels. This palette is consistent across all diagrams and matches the site's dark theme.

**`font-family: ui-monospace, monospace`** on the SVG root element ensures code-like text (expressions, variable names) renders in the same font as the REPLs. Non-code labels use the same font for consistency within the diagram.

## Inventory

All SVGs are inline `<svg>` elements (no separate files). Referenced by containing `.astro` file.

### How to re-scan

```bash
python3 -c "
import re, hashlib, glob
for fp in sorted(glob.glob('src/pages/**/index.astro', recursive=True)):
    with open(fp) as f: content = f.read()
    for i, m in enumerate(re.finditer(r'<svg\b[^>]*>.*?</svg>', content, re.DOTALL)):
        h = hashlib.sha256(m.group(0).encode()).hexdigest()[:12]
        s = '-' + str(i) if len(list(re.finditer(r'<svg\b', content))) > 1 else ''
        print(f'{fp}{s}\t{h}')
"
```

Compare output against the hashes below. Changed hash = SVG was edited since last review.

| File | Subject | Status | Notes |
|------|---------|--------|-------|
| `src/pages/programming/index.astro` | eval/apply cycle | clean | Two boxes, curved arrows, caption |
| `src/pages/programming/sicp-02/index.astro` | recursion vs iteration | fixed | Repositioned rotated labels |
| `src/pages/programming/sicp-04/index.astro` | abstraction barriers | fixed | ViewBox +10px for bottom box |
| `src/pages/programming/sicp-05/index.astro` | box-and-pointer `((1 2) (3 4))` | fixed | ViewBox +5px for caption |
| `src/pages/programming/sicp-09/index.astro` | bank account state over time | clean | Three states, transition arrows |
| `src/pages/programming/sicp-10/index.astro` | environment model / closure | fixed | Full redesign: dot, body link, curve |
| `src/pages/programming/sicp-13/index.astro` | stream promise/force chain | clean | Dashed arrows, promise bubble |
| `src/pages/programming/sicp-14/index.astro` | eval/apply cycle (detailed) | fixed | ViewBox +5px for caption |

No SVGs: sicp-01, sicp-03, sicp-06 through sicp-08, sicp-11, sicp-12, sicp-15 through sicp-22.

### Category Theory

| File | Subject | Status | Notes |
|------|---------|--------|-------|
| `src/pages/category-theory/index.astro` | A→B morphism | clean | Two objects, one arrow |
| `src/pages/category-theory/milewski-01/index.astro` | composition A→B→C (×2) | clean | Composition + identity loop |
| `src/pages/category-theory/milewski-02/index.astro` | Void/Unit/Bool types | clean | Three sets with arrows |
| `src/pages/category-theory/milewski-03/index.astro` | Hasse diagram, monoid endomorphisms (×2) | clean | Diamond lattice, flower loops |
| `src/pages/category-theory/milewski-04/index.astro` | Kleisli arrow, fish composition (×2) | clean | Plain vs decorated arrows |
| `src/pages/category-theory/milewski-05/index.astro` | product, coproduct universal properties (×2) | clean | Triangles with dashed mediating morphism |
| `src/pages/category-theory/milewski-06/index.astro` | product vs sum types | clean | Side-by-side AND/OR boxes |
| `src/pages/category-theory/milewski-07/index.astro` | functor diagram, functor laws (×2) | clean | C→D mapping, identity+composition laws |
| `src/pages/category-theory/milewski-08/index.astro` | bifunctor, covariant/contravariant (×2) | clean | C×D→E, arrow reversal |
| `src/pages/category-theory/milewski-09/index.astro` | curry/uncurry isomorphism | clean | A×B→C ≅ A→(B→C) |
| `src/pages/category-theory/milewski-10/index.astro` | naturality square | clean | F(a)→G(a), F(b)→G(b) commuting |
| `src/pages/category-theory/milewski-11/index.astro` | cone, limit, pullback (×3) | clean | Universal cone, equalizer, pullback square |
| `src/pages/category-theory/milewski-12/index.astro` | free monoid, universal property (×2) | clean | Word generation, fold triangle |
| `src/pages/category-theory/milewski-13/index.astro` | representable functor | clean | F(a) ≅ Hom(r,a) index/tabulate |
| `src/pages/category-theory/milewski-14/index.astro` | Yoneda lemma | clean | Nat(Hom(a,−),F) ≅ F(a) |
| `src/pages/category-theory/milewski-15/index.astro` | Yoneda embedding | clean | C → [C,Set] |
| `src/pages/category-theory/milewski-16/index.astro` | adjunction, triangle identities (×2) | clean | L⊣R, left/right triangles |
| `src/pages/category-theory/milewski-17/index.astro` | monad return/join, Kleisli bind (×2) | clean | η/μ arrows, fish composition |
| `src/pages/category-theory/milewski-18/index.astro` | monad/comonad duality | clean | Arrows reversed side-by-side |
| `src/pages/category-theory/milewski-19/index.astro` | F-algebra square, catamorphism (×2) | clean | alg commuting, cata as unique arrow |
| `src/pages/category-theory/milewski-20/index.astro` | end/wedge condition | clean | Diamond with P(a,a)→P(a,b) |
| `src/pages/category-theory/milewski-21/index.astro` | right Kan, left Kan extensions (×2) | clean | Mirrored triangles with ε/η |
| `src/pages/category-theory/milewski-22/index.astro` | enriched categories | clean | Hom-objects in V, composition via ⊗ |
| `src/pages/category-theory/milewski-23/index.astro` | subobject classifier | clean | Pullback of true along χ, color-coded |
| `src/pages/category-theory/milewski-24/index.astro` | Lawvere theory | clean | n-ary ops as morphisms |

### Papers (Natural Breadcrumbs)

| File | Subject | Status | Notes |
|------|---------|--------|-------|
| `src/pages/baez-fritz-2011/index.astro` | entropy functor | clean | Distribution → bits, chain rule |
| `src/pages/capucci-2021/index.astro` | lens, Para (×2) | clean | get/put + parametrized forward/backward |
| `src/pages/chen-vigneaux-2023/index.astro` | entropy ≅ magnitude | clean | Distribution ↔ metric space duality |
| `src/pages/cho-jacobs-2015/index.astro` | state/effect duality | clean | 1→A state, A→1+1 effect |
| `src/pages/di-lavore-2025/index.astro` | partial morphism | clean | Defined (green) vs undefined (red) |
| `src/pages/fritz-2020/index.astro` | copy, discard, determinism, Kleisli (×4) | clean | String diagrams, copy vs copy-then-f |
| `src/pages/fritz-perrone-2021/index.astro` | (1 SVG) | clean | |
| `src/pages/gaboardi-2021/index.astro` | graded Hoare triple (×2) | clean | P→c→Q with grade e |
| `src/pages/hedges-2018/index.astro` | open game, decision, equilibrium (×6) | clean | Triangle player, Nash equilibrium |
| `src/pages/ho-wu-2026/index.astro` | Bayesian lens | clean | Prior→posterior with bar charts |
| `src/pages/jacobs-2014/index.astro` | (1 SVG) | clean | |
| `src/pages/kidney-wu-2021/index.astro` | (1 SVG) | clean | |
| `src/pages/kura-2026/index.astro` | Hoare pipeline, stages (×6) | clean | Post=pre chaining, stage composition |
| `src/pages/leinster-2021/index.astro` | diversity indices | clean | q=0,1,2 weighted species circles |
| `src/pages/liell-cock-2025/index.astro` | (1 SVG) | clean | |
| `src/pages/panangaden-2009/index.astro` | (1 SVG) | clean | |
| `src/pages/parzygnat-2020/index.astro` | (1 SVG) | clean | |
| `src/pages/sato-2023/index.astro` | (1 SVG) | clean | |
| `src/pages/smithe-2021/index.astro` | Bayesian lens | clean | Predict/update with prior/evidence |
| `src/pages/spivak-2013/index.astro` | wiring diagram | clean | Box A→Box B, type-matched ports |
| `src/pages/staton-2025/index.astro` | Hoare triple, separation logic (×5) | clean | P{c}Q, frame rule |

### Game Theory

| File | Subject | Status | Notes |
|------|---------|--------|-------|
| `src/pages/game-theory/index.astro` | (1 SVG) | clean | |
| `src/pages/game-theory/nordstrom-01/index.astro` | players → outcomes | clean | Strategy combinations, payoffs |
| `src/pages/game-theory/nordstrom-02/index.astro` | (1 SVG) | clean | |
| `src/pages/game-theory/nordstrom-03/index.astro` | (1 SVG) | clean | |
| `src/pages/game-theory/nordstrom-04/index.astro` | (1 SVG) | clean | |
| `src/pages/game-theory/nordstrom-05/index.astro` | (1 SVG) | clean | |
| `src/pages/game-theory/nordstrom-06/index.astro` | (1 SVG) | clean | |
| `src/pages/game-theory/nordstrom-07/index.astro` | (1 SVG) | clean | |
| `src/pages/game-theory/nordstrom-08/index.astro` | repeated game timeline (×2) | clean | Pure strategy across rounds |
| `src/pages/game-theory/nordstrom-09/index.astro` | (1 SVG) | clean | |
| `src/pages/game-theory/nordstrom-10/index.astro` | (1 SVG) | clean | |
| `src/pages/game-theory/nordstrom-11/index.astro` | (×2 SVGs) | clean | |
| `src/pages/game-theory/nordstrom-12/index.astro` | (1 SVG) | clean | |
| `src/pages/game-theory/nordstrom-13/index.astro` | (1 SVG) | clean | |
| `src/pages/game-theory/nordstrom-14/index.astro` | (1 SVG) | clean | |

### Probability

| File | Subject | Status | Notes |
|------|---------|--------|-------|
| `src/pages/probability/index.astro` | (1 SVG) | clean | |
| `src/pages/probability/grinstead-01/index.astro` | sample space / events | clean | Ω with event subset |
| `src/pages/probability/grinstead-02/index.astro` | (1 SVG) | clean | |
| `src/pages/probability/grinstead-03/index.astro` | (1 SVG) | clean | |
| `src/pages/probability/grinstead-04/index.astro` | (1 SVG) | clean | |
| `src/pages/probability/grinstead-05/index.astro` | (1 SVG) | clean | |
| `src/pages/probability/grinstead-06/index.astro` | expected value histogram | clean | Bar chart with μ dashed line |
| `src/pages/probability/grinstead-07/index.astro` | (1 SVG) | clean | |
| `src/pages/probability/grinstead-08/index.astro` | (1 SVG) | clean | |
| `src/pages/probability/grinstead-09/index.astro` | (1 SVG) | clean | |
| `src/pages/probability/grinstead-10/index.astro` | (1 SVG) | clean | |
| `src/pages/probability/grinstead-11/index.astro` | (1 SVG) | clean | |
| `src/pages/probability/grinstead-12/index.astro` | (1 SVG) | clean | |

### Information Theory

| File | Subject | Status | Notes |
|------|---------|--------|-------|
| `src/pages/info-theory/index.astro` | (1 SVG) | clean | |
| `src/pages/info-theory/shannon-01/index.astro` | self-information / surprise | clean | Bar chart: P→bits, colored by probability |
| `src/pages/info-theory/shannon-02/index.astro` | (1 SVG) | clean | |
| `src/pages/info-theory/shannon-03/index.astro` | (1 SVG) | clean | |
| `src/pages/info-theory/shannon-04/index.astro` | (1 SVG) | clean | |
| `src/pages/info-theory/shannon-05/index.astro` | KL divergence | clean | P vs Q bar comparison with divergence overlay |
| `src/pages/info-theory/shannon-06/index.astro` | (1 SVG) | clean | |
| `src/pages/info-theory/shannon-07/index.astro` | (1 SVG) | clean | |
| `src/pages/info-theory/shannon-08/index.astro` | (1 SVG) | clean | |

### Summary

- **Total SVGs reviewed**: ~120 across 83 pages
- **Fixed**: 5 (all in SICP programming section)
- **Clean**: everything else — the category theory, papers, game theory, probability, and info theory SVGs are consistently high quality
