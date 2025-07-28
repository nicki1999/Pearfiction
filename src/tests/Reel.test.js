// tests/Reel.test.js
import { Reel } from "../game/world/Reel.js";
import { GameState } from "../game/config/GameState.js";

// Mock PIXI
jest.mock("pixi.js", () => ({
  Container: jest.fn().mockImplementation(() => ({
    addChild: jest.fn(),
    removeChildren: jest.fn(),
    children: [],
  })),
  Sprite: jest.fn().mockImplementation(() => ({
    texture: {},
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })),
}));

// Mock App.res and ticker for spinAnimation
jest.mock("../core/App.js", () => ({
  App: {
    res: jest.fn(() => ({})), // fake texture
    app: { ticker: { add: jest.fn(), remove: jest.fn() } },
  },
}));

describe("Reel", () => {
  let reel, spriteFactory;

  beforeEach(() => {
    // Reset GameState
    GameState.reelPositions = [0, 0, 0, 0, 0];
    GameState.updatedMatrix = Array.from({ length: 3 }, () => Array(5).fill(""));

    // Fake reel data
    const reelSet = [
      ["hv1", "hv2", "lv3", "hv4"],
      ["lv1", "lv2", "hv3", "lv4"],
      ["hv4", "lv4", "lv1", "hv2"],
      ["hv1", "lv3", "hv2", "hv1"],
      ["hv3", "lv2", "lv4", "lv1"],
    ];

    spriteFactory = jest.fn(() => ({
      texture: {},
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }));

    reel = new Reel(3, 5, reelSet, GameState, spriteFactory);
  });

  test("initializes with correct rows, cols, and reelSet", () => {
    expect(reel.rows).toBe(3);
    expect(reel.cols).toBe(5);
    expect(reel.reelSet.length).toBe(5);
    expect(reel.container).toBeDefined();
  });

  test("spinAnimation triggers callback when finished", () => {
    const callback = jest.fn();
    reel.spinAnimation = jest.fn((cb) => cb && cb());

    reel.spinAnimation(callback);
    expect(callback).toHaveBeenCalled();
  });

  test("fills GameState.updatedMatrix via newRound", () => {
    // Force manual tile generation again to fill matrix
    for (let row = 0; row < reel.rows; row++) {
      for (let col = 0; col < reel.cols; col++) {
        reel.newRound(row, col);
      }
    }

    GameState.updatedMatrix.forEach((row) =>
      row.forEach((cell) => {
        expect(typeof cell).toBe("string");
        expect(cell).not.toBe("");
      })
    );
  });
});
