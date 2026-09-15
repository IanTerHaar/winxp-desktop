/* ---------- Desktop icons, Start menu, shutdown/log off ---------- */

import { APPS } from "./apps/index.js";

export function initDesktop() {
  initIcons();
  const toggleStart = initStartMenu();
  initShutdown(toggleStart);
}

function initIcons() {
  document.querySelectorAll(".icon").forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".icon").forEach(i => i.classList.remove("selected"));
      icon.classList.add("selected");
    });
    icon.addEventListener("dblclick", () => {
      const app = icon.dataset.app;
      if (APPS[app]) APPS[app]();
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".icon")) {
      document.querySelectorAll(".icon").forEach(i => i.classList.remove("selected"));
    }
  });
}

function initStartMenu() {
  const startBtn = document.getElementById("start-btn");
  const startMenu = document.getElementById("start-menu");

  function toggleStart(force) {
    const open = force ?? startMenu.hidden;
    startMenu.hidden = !open;
    startBtn.classList.toggle("active", open);
  }

  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleStart();
  });
  document.addEventListener("click", (e) => {
    if (!startMenu.hidden && !startMenu.contains(e.target) && !startBtn.contains(e.target)) {
      toggleStart(false);
    }
  });
  startMenu.querySelectorAll(".sm-item").forEach(item => {
    item.addEventListener("click", () => {
      const app = item.dataset.app;
      if (app && APPS[app]) APPS[app]();
      toggleStart(false);
    });
  });

  return toggleStart;
}

function initShutdown(toggleStart) {
  const shutdownEl = document.getElementById("shutdown");

  document.getElementById("shutdown-btn").addEventListener("click", () => {
    toggleStart(false);
    shutdownEl.hidden = false;
  });
  document.getElementById("logoff-btn").addEventListener("click", () => {
    toggleStart(false);
    shutdownEl.hidden = false;
  });
  shutdownEl.addEventListener("click", () => location.reload());
}
