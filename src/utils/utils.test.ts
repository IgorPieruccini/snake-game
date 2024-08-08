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

    // beforeAll(() => {
    //   const windowSpy = jest.spyOn(window, "window", "get");
    //   // @ts-expect-error - Don't need to mock all properties only the one that is being used
    //   windowSpy.mockImplementation(() => ({ innerWidth: 800, innerHeight: 600, devicePixelRatio: 1 }));
    // });
    //
    // afterAll(() => {
    //   jest.restoreAllMocks();
    // });

    it("Should return true since the snake is not on every spot of the section", () => {
      const sprite = new Palco2D.BaseEntity({
        position: { x: 0, y: 0 },
        size: { x: 0, y: 0 },
        rotation: 0,
      }) as Sprite;

      const snakeBody: SnakeBodyType[] = [
        { position: { x: 0, y: 0 }, direction: { x: 0, y: 0 }, key: BodyType.head, sprite },
        { position: { x: 0, y: 1 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 0, y: 2 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 1, y: 2 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 1, y: 1 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 1, y: 0 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 2, y: 0 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 2, y: 1 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
        { position: { x: 2, y: 2 }, direction: { x: 0, y: 0 }, key: BodyType.body, sprite },
      ];

      const result = IsSectionAvailable(snakeBody, { x: 0, y: 0 }, 9, 9, 3);
      expect(result).toBeTruthy();

    });


  });

})
