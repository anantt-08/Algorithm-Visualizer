import { PriortyQueue } from "./priortyQueue";
import {
  gridIndexToArrayIndex,
  neiboursUnvisitedNode,
} from "./algorithmsHelper";


export function dijkstra(grid, startNode) {
  const forPathReconstruction = new Array(grid.length * grid[0].length);
  const visitedNodesInOrder = [];

  const dist = new Array(grid.length * grid[0].length).fill(Infinity);
  dist[gridIndexToArrayIndex(grid[0].length, startNode.row, startNode.col)] = 0;
  const queue = new PriortyQueue();
  queue.enqueue([startNode.row, startNode.col], 0);
  while (queue.length) {
    let { val, priorty } = queue.dequeue();
    let index = gridIndexToArrayIndex(grid[0].length, val[0], val[1]);
    grid[val[0]][val[1]].isVisited = true;
    if (grid[val[0]][val[1]].isFinish) {
      return [dist, forPathReconstruction, visitedNodesInOrder];
    }
    if (dist[index] < priorty) {
      continue;
    }

    let neibours = neiboursUnvisitedNode(grid, val, visitedNodesInOrder);
    for (let i = 0; i < neibours.length; i++) {
      let [idx, currDist] = neibours[i];
      let at = gridIndexToArrayIndex(grid[0].length, idx[0], idx[1]);
      if (grid[idx[0]][idx[1]].isVisited) {
        continue;
      }
      let newDist = dist[index] + currDist;
      if (newDist < dist[at]) {
        forPathReconstruction[at] = grid[val[0]][val[1]];
        visitedNodesInOrder.push(grid[val[0]][val[1]]);
        dist[at] = newDist;
        queue.enqueue(idx, newDist);
      }
    }
  }
  return [dist, forPathReconstruction, visitedNodesInOrder];
}


export function getNodesInShortestPathOrderDijkstra(
  grid,
  dist,
  forPathReconstruction,
  startNode,
  endNode
) {
  const at = gridIndexToArrayIndex(grid[0].length, endNode[0], endNode[1]);
  if (dist[at] === Infinity) {
    return [];
  }
  const path = [];
  for (
    let i = endNode;
    i != null;
    i =
   
        forPathReconstruction[gridIndexToArrayIndex(grid[0].length, i.row, i.col)]
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
    console.log("Dijkstra Path Length: ", pathLength)
    return path;
  } else {
    return [];
  }
}
