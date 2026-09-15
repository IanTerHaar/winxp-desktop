import { createWindow } from "../window-manager.js";

export function ie() {
  return createWindow({
    appId: "ie", title: "Welcome to MSN.com - Microsoft Internet Explorer", icon: "🌐",
    width: 640, height: 460,
    content: `
      <div class="menubar"><span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Tools</span><span>Help</span></div>
      <div class="ie-body" style="height: calc(100% - 22px);">
        <div class="ie-toolbar">
          <button>◀</button><button>▶</button><button>⟳</button><button>🏠</button>
          <span style="margin: 0 6px;">Address</span>
          <input value="http://www.msn.com/" />
          <button>Go</button>
        </div>
        <div class="ie-content">
          <h1>msn<sup style="color:#f90;">.com</sup></h1>
          <p><strong>It is now ${new Date().getFullYear()}.</strong> Somehow, Internet Explorer is still open.</p>
          <p>You are browsing a fake MSN homepage inside a fake Windows XP desktop, running as a static site on GitHub Pages.</p>
          <ul>
            <li><a href="#" onclick="return false;">Today's news: Vista rumored to launch "soon"</a></li>
            <li><a href="#" onclick="return false;">Weather: Blue sky, rolling green hills 🌤️</a></li>
            <li><a href="#" onclick="return false;">Free MSN Messenger — sign up now!</a></li>
            <li><a href="#" onclick="return false;">Tips: Right-click desktop icons? Nah, single-click.</a></li>
          </ul>
          <p style="margin-top: 20px; color: #666; font-size: 11px;">© Microsoft Corporation. Not really.</p>
        </div>
      </div>
    `,
  });
}
