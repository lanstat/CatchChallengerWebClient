import { Engine } from "./framework/engine";
import { Game } from './state/game';

const engine: Engine = new Engine();

engine.registerScene(Game.Key, new Game());

engine.start(Game.Key);