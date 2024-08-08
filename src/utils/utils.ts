import { Vec2 } from "palco-2d/types";
import { SnakeBodyType } from "../types";

export const IsSectionAvailable = (snakeBody: SnakeBodyType[], sections: Vec2, rows: number, cols: number, division: number) => {
  const sectionXSize = rows / division;
  const sectionYSize = cols / division;

  for (let x = 0; x < sectionXSize; x++) {
    for (let y = 0; y < sectionYSize; y++) {
      const positionX = x + (sectionXSize * sections.x);
      const positionY = y + (sectionYSize * sections.y);
      console.log({ positionX, positionY });

      const isFree = snakeBody.find(({ position }) => position.x === positionX && position.y === positionY);
      console.log({ isFree });
      if (isFree) return true;
    }
  }

  return false;
}

export const getRandomSection = (snakeSection: Vec2, division: number) => {
  const direction = {
    x: snakeSection.x < division / 2 ? 1 : -1,
    y: snakeSection.y < division / 2 ? 1 : -1
  }

  const max = division - 1;
  const minX = snakeSection.x + direction.x;
  const minY = snakeSection.y + direction.y;

  const x = Math.random() * ((direction.x > 0 ? max : 0) - minX) + minX;
  const y = Math.random() * ((direction.y > 0 ? max : 0) - minY) + minY;

  return {
    x: Math.round(x),
    y: Math.round(y)
  };
}

export const snakeReadSection = (snakeHeadPosition: Vec2, division: number) => {
  return {
    x: Math.ceil(snakeHeadPosition.x / division),
    y: Math.ceil(snakeHeadPosition.y / division)
  }
}

export const createSections = (rows: number, cols: number) => {
  const limitsRow = rows / 3;
  const limitsCol = cols / 3;

  const sections: Array<Array<Vec2>> = [];

  for (let x = 0; x < rows; x++) {
    const sectionRow = Math.ceil(x / limitsRow);
    if (sections[sectionRow] === undefined) {
      sections[sectionRow] = [];
    }
    for (let y = 0; y < cols; y++) {
      const sectionCol = Math.ceil(y / limitsCol);
      if (sections[sectionRow][sectionCol] === undefined) {
        sections[sectionRow][sectionCol] = { x, y };
      }
    }
  }

  return sections;
}
