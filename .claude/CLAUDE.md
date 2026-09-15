# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A pure HTML/CSS/JS simulation of the Windows XP desktop, served as a static site (GitHub Pages). No build step, no package manager, no dependencies:

- `index.html` — static DOM: boot screen, desktop, icons, taskbar, start menu, shutdown overlay; links every CSS partial and loads `js/main.js` as an ES module (`<script type="module">`)
- `css/` — XP theming, split by area: `base.css` (reset), `boot.css`, `desktop.css` (wallpaper + icons), `window.css` (chrome shared by every app window: titlebar, menubar, resize handle), `taskbar.css`, `start-menu.css`, `shutdown.css`, plus one file per app under `css/apps/`
- `js/` — `window-manager.js` (window creation/focus/drag/resize/close), `boot.js` (boot sequence + clock), `desktop.js` (icon selection, Start menu, shutdown/log off wiring), `main.js` (entry point), and one module per app under `js/apps/` registered in `js/apps/index.js`

## Running locally

```powershell
python -m http.server 8080
```

Open http://localhost:8080. Because `js/main.js` loads as an ES module, the app must be served over HTTP(S) — opening `index.html` directly via `file://` will fail with CORS errors on the module imports. There is no build/lint/test tooling in this repo — changes are verified by reloading the page in a browser.

## Architecture

Each JS file is a native ES module (no bundler, no transpilation) — `import`/`export` work as-is in the browser since files are served over HTTP.

- **Window manager** (`js/window-manager.js`: `createWindow`, `focusWindow`, `closeWindow`, `toggleMaximize`): all app windows are plain `<div class="window">` elements created dynamically and appended to `#windows`. Each open window is tracked in the module-local `openWindows` Map (id → `{el, taskEl, minimized, appId, title, prevRect}`), which is the single source of truth for taskbar sync, z-order (`zTop` counter), minimize/restore, and maximize/restore (via `prevRect`). Dragging and resizing are done with manual `mousemove`/`mouseup` listeners on `window`, not CSS. `createWindow(...)` returns `{ id, el, body }`, where `body` is the `.window-body` element an app attaches its own listeners to.
- **Apps registry** (`js/apps/index.js`): imports each app's factory function from its own file under `js/apps/` (`notepad.js`, `mycomputer.js`, `ie.js`, `paint.js`, `minesweeper.js`, `recycle.js`, `about.js`) and exports them as the `APPS` object, keyed by app id. Each app module imports `createWindow` from `../window-manager.js` and wires up any app-specific behavior (e.g. Paint's canvas drawing, Minesweeper's grid logic) directly against the returned `body`.
- **Launch points**: desktop icon double-click and Start menu item click (wired in `js/desktop.js`) both just call `APPS[appId]()` — both read the target app from a `data-app` attribute on the DOM element.
- Adding a new app means: add a desktop icon and/or start menu entry in `index.html` with the right `data-app` value, add `js/apps/<name>.js` exporting a factory that calls `createWindow(...)`, register it in `js/apps/index.js`, add a `<link>` for `css/apps/<name>.css` in `index.html` if it needs its own styling.

## Constraints from the README's own "Extend it" notes

These are known-empty hooks/ideas already documented, not yet implemented — relevant if asked to build on them:
- Notepad content is not persisted (no localStorage)
- IE's address bar is decorative — it doesn't load real content in an iframe
- No BSOD easter egg yet
