import { Palco2D } from "palco-2d";
import { Floor } from "./floor";
import { Snake } from "./snake";

export class MainScene extends Palco2D.Scene {

  async start() {
    const tileSetImage = await Palco2D.AssetHandler().loadPng("tileset", "assets/dungeon-tileset.png");
    const tileMap = await Palco2D.AssetHandler().loadTileMap("tilemap", "assets/tile-map.json");
    const snakeImage = await Palco2D.AssetHandler().loadPng("snake", "assets/snake-tileset.png");
    const snakeTimeMap = await Palco2D.AssetHandler().loadTileMap("snake-tilemap", "assets/snake-tilemap.json");

    const rows = 10;
    const cols = 10;
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

    const snake = new Snake({
      position,
      rotation: 0,
      size: { x: 1, y: 1 },
      tileMap: snakeTimeMap,
      tileSetImage: snakeImage,
      cellSize: tileSize,
      layer: 1
    });

    snake.spawnSnakeAt(Math.floor(rows / 2), Math.floor(cols / 2));

    this.render.addEntity(snake);
    this.render.addEntity(floor);
    this.render.startRender();
  }

}
