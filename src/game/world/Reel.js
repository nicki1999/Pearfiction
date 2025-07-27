import * as PIXI from "pixi.js";
import { App } from "../../core/App";
import { gsap } from "gsap/gsap-core";
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
    tile.symbolID = cellValue;

    tile.width = window.innerWidth / this.cols;
    tile.height = (window.innerHeight * 0.7) / this.rows;
    tile.x = col * tile.width;
    tile.y = row * tile.height;

    this.tiles.push(tile);
    this.container.addChild(tile);
  }

   stopReel(reelIndex) {
  const columnTiles = this.tiles.filter((_, idx) => idx % this.cols === reelIndex);

  for (let row = 0; row < this.rows; row++) {
    const symbol = this.gameState.updatedMatrix[row][reelIndex];
    const textureKey = symbol + "_symbol";

    // Remove the old tile
    const oldTile = columnTiles[row];
    const newTile = this.spriteFactory(textureKey); // returns a Sprite, not a Texture
    newTile.symbolID = symbol;


    newTile.width = oldTile.width;
    newTile.height = oldTile.height;
    newTile.x = oldTile.x;
    newTile.y = row * (window.innerHeight * 0.7) / this.rows;

    // Replace in container
    this.container.removeChild(oldTile);
    this.container.addChild(newTile);

    // Replace in tiles array
    const tileIndex = this.tiles.indexOf(oldTile);
    if (tileIndex !== -1) this.tiles[tileIndex] = newTile;
  }

  this.spinningReels[reelIndex] = false;
}
  spinAnimation(onComplete) {
  const reelSpeed = 20;
  const spinTime = [60, 90, 120, 150, 180]; // stop frames
  let frame = 0;

  // Mark all reels as spinning
  this.spinningReels = Array(this.cols).fill(true);

  const animate = (delta) => {
    frame += delta;

    // Move only tiles in spinning reels
    this.tiles.forEach((tile, index) => {
      const reelIndex = index % this.cols;
      if (!this.spinningReels[reelIndex]) return;

      tile.y += reelSpeed;
      if (tile.y > window.innerHeight * 0.7) {
        tile.y -= window.innerHeight * 0.7;
      }
    });

    // Stop reels one by one
    for (let i = 0; i < this.cols; i++) {
      if (this.spinningReels[i] && frame >= spinTime[i]) {
        this.stopReel(i);
      }
    }

    // When all reels have stopped
    if (this.spinningReels.every((r) => !r)) {
      App.app.ticker.remove(animate);
      if (onComplete) onComplete();  // Callback for scoring and highlighting
    }
  };

  App.app.ticker.add(animate);
}



}
