//BFS Algorithm
function printPath(source: number,
                   destination: number,
                   v: number,
                   visited: boolean[],
                   adj: number[][]){
    visited = new Array(v);
    visited[source] = true;

    if (source == destination){
        console.log('The path is: ');
        for (let i = 0; i < v; i++){
            if (visited[i]){
                console.log(i);
            }
        }
        return;
    }

    for (let i = 0; i < adj[source].length; i++){
        let vertex = adj[source][i];
        if (!visited[vertex]){
            printPath(vertex, destination, v, visited, adj);
        }
    }
}

// // Driver code
// let V: number = 0;
// let adj:number[][] = [];
//
// addEdge(adj, 0, 1, V);
// addEdge(adj, 0, 3, V);
// addEdge(adj, 1, 2, V);
// addEdge(adj, 3, 4, V);
// addEdge(adj, 3, 7, V);
// addEdge(adj, 4, 5, V);
// addEdge(adj, 4, 6, V);
// addEdge(adj, 4, 7, V);
// addEdge(adj, 5, 6, V);
// addEdge(adj, 6, 7, V);
//
// let source: number = 0;
// let destination: number = 7;
// let visited: boolean[] = [];
// printPath(source, destination, V, visited);