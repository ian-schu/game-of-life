class PlaybackControls {
	constructor(DOMrefManifest) {
		this.isPlaying = false;
		this.playButton = DOMrefManifest.playButton;
		this.stepButton = DOMrefManifest.stepButton;
		this.clearButton = DOMrefManifest.clearButton;
		this.quickSaveButton = DOMrefManifest.quickSaveButton;
		this.autoQuickSaveButton = DOMrefManifest.autoQuickSaveButton;
		this.revertButton = DOMrefManifest.revertButton;
		this.speedSelector = DOMrefManifest.speedSelector;
		this.fadeSelector = DOMrefManifest.fadeSelector;
	}
	play() {
		this.playButton.innerHTML = this.swapPlayButton();
		this.playButton.classList.toggle('round-button--active');
		this.isPlaying = this.isPlaying === true ? false : true;
	}

	swapPlayButton() {
		if (this.isPlaying) {
			return '<i class="fas fa-play">';
		} else {
			return '<i class="fas fa-pause"></i>';
		}
	}

	toggleAutoQuickSave() {
		this.autoQuickSaveButton.classList.toggle('round-button--active');
	}
}
