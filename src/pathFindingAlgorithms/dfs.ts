import {initPath} from "../graph/main.js";
import {initPrevPath} from "../graph/main.js";

//BFS Algorithm
export default function getShortestPathDFS(adj: number[][], source: number, destination: number){
    let v: number = adj.length;
    let visited: boolean[] = new Array(v);
    visited[source] = true;

    if (source == destination){
        for (let i = 0; i < v; i++){
            if (visited[i]){
                initPath(i);
            }
        }
        return;
    }

    for (let i = 0; i < adj[source].length; i++){
        let vertex = adj[source][i];
        if (!visited[vertex]){
            initPrevPath(vertex);
            getShortestPathDFS(adj, vertex, destination);
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