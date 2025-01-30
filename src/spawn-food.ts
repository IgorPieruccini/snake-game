import { Palco2D } from "palco-2d";
import { Sprite } from "palco-2d/src/core/Sprite";
import { TileMapType, Vec2 } from "palco-2d/types";

interface SpawnFoodProps {
  tileSize: number;
  rows: number;
  cols: number;
}

export class SpawnFood {
  rows: number;
  cols: number;
  foodTimer: number = 0;
  spawnFoodTimer: number = 3;
  tileSize: number;
  private foodSprite: Sprite;

  constructor(props: SpawnFoodProps) {
    this.rows = props.rows;
    this.cols = props.cols;
    this.tileSize = props.tileSize;
    this.foodSprite = this.createFood({ x: 0, y: 0 });
  }

  get food() {
    return this.foodSprite;
  }

  private getSpawnPosition() {
    const x = Math.floor(Math.random() * this.cols);
    const y = Math.floor(Math.random() * this.rows);

    return { x: this.tileSize * x, y: this.tileSize * y };
  }

  private createFood(position: Vec2) {
    const food = new Palco2D.Sprite({
      id: "food",
      texture: "assets/snake-tileset.png",
      tileMap: "assets/snake-tilemap.json",
      position,
      rotation: 0,
      layer: 1,
    });

    food.setTile("apple");
    return food;
  }

  private spawnFood() {
    const position = this.getSpawnPosition();
    this.foodSprite.position = position;
  }

  public updateFoodTimer() {
    this.foodTimer += 1;
    if (this.foodTimer === this.spawnFoodTimer) {
      this.spawnFood();
      this.foodTimer = 0;
    }
  }
}
