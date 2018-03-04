// var Cell = require('./cell');
// var Array2D = require('array2d');

// let myCell = new Cell(1, 1);
// let anArray = [[1, 2, 3], [4, myCell, 6], [7, 8, 9]];
// myCell.getNeighborhood(anArray);
// anArray[0][0];

class Cell {
	constructor(x, y) {
		this.alive = false;
		this.aliveNext = false;
		this.color = 'white';
		this.colorNext = 'white';
		this.x = x;
		this.y = y;
		this.neighborhood = [];
		this.getNeighborhood = this.getNeighborhood.bind(this);
		this.setNeighborhood = this.setNeighborhood.bind(this);
	}

	born() {
		this.alive = true;
	}

	die() {
		this.alive = false;
	}

	setNeighborhood(board, boardHeight, boardWidth) {
		let north, northeast, east, southeast, south, southwest, west, northwest;

		north = this.y - 1;
		south = this.y + 1;
		east = this.x + 1;
		west = this.x - 1;

		if (this.y == 0) {
			north = boardHeight - 1;
		} else if (this.y == boardHeight - 1) {
			south = 0;
		}

		if (this.x == 0) {
			west = boardWidth - 1;
		} else if (this.x == boardWidth - 1) {
			east = 0;
		}

		this.neighborhood = [
			this,
			board[north][this.x],
			board[north][east],
			board[this.y][east],
			board[south][east],
			board[south][this.x],
			board[south][west],
			board[this.y][west],
			board[north][west]
		];
	}

	getNeighborhood() {
		// let north, northeast, east, southeast, south, southwest, west, northwest;
		//
		// north = this.y - 1;
		// south = this.y + 1;
		// east = this.x + 1;
		// west = this.x - 1;
		//
		// if (this.y == 0) {
		// 	north = boardHeight - 1;
		// } else if (this.y == boardHeight - 1) {
		// 	south = 0;
		// }
		//
		// if (this.x == 0) {
		// 	west = boardWidth - 1;
		// } else if (this.x == boardWidth - 1) {
		// 	east = 0;
		// }

		return this.neighborhood;
	}

	parseNeighborhood(board, boardHeight, boardWidth) {
		let neighbors = this.getNeighborhood(board, boardHeight, boardWidth);
		let neighborVals = neighbors.map(el => {
			if (el && el.constructor.name === 'Cell') {
				if (el.alive) {
					return 1;
				} else {
					return 0;
				}
			} else {
				return 0;
			}
		});
		return neighborVals.reduce((acc, curr) => {
			return acc + curr;
		}, 0);
	}

	propagate(board, boardHeight, boardWidth) {
		let sum = this.parseNeighborhood(board, boardHeight, boardWidth);
		if (sum === 3) {
			this.aliveNext = true;
		} else if (sum === 4) {
			this.aliveNext = this.alive;
		} else {
			this.aliveNext = false;
		}
	}

	advance() {
		this.color = this.colorNext;
		this.alive = this.aliveNext;
	}
}

class Board {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.grid = Array2D.buildWith(width, height, this.cellsToGrid);
		Array2D.eachCell(this.grid, cell => {
			cell.setNeighborhood(this.grid, this.height, this.width);
		});
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

	clear() {
		Array2D.eachCell(this.grid, cell => {
			cell.die();
			cell.aliveNext = false;
		});
	}

	propagate() {
		Array2D.eachCell(this.grid, cell => {
			cell.propagate(this.grid, this.height, this.width);
		});
	}

	advance() {
		Array2D.eachCell(this.grid, cell => {
			cell.advance();
		});
	}

	activateCell(x, y) {
		this.grid[y][x].born();
	}

	killCell(x, y) {
		this.grid[y][x].die();
	}
}

// module.exports = Board;
