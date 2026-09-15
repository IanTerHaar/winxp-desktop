import { createWindow } from "../window-manager.js";

export function recycle() {
  return createWindow({
    appId: "recycle", title: "Recycle Bin", icon: "🗑️",
    width: 460, height: 300,
    content: `
      <div class="menubar"><span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Tools</span><span>Help</span></div>
      <div class="mycomputer-body" style="text-align:center; padding: 40px;">
        <div style="font-size:60px;">🗑️</div>
        <p style="margin-top: 10px;">The Recycle Bin is empty.</p>
      </div>
    `,
  });
}
