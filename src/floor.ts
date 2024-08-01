import { Palco2D } from "palco-2d";
import { Sprite } from "palco-2d/src/core/Sprite";
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
  private tiles: Array<Sprite> = [];

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
      static: true,
    });

    floorTile.setTile(key);
    return floorTile;
  }

  createTop(x: number) {
    this.tiles.push(this.createFloorTile(0, 0, "1"));
    for (let i = 1; i < x; i++) {
      const random = Math.floor(Math.random() * 4) + 2;
      this.tiles.push(this.createFloorTile(i * this.tileSize, 0, random.toString()));
    }

    this.tiles.push(this.createFloorTile(x * this.tileSize, 0, "6"));
  }

  createMiddle(x: number, y: number) {
    this.tiles.push(this.createFloorTile(0, y * this.tileSize, "1"));

    for (let i = 1; i < x; i++) {
      const randomY = Math.floor(Math.random() * 3);
      const randomX = Math.floor(Math.random() * 2) + 7;
      const randomResult = randomX + randomY;
      this.tiles.push(this.createFloorTile(i * this.tileSize, y * this.tileSize, randomResult.toString()));
    }

    this.tiles.push(this.createFloorTile(x * this.tileSize, y * this.tileSize, "6"));
  }

  createBottom(x: number, y: number) {
    this.tiles.push(this.createFloorTile(0, y * this.tileSize, "41"));
    for (let i = 1; i < x; i++) {
      const random = Math.floor(Math.random() * 4) + 42;
      this.tiles.push(this.createFloorTile(i * this.tileSize, y * this.tileSize, random.toString()));
    }
    this.tiles.push(this.createFloorTile(x * this.tileSize, y * this.tileSize, "46"));

  }

  init() {
    this.createTop(this.cols);
    for (let i = 1; i < this.rows; i++) {
      this.createMiddle(this.cols, i);
    }

    this.createBottom(this.cols, this.rows);

    // Batch the floor into a single sprite
    const batcher = new Palco2D.BatchHandler();
    batcher.batchStaticObjects(this.tiles);
    const batchedFloorByLayer = batcher.getAllStaticBatches();
    const batchedFloor = batchedFloorByLayer[0]; // only one layer batched
    const floor = new Palco2D.BaseEntity({
      position: { x: 0, y: 0 },
      size: { x: this.cols * this.tileSize, y: this.rows * this.tileSize },
      rotation: 0,
      layer: batchedFloor.layer,
    });
    floor.render = batchedFloor.draw;
    this.addChild(floor);
  }




}
