type Node = {
    row: number;
    col: number;
    f: number;
    g: number;
    h: number;
    previous: Node | null;
  };
  
  function heuristic(node: Node, endNode: Node): number {
    // Manhattan distance heuristic
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
  }
  
  function getShortestPathAStar(maze: number[][]): number[] | string {
    const rows = maze.length;
    const cols = maze[0].length;
  
    const adjList: number[][] = [];
    for (let i = 0; i < rows * cols; i++) {
      adjList[i] = [];
    }
  
    const startRow = 0;
    const startCol = 0;
    const endRow = rows - 1;
    const endCol = cols - 1;
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (maze[row][col] !== 1) {
          const nodeIndex = row * cols + col;
          if (row > 0 && maze[row - 1][col] !== 1) {
            adjList[nodeIndex].push((row - 1) * cols + col);
          }
          if (row < rows - 1 && maze[row + 1][col] !== 1) {
            adjList[nodeIndex].push((row + 1) * cols + col);
          }
          if (col > 0 && maze[row][col - 1] !== 1) {
            adjList[nodeIndex].push(row * cols + col - 1);
          }
          if (col < cols - 1 && maze[row][col + 1] !== 1) {
            adjList[nodeIndex].push(row * cols + col + 1);
          }
        }
      }
    }
  
    const openSet: Node[] = [];
    const closedSet: Node[] = [];
  
    const nodes: Node[][] = [];
  
    for (let row = 0; row < rows; row++) {
      nodes[row] = [];
      for (let col = 0; col < cols; col++) {
        nodes[row][col] = {
          row,
          col,
          f: 0,
          g: Infinity,
          h: 0,
          previous: null,
        };
      }
    }
  
    const start: Node = nodes[startRow][startCol];
    const end: Node = nodes[endRow][endCol];
  
    start.g = 0;
    start.h = heuristic(start, end);
    start.f = start.h;
  
    openSet.push(start);
  
    while (openSet.length > 0) {
      let currentIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[currentIndex].f) {
          currentIndex = i;
        }
      }
  
      const current: Node = openSet[currentIndex];
  
      if (current === end) {
        const path: number[] = [];
        let temp: Node | null = current;
        while (temp) {
          path.push(temp.row * cols + temp.col);
          temp = temp.previous;
        }
        return path.reverse();
      }
  
      openSet.splice(currentIndex, 1);
      closedSet.push(current);
  
      const neighbors = adjList[current.row * cols + current.col];
      for (const neighborIndex of neighbors) {
        const neighborRow = Math.floor(neighborIndex / cols);
        const neighborCol = neighborIndex % cols;
        const neighbor: Node = nodes[neighborRow][neighborCol];
  
        if (closedSet.includes(neighbor)) {
          continue;
        }
  
        const tentativeG = current.g + 1;
        let newPath = false;
  
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
          newPath = true;
        } else if (tentativeG < neighbor.g) {
          newPath = true;
        }
  
        if (newPath) {
          neighbor.g = tentativeG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  
    return 'Source and destination nodes are not connected!';
  }
  
  export { getShortestPathAStar };
  