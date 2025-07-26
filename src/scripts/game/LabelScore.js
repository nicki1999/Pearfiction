import * as PIXI from "pixi.js";
import { Config } from "./Config";
import { GameState } from "./GameState";
import { App } from "../system/App";

export class LabelScore extends PIXI.Text {
  constructor() {
    super();
    this.x = Config.scoreText.x;
    this.y = Config.scoreText.y;
    this.anchor.set(Config.scoreText.anchor);
    this.style = Config.scoreText.style;
    App.eventEmitter.on("score", () => {
      this.renderScore(GameState.score.winNumber);
    });
    this.renderScore(GameState.score.winNumber);
  }

  renderScore(scoreText = 0) {
    const winDetailText = GameState.score.winDetail
      .map((detail) => {
        return `- payline ${detail.paylineID}, ${detail.symbolID}, x${detail.repetition}, ${detail.payout}`;
      })
      .join("\n");
    console.log("Rendering score: ", scoreText);
    this.text = `Number of wins: ${scoreText} \n${winDetailText}`;
  }
}
