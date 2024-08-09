import { Palco2D } from "palco-2d";
import { BodyType, SnakeBodyType } from "../types";
import { IsSectionAvailable, getRandomSection } from "./utils";
import { Sprite } from "palco-2d/src/core/Sprite";

describe('Utils', () => {

  it("get random section", () => {

    let result = { x: 0, y: 0 };

    jest.spyOn(global.Math, 'random').mockReturnValue(0);
    result = getRandomSection({ x: 0, y: 0 }, 4);
    expect(result).toEqual({ x: 1, y: 1 });

    jest.spyOn(global.Math, 'random').mockReturnValue(1);
    result = getRandomSection({ x: 0, y: 0 }, 4);
    expect(result).toEqual({ x: 3, y: 3 });

    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    result = getRandomSection({ x: 0, y: 0 }, 4);
    expect(result).toEqual({ x: 2, y: 2 });

    jest.spyOn(global.Math, 'random').mockReturnValue(0);
    result = getRandomSection({ x: 3, y: 3 }, 4);
    expect(result).toEqual({ x: 2, y: 2 });

    jest.spyOn(global.Math, 'random').mockReturnValue(1);
    result = getRandomSection({ x: 3, y: 3 }, 4);
    expect(result).toEqual({ x: 0, y: 0 });


    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    result = getRandomSection({ x: 3, y: 3 }, 4);
    expect(result).toEqual({ x: 1, y: 1 });
  });

  describe("is section available", () => {
    it("Should return true since the snake is not on every spot of the section", () => {
      const sprite = new Palco2D.BaseEntity({
        position: { x: 0, y: 0 },
        size: { x: 0, y: 0 },
        rotation: 0,
      }) as Sprite;

      const snakeBody: SnakeBodyType[] = [
        //section 0,0
        { position: { x: 0, y: 0 }, direction: { x: 0, y: 0 }, key: BodyType.head, sprite },
        { position: { x: 0, y: 1 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 0, y: 2 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 1, y: 2 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 1, y: 1 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 1, y: 0 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 2, y: 0 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 2, y: 1 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 2, y: 2 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        //section 1,0
        { position: { x: 3, y: 0 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 3, y: 1 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 3, y: 2 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 4, y: 2 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 4, y: 1 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 4, y: 0 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 5, y: 0 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
      ];

      let result = IsSectionAvailable(snakeBody, { x: 0, y: 0 }, 9, 9, 3);
      expect(result).toEqual([]);

      result = IsSectionAvailable(snakeBody, { x: 1, y: 0 }, 9, 9, 3);
      expect(result).toEqual([
        { x: 5, y: 1 },
        { x: 5, y: 2 },
      ]);
    });
  });

})
