export class Input {
  private keys: Record<string, boolean> = {};

  constructor() {
    window.addEventListener("keydown", this.onKeyDown);

    window.addEventListener("keyup", this.onKeyUp);
  }

  onKeyDown = (event: KeyboardEvent) => {
    this.keys[event.code] = true;
  };

  onKeyUp = (event: KeyboardEvent) => {
    this.keys[event.code] = false;
  };

  isDown(code: string): boolean {
    return !!this.keys[code];
  }

  destroy() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }
}
