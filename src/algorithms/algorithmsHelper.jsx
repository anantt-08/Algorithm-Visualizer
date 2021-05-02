import {digonalPath} from "../components/Navbars/Navbars";

export function gridIndexToArrayIndex(totalCol, currentRow, currentCol) {
    return totalCol * currentRow + currentCol;
}

export function neiboursUnvisitedNode(grid, val, visitedNodesInOrder) {
  let direction;
  if (digonalPath) {
    direction = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ];
  } else {
      direction = [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1],
      ];
  
  }
    const neibours = [];
    for (let i = 0; i < direction.length; i++) {
      let at = [val[0] + direction[i][0], val[1] + direction[i][1]];
      let weight;
  
      if (
        at[0] < 0 ||
        at[0] >= grid.length ||
        at[1] >= grid[0].length ||
        at[1] < 0
      ) {
        continue;
      } else if (grid[at[0]][at[1]].isWall) {
        continue;
      } else if (grid[at[0]][at[1]].isWeighted) {
        visitedNodesInOrder.push(grid[val[0]][val[1]]);
          weight = 15;
      } else {
        visitedNodesInOrder.push(grid[val[0]][val[1]]);
        weight = 1;
      }
      neibours.push([at, weight]);
    }
    return neibours;
  }

