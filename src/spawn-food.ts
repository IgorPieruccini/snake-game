import { Palco2D } from "palco-2d";
import { Sprite } from "palco-2d/src/core/Sprite";
import { TileMapType, Vec2 } from "palco-2d/types";
import { SnakeBodyType } from "./types";
import { createSections } from "./utils";

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
  spawnFoodTimer: number = 3;
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

  private getEmptySpaceInSection(sectionRow: number, sectionCol: number) {

  }

  private getSpawnPosition(snake: SnakeBodyType[]) {
    // Divide the floor into sections 3x3
    const section = createSections(this.rows, this.cols);
    // Select the section further away from the head snake   
    const headPosition = snake[0].position;
    if (!headPosition) {
      throw new Error("Head position is not defined");
    }

    // Randomly select a section
    const sectionRow = Math.floor(Math.random() * 3);
    const sectionCol = Math.floor(Math.random() * 3);

    // Get the empty space in the section
    // const emptySpace = this.getEmptySpaceInSection(sectionRow, sectionCol);

    // row 1, 2, 3
    // col 1, 2, 3

    const x = Math.floor(Math.random() * this.cols);
    const y = Math.floor(Math.random() * this.rows);

    return { x: this.tileSize * x, y: this.tileSize * y };
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
