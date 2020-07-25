import { Scene as BabylonScene, Engine as BabylonEngine} from 'babylonjs';

export abstract class Scene {
  public scene: BabylonScene;

  abstract initialize(): void;

  onClose(): void{}

  abstract onBeforeRender(): void;

  initializeBabylonScene(engine: BabylonEngine) {
    this.scene = new BabylonScene(engine);
    this.scene.registerBeforeRender(() => {
      this.onBeforeRender();
    });
  }
}