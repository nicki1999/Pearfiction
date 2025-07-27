import * as PIXI from "pixi.js";
import { App } from "../../core/App";
import { LabelScore } from "./LabelScore";
import { GameState } from "../config/GameState";
import { Config } from "../config/Config";

export class PlayAndTrack {
  constructor(rows, cols, reel, scoreLogic) {
    this.rows = rows;
    this.cols = cols;
    this.reel = reel;
    this.scoreLogic = scoreLogic;
    this.isSpinning = false;
    this.createContainer();
    this.layoutContainer();
  }

  createContainer() {
    this.container = new PIXI.Container();
  }
  layoutContainer() {
     this.container.removeChildren();
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.layout(row, col);
      }
    }
  }

  layout(row, col) {
    let texture = "";
    if (row === 0) {
      texture = "spin_button";
    } else {
      if (!this.labelScore || !this.container.children.includes(this.labelScore)) {
  this.labelScore = new LabelScore();
  this.labelScore.x = (window.innerWidth - this.labelScore.width) / 2 - 100;
  this.labelScore.y = window.innerHeight * 0.77;
  this.container.addChild(this.labelScore);
}
      return; // Skip creating a tile
    }
    const tile = App.sprite(texture);
    tile.interactive = true;
    tile.buttonMode = true;

    tile.on("pointerdown", () => {
        if (this.isSpinning) return; 
      this.isSpinning = true;
        GameState.reelPositions = this.randomSpin();
      // Call a custom handler method
      this.reel.spinAnimation(() => {
    this.scoreLogic.checkPaylines(); 
            this.isSpinning = false;

  });
    });

    tile.width = window.innerWidth / this.rows / this.rows;
    tile.height = (window.innerHeight * 0.2) / this.rows;
    this.container.addChild(tile);
    tile.x = (window.innerWidth - tile.width) / 2;
    tile.y = window.innerHeight * 0.7;
  }

   randomSpin() {
    const position = GameState.reelPositions;

    for (let i = 0; i < position.length; i++) {
      const reelBand = this.reel.reelSet[i]; // Use reel's reelSet safely
      const randomNumber = Math.floor(Math.random() * reelBand.length);
      position[i] = randomNumber;
    }

    // Update updatedMatrix with the new random reel positions
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < this.reel.cols; col++) {
        let pos = position[col] + row;
        const band = this.reel.reelSet[col];
        if (pos >= band.length) pos = pos % band.length;

        GameState.updatedMatrix[row][col] = band[pos];
      }
    }

    console.log("Random reel positions:", position);
    console.log("Updated Matrix:", GameState.updatedMatrix);

    return position;
  }
}
