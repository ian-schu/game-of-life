// Initial logic:

// INITs

generatePalette(startingColors, palette);
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

	stepButton.addEventListener('click', () => theController.advance(), false);
	playButton.addEventListener('click', () => theController.play(), false);
	clearButton.addEventListener('click', () => theController.clear(), false);
	quickSaveButton.addEventListener('click', () => theController.makeQuickSave(), false);
	revertToQuickSaveButton.addEventListener('click', () => theController.revertToQuickSave(), false);
	autoQuickSaveButton.addEventListener(
		'click',
		() => {
			theController.toggleAutoQuickSave();
		},
		false
	);

	simSpeed.addEventListener('input', () => {
		theController.playDelayMs = Number.parseInt(simSpeed.value);
		document.body.focus();
	});
	cellFade.addEventListener('input', () => {
		document.styleSheets[4].rules[0].style.transitionDuration = cellFade.value;
		document.body.focus();
	});

	palette.addEventListener('click', ev => {
		if (ev.target.classList.contains('color')) {
			ev.target.classList.add('color--selected');
			theController.currentColor.classList.remove('color--selected');
			theController.currentColor = ev.target;
		}
	});

	document.addEventListener('keydown', ev => {
		if (ev.key === ' ' && document.activeElement.tagName != 'INPUT') {
			if (!theController.isPlaying) {
				playButton.click();
			} else {
				stopButton.click();
			}
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
	}, 1500);
	setTimeout(() => {
		video.remove();
	}, 90000);
}

video.playbackRate = 0.75;
video.style.opacity = 0;

// var [theView, theModel, theController] = startNewBoard(70, 40, gameboard);

// Init functions, etc.

function startNewBoard(width, height, boardElement) {
	boardElement.innerHTML = '';
	let newView = new View(width, height, boardElement);
	let newModel = new Board(width, height);
	return [
		newView,
		newModel,
		new Controller(newView, newModel, findColor('black'), thePlaybackControls, theDemographics)
	];
}
