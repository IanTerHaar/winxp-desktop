import { createWindow } from "../window-manager.js";

export function about() {
  return createWindow({
    appId: "about", title: "About Windows", icon: "🪟",
    width: 420, height: 320,
    content: `
      <div class="about-body">
        <div class="flag">
          <div class="q" style="background:#ff2020"></div>
          <div class="q" style="background:#7cff20"></div>
          <div class="q" style="background:#2094ff"></div>
          <div class="q" style="background:#ffcc20"></div>
        </div>
        <h2>Microsoft® Windows XP</h2>
        <p>Version 5.1 (Build 2600.xpsp_sp3.pretend)</p>
        <p>Copyright © 1985–2001 Microsoft Corporation<br /><em>(Simulated for fun)</em></p>
        <hr style="margin: 12px 0;" />
        <p>This is a client-side Windows XP simulation.<br />
        No emulation — just HTML, CSS, and JavaScript.</p>
        <p>Hosted for free on <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>.</p>
      </div>
    `,
  });
}
