class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
		this.isPlaying = false;
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
			// console.log(this.model.grid[row][column]);
			// console.log(this.view.grid[row][column]);
		}
	}

	advance() {
		this.model.propagate();
		this.model.advance();
		this.view.redraw(this.model.grid);
	}

	play() {
		this.isPlaying = setInterval(() => {
			this.advance();
		}, 50);
		playButton.classList.toggle('playback--active');
	}

	stop() {
		clearInterval(this.isPlaying);
		this.isPlaying = false;
		playButton.classList.toggle('playback--active');
	}

	clear() {
		this.model.clear();
		this.view.redraw(this.model.grid);
	}
}
