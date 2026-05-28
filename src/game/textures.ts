import { Assets, Rectangle, Texture } from "pixi.js";

export const loadTextures = async () => {
  // const tileset = await Assets.load("/assets/tiles/worldTileset.png");
  const tile = await Assets.load("/assets/tiles/tile.png");
  const hero = await Assets.load("/assets/characters/bunny.png");

  const TILE = 687;

  const grass = new Texture({
    source: tile,
    frame: new Rectangle(0, 0, TILE, TILE),
  });

  return {
    grass,
    hero,
  };
};
