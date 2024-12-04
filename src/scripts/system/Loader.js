import * as PIXI from "pixi.js";

export class Loader {
  constructor(loader, config, app) {
    this.loader = loader;
    this.config = config;
    this.resources = {};
    this.app = app;
  }

  preload() {
    this.loadingText = new PIXI.Text("Loading... 0%", {
      fontFamily: "Arial",
      fontSize: 36,
      fill: 0xffffff,
      align: "center",
    });
    this.loadingText.anchor.set(0.5);
    this.updateTextPosition();
    this.app.stage.addChild(this.loadingText);

    window.addEventListener("resize", () => this.updateTextPosition());

    for (const asset of this.config.loader) {
      console.log("name of the asset: ", asset);
      let key = asset.key.substr(asset.key.lastIndexOf("/") + 1);
      key = key.substring(0, key.indexOf("."));
      if (
        asset.key.indexOf(".png") !== -1 ||
        asset.key.indexOf(".jpg") !== -1
      ) {
        this.loader.add(key, asset.data.default);
      }
    }

    return new Promise((resolve) => {
      this.loader.onProgress.add((loader) => {
        console.log(`Loading progress: ${Math.round(loader.progress)}%`);
        this.loadingText.text = `Loading... ${Math.round(loader.progress)}%`;
      });
      this.loader.load((loader, resources) => {
        //resources have to be loaded so we could access them later in the game
        this.resources = resources;
        this.app.stage.removeChild(this.loadingText);
        this.loadingText = null;
        resolve();
      });
    });
  }
  updateTextPosition() {
    if (this.loadingText) {
      this.loadingText.x = this.app.renderer.width / 2;
      this.loadingText.y = this.app.renderer.height / 2;
    }
  }
}
