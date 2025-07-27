import * as PIXI from "pixi.js";
import { App } from "../../core/App";
import { Reel } from "../world/Reel";
import { PlayAndTrack } from "../ui/PlayAndTrack";
import { ScoreLogic } from "./ScoreLogic";
import { Config } from "../config/Config";
import { GameState } from "../config/GameState";
export class GameManager {
  //evey game has a container containing all of the scene elements
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();
    window.addEventListener("resize", () => {
  this.bg.width = window.innerWidth;
  this.bg.height = window.innerHeight;

  if (this.reel) this.reel.resize();  // Instantly rescale reels
  if (this.playAndTrack) this.playAndTrack.resize(); // Instantly rescale play and track UI
});
  }

  spin() {
  // Generate random reel positions for the next spin
 GameState.reelPositions = Array.from(
    { length: 5 },
    () => Math.floor(Math.random() * 21)
  );

  // Trigger reel animation; when animation completes, update symbols
  this.reel.spinAnimation(() => {
    this.scoreLogic.checkPaylines(); // Calculate wins
    this.isSpinning = false;
  });
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
     this.playAndTrack = new PlayAndTrack(
      data.rows, 
      data.cols,
      this.reel,        
      this.scoreLogic 
    );
    this.container.addChild(this.playAndTrack.container);
  }
  resizeBackground() {
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
  }
}
