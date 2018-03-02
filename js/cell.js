let Array2D = require('array2d');

class Cell {
	constructor(x, y) {
		this.alive = false;
		this.x = x;
		this.y = y;
	}

	// Basic methods
	born() {
		this.alive = true;
	}

	die() {
		this.alive = false;
	}

	neighbors(grid) {
		return Array2D.neighbors(grid, this.x, this.y);
	}
}

let aCell = new Cell(0, 0);
let grid = [[aCell, 1, 2], [false, 'h', 5]];

// aCell;
// aCell.born();
// console.log(aCell.alive);
// aCell.die();
// console.log(aCell.alive);
// aCell.neighbors(grid);

module.exports = Cell;
