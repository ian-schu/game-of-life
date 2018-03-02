var chai = require('chai');
var expect = chai.expect;
var Cell = require('../js/cell');
let Array2D = require('array2d');

var newCell;
var middleCell;
var grid;

beforeEach(() => {
	newCell = new Cell(0, 0);
	middleCell = new Cell(1, 1);
	grid = [[newCell, 2, 3], [4, middleCell, 6], [7, 8, 9]];
});

describe('New cell basics', () => {
	it('New cell is created, and is dead', () => {
		expect(newCell.alive).to.equal(false);
	});
	it('Cell can be made alive', () => {
		newCell.born();
		expect(newCell.alive).to.equal(true);
	});
	it('Cell can be made dead', () => {
		newCell.die();
		expect(newCell.alive).to.equal(false);
	});
	it('New cell has x value', () => {
		expect(newCell.x).to.equal(0);
	});
	it('New cell has y value', () => {
		expect(newCell.y).to.equal(0);
	});
});

describe('Fundamental cell behavior', () => {
	it('Neighbors method returns an array', () => {
		expect(newCell.neighbors(grid)).to.be.an('array');
	});
	it('Corner cell sees 8 total neighbors', () => {
		expect(newCell.neighbors(grid).length).to.equal(8);
	});
	it('Corner cell sees 3 actual neighbors', () => {
		expect(newCell.neighbors(grid)).to.include.members([2, 4, middleCell]);
	});
	it('Middle cell sees 8 total neighbors', () => {
		expect(middleCell.neighbors(grid).length).to.equal(8);
	});
	it('Middle cell sees 8 actual neighbors', () => {
		expect(middleCell.neighbors(grid)).to.include.members([
			newCell,
			2,
			3,
			4,
			6,
			7,
			8,
			9
		]);
	});
});
