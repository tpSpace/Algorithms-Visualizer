"use strict";
// Project: Algorithms and Data Structures
// Author: nmvkhoi
// ts-check
// constants
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
// Functions
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
    ctx.fillStyle = '#19A7CE';
    ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
    matrix[i][j] = 2;
    printMatrix(matrix);
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
// Add event listeners
clear.addEventListener('click', () => { clearCanvas(); });
begin.addEventListener('click', (event) => { isStart = true; console.log('begin'); });
wall.addEventListener('click', (event) => { console.log('wall'); isStart = false; isEnd = false; });
end.addEventListener('click', () => { console.log('set-end'); isStart = false; isEnd = true; });
start.addEventListener('click', () => { console.log('start'); });
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
