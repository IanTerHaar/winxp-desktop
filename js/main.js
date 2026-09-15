/* ---------- Entry point ----------
   Module scripts run after HTML parsing completes, so the DOM
   is already available here — no DOMContentLoaded wait needed. */

import { boot } from "./boot.js";
import { initDesktop } from "./desktop.js";
import { APPS } from "./apps/index.js";

boot();
initDesktop();

// Welcome window, shortly after the desktop appears.
setTimeout(() => {
  if (!document.getElementById("desktop").hidden) APPS.about();
}, 2900);
