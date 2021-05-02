import { digonalPath } from "../components/Navbars/Navbars";

const [row_queue, col_queue] = [[], []];

export function bfs(grid, startNode) {
  const forPathReconstruction = new Array(grid.length * grid[0].length);
  const visitedNodesInOrder = [];
  row_queue.push(startNode.row);
  col_queue.push(startNode.col);
  startNode.isVisited = true;
  while (row_queue.length) {
    let at_row = row_queue.shift();
    let at_col = col_queue.shift();
    if (grid[at_row][at_col].isFinish) {
      break;
    }
    updateUnvisitedNeibours(
      grid,
      forPathReconstruction,
      visitedNodesInOrder,
      at_row,
      at_col
      );
    }
    return [visitedNodesInOrder, forPathReconstruction];
  }
  
  function updateUnvisitedNeibours(
    grid,
    forPathReconstruction,
    visitedNodesInOrder,
    at_row,
    at_col
    ) {
      let direction_row;
      let direction_col;
      if (digonalPath) {
        direction_row = [-1, 1, 0, 0, -1, 1, -1, 1];
        direction_col = [0, 0, 1, -1, -1, -1, 1, 1];
      } else {
        direction_row = [-1, 1, 0, 0];
        direction_col = [0, 0, 1, -1];
      }
      for (let i = 0; i < direction_col.length; i++) {
        let neibours_row = at_row + direction_row[i];
        let neibours_col = at_col + direction_col[i];
        if (
          neibours_col < 0 ||
          neibours_row < 0 ||
          neibours_row >= grid.length ||
          neibours_col >= grid[0].length
        ) {
          continue;
        }
        if (grid[neibours_row][neibours_col].isWall) {
          continue;
        }
        if (!grid[neibours_row][neibours_col].isVisited) {
          row_queue.push(neibours_row);
          col_queue.push(neibours_col);
          grid[neibours_row][neibours_col].isVisited = true;
          forPathReconstruction[grid[0].length * neibours_row + neibours_col] =
            grid[at_row][at_col];
          // visitedNodesInOrder.push(grid[at_row][at_col]);
        }
        visitedNodesInOrder.push(grid[at_row][at_col]);
      }
}

export function getNodesInShortestPathOrderBFS(
  grid,
  forPathReconstruction,
  startNode,
  endNode
) {
  const path = [];
	for (
    let i = endNode;
    i != null;
    i = forPathReconstruction[grid[0].length * i.row + i.col]
	) {
    path.push(i);
  }
	path.reverse();
  if (path[0] === startNode) {
    console.log("BFS(Unweighted) Path Length: ", path.length)
    return path;
  } else {
    return [];
  }
}


