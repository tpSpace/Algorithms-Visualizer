export function addEdge(adj, u, v) {
    adj[u].push(v);
}
//Check if a vertex is in the grid, if it is return its index in the vertexIndex array
//If it is not in the grid, return -1
export function findVertexIndex(vertexIndex, row, col) {
    for (let i = 0; i < vertexIndex.length; i++) {
        if (vertexIndex[i][0] === row && vertexIndex[i][1] === col) {
            return i;
        }
    }
    return -1;
}
//# is wall, . is empty, A is start, B is destination
//every . and A or B are considered a vertex
export default function fromGridToList(graph) {
    //number of vertices
    let v = 0;
    //source and destination vertices
    let source = 0;
    let destination = 0;
    //array to store the index of each vertex
    let vertexIndex = [];
    //adjaency list
    let adj = [];
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[i].length; j++) {
            //If the current element is not a wall, add it to the vertexIndex array
            //and increment the number of vertices
            //If the current element is A, set the source vertex to the current vertex
            //If the current element is B, set the destination vertex to the current vertex
            if (graph[i][j] != 2) {
                if (graph[i][j] == 1) {
                    source = v;
                }
                if (graph[i][j] == 4) {
                    destination = v;
                }
                vertexIndex[v] = [];
                vertexIndex[v].push(i);
                vertexIndex[v].push(j);
                adj[v] = [];
                v++;
            }
        }
    }
    console.log('The total number of vertices is: ', v);
    console.log('The source node is: ', source);
    console.log('The destination node is: ', destination);
    console.log('Vertex Index: ', vertexIndex);
    //Check for each vertex if there is a path to another vertex
    //if there is, add an edge between them
    for (let i = 0; i < vertexIndex.length; i++) {
        let row = vertexIndex[i][0];
        let col = vertexIndex[i][1];
        //check if there is a path to the vertex above
        if (findVertexIndex(vertexIndex, row - 1, col) !== -1) {
            addEdge(adj, i, findVertexIndex(vertexIndex, row - 1, col));
        }
        //check if there is a path to the vertex below
        if (findVertexIndex(vertexIndex, row + 1, col) !== -1) {
            addEdge(adj, i, findVertexIndex(vertexIndex, row + 1, col));
        }
        //check if there is a path to the vertex to the left
        if (findVertexIndex(vertexIndex, row, col - 1) !== -1) {
            addEdge(adj, i, findVertexIndex(vertexIndex, row, col - 1));
        }
        //check if there is a path to the vertex to the right
        if (findVertexIndex(vertexIndex, row, col + 1) !== -1) {
            addEdge(adj, i, findVertexIndex(vertexIndex, row, col + 1));
        }
    }
    return adj;
}
// let graph: string[][] = [
//     ['#', '#', '#', '#', '#'],
//     ['#', 'A', '.', '.', '#'],
//     ['#', '#', '#', '.', '#'],
//     ['#', '.', '#', '.', '#'],
//     ['#', '.', '.', '.', '#'],
//     ['#', '#', 'B', '#', '#']
// ];
// let adj: number[][] = [];
//
// fromGridToList(graph, adj);
