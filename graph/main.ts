const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
console.log(width, height);
const scale = (width:number, heigt:number): number => {
  if (width > height) {
    return width / height;
  }
  return height / width;

};
const size = gcd(width, height)*scale(width, height)*10;
console.log(size);
// draw line to create matrix for canvas
const drawLine = (x: number, y: number, x2: number, y2: number): void => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = '#000';
  ctx.stroke();
}

// draw matrix
for (let i = 0; i < width; i += size) {
  for (let j = 0; j < height; j += size) {
    drawLine(i, 0, i, height);
    drawLine(0, j, width, j);
  }
}

