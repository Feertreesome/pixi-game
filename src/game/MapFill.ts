import { Assets, Container } from "pixi.js";
import { GameObjectService } from "./GameObject/GameObjectService";
import { createForestTrees } from "./GameObject/Trees";
import { WindSwayService } from "./GameObject/WindSwayService";

export class MapFill {
  public bottomLayer: Container;
  public topLayer: Container;

  constructor(
    bottomLayer: Container,
    topLayer: Container,
    private gameObjectService: GameObjectService,
    private windSwayService: WindSwayService,
  ) {
    this.bottomLayer = bottomLayer;
    this.topLayer = topLayer;
  }

  async init() {
    this.bottomLayer.sortableChildren = true;
    this.topLayer.sortableChildren = true;

    const treeTexture = await Assets.load("/assets/tiles/tree.png");
    const treeTopTexture = await Assets.load("/assets/tiles/tree-top.png");
    createForestTrees(
      this.bottomLayer,
      this.topLayer,
      treeTexture,
      treeTopTexture,
      this.gameObjectService,
      this.windSwayService,
    );
  }
}
