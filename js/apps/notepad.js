import { createWindow } from "../window-manager.js";

export function notepad() {
  return createWindow({
    appId: "notepad", title: "Untitled - Notepad", icon: "📝",
    width: 500, height: 360,
    content: `
      <div class="menubar"><span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span></div>
      <div class="notepad-body" style="height: calc(100% - 22px);">
        <textarea placeholder="Type something..."></textarea>
      </div>
    `,
  });
}
