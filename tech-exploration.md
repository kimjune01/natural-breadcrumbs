# Tech Exploration

REPL options research. Updated 2026-03-22.

## Decision

**Python (Pyodide)** + **BiwaScheme** for MVP. Both client-side, no server needed.

- Python: intuition REPL. Reader sees plain functions. ~10MB WASM, loads once.
- BiwaScheme: categorical REPL. Reader sees composition-native Scheme. ~50KB JS, loads instantly.
- Lean: read-only syntax-highlighted snippets for now. Live REPL is a stretch goal.

## Research findings

### PureScript — eliminated
- **Cannot compile client-side.** No browser compiler exists.
- try.purescript.org sends code to a server (compile.purescript.org) for compilation.
- Embedding requires either hosting a compile server or depending on their public API.
- Pre-compiled bundles (spago bundle) work but users can't write/edit code.
- **Verdict:** Too heavy for MVP. Revisit if we ever host server infrastructure.

### BiwaScheme — winner for categorical REPL
- One JS file (`biwascheme.js`), ~50-200KB
- Fully offline, zero server dependency
- `<script type="text/biwascheme">(display "hello")</script>` — that's it
- Composition is native: `(compose f g)` is Kleisli composition
- No types to explain, no build step
- npm: `pnpm add biwascheme`
- Demo REPL exists at demo/repl.html in the GitHub repo
- **Verdict:** Ship it.

### Lean4web — stretch goal
- iframe embed from live.lean-lang.org
- ~30MB WASM download, heavy
- Real Lean compiler — reader can `#check ContractPreserving`
- **Verdict:** "Prove it" button per page, but only after core pages work.

### PureScript via hosted server — stretch goal
- Fork trypurescript, host compile.purescript.org equivalent
- Real typeclasses, academics recognize Haskell-like syntax
- **Verdict:** Only if demand appears. BiwaScheme covers the structural REPL need.

### Gleam — watch list
- Erlang/BEAM semantics, compiles to JS
- Young, no category theory libraries
- OTP supervision trees = compositional contracts (good blog post link)
- **Verdict:** Check back in 6 months.
