var chai = require('chai');
var expect = chai.expect;
var Cell = require('../js/cell');
var Array2D = require('array2d');
var Model = require('../js/model');

let width = 8;
let height = 10;
var testModel = new Model(width, height);

describe('Model basics', () => {
	it('Can construct new model', () => {
		expect(typeof testModel).to.equal('object');
	});
	it('New model has a board property', () => {
		expect(testModel.board).to.be.an('array');
	});
	it('New model board has correct number of cells', () => {
		expect(Array2D.area(testModel.board)).to.equal(width * height);
	});
	it('Random query 1 into board returns a Cell', () => {
		let row = Math.floor(Math.random() * height);
		let column = Math.floor(Math.random() * width);
		expect(testModel.board[row][column].constructor.name).to.equal('Cell');
	});
	it('Random query 2 into board returns a Cell', () => {
		let row = Math.floor(Math.random() * height);
		let column = Math.floor(Math.random() * width);
		expect(testModel.board[row][column].constructor.name).to.equal('Cell');
	});
	it('Random query 3 into board returns a Cell', () => {
		let row = Math.floor(Math.random() * height);
		let column = Math.floor(Math.random() * width);
		expect(testModel.board[row][column].constructor.name).to.equal('Cell');
	});
});

describe('Model rendering methods', () => {
	it('Render2D has same height as model.board', () => {
		expect(testModel.render2D('X', ' ').length).to.equal(height);
	});
	it('Render2D has same width as model.board', () => {
		expect(testModel.render2D('X', ' ')[0].length).to.equal(width);
	});
	it('RenderFlat has same length as board area', () => {
		let renderFlatLength = testModel.renderFlat('X', ' ').length;
		let originalArea = Array2D.area(testModel.board);
		expect(renderFlatLength).to.equal(originalArea);
	});
	it('Random query 1 into Render2D returns a string', () => {
		let row = Math.floor(Math.random() * height);
		let column = Math.floor(Math.random() * width);
		expect(testModel.render2D('X', ' ')[row][column]).to.be.a('string');
	});
	it('Random query 2 into Render2D returns a string', () => {
		let row = Math.floor(Math.random() * height);
		let column = Math.floor(Math.random() * width);
		expect(testModel.render2D('X', ' ')[row][column]).to.be.a('string');
	});
});

testModel.board.length;
