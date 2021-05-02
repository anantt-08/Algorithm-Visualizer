import { PriortyQueue } from "./priortyQueue";
import {
  gridIndexToArrayIndex,
  neiboursUnvisitedNode,
} from "./algorithmsHelper";

function heuristic(nodeOne, nodeTwo) {
  let manhattanDistance =
    Math.abs(nodeOne[0] - nodeTwo[0]) + Math.abs(nodeOne[1] - nodeTwo[1]);
  return manhattanDistance;
}

export function GreedyBFS(grid, startNode, endNode) {
  const TOTAL_NODE = grid.length * grid[0].length;

  const openSet = new PriortyQueue();
  const forPathReconstruntion = new Array(TOTAL_NODE);
  const visitedNodesInOrder = [];

  const hScore = new Array(TOTAL_NODE).fill(Infinity);
  hScore[
    gridIndexToArrayIndex(grid[0].length, startNode.row, startNode.col)
  ] = heuristic([startNode.row, startNode.col], [endNode.row, endNode.col]);

  openSet.enqueue(
    [startNode.row, startNode.col],
    hScore[gridIndexToArrayIndex(grid[0].length, startNode.row, startNode.col)]
  );

  while (openSet.length) {
    const { val } = openSet.dequeue();
    if (grid[val[0]][val[1]].isVisited) {
      continue;
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
      const new_hScore = heuristic(neb, [endNode.row, endNode.col]) + weight;
      if (
        new_hScore <
        hScore[gridIndexToArrayIndex(grid[0].length, neb[0], neb[1])]
      ) {
        forPathReconstruntion[
          gridIndexToArrayIndex(grid[0].length, neb[0], neb[1])
        ] = grid[current[0]][current[1]];
        hScore[gridIndexToArrayIndex(grid[0].length, neb[0], neb[1])] = new_hScore
        if (!grid[neb[0]][neb[1]].isVisited) {
          openSet.enqueue(neb, new_hScore);
        }
      }
    }
  }
  return [forPathReconstruntion, visitedNodesInOrder];
}

export function getNodeInShortestPathOrderGreedyBFS(
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
    console.log("GreedyBFS Path Length: ", pathLength);
    return path;
  } else {
    return [];
  }
}
