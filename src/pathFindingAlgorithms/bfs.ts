//BFS algorithm
import {initPath} from "../graph/main.js";
import {initPrevPath} from "../graph/main.js";

//Helper function that uses BFS to transverse the graph
export function bfs(adj: number[][],
             src: number,
             dest:  number,
             v: number,
             prev: number[],
             dist: number[]){
    let queue: number[] = [];
    let visited = new Array(v);

    for (let i = 0; i < v; i++){
        visited[i] = false;
        dist[i] = Number.MAX_VALUE;
        prev[i] = -1;
    }

    visited[src] = true;
    dist[src] = 0;
    queue.push(src);

    while(queue.length > 0){
        let u = queue[0];
        queue.shift();
        for (let i in adj[u]){
            if (visited[adj[u][i]] == false){
                visited[adj[u][i]] = true;
                dist[adj[u][i]] = dist[u] + 1;
                prev[adj[u][i]] = u;
                queue.push(adj[u][i]);
                initPrevPath(adj[u][i]);
                if (adj[u][i] == dest){
                    return true;
                }
            }
        }
    }
    return false;
}
//Helper function to backtrack the path and print the shortest path
export default function getShortestDistanceBFS(adj: number[][], src: number, dest: number){
    let v = adj.length;
    let prev = new Array(v).fill(0);
    let dist = new Array(v).fill(0);

    if (!bfs(adj, src, dest, v, prev, dist)){
        alert('Source and destination vertex is not connected!');
    }

    let path = [];
    let crawl = dest;

    path.push(crawl);
    while (prev[crawl] != -1) {
        path.push(prev[crawl]);
        crawl = prev[crawl];
    }
    for (let i = path.length - 1; i >= 0; i--)
        initPath(path[i]);
}
