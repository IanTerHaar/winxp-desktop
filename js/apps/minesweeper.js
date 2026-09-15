import { createWindow } from "../window-manager.js";

export function minesweeper() {
  const ROWS = 9, COLS = 9, MINES = 10;
  const win = createWindow({
    appId: "minesweeper", title: "Minesweeper", icon: "💣",
    width: 240, height: 300,
    content: `
      <div class="menubar"><span>Game</span><span>Help</span></div>
      <div class="mine-body">
        <div class="mine-header">
          <div class="mine-count">010</div>
          <button class="mine-reset">🙂</button>
          <div class="mine-timer">000</div>
        </div>
        <div class="mine-grid" style="grid-template-columns: repeat(${COLS}, 20px);"></div>
      </div>
    `,
  });

  const grid = win.body.querySelector(".mine-grid");
  const countEl = win.body.querySelector(".mine-count");
  const timerEl = win.body.querySelector(".mine-timer");
  const resetBtn = win.body.querySelector(".mine-reset");
  let cells = [], mines = new Set(), revealed = 0, flags = 0, timer = 0, timerId = null, dead = false, started = false;

  const idx = (r, c) => r * COLS + c;
  const neighbors = (r, c) => {
    const out = [];
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push([nr, nc]);
      }
    return out;
  };

  function reset() {
    grid.innerHTML = ""; cells = []; mines.clear();
    revealed = 0; flags = 0; timer = 0; dead = false; started = false;
    if (timerId) { clearInterval(timerId); timerId = null; }
    countEl.textContent = String(MINES).padStart(3,"0");
    timerEl.textContent = "000";
    resetBtn.textContent = "🙂";
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.className = "mine-cell";
      cell.dataset.r = r; cell.dataset.c = c;
      cell.addEventListener("click", () => reveal(r, c));
      cell.addEventListener("contextmenu", (e) => { e.preventDefault(); flag(r, c); });
      grid.appendChild(cell);
      cells.push(cell);
    }
  }

  function placeMines(safeR, safeC) {
    while (mines.size < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
      mines.add(idx(r, c));
    }
  }

  function reveal(r, c) {
    if (dead) return;
    const cell = cells[idx(r, c)];
    if (cell.classList.contains("revealed") || cell.classList.contains("flag")) return;
    if (!started) {
      started = true;
      placeMines(r, c);
      timerId = setInterval(() => {
        timer++; timerEl.textContent = String(Math.min(timer, 999)).padStart(3,"0");
      }, 1000);
    }
    if (mines.has(idx(r, c))) {
      dead = true;
      clearInterval(timerId);
      resetBtn.textContent = "😵";
      mines.forEach(i => cells[i].classList.add("revealed","mine"));
      return;
    }
    cell.classList.add("revealed");
    revealed++;
    const n = neighbors(r,c).filter(([nr,nc]) => mines.has(idx(nr,nc))).length;
    if (n) { cell.dataset.n = n; cell.textContent = n; }
    else {
      neighbors(r,c).forEach(([nr,nc]) => reveal(nr,nc));
    }
    if (revealed === ROWS*COLS - MINES) {
      clearInterval(timerId);
      resetBtn.textContent = "😎";
    }
  }

  function flag(r, c) {
    if (dead) return;
    const cell = cells[idx(r,c)];
    if (cell.classList.contains("revealed")) return;
    cell.classList.toggle("flag");
    flags += cell.classList.contains("flag") ? 1 : -1;
    countEl.textContent = String(MINES - flags).padStart(3,"0");
  }

  resetBtn.addEventListener("click", reset);
  reset();
  return win;
}
