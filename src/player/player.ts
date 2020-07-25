import { MeshWithUserEvents } from '../framework/mesh';
import { KeyEvent } from "../framework/keyboard";
import { MeshBuilder, StandardMaterial, Color3, Vector3 } from 'babylonjs';

export class Player extends MeshWithUserEvents {
  private _moveVector = new Vector3(0, 0, 0);
  private _movestep = .08;
  private _intervalId;

  public loadMesh() {
    this.mesh = MeshBuilder.CreateBox("player", {height:1, width: 1}, this.scene.scene);
    this.mesh.position.set(0, 0.5, 0);
    this.mesh.material = new StandardMaterial("matBallon", this.scene.scene);
    (<StandardMaterial>this.mesh.material).emissiveColor = new Color3(1, 0, 1);
  }

  private _launchInterval() {
    if (!this._intervalId) {
      this._intervalId = setInterval(() => {
        this.mesh.moveWithCollisions(this._moveVector);
      }, 20);
    }
  }

  onKeyDown(evt: KeyEvent) {
    switch (evt.keyCode) {
      //case "W"
      case 87:
        this._moveVector.x = -this._movestep;
        this._launchInterval();
        break;				
      //case "S"
      case 83:                
      this._moveVector.x = this._movestep;
        this._launchInterval();
        break;
      //case "A"
      case 65:
        this._moveVector.z = -this._movestep;
        this._launchInterval();
        break;
      //case "D"
      case 68:
        this._moveVector.z = this._movestep;
        this._launchInterval();
        break;
    }
  }
  onKeyUp(event: KeyEvent) {
    this._moveVector.x = 0;
    this._moveVector.z = 0;
    clearInterval(this._intervalId);
    this._intervalId = null;
  }
}