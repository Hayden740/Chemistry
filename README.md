# Nothing lost, nothing made

An online lesson for Year 9 Chemistry at Seaford Secondary College on the law of conservation of mass, writing chemical equations and balancing equations (Australian Curriculum AC9S9U07).

Students start on the landing page and work through 11 activities in three parts. Progress ticks are saved in the student's own browser, so nothing needs a login.

## Activities

| Part | Activity | Type |
| --- | --- | --- |
| 1. Conservation of mass | Nothing is lost | Reading |
| | Mass detective | Prediction |
| | Mass maths | Practice |
| 2. Writing equations | Anatomy of an equation | Reading |
| | Formula match | Game |
| | Word equation builder | Practice |
| | Atom counter | Practice |
| 3. Balancing equations | How to balance | Reading |
| | Balancing lab | Practice |
| | Spot the mistake | Error hunt |
| | Final challenge | Challenge with printable results summary |

## Putting it online with GitHub Pages

1. Create a new public repository on GitHub, for example `Chemistry`.
2. Upload everything in this folder, keeping the `activities`, `css` and `js` folders as they are. The hidden `.nojekyll` file should go up too.
3. In the repository go to **Settings**, then **Pages**. Under **Build and deployment** choose **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then save.
4. After a minute or two the site will be live at `https://<your-username>.github.io/Chemistry/`.

## Editing

There is no build step. Everything is plain HTML, CSS and JavaScript.

- `js/lesson.js` holds the activity list, progress saving and the chemistry helpers (formula parsing, atom tallies, particle drawings).
- `js/equations.js` holds the 36 equations used in the Balancing lab and the Final challenge. Each has its answer coefficients, and every one has been checked to balance in lowest whole numbers.
- `css/style.css` uses the Seaford 2025 palette.

Progress is stored in `localStorage` under the key `seaford-y9-equations-v1`. Students can clear their ticks from the link in the landing page footer.
