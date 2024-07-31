import { Palco2D } from "palco-2d";
import { Sprite } from "palco-2d/src/core/Sprite";
import { BaseEntityProps, TileMapType, Vec2 } from "palco-2d/types";

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

type SnakeBodyType = {
  position: Vec2;
  direction: Vec2;
  key: BodyType;
  sprite: InstanceType<typeof Palco2D.Sprite>;
};

function getRotationDirection(direction: Vec2) {
  if (direction.x === 0 && direction.y === -1) return 0;
  if (direction.x === 0 && direction.y === 1) return 180;
  if (direction.x === -1 && direction.y === 0) return 270;
  if (direction.x === 1 && direction.y === 0) return 90;
  return 0;
}

export class Snake extends Palco2D.BaseEntity {
  tileMap: TileMapType;
  tileSetImage: HTMLImageElement;
  cellSize: number;
  snakeBody: Array<SnakeBodyType> = [];
  private willEatFood: boolean = false;
  private currentDirection: Vec2 = { x: 0, y: -1 };

  constructor(props: Props) {
    super(props);

    this.tileMap = props.tileMap;
    this.tileSetImage = props.tileSetImage;
    this.cellSize = props.cellSize;

    this.keyBoardEvents();
  }

  private keyBoardEvents() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (this.currentDirection.y === 1) return;
          this.currentDirection = { x: 0, y: -1 };
          this.updateSnakePosition({ x: 0, y: -1 }, 0);
          break;
        case "ArrowDown":
          if (this.currentDirection.y === -1) return;
          this.currentDirection = { x: 0, y: 1 };
          this.updateSnakePosition({ x: 0, y: 1 }, 0);
          break;
        case "ArrowLeft":
          if (this.currentDirection.x === 1) return
          this.currentDirection = { x: -1, y: 0 };
          this.updateSnakePosition({ x: -1, y: 0 }, 0);
          break;
        case "ArrowRight":
          if (this.currentDirection.x === -1) return;
          this.currentDirection = { x: 1, y: 0 };
          this.updateSnakePosition({ x: 1, y: 0 }, 0);
          break;
        case "a":
          this.willEatFood = true;
          break;
      }
    });
  }

  private addBody(direction: Vec2, position: Vec2) {
    const body = this.createSnakePart(position.x, position.y, BodyType.body);
    body.direction = { x: direction.x, y: direction.y };
    body.sprite.rotation = getRotationDirection(body.direction);

    this.snakeBody = [
      ...this.snakeBody.slice(0, 1),
      body,
      ...this.snakeBody.slice(1)
    ];

    return body;
  }

  private updateBodySprite(direction: Vec2, prevDirection: Vec2, key: string, sprite: Sprite) {
    const differentDirection = prevDirection.x !== direction.x || prevDirection.y !== direction.y;

    if (differentDirection && key === BodyType.body) {
      sprite.setTile("body-turn");
      if (
        (prevDirection.x === 1 && direction.y === 1) ||
        (prevDirection.y === 1 && direction.x === -1) ||
        (prevDirection.x === -1 && direction.y === -1) ||
        (prevDirection.y === -1 && direction.x === 1)
      ) {
        sprite.size.x = Math.abs(sprite.size.x)
      } else {
        sprite.size.x = sprite.size.x * -1
      }
    } else if (key === BodyType.body) {
      sprite.setTile("body");
    }
  }


  private updateSnakePosition(direction: Vec2, index: number, oldPrevDirection?: Vec2) {
    const body = this.snakeBody[index];
    if (!body) return;

    const oldDirection = { x: body.direction.x, y: body.direction.y };
    const oldPosition = { x: body.position.x, y: body.position.y };

    body.position = { x: body.position.x + direction.x, y: body.position.y + direction.y };
    body.direction = direction;
    body.sprite.rotation = getRotationDirection(direction);
    body.sprite.position = { x: body.position.x * this.cellSize, y: body.position.y * this.cellSize };

    if (oldPrevDirection) {
      this.updateBodySprite(direction, oldPrevDirection, body.key, body.sprite);
    }

    if (body.key === BodyType.tail) {
      if (oldPrevDirection) {
        body.direction = { x: oldPrevDirection.x, y: oldPrevDirection.y };
        body.sprite.rotation = getRotationDirection(oldPrevDirection);
      }
    }

    if (body.key === BodyType.head && this.willEatFood) {
      const body = this.addBody(oldDirection, oldPosition);
      this.willEatFood = false;
      this.updateBodySprite(oldDirection, direction, BodyType.body, body.sprite);
      return;
    }

    this.updateSnakePosition(oldDirection, index + 1, direction);
  }

  /**
    * Create the sprite and objects for the snake part and push it to the snakeBody array
    */
  private createSnakePart(x: number, y: number, key: BodyType) {
    const snakePart = new Palco2D.Sprite({
      texture: this.tileSetImage,
      tileMap: this.tileMap,
      position: { x: this.cellSize * x, y: this.cellSize * y },
      rotation: 0,
    });

    snakePart.setTile(key);

    const body = {
      direction: { x: 0, y: -1 },
      position: { x, y },
      key,
      sprite: snakePart,
    }

    this.addChild(snakePart);
    return body;
  }

  /**
    * Spawn the default/initial snake at the given position
    */
  public spawnSnakeAt(x: number, y: number) {
    const head = this.createSnakePart(x, y, BodyType.head);
    const body = this.createSnakePart(x, y + 1, BodyType.body);
    const tail = this.createSnakePart(x, y + 2, BodyType.tail);
    this.snakeBody = [head, body, tail];
  }
}
