import { Engine as BabylonEngine, Scene as BabylonScene} from 'babylonjs';
import { Scene } from './scene';
import { DOM } from './dom';

export class Engine {
  private _engine: BabylonEngine;
  private _scenes: {[key: string]: Scene};
  private _currentScene: Scene;

  public constructor() {
    this._scenes = {};
    this._engine = new BabylonEngine(DOM.view, true);
  }

  public registerScene(key: string, scene: Scene) {
    scene.initializeBabylonScene(this._engine);
    this._scenes[key] = scene;
  }

  public setCurrentScene(key: string) {
    this._currentScene = this._scenes[key];
    this._currentScene.initialize();
    this._engine.runRenderLoop(() => {
      this._currentScene.scene.render();
    });
  }

  public start(initialScene: string) {
    this.setCurrentScene(initialScene);
  }
}