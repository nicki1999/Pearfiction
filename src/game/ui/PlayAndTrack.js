import * as PIXI from "pixi.js";
import { App } from "../../core/App.js";
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
  if (row === 0) {
    const tile = App.sprite("spin_button");
    tile.interactive = true;
    tile.buttonMode = true;

    tile.on("pointerdown", () => {
      if (this.isSpinning) return;
      this.isSpinning = true;
      GameState.reelPositions = this.randomSpin();
      this.reel.spinAnimation(() => {
        this.scoreLogic.checkPaylines();
        this.isSpinning = false;
      });
    });

    this.container.addChild(tile);
     if (!this.labelScore || !this.container.children.includes(this.labelScore)) {
      this.labelScore = new LabelScore();
      this.container.addChild(this.labelScore);
    }

    // Now position both elements together
    this.positionUI(tile);
  }
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
  resize() {
  const spinButton = this.container.children.find(
    c => c.texture && c.texture.textureCacheIds?.includes("spin_button")
  );
  this.positionUI(spinButton); // <-- Reuse the same logic
}
positionUI(spinButton) {
  if (!spinButton) return;

  const aspectRatio = spinButton.texture.orig.width / spinButton.texture.orig.height;
  let baseHeight = (window.innerHeight * 0.2) / this.rows;
  let baseWidth = baseHeight * aspectRatio;

  // Scale the button by 30%
  spinButton.height = baseHeight * 1.3;
  spinButton.width = baseWidth * 1.3;

  // Center it
  spinButton.x = (window.innerWidth - spinButton.width) / 2;
  spinButton.y = window.innerHeight * 0.7;

  // Position the score label relative to the button
  if (this.labelScore) {
    if (this.labelScore.anchor) {
      this.labelScore.anchor.set(0.5, 0);
    }
    this.labelScore.x = spinButton.x + spinButton.width / 2;  // horizontally center
    this.labelScore.y = spinButton.y + spinButton.height + 10; // directly below
  }
}

}
