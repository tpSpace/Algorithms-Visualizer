var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//BFS algorithm
import { initPath, delay } from "../main.js";
import { initPrevPath } from "../main.js";
import { delayRender } from "./utility.js";
import createText from "../popup.js";
//Helper function that uses BFS to transverse the graph
export function bfs(adj, src, dest, v, prev, dist) {
    return __awaiter(this, void 0, void 0, function* () {
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
            for (let i in adj[u]) {
                if (visited[adj[u][i]] == false) {
                    visited[adj[u][i]] = true;
                    dist[adj[u][i]] = dist[u] + 1;
                    prev[adj[u][i]] = u;
                    queue.push(adj[u][i]);
                    initPrevPath(adj[u][i]);
                    yield delayRender(delay);
                    if (adj[u][i] == dest) {
                        return true;
                    }
                }
            }
        }
        return false;
    });
}
//Helper function to backtrack the path and print the shortest path
export function getShortestDistanceBFS(adj, src, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        let v = adj.length;
        let prev = new Array(v).fill(0);
        let dist = new Array(v).fill(0);
        if (!(yield bfs(adj, src, dest, v, prev, dist))) {
            createText('Source and destination vertex is not connected!', "red");
        }
        let path = [];
        let crawl = dest;
        path.push(crawl);
        while (prev[crawl] != -1) {
            path.push(prev[crawl]);
            crawl = prev[crawl];
        }
        for (let i = path.length - 1; i >= 0; i--) {
            yield delayRender(4 * delay);
            initPath(path[i]);
        }
    });
}
