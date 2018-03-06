class Controller {
	constructor(view, model, startColor) {
		this.view = view;
		this.model = model;
		this.currentColor = startColor;
		this.playDelayMs = 120;
		this.isPlaying = false;
		this.cellClick = this.cellClick.bind(this);
	}

	cellClick(ev) {
		if (
			floaterMover.movingNow === false &&
			ev.target.className === 'cell' &&
			(ev.buttons === 1 || ev.type === 'click')
		) {
			let row = ev.target.dataset.y;
			let column = ev.target.dataset.x;
			if (this.currentColor.dataset.color === 'white') {
				this.model.killCell(column, row);
			} else {
				this.model.activateCell(column, row, this.currentColor.dataset.color);
			}
			this.view.colorCell(column, row, this.currentColor.dataset.color);
			// console.log(this.model.grid[row][column]);
			// console.log(this.view.grid[row][column]);
		}
	}

	advance() {
		this.model.propagateBoard();
		this.model.advance();
		this.view.redraw(this.model.grid);
		updateStats();
	}

	play() {
		if (!this.isPlaying) {
			stats.classList.toggle('stats--playing');
			this.isPlaying = setInterval(() => {
				this.advance();
			}, this.playDelayMs);
			playButton.classList.toggle('playback--active');
		}
	}

	stop() {
		stats.classList.toggle('stats--playing');
		clearInterval(this.isPlaying);
		this.isPlaying = false;
		playButton.classList.toggle('playback--active');
	}

	clear() {
		this.model.clear();
		this.view.redraw(this.model.grid);
		updateStats();
	}
}
