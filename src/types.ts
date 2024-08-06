import { Palco2D } from "palco-2d";
import { Vec2 } from "palco-2d/types";

export enum BodyType {
  head = "head",
  body = "body",
  tail = "tail",
}

export type SnakeBodyType = {
  position: Vec2;
  direction: Vec2;
  key: BodyType;
  sprite: InstanceType<typeof Palco2D.Sprite>;
}


