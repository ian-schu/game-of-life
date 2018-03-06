// let Array2D = require('array2d');

class Cell {
	constructor(x, y) {
		this.alive = false;
		this.aliveNext = false;
		this.color = 'white';
		this.colorNext = 'white';
		this.x = x;
		this.y = y;
		this.neighborhood = [];
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

	parseNeighborhood() {
		return this.neighborhood.filter(cell => cell.alive);
	}

	neighborhoodColors() {
		return this.parseNeighborhood().map(cell => cell.color);
	}

	avgNeighborColors() {
		return this.neighborhoodColors().reduce((acc, curr, i) => {
			return d3.interpolate(acc, curr)(1 / (i + 1));
		});
	}

	interpolateColorNext() {
		if (this.alive) {
			this.colorNext = d3.interpolate(this.avgNeighborColors(), this.color)(0.5);
		} else if (this.aliveNext) {
			this.colorNext = this.avgNeighborColors();
		}
	}

	propagate() {
		if (this.parseNeighborhood().length === 3) {
			this.aliveNext = true;
		} else if (this.parseNeighborhood().length === 4) {
			this.aliveNext = this.alive;
		} else {
			this.aliveNext = false;
		}
		this.interpolateColorNext();
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
		this.quickSave = [];
		this.demographics = {
			birthRateInstant: 0,
			// birthRateRolling10: 0,
			// birthRateRolling50: 0,
			deathRateInstant: 0,
			// deathRateRolling10: 0,
			// deathRateRolling50: 0,
			populationNow: 0,
			populationLast: 0,
			netBirthRate: 0
		};
		Array2D.eachCell(this.grid, cell => {
			cell.setNeighborhood(this.grid, this.height, this.width);
		});
		this.getCellDemographics = this.getCellDemographics.bind(this);
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
		this.demographics = {
			birthRateInstant: 0,
			// birthRateRolling10: 0,
			// birthRateRolling50: 0,
			deathRateInstant: 0,
			// deathRateRolling10: 0,
			// deathRateRolling50: 0,
			populationNow: 0,
			populationLast: 0,
			netBirthRate: 0
		};
	}

	makeQuickSave() {
		this.quickSave = Array2D.map(this.grid, cell => {
			return {
				alive: cell.alive,
				color: cell.color
			};
		});
	}

	revertToQuickSave() {
		if (this.quickSave.length) {
			Array2D.eachCell(this.grid, (cell, r, c) => {
				cell.alive = this.quickSave[r][c].alive;
				cell.color = this.quickSave[r][c].color;
			});
		}
	}

	propagateBoard() {
		this.startDemographicCalcs();
		this.propagateAllCells();
		this.finishDemographicCalcs();
		// console.clear();
		// console.log(this.demographics);
	}

	propagateAllCells() {
		Array2D.eachCell(this.grid, cell => {
			cell.propagate();
			this.getCellDemographics(cell);
		});
	}

	advance() {
		Array2D.eachCell(this.grid, cell => {
			cell.advance();
		});
	}

	getCellDemographics(cell) {
		if (cell.alive) {
			if (cell.aliveNext == false) {
				this.demographics.deathRateInstant++;
			}
		}
		if (cell.aliveNext) {
			if (!cell.alive) {
				this.demographics.birthRateInstant++;
			}
		}
	}

	startDemographicCalcs() {
		this.demographics.birthRateInstant = 0;
		this.demographics.deathRateInstant = 0;
		this.demographics.populationLast = this.demographics.populationNow;
	}

	finishDemographicCalcs() {
		this.demographics.netBirthRate =
			this.demographics.birthRateInstant - this.demographics.deathRateInstant;
		this.demographics.populationNow =
			this.demographics.populationLast + this.demographics.netBirthRate;
	}

	activateCell(x, y, color) {
		this.grid[y][x].born();
		this.grid[y][x].color = color;
		this.demographics.populationNow++;
	}

	killCell(x, y) {
		this.grid[y][x].die();
		this.demographics.populationNow--;
	}
}

// let testBoard = new Board(3, 3);
//
// testBoard.grid[1][1].born();
// testBoard.grid[1][1].color = 'black';
//
// testBoard.makeQuickSave();
//
// Array2D.map(testBoard.grid, cell => cell.alive);
// testBoard.grid
//
// testBoard.quickSave;
//
// testBoard.revertToQuickSave()
//
// testBoard.grid[1][1].die();
