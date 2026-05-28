import { Sprite } from "pixi.js";

type WindSwayEntry = {
  sprite: Sprite;
  baseX: number;
  baseRotation: number;
  speed: number;
  amplitude: number;
  shiftX: number;
  phase: number;
};

type WindSwayOptions = {
  speed?: number;
  amplitude?: number;
  shiftX?: number;
  phase?: number;
};

export class WindSwayService {
  private entries: WindSwayEntry[] = [];

  register(sprite: Sprite, options: WindSwayOptions = {}) {
    this.entries.push({
      sprite,
      baseX: sprite.x,
      baseRotation: sprite.rotation,
      speed: options.speed ?? 0.0012,
      amplitude: options.amplitude ?? 0.03,
      shiftX: options.shiftX ?? 1.5,
      phase: options.phase ?? Math.random() * Math.PI * 2,
    });
  }

  update(timeMs: number) {
    for (const entry of this.entries) {
      const t = timeMs * entry.speed + entry.phase;
      entry.sprite.rotation =
        entry.baseRotation + Math.sin(t) * entry.amplitude;
      entry.sprite.x = entry.baseX + Math.sin(t * 0.8) * entry.shiftX;
    }
  }
}
