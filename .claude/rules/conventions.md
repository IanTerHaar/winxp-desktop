# Code conventions

- No build step, no package manager, no npm dependencies. Vanilla HTML/CSS/JS only, using native
  ES modules (`import`/`export`) served over HTTP — no bundler, no transpilation. If a task seems
  to need a library or framework, say so and ask before adding one — don't silently introduce
  tooling into this repo.
- Keep new code consistent with what's already there: window/app logic goes in `js/`, one module
  per app under `js/apps/` registered in `js/apps/index.js` (see [[architecture]]); theming goes
  in `css/`, split by area with one file per app under `css/apps/`; DOM structure goes in
  `index.html`.
- Default to no comments. Only comment when the *why* is genuinely non-obvious (a workaround, a
  hidden browser quirk, a subtle invariant in window/z-order state) — not to restate what the code
  does.
- Don't add abstractions, config options, or error handling for cases this simulation can't
  encounter (there's no server, no real file I/O, no real network requests — e.g. IE's address bar
  is intentionally decorative). Match the scope of the existing fakery rather than making a fake
  feature "more real" unless asked.
- Keep features additive and self-contained: a new app shouldn't require refactoring the window
  manager unless the task explicitly calls for that.
