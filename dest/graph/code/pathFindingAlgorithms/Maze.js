export function generateMazeUsingKruskal(maze) {
    const rows = maze.length;
    const cols = maze[0].length;
    // Create a list of all walls in the maze
    const walls = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Add vertical walls
            if (j < cols - 1) {
                walls.push([i, j, i, j + 1]);
            }
            // Add horizontal walls
            if (i < rows - 1) {
                walls.push([i, j, i + 1, j]);
            }
        }
    }
    // Create a disjoint set to track the connected components
    const parent = [];
    for (let i = 0; i < rows * cols; i++) {
        parent[i] = i;
    }
    // Helper function to find the parent of a set
    function find(parent, i) {
        if (parent[i] !== i) {
            parent[i] = find(parent, parent[i]);
        }
        return parent[i];
    }
    // Helper function to join two sets
    function union(parent, i, j) {
        const rootA = find(parent, i);
        const rootB = find(parent, j);
        parent[rootA] = rootB;
    }
    // Randomize the order of walls
    walls.sort(() => Math.random() - 0.5);
    // Process each wall and remove it if it connects two different sets
    for (const wall of walls) {
        const [x1, y1, x2, y2] = wall;
        const indexA = x1 * cols + y1;
        const indexB = x2 * cols + y2;
        const rootA = find(parent, indexA);
        const rootB = find(parent, indexB);
        if (rootA !== rootB) {
            union(parent, rootA, rootB);
            maze[x1][y1] = 0;
            maze[x2][y2] = 0;
        }
    }
    // Set the beginning node (start) as 1 and the end node as 3
    maze[0][0] = 1;
    maze[rows - 1][cols - 1] = 3;
    return maze;
}
