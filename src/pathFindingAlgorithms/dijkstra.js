let V = 5;

function minDistance(dist, sptSet) {
    let min = Number.MAX_VALUE;
    let min_index = -1;

    for (let v = 0; v < V; v++) {
        if (sptSet[v] == false && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

function printSolution(dist) {
    console.log("Vertex \t\t Distance from Source");
    for (let i = 0; i < V; i++) {
        console.log(i + " \t\t " + dist[i]);
    }
}
function printShortestPath(prev, src, des){
    let path = new Set;
    let crawl = des;

    path.add(crawl);
    while(prev[crawl] != src){
        path.add(prev[crawl]);
        crawl = prev[crawl];
    }
    path.add(src);

    path = Array.from(path).reverse();
    console.log("Shortest path from " + src + " to " + des + " is: ")
    console.log(path);
}

function dijkstra(graph, src){
    let dist = new Array(V);
    let sptSet = new Array(V);
    let prev = new Array(V);

    for (let i = 0; i < V; i++){
        dist[i] = Number.MAX_VALUE;
        sptSet[i] = false;
    }

    dist[src] = 0;

    for (let count = 0; count < V; count++){
        let u = minDistance(dist, sptSet);
        sptSet[u] = true;
        for (let v = 0; v < V; v++){
            if (!sptSet[v] && graph[u][v] != 0 &&
                dist[u] != Number.MAX_VALUE &&
                dist[u] + graph[u][v] < dist[v]){
                dist[v] = dist[u] + graph[u][v];
                prev[v] = u;
            }
        }
    }
    printSolution(dist);
    printShortestPath(prev, src, 4);
}
let graph = [
    [0, 6, 0, 1, 0],
    [6, 0, 5, 2, 2],
    [0, 5, 0, 0, 5],
    [1, 2, 0, 0, 1],
    [0, 2, 5, 1, 0]
]
dijkstra(graph, 0);
