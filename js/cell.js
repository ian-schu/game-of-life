let Array2D = require('array2d');

class Cell {
	constructor(x, y) {
		this.alive = false;
		this.aliveNext = false;
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

		// return neighborVals;
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

Array2D.neighborhood([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1, 1);

// let aCell = new Cell(0, 0);
// aCell.born();
// let grid = [[aCell, 1, 2], [false, 'h', 5]];
// aCell.getNeighborhood(grid);
// aCell.parseNeighborhood(grid);

// aCell;
// aCell.born();
// console.log(aCell.alive);
// aCell.die();
// console.log(aCell.alive);
// aCell.neighbors(grid);

module.exports = Cell;
