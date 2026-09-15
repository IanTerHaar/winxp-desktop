import { createWindow } from "../window-manager.js";

export function paint() {
  const win = createWindow({
    appId: "paint", title: "untitled - Paint", icon: "🎨",
    width: 560, height: 420,
    content: `
      <div class="menubar"><span>File</span><span>Edit</span><span>View</span><span>Image</span><span>Colors</span><span>Help</span></div>
      <div class="paint-body" style="height: calc(100% - 22px);">
        <div class="paint-tools">
          <input type="color" value="#000000" />
          <button data-size="2">•</button>
          <button data-size="5">●</button>
          <button data-size="10">⬤</button>
          <button data-clear>Clear</button>
        </div>
        <canvas id="paint-canvas" width="800" height="500"></canvas>
      </div>
    `,
  });

  const canvas = win.body.querySelector("#paint-canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0,0,canvas.width,canvas.height);
  let color = "#000", size = 3, drawing = false;
  win.body.querySelector('input[type=color]').addEventListener("input", e => color = e.target.value);
  win.body.querySelectorAll("button[data-size]").forEach(b =>
    b.addEventListener("click", () => size = parseInt(b.dataset.size)));
  win.body.querySelector("button[data-clear]").addEventListener("click", () => {
    ctx.fillStyle = "#fff"; ctx.fillRect(0,0,canvas.width,canvas.height);
  });
  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (canvas.width / r.width),
             y: (e.clientY - r.top)  * (canvas.height / r.height) };
  };
  canvas.addEventListener("mousedown", e => {
    drawing = true;
    const p = pos(e);
    ctx.beginPath(); ctx.moveTo(p.x, p.y);
  });
  canvas.addEventListener("mousemove", e => {
    if (!drawing) return;
    const p = pos(e);
    ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = "round";
    ctx.lineTo(p.x, p.y); ctx.stroke();
  });
  window.addEventListener("mouseup", () => drawing = false);

  return win;
}
