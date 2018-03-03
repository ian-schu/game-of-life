var chai = require('chai');
var expect = chai.expect;
var Cell = require('../src/cell');
var Array2D = require('array2d');
var Model = require('../src/model');

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
		expect(newCell.getNeighborhood(grid)).to.be.an('array');
	});
	it('Corner cell sees 9 total neighbors', () => {
		expect(newCell.getNeighborhood(grid).length).to.equal(9);
	});
	it('Corner cell sees 4 actual neighbors', () => {
		expect(newCell.getNeighborhood(grid)).to.include.members([
			newCell,
			2,
			4,
			middleCell
		]);
	});
	it('Middle cell sees neighborhood of 9 members', () => {
		expect(middleCell.getNeighborhood(grid).length).to.equal(9);
	});
	it('Middle cell sees correct 9 neighborhood members', () => {
		expect(middleCell.getNeighborhood(grid)).to.include.members([
			newCell,
			2,
			3,
			4,
			middleCell,
			6,
			7,
			8,
			9
		]);
	});
	it('parseNeighbors returns an integer', () => {
		newCell.born();
		middleCell.born();
		expect(middleCell.parseNeighborhood(grid)).to.be.a('number');
	});
});
