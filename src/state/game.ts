import { Scene } from '../framework/scene';
import { FollowCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Color3, Mesh } from 'babylonjs';
import { DOM } from '../framework/dom';
import { SampleMaterial } from '../Materials/SampleMaterial';
import { Player } from '../player/player';

export class Game extends Scene {
  static get Key(): string{
    return 'GameScene';
  };

  private _player: Player;
  private _cube2: Mesh;

  initialize(): void {
    const camera = new FollowCamera("FollowCam", new Vector3(0, 10, -10), this.scene);
    camera.radius = 20;
    camera.heightOffset = 10;
    camera.rotationOffset = 45;
    camera.attachControl(DOM.view, true);

    const light = new HemisphericLight(
        "light",
        new Vector3(0, -10, -10),
        this.scene);

    const mesh = MeshBuilder.CreateGround("mesh", {width:10, height: 10}, this.scene);
    
    this._player = new Player(this);

    this._cube2 = MeshBuilder.CreateBox("cube", {height:1, width: 1}, this.scene);
    this._cube2.position.set(3, 0.5, 0);
    this._cube2.material = new StandardMaterial("matBallon", this.scene);
    (<StandardMaterial>this._cube2.material).emissiveColor = new Color3(0, 0, 1);

    // SceneLoader.ImportMesh('', "Forest/", "scene.gltf", scene, function (newMeshes, particleSystems, skeletons) {
    //   // scene.c
    // });

    const material =  new SampleMaterial("material", this.scene);
    mesh.material = material

    camera.lockedTarget = this._player.mesh;
  }

  onBeforeRender() {
    if (this._player.mesh.intersectsMesh(this._cube2, false)) {
      (<StandardMaterial>this._player.mesh.material).emissiveColor = new BABYLON.Color3(1, 0, 0);
    } else {
      (<StandardMaterial>this._player.mesh.material).emissiveColor = new BABYLON.Color3(1, 1, 0.5);
    }
  }
}