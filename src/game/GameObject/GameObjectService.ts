import { Container } from "pixi.js";
import { isRectColliding } from "../collision";
import { GameObject, RectCollider } from "../createGameObject";

export class GameObjectService {
  private gameObjects: GameObject[] = [];

  register(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  }

  getAll(): GameObject[] {
    return this.gameObjects;
  }

  syncLayerOffset(layer: Container, offsetX: number, offsetY: number) {
    layer.x = offsetX;
    layer.y = offsetY;
  }

  isBlockedAtOffset(
    collider: RectCollider,
    offsetX: number,
    offsetY: number,
  ): boolean {
    return this.gameObjects.some((gameObject) => {
      if (!gameObject.collider) return false;

      const shiftedCollider: RectCollider = {
        x: gameObject.collider.x + offsetX,
        y: gameObject.collider.y + offsetY,
        width: gameObject.collider.width,
        height: gameObject.collider.height,
      };

      return isRectColliding(collider, shiftedCollider);
    });
  }
}
