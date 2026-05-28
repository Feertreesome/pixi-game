import { Assets, Container, TilingSprite } from "pixi.js";

export class Map {
  groundLayer = new Container();
  pattern!: TilingSprite;

  constructor(
    private world: Container,
    private width: number,
    private height: number,
  ) {}

  async init() {
    this.pattern = new TilingSprite({
      texture: await Assets.load("/assets/tiles/tile.png"),
      width: this.width,
      height: this.height,
      tileScale: { x: 0.5, y: 0.5 },
    });
    this.world.addChild(this.groundLayer);
    this.groundLayer.addChild(this.pattern);
  }
}
