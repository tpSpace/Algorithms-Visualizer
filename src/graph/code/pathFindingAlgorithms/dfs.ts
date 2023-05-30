import {initPath,delay} from "../main.js";
import {initPrevPath} from "../main.js";
import createText from "../popup.js";
import {delayRender} from "./utility.js";

export async function drawPath(stack: number[]) {
    for(let i in stack) {
        initPath(stack[i]);
        await delayRender(delay);
    }
}

export async function DFS(visited: boolean[],
                    adjList: number[][],
                    source: number,
                    destination: number,
                    stack: number[]) {
    visited[source] = true;
    stack.push(source);

    if (source == destination) {
        await drawPath(stack);
        return;
    }

    for (let i in adjList[source]) {
        if (!visited[adjList[source][i]]) {
            await DFS(visited, adjList, adjList[source][i], destination, stack);
        }
    }
    stack.pop();
}

export async function getPathDFS(adjList: number[][], source: number, destination: number) {
    let n = adjList.length;
    let visited: boolean[] = new Array(n + 1);
    let stack: number[] = [];
  
    for (let i = 0; i < n + 1; i++) {
      visited[i] = false;
    }
    
    await DFS(visited, adjList, source, destination, stack);
    
    if (stack.length === 0) {
      createText("No path found!","red");
    }
}
  
