import { GameObject, RectCollider } from "./createGameObject";

export function isRectColliding(
  collider: RectCollider,
  gameObjectCollider: RectCollider,
): boolean {
  return (
    collider.x < gameObjectCollider.x + gameObjectCollider.width &&
    collider.x + collider.width > gameObjectCollider.x &&
    collider.y < gameObjectCollider.y + gameObjectCollider.height &&
    collider.y + collider.height > gameObjectCollider.y
  );
}

export function isCollidingWithGameObject(
  collider: RectCollider,
  gameObject: GameObject | null,
): boolean {
  if (!gameObject?.collider) return false;
  return isRectColliding(collider, gameObject.collider);
}

export function isCollidingWithAnyGameObject(
  collider: RectCollider,
  gameObjects: Array<GameObject | null>,
): boolean {
  return gameObjects.some((gameObject) =>
    isCollidingWithGameObject(collider, gameObject),
  );
}
