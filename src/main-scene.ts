import { Palco2D } from "palco-2d";
import { Floor } from "./floor";
import { Snake } from "./snake";
import { Vec2 } from "palco-2d/types";
import { SpawnFood } from "./spawn-food";

export class MainScene extends Palco2D.Scene {

  async start() {
    const tileSetImage = await Palco2D.AssetHandler().loadPng("tileset", "assets/dungeon-tileset.png");
    const tileMap = await Palco2D.AssetHandler().loadTileMap("tilemap", "assets/tile-map.json");
    const snakeImage = await Palco2D.AssetHandler().loadPng("snake", "assets/snake-tileset.png");
    const snakeTimeMap = await Palco2D.AssetHandler().loadTileMap("snake-tilemap", "assets/snake-tilemap.json");

    const rows = 24;
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

    const spawnFood = new SpawnFood({
      tileMap: snakeTimeMap,
      tileSetImage: snakeImage,
      tileSize,
      rows,
      cols
    });

    floor.addChild(spawnFood.food);

    let currentDirection = { x: 0, y: -1 };
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (snake.headDirection.y === 1) return;
          currentDirection = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (snake.headDirection.y === -1) return;
          currentDirection = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (snake.headDirection.x === 1) return
          currentDirection = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (snake.headDirection.x === -1) return;
          currentDirection = { x: 1, y: 0 };
          break;
        case "a":
          snake.eatFood = true;
          break;
      }
    });

    const checkCollision = () => {
      const position: Vec2 = {
        x: snake.headPosition.x + currentDirection.x,
        y: snake.headPosition.y + currentDirection.y
      };

      if (position.x <= 0 || position.x >= cols || position.y <= 0 || position.y >= rows) {
        return true;
      }

      const isCollidingWithBody = snake.snakeBody.some((body) => {
        return body.position.x === position.x && body.position.y === position.y;
      });

      return isCollidingWithBody;
    }

    const interval = setInterval(() => {
      const isColliding = checkCollision();
      if (isColliding) {
        alert("Game Over");
        clearInterval(interval);
      }
      snake.updateSnakePosition(currentDirection, 0);
      spawnFood.updateFoodTimer(snake.snakeBody);
    }, 250);

    this.render.addEntity(snake);
    this.render.addEntity(floor);
    this.render.startRender();
  }

}
