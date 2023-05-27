// Project: Algorithms and Data Structures
// Author: nmvkhoi
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ts-check
// constants
import getAdjacencyList from '../pathFindingAlgorithms/utility.js';
import { getEndNode } from "../pathFindingAlgorithms/utility.js";
import { getSourceNode } from "../pathFindingAlgorithms/utility.js";
import { getNodeXCoordinates } from "../pathFindingAlgorithms/utility.js";
import { getNodeYCoordinates } from "../pathFindingAlgorithms/utility.js";
import getShortestDistanceBFS from "../pathFindingAlgorithms/bfs.js";
// import {getPrev} from "../pathFindingAlgorithms/bfs.js";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clear = document.getElementById('clear');
const begin = document.getElementById('begin');
const end = document.getElementById('end');
const wall = document.getElementById('wall');
const start = document.getElementById('start');
const width = canvas.width;
const height = canvas.height;
const cellSize = 20;
const rows = height / cellSize;
const cols = width / cellSize;
let matrix = [];
let isDragging = false;
let isStart = false;
let prevStart = [-1, -1];
let isEnd = false;
let prevEnd = [-1, -1];
// console.log(rows, cols);
let adjList = [];
let startNode;
let endNode = -1;
let path = [];
let prevPath = [];
// Functions
// draw a square with color
function drawSquareWithColor(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(y * cellSize, x * cellSize, cellSize, cellSize);
    // border
    ctx.beginPath();
    ctx.moveTo(y * cellSize, x * cellSize);
    ctx.lineTo((y + 1) * cellSize, x * cellSize);
    // draw 4 edges of the square
    ctx.moveTo((y + 1) * cellSize, x * cellSize);
    ctx.lineTo((y + 1) * cellSize, (x + 1) * cellSize);
    ctx.moveTo((y + 1) * cellSize, (x + 1) * cellSize);
    ctx.lineTo(y * cellSize, (x + 1) * cellSize);
    ctx.moveTo(y * cellSize, (x + 1) * cellSize);
    ctx.lineTo(y * cellSize, x * cellSize);
    ctx.moveTo(y * cellSize, x * cellSize);
    ctx.stroke();
}
// draw a square with animation zoom out
export function drawSquareWithAnimation(x, y, color) {
    return __awaiter(this, void 0, void 0, function* () {
        const initialSize = 1;
        const targetSize = cellSize;
        let currentSize = initialSize;
        let animationStartTime = 0; // milliseconds
        function animate() {
            const now = Date.now();
            const elapsedTime = now - animationStartTime;
            const progress = elapsedTime / 100; // Divide by 1000 to convert milliseconds to seconds
            ctx.clearRect(y * cellSize, x * cellSize, cellSize, cellSize); // Clear the previous frame
            if (progress < 1) {
                currentSize = initialSize + (targetSize - initialSize) * progress;
                ctx.fillStyle = color;
                ctx.fillRect(y * cellSize + (cellSize - currentSize) / 2, x * cellSize + (cellSize - currentSize) / 2, currentSize, currentSize);
                requestAnimationFrame(animate);
            }
            else {
                ctx.fillStyle = color;
                ctx.fillRect(y * cellSize, x * cellSize, cellSize, cellSize);
            }
        }
        animationStartTime = Date.now();
        animate();
    });
}
// create a matrix
function createMatrix([]) {
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = 0;
        }
    }
}
// clear the matrix
function clearMatrix([]) {
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = 0;
        }
    }
}
// print the matrix
function printMatrix([]) {
    for (let i = 0; i < rows; i++) {
        let line = '';
        for (let j = 0; j < cols; j++) {
            line += matrix[i][j] + ' ';
        }
        console.log(line);
    }
}
createMatrix(matrix);
// draw the grid
function drawGrid() {
    for (let i = cellSize; i < height; i += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }
    for (let j = cellSize; j < width; j += cellSize) {
        ctx.beginPath();
        ctx.moveTo(j, 0);
        ctx.lineTo(j, height);
        ctx.stroke();
    }
}
// draw a border
function drawSquare(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    let i = Math.floor(y / cellSize);
    let j = Math.floor(x / cellSize);
    // ctx.fillStyle = '#19A7CE';
    // ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
    matrix[i][j] = 2;
    // printMatrix(matrix);
    drawSquareWithAnimation(i, j, '#1239C6');
}
// clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    clearMatrix(matrix);
    prevStart = [-1, -1];
}
// delete a square
function deleteSquare(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    let i = Math.floor(y / cellSize);
    let j = Math.floor(x / cellSize);
    ctx.clearRect(j * cellSize, i * cellSize, cellSize, cellSize);
    // draw the line again
    ctx.beginPath();
    ctx.moveTo(j * cellSize, i * cellSize);
    ctx.lineTo((j + 1) * cellSize, i * cellSize);
    // draw 4 edges of the square
    ctx.moveTo((j + 1) * cellSize, i * cellSize);
    ctx.lineTo((j + 1) * cellSize, (i + 1) * cellSize);
    ctx.moveTo((j + 1) * cellSize, (i + 1) * cellSize);
    ctx.lineTo(j * cellSize, (i + 1) * cellSize);
    ctx.moveTo(j * cellSize, (i + 1) * cellSize);
    ctx.lineTo(j * cellSize, i * cellSize);
    ctx.moveTo(j * cellSize, i * cellSize);
    ctx.stroke();
    matrix[i][j] = 0;
}
function initPoint(event) {
    let x = Math.floor(event.offsetY / cellSize);
    let y = Math.floor(event.offsetX / cellSize);
    // delete the previous start point
    if (prevStart[0] !== -1 && prevStart[1] !== -1) {
        ctx.clearRect(prevStart[1] * cellSize, prevStart[0] * cellSize, cellSize, cellSize);
        // draw the new start point
        matrix[x][y] = 1;
        ctx.fillStyle = '#43c943';
        ctx.fillRect(y * cellSize, x * cellSize, cellSize, cellSize);
        console.log(prevStart);
        // draw the line again
        ctx.beginPath();
        ctx.moveTo(prevStart[1] * cellSize, prevStart[0] * cellSize);
        ctx.lineTo((prevStart[1] + 1) * cellSize, prevStart[0] * cellSize);
        // draw 4 edges of the square
        ctx.moveTo((prevStart[1] + 1) * cellSize, prevStart[0] * cellSize);
        ctx.lineTo((prevStart[1] + 1) * cellSize, (prevStart[0] + 1) * cellSize);
        ctx.moveTo((prevStart[1] + 1) * cellSize, (prevStart[0] + 1) * cellSize);
        ctx.lineTo(prevStart[1] * cellSize, (prevStart[0] + 1) * cellSize);
        ctx.moveTo(prevStart[1] * cellSize, (prevStart[0] + 1) * cellSize);
        ctx.lineTo(prevStart[1] * cellSize, prevStart[0] * cellSize);
        ctx.moveTo(prevStart[1] * cellSize, prevStart[0] * cellSize);
        ctx.stroke();
        return [x, y];
    }
    else {
        return [0, 0];
    }
}
function setEndPoint(event) {
    let x = Math.floor(event.offsetY / cellSize);
    let y = Math.floor(event.offsetX / cellSize);
    // delete the previous start point
    if (prevEnd[0] !== -1 && prevEnd[1] !== -1) {
        ctx.clearRect(prevEnd[1] * cellSize, prevEnd[0] * cellSize, cellSize, cellSize);
        // draw the new start point
        matrix[x][y] = 3;
        ctx.fillStyle = '#ff4d4d';
        ctx.fillRect(y * cellSize, x * cellSize, cellSize, cellSize);
        console.log(prevEnd);
        // draw the line again
        ctx.beginPath();
        ctx.moveTo(prevEnd[1] * cellSize, prevEnd[0] * cellSize);
        ctx.lineTo((prevEnd[1] + 1) * cellSize, prevEnd[0] * cellSize);
        // draw 4 edges of the square
        ctx.moveTo((prevEnd[1] + 1) * cellSize, prevEnd[0] * cellSize);
        ctx.lineTo((prevEnd[1] + 1) * cellSize, (prevEnd[0] + 1) * cellSize);
        ctx.moveTo((prevEnd[1] + 1) * cellSize, (prevEnd[0] + 1) * cellSize);
        ctx.lineTo(prevEnd[1] * cellSize, (prevEnd[0] + 1) * cellSize);
        ctx.moveTo(prevEnd[1] * cellSize, (prevEnd[0] + 1) * cellSize);
        ctx.lineTo(prevEnd[1] * cellSize, prevEnd[0] * cellSize);
        ctx.moveTo(prevEnd[1] * cellSize, prevEnd[0] * cellSize);
        ctx.stroke();
        return [x, y];
    }
    else {
        return [0, 0];
    }
}
function updateAdjacencyList() {
    adjList = getAdjacencyList(matrix);
    startNode = getSourceNode(matrix);
    endNode = getEndNode(matrix);
}
function resetAdjacencyList() {
    for (let i = 0; i < adjList.length; i++) {
        for (let j = 0; j < adjList[i].length; j++) {
            adjList[i][j] = 0;
        }
    }
    startNode = -1;
    endNode = -1;
}
export function initPath(node) {
    let x = getNodeXCoordinates(node);
    let y = getNodeYCoordinates(node);
    drawSquareWithAnimation(x, y, '#FFEA00');
}
export function initPrevPath(node) {
    let x = getNodeXCoordinates(node);
    let y = getNodeYCoordinates(node);
    drawSquareWithAnimation(x, y, '#33A3FF');
}
// Add event listeners
clear.addEventListener('click', () => {
    clearCanvas();
    resetAdjacencyList();
});
begin.addEventListener('click', (event) => {
    isStart = true;
    console.log('begin');
});
wall.addEventListener('click', (event) => {
    console.log('wall');
    isStart = false;
    isEnd = false;
});
end.addEventListener('click', () => {
    console.log('set-end');
    isStart = false;
    isEnd = true;
});
start.addEventListener('click', () => {
    updateAdjacencyList();
    getShortestDistanceBFS(adjList, startNode, endNode);
    console.log('start');
});
canvas.addEventListener('mousedown', (event) => {
    if (event.button === 0 && !isStart && !isEnd) {
        isDragging = true;
        drawSquare(event);
    }
    else if (event.button === 0 && isStart) {
        prevStart = initPoint(event);
    }
    else if (event.button === 0 && isEnd === true) {
        console.log('end');
        prevEnd = setEndPoint(event);
    }
});
canvas.addEventListener('mousemove', (event) => {
    if (isDragging && event.button === 0) {
        drawSquare(event);
    }
});
canvas.addEventListener('mouseup', () => {
    isDragging = false;
});
canvas.addEventListener('contextmenu', (event) => {
    deleteSquare(event);
});
// Run the functions once the page is loaded
(function once(arrays) {
    console.log(cellSize);
    console.log(width, height);
    console.log(rows, cols);
    createMatrix(arrays);
    printMatrix(arrays);
    drawGrid();
})(matrix);
export { matrix, cellSize, width, height, rows, cols, ctx, canvas };
