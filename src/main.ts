import { Application } from "pixi.js";
import { Game } from "./game/Game";

const app = new Application();
await app.init({ resizeTo: window, background: "#1e1e1e" });
const container = document.getElementById("pixi-container");
if (!container) {
  throw new Error("Container element not found");
}

container.appendChild(app.canvas);

const game = new Game(app);
game.init();
