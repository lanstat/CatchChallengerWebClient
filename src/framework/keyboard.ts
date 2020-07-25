import { Observable } from 'babylonjs';

export class Keyboard {
  public onKeyDown: Observable<KeyEvent>;
  public onKeyUp: Observable<KeyEvent>;
  private static _instance: Keyboard;

  private constructor(){
    this.onKeyDown = new Observable();
    this.onKeyUp = new Observable();

    document.addEventListener("keydown", (event)  => {
      this.onKeyDown.notifyObservers(new KeyEvent(event.which || event.keyCode));
    }, false);
    document.addEventListener("keyup", () => {
      this.onKeyUp.notifyObservers(new KeyEvent());
    }, false);
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new Keyboard();
    }
    return this._instance;
  }
}

export class KeyEvent {
  public constructor(public keyCode?: number){}
}