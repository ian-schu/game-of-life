class miniController {
	constructor(view, model, playerElement, playSpeed) {
		this.view = view;
		this.model = model;
		this.player = playerElement;
		this.isPlaying = false;
		this.playSpeed = playSpeed;
		this.playInterval = 0;
		this.basePattern = model.quickSave;

		this.addPlaybackListeners = this.addPlaybackListeners.bind(this);
		this.play = this.play.bind(this);
		this.stop = this.stop.bind(this);
		this.advance = this.advance.bind(this);
		this.clickPlay = this.clickPlay.bind(this);
		this.rotate = this.rotate.bind(this);
		this.flip = this.flip.bind(this);
		this.get = this.get.bind(this);

		this.addPlaybackListeners();
		this.view.redraw(this.model, 'white');
	}

	addPlaybackListeners() {
		this.player.addEventListener('mouseenter', this.clickPlay, false);
		this.player.addEventListener('mouseleave', this.stop, false);
	}

	clickPlay() {
		if (this.isPlaying) {
			this.stop();
		} else {
			this.play();
		}
	}

	play() {
		this.playInterval = setInterval(() => {
			this.advance();
		}, this.playSpeed);
		this.isPlaying = true;
	}

	stop() {
		clearInterval(this.playInterval);
		this.isPlaying = false;
		this.model.revertToQuickSave();
		this.view.redraw(this.model, 'white');
	}

	advance() {
		this.model.propagateBoard();
		this.model.advance();
		this.view.redraw(this.model, 'white');
	}

	rotate() {
		this.model.rotate();
		this.view.redraw(this.model, 'white');
	}

	flip() {
		this.model.flip();
		this.view.redraw(this.model, 'white');
	}

	get() {
		patternDropper.style.display = 'block';
		loadDropper(this.model.quickSave);
	}
}
