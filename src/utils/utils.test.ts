import { Palco2D } from "palco-2d";
import { BodyType, SnakeBodyType } from "../types";
import { getAvailablePositionsInSector, getRandomSection } from "./utils";
import { Sprite } from "palco-2d/src/core/Sprite";
import { Vec2 } from "palco-2d/types";

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

  it("Should return the positions available in a section", () => {
    const snakeBody: Vec2[] = [
      //section 0,0
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      //section 1,0
      { x: 3, y: 0 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 4, y: 1 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
    ];

    let result = getAvailablePositionsInSector(snakeBody, { x: 0, y: 0 }, 9, 9, 3);
    expect(result).toEqual([]);

    result = getAvailablePositionsInSector(snakeBody, { x: 1, y: 0 }, 9, 9, 3);
    expect(result).toEqual([
      { x: 5, y: 1 },
      { x: 5, y: 2 },
    ]);
  });

})
