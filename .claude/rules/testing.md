# Verifying changes

There is no build, lint, or test suite in this repo. Every change is verified by hand in a
browser:

```powershell
python -m http.server 8080
```

Open `http://localhost:8080`. Because `js/main.js` loads as an ES module, the app must be served
over HTTP(S) — opening `index.html` directly via `file://` will fail with CORS errors on the
module imports.

Before calling a change done:

- Reload the page and check the browser console for errors (module import failures show up here).
- Exercise the golden path for whatever you touched (open the app, use its main feature, close
  it) and, if relevant, edge cases like minimize/maximize/restore, dragging/resizing, and opening
  multiple windows at once.
- Watch for regressions in unrelated apps if you touched shared code (`js/window-manager.js`,
  `css/window.css`, boot sequence) — a change there can affect every app at once.
- If you can't actually load the page in a browser, say so explicitly rather than claiming the
  feature works — passing "no errors on read-through" is not the same as a verified feature.
