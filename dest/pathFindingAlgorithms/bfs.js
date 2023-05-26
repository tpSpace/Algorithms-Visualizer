"use strict";
//BFS algorithm
function bfs(adj, src, dest, v, prev, dist) {
    let queue = [];
    let visited = new Array(v);
    for (let i = 0; i < v; i++) {
        visited[i] = false;
        dist[i] = Number.MAX_VALUE;
        prev[i] = -1;
    }
    visited[src] = true;
    dist[src] = 0;
    queue.push(src);
    while (queue.length > 0) {
        let u = queue[0];
        queue.shift();
        for (let i = 0; i < adj[u].length; i++) {
            if (visited[adj[u][i]] == false) {
                visited[adj[u][i]] = true;
                dist[adj[u][i]] = dist[u] + 1;
                prev[adj[u][i]] = u;
                queue.push(adj[u][i]);
                if (adj[u][i] == dest) {
                    return true;
                }
            }
        }
    }
    return false;
}
//Helper function to backtrack the path and print the shortest path
function printShortestDistance(adj, src, dest, v) {
    let prev = new Array(v).fill(0);
    let dist = new Array(v).fill(0);
    if (bfs(adj, src, dest, v, prev, dist) == false) {
        console.log('Source and destination vertex is not connected!');
    }
    let path = new Array();
    let crawl = dest;
    path.push(crawl);
    while (prev[crawl] != -1) {
        path.push(prev[crawl]);
        crawl = prev[crawl];
    }
    console.log("Shortest path length is : ", dist[dest]);
    console.log("Path is: ");
    for (let i = path.length - 1; i >= 0; i--)
        console.log(path[i]);
}
// //Driver code
// let V: number = 0;
// let adj = new Array(V);
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
// let source: number = 0;
// let destination: number = 7;
//
// printShortestDistance(adj, source, destination, V);