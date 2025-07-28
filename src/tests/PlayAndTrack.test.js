import { PlayAndTrack } from "../game/ui/PlayAndTrack.js";
import { GameState } from "../game/config/GameState.js";

jest.mock("pixi.js", () => ({
  Container: jest.fn().mockImplementation(() => ({
    addChild: jest.fn(),
    removeChildren: jest.fn(),
    children: [],
  })),
}));

jest.mock("../core/App.js", () => ({
  App: {
    sprite: jest.fn(() => ({
      texture: { orig: { width: 100, height: 50 }, textureCacheIds: ["spin_button"] },
      interactive: false,
      buttonMode: false,
      on: jest.fn(),
    })),
  },
}));


// Mock LabelScore as a simple object
jest.mock("../game/ui/LabelScore.js", () => ({
  LabelScore: jest.fn().mockImplementation(() => ({
    anchor: { set: jest.fn() },
    x: 0,
    y: 0,
  })),
}));
beforeAll(() => {
  global.window = {};
  Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
  Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
});

describe("PlayAndTrack", () => {
  let playAndTrack, mockReel, mockScoreLogic;

  beforeEach(() => {
    mockReel = {
      reelSet: Array(5).fill(Array(20).fill("hv1")), // fake reel data
      cols: 5,
      spinAnimation: jest.fn((cb) => cb && cb()), // immediately trigger callback
    };
    mockScoreLogic = { checkPaylines: jest.fn() };

    playAndTrack = new PlayAndTrack(2, 1, mockReel, mockScoreLogic);
  });

  test("creates a container and adds spin button", () => {
    expect(playAndTrack.container).toBeDefined();
    expect(playAndTrack.container.addChild).toHaveBeenCalled(); // spin button + label
  });

  test("clicking spin button triggers spinAnimation and checkPaylines", () => {
    const spinButton = playAndTrack.container.addChild.mock.calls[0][0];
    spinButton.on.mock.calls
      .find(([event]) => event === "pointerdown")[1](); // manually call the handler

    expect(mockReel.spinAnimation).toHaveBeenCalled();
    expect(mockScoreLogic.checkPaylines).toHaveBeenCalled();
  });

  test("randomSpin updates GameState.updatedMatrix correctly", () => {
    const initialMatrix = GameState.updatedMatrix.map((row) => [...row]);
    playAndTrack.randomSpin();

    // The matrix should now be filled with non-empty values
    GameState.updatedMatrix.forEach((row) => {
      row.forEach((cell) => {
        expect(typeof cell).toBe("string");
        expect(cell).not.toBe("");
      });
    });
  });

  test("positionUI adjusts spinButton and label positions", () => {
    const fakeButton = {
      texture: { orig: { width: 100, height: 50 }, textureCacheIds: ["spin_button"] },
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    };
    playAndTrack.labelScore = { anchor: { set: jest.fn() }, x: 0, y: 0 };

    playAndTrack.positionUI(fakeButton);

    expect(fakeButton.height).toBeGreaterThan(0);
    expect(fakeButton.width).toBeGreaterThan(0);
    expect(playAndTrack.labelScore.x).toBeGreaterThan(0);
    expect(playAndTrack.labelScore.y).toBeGreaterThan(fakeButton.y);
  });
});
