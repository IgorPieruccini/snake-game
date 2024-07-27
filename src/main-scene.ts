import { Palco2D } from "palco-2d";
import { Floor } from "./floor";


type Cell = {
  x: number,
  y: number,
  type: "snake" | "food" | "empty"
}


type Grid = Array<Cell>

const createGrid = (rows: number, cols: number) => {
  const grid: Grid = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid.push({ x, y, type: "empty" });
    }
  }

  return grid;
}


export class MainScene extends Palco2D.Scene {

  async start() {
    const tileSetImage = await Palco2D.AssetHandler().loadPng("tileset", "assets/dungeon-tileset.png");
    const tileMap = await Palco2D.AssetHandler().loadTileMap("tilemap", "assets/tile-map.json");

    const rows = 30;
    const cols = 30;
    const tileSize = 16;

    const foorWidth = cols * tileSize;
    const floorHeight = rows * tileSize;

    const position = {
      x: this.canvas.clientWidth / 2 - foorWidth / 2,
      y: this.canvas.clientHeight / 2 - floorHeight / 2
    };

    const floor = new Floor({
      tileMap,
      tileSetImage,
      position,
      rotation: 0,
      size: { x: 1, y: 1 },
      tileSize,
      rows,
      cols
    });

    this.render.addEntity(floor);
    this.render.startRender();
  }

}
