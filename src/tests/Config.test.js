// src/tests/Config.test.js
import { Config } from "../game/config/Config.js";

describe("Config", () => {
  test("has a valid Reelset structure", () => {
    expect(Array.isArray(Config.Reelset)).toBe(true);
    expect(Config.Reelset.length).toBe(5); // 5 reels
    Config.Reelset.forEach((reel) => {
      expect(Array.isArray(reel)).toBe(true);
      expect(reel.length).toBe(20); // each reel has 20 symbols
      reel.forEach((symbol) => {
        expect(typeof symbol).toBe("string");
        expect(symbol).toMatch(/^(hv|lv)\d$/); // matches hv1, lv4, etc.
      });
    });
  });

  test("Paytable contains payout entries for all symbols", () => {
    const symbols = ["hv1", "hv2", "hv3", "hv4", "lv1", "lv2", "lv3", "lv4"];
    symbols.forEach((symbol) => {
      expect(Config.Paytable[symbol]).toBeDefined();
      [3, 4, 5].forEach((count) => {
        expect(typeof Config.Paytable[symbol][count]).toBe("number");
      });
    });
  });

  test("Paylines follow the correct row/column format", () => {
    expect(Array.isArray(Config.Payline)).toBe(true);
    Config.Payline.forEach((line) => {
      expect(Array.isArray(line)).toBe(true);
      expect(line.length).toBe(5); // each line spans 5 reels
      line.forEach(([row, col]) => {
        expect(typeof row).toBe("number");
        expect(typeof col).toBe("number");
        expect(row).toBeGreaterThanOrEqual(0);
        expect(row).toBeLessThan(3);  // only 3 rows
        expect(col).toBeGreaterThanOrEqual(0);
        expect(col).toBeLessThan(5);  // only 5 columns
      });
    });
  });

  test("scoreText contains expected properties", () => {
    expect(Config.scoreText).toHaveProperty("x");
    expect(Config.scoreText).toHaveProperty("y");
    expect(Config.scoreText).toHaveProperty("anchor");
    expect(Config.scoreText).toHaveProperty("style");
    expect(Config.scoreText.style).toHaveProperty("fontFamily");
    expect(Config.scoreText.style).toHaveProperty("fontSize");
    expect(Array.isArray(Config.scoreText.style.fill)).toBe(true);
  });

  test("startScene references a function/class", () => {
    expect(Config.startScene).toBeDefined();
    expect(typeof Config.startScene).toBe("function");
  });
});
