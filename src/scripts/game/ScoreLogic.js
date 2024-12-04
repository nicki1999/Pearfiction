import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class ScoreLogic {
  checkPaylines() {
    let winDetected = false;
    App.config.score.winDetail = [];
    const paylineKeys = Object.keys(App.config.payline);

    paylineKeys.forEach((key) => {
      const win = this.checkPayline(App.config.payline[key], key);
      console.log("value: " + App.config.payline[key], "key: ",key);
      if (win) {
        winDetected = true;
      }
    });
    if (winDetected) {
      App.config.score.winNumber += 1;
      // Emit the 'score' event to update the UI
    } else {
      App.config.score.winDetail = [];
    }
    App.eventEmitter.emit("score");
  }
  checkPayline(payline, paylineID) {
    // if(payline){

    // }
    const uniqueValues = [...new Set(payline)];
    let winDetailsAdded = false;
    for (const value of uniqueValues) {
      if (
        value !== "" &&
        payline.filter((cell) => cell === value).length >= 3
      ) {
        console.log(
          `The value "${value}" appears 3 or more times in ${paylineID}.`
        );

        this.payout(value, payline.filter((cell) => cell === value).length);

        this.addWinDetailToConfig(
          paylineID,
          value,
          payline.filter((cell) => cell === value).length
        );
        winDetailsAdded = true;
      }
      if (!winDetailsAdded) {
        console.log(`No value appears 3 or more times in ${paylineID}.`);
      }
    }
    return winDetailsAdded;
  }
  payout(value, repetition) {
    if (
      (value == "lv4" || value == "lv3" || value == "lv2") &&
      repetition == 3
    ) {
      return 1;
    } else if (
      (value == "lv1" && repetition == 3) ||
      ((value == "lv4" || value == "lv3" || value == "lv2") && repetition == 4)
    ) {
      return 2;
    } else if ((value == "lv4" || value == "lv3") && repetition == 5) {
      return 3;
    } else if (
      ((value == "hv4" || value == "hv3" || value == "hv2") &&
        repetition == 3) ||
      (value == "lv1" && repetition == 4) ||
      (value == "lv2" && repetition == 5)
    ) {
      return 5;
    } else if (
      (value == "hv1" && repetition == 3) ||
      ((value == "hv2" || value == "hv3" || value == "hv4") &&
        repetition == 4) ||
      (value == "lv1" && repetition == 5)
    ) {
      return 10;
    } else if (
      (value == "hv1" && repetition == 4) ||
      (value == "hv2" && repetition == 5)
    ) {
      return 20;
    } else if (value == "hv1" && repetition == 5) {
      return 50;
    }
    return;
  }
  addWinDetailToConfig(paylineID, symbolID, repetition) {
    // const existingWinDetail = App.config.score.winDetail.find(
    //   (detail) => detail.paylineID === paylineID && detail.symbolID === symbolID
    // );
    let payout = 0;
    payout = this.payout(symbolID, repetition);
    App.config.score.winDetail.push({
      paylineID,
      symbolID,
      repetition,
      payout,
    });
    console.log(App.config.score.winDetail);
  }
}
