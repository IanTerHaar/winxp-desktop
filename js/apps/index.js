/* ---------- App registry ----------
   Maps a data-app id (used on desktop icons and Start menu items)
   to the factory function that opens that app's window.
   Add a new app by importing its factory and adding it here. */

import { notepad } from "./notepad.js";
import { mycomputer } from "./mycomputer.js";
import { ie } from "./ie.js";
import { paint } from "./paint.js";
import { minesweeper } from "./minesweeper.js";
import { recycle } from "./recycle.js";
import { about } from "./about.js";

export const APPS = { notepad, mycomputer, ie, paint, minesweeper, recycle, about };
