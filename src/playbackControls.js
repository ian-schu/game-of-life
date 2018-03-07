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
		this.playButton.innerHTML = '<i class="fas fa-pause"></i>';
		this.playButton.classList.add('round-button--active');
		this.isPlaying = true;
	}

	stop() {
		this.playButton.innerHTML = '<i class="fas fa-play">';
		this.playButton.classList.remove('round-button--active');
		this.isPlaying = false;
	}

	toggleAutoQuickSave() {
		this.autoQuickSaveButton.classList.toggle('round-button--active');
	}
}
