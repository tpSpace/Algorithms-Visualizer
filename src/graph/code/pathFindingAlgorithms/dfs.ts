import {initPath} from "../main.js";
import {initPrevPath} from "../main.js";

export function drawPath(stack: number[]) {
    for(let i in stack) {
        initPath(stack[i]);
    }
}

export function DFS(visited: boolean[],
                    adjList: number[][],
                    source: number,
                    destination: number,
                    stack: number[]) {
    visited[source] = true;
    stack.push(source);

    if (source == destination) {
        drawPath(stack);
        return;
    }

    for (let i in adjList[source]) {
        if (!visited[adjList[source][i]]) {
            DFS(visited, adjList, adjList[source][i], destination, stack);
        }
    }
    stack.pop();
}

export function getPathDFS(adjList: number[][], source: number, destination: number) {
    let n = adjList.length;
    let visited: boolean[] = new Array(n + 1);
    let stack: number[] = [];
  
    for (let i = 0; i < n + 1; i++) {
      visited[i] = false;
    }
    
    DFS(visited, adjList, source, destination, stack);
    
    if (stack.length === 0) {
      alert("No path found!");
    }
  }
  
