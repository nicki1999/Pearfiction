// Define all of the entities here
import { GameManager } from "../managers/GameManager";
import { Tools } from "../../core/Tools";

export const Config = {
  loader: Tools.massiveRequire(
    require["context"]("./../../sprites/", true, /\.(mp3|png|jpe?g)$/)
  ),

    Reelset: [
      //B1
      [
        "hv2",
        "lv3",
        "lv3",
        "hv1",
        "hv1",
        "lv1",
        "hv1",
        "hv4",
        "lv1",
        "hv3",
        "hv2",
        "hv3",
        "lv4",
        "hv4",
        "lv1",
        "hv2",
        "lv4",
        "lv1",
        "lv3",
        "hv2",
      ],
      //B2
      [
        "hv1",
        "lv2",
        "lv3",
        "lv2",
        "lv1",
        "lv1",
        "lv4",
        "lv1",
        "lv1",
        "hv4",
        "lv3",
        "hv2",
        "lv1",
        "lv3",
        "hv1",
        "lv1",
        "lv2",
        "lv4",
        "lv3",
        "lv2",
      ],
      //B3
      [
        "lv1",
        "hv2",
        "lv3",
        "lv4",
        "hv3",
        "hv2",
        "lv2",
        "hv2",
        "hv2",
        "lv1",
        "hv3",
        "lv1",
        "hv1",
        "lv2",
        "hv3",
        "hv2",
        "hv4",
        "hv1",
        "lv2",
        "lv4",
      ],
      //B4
      [
        "hv2",
        "lv2",
        "hv3",
        "lv2",
        "lv4",
        "lv4",
        "hv3",
        "lv2",
        "lv4",
        "hv1",
        "lv1",
        "hv1",
        "lv2",
        "hv3",
        "lv2",
        "lv3",
        "hv2",
        "lv1",
        "hv3",
        "lv2",
      ],
      //B5
      [
        "lv3",
        "lv4",
        "hv2",
        "hv3",
        "hv4",
        "hv1",
        "hv3",
        "hv2",
        "hv2",
        "hv4",
        "hv4",
        "hv2",
        "lv2",
        "hv4",
        "hv1",
        "lv2",
        "hv1",
        "lv2",
        "hv4",
        "lv4",
      ],
    ],
  Paytable:{
    hv1: {3: 10, 4: 20, 5: 50},
    hv2: {3: 5,  4: 10, 5: 20},
    hv3: {3: 5,  4: 10, 5: 15},
    hv4: {3: 5,  4: 10, 5: 15},
    lv1: {3: 2,  4: 5,  5: 10},
    lv2: {3: 1,  4: 2,  5: 5},
    lv3: {3: 1,  4: 2,  5: 3},
    lv4: {3: 1,  4: 2,  5: 3}
  },
  Payline: [
    [[1,0],[1,1],[1,2],[1,3],[1,4]],  // Payline 1 (middle row)
    [[0,0],[0,1],[0,2],[0,3],[0,4]],  // Payline 2 (top row)
    [[2,0],[2,1],[2,2],[2,3],[2,4]],  // Payline 3 (bottom row)
    [[0,0],[0,1],[1,2],[2,3],[2,4]],  // Payline 4 (V shape)
    [[2,0],[2,1],[1,2],[0,3],[0,4]],  // Payline 5 (inverted V)
    [[0,0],[1,1],[2,2],[1,3],[0,4]],  // Payline 6 (zigzag)
    [[2,0],[1,1],[0,2],[1,3],[2,4]]   // Payline 7 (zigzag inverse)
  ],

  scoreText: {
    x: 10,
    y: 10,
    anchor: -0.5,
    style: {
      fontFamily: "Verdana",
      fontWeight: "bold",
      fontSize: 15,
      fill: ["#000000"],
    },
  },
  startScene: GameManager,
};


