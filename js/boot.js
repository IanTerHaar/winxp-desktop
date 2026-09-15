/* ---------- Boot sequence + taskbar clock ---------- */

export function boot() {
  setTimeout(() => {
    const b = document.getElementById("boot");
    const d = document.getElementById("desktop");
    if (b) b.hidden = true;
    if (d) d.hidden = false;
    startClock();
  }, 2500);
}

function startClock() {
  const el = document.getElementById("clock");
  const update = () => {
    const d = new Date();
    let h = d.getHours(); const m = d.getMinutes();
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    el.textContent = `${h}:${m.toString().padStart(2,"0")} ${ap}`;
  };
  update();
  setInterval(update, 10_000);
}
