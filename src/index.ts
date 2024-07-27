import { Palco2D } from "palco-2d";
import { MainScene } from "./main-scene";

const dpr = window.devicePixelRatio || 1;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

if (!canvas) {
  throw new Error("Canvas not found");
}

const width = canvas.clientWidth;
const height = canvas.clientHeight;

canvas.setAttribute("width", (width * dpr).toString());
canvas.setAttribute("height", (height * dpr).toString());

const mainScene = new MainScene(canvas, "main-scene");

const scneneHandler = new Palco2D.SceneHandler([mainScene]);

scneneHandler.startScene("main-scene");
