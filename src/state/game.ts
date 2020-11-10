import { Scene } from '../framework/scene';
import { FreeCamera, Vector3, Mesh, PointLight } from 'babylonjs';
import { DOM } from '../framework/dom';
import { Player } from '../player/player';
import * as GUI from 'babylonjs-gui';
import { QueldanasMap } from '../map/queldanas';
import { Client } from '../api/client';

export class Game extends Scene {
  static get Key(): string{
    return 'GameScene';
  };

  private _player: Player;
  private _cube2: Mesh;

  initialize(): void {
    // Create camera and light
    var light = new PointLight("Point", new Vector3(5, 10, 5), this.scene);
    var camera = new FreeCamera("Camera", new Vector3(0, 0, -30), this.scene);
    
    // Attach the Controls to the canvas
	camera.attachControl(DOM.view, true);
	
	var plane = Mesh.CreatePlane("plane", 2, this.scene);
    // plane.parent = background;
	plane.position.z = -15;

	var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
	// var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);
	let client = new Client();
	client.connect();

    var button1 = GUI.Button.CreateSimpleButton("but1", "Click Me");
    button1.width = 1;
    button1.height = 0.4;
    button1.color = "white";
    button1.fontSize = 70;
    button1.background = "green";
    button1.onPointerUpObservable.add(function() {
        client.send('hello');
    });
    advancedTexture.addControl(button1);
    
	let map = new QueldanasMap(this.scene);
	map.initialize();
  }

  onBeforeRender() {
    // if (this._player.mesh.intersectsMesh(this._cube2, false)) {
    //   (<StandardMaterial>this._player.mesh.material).emissiveColor = new BABYLON.Color3(1, 0, 0);
    // } else {
    //   (<StandardMaterial>this._player.mesh.material).emissiveColor = new BABYLON.Color3(1, 1, 0.5);
    // }
  }
}