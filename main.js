var v = document.getElementById('myCanvas');
var ctx = v.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const SQUARE_SIZE = 40;
const NUMBER_OF_COLUMNS = CANVAS_WIDTH / SQUARE_SIZE - 2;
// Draw matrix
class Column {
    
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw() {
        ctx.fillStyle = '#7c7c7c';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#4c4c4c';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    //getter of x, y, width, height
    x() {
        return this.x;
    }
    y() {
        return this.y;
    }
    width() {
        return this.width;
    }
    height() {
        return this.height;
    }
    
    
}
function refreshCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
var columns = [];

function shuffle(columns) {
    columns.sort(() => Math.random() - 0.5);
}
function initialize()   {
    // Create columns
    
    for (let i = 0; i < NUMBER_OF_COLUMNS; i++) {
        let column = new Column(SQUARE_SIZE + i * SQUARE_SIZE, 0, SQUARE_SIZE, Math.random() * (CANVAS_HEIGHT - SQUARE_SIZE)+20);
        columns.push(column);
    }
    shuffle(columns);
}
initialize();

for(let i =0;i<columns.length;i++) {
    console.log(columns[i].height);
}
console.log("after sort");
for (let i = 0; i<columns.length-1;i++) {
   
    for(let j=i+1;j<columns.length;j++) {
        if(columns[i].height > columns[j].height) {
            let temp = columns[i];
            columns[i] = columns[j];
            columns[j] = temp;
            //console.log(columns[i].height);
        }
    }
}
for(let i =0;i<columns.length;i++) {
    console.log(columns[i].height);
}
//refresh canvas
for (let i = 0; i < columns.length; i++) {
    columns[i].draw();
}
