import { Vec2 } from "palco-2d/types";

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
