var Cell = require('./cell');
let Array2D = require('array2d');

// function cellToGrid(r, c) {
// 	return new Cell(c, r);
// }
//
// let cellGrid = Array2D.buildWith(3, 3, cellToGrid);
// cellGrid[0][1].born();
// cellGrid;

class Model {
	constructor(width, height) {
		this.board = Array2D.buildWith(width, height, this.cellsToGrid);
	}

	cellsToGrid(r, c) {
		return new Cell(c, r);
	}

	render2D(t, f) {
		return Array2D.map(this.board, cell => {
			return cell.alive ? t : f;
		});
	}

	renderFlat(t, f) {
		return Array2D.flatten(this.render2D(t, f));
	}

	propagate() {
		Array2D.eachCell(this.board, cell => {
			cell.propagate(this.board);
		});
	}

	advance() {
		Array2D.eachCell(this.board, cell => {
			cell.advance();
		});
	}
}

var testModel = new Model(12, 20);
testModel.board[4][3].born();
testModel.board[4][4].born();
testModel.board[4][5].born();
testModel.board[4][6].born();
testModel.board[4][7].born();
testModel.board[5][3].born();
testModel.board[5][4].born();
testModel.board[5][5].born();
testModel.board[5][6].born();
testModel.board[5][7].born();
// Array2D.neighborhood(testModel.board,2,3)
// testModel.board[2][3].getNeighborhood(testModel.board);
setInterval(function() {
	console.clear();
	console.log(testModel.render2D('🐞', '◼️'));
	testModel.propagate(testModel.board);
	testModel.advance();
}, 500);

module.exports = Model;
