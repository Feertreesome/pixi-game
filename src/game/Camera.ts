import { TilingSprite } from "pixi.js";

export class Camera {
  constructor(private pattern: TilingSprite) {}

  update(dx: number, dy: number) {
    this.pattern.tilePosition.x -= dx;
    this.pattern.tilePosition.y -= dy;
  }
}
