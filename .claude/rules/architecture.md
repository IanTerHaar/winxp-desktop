# Architecture

This is a static site with **no build step and no dependencies**. Keep it that way unless
explicitly asked to change it.

- `index.html` — static DOM: boot screen, desktop, icons, taskbar, start menu, shutdown overlay.
  Links every CSS partial and loads `js/main.js` as an ES module (`<script type="module">`).
- `css/` — XP theming, split by area: `base.css` (reset), `boot.css`, `desktop.css` (wallpaper +
  icons), `window.css` (chrome shared by every app window: titlebar, menubar, resize handle),
  `taskbar.css`, `start-menu.css`, `shutdown.css`, plus one file per app under `css/apps/`.
- `js/` — `window-manager.js` (window creation/focus/drag/resize/close), `boot.js` (boot sequence
  + clock), `desktop.js` (icon selection, Start menu, shutdown/log off wiring), `main.js` (entry
  point), and one module per app under `js/apps/` registered in `js/apps/index.js`.

Because `js/main.js` loads as an ES module, the app must be served over HTTP(S) — opening
`index.html` directly via `file://` fails with CORS errors on the module imports. Always use
`python -m http.server 8080` (see [[testing]]).

Each JS file is a native ES module (no bundler, no transpilation) — `import`/`export` work as-is
in the browser since files are served over HTTP. Don't introduce a bundler, transpiler, or
non-native module syntax.

## Window manager

`js/window-manager.js` (`createWindow`, `focusWindow`, `closeWindow`, `toggleMaximize`) is the
window manager. All app windows are plain `<div class="window">` elements created dynamically and
appended to `#windows`.

- The module-local `openWindows` Map (id → `{el, taskEl, minimized, appId, title, prevRect}`) is
  the single source of truth for taskbar sync, z-order (`zTop` counter), minimize/restore, and
  maximize/restore (via `prevRect`). Don't introduce a second source of truth for window state.
- Dragging and resizing use manual `mousemove`/`mouseup` listeners on `window`, not CSS or a
  library. Follow that pattern for any new drag/resize behavior.
- `createWindow(...)` returns `{ id, el, body }`; apps attach their own listeners to `body`.

## Apps registry

`js/apps/index.js` imports each app's factory function from its own file under `js/apps/`
(`notepad.js`, `mycomputer.js`, `ie.js`, `paint.js`, `minesweeper.js`, `recycle.js`, `about.js`)
and exports them as the `APPS` object, keyed by app id. Each app module imports `createWindow`
from `../window-manager.js` and wires up its own behavior (e.g. Paint's canvas drawing,
Minesweeper's grid logic) directly against the returned `body`.

Launch points (desktop icon double-click and Start menu item click, wired in `js/desktop.js`) both
just call `APPS[appId]()`, reading the target app from a `data-app` attribute on the DOM element.
Any new launch surface should follow this same `data-app` + `APPS[appId]()` convention rather than
inventing a new dispatch mechanism.

See [[adding-apps]] for the concrete steps to add a new app.
