export class DOM {
  private static _view: HTMLCanvasElement;

  static get view(): HTMLCanvasElement {
    if (!this._view) {
      this._view = document.getElementById("view") as HTMLCanvasElement;
    }
    return this._view;
  }
}