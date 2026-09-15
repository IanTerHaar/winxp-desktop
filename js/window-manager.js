/* =========================================================
   Window manager — creating, focusing, dragging, resizing,
   minimizing/maximizing, and closing app windows.
   ========================================================= */

const windowsEl = document.getElementById("windows");
const taskListEl = document.getElementById("task-list");
let zTop = 100;
const openWindows = new Map(); // id -> {el, taskEl, minimized, appId, title, prevRect}

export function focusWindow(id) {
  const w = openWindows.get(id);
  if (!w) return;
  openWindows.forEach((other) => other.el.classList.add("inactive"));
  w.el.classList.remove("inactive");
  w.el.style.zIndex = ++zTop;
  taskListEl.querySelectorAll(".task").forEach(t => t.classList.remove("active"));
  w.taskEl.classList.add("active");
  if (w.minimized) {
    w.el.style.display = "flex";
    w.minimized = false;
  }
}

export function createWindow({ appId, title, icon, width = 480, height = 340, x, y, content }) {
  const id = `w-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
  const el = document.createElement("div");
  el.className = "window";
  el.style.width = width + "px";
  el.style.height = height + "px";
  el.style.left = (x ?? (60 + openWindows.size * 24)) + "px";
  el.style.top = (y ?? (40 + openWindows.size * 24)) + "px";
  el.style.zIndex = ++zTop;
  el.innerHTML = `
    <div class="titlebar">
      <span class="titlebar-icon">${icon}</span>
      <span class="titlebar-text">${title}</span>
      <span class="titlebar-btns">
        <button class="tb-btn min" title="Minimize">_</button>
        <button class="tb-btn max" title="Maximize">▢</button>
        <button class="tb-btn close" title="Close">✕</button>
      </span>
    </div>
    <div class="window-body"></div>
    <div class="resize-handle"></div>
  `;
  el.querySelector(".window-body").innerHTML = content || "";
  windowsEl.appendChild(el);

  // Taskbar entry
  const taskEl = document.createElement("div");
  taskEl.className = "task active";
  taskEl.innerHTML = `<span>${icon} ${title}</span>`;
  taskEl.addEventListener("click", () => {
    const w = openWindows.get(id);
    if (!w) return;
    if (w.el.style.display === "none" || w.minimized) {
      focusWindow(id);
    } else if (w.el.classList.contains("inactive")) {
      focusWindow(id);
    } else {
      // minimize
      w.el.style.display = "none";
      w.minimized = true;
      taskEl.classList.remove("active");
    }
  });
  taskListEl.appendChild(taskEl);

  const state = { el, taskEl, minimized: false, appId, title, prevRect: null };
  openWindows.set(id, state);

  // Focus on any click
  el.addEventListener("mousedown", () => focusWindow(id));

  // Drag
  const tb = el.querySelector(".titlebar");
  tb.addEventListener("mousedown", (ev) => {
    if (ev.target.closest(".tb-btn")) return;
    if (el.classList.contains("maximized")) return;
    const rect = el.getBoundingClientRect();
    const dx = ev.clientX - rect.left;
    const dy = ev.clientY - rect.top;
    const move = (e) => {
      el.style.left = Math.max(-40, e.clientX - dx) + "px";
      el.style.top = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - dy)) + "px";
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  });

  // Buttons
  el.querySelector(".tb-btn.close").addEventListener("click", () => closeWindow(id));
  el.querySelector(".tb-btn.min").addEventListener("click", () => {
    el.style.display = "none";
    state.minimized = true;
    taskEl.classList.remove("active");
  });
  el.querySelector(".tb-btn.max").addEventListener("click", () => toggleMaximize(id));
  tb.addEventListener("dblclick", () => toggleMaximize(id));

  // Resize
  const handle = el.querySelector(".resize-handle");
  handle.addEventListener("mousedown", (ev) => {
    ev.stopPropagation();
    if (el.classList.contains("maximized")) return;
    const startX = ev.clientX, startY = ev.clientY;
    const startW = el.offsetWidth, startH = el.offsetHeight;
    const move = (e) => {
      el.style.width = Math.max(200, startW + (e.clientX - startX)) + "px";
      el.style.height = Math.max(120, startH + (e.clientY - startY)) + "px";
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  });

  focusWindow(id);
  return { id, el, body: el.querySelector(".window-body") };
}

export function toggleMaximize(id) {
  const w = openWindows.get(id);
  if (!w) return;
  const el = w.el;
  if (el.classList.contains("maximized")) {
    el.classList.remove("maximized");
    if (w.prevRect) {
      el.style.left = w.prevRect.left;
      el.style.top = w.prevRect.top;
      el.style.width = w.prevRect.width;
      el.style.height = w.prevRect.height;
    }
  } else {
    w.prevRect = { left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height };
    el.classList.add("maximized");
    el.style.left = "0px";
    el.style.top = "0px";
    el.style.width = window.innerWidth + "px";
    el.style.height = (window.innerHeight - 30) + "px";
  }
}

export function closeWindow(id) {
  const w = openWindows.get(id);
  if (!w) return;
  w.el.remove();
  w.taskEl.remove();
  openWindows.delete(id);
}
