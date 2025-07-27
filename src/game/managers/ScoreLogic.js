export class ScoreLogic {
  constructor(gameState, paytable, paylines, eventEmitter) {
    this.gameState = gameState;
    this.paytable = paytable;
    this.paylines = paylines;
    this.eventEmitter = eventEmitter;
  }

  checkPaylines() {
    let totalPayout = 0;
    this.gameState.score.winDetail = [];

    this.paylines.forEach((line, idx) => {
      const symbols = line.map(([r, c]) => this.gameState.updatedMatrix[r][c]);
      const linePayout = this.checkPayline(symbols, idx + 1);
      totalPayout += linePayout;
    });

    // Set the total number of wins (not just +1)
    this.gameState.score.winNumber = totalPayout;

    // Emit the updated score so LabelScore can display it
    this.eventEmitter.emit("score", this.gameState.score);
  }

  checkPayline(payline, paylineID) {
    const uniqueValues = [...new Set(payline)];
    let winFound = false;
    let linePayout = 0;

    for (const value of uniqueValues) {
      const matches = payline.filter((cell) => cell === value).length;

      if (value !== "" && matches >= 3) {
        const payout = this.payout(value, matches);
        this.addWinDetailToState(paylineID, value, matches, payout);
        linePayout += payout;
        winFound = true;
      }
    }
    return linePayout;
  }

  payout(symbol, matches) {
    return this.paytable[symbol]?.[matches] || 0;
  }

  addWinDetailToState(paylineID, symbolID, repetition, payout) {
    this.gameState.score.winDetail.push({
      paylineID,
      symbolID,
      repetition,
      payout,
    });
  }
}
