import {initPath} from "../graph/main.js";
import {initPrevPath} from "../graph/main.js";

export function drawPath(stack: number[])
{
    for(let i = 1; i < stack.length - 1; i++)
    {
        initPath(stack[i]);
        console.log(stack[i]);
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

    for (let i = 0; i < adjList[source].length; i++) {
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

    for(let i = 0; i < (n + 1); i++)
    {
        visited[i] = false;
    }
    DFS(visited, adjList, source, destination, stack);
}
