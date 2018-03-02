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
}

let thisModel = new Model(10, 15);
let thisBoard = thisModel.board;
thisModel.board[4][4];
thisBoard[4][4].born();
thisBoard[5][7].born();
thisBoard[2][2].born();
thisBoard[1][7].born();

thisModel.render2D('X', ' ').length;
thisModel.renderFlat('X', 'O');

module.exports = Model;
