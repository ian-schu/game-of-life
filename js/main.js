let Array2D = require('array2d');

let grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let theCanvas = document.getElementById('test-canvas');

Array2D.toCanvas(grid, theCanvas, function(cell) {
	return [cell, cell, cell, 255]; // [r,g,b,a]
});
