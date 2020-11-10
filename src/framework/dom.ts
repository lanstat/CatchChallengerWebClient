export class DOM {
  private static _view: HTMLCanvasElement;

  static get view(): HTMLCanvasElement {
    if (!this._view) {
      this._view = document.getElementById("view") as HTMLCanvasElement;
      this._view.width = window.innerWidth;
      this._view.height = window.innerHeight;
    }
    return this._view;
  }
}