const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); 

const width = canvas.width;
const height = canvas.height;
console.log(width, height);
// gcd of width and height
const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
}


let size = gcd(width, height);
console.log(size);
// get random color
function getRandomColor() {
    const red = Math.floor(Math.random() * 256); // giá trị màu đỏ từ 0 đến 255
    const green = Math.floor(Math.random() * 256); // giá trị màu xanh lá cây từ 0 đến 255
    const blue = Math.floor(Math.random() * 256); // giá trị màu xanh dương từ 0 đến 255
    return `rgb(${red}, ${green}, ${blue})`; // trả về chuỗi RGB
  }
// draw squeares for matrix each square has size = gcd(width, height)
function drawSquares() {
    for (let i = 0; i < width; i += size) {
        for (let j = 0; j < height; j += size) {
            ctx.fillStyle = getRandomColor();
            ctx.fillRect(i, j, size, size);
            console.log(i, j, size, size);
        }
        console.log('-----------------');
    }
}
drawSquares();
// draw a circle