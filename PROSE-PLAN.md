# Prose Style — Papers Section Plan

A historical arc for a papers collection on prose writing. Same format as Scientific Method: each work responds to a failure of what came before. No runnable code required.

**Thesis framing:** Orwell's rules are a linter. Strunk is a type-checker. Williams is a dependency analyzer. Compilable prose is the frontier of programming.

---

## Proposed works

| Work | What it changed | Source |
|------|----------------|--------|
| Aristotle, *Rhetoric* (~350 BCE) | Gave persuasion a type system: ethos, pathos, logos. Every argument is a function from audience to belief. | [MIT Classics](http://classics.mit.edu/Aristotle/rhetoric.html) / [Perseus (CC BY-SA 3.0)](http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0060) |
| Quintilian, *Institutio Oratoria* (~95 AD) | Full-stack education for an orator. Invented the rhetorical canon: invention, arrangement, style, memory, delivery. | [LacusCurtius (PD translation)](https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Quintilian/Institutio_Oratoria/home.html) |
| Bacon, *Essays* (1597–1625) | Broke from Ciceronian ornament. Aphorism as compression: maximum meaning per sentence. | [Internet Archive (PD)](https://archive.org/details/essaysoffrancisb00baco) |
| Blair, *Lectures on Rhetoric and Belles Lettres* (1783) | Taste as teachable. Systematized rhetoric for an age of readers, not listeners. | [Internet Archive (PD)](https://archive.org/details/lecturesonrheto31blaigoog) |
| Strunk, *The Elements of Style* (1918) | Omit needless words. The shortest complete specification for English prose. | [Project Gutenberg (PD)](https://www.gutenberg.org/ebooks/37134) |
| Orwell, "Politics and the English Language" (1946) | Vague language is political, not accidental. Six rules as a linter. | US copyright (Orwell Estate) — link only. [Orwell Foundation](https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/) |
| Zinsser, *On Writing Well* (1976) | Writing is thinking made visible. Clutter is a thinking failure, not a style problem. | Copyrighted — cite and link to purchase only |
| Williams, *Style: Lessons in Clarity and Grace* (1981) | Old information before new. Nominalizations kill sentences. A sentence is a dependency graph. | Copyrighted — cite and link to purchase only |
| Google, *Developer Documentation Style Guide* (2017–) | Strunk's "use the active voice" with the exceptions finally written down: emphasize the object, de-emphasize the subject, actor is irrelevant. The first style guide precise enough to apply mechanically. | [CC BY 4.0](https://developers.google.com/style) |

---

## Arc (failures that drove the next step)

| Failure | What broke | What it produced |
|---------|-----------|-----------------|
| Sophists | Rhetoric without ethics — persuasion as a trick | Aristotle's type system for argument |
| Loss of the Roman republic | Oratory without civic function | Quintilian's complete education |
| Ciceronian ornament | Elaboration as status signal, substance optional | Bacon's aphoristic compression |
| Neoclassical excess | Style as decoration, divorced from thought | Blair's taste as teachable discipline |
| Victorian elaboration | Wordiness as respectability | Strunk's "omit needless words" |
| Political euphemism | Abstraction hiding atrocity | Orwell's plain language rules |
| Academic obscurantism | Nominalization hiding absent thought | Williams' sentence dependency model |
| Engineering documentation at scale | Rules without exceptions aren't rules — they're wishes. Strunk said "use the active voice" but never said when not to. | Google's three exceptions: now the rule compiles |

---

## Vocabulary we inherited

| Term | Source | What it settled |
|------|--------|----------------|
| Ethos, pathos, logos | Aristotle | The three modes of persuasion |
| Invention, arrangement, style, memory, delivery | Quintilian | The five canons of rhetoric |
| Aphorism | Bacon | Compression as a rhetorical form |
| Taste | Blair | Aesthetic judgment as learnable, not innate |
| "Omit needless words" | Strunk | Brevity as a moral, not just stylistic, virtue |
| Nominalization | Williams | Verbs turned into nouns — the signature of obscure prose |
| Active voice with exceptions | Google style guide | The first time "use active voice" came with falsifiable boundaries |

---

## Implementation notes

- Path: `/writing/` or `/prose/`
- Emoji: ✍️
- Format: Scientific Method template (arc intro, works table, vocabulary table, failures table)
- Public domain works (Aristotle through Strunk): can excerpt freely
- Copyrighted works (Orwell, Zinsser, Williams): link only — same treatment as Kuhn/Mayo in Scientific Method
- Individual paper pages: optional, lower priority than the index
