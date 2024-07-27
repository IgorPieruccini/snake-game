import { Palco2D } from "palco-2d";
import { BaseEntityProps, TileMapType } from "palco-2d/types";

type Props = BaseEntityProps & {
  tileMap: TileMapType;
  tileSetImage: HTMLImageElement;
  tileSize: number;
  rows: number;
  cols: number;
};

export class Floor extends Palco2D.BaseEntity {
  tileMap: TileMapType;
  tileSetImage: HTMLImageElement;
  tileSize: number;
  rows: number;
  cols: number

  constructor(props: Props) {
    super(props);
    this.tileMap = props.tileMap;
    this.tileSetImage = props.tileSetImage;
    this.tileSize = props.tileSize;
    this.rows = props.rows;
    this.cols = props.cols;
    this.init();
  }

  createFloorTile(x: number, y: number, key: string) {
    const floorTile = new Palco2D.Sprite({
      texture: this.tileSetImage,
      tileMap: this.tileMap,
      position: { x, y },
      rotation: 0,
    });

    floorTile.setTile(key);
    return floorTile;
  }

  createTop(x: number) {
    this.addChild(this.createFloorTile(0, 0, "1"));
    for (let i = 1; i < x; i++) {
      const random = Math.floor(Math.random() * 4) + 2;
      this.addChild(this.createFloorTile(i * this.tileSize, 0, random.toString()));
    }

    this.addChild(this.createFloorTile(x * this.tileSize, 0, "6"));
  }

  createMiddle(x: number, y: number) {
    this.addChild(this.createFloorTile(0, y * this.tileSize, "1"));

    for (let i = 1; i < x; i++) {
      const randomY = Math.floor(Math.random() * 3);
      const randomX = Math.floor(Math.random() * 2) + 7;
      const randomResult = randomX + randomY;
      this.addChild(this.createFloorTile(i * this.tileSize, y * this.tileSize, randomResult.toString()));
    }

    this.addChild(this.createFloorTile(x * this.tileSize, y * this.tileSize, "6"));
  }

  createBottom(x: number, y: number) {
    this.addChild(this.createFloorTile(0, y * this.tileSize, "41"));
    for (let i = 1; i < x; i++) {
      const random = Math.floor(Math.random() * 4) + 42;
      this.addChild(this.createFloorTile(i * this.tileSize, y * this.tileSize, random.toString()));
    }
    this.addChild(this.createFloorTile(x * this.tileSize, y * this.tileSize, "46"));

  }

  init() {
    this.createTop(this.cols);
    for (let i = 1; i < this.rows; i++) {
      this.createMiddle(this.cols, i);
    }

    this.createBottom(this.cols, this.rows);
  }
}
