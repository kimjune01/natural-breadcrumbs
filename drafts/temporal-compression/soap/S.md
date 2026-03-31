# Temporal Compression — Subjective

A crosswalk between video codec theory and temporal graph theory (TVG). Two fields, different vocabularies, overlapping structures. Filed in each field's own terms.

---

## Shared structure

Parallels graded on a three-level rubric: **genuine** (same formal primitive or theorem pattern under relabeling), **moderate** (same structural role but different state space/objective), **forced** (workflow resemblance or metaphor only).

### Event graph / Prediction dependency DAG
Both fields admit DAG representations of temporal dependency. Temporal graph researchers call it a **temporal event graph** (TEG) ([Mellor 2018](https://academic.oup.com/comnet/article/6/4/639/4360827)) or **weighted event graph** ([Kivelä et al. 2018](https://www.nature.com/articles/s41598-018-29577-2)). Codec engineers use a **prediction dependency DAG** for packet or frame dependencies ([Chou & Miao 2006](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ChouM06.pdf)). Closely analogous static DAG representations: the TEG encodes event adjacency under time order; the prediction DAG encodes decode dependencies over packetized data units. The identification is representational, not ontological: same structural pattern, different node semantics. [S1, S2, S3; identification is the draft's own observation, not made in the cited papers]

### Chain fragility (genuine parallel)
**TVG**: Temporal reachability does not compose transitively. A→B at t₁ and B→C at t₂ only yields A→C if t₂ ≥ t₁ + ζ(e₁, t₁) — arrival must precede next departure, including latency ([Casteigts et al. 2012](https://www.site.uottawa.ca/~flocchin/Papers/tvg-ijpeds.pdf), §4.4). When the timing constraint fails, the journey breaks even though both edges exist.

**Codecs**: P-frame chains break when a reference is lost — every downstream frame becomes undecodable even though the data exists. This is dependency failure under reference loss, not a timing constraint.

**Shared**: Both exhibit fragility of sequential dependency: downstream validity depends on every earlier link in the chain. The failure mechanisms differ — TVG chains break when time-ordering fails to compose; codec chains break when a reference node is lost. The structural pattern (sequential dependency where any break severs the tail) is the same. [S1, S4]

**Algebraic analogue**: Krishnan (2014, Theorem 5.12) proves that duality gaps (max-flow < min-cut) arise from failures of exactness in directed sheaf cohomology. "Local consistency fails to globalize" is the structural content of chain fragility in sheaf-theoretic language. [S15]

Grading rationale: **genuine**. Both instantiate sequential dependency over a time-ordered dependency graph where tail validity requires every predecessor. The trigger differs; the dependency pattern does not.

### Temporal disconnection ↔ Scene-change detection (forced parallel)
**TVG**: Combinatorial reachability failure; forward composition stops working.

**Codecs**: Statistical change-point in visual prediction; forward prediction stops being useful.

Different failure criteria, different formal objects. The analogy is only at the workflow level: both detect when forward prediction should be abandoned. [S1]

### Waiting ↔ Buffering (forced parallel)
**TVG**: Waiting at intermediate vertices when the next edge is not yet available. Bounded waiting changes complexity and expressivity ([Casteigts et al. 2021](https://link.springer.com/article/10.1007/s00453-021-00831-w)).

**Codecs**: B-frame buffering via the decoded picture buffer (DPB) ([Richardson, H.264/AVC](https://www.vcodex.com/h264avc-picture-management/)). DPB exists because decode order, display order, and reference management diverge.

Both involve deferred usability under temporal constraints, but the mathematical objects are not close. [S1, S5]

### Journey types ↔ Reference frame selection (forced parallel)
**TVG**: Three formally distinct path objectives: foremost, fastest, shortest ([Casteigts et al. 2012](https://www.site.uottawa.ca/~flocchin/Papers/tvg-ijpeds.pdf), §4.5).

**Codecs**: Choose among candidate references or coding modes under a quality/bitrate objective. *Chou & Miao 2006 is about rate-distortion optimized packet scheduling, not reference frame list construction inside an encoder; a tighter citation is still needed.* [S1, S4]

Same family of tradeoff, but different state spaces and optimization problems. [S1]

---

## Temporal graph theory (TVG side)

### Formal framework
A temporal graph is a 5-tuple G = (V, E, T, ρ, ζ) where ρ is a presence function and ζ is a latency function. The formalism is edge-time based, not restricted to snapshot sequences. It unifies evolving graphs, temporal networks, and schedule-conforming paths ([Casteigts et al. 2012](https://www.site.uottawa.ca/~flocchin/Papers/tvg-ijpeds.pdf)). [S1]

### Journey
A time-respecting path: a sequence of edges where each edge departs after the previous one arrives, t_{i+1} ≥ t_i + ζ(e_i, t_i). Reachability is neither symmetric nor guaranteed to compose transitively. [S1]

### Temporal connectivity classes
13 classes with strict inclusion ([Casteigts et al. 2012](https://www.site.uottawa.ca/~flocchin/Papers/tvg-ijpeds.pdf), §5, Figure 4). The paper connects some classes to necessary conditions for particular distributed problems. [S1]

### Journey optimality criteria
Three formally distinct objectives:
- **Foremost**: arrive earliest
- **Fastest**: minimize duration
- **Shortest**: minimize hops

([Casteigts et al. 2012](https://www.site.uottawa.ca/~flocchin/Papers/tvg-ijpeds.pdf), §4.5) [S1]

### Waiting semantics
Bounded vs. unbounded waiting. Strict vs. non-strict journeys. These choices change complexity results ([Casteigts et al. 2021](https://link.springer.com/article/10.1007/s00453-021-00831-w)). [S5]

### Temporal spanners
Sparse subgraphs preserving journey distances up to multiplicative stretch α (called "temporal α-spanners"). Temporal cliques admit sparse spanners ([Casteigts, Peters & Schoeters 2021](https://www.sciencedirect.com/science/article/abs/pii/S0022000021000428)). [Bilò et al. 2022](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESA.2022.19) give upper and lower bounds on spanner size. The optimization target is edge count, not bits. [S6, S7]

### Blackout-tolerant spanners
Spanners that remain valid under timestep-wide edge deletion: a full temporal step vanishes and specified journeys are still preserved ([Blackout-tolerant spanners, 2023](https://www.sciencedirect.com/science/article/pii/S0022000023001009)). [S8]

### Timestamp perturbation
[Enright et al. 2025](https://eprints.gla.ac.uk/341921/) model worst-case reachability change under timestamp perturbation. This belongs to approximate temporal-structure preservation, not compression in the codec sense. [S9]

### Temporal network compression
[Adhikari et al. 2017](https://homepage.divms.uiowa.edu/~badhikari/assets/doc/papers/CondensingSDM2017.pdf) condense temporal networks while preserving propagation dynamics. [Allen et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11223189/) propose a commutator-based chronology compression method for preserving epidemic dynamics under aggregation. These are heuristic or dynamical-preservation programs, not formal rate-distortion theory. [S10, S11]

### Event graphs
Mellor (2018) defines the **temporal event graph (TEG)**, a static DAG encoding event adjacency under time order; DAG-ness is proved in Lemma 3.2. Kivelä et al. (2018) define the **weighted event graph**, which explicitly encapsulates the complete set of δt-constrained time-respecting paths. Mellor's TEG is narrower than Kivelä's construction. [S2, S3]

---

## Video codecs side

### Temporal prediction (H.261 → H.264)
H.261 (1988, [ITU-T H.261](https://www.itu.int/rec/T-REC-H.261)) uses intra/inter coding with motion-compensated prediction. MPEG-1 (1993, [ISO 11172-2](https://www.iso.org/standard/22411.html)) adds B-pictures. H.264/AVC (2003, [ITU-T H.264](https://www.itu.int/rec/T-REC-H.264)) adds multiple reference frames, decoded picture buffer management, and rate-distortion optimized mode selection. The dependency structure is engineered as a DAG, not usually treated as a formal mathematical object.

### I-frame / P-frame / B-frame
- **I-frame**: self-contained, no dependencies
- **P-frame**: forward prediction from a reference
- **B-frame**: prediction from past and future references; requires buffering

B-frames have no clean TVG analogue. [S1]

### Rate-distortion optimization
Bits vs. reconstruction quality via Lagrangian optimization: min D + λR. Sullivan & Wiegand (1998) systematize this approach for video encoder control, applying the Lagrangian framework of Shoham & Gersho (1988) to hybrid codecs ([Sullivan & Wiegand 1998](https://web.stanford.edu/class/ee398a/handouts/papers/Sullivan%20-%20RD%20Opt%20for%20Video.pdf)). TVG theory has no direct equivalent. [S12]

### Packet dependency formalization
[Chou & Miao 2006](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ChouM06.pdf) formalize packet dependencies for rate-distortion optimized streaming. The dependency DAG is taken as input to a scheduling problem, not itself optimized as a compressible object. [S4]

### Error accumulation and checkpoint resets
P-frame chains accumulate quantization or prediction error across references. I-frames reset that accumulation. TVG spanners preserve path properties approximately, but they do not model per-hop reconstruction error with explicit reset points. [S1]

### Error concealment
Approximate reconstruction when a reference is lost. TVG theory studies deletion and survivability, but not graceful approximate recovery of a missing journey. [S1]

### Multi-scale structure
Codecs operate at block, frame, and GOP levels simultaneously. Many temporal network compression papers work on snapshot sequences and treat the snapshot as the atomic unit. [S1]

### Static graph compression
[Navlakha et al. 2008](https://dl.acm.org/doi/abs/10.1145/1376616.1376661) propose MDL-based graph summarization with bounded per-node reconstruction error. This is not Shannon rate-distortion theory: no rate-distortion function, no converse bounds. A temporal extension with journey-aware distortion remains open. [S13]

---

## Converging from a third direction: algebraic topology on directed networks

Three bodies of work approach directed dependency networks from outside both video codecs and TVG theory. They do not solve the bridge, but they sharpen where a bridge could be built.

### Cellular sheaves on directed graphs (strongest candidate)

Sheaf cohomology provides algebraic tools for distinguishing removable from irreducible edgewise error on directed dependency graphs. This is the closest formal contact point with codec-style predictive error found so far.

**Predictive coding as a sheaf-coboundary system.** [Seely (2511.11092, NeurIPS 2025 Workshop)](https://arxiv.org/abs/2511.11092) constructs a cellular sheaf over a computational graph. The 0-cochain space C⁰ stores activations; the 1-cochain space C¹ stores edgewise prediction errors. The coboundary operator

> δ⁰: C⁰ → C¹, where (δ⁰s)\_e = s\_v − W\_e s\_u

maps activations to prediction errors. This has the same algebraic form as motion-compensated subtraction (current frame minus predicted frame), though the identification is the draft's analogy, not Seely's claim. The predictive-coding energy is E = ½‖δ⁰s‖², and inference is diffusion under the sheaf Laplacian L = (δ⁰)ᵀδ⁰.

With clamped inputs/outputs, Seely replaces δ⁰ by a relative coboundary D. Inference minimizes ½‖Dz + b‖². The Hodge decomposition is exact:

> b = (−Dz\*) + r\*, where −Dz\* ∈ im D (removable by inference) and r\* ∈ ker Dᵀ (irreducible)

The first cohomology H¹ = C¹/im δ⁰ ≅ ker(δ⁰)ᵀ captures prediction-error patterns that no choice of activations can eliminate. The learning gradient factorizes as ∂E/∂W\_e = (Hb)\_e · (Gb)\_uᵀ, where H is the harmonic projector and G is a pseudoinverse. "Learning requires both a residual and a source. If either vanishes, the update at edge e is zero."

Two points matter for the codec analogy: the framework is **not restricted to DAGs** (recurrent topologies handled via monodromy operator Φ), and it is **linear networks only**. The prediction step in codecs (subtract motion-compensated reference from current frame) is linear, though the full codec pipeline includes nonlinear stages (quantization, entropy coding, deblocking). The linear restriction aligns with the prediction stage specifically, not end-to-end. [S16]

**Network coding sheaves.** [Ghrist & Hiraoka](https://www2.math.upenn.edu/~ghrist/preprints/networkcodingshort.pdf) define a network coding sheaf F on a directed graph X = (V, E). Theorem 8: H⁰(X; F) = valid information flows. Max-flow ≤ min-cut derived via long exact sequence. Proposition 11 (Network Robustness): H⁰\_Z(X; F) = global flows on failure network G\\A; robust iff p⁰ = 0. Proposition 13 (Data Merging via Mayer-Vietoris): local flows merge iff g⁰(σ\_U, σ\_V) = 0. Exact network coding over a field k — no temporal dynamics, no noise. [S14]

**Semiring generalization.** [Krishnan 2014](https://arxiv.org/abs/1409.6712) treats sheaves on digraphs as functors from incidence posets into semimodules. Theorem 5.12: sheaf-theoretic MFMC — flow values equal the homotopy limit over cuts; equality when cohomology is exact. Duality gaps = failures of exactness. Works over **semirings** — handles probabilities, capacities, and tropical quantities natively. [S15]

**What sheaf theory still does not give**: temporal dynamics in the sheaf structure, rate-distortion, checkpoint/reset formalism.

### Tropical algebra / temporal state machines (quantitative and invariance side)

Two distinct threads; they should not be conflated.

**Temporal state machines** ([PMC 9792072](https://pmc.ncbi.nlm.nih.gov/articles/PMC9792072/)). The tropical semiring T = (R∪{∞}, min, +) is physically realized as (first-arrival, delay). Key result — **time-translational invariance constraint**: all pure race logic must satisfy f(t₁+δ,...,tₙ+δ) = f(t₁,...,tₙ)+δ. Consequences:

- Raw addition of two time codes is **physically forbidden** by time-translational symmetry.
- Pure temporal logic = tropical linear (min and delay only).
- Tropical multiplication **requires memory** (state). Two-phase: (1) store incoming wavefront, (2) apply stored vector as delays. Order matters — non-commutativity arises from causal ordering of memory write/read.
- This is the formal boundary between stateless temporal composition and stateful computation. DAG structure enforces causal ordering. [S18]

**Parametric tropical geometry.** [Joswig et al. 2019](https://arxiv.org/abs/1904.01082) study parametric shortest paths via tropical geometry. Parametric weights (intervals), not temporal dynamics. No non-commutativity (abelian group assumed). Should not be cited for temporal state or non-commutativity claims. [S17]

The strongest result here is the invariance theorem. It gives a principled reason why some temporal compositions require state and ordered execution — the formal boundary between journey-like composition and buffering.

### Persistent homology / path homology (weaker than previously claimed)

This section is weaker than the sheaf story and weaker than the earlier draft suggested.

[Chowdhury & Huntsman 2020](https://arxiv.org/abs/2008.11885) apply path homology to temporal networks through **static digraph snapshots** via sliding time windows, not the temporal structure itself. One formal result: Proposition 1 (mutual dyad β₂(Wₙ) = n−1). No stability theorems. No journey or reachability connection. [S19]

[Pritam et al. 2025](https://arxiv.org/html/2502.10076v1) classify temporal graphs using persistent homology with **average-timestamp-gap filtrations**, not deep temporal motif structure. Classification accuracy 92–100% but topologically shallow. No stability theorems in the algebraic-topology sense. No journey connection. [S20]

[Chacholski et al. 2022](https://arxiv.org/abs/2012.01033) — filtered chain complex decomposition. Interval spheres retain more geometric info than barcodes. Pure algebraic machinery — no temporal networks, no stability. [S22]

This literature supplies summary invariants and algebraic tools, but not a temporal-compression theory. It should not be used as if it already gives distortion bounds or journey-aware topology. [S19, S20, S21, S22]

### Speculative synthesis

The most defensible synthesis is now narrower. A cellular sheaf on an event/dependency graph makes prediction error algebraic. Seely provides the operator dictionary:

- activations = 0-cochains
- prediction errors = 1-cochains
- prediction map = coboundary δ⁰
- removable error = image term (im D)
- irreducible error = harmonic/cohomological term (ker Dᵀ = H¹)

Krishnan's semiring generality (Theorem 5.12 works over semirings, so tropical coefficients are algebraically admissible) and the temporal state machines' invariance result (the boundary between tropical-linear and tropical-multiplicative is the boundary between stateless prediction and stateful buffering) strengthen the synthesis.

What remains missing: an encoding family, a distortion functional, a rate constraint, and temporal dynamics in the sheaf structure. Most of the ingredients exist separately; the assembly doesn't. This reinforces the "bridge is unbuilt" thesis rather than weakening it.

---

## Open problems

### 1. Rate-distortion bounds for journey observables
Given a bit budget R, what is the minimum distortion in journey metrics (reachability, duration, hop count)?

This requires:
- A concrete **encoding family** (adjacency stream, timestamped edge list, snapshot deltas, event graph)
- A concrete **distortion functional** D(G, Ĝ) on journey observables
- A concrete **temporal-graph model** to make bounds nontrivial
- A definition of **admissible decoders**

Navlakha et al. (2008) is MDL on static graphs. Adhikari et al. (2017) and Allen et al. (2024) preserve dynamics heuristically. None provides information-theoretic rate-distortion bounds for temporal journeys. [S10, S11, S13]

### 2. Per-hop error accumulation with checkpoint-forced resets
Seely suggests a sharper version of this problem. On a directed dependency graph, let the coboundary produce edgewise residuals and let Hodge decomposition split them into removable and irreducible components. Then the right quantity may not be a scalar additive law ε(e₁) ⊕ ... ⊕ ε(eₖ), but a decomposition into:

- **Image part** (in im D): eliminable by inference — better activations (encoder choices) can remove it
- **Harmonic part** (in ker Dᵀ = H¹): not eliminable by any activation assignment — the cohomological obstruction

A speculative reading: checkpoints could correspond to clamped boundary conditions on a subgraph, restricting to a sub-complex where H¹ vanishes. The learning gradient factorization (∂E/∂W\_e = (Hb)\_e · (Gb)\_uᵀ) shows weight updates are driven by the irreducible component — suggestive of how codec engineers update prediction parameters between GOPs, though this parallel is the draft's, not Seely's.

The open question: for a specified temporal graph model, characterize bounds on checkpoint spacing that keep the harmonic component below a quality threshold.

Restriction to linear networks aligns with codec prediction (motion-compensated subtraction is linear). Nonlinear extension requires Jacobian linearization at equilibrium. [S1, S16]

---

## Glossary

*Note: framework mappings use the Natural Framework roles (Perceive, Cache, Filter, Attend, Remember, Consolidate). These are proposals for the SOAP pipeline's Objective section, not conclusions.*

| System term | Field | Proposed framework mapping | Confidence |
|---|---|---|---|
| I-frame | Codecs | Remember (checkpoint write) | medium |
| P-frame | Codecs | Cache (delta from reference) | medium |
| B-frame | Codecs | Cache (bidirectional delta, requires buffering) | medium |
| GOP | Codecs | ambiguous: Consolidate cycle boundary vs. engineering parameter | low |
| Rate-distortion optimization | Codecs | Filter (tradeoff gate: bits vs. quality) | medium |
| Scene-change detection | Codecs | Filter (detect prediction failure) | medium |
| Error concealment | Codecs | Perceive (approximate reconstruction) | low |
| Journey | TVG | ambiguous: forward pass through pipeline vs. specific path instance | medium |
| Temporal spanner | TVG | Filter (sparse subgraph preserving properties) | medium |
| Temporal connectivity class | TVG | structural constraint on what roles are possible | medium |
| Event graph | TVG/Codecs | Cache (static dependency representation) | low |
| Foremost/fastest/shortest | TVG | Attend (objective selection among path candidates) | medium |
| Waiting/bounded waiting | TVG | Cache (temporal buffer) | low |
| Temporal disconnection | TVG | Filter (reachability failure detection) | medium |
| Sheaf coboundary δ⁰ | Alg. topology | Cache→Filter (maps activations to prediction errors; (δ⁰s)\_e = s\_v − W\_e s\_u) | medium |
| Sheaf Laplacian L = (δ⁰)ᵀδ⁰ | Alg. topology | Filter (inference diffusion operator) | low |
| Sheaf cohomology H¹ | Alg. topology | Filter output (irreducible prediction error — patterns no activation choice eliminates) | medium |
| Hodge decomposition | Alg. topology | Filter (separates removable from irreducible error) | medium |
| Relative coboundary D | Alg. topology | Remember/Filter under clamped boundary conditions | low |
| Harmonic projector H | Alg. topology | Attend (selects the learning-relevant component of error) | low |
| Tropical invariance constraint | Network calculus | structural boundary between stateless (Cache) and stateful (Remember) temporal ops | medium |
| Min-plus convolution | Network calculus | Cache (delay/buffer composition) | low |
| Persistence barcode | Alg. topology | Cache (topological summary, not reconstructible) | low |

---

## Author queries

### Resolved

~~7. Does the sheaf coboundary on an event graph literally recover P-frame prediction error as a special case?~~
**Structurally yes.** Seely's coboundary (δ⁰s)\_e = s\_v − W\_e s\_u has the same algebraic form as motion-compensated subtraction. The checkpoint/reset reading (restrict to a sub-complex where H¹ vanishes) is the draft's proposed interpretation, not a result in Seely. The structural match is precise; whether it is operationally useful remains open.

~~8. Path homology stability theorems bound perturbation sensitivity. Can these be reinterpreted as distortion bounds?~~
**No.** The cited papers (Chowdhury 2020, Pritam 2025) contain no stability theorems. Chowdhury computes on static snapshots; Pritam uses average-gap filtrations with pointwise bounds only. This line requires different source papers.

### Open

1. The event graph ≅ prediction dependency DAG identification is representational. Where does it break first: B-frame bidirectionality, multi-reference prediction, or weighted event graph δt-semantics?
2. Temporal spanners optimize edge count, codec R-D optimizes bits. Is edge count ever a defensible proxy for bitrate, or does the encoding family matter?
3. Is the lack of per-hop error accumulation in standard TVG a conceptual absence, or a modeling choice from exact/unweighted journey semantics?
4. Seely's sheaf formalism is linear. For motion-compensated residual coding, is the linear restriction the right abstraction rather than a limitation?
5. The empirical R-D curve for temporal graphs shows a cliff effect. Is the threshold characterizable in terms of temporal connectivity class?
6. Ghrist-Hiraoka and Krishnan give exactness/flow language on directed graphs. Can any of that machinery be lifted to temporal event graphs without collapsing time into a static encoding?
7. The temporal state-machine invariance result says composition that breaks time-translation symmetry requires memory. Does this supply the principled reason B-frame-like structures have no clean TVG analogue?
8. Krishnan's Theorem 5.12 works over semirings. Does the tropical semiring T = (R∪{∞}, min, +) yield a meaningful flow-cut duality on temporal event graphs? If so, the duality gap measures something about temporal reachability — what?
9. The invariance constraint draws a formal line between stateless temporal composition and stateful computation. Does this boundary correspond to a known TVG distinction (strict vs. non-strict journeys, or a connectivity class boundary)?

---

## Sources

- **S1**: Draft — `~/Documents/june.kim/_drafts/temporal-compression.md`
- **S2**: Mellor 2018 — https://academic.oup.com/comnet/article/6/4/639/4360827
- **S3**: Kivelä et al. 2018 — https://www.nature.com/articles/s41598-018-29577-2
- **S4**: Chou & Miao 2006 — https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ChouM06.pdf
- **S5**: Casteigts et al. 2021 — https://link.springer.com/article/10.1007/s00453-021-00831-w
- **S6**: Casteigts, Peters & Schoeters 2021 — https://www.sciencedirect.com/science/article/abs/pii/S0022000021000428
- **S7**: Bilò et al. 2022 — https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESA.2022.19
- **S8**: Blackout-tolerant spanners 2023 — https://www.sciencedirect.com/science/article/pii/S0022000023001009
- **S9**: Enright et al. 2025 — https://eprints.gla.ac.uk/341921/
- **S10**: Adhikari et al. 2017 — https://homepage.divms.uiowa.edu/~badhikari/assets/doc/papers/CondensingSDM2017.pdf
- **S11**: Allen et al. 2024 — https://pmc.ncbi.nlm.nih.gov/articles/PMC11223189/
- **S12**: Sullivan & Wiegand 1998 — https://web.stanford.edu/class/ee398a/handouts/papers/Sullivan%20-%20RD%20Opt%20for%20Video.pdf
- **S13**: Navlakha et al. 2008 — https://dl.acm.org/doi/abs/10.1145/1376616.1376661
- **S14**: Ghrist & Hiraoka — https://www2.math.upenn.edu/~ghrist/preprints/networkcodingshort.pdf
- **S15**: Krishnan 2014 — https://arxiv.org/abs/1409.6712
- **S16**: Seely 2025 (NeurIPS Workshop) — https://arxiv.org/abs/2511.11092
- **S17**: Joswig et al. 2019 — https://arxiv.org/abs/1904.01082
- **S18**: Temporal state machines (tropical algebra) — https://pmc.ncbi.nlm.nih.gov/articles/PMC9792072/
- **S19**: Chowdhury & Huntsman 2020 — https://arxiv.org/abs/2008.11885
- **S20**: Pritam et al. 2025 — https://arxiv.org/html/2502.10076v1
- **S21**: Path homologies of motifs — https://appliednetsci.springeropen.com/articles/10.1007/s41109-021-00441-z
- **S22**: Chacholski et al. 2022 — https://arxiv.org/abs/2012.01033
