var gameboard = document.getElementById('gameboard');
var palette = document.getElementById('palette');
var playback = document.getElementById('playback');
var stepButton = document.getElementById('stepButton');

class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
		this.cellClick = this.cellClick.bind(this);
	}

	cellClick(ev) {
		if (
			ev.target.className === 'cell' &&
			(ev.buttons === 1 || ev.type === 'click')
		) {
			let row = ev.target.dataset.y;
			let column = ev.target.dataset.x;
			this.model.activateCell(column, row);
			this.view.colorCell(column, row, 'black');
			console.log(this.model.grid[row][column]);
			console.log(this.view.grid[row][column]);
		}
	}

	advance() {
		this.model.propagate();
		this.model.advance();
		this.view.redraw(this.model.grid);
	}
}

var theView = new View(40, 25, gameboard);
var theModel = new Board(40, 25);
var controller = new Controller(theView, theModel);

gameboard.addEventListener('mousedown', controller.cellClick, false);
gameboard.addEventListener('mouseover', controller.cellClick, false);

stepButton.addEventListener(
	'click',
	() => {
		controller.advance();
	},
	false
);
