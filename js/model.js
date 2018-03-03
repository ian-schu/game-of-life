var Cell = require('./cell');
let Array2D = require('array2d');

// function cellToGrid(r, c) {
// 	return new Cell(c, r);
// }
//
// let cellGrid = Array2D.buildWith(3, 3, cellToGrid);
// cellGrid[0][1].born();
// cellGrid;

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

// var testBoard = new Board(6, 5);
// testBoard.grid[1][2].born();
// testBoard.grid[1][3].born();
// testBoard.grid[2][1].born();
// testBoard.grid[2][4].born();
// testBoard.grid[3][2].born();
// testBoard.grid[3][3].born();
//
// testBoard.grid[4][3].born();
// testBoard.grid[4][4].born();
// testBoard.grid[4][5].born();
// testBoard.grid[4][6].born();
// testBoard.grid[4][7].born();
// testBoard.grid[5][3].born();
// testBoard.grid[5][4].born();
// testBoard.grid[5][5].born();
// testBoard.grid[5][6].born();
// testBoard.grid[5][7].born();

// setInterval(function() {
// 	console.clear();
// 	console.log(testBoard.render2D('🐞', '◼️'));
// 	testBoard.propagate(testBoard.grid);
// 	testBoard.advance();
// }, 500);

module.exports = Board;
