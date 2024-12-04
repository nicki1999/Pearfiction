// define all of the entities here
import { Game } from "./Game";
import { Tools } from "../system/Tools";
import { App } from "../system/App";
import { Reel } from "./Reel";

export const Config = {
  loader: Tools.massiveRequire(
    require["context"]("./../../sprites/", true, /\.(mp3|png|jpe?g)$/)
  ),

  matrix: {
    bands: [
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
  },
  reel: {
    position: [0, 0, 0, 0, 0],
    updatedMatrix: Array.from({ length: 3 }, () => Array(5).fill("")),
  },
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

  score: {
    winNumber: 0,
    winDetail: [],
  },

  startScene: Game,
};

Config.payline = {
  payline1: Config.reel.updatedMatrix[1],
  payline2: Config.reel.updatedMatrix[0],
  payline3: Config.reel.updatedMatrix[2],
  
  get payline4() {
    return [
      Config.reel.updatedMatrix[0][0],
      Config.reel.updatedMatrix[0][1],
      Config.reel.updatedMatrix[1][2],
      Config.reel.updatedMatrix[2][3],
      Config.reel.updatedMatrix[2][4],
    ];
  },
get payline5(){ return [
  Config.reel.updatedMatrix[0][3],
  Config.reel.updatedMatrix[0][4],
  Config.reel.updatedMatrix[1][2],
  Config.reel.updatedMatrix[2][0],
  Config.reel.updatedMatrix[2][1],
];},
get payline6(){ return [
    Config.reel.updatedMatrix[0][0],
    Config.reel.updatedMatrix[1][1],
    Config.reel.updatedMatrix[2][2],
    Config.reel.updatedMatrix[1][3],
    Config.reel.updatedMatrix[0][4],
  ];},
  get payline7(){ return [
    Config.reel.updatedMatrix[2][0],
    Config.reel.updatedMatrix[1][1],
    Config.reel.updatedMatrix[0][2],
    Config.reel.updatedMatrix[1][3],
    Config.reel.updatedMatrix[2][4],
  ];},
};
