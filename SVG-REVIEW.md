# SVG Diagrams — Review Log

Reviewed 2026-03-23.

### Finance SVG audit — 2026-03-27

Visually audited and fixed 7 finance SVGs:

- **fin-01**: expanded viewBox, added caption, replaced Unicode superscript
- **fin-02**: added caption
- **fin-03**: redesigned to show PV convergence, widened viewBox
- **fin-04**: added normality caveat to 68% label, expanded viewBox
- **fin-05**: shortened caption to fit viewBox
- **fin2-09**: redrawn from barrier model to correct Merton (maturity-only default)
- **fin2-10**: added caption

## Lessons learned

**ViewBox clipping is the most common bug.** If the bottom element sits at y=193 and the viewBox height is 200, descenders and stroke widths get cut. Always add 5-10px of breathing room below the lowest element. Found this in sicp-04, sicp-05, sicp-14.

**Rotated text labels drift from their anchors.** SVG `transform="rotate(-90,cx,cy)"` rotates around a point, but the visual result depends on text-anchor and font size in ways that are hard to predict without rendering. The fix is to position the label's center point first, then rotate — not the other way around. Found in sicp-02 where "grows" and "constant" overlapped their arrows.

**Don't mix text characters and drawn elements for the same concept.** sicp-10 originally had `square: ●` as a text string AND a separate `<circle>` at the same position. The text glyph and the SVG circle rendered at slightly different sizes and positions, creating a double-image. Pick one representation: either the drawn circle (which you can attach arrows to) or the text character (which you can't). The circle is always better if it needs to participate in the diagram's structure.

**Dashed curves need clear directionality.** A dashed path without an arrowhead is ambiguous — the reader can't tell which end is the source. sicp-10's closure curve originally looped in a way that pointed outside the frame. Adding a small arrowhead polygon at the destination end fixed the reading.

**Caption separation.** A blank gap between diagram and caption reads as "these are separate things." 30-40px of vertical space between the last diagram element and the caption text works. Less than 20px makes them look crammed; more than 60px makes the caption feel orphaned.

**Color coding.** Blue (#60a5fa) for the primary concept, amber (#f59e0b) for the secondary/contrasting concept, purple (#a78bfa) for tertiary. Gray (currentColor with reduced opacity) for structural elements like arrows and labels. This palette is consistent across all diagrams and matches the site's dark theme.

**HTML entities don't all work in SVG `<text>`.** SVG supports XML numeric references (`&#x222F;`) but not all named HTML entities (`&oiint;`). If a symbol renders as literal `&oiint;` text, replace it with the hex code. Found in calc-15 where the surface integral symbol failed.

**`font-family: ui-monospace, monospace`** on the SVG root element ensures code-like text (expressions, variable names) renders in the same font as the REPLs. Non-code labels use the same font for consistency within the diagram.

## Interactive upgrades

Pattern: static SVG → slider/drag input + JS that redraws elements. Reference implementation: [bid-demo.html](https://june.kim/one-shot-bidding) (range input drives Gaussian curves in SVG).

### Viability criteria
- **High**: diagram has a continuous parameter the reader would learn by varying (slider, drag)
- **Medium**: diagram has discrete states worth toggling (click to step through)
- **Low**: diagram is structural/definitional — interactivity adds noise, not insight

### Candidates

| File | Current | Interactive idea | Viability | Status |
|------|---------|-----------------|-----------|--------|
| **Calculus (every chapter)** | | | | |
| `calculus/index` | tangent + shaded area | Drag point along curve → tangent rotates, area grows | high | planned |
| `calculus/calc-01` | domain → range mapping | Drag x input, watch f(x) output highlight | high | planned |
| `calculus/calc-02` | unit circle trig | Drag point around circle, sin/cos projections + readout update | high | **done** |
| `calculus/calc-03` | limit at a | Drag x toward a, watch f(x) approach L | high | planned |
| `calculus/calc-04` | secant → tangent | Slider: h→0, secant lines collapse onto tangent | high | planned |
| `calculus/calc-05` | chain rule x→u→y | Slider: nudge x, watch du and dy propagate | high | planned |
| `calculus/calc-06` | local max/min | Drag point along curve, tangent line shown, slope readout | high | planned |
| `calculus/calc-07` | Riemann sum | Slider: n=1..80 rectangles, sum converges to exact | high | **done** |
| `calculus/calc-08` | u-substitution | Slider: x range, watch "hard" integral morph to "easy" | high | planned |
| `calculus/calc-09` | solid of revolution | Slider: x position, disk slice sweeps across, volume accumulates | high | planned |
| `calculus/calc-10` | cross product u×v | Drag u and v tips, cross product arrow + parallelogram update | high | planned |
| `calculus/calc-11` | tangent plane on surface | Drag (a,b) point on surface, tangent plane + gradient reorient | high | planned |
| `calculus/calc-12` | gradient contour plot | Drag point, gradient arrow recomputes, shows steepest ascent | high | planned |
| `calculus/calc-13` | double integral region | Drag dx strip across region, shaded area accumulates | high | planned |
| `calculus/calc-14` | line integral in vector field | Drag curve endpoints, work integral updates | high | planned |
| `calculus/calc-15` | Stokes ladder 1D/2D/3D | Click to toggle between FTC, Stokes, divergence theorem | medium | planned |
| **SICP** | | | | |
| `sicp-02` | recursion vs iteration trace | Slider: n=1..8, watch stack grow/shrink vs constant state | high | planned |
| `sicp-04` | abstraction barriers | Click to swap representation (v1/v2), barrier stays | medium | planned |
| `sicp-05` | box-and-pointer `((1 2) (3 4))` | Click cons cells to build list step by step | medium | planned |
| `sicp-09` | bank account state | Slider: number of withdrawals, balance updates | high | planned |
| `sicp-10` | environment model | Click "call square(5)" → animate frame creation | medium | planned |
| `sicp-13` | stream promise/force | Click "force" arrows one at a time, values appear | high | planned |
| **Analysis** | | | | |
| `analysis/index` | ε-δ continuity | Drag ε band → δ band adjusts to keep curve inside | high | planned |
| `analysis/lebl-01` | supremum on number line | Drag marker, verdict: upper bound / not / tightest | high | **done** |
| `analysis/lebl-04` | continuity at point | Drag ε, δ auto-adjusts | high | planned |
| `analysis/lebl-08` | open ball B(p,r) | Drag r slider, ball expands/contracts, interior points highlight | high | planned |
| **Probability** | | | | |
| `probability/grinstead-06` | expected value | Drag distribution weights, μ line moves | high | planned |
| **Information theory** | | | | |
| `info-theory/shannon-01` | self-information bars | Slider: P=0.01..1.0, bar + bits readout, reference bars | high | **done** |
| `info-theory/shannon-05` | KL divergence | Drag Q distribution, divergence overlay updates | high | planned |
| **Game theory** | | | | |
| `game-theory/nordstrom-09` | mixed strategy | Slider p, dots ride payoff lines, equilibrium readout | high | **done** |
| **Linear algebra** | | | | |
| `linear-algebra/hefferon-04` | determinant parallelogram | Drag vector tips, parallelogram + det formula update | high | **done** |
| **Category theory** | | | | |
| `milewski-10` | naturality square | Click to step through F(f) then α vs α then G(f) | medium | planned |
| `milewski-07-0` | functor C→D | Drag an arrow in C, watch F(arrow) appear in D | medium | planned |
| **Papers** | | | | |
| `fritz-2020-1` | deterministic vs stochastic | Toggle between copy-then-f and f-then-copy, see ≠ | medium | planned |
| `leinster-2021` | diversity indices | Slider q=0..4, circles resize + fade, D readout | high | **done** |
| `ho-wu-2026` | Bayesian lens | Drag prior bars, posterior bars update via Bayes | high | planned |
| `cogsci/index` | Bayesian network | Click Rain on/off, conditional probs propagate | high | planned |
| **Scientific method** | | | | |
| `scientific-method/ioannidis-2005` | confusion matrix | Slider: prior %, all cells + FDR update | high | **done** |
| `scientific-method/registered-prediction` | calibration chart | Drag predicted %, see actual outcome fraction | high | planned |
| `scientific-method/boole-1854` | logic gates | Click inputs, outputs propagate | medium | planned |
| **ML** | | | | |
| `ml/ml-04` | sigmoid curve | Slider: z, dot rides curve, class readout | high | **done** |
| `ml/ml-07` | GP posterior | Drag observed points, confidence band reshapes | high | planned |
| `ml/ml-09` | 1D convolution | Slide kernel across signal, output builds | high | planned |
| **Economics** | | | | |
| `economics/econ-12` | monopoly pricing | Slider: Q, profit rectangle + readout | high | **done** |
| `economics/econ-22` | Lorenz / Gini | Slider: Gini, curve bows, area shades | high | **done** |
| **Physics** | | | | |
| `physics/crowell-01` | energy conservation | Slider: height, PE/KE bars trade off | high | **done** |
| **Finance 1 (corporate/investments)** | | | | |
| `finance-1/index` | efficient frontier + CML | Drag tangency point, CML pivots, Sharpe ratio readout | high | planned |
| `finance-1/fin-01` | PV ↔ FV timeline | Slider: r or n, watch PV/FV bars rescale | high | planned |
| `finance-1/fin-02` | bond cash-flow timeline | Slider: yield, PV of each coupon bar shrinks/grows | high | planned |
| `finance-1/fin-03` | DDM cash-flow timeline | Slider: growth rate g, dividend bars diverge/converge | high | planned |
| `finance-1/fin-04` | return distribution (μ, σ) | Slider: σ, bell curve widens, 68% band stretches | high | planned |
| `finance-1/fin-05` | efficient frontier + MVP | Drag weight slider, portfolio dot moves along frontier | high | planned |
| `finance-1/fin-06` | Security Market Line | Drag β, expected return dot rides SML, α readout | high | planned |
| `finance-1/fin-07` | forward payoff diagram | Slider: forward price F, long/short lines shift | high | planned |
| `finance-1/fin-08` | call + put payoff | Slider: strike K, payoff kinks shift | high | planned |
| `finance-1/fin-09` | EMH nested circles | Click to highlight each form, info examples appear | medium | planned |
| `finance-1/fin-10` | prospect theory value fn | Drag reference point, curve shifts, loss aversion visible | high | planned |
| `finance-1/fin-11` | NPV vs discount rate | Slider: r, dot rides curve, NPV + IRR readout | high | planned |
| `finance-1/fin-12` | risk taxonomy tree | Click node to expand sub-categories | low | planned |
| **Finance 2 (quant/derivatives)** | | | | |
| `finance-2/index` | GBM sample paths | Slider: σ, paths fan out/in, drift line stays | high | planned |
| `finance-2/fin2-01` | random walk paths | Slider: number of steps, paths extend | high | planned |
| `finance-2/fin2-02` | chain rule vs Ito's lemma | Toggle between ordinary and Ito, correction term highlights | medium | planned |
| `finance-2/fin2-03` | call payoff + pre-expiry curve | Slider: time to expiry, C(S,t) curve flattens toward payoff | high | planned |
| `finance-2/fin2-04` | binomial tree | Click to step through up/down nodes, price builds | medium | planned |
| `finance-2/fin2-05` | volatility smile/skew | Slider: skew parameter, smile tilts | high | planned |
| `finance-2/fin2-06` | mean-reversion (OU process) | Slider: mean-reversion speed κ, paths tighten/loosen | high | planned |
| `finance-2/fin2-07` | factor model decomposition | Slider: factor betas, bar chart of return attribution updates | high | planned |
| `finance-2/fin2-08` | short-rate model paths | Slider: θ (long-run mean), paths converge to new level | high | planned |
| `finance-2/fin2-09` | structural credit model | Slider: time or volatility, firm value paths cross/miss debt barrier | high | planned |
| `finance-2/fin2-10` | CDS cash-flow diagram | Slider: spread (bps), payment arrows resize | medium | planned |
| `finance-2/fin2-11` | VaR + CVaR distribution | Slider: confidence level, VaR line shifts, CVaR shading updates | high | planned |
| `finance-2/fin2-12` | dynamic programming tree | Click to step through optimal decisions at each node | medium | planned |

### Not viable (structural/definitional — static is better)

Landing page icons, commutative diagrams (milewski 01-06, 11-12, 16, 19-24), universal property triangles, type hierarchy nesting (algebra 07), truth tables (discrete-math 03), notation references, Hasse diagrams, string diagram definitions (fritz-2020 copy/discard), chain rule composition diagram (calc-05 arrow diagram — the slider version above replaces the idea, not the same SVG), risk taxonomy tree (fin-12 — static hierarchy is clearer), CDS flow diagram (fin2-10 — structural, not parametric), Ito vs chain rule comparison (fin2-02 — definitional side-by-side).

## Inventory

Hashes stored in `svg-inventory.json` (461 entries). Each key is a file path (with `-N` suffix for multi-SVG pages), each value is a SHA-256 prefix.

### How to re-scan

```bash
python3 -c "
import re, hashlib, glob, json

current = {}
for fp in sorted(glob.glob('src/pages/**/index.astro', recursive=True)):
    with open(fp) as f: content = f.read()
    svgs = list(re.finditer(r'<svg\b[^>]*>.*?</svg>', content, re.DOTALL))
    for i, m in enumerate(svgs):
        h = hashlib.sha256(m.group(0).encode()).hexdigest()[:12]
        s = '-' + str(i) if len(svgs) > 1 else ''
        current[fp + s] = h

with open('svg-inventory.json') as f: old = json.load(f)

added = set(current) - set(old)
removed = set(old) - set(current)
changed = {k for k in set(current) & set(old) if current[k] != old[k]}

if added: print(f'NEW ({len(added)}):'); [print(f'  {k}') for k in sorted(added)]
if removed: print(f'REMOVED ({len(removed)}):'); [print(f'  {k}') for k in sorted(removed)]
if changed: print(f'CHANGED ({len(changed)}):'); [print(f'  {k}: {old[k]} -> {current[k]}') for k in sorted(changed)]
if not (added or removed or changed): print('No changes.')
"
```

To update after review, re-run the generation script and overwrite `svg-inventory.json`.


- **Total SVGs**: 461 across the site
- **Reviewed**: 461 (all)
- **Fixed**: 14 (5 SICP, 1 calculus calc-15, 1 game-theory index, 7 finance)
- **Multi-SVG pages**: milewski-06, milewski-14, os-02, ml-08, sicp-03
