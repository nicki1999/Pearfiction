import * as PIXI from "pixi.js";
import { App } from "../../core/App";

export class Reel {
  constructor(rows, cols, reelSet, gameState, spriteFactory) {
    this.rows = rows;
    this.cols = cols;
    this.reelSet = reelSet;
    this.gameState = gameState;
    this.spriteFactory = spriteFactory;
    this.container = new PIXI.Container();
    this.tiles = [];
    this.createTiles();
  }
  updateTiles() {
    this.container.removeChildren();
    this.tiles = [];
    this.createTiles();
    this.spinAnimation();

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
    this.matrix = this.reelSet;
    this.updateRow = this.gameState.reelPositions[col];

    if (row === 1) this.updateRow += 1;
    else if (row === 2) this.updateRow += 2;

    if (this.updateRow >= this.matrix[col].length) {
      this.updateRow = (row === 1) ? 1 : (row === 2) ? 2 : 0;
    }

    const cellValue = this.matrix[col][this.updateRow];
    this.gameState.updatedMatrix[row][col] = cellValue;

    const textureKey = cellValue + "_symbol";
    const tile = this.spriteFactory(textureKey);

    tile.width = window.innerWidth / this.cols;
    tile.height = (window.innerHeight * 0.7) / this.rows;
    tile.x = col * tile.width;
    tile.y = row * tile.height;

    this.tiles.push(tile);
    this.container.addChild(tile);
  }
  spinAnimation(){
    const duration = 20;
    let frame = 0;

      const animate = (delta) => {
      frame += delta;
      this.tiles.forEach((tile, index) => {
        const phase = (index % 2 === 0 ? 1 : -1);
        tile.y += Math.sin(frame / 3) * 1.5 * phase;
        tile.rotation = Math.sin(frame / 5) * 0.05;
      });

      if (frame > duration) {
        this.tiles.forEach((tile) => {
          tile.rotation = 0;
        });
        App.app.ticker.remove(animate);
      }
    };

    App.app.ticker.add(animate);
  }
}
