import { Palco2D } from "palco-2d";
import { BaseEntityProps, TileMapType } from "palco-2d/types";

type Props = BaseEntityProps & {
  tileMap: TileMapType;
  tileSetImage: HTMLImageElement;
  cellSize: number;
};

enum BodyType {
  head = "head",
  body = "body",
  tail = "tail",
}

enum Direction {
  up,
  down,
  left,
  right,
}

type SnakeBodyType = {
  prev: SnakeBodyType | null;
  x: number;
  y: number;
  direction: Direction;
  key: BodyType;
  sprite: InstanceType<typeof Palco2D.Sprite>;
};

export class Snake extends Palco2D.BaseEntity {
  tileMap: TileMapType;
  tileSetImage: HTMLImageElement;
  cellSize: number;
  snakeBody: Array<SnakeBodyType> = [];

  constructor(props: Props) {
    super(props);

    this.tileMap = props.tileMap;
    this.tileSetImage = props.tileSetImage;
    this.cellSize = props.cellSize;

    this.keyBoardEvents();
  }

  private getRotateDirection(direction: Direction) {
    switch (direction) {
      case Direction.up:
        return 0;
      case Direction.down:
        return 180;
      case Direction.left:
        return 270;
      case Direction.right:
        return 90;
    }
  }

  private keyBoardEvents() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.updateHead(Direction.up);
          break;
        case "ArrowDown":
          this.updateHead(Direction.down);
          break;
        case "ArrowLeft":
          this.updateHead(Direction.left);
          break;
        case "ArrowRight":
          this.updateHead(Direction.right);
          break;
      }
    });
  }


  private updateHead(direction: Direction) {
    for (let i = this.snakeBody.length - 1; i >= 1; i--) {
      this.updateBodyParts(this.snakeBody[i]);
    }

    const head = this.snakeBody[0];
    head.direction = direction;
    switch (direction) {
      case Direction.up:
        head.y -= 1;
        break;
      case Direction.down:
        head.y += 1;
        break;
      case Direction.left:
        head.x -= 1;
        break;
      case Direction.right:
        head.x += 1;
        break;
    }

    this.updateBodyParts(head);

  }

  private updateBodyParts(snakePart: SnakeBodyType) {

    if (snakePart.prev) {
      snakePart.x = snakePart.prev.x;
      snakePart.y = snakePart.prev.y;
      snakePart.direction = snakePart.prev.direction;
    }

    snakePart.sprite.position = { x: this.cellSize * snakePart.x, y: this.cellSize * snakePart.y };
    snakePart.sprite.rotation = this.getRotateDirection(snakePart.direction);
  }

  private createSnakePart(x: number, y: number, key: BodyType) {
    const snakePart = new Palco2D.Sprite({
      texture: this.tileSetImage,
      tileMap: this.tileMap,
      position: { x: this.cellSize * x, y: this.cellSize * y },
      rotation: 0,
    });

    snakePart.setTile(key);

    this.snakeBody.push({
      prev: this.snakeBody[this.snakeBody.length - 1],
      direction: Direction.down,
      x,
      y,
      key,
      sprite: snakePart,
    });

    this.addChild(snakePart);
  }

  public spawnSnakeAt(x: number, y: number) {
    this.createSnakePart(x, y, BodyType.head);
    this.createSnakePart(x, y - 1, BodyType.body);
    this.createSnakePart(x, y - 2, BodyType.tail);
  }
}
