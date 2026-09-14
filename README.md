# Chemical Reactions Practice Test (Year 9 Science)

A self-contained practice test for the Chemical Reactions topic test. One HTML file, no build step, no accounts, no data leaves the student's browser.

Five sections, 50 marks, roughly 50 minutes:

| Section | Type | Marks | Marked by |
|---|---|---|---|
| A | Multiple choice | 10 | the page |
| B | Short answer | 14 | the student, against a model answer |
| C | Balancing equations | 8 | the page |
| D | Practical and data | 10 | mixed |
| E | Extended response | 8 | the student, against a model answer |

Students work one section at a time and cannot go back. At the end they get a section breakdown, a total out of 50, and a four-character code to report.

## Putting it on GitHub Pages

1. Create a repo (or use an existing one) and upload `index.html`, `README.md` and `.nojekyll`.
2. Settings > Pages > Deploy from a branch > `main` > `/ (root)` > Save.
3. The site appears at `https://<username>.github.io/<repo>/` within a minute or two.

## Checking the codes

The code is generated from the total score, so it cannot be invented backwards without this table. If a student reports a score and a code that do not match this table, the score has been edited.

| Score | Code | Score | Code | Score | Code |
|---|---|---|---|---|---|
| 0 | FK29 | 17 | GH50 | 34 | HF71 |
| 1 | LX42 | 18 | MV63 | 35 | NS84 |
| 2 | RL55 | 19 | SJ76 | 36 | TG97 |
| 3 | XY68 | 20 | YW89 | 37 | ZT10 |
| 4 | DM81 | 21 | FK02 | 38 | GH23 |
| 5 | KZ94 | 22 | LX15 | 39 | MV36 |
| 6 | QN07 | 23 | RL28 | 40 | SJ49 |
| 7 | WB20 | 24 | XY41 | 41 | YW62 |
| 8 | CP33 | 25 | DM54 | 42 | FK75 |
| 9 | JC46 | 26 | KZ67 | 43 | LX88 |
| 10 | PQ59 | 27 | QN80 | 44 | RL01 |
| 11 | VD72 | 28 | WB93 | 45 | XY14 |
| 12 | BR85 | 29 | CP06 | 46 | DM27 |
| 13 | HF98 | 30 | JC19 | 47 | KZ40 |
| 14 | NS11 | 31 | PQ32 | 48 | QN53 |
| 15 | TG24 | 32 | VD45 | 49 | WB66 |
| 16 | ZT37 | 33 | BR58 | 50 | CP79 |

The code is a deterrent, not security. Anyone who opens the browser console can read the answers. Treat it as honest practice, not as an assessment you would put in a grade book.

## Changing the questions

All content lives in the `SECTIONS` array near the top of the `<script>` block in `index.html`. Each item has a type:

- `mc` — `opts` array and `a` for the index of the correct option (counting from 0)
- `bal` — `parts`, `prods`, and `a` as the list of coefficients in order, reactants first
- `num` — `a` for the value, `tol` for the tolerance
- `text` — `accept` as a list of acceptable lowercase answers
- `self` and `essay` — `model` for the model answer and `guide` for the marking notes

Marks come from each item's `m` value, so if you add or remove a question, update the section's `marks` value and the `/ 50` total in `setReadout` to match.
