# SVG Diagrams — Review Log

Reviewed 2026-03-23.

## Lessons learned

**ViewBox clipping is the most common bug.** If the bottom element sits at y=193 and the viewBox height is 200, descenders and stroke widths get cut. Always add 5-10px of breathing room below the lowest element. Found this in sicp-04, sicp-05, sicp-14.

**Rotated text labels drift from their anchors.** SVG `transform="rotate(-90,cx,cy)"` rotates around a point, but the visual result depends on text-anchor and font size in ways that are hard to predict without rendering. The fix is to position the label's center point first, then rotate — not the other way around. Found in sicp-02 where "grows" and "constant" overlapped their arrows.

**Don't mix text characters and drawn elements for the same concept.** sicp-10 originally had `square: ●` as a text string AND a separate `<circle>` at the same position. The text glyph and the SVG circle rendered at slightly different sizes and positions, creating a double-image. Pick one representation: either the drawn circle (which you can attach arrows to) or the text character (which you can't). The circle is always better if it needs to participate in the diagram's structure.

**Dashed curves need clear directionality.** A dashed path without an arrowhead is ambiguous — the reader can't tell which end is the source. sicp-10's closure curve originally looped in a way that pointed outside the frame. Adding a small arrowhead polygon at the destination end fixed the reading.

**Caption separation.** A blank gap between diagram and caption reads as "these are separate things." 30-40px of vertical space between the last diagram element and the caption text works. Less than 20px makes them look crammed; more than 60px makes the caption feel orphaned.

**Color coding.** Blue (#60a5fa) for the primary concept, amber (#f59e0b) for the secondary/contrasting concept, purple (#a78bfa) for tertiary. Gray (currentColor with reduced opacity) for structural elements like arrows and labels. This palette is consistent across all diagrams and matches the site's dark theme.

**HTML entities don't all work in SVG `<text>`.** SVG supports XML numeric references (`&#x222F;`) but not all named HTML entities (`&oiint;`). If a symbol renders as literal `&oiint;` text, replace it with the hex code. Found in calc-15 where the surface integral symbol failed.

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

| File | Hash | Status |
|------|------|--------|
| `src/pages/programming/index.astro` | `2699dd1090aa` | clean |
| `src/pages/programming/sicp-02/index.astro` | `ef2145a1bc2c` | fixed: repositioned rotated labels |
| `src/pages/programming/sicp-04/index.astro` | `b367ed2b419a` | fixed: viewBox +10 |
| `src/pages/programming/sicp-05/index.astro` | `9c30345bcc45` | fixed: viewBox +5 |
| `src/pages/programming/sicp-09/index.astro` | `a76b899884d1` | clean |
| `src/pages/programming/sicp-10/index.astro` | `5a2aabc70b83` | fixed: full redesign |
| `src/pages/programming/sicp-13/index.astro` | `2ec09e6549d4` | clean |
| `src/pages/programming/sicp-14/index.astro` | `72fc1e8b4ea6` | fixed: viewBox +5 |
| `src/pages/category-theory/index.astro` | `91f2101c5fcc` | clean |
| `src/pages/category-theory/milewski-01/index.astro-0` | `ab53de8bec5b` | clean |
| `src/pages/category-theory/milewski-01/index.astro-1` | `f646c4b28797` | clean |
| `src/pages/category-theory/milewski-02/index.astro` | `9efe67b6ade9` | clean |
| `src/pages/category-theory/milewski-03/index.astro-0` | `9987195b9787` | clean |
| `src/pages/category-theory/milewski-03/index.astro-1` | `acdeb9d95ae8` | clean |
| `src/pages/category-theory/milewski-04/index.astro-0` | `265eddd4eca2` | clean |
| `src/pages/category-theory/milewski-04/index.astro-1` | `48fe4e862422` | clean |
| `src/pages/category-theory/milewski-05/index.astro-0` | `ddc78d49fa72` | clean |
| `src/pages/category-theory/milewski-05/index.astro-1` | `b10efbeb2efe` | clean |
| `src/pages/category-theory/milewski-06/index.astro` | `d0860b007a59` | clean |
| `src/pages/category-theory/milewski-07/index.astro-0` | `70af5e4f1a59` | clean |
| `src/pages/category-theory/milewski-07/index.astro-1` | `373f61e9e772` | clean |
| `src/pages/category-theory/milewski-08/index.astro-0` | `47aae919ec57` | clean |
| `src/pages/category-theory/milewski-08/index.astro-1` | `eec87129b460` | clean |
| `src/pages/category-theory/milewski-09/index.astro` | `d062e64b8df8` | clean |
| `src/pages/category-theory/milewski-10/index.astro` | `6885f1240b66` | clean |
| `src/pages/category-theory/milewski-11/index.astro-0` | `ea3fa274a98c` | clean |
| `src/pages/category-theory/milewski-11/index.astro-1` | `a8053dbbbc2e` | clean |
| `src/pages/category-theory/milewski-11/index.astro-2` | `f2869c5910da` | clean |
| `src/pages/category-theory/milewski-12/index.astro-0` | `3fb72c70763e` | clean |
| `src/pages/category-theory/milewski-12/index.astro-1` | `44c069d85e11` | clean |
| `src/pages/category-theory/milewski-13/index.astro` | `f28fab919408` | clean |
| `src/pages/category-theory/milewski-14/index.astro` | `07d9ff5001aa` | clean |
| `src/pages/category-theory/milewski-15/index.astro` | `e73755e674c5` | clean |
| `src/pages/category-theory/milewski-16/index.astro-0` | `e4eaf17a675e` | clean |
| `src/pages/category-theory/milewski-16/index.astro-1` | `5a6dec12f88c` | clean |
| `src/pages/category-theory/milewski-17/index.astro-0` | `7d4eb9beca7d` | clean |
| `src/pages/category-theory/milewski-17/index.astro-1` | `838fedd55ac5` | clean |
| `src/pages/category-theory/milewski-18/index.astro` | `6117934f2ccf` | clean |
| `src/pages/category-theory/milewski-19/index.astro-0` | `79b35e65dc88` | clean |
| `src/pages/category-theory/milewski-19/index.astro-1` | `dbd271990275` | clean |
| `src/pages/category-theory/milewski-20/index.astro` | `f1f389881505` | clean |
| `src/pages/category-theory/milewski-21/index.astro-0` | `f6f3a8fad869` | clean |
| `src/pages/category-theory/milewski-21/index.astro-1` | `a77a88ec57ce` | clean |
| `src/pages/category-theory/milewski-22/index.astro` | `33cf822515d4` | clean |
| `src/pages/category-theory/milewski-23/index.astro` | `68338fd17954` | clean |
| `src/pages/category-theory/milewski-24/index.astro` | `b28f016a352d` | clean |
| `src/pages/baez-fritz-2011/index.astro` | `a212c2f08330` | clean |
| `src/pages/capucci-2021/index.astro-0` | `d45d6c2d9054` | clean |
| `src/pages/capucci-2021/index.astro-1` | `945c495621e2` | clean |
| `src/pages/chen-vigneaux-2023/index.astro` | `b58d5633d218` | clean |
| `src/pages/cho-jacobs-2015/index.astro` | `25bccc12f95f` | clean |
| `src/pages/di-lavore-2025/index.astro` | `e8bdda41cbac` | clean |
| `src/pages/fritz-2020/index.astro-0` | `b50b0c0fdb15` | clean |
| `src/pages/fritz-2020/index.astro-1` | `b9193abfe5ae` | clean |
| `src/pages/fritz-2020/index.astro-2` | `b90a14f64cd0` | clean |
| `src/pages/fritz-2020/index.astro-3` | `ff806f0f2f50` | clean |
| `src/pages/fritz-perrone-2021/index.astro` | `857f471a95fe` | clean |
| `src/pages/gaboardi-2021/index.astro-0` | `147b8651009f` | clean |
| `src/pages/gaboardi-2021/index.astro-1` | `e6b8e2a54043` | clean |
| `src/pages/hedges-2018/index.astro-0` | `21473ca2ecf2` | clean |
| `src/pages/hedges-2018/index.astro-1` | `742d30bcb3df` | clean |
| `src/pages/hedges-2018/index.astro-2` | `9e2b2e63491e` | clean |
| `src/pages/hedges-2018/index.astro-3` | `6bd6126afc0f` | clean |
| `src/pages/hedges-2018/index.astro-4` | `6b3a76821c30` | clean |
| `src/pages/hedges-2018/index.astro-5` | `44152a8828ba` | clean |
| `src/pages/ho-wu-2026/index.astro` | `23eec2b2dddf` | clean |
| `src/pages/jacobs-2014/index.astro` | `42aa128747af` | clean |
| `src/pages/kidney-wu-2021/index.astro` | `b93cbad26e92` | clean |
| `src/pages/kura-2026/index.astro-0` | `d93a00ea3726` | clean |
| `src/pages/kura-2026/index.astro-1` | `5f7b3f1d0f67` | clean |
| `src/pages/kura-2026/index.astro-2` | `6601f4e436d9` | clean |
| `src/pages/kura-2026/index.astro-3` | `a5519e1af1a9` | clean |
| `src/pages/kura-2026/index.astro-4` | `2bdf2c3b4e24` | clean |
| `src/pages/kura-2026/index.astro-5` | `d26291b33ac1` | clean |
| `src/pages/leinster-2021/index.astro` | `67499eab77c4` | clean |
| `src/pages/liell-cock-2025/index.astro` | `eec424fb7c06` | clean |
| `src/pages/panangaden-2009/index.astro` | `56aef90d5bb9` | clean |
| `src/pages/parzygnat-2020/index.astro` | `59c8547e46d8` | clean |
| `src/pages/sato-2023/index.astro` | `776a9a9490e7` | clean |
| `src/pages/smithe-2021/index.astro` | `38a6692ababf` | clean |
| `src/pages/spivak-2013/index.astro` | `502ab9e43da48` | clean |
| `src/pages/staton-2025/index.astro-0` | `7ea855fa6f43` | clean |
| `src/pages/staton-2025/index.astro-1` | `b862019ad9c8` | clean |
| `src/pages/staton-2025/index.astro-2` | `013467e83385` | clean |
| `src/pages/staton-2025/index.astro-3` | `5881d22e5341` | clean |
| `src/pages/staton-2025/index.astro-4` | `6bbc36649447` | clean |
| `src/pages/game-theory/index.astro` | `f337d90986d8` | clean |
| `src/pages/game-theory/nordstrom-01/index.astro` | `903b988ebf75` | clean |
| `src/pages/game-theory/nordstrom-02/index.astro` | `44401ab56d67` | clean |
| `src/pages/game-theory/nordstrom-03/index.astro` | `65ba46659f08` | clean |
| `src/pages/game-theory/nordstrom-04/index.astro` | `041beecb88e7` | clean |
| `src/pages/game-theory/nordstrom-05/index.astro` | `f32da9a2c461` | clean |
| `src/pages/game-theory/nordstrom-06/index.astro` | `0947f6d2dfb7` | clean |
| `src/pages/game-theory/nordstrom-07/index.astro` | `a2783f3b9174` | clean |
| `src/pages/game-theory/nordstrom-08/index.astro-0` | `2f7a78b28650` | clean |
| `src/pages/game-theory/nordstrom-08/index.astro-1` | `876502b9f311` | clean |
| `src/pages/game-theory/nordstrom-09/index.astro` | `40d457be1f6a` | clean |
| `src/pages/game-theory/nordstrom-10/index.astro` | `00f2d58f676a` | clean |
| `src/pages/game-theory/nordstrom-11/index.astro-0` | `f44931b7cb83` | clean |
| `src/pages/game-theory/nordstrom-11/index.astro-1` | `e8a3aaf33de9` | clean |
| `src/pages/game-theory/nordstrom-12/index.astro` | `96d8d636fe04` | clean |
| `src/pages/game-theory/nordstrom-13/index.astro` | `9d571b7c6181` | clean |
| `src/pages/game-theory/nordstrom-14/index.astro` | `3c2e8f85a4c7` | clean |
| `src/pages/probability/index.astro` | `39836a4bec0e` | clean |
| `src/pages/probability/grinstead-01/index.astro` | `ea44b3c68901` | clean |
| `src/pages/probability/grinstead-02/index.astro` | `346979933120` | clean |
| `src/pages/probability/grinstead-03/index.astro` | `4352c98d4423` | clean |
| `src/pages/probability/grinstead-04/index.astro` | `2889d19af791` | clean |
| `src/pages/probability/grinstead-05/index.astro` | `fab14498813b` | clean |
| `src/pages/probability/grinstead-06/index.astro` | `96506453e82d` | clean |
| `src/pages/probability/grinstead-07/index.astro` | `da54602e789f` | clean |
| `src/pages/probability/grinstead-08/index.astro` | `bbac7923fb36` | clean |
| `src/pages/probability/grinstead-09/index.astro` | `33c7787cb931` | clean |
| `src/pages/probability/grinstead-10/index.astro` | `464913198262` | clean |
| `src/pages/probability/grinstead-11/index.astro` | `082b1dfaa83c` | clean |
| `src/pages/probability/grinstead-12/index.astro` | `c828002c268c` | clean |
| `src/pages/info-theory/index.astro` | `a521c240689f` | clean |
| `src/pages/info-theory/shannon-01/index.astro` | `f50e60cb545c` | clean |
| `src/pages/info-theory/shannon-02/index.astro` | `361307ff388b` | clean |
| `src/pages/info-theory/shannon-03/index.astro` | `56f5c22c452e` | clean |
| `src/pages/info-theory/shannon-04/index.astro` | `dbfa649e9481` | clean |
| `src/pages/info-theory/shannon-05/index.astro` | `90ffe9d56c38` | clean |
| `src/pages/info-theory/shannon-06/index.astro` | `bf6d70e13372` | clean |
| `src/pages/info-theory/shannon-07/index.astro` | `e4e042db26ae` | clean |
| `src/pages/info-theory/shannon-08/index.astro` | `909c5dcea572` | clean |
| `src/pages/algebra/index.astro` | `73fcb037e70b` | clean |
| `src/pages/algebra/judson-01/index.astro` | `b225ac8c7120` | clean |
| `src/pages/algebra/judson-02/index.astro` | `51e68ff714af` | clean |
| `src/pages/algebra/judson-03/index.astro` | `2f16b5e03025` | clean |
| `src/pages/algebra/judson-04/index.astro` | `bc8669ab84b8` | clean |
| `src/pages/algebra/judson-05/index.astro` | `0c31c425bcc1` | clean |
| `src/pages/algebra/judson-06/index.astro` | `63047274bcaa` | clean |
| `src/pages/algebra/judson-07/index.astro` | `23cbe7640764` | clean |
| `src/pages/algebra/judson-08/index.astro` | `9bd734dfe696` | clean |
| `src/pages/cogsci/index.astro` | `310c69455319` | clean |
| `src/pages/cogsci/lovelace-01/index.astro` | `a7d10356a2d1` | clean |
| `src/pages/cogsci/lovelace-02/index.astro` | `fcaa334b0166` | clean |
| `src/pages/cogsci/lovelace-03/index.astro` | `2f35ed1000ed` | clean |
| `src/pages/cogsci/lovelace-04/index.astro` | `b8c1b8f6cbc9` | clean |
| `src/pages/cogsci/lovelace-05/index.astro` | `2c9fc1243b60` | clean |
| `src/pages/cogsci/lovelace-06/index.astro` | `5391e32c042b` | clean |
| `src/pages/cogsci/lovelace-07/index.astro` | `b496cf5fdca7` | clean |
| `src/pages/cogsci/lovelace-08/index.astro` | `96e172b0664a` | clean |
| `src/pages/discrete-math/index.astro` | `efc060191bf2` | clean |
| `src/pages/discrete-math/levin-01/index.astro` | `123a52da1bb3` | clean |
| `src/pages/discrete-math/levin-02/index.astro` | `c81da12c6230` | clean |
| `src/pages/discrete-math/levin-03/index.astro` | `c50e57a5895f` | clean |
| `src/pages/discrete-math/levin-04/index.astro` | `52203228f140` | clean |
| `src/pages/discrete-math/levin-05/index.astro` | `0e6aaee3e3d9` | clean |
| `src/pages/linear-algebra/index.astro` | `0fc843d637c6` | clean |
| `src/pages/linear-algebra/hefferon-01/index.astro` | `ba8aef7c4afc` | clean |
| `src/pages/linear-algebra/hefferon-02/index.astro` | `6114c5c2fcbd` | clean |
| `src/pages/linear-algebra/hefferon-03/index.astro` | `9157466bd184` | clean |
| `src/pages/linear-algebra/hefferon-04/index.astro` | `a570a413c20d` | clean |
| `src/pages/linear-algebra/hefferon-05/index.astro` | `6ccae8b3d23b` | clean |

| `src/pages/analysis/index.astro` | `edb0002a0379` | clean |
| `src/pages/analysis/lebl-01/index.astro` | `76e120508ec8` | clean |
| `src/pages/analysis/lebl-02/index.astro` | `b985ebe8daef` | clean |
| `src/pages/analysis/lebl-03/index.astro` | `ccb65c11f827` | clean |
| `src/pages/analysis/lebl-04/index.astro` | `60eb6165bf70` | clean |
| `src/pages/analysis/lebl-05/index.astro` | `3bf97aa21e53` | clean |
| `src/pages/analysis/lebl-06/index.astro` | `031a8f685139` | clean |
| `src/pages/analysis/lebl-07/index.astro` | `c7c10b0fb5cf` | clean |
| `src/pages/analysis/lebl-08/index.astro` | `867f5a549852` | clean |
| `src/pages/calculus/index.astro` | `bd86e432407d` | clean |
| `src/pages/calculus/calc-01/index.astro` | `62ecf4baa38e` | clean |
| `src/pages/calculus/calc-02/index.astro` | `f0bf6291ef4d` | clean |
| `src/pages/calculus/calc-03/index.astro` | `586ccafb6e38` | clean |
| `src/pages/calculus/calc-04/index.astro` | `f4126009c746` | clean |
| `src/pages/calculus/calc-05/index.astro` | `8207aed03f9d` | clean |
| `src/pages/calculus/calc-06/index.astro` | `e77541a3c40d` | clean |
| `src/pages/calculus/calc-07/index.astro` | `e67c62d80ca3` | clean |
| `src/pages/calculus/calc-08/index.astro` | `d8f06ba63edc` | clean |
| `src/pages/calculus/calc-09/index.astro` | `64055116683f` | clean |
| `src/pages/calculus/calc-10/index.astro` | `d7997ddf9ec9` | clean |
| `src/pages/calculus/calc-11/index.astro` | `bcb7ccd8be13` | clean |
| `src/pages/calculus/calc-12/index.astro` | `f009a1bfc122` | clean |
| `src/pages/calculus/calc-13/index.astro` | `ab709052adfc` | clean |
| `src/pages/calculus/calc-14/index.astro` | `f304686dc9f0` | clean |
| `src/pages/calculus/calc-15/index.astro` | `8817834d25a0` | fixed: &oiint; → &#x222F; (HTML entity unsupported in SVG text) |

### Summary

- **Total SVGs**: 183 across the site
- **Reviewed**: 183 (all)
- **Fixed**: 6 (5 SICP programming, 1 calculus calc-15)
- **Clean**: 177
