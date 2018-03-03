var chai = require('chai');
var expect = chai.expect;
var Cell = require('../js/cell');
var Array2D = require('array2d');
var Board = require('../js/model');

let width = 8;
let height = 10;
var testBoard = new Board(width, height);

describe('Board basics', () => {
	it('Can construct new model', () => {
		expect(typeof testBoard).to.equal('object');
	});
	it('New model has a grid property', () => {
		expect(testBoard.grid).to.be.an('array');
	});
	it('New model grid has correct number of cells', () => {
		expect(Array2D.area(testBoard.grid)).to.equal(width * height);
	});
	it('Random query 1 into grid returns a Cell', () => {
		let row = Math.floor(Math.random() * height);
		let column = Math.floor(Math.random() * width);
		expect(testBoard.grid[row][column].constructor.name).to.equal('Cell');
	});
	it('Random query 2 into grid returns a Cell', () => {
		let row = Math.floor(Math.random() * height);
		let column = Math.floor(Math.random() * width);
		expect(testBoard.grid[row][column].constructor.name).to.equal('Cell');
	});
	it('Random query 3 into grid returns a Cell', () => {
		let row = Math.floor(Math.random() * height);
		let column = Math.floor(Math.random() * width);
		expect(testBoard.grid[row][column].constructor.name).to.equal('Cell');
	});
});

describe('Board rendering methods', () => {
	it('Render2D has same height as model.grid', () => {
		expect(testBoard.render2D('X', ' ').length).to.equal(height);
	});
	it('Render2D has same width as model.grid', () => {
		expect(testBoard.render2D('X', ' ')[0].length).to.equal(width);
	});
	it('RenderFlat has same length as grid area', () => {
		let renderFlatLength = testBoard.renderFlat('X', ' ').length;
		let originalArea = Array2D.area(testBoard.grid);
		expect(renderFlatLength).to.equal(originalArea);
	});
	it('Random query 1 into Render2D returns a string', () => {
		let row = Math.floor(Math.random() * height);
		let column = Math.floor(Math.random() * width);
		expect(testBoard.render2D('X', ' ')[row][column]).to.be.a('string');
	});
	it('Random query 2 into Render2D returns a string', () => {
		let row = Math.floor(Math.random() * height);
		let column = Math.floor(Math.random() * width);
		expect(testBoard.render2D('X', ' ')[row][column]).to.be.a('string');
	});
});

describe('Board propagation behaviors', () => {
	describe('Still life tests', () => {
		it('Block stays a block after 1 generation', () => {
			var blockBoard = new Board(4, 4);
			blockBoard.grid[1][1].born();
			blockBoard.grid[1][2].born();
			blockBoard.grid[2][1].born();
			blockBoard.grid[2][2].born();
			var blockRound0 = blockBoard.renderFlat('X', 'O');
			blockBoard.propagate();
			blockBoard.advance();
			var blockRound0 = blockBoard.renderFlat('X', 'O');
			expect(blockRound0).to.eql(blockRound0);
		});
		it('Hive stays a hive after 1 generation', () => {
			var hiveBoard = new Board(6, 5);
			hiveBoard.grid[1][2].born();
			hiveBoard.grid[1][3].born();
			hiveBoard.grid[2][1].born();
			hiveBoard.grid[2][4].born();
			hiveBoard.grid[3][2].born();
			hiveBoard.grid[3][3].born();
			var hiveRound0 = hiveBoard.renderFlat('X', 'O');
			hiveBoard.propagate();
			hiveBoard.advance();
			var hiveRound1 = hiveBoard.renderFlat('X', 'O');
			expect(hiveRound0).to.eql(hiveRound1);
		});
	});
	describe('Oscillator tests', () => {
		it('Blinker behaves as period 2 oscillator', () => {
			var blinkerBoard = new Board(5, 5);
			blinkerBoard.grid[1][2].born();
			blinkerBoard.grid[2][2].born();
			blinkerBoard.grid[3][2].born();
			var blinkerRound0 = blinkerBoard.renderFlat('X', 'O');
			blinkerBoard.propagate();
			blinkerBoard.advance();
			var blinkerRound1 = blinkerBoard.renderFlat('X', 'O');
			blinkerBoard.propagate();
			blinkerBoard.advance();
			var blinkerRound2 = blinkerBoard.renderFlat('X', 'O');
			blinkerBoard.propagate();
			blinkerBoard.advance();
			var blinkerRound3 = blinkerBoard.renderFlat('X', 'O');
			expect(blinkerRound0).to.not.eql(blinkerRound1);
			expect(blinkerRound0).to.eql(blinkerRound2);
			expect(blinkerRound1).to.eql(blinkerRound3);
		});
		it('Pulsar behaves as period 3 oscillator', () => {
			var pulsarBoard = new Board(17, 17);
			function horizontals(row) {
				pulsarBoard.grid[row][4].born();
				pulsarBoard.grid[row][5].born();
				pulsarBoard.grid[row][6].born();
				pulsarBoard.grid[row][10].born();
				pulsarBoard.grid[row][11].born();
				pulsarBoard.grid[row][12].born();
			}
			horizontals(2);
			horizontals(7);
			horizontals(9);
			horizontals(14);
			function verticals(column) {
				pulsarBoard.grid[4][column].born();
				pulsarBoard.grid[5][column].born();
				pulsarBoard.grid[6][column].born();
				pulsarBoard.grid[10][column].born();
				pulsarBoard.grid[11][column].born();
				pulsarBoard.grid[12][column].born();
			}
			verticals(2);
			verticals(7);
			verticals(9);
			verticals(14);
			var pulsarRound0 = pulsarBoard.renderFlat('X', 'O');
			pulsarBoard.propagate();
			pulsarBoard.advance();
			var pulsarRound1 = pulsarBoard.renderFlat('X', 'O');
			pulsarBoard.propagate();
			pulsarBoard.advance();
			var pulsarRound2 = pulsarBoard.renderFlat('X', 'O');
			pulsarBoard.propagate();
			pulsarBoard.advance();
			var pulsarRound3 = pulsarBoard.renderFlat('X', 'O');
			pulsarBoard.propagate();
			pulsarBoard.advance();
			var pulsarRound4 = pulsarBoard.renderFlat('X', 'O');
			pulsarBoard.propagate();
			pulsarBoard.advance();
			var pulsarRound5 = pulsarBoard.renderFlat('X', 'O');
			expect(pulsarRound0).to.not.eql(pulsarRound1);
			expect(pulsarRound0).to.not.eql(pulsarRound2);
			expect(pulsarRound0).to.eql(pulsarRound3);
			expect(pulsarRound1).to.eql(pulsarRound4);
			expect(pulsarRound2).to.eql(pulsarRound5);
		});
	});
});

testBoard.grid.length;
