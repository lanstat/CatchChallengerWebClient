import { Mesh as BabylonMesh, Nullable, Observer } from 'babylonjs';
import { Keyboard, KeyEvent } from './keyboard';
import { Scene } from './scene';

export abstract class Mesh {
  public mesh: BabylonMesh;

  public constructor(
    protected scene: Scene
  ){
    this.loadMesh();
  }

  public isActive(): boolean {
    return true;
  }

  protected abstract loadMesh();

  public remove(){}
}

export abstract class MeshWithUserEvents extends Mesh {
  private _onKeyDown: Nullable<Observer<KeyEvent>>;
  private _onKeyUp: Nullable<Observer<KeyEvent>>;

  public constructor(scene: Scene) {
    super(scene);
    this.registerEvents();
  }

  protected registerEvents() {
    this._onKeyDown = Keyboard.instance.onKeyDown.add((event) => {
      if (this.isActive()) {
        this.onKeyDown(event);
      }
    });
    this._onKeyUp = Keyboard.instance.onKeyUp.add((event) => {
      if (this.isActive()) {
        this.onKeyUp(event);
      }
    });
  }

  abstract onKeyDown(event: KeyEvent);

  abstract onKeyUp(event: KeyEvent);

  public remove() {
    Keyboard.instance.onKeyDown.remove(this._onKeyDown);
    Keyboard.instance.onKeyDown.remove(this._onKeyUp);

    this.remove();
  }
}