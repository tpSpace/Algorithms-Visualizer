function addEdge(adj, u, v){
    adj[u].push(v);
    adj[v].push(u);
}
function printPath(source, destination, v, visited){
    visited = new Array(v);
    visited[source] = true;

    if (source == destination){
        console.log('The path is: ');
        for (let i = 0; i < v; i++){
            if (visited[i] == true){
                console.log(i);
            }
        }
        return;
    }

    for (let i = 0; i < adj[source].length; i++){
        let vertex = adj[source][i];
        if (visited[vertex] == false){
            printPath(vertex, destination, v, visited);
        }
    }
}
let V = 8;
let adj = new Array(V).fill(0);

for (let i = 0; i < V; i++){
    adj[i] = new Array();
}

addEdge(adj, 0, 1);
addEdge(adj, 0, 3);
addEdge(adj, 1, 2);
addEdge(adj, 3, 4);
addEdge(adj, 3, 7);
addEdge(adj, 4, 5);
addEdge(adj, 4, 6);
addEdge(adj, 4, 7);
addEdge(adj, 5, 6);
addEdge(adj, 6, 7);
let source = 0;
let destination = 7;
let visited = [];
printPath(source, destination, V, visited);