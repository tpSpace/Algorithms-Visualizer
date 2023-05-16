const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

const width: number = canvas.width;
const height: number = canvas.height;
console.log(width, height);

// gcd of width and height
const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

let size: number = gcd(width, height);
console.log(size);

// get random color
function getRandomColor(): string {
  const red: number = Math.floor(Math.random() * 256); // giá trị màu đỏ từ 0 đến 255
  const green: number = Math.floor(Math.random() * 256); // giá trị màu xanh lá cây từ 0 đến 255
  const blue: number = Math.floor(Math.random() * 256); // giá trị màu xanh dương từ 0 đến 255
  return `rgb(${red}, ${green}, ${blue})`; // trả về chuỗi RGB
}

// draw squares for matrix each square has size = gcd(width, height)
function drawSquares(): void {
  for (let i: number = 0; i < width; i += size) {
    for (let j: number = 0; j < height; j += size) {
      if (ctx) {
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(i, j, size, size);
        console.log(i, j, size, size);
      }
    }
    console.log('-----------------');
  }
}

drawSquares();

// draw a circle
