// var Cell = require('./cell');
// let Array2D = require('array2d');

class Board {
	constructor(width, height) {
		this.grid = Array2D.buildWith(width, height, this.cellsToGrid);
	}

	cellsToGrid(r, c) {
		return new Cell(c, r);
	}

	render2D(t, f) {
		return Array2D.map(this.grid, cell => {
			return cell.alive ? t : f;
		});
	}

	renderFlat(t, f) {
		return Array2D.flatten(this.render2D(t, f));
	}

	propagate() {
		Array2D.eachCell(this.grid, cell => {
			cell.propagate(this.grid);
		});
	}

	advance() {
		Array2D.eachCell(this.grid, cell => {
			cell.advance();
		});
	}
}

// module.exports = Board;
