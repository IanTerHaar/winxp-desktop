# Adding a new app or feature

Follow all of these steps together — a partial change (e.g. a factory with no registry entry)
leaves the app unreachable and untestable:

1. Add a desktop icon and/or Start menu entry in `index.html` with the correct `data-app` value.
2. Add `js/apps/<name>.js` exporting a factory function that imports `createWindow` from
   `../window-manager.js`, calls it to build the window, and wires up any app-specific behavior
   against the returned `body` (event listeners, canvas logic, grid logic, etc.).
3. Register the new factory in `js/apps/index.js` so it's part of the exported `APPS` object.
4. If the app needs its own styling, add `css/apps/<name>.css` and link it from `index.html`
   alongside the other per-app stylesheets.
5. Reload the page in a browser (served over HTTP — see [[testing]]) and manually exercise the new
   app end-to-end (open, interact, close, minimize, maximize, reopen).

Don't add a bundler, transpiler, or non-native module system to support a new app. If an app's
logic genuinely doesn't fit the existing ES-module-per-app pattern, flag that tradeoff to the user
before introducing new tooling.
