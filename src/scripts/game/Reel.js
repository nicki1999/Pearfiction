import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Config } from "./Config";
import { GameState } from "./GameState";
export class Reel {
  constructor(rows, cols, x) {
    this.rows = rows;
    this.cols = cols;
    this.createContainer(x);
    this.createTiles();
  }
  updateTiles() {
    this.container.removeChildren();
    this.createTiles();
  }
  createContainer(x) {
    //container orientation
    this.container = new PIXI.Container();
    //this.container.x = screen.width / 2;
    // this.container.y = screen.height / 2;
  }
  createTiles() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.newRound(row, col);
      }
    }
  }
  newRound(row, col) {
    this.matrix = Config.Reelset;
    this.updateRow = GameState.reelPositions[col];
    let texture = "";
    if (row == 1) {
      this.updateRow = this.updateRow + 1;
    } else if (row == 2) {
      this.updateRow = this.updateRow + 2;
    }
    if (this.updateRow >= this.matrix[row].length) {
      //console.log(this.matrix[row].length);
      this.updateRow = 0;
      if (row == 1) {
        this.updateRow = this.updateRow + 1;
      } else if (row == 2) {
        this.updateRow = this.updateRow + 2;
      }
    }
    const cellValue = this.matrix[col][this.updateRow];
    //Populate the new matrix's values
    GameState.updatedMatrix[row][col] = cellValue;
    console.log("show: ", GameState.updatedMatrix);
    texture = cellValue + "_symbol";

    const tile = App.sprite(texture);
    tile.width = window.innerWidth / this.cols;
    tile.height = (window.innerHeight * 0.7) / this.rows;
    this.container.addChild(tile);
    tile.x = col * tile.width;
    tile.y = row * tile.height;
  }
}
