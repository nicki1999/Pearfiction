import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class LabelScore extends PIXI.Text {
  constructor() {
    super();
    this.x = App.config.scoreText.x;
    this.y = App.config.scoreText.y;
    this.anchor.set(App.config.scoreText.anchor);
    this.style = App.config.scoreText.style;
    App.eventEmitter.on("score", () => {
      this.renderScore(App.config.score.winNumber);
    });
    this.renderScore(App.config.score.winNumber);
  }

  renderScore(scoreText = 0) {
    const winDetailText = App.config.score.winDetail
      .map((detail) => {
        return `${detail.paylineID}, ${detail.symbolID}, x${detail.repetition}, ${detail.payout}`;
      })
      .join("\n");
    console.log("Rendering score: ", scoreText);
    this.text = `Number of wins: ${scoreText} \n${winDetailText}`;
  }
}
