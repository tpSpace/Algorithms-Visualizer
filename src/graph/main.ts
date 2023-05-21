// Project: Algorithms and Data Structures
// Author: nmvkhoi

// constants
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const clear = document.getElementById('clear') as HTMLButtonElement;

const width = canvas.width;
const height = canvas.height;
const cellSize = 20;
const rows = height / cellSize;
const cols = width / cellSize;

let matrix: number[][] = [];
let isDragging = false;
// console.log(rows, cols);
console.log(cellSize);
console.log(width, height);
// Functions
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
// draw a square
function drawSquare(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
    let i = Math.floor(y / cellSize);
    let j = Math.floor(x / cellSize);
    ctx.fillStyle = 'red';
    ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
    // matrix[i][j] = 1;
}
// clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
  drawGrid();
  matrix = [];
}
function borderRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    clear.style.borderColor = rgbColor;
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
    // matrix[i][j] = 0;
}
// Add event listeners

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
clear.addEventListener('mouseover', ()=>{borderRGB()});
clear.addEventListener('mouseout', ()=>{clear.style.borderColor = 'transparent'});
// Run the functions
drawGrid();
