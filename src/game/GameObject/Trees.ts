import { Texture, Container } from "pixi.js";
import { createGameObject } from "../createGameObject";
import { GameObjectService } from "./GameObjectService";
import { WindSwayService } from "./WindSwayService";

const WORLD_HALF_SIZE = 3200;
const TREE_SPACING = 220;
const TREE_JITTER = 70;
const SPAWN_SAFE_RADIUS = 240;
const DEBUG_TREE_COLLIDERS = false;

export function createForestTrees(
  bottomLayer: Container,
  topLayer: Container,
  treeTexture: Texture,
  treeTopTexture: Texture,
  gameObjectService: GameObjectService,
  windSwayService: WindSwayService,
) {
  for (let y = -WORLD_HALF_SIZE; y <= WORLD_HALF_SIZE; y += TREE_SPACING) {
    for (let x = -WORLD_HALF_SIZE; x <= WORLD_HALF_SIZE; x += TREE_SPACING) {
      const jitteredX = x + randomInRange(-TREE_JITTER, TREE_JITTER);
      const jitteredY = y + randomInRange(-TREE_JITTER, TREE_JITTER);

      if (Math.hypot(jitteredX, jitteredY) < SPAWN_SAFE_RADIUS) {
        continue;
      }

      const flipX = Math.random() < 0.5 ? -1 : 1;

      const tree = createGameObject({
        texture: treeTexture,
        x: jitteredX,
        y: jitteredY,
        kind: "tree",
        scaleX: flipX,
        collider: {
          type: "rect",
          offsetX: -30,
          offsetY: -80,
          width: 80,
          height: 30,
        },
        debugCollider: DEBUG_TREE_COLLIDERS,
      });

      gameObjectService.register(tree);
      bottomLayer.addChild(tree.sprite);

      const treeTop = createGameObject({
        texture: treeTopTexture,
        x: jitteredX + 10,
        y: jitteredY - 50,
        kind: "tree-top",
        scaleX: flipX,
      });
      treeTop.sprite.anchor.set(0.5, 1);

      gameObjectService.register(treeTop);
      windSwayService.register(treeTop.sprite, {
        amplitude: 0.02 + Math.random() * 0.03,
        speed: 0.0008 + Math.random() * 0.001,
        shiftX: 0.5 + Math.random() * 2,
      });
      topLayer.addChild(treeTop.sprite);
    }
  }
}

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
