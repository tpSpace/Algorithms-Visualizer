// Project: Algorithms and Data Structures
// Author: nmvkhoi

// constants
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const clear = document.getElementById('clear') as HTMLButtonElement;
const begin = document.getElementById('begin') as HTMLButtonElement;
const end = document.getElementById('end') as HTMLButtonElement;
const wall = document.getElementById('wall') as HTMLButtonElement;
const start = document.getElementById('start') as HTMLButtonElement;

const width = canvas.width;
const height = canvas.height;
const cellSize = 20;

const rows = height / cellSize;
const cols = width / cellSize;

let matrix: number[][] = [];
let isDragging = false;

// console.log(rows, cols);


// Functions
// create a matrix
function createMatrix([]: number[][]) {
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = 0;
    }
  }
}
// clear the matrix
function clearMatrix([]: number[][]) {
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = 0;
    }
  }
}
// print the matrix
function printMatrix([]: number[][]) {
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
function drawSquare(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
    let i = Math.floor(y / cellSize);
    let j = Math.floor(x / cellSize);
    ctx.fillStyle = 'red';
    ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
    matrix[i][j] = 2;
    printMatrix(matrix);
}
// clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
  drawGrid();
  clearMatrix(matrix);
}
// delete a square
function deleteSquare(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
    let i = Math.floor(y / cellSize);
    let j = Math.floor(x / cellSize);
    ctx.clearRect(j * cellSize, i * cellSize, cellSize, cellSize);
    // draw the line again
    ctx.beginPath();
    ctx.moveTo(j * cellSize, i * cellSize);
    ctx.lineTo((j + 1) * cellSize, i * cellSize);
    ctx.stroke();
    matrix[i][j] = 0;
}
function ChoseStart(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
    let i = Math.floor(y / cellSize);
    let j = Math.floor(x / cellSize);
    ctx.fillStyle = 'green';
    ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
    matrix[i][j] = 1;
    printMatrix(matrix);
}
// Add event listeners
begin.addEventListener('click', (event)=>{ChoseStart(event)});
end.addEventListener('click', ()=>{console.log('end')});
wall.addEventListener('click', ()=>{console.log('wall')});
start.addEventListener('click', ()=>{console.log('start')});

canvas.addEventListener('mousedown', (event)=>{
    isDragging = true;
    drawSquare(event);
});
canvas.addEventListener('mousemove', (event)=>{
    if(isDragging){
        drawSquare(event);
    }
})
canvas.addEventListener('mouseup', ()=>{
    isDragging = false;
});
canvas.addEventListener('contextmenu', (event)=>{
    deleteSquare(event);
});
clear.addEventListener('click', ()=>{clearCanvas()});

// Run the functions
(
  function once(arrays: number[][])  {
    console.log(cellSize);
    console.log(width, height);
    console.log(rows, cols);

    createMatrix(arrays);
    printMatrix(arrays);
    drawGrid();
  }
)(matrix);

