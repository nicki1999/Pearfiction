import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { LabelScore } from "./LabelScore";
import { GameState } from "./GameState";
import { Config } from "./Config";

export class PlayAndTrack {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.createContainer();
    this.layoutContainer();
    this.labelScore = new LabelScore();
    //this.container.addChild(this.labelScore);
  }

  createContainer() {
    this.container = new PIXI.Container();
  }
  layoutContainer() {
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
      const labelScore = new LabelScore();
      labelScore.x = (window.innerWidth - labelScore.width) / 2 - 100;
      labelScore.y = window.innerHeight * 0.77;
      this.container.addChild(labelScore);
      return; // Skip creating a tile
    }
    const tile = App.sprite(texture);
    tile.interactive = true;
    tile.buttonMode = true;

    tile.on("pointerdown", () => {
      GameState.reelPositions = this.randomSpin();
      // Call a custom handler method
      App.reelInstance.updateTiles();
      App.scoreInstance.checkPaylines();
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
      const randomNumber = Math.floor(Math.random() * 21);
      console.log("random", i);
      position[i] = randomNumber;
    }
    console.log("this is position", position);
    return position;
  }
}
