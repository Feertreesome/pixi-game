import { Application, Container } from "pixi.js";
import { Camera } from "./Camera.ts";
import { Input } from "./Input";
import { Map } from "./Map";
import { MapFill } from "./MapFill.ts";
import { Player } from "./Player";
import { DebugColliderService } from "./DebugColliderService.ts";
import { GameObjectService } from "./GameObject/GameObjectService.ts";
import { WindSwayService } from "./GameObject/WindSwayService.ts";

export class Game {
  world = new Container();
  bottomLayer = new Container();
  entityLayer = new Container();
  topLayer = new Container();
  player = new Player();
  input = new Input();
  camera!: Camera;
  createMap!: Map;
  fillMap!: MapFill;
  debugColliderService = new DebugColliderService();
  gameObjectService = new GameObjectService();
  windSwayService = new WindSwayService();

  worldSpeed: number = 5;
  constructor(private app: Application) {}

  width: number = 0;
  height: number = 0;

  async init() {
    this.app.stage.addChild(this.world);
    this.world.sortableChildren = true;
    this.debugColliderService.init(this.world);

    this.bottomLayer.zIndex = 10;
    this.entityLayer.zIndex = 20;
    this.topLayer.zIndex = 30;
    this.world.addChild(this.bottomLayer);
    this.world.addChild(this.entityLayer);
    this.world.addChild(this.topLayer);

    this.width = this.app.screen.width;
    this.height = this.app.screen.height;

    await this.createGround();
    await this.createDecor();
    await this.createPlayer();
    this.createCamera();

    this.app.ticker.add(this.update);
  }

  createCamera() {
    this.camera = new Camera(this.createMap.pattern);
  }

  async createGround() {
    this.createMap = new Map(this.world, this.width, this.height);
    await this.createMap.init();
  }

  async createDecor() {
    this.fillMap = new MapFill(
      this.bottomLayer,
      this.topLayer,
      this.gameObjectService,
      this.windSwayService,
    );
    await this.fillMap.init();
  }

  async createPlayer() {
    await this.player.init(this.width / 2, this.height / 2);
    this.player.worldX = 0;
    this.player.worldY = 0;
    this.entityLayer.addChild(this.player.playerSprite);
  }

  // нужно перенести инпуты
  private update = () => {
    const playerCollider = this.player.getCollider(
      this.player.playerSprite.x,
      this.player.playerSprite.y,
    );

    let dx = 0;
    let dy = 0;

    if (this.input.isDown("KeyW")) dy -= 1;
    if (this.input.isDown("KeyS")) dy += 1;
    if (this.input.isDown("KeyA")) dx -= 1;
    if (this.input.isDown("KeyD")) dx += 1;

    if (dx !== 0 || dy !== 0) {
      const length = Math.hypot(dx, dy);
      const moveX = (dx / length) * this.worldSpeed;
      const moveY = (dy / length) * this.worldSpeed;

      let currentOffsetX = this.createMap.pattern.tilePosition.x;
      let currentOffsetY = this.createMap.pattern.tilePosition.y;

      const nextOffsetX = currentOffsetX - moveX;
      if (
        !this.gameObjectService.isBlockedAtOffset(
          playerCollider,
          nextOffsetX,
          currentOffsetY,
        )
      ) {
        this.player.worldX += moveX;
        this.camera.update(moveX, 0);
        currentOffsetX = nextOffsetX;
      }

      const nextOffsetY = currentOffsetY - moveY;
      if (
        !this.gameObjectService.isBlockedAtOffset(
          playerCollider,
          currentOffsetX,
          nextOffsetY,
        )
      ) {
        this.player.worldY += moveY;
        this.camera.update(0, moveY);
        currentOffsetY = nextOffsetY;
      }
    }

    this.gameObjectService.syncLayerOffset(
      this.fillMap.bottomLayer,
      this.createMap.pattern.tilePosition.x,
      this.createMap.pattern.tilePosition.y,
    );
    this.gameObjectService.syncLayerOffset(
      this.fillMap.topLayer,
      this.createMap.pattern.tilePosition.x,
      this.createMap.pattern.tilePosition.y,
    );
    this.debugColliderService.render(
      this.gameObjectService.getAll(),
      this.createMap.pattern.tilePosition.x,
      this.createMap.pattern.tilePosition.y,
      playerCollider,
    );
    this.windSwayService.update(performance.now());
  };
}
