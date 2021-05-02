import { PriortyQueue } from "./priortyQueue";
import {
  gridIndexToArrayIndex,
  neiboursUnvisitedNode,
} from "./algorithmsHelper";

function heuristic(nodeOne, nodeTwo) {
  let manhattanDistance =
    Math.abs(nodeOne[0] - nodeTwo[0]) + Math.abs(nodeOne[1] - nodeTwo[1]);
  // let diagonalDistance = Math.max(Math.abs(nodeOne[0] - nodeTwo[0]), Math.abs(nodeOne[1] - nodeTwo[1]))
  // let euclideanDistance = Math.sqrt(Math.pow((nodeOne[0] - nodeTwo[0]), 2) + Math.pow((nodeOne[1] - nodeTwo[1]), 2))
  return manhattanDistance;
}

export function A_Star(grid, startNode, endNode) {
  const TOTAL_NODE = grid.length * grid[0].length;

  const openSet = new PriortyQueue(); // queue
  const forPathReconstruntion = new Array(TOTAL_NODE);
  const visitedNodesInOrder = [];

  const gScore = new Array(TOTAL_NODE).fill(Infinity);
  gScore[
    gridIndexToArrayIndex(grid[0].length, startNode.row, startNode.col)
  ] = 0;

  const fScore = new Array(TOTAL_NODE).fill(Infinity);
  fScore[gridIndexToArrayIndex(grid[0].length, startNode.row, startNode.col)] =
    gScore[
      gridIndexToArrayIndex(grid[0].length, startNode.row, startNode.col)
    ] + heuristic([startNode.row, startNode.col], [endNode.row, endNode.col]);

  openSet.enqueue(
    [startNode.row, startNode.col],
    fScore[gridIndexToArrayIndex(grid[0].length, startNode.row, startNode.col)]
  );

  while (openSet.length) {
    const { val } = openSet.dequeue();
    if (grid[val[0]][val[1]].isVisited) {
      continue
    }
    const current = val;
    grid[current[0]][current[1]].isVisited = true;
    
    if (current[0] === endNode.row && current[1] === endNode.col) {
      return [forPathReconstruntion, visitedNodesInOrder];
    }
    const neibours = neiboursUnvisitedNode(grid, current, visitedNodesInOrder);
    for (let i = 0; i < neibours.length; i++) {
      const [neb, weight] = neibours[i];
      if (grid[neb[0]][neb[1]].isVisited) {
        continue;
      }
      const new_gScore =
        gScore[gridIndexToArrayIndex(grid[0].length, current[0], current[1])] +
        weight;
      if (
        new_gScore <
        gScore[gridIndexToArrayIndex(grid[0].length, neb[0], neb[1])]
      ) {
        // visitedNodesInOrder.push(grid[current[0]][current[1]])
        forPathReconstruntion[
          gridIndexToArrayIndex(grid[0].length, neb[0], neb[1])
        ] = grid[current[0]][current[1]];
        gScore[
          gridIndexToArrayIndex(grid[0].length, neb[0], neb[1])
        ] = new_gScore;
        fScore[gridIndexToArrayIndex(grid[0].length, neb[0], neb[1])] =
          gScore[gridIndexToArrayIndex(grid[0].length, neb[0], neb[1])] +
          heuristic(neb, [endNode.row, endNode.col]);
        
        if (!grid[neb[0]][neb[1]].isVisited) {
          openSet.enqueue(
            neb,
            fScore[gridIndexToArrayIndex(grid[0].length, neb[0], neb[1])]
          );
        }

      }
    }
  }
  return [forPathReconstruntion, visitedNodesInOrder];
}

export function getNodesInShortestPathOrderAStar(
  grid,
  forPathReconstruntion,
  startNode,
  endNode
) {
  const path = [];
  for (
    let i = endNode;
    i != null;
    i =
      forPathReconstruntion[gridIndexToArrayIndex(grid[0].length, i.row, i.col)]
  ) {
    path.push(i);
  }
  path.reverse();
  let pathLength = 0;
  for (let i = 0; i < path.length; i++) {
    if (grid[path[i].row][path[i].col].isWeighted) {
      pathLength = pathLength + 15;
    } else {
      pathLength = pathLength + 1;
    }
  }
  if (path[0] === startNode) {
    console.log("A_Star Path Length: ", pathLength);
    return path;
  } else {
    return [];
  }
}
