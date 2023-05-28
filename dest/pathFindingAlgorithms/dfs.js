import { initPath } from "../graph/main.js";
export function drawPath(stack) {
    for (let i = 1; i < stack.length - 1; i++) {
        initPath(stack[i]);
        console.log(stack[i]);
    }
}
// An utility function to do
// DFS of graph recursively
// from a given vertex x.
export function DFS(visited, adjList, source, destination, stack) {
    visited[source] = true;
    stack.push(source);
    if (source == destination) {
        drawPath(stack);
        return;
    }
    for (let i = 0; i < adjList[source].length; i++) {
        if (!visited[adjList[source][i]]) {
            DFS(visited, adjList, adjList[source][i], destination, stack);
        }
    }
    stack.pop();
}
export function DFSCall(adjList, source, destination) {
    let n = adjList.length;
    let visited = new Array(n + 1);
    let stack = [];
    for (let i = 0; i < (n + 1); i++) {
        visited[i] = false;
    }
    DFS(visited, adjList, source, destination, stack);
}
