import { createWindow } from "../window-manager.js";

export function mycomputer() {
  return createWindow({
    appId: "mycomputer", title: "My Computer", icon: "🖥️",
    width: 560, height: 400,
    content: `
      <div class="menubar"><span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Tools</span><span>Help</span></div>
      <div class="mycomputer-body">
        <h3>Files Stored on This Computer</h3>
        <div class="drive-grid">
          <div class="drive"><div class="drive-icon">📁</div><div class="drive-label">Shared Documents</div></div>
          <div class="drive"><div class="drive-icon">📁</div><div class="drive-label">User's Documents</div></div>
        </div>
        <h3>Hard Disk Drives</h3>
        <div class="drive-grid">
          <div class="drive"><div class="drive-icon">💽</div><div class="drive-label">Local Disk (C:)</div></div>
        </div>
        <h3>Devices with Removable Storage</h3>
        <div class="drive-grid">
          <div class="drive"><div class="drive-icon">💾</div><div class="drive-label">3½ Floppy (A:)</div></div>
          <div class="drive"><div class="drive-icon">📀</div><div class="drive-label">CD Drive (D:)</div></div>
        </div>
      </div>
    `,
  });
}
