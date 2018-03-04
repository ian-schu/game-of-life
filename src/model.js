// var Cell = require('./cell');
// var Array2D = require('array2d');

class Cell {
	constructor(x, y) {
		this.alive = false;
		this.aliveNext = false;
		this.x = x;
		this.y = y;
	}

	born() {
		this.alive = true;
	}

	die() {
		this.alive = false;
	}

	getNeighborhood(gridName) {
		return Array2D.flatten(Array2D.neighborhood(gridName, this.y, this.x));
	}

	parseNeighborhood(gridName) {
		let neighbors = this.getNeighborhood(gridName);
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

	propagate(gridName) {
		if (this.parseNeighborhood(gridName) === 3) {
			this.aliveNext = true;
		} else if (this.parseNeighborhood(gridName) === 4) {
			this.aliveNext = this.alive;
		} else {
			this.aliveNext = false;
		}
	}

	advance() {
		this.alive = this.aliveNext;
	}
}

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

	clear() {
		Array2D.eachCell(this.grid, cell => {
			cell.die();
			cell.aliveNext = false;
		});
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

	activateCell(x, y) {
		this.grid[y][x].born();
	}
}

// module.exports = Board;
