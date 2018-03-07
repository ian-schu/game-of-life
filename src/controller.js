class Controller {
	constructor(view, model, startColor, playbackObj, demographicsObj) {
		this.view = view;
		this.model = model;
		this.currentColor = startColor;
		this.playDelayMs = 120;
		this.isPlaying = false;
		this.autoQuickSave = false;
		this.cellClick = this.cellClick.bind(this);
		this.playback = playbackObj;
		this.demographics = demographicsObj;
	}

	toggleAutoQuickSave() {
		this.autoQuickSave = this.autoQuickSave ? false : true;
		this.playback.toggleAutoQuickSave();
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
			this.demographics.updateDemographics(this.model.demographyData);
			// console.log(this.model.grid[row][column]);
			// console.log(this.view.grid[row][column]);
		}
	}

	advance() {
		this.model.propagateBoard();
		this.model.advance();
		this.view.redraw(this.model);
		this.demographics.updateDemographics(this.model.demographyData);
	}

	play() {
		this.playback.play();

		if (!this.isPlaying) {
			if (this.autoQuickSave) {
				this.makeQuickSave();
			}
			stats.classList.toggle('stats--playing');
			this.isPlaying = setInterval(() => {
				this.advance();
			}, this.playDelayMs);
		}
	}

	stop() {
		stats.classList.toggle('stats--playing');
		clearInterval(this.isPlaying);
		this.isPlaying = false;
		playButton.classList.toggle('playback--active');
		playButton.classList.toggle('round-button--active');
	}

	makeFullSave(saveName) {
		let saveObj = this.model.generateFullSave();
		saveObj.name = saveName;
		localStorage.setItem(saveName, JSON.stringify(saveObj));
	}

	makeQuickSave() {
		this.model.makeQuickSave();
	}

	revertToQuickSave() {
		this.model.revertToQuickSave();
		this.view.redraw(this.model.grid);
		this.demographics.updateDemographics(this.model.demographyData);
	}

	clear() {
		this.model.clear();
		this.view.redraw(this.model.grid);
		this.demographics.updateDemographics(this.model.demographyData);
	}
}
