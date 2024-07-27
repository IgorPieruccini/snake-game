import { Palco2D } from "palco-2d";

const dpr = window.devicePixelRatio || 1;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

if (!canvas) {
  throw new Error("Canvas not found");
}

const width = canvas.clientWidth;
const height = canvas.clientHeight;

canvas.setAttribute("width", (width * dpr).toString());
canvas.setAttribute("height", (height * dpr).toString());

const mainScene = new Palco2D.Scene(canvas, "main-scene");

const scneneHandler = new Palco2D.SceneHandler([mainScene]);

const text = new Palco2D.Text({
  text: "Hello World",
  position: { x: 10, y: 10 },
  rotation: 0,
  fontSize: 24,
  color: "black"
});

mainScene.render.addEntity(text);
mainScene.render.startRender();

scneneHandler.startScene("main-scene");
