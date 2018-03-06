//// FUNCTIONS

function updateStats() {
	populationNow.textContent = theModel.demographics.populationNow;
	populationLast.textContent = theModel.demographics.populationLast;
	birthRateNow.textContent = theModel.demographics.birthRateInstant;
	deathRateNow.textContent = theModel.demographics.deathRateInstant;
	netBirthRate.textContent = theModel.demographics.netBirthRate;
}

function showDialog(dialogName) {
	if (dialogName.style.display == 'block') {
		dialogName.style.display = 'none';
	} else {
		dialogName.style.display = 'block';
	}
}

function handleMouseDown(ev) {
	floaterMover.movingNow = true;
	floaterMover.element = ev.target.parentElement;
	floaterMover.bufferX = ev.clientX - floaterMover.element.offsetLeft;
	floaterMover.bufferY = ev.clientY - floaterMover.element.offsetTop;
}

function handleMoveElement(ev) {
	if (floaterMover.movingNow) {
		floaterMover.element.style.left =
			(ev.clientX - floaterMover.bufferX) / window.innerWidth * 100 + '%';
		floaterMover.element.style.top =
			(ev.clientY - floaterMover.bufferY) / window.innerHeight * 100 + '%';
	}
}

// INITs

generatePalette(startingColors, palette);
var allColors = document.querySelectorAll('.color');

// LISTENERS

for (let button of closeFloaterButtons) {
	button.addEventListener('click', ev => {
		ev.target.parentElement.style.display = 'none';
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
stopButton.addEventListener('click', () => theController.stop(), false);
clearButton.addEventListener('click', () => theController.clear(), false);

simSpeed.addEventListener('input', () => {
	theController.playDelayMs = Number.parseInt(simSpeed.value);
	document.body.focus();
});
cellFade.addEventListener('input', () => {
	document.styleSheets[3].rules[0].style.transitionDuration = cellFade.value;
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
	if (ev.key === ' ') {
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

window.addEventListener('mousemove', handleMoveElement);

getInfo.addEventListener('click', () => {
	showDialog(infoFloater);
});

newBoardSubmit.addEventListener('click', () => {
	gameboard.removeEventListener('mousedown', theController.cellClick, false);
	gameboard.removeEventListener('mouseover', theController.cellClick, false);

	let newWidth = newBoardWidth.value;
	let newHeight = newBoardHeight.value;

	[theView, theModel, theController] = startNewBoard(newWidth, newHeight, gameboard);

	gameboard.addEventListener('mousedown', theController.cellClick, false);
	gameboard.addEventListener('mouseover', theController.cellClick, false);
});
