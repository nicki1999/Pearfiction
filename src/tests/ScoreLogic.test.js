import { EventEmitter } from "events";
import { ScoreLogic } from "../game/managers/ScoreLogic.js";
import { GameState } from "../game/config/GameState.js";
import { Config } from "../game/config/Config.js";

describe("ScoreLogic", () => {
  let scoreLogic;
  let mockEmitter;

  beforeEach(() => {
    GameState.score = { winNumber: 0, winDetail: [] }; // Match ScoreLogic's property
    mockEmitter = new EventEmitter();
    mockEmitter.on("score", () => {});
    scoreLogic = new ScoreLogic(GameState, Config.Paytable, Config.Payline, mockEmitter);
  });

  test("calculates a winning payline correctly", () => {
    GameState.updatedMatrix = [
      ["lv1", "lv1", "lv1", "lv1", "lv1"],
      ["hv1", "hv1", "hv1", "hv1", "hv1"], 
      ["lv3", "lv3", "lv3", "lv3", "lv3"]
    ];

    scoreLogic.checkPaylines();

    expect(GameState.score.winNumber).toBeGreaterThan(0); 
    expect(GameState.score.winDetail.length).toBeGreaterThan(0);
  });

  test("resets score when no wins", () => {
    // Ensure no row or payline has 3+ identical symbols
    GameState.updatedMatrix = [
      ["hv1", "hv2", "hv3", "hv4", "hv5"],
      ["lv1", "lv2", "lv3", "lv4", "lv1"],
      ["hv2", "lv3", "hv4", "hv1", "hv5"]
    ];

    scoreLogic.checkPaylines();

    expect(GameState.score.winNumber).toBe(0);
    expect(GameState.score.winDetail.length).toBe(0);
  });
});
