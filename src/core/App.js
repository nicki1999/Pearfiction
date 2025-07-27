import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from "./Loader";
import { EventEmitter } from "eventemitter3";

class Application {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }
  run(config) {
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

    this.config = config;

    this.app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(this.app.view);

    this.loader = new Loader(this.app.loader, this.config, this.app);
    //preloads the assetes
    this.loader.preload().then(() => {
      console.log("All assets loaded");
      this.start();
    });
  }

  res(key) {
    return this.loader.resources[key].texture;
  }

  sprite(key) {
    return new PIXI.Sprite(this.res(key));
  }

  start() {
    this.scene = new this.config["startScene"]();
    this.app.stage.addChild(this.scene.container);
  }
}

export const App = new Application();
