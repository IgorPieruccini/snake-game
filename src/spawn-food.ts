import { Palco2D } from "palco-2d";
import { Sprite } from "palco-2d/src/core/Sprite";
import { TileMapType, Vec2 } from "palco-2d/types";
import { SnakeBodyType } from "./types";
import { createSections, getAvailablePositionsInSector, getRandomSection, getSnakeHeadSection } from "./utils";

interface SpawnFoodProps {
  tileMap: TileMapType;
  tileSetImage: HTMLImageElement;
  tileSize: number;
  rows: number;
  cols: number;
}

export class SpawnFood {
  tileMap: TileMapType;
  tileSetImage: HTMLImageElement;
  rows: number;
  cols: number;
  foodTimer: number = 0;
  spawnFoodTimer: number = 10;
  division: number = 4;
  tileSize: number;
  private foodSprite: Sprite;

  constructor(props: SpawnFoodProps) {
    this.tileMap = props.tileMap;
    this.tileSetImage = props.tileSetImage;
    this.rows = props.rows;
    this.cols = props.cols;
    this.tileSize = props.tileSize;
    this.foodSprite = this.createFood({ x: 0, y: 0 });
  }

  get food() {
    return this.foodSprite;
  }

  private getSpawnPosition(snake: SnakeBodyType[]) {
    const headSection = getSnakeHeadSection(snake[0].position, this.division);
    console.log({ headSection });
    const randomSection = getRandomSection(headSection, this.division);
    console.log({ randomSection });

    const availablePositionInSector = getAvailablePositionsInSector(
      snake.map((body) => body.position),
      randomSection,
      this.rows,
      this.cols,
      this.division
    );
    console.log({ availablePositionInSector });

    const randomAvailablePosition = availablePositionInSector[Math.floor(Math.random() * availablePositionInSector.length)];

    return {
      x: randomAvailablePosition.x * this.tileSize,
      y: randomAvailablePosition.y * this.tileSize,
    };
  }

  private createFood(position: Vec2) {
    const food = new Palco2D.Sprite({
      id: "food",
      texture: this.tileSetImage,
      tileMap: this.tileMap,
      position,
      rotation: 0,
      layer: 1,
    });

    food.setTile("apple");
    return food;
  }

  private spawnFood(snake: SnakeBodyType[]) {
    const position = this.getSpawnPosition(snake);
    this.foodSprite.position = position;
  }

  public updateFoodTimer(snake: SnakeBodyType[]) {
    this.foodTimer += 1;
    if (this.foodTimer === this.spawnFoodTimer) {
      this.spawnFood(snake);
      this.foodTimer = 0;
    }
  }
}
