const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const width = canvas.width;
const height = canvas.height;
const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
const cellSize = 20;

console.log(cellSize);
console.log(gcd(width, height));
console.log(width, height);

function drawGrid() {
    for(let i=cellSize;i<height;i+=cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }
    for(let j=cellSize;j<width;j+=cellSize) {
        ctx.beginPath();
        ctx.moveTo(j, 0);
        ctx.lineTo(j, height);
        ctx.stroke();
    }
}
function drawHover() {
    addEventListener('mousemove', (e) => {

    });
}
drawGrid();
