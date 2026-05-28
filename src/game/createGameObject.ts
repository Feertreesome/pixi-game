import { Sprite, Texture } from "pixi.js";

export type RectCollider = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type RectColliderConfig = {
  type: "rect";
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
};

export type ColliderConfig = RectColliderConfig;

type Anchor = {
  x: number;
  y: number;
};

export type CreateGameObjectParams<TKind extends string = string> = {
  texture: Texture;
  x: number;
  y: number;
  kind: TKind;
  anchor?: Anchor;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  width?: number;
  height?: number;
  rotation?: number;
  zIndex?: number;
  collider?: ColliderConfig;
  debugCollider?: boolean;
};

export type GameObject<TKind extends string = string> = {
  sprite: Sprite;
  worldX: number;
  worldY: number;
  kind: TKind;
  collider: RectCollider | null;
  debugCollider: boolean;
};

export function createGameObject<TKind extends string = string>(
  params: CreateGameObjectParams<TKind>,
): GameObject<TKind> {
  const sprite = new Sprite(params.texture);
  const anchor = params.anchor ?? { x: 0.5, y: 1 };
  const baseScaleX = params.scaleX ?? params.scale ?? 1;
  const baseScaleY = params.scaleY ?? params.scale ?? 1;
  const widthScale =
    params.width !== undefined ? params.width / params.texture.width : 1;
  const heightScale =
    params.height !== undefined ? params.height / params.texture.height : 1;
  const finalScaleX = baseScaleX * widthScale;
  const finalScaleY = baseScaleY * heightScale;

  sprite.anchor.set(anchor.x, anchor.y);
  sprite.x = params.x;
  sprite.y = params.y;
  sprite.scale.set(finalScaleX, finalScaleY);
  sprite.rotation = params.rotation ?? 0;
  sprite.zIndex = params.zIndex ?? params.y;

  let collider: RectCollider | null = null;

  if (params.collider?.type === "rect") {
    const absScaleX = Math.abs(finalScaleX);
    const absScaleY = Math.abs(finalScaleY);
    const colliderOffsetX =
      finalScaleX >= 0
        ? params.collider.offsetX
        : -(params.collider.offsetX + params.collider.width);
    const colliderOffsetY =
      finalScaleY >= 0
        ? params.collider.offsetY
        : -(params.collider.offsetY + params.collider.height);

    collider = {
      x: params.x + colliderOffsetX * absScaleX,
      y: params.y + colliderOffsetY * absScaleY,
      width: params.collider.width * absScaleX,
      height: params.collider.height * absScaleY,
    };
  }

  return {
    sprite,
    worldX: params.x,
    worldY: params.y,
    kind: params.kind,
    collider,
    debugCollider: params.debugCollider ?? false,
  };
}
