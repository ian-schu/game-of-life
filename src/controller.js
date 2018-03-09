class Controller {
	constructor(view, model, palette, playbackObj, demographicsObj) {
		this.view = view;
		this.model = model;
		this.palette = palette;
		this.playDelayMs = 120;
		this.isPlaying = false;
		this.playInterval = 0;
		this.autoQuickSave = false;
		this.playback = playbackObj;
		this.demographics = demographicsObj;
		this.timMode = false;

		// Bind all the THIS's
		this.cellClick = this.cellClick.bind(this);
		this.advance = this.advance.bind(this);
		this.clickPlay = this.clickPlay.bind(this);
		this.play = this.play.bind(this);
		this.stop = this.stop.bind(this);
		this.clear = this.clear.bind(this);
		this.changePlaybackSpeed = this.changePlaybackSpeed.bind(this);
		this.changeCellFade = this.changeCellFade.bind(this);
		this.addPlaybackListeners = this.addPlaybackListeners.bind(this);
		this.makeQuickSave = this.makeQuickSave.bind(this);
		this.revertToQuickSave = this.revertToQuickSave.bind(this);
		this.toggleAutoQuickSave = this.toggleAutoQuickSave.bind(this);
		this.operationTimothy = this.operationTimothy.bind(this);

		this.addPlaybackListeners();
	}

	addPlaybackListeners() {
		this.playback.stepButton.addEventListener('click', this.advance, false);
		this.playback.playButton.addEventListener('click', this.clickPlay, false);

		this.playback.clearButton.addEventListener('click', this.clear, false);
		this.playback.quickSaveButton.addEventListener('click', this.makeQuickSave, false);
		this.playback.revertButton.addEventListener('click', this.revertToQuickSave, false);
		this.playback.autoQuickSaveButton.addEventListener('click', this.toggleAutoQuickSave, false);

		this.playback.speedSelector.addEventListener('input', this.changePlaybackSpeed, false);
		this.playback.fadeSelector.addEventListener('input', this.changeCellFade, false);
	}

	changePlaybackSpeed() {
		this.playDelayMs = Number.parseInt(this.playback.speedSelector.value);
		createToast(`Play speed changed to: ${this.playback.speedSelector.value}ms`);
	}

	changeCellFade() {
		Array2D.eachCell(this.view.grid, cell => {
			cell.style.transitionDuration = this.playback.fadeSelector.value;
		});
		createToast(`Cell fade speed set to: ${this.playback.fadeSelector.value}ms`);
	}

	toggleAutoQuickSave() {
		this.autoQuickSave = this.autoQuickSave ? false : true;
		this.playback.toggleAutoQuickSave();
		createToast(`Auto Quicksave is set to: ${this.autoQuickSave}`);
	}

	selectColor(selection) {
		this.palette.selectColor(selection);
	}

	cellClick(ev) {
		if (
			floaterMover.movingNow === false &&
			ev.target.className === 'cell' &&
			(ev.buttons === 1 || ev.type === 'click')
		) {
			let row = ev.target.dataset.y;
			let column = ev.target.dataset.x;

			if (this.palette.currentColor == this.palette.deadColor) {
				this.model.cellClick(row, column, this.palette.currentColor, false);
				this.cellChangeColor(row, column);
			} else {
				this.model.cellClick(row, column, this.palette.currentColor, true);
				this.cellChangeColor(row, column);
			}

			this.demographics.updateDemographics(this.model.demographyData);
			// console.log(this.model.grid[row][column]);
			// console.log(this.view.grid[row][column]);
		}
	}

	cellChangeColor(row, column) {
		if (this.timMode) {
			this.view.cellChangeColorTim(row, column);
		} else {
			this.view.cellChangeColor(row, column, this.palette.currentColor);
		}
	}

	advance() {
		this.model.propagateBoard();
		this.model.advance();
		if (this.timMode) {
			this.view.redrawTim(this.model);
		} else {
			this.view.redraw(this.model, this.palette.deadColor);
		}
		this.demographics.updateDemographics(this.model.demographyData);
	}

	clickPlay() {
		if (this.isPlaying) {
			this.stop();
		} else if (!this.isPlaying && this.autoQuickSave) {
			this.makeQuickSave();
			this.play();
		} else {
			this.play();
		}
	}

	play() {
		createToast(`Playing now`, 'green');
		this.playback.play();
		stats.classList.add('stats--playing');
		this.playInterval = setInterval(() => {
			this.advance();
		}, this.playDelayMs);
		this.isPlaying = true;
		document.body.focus();
	}

	stop() {
		createToast(`Stopping now`, 'red');
		this.playback.stop();
		stats.classList.remove('stats--playing');
		clearInterval(this.playInterval);
		this.isPlaying = false;
		document.body.focus();
	}

	makeFullSave(saveName) {
		let saveObj = this.model.generateFullSave();
		saveObj.name = saveName;
		createToast(`Saved your board "${saveName}"`);
		localStorage.setItem(saveName, JSON.stringify(saveObj));
	}

	makeQuickSave() {
		createToast(`Quicksave captured`);
		this.model.makeQuickSave();
	}

	revertToQuickSave() {
		createToast(`Reverted to quicksave`, 'yellow');
		this.model.revertToQuickSave();
		this.view.redraw(this.model, this.palette.deadColor);
		this.demographics.updateDemographics(this.model.demographyData);
	}

	clear() {
		createToast(`Clearing board`, 'red');
		this.model.clear(this.palette.deadColor);
		this.view.redraw(this.model, this.palette.deadColor);
		this.demographics.updateDemographics(this.model.demographyData);
	}

	operationTimothy() {
		Array2D.eachCell(this.view.grid, cell => {
			if (cell.background === 'white') {
				cell.innerHTML = '';
			} else {
				cell.innerHTML = `<img src="turtle.png">`;
			}
		});
		// if (this.model.demographyData.populationNow >= 100) {
		// 	// let randomPick = Math.floor(Math.random() * 2477);
		// 	// let randomEmoji = theEmojis[randomPick];
		// 	// let randomRow = Math.floor(Math.random() * this.model.height);
		// 	// let randomColumn = Math.floor(Math.random() * this.model.width);
		// 	// this.view.grid[randomRow][randomColumn].textContent = randomEmoji;
		// 	this.view.grid[randomRow][randomColumn].innerHTML = `<img src="turtle.png">`;
		// // 	createToast(`Added 🐢 to the board`, 'yellow');
		// }
	}
}
