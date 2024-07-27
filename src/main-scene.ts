import { Palco2D } from "palco-2d";

export class MainScene extends Palco2D.Scene {


  async start() {
    const text = new Palco2D.Text({
      text: "Hello World",
      position: { x: 10, y: 10 },
      rotation: 0,
      fontSize: 24,
      color: "black"
    });

    this.render.addEntity(text);
    this.render.startRender();
  }

}
