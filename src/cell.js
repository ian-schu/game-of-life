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

module.exports = Cell;
