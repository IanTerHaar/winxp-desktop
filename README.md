# 🪟 Windows XP Desktop

A pure HTML/CSS/JS Windows XP simulation. Boot screen, Bliss-inspired wallpaper,
Start menu, taskbar with clock, draggable + resizable windows, and working apps:

- 📝 **Notepad** — real editable text
- 🖥️ **My Computer** — themed file explorer
- 🌐 **Internet Explorer** — fake MSN homepage
- 🎨 **Paint** — actual canvas drawing (color + brush size)
- 💣 **Minesweeper** — fully playable, right-click to flag
- 🗑️ **Recycle Bin**
- ℹ️ **About Windows** — the classic dialog

## Run locally

```powershell
python -m http.server 8080
```

Open <http://localhost:8080>.

## Deploy to GitHub Pages

```powershell
git init
git add .
git commit -m "Windows XP desktop"
git branch -M main
git remote add origin https://github.com/<you>/winxp-desktop.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: GitHub Actions**.

## Extend it

- Save Notepad content to `localStorage`
- Add **Solitaire** or **3D Pinball**
- Wire the "Internet Explorer" address bar to actually load pages in an `<iframe>`
  (subject to X-Frame-Options)
- Add a **Windows Media Player** with an audio element
- Real Bliss wallpaper — drop `bliss.jpg` in the folder and change
  `#wallpaper { background: url('bliss.jpg') center/cover; }`
  (make sure you have rights to redistribute it)
- **BSOD** easter egg on Ctrl+Alt+Del

## Files

- `index.html` — DOM
- `css/` — XP theming, split by area (`base`, `boot`, `desktop`, `window`, `taskbar`,
  `start-menu`, `shutdown`) plus `css/apps/*.css` per app
- `js/` — window manager (`window-manager.js`), boot sequence (`boot.js`), desktop/Start
  menu/shutdown wiring (`desktop.js`), and entry point (`main.js`), loaded as an ES module;
  `js/apps/*.js` has one file per app, registered in `js/apps/index.js`
- `.github/workflows/deploy.yml` — auto-deploy to Pages
