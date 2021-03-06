// Initial logic:

// INITs

var thePalette = new Palette(startingColors, palette);

var allColors = document.querySelectorAll('.color');

// LISTENERS

function addListeners() {
	for (let button of closeFloaterButtons) {
		button.addEventListener('click', ev => {
			ev.target.parentElement.style.display = 'none';
		});
	}

	for (let thisFloater of floaters) {
		thisFloater.addEventListener('mousedown', () => {
			floaterTopZIndex++;
			thisFloater.style.zIndex = floaterTopZIndex;
		});
	}

	for (let handle of floaterHandles) {
		handle.addEventListener('mousedown', handleMouseDown);
		handle.addEventListener('mouseup', () => {
			floaterMover.movingNow = false;
			floaterMover.element = null;
			floaterMover.bufferX = null;
			floaterMover.bufferY = null;
		});
	}

	gameboard.addEventListener('mousedown', theController.cellClick, false);
	gameboard.addEventListener('mouseover', theController.cellClick, false);

	palette.addEventListener('click', ev => {
		if (ev.target.classList.contains('color')) {
			theController.selectColor(ev.target);
		}
	});

	document.addEventListener('keypress', ev => {
		let active = document.activeElement;
		// console.log(ev);
		if (ev.key === ' ' && active.tagName != 'INPUT') {
			ev.preventDefault();
			active.blur();
			theController.clickPlay();
		}
		if (ev.key === '\\') {
			expand.click();
		}
		if ((ev.which == 13 || ev.keyCode == 13) && patternDropper.style.display === 'block') {
			dropPatternButton.click();
		}
		if (ev.key == '.' && active.tagName != 'INPUT') {
			playbackControlManifest.stepButton.click();
			createToast('Advancing one step', 'green');
		}
		if (ev.code == 'KeyD' && active.tagName != 'INPUT') {
			playbackControlManifest.clearButton.click();
		}
		if (ev.code == 'KeyR' && active.tagName != 'INPUT') {
			playbackControlManifest.revertButton.click();
		}
		if (ev.code == 'KeyA' && active.tagName != 'INPUT') {
			playbackControlManifest.autoQuickSaveButton.click();
		}
		if (ev.code == 'KeyQ' && active.tagName != 'INPUT') {
			playbackControlManifest.quickSaveButton.click();
		}
	});

	newBoard.addEventListener('click', () => {
		showDialog(newGameFloater);
	});

	saveBoard.addEventListener('click', () => {
		updateSaveDialog();
		showDialog(saveFloater);
	});

	loadBoard.addEventListener('click', () => {
		showDialog(loadFloater);
		updateLoadResults();
	});

	tooltipToggle.addEventListener('change', () => {
		let elsWithTips = document.querySelectorAll('[data-tippy]');
		if (tooltipToggle.checked) {
			for (let el of elsWithTips) {
				el._tippy.enable();
			}
		} else {
			for (let el of elsWithTips) {
				el._tippy.disable();
			}
		}
	});

	loadResultsSelector.addEventListener('input', () => {
		updateLoadResultsArea(loadResultsSelector.value);
	});

	saveLocalSubmit.addEventListener('click', ev => {
		if (saveLocalForm.checkValidity()) {
			ev.preventDefault();
			theController.makeFullSave(saveLocalName.value);
		} else {
			saveLocalForm.click();
		}
	});

	window.addEventListener('mousemove', handleMoveElement);

	getInfo.addEventListener('click', () => {
		showDialog(infoFloater);
	});

	newBoardSubmit.addEventListener('click', () => {
		gameboard.removeEventListener('mousedown', theController.cellClick, false);
		gameboard.removeEventListener('mouseover', theController.cellClick, false);

		let newWidth = Number.parseInt(newBoardWidth.value);
		let newHeight = Number.parseInt(newBoardHeight.value);

		[theView, theModel, theController] = startNewBoard(newWidth, newHeight, gameboard);
		createToast(`Created new board with dimensions ${newWidth} x ${newHeight}`);
		gameboard.addEventListener('mousedown', theController.cellClick, false);
		gameboard.addEventListener('mouseover', theController.cellClick, false);
	});
}

tippy('[title]', {
	theme: 'light',
	arrow: true
});

startGameSubmit.addEventListener(
	'click',
	ev => {
		if (startGameForm.checkValidity()) {
			ev.preventDefault();
			initialStartGame();
		} else {
			startGameSubmit.click();
		}
	},
	false
);

function initialStartGame() {
	let width = startBoardWidth.value;
	let height = startBoardHeight.value;
	[theView, theModel, theController] = startNewBoard(width, height, gameboard);
	container.style.display = 'block';
	video.style.opacity = 0;
	setTimeout(() => {
		container.style.opacity = 1;
		start.style.opacity = 0;
		container.style.backgroundColor = 'hsla(0, 0%, 80%, 0.85)';
	}, 200);
	setTimeout(() => {
		addListeners();
	}, 0);
	setTimeout(() => {
		start.display = 'none';
		start.remove();
		startWrapper.display = 'none';
		startWrapper.remove();
	}, 1500);
	setTimeout(() => {
		video.remove();
	}, 90000);
}

video.playbackRate = 0.75;

// var [theView, theModel, theController] = startNewBoard(70, 40, gameboard);

// Init functions, etc.

function startNewBoard(width, height, boardElement) {
	boardElement.innerHTML = '';
	let newView = new View(width, height, boardElement);
	let newModel = new Board(width, height);
	return [
		newView,
		newModel,
		new Controller(newView, newModel, thePalette, thePlaybackControls, theDemographics)
	];
}

thePalette.colors[32].addEventListener('dblclick', () => {
	theController.timMode = true;
	createToast(`Tim Mode enabled!`, 'yellow');
});
