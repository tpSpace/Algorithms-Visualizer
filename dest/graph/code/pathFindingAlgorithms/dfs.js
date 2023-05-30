var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initPath, delay } from "../main.js";
import createText from "../popup.js";
import { delayRender } from "./utility.js";
export function drawPath(stack) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i in stack) {
            initPath(stack[i]);
            yield delayRender(delay);
        }
    });
}
export function DFS(visited, adjList, source, destination, stack) {
    return __awaiter(this, void 0, void 0, function* () {
        visited[source] = true;
        stack.push(source);
        if (source == destination) {
            yield drawPath(stack);
            return;
        }
        for (let i in adjList[source]) {
            if (!visited[adjList[source][i]]) {
                yield DFS(visited, adjList, adjList[source][i], destination, stack);
            }
        }
        stack.pop();
    });
}
export function getPathDFS(adjList, source, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        let n = adjList.length;
        let visited = new Array(n + 1);
        let stack = [];
        for (let i = 0; i < n + 1; i++) {
            visited[i] = false;
        }
        yield DFS(visited, adjList, source, destination, stack);
        if (stack.length === 0) {
            createText("No path found!", "red");
        }
    });
}
