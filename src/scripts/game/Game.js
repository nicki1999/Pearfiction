import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Reel } from "./Reel";
import { PlayAndTrack } from "./PlayAndTrack";
import { ScoreLogic } from "./ScoreLogic";
import { Config } from "./Config";
import { GameState } from "./GameState";
export class Game {
  //evey game has a container containing all of the scene elements
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  createBackground() {
    this.bg = App.sprite("bg");
    this.resizeBackground();
    //browser width
    this.container.addChild(this.bg);
    this.createReel({
      rows: 3,
      cols: 5,
      x: 0,
    });
    this.gameTrack({ rows: 2, cols: 1 });
  }
  createReel(data) {
    const spriteFactory = (key) => App.sprite(key);

    this.reel = new Reel(
      data.rows,
      data.cols,
      Config.Reelset,
      GameState,
      spriteFactory
    );
    this.container.addChild(this.reel.container);
    this.scoreLogic = new ScoreLogic(
      GameState,
      Config.Paytable,
      Config.Payline,
      App.eventEmitter
    );
  }
  gameTrack(data) {
    const playAndTrack = new PlayAndTrack(
      data.rows, 
      data.cols,
      this.reel,        
      this.scoreLogic 
    );
    this.container.addChild(playAndTrack.container);
  }
  resizeBackground() {
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
  }
  onResize() {
    this.resizeBackground();
  }
}
