var v = document.getElementById('myCanvas');
var ctx = v.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const SQUARE_SIZE = 40;
// Draw matrix
for (var i = 0; i < CANVAS_WIDTH; i += SQUARE_SIZE) {
    for (var j = 0; j < CANVAS_HEIGHT; j += SQUARE_SIZE) {
        ctx.strokeRect(i, j, SQUARE_SIZE, SQUARE_SIZE);
    }
}
// Catch mouse event
