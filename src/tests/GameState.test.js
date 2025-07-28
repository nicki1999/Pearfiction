// src/tests/GameState.test.js
import { GameState } from "../game/config/GameState.js";

describe("GameState", () => {
  beforeEach(() => {
    // Reset GameState before each test to avoid cross-test pollution
    GameState.reelPositions = [0, 0, 0, 0, 0];
    GameState.updatedMatrix = Array.from({ length: 3 }, () => Array(5).fill(""));
    GameState.score = { winNumber: 0, winDetail: [] };
  });

  test("initializes with default values", () => {
    expect(GameState.reelPositions).toEqual([0, 0, 0, 0, 0]);
    expect(GameState.updatedMatrix.length).toBe(3);   // 3 rows
    expect(GameState.updatedMatrix[0].length).toBe(5); // 5 columns
    expect(GameState.score.winNumber).toBe(0);
    expect(GameState.score.winDetail).toEqual([]);
  });

  test("allows updating reelPositions", () => {
    GameState.reelPositions = [5, 10, 15, 3, 7];
    expect(GameState.reelPositions).toEqual([5, 10, 15, 3, 7]);
  });

  test("allows updating updatedMatrix values", () => {
    GameState.updatedMatrix[0][0] = "hv1";
    GameState.updatedMatrix[2][4] = "lv4";
    expect(GameState.updatedMatrix[0][0]).toBe("hv1");
    expect(GameState.updatedMatrix[2][4]).toBe("lv4");
  });

  test("resets score correctly", () => {
    GameState.score.winNumber = 10;
    GameState.score.winDetail.push({ paylineID: 1, payout: 50 });

    // Reset manually
    GameState.score.winNumber = 0;
    GameState.score.winDetail = [];

    expect(GameState.score.winNumber).toBe(0);
    expect(GameState.score.winDetail).toEqual([]);
  });
});
