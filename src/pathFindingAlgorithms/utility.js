function addEdge(adj, u, v){
    adj[u].push(v);
    adj[v].push(u);
}

function fromVertexToIndex (row, column, index){
    let map = [];
    

}

function fromGridToList (graph, adj){
    //# is wall, . is empty, A is start, B is destination
    //adjacency list
    let v = 0;

    let source = 0;
    let destination = 0;
    //every . and A or B are considered a vertex
    //count number of vertices
    let vertexIndex = [];
    for (let i = 0; i < graph.length; i++){
        for (let j = 0; j < graph[i].length; j++){
            if (graph[i][j] !== '#'){
                if (graph[i][j] === 'A'){
                    source = v;
                }
                if (graph[i][j] === 'B'){
                    destination = v;
                }
                vertexIndex.push([i, j]);
                v++;
            }
        }
    }
    console.log(v);
    console.log(source);
    console.log(destination);
    console.log(vertexIndex);

    //Check for each vertex if there is a path to another vertex
    //if there is, add an edge between them
    for (let i = 0; i < vertexIndex.length; i++){
        for (let j = 0; j < vertexIndex.length; j++){
            if (graph[i][j] !== '#'){
                if (graph[i][j+1] !== '#'){
                    addEdge(adj, i, x);
                }
                if (graph[i][j-1] !== '#'){
                    addEdge(adj, i, j-1);
                }
                if (graph[i+1][j] !== '#'){
                    addEdge(adj, i+1, j);
                }
                if (graph[i-1][j] !== '#'){
                    addEdge(adj, i-1, j);
                }
            }
        }
    }
    console.log(adj);
}
let graph = [
    ['#', '#', '#', '#', '#'],
    ['#', 'A', '.', '.', '#'],
    ['#', '#', '#', '.', '#'],
    ['#', '.', '#', '.', '#'],
    ['#', '.', '.', '.', '#'],
    ['#', '#', 'B', '#', '#']
];
let adj = new Array(10).fill(0);
for (let i = 0; i < 10; i++){
    adj[i] = new Array();
}

fromGridToList(graph, adj);