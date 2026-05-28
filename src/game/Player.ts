import { Assets, Sprite } from "pixi.js";
import { createGameObject } from "./createGameObject.ts";

export class Player {
  public playerSprite!: Sprite;

  public worldX = 0;
  public worldY = 0;

  async init(x: number, y: number) {
    const playerTexture = await Assets.load("/assets/characters/bunny.png");
    const player = createGameObject({
      texture: playerTexture,
      x,
      y,
      kind: "player",
      anchor: { x: 0.5, y: 0.5 },
      width: 64,
      height: 64,
      layer: 1,
    });
    this.playerSprite = player.sprite;
  }

  getCollider(nextX = this.worldX, nextY = this.worldY) {
    const width = 64;
    const height = 64;
    return {
      x: nextX - width / 2,
      y: nextY - height / 2,
      width,
      height,
    };
  }
}
