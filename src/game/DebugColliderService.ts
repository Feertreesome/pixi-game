import { Container, Graphics } from "pixi.js";
import { GameObject, RectCollider } from "./createGameObject";

export class DebugColliderService {
  private layer = new Graphics();

  init(world: Container) {
    this.layer.zIndex = 9999;
    world.addChild(this.layer);
  }

  render(
    gameObjects: GameObject[],
    offsetX: number,
    offsetY: number,
    playerCollider?: RectCollider,
  ) {
    this.layer.clear();

    for (const gameObject of gameObjects) {
      if (!gameObject.debugCollider || !gameObject.collider) continue;

      this.layer
        .rect(
          gameObject.collider.x + offsetX,
          gameObject.collider.y + offsetY,
          gameObject.collider.width,
          gameObject.collider.height,
        )
        .stroke({ color: 0xff0000, width: 2 });
    }

    if (playerCollider) {
      this.layer
        .rect(
          playerCollider.x,
          playerCollider.y,
          playerCollider.width,
          playerCollider.height,
        )
        .stroke({ color: 0xff0000, width: 2 });
    }
  }
}
