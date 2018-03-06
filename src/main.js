// VARIABLES

var gameboard = document.getElementById('gameboard');
var palette = document.getElementById('palette');
var playback = document.getElementById('playback');

var stepButton = document.getElementById('stepButton');
var playButton = document.getElementById('playButton');
var stopButton = document.getElementById('stopButton');
var deleteButton = document.getElementById('deleteButton');

var newBoard = document.getElementById('newBoard');
var saveBoard = document.getElementById('saveBoard');
var loadBoard = document.getElementById('loadBoard');

var getInfo = document.getElementById('getInfo');
var infoFloater = document.getElementById('infoFloater');

var newGameFloater = document.getElementById('newGameFloater');
var newBoardWidth = document.getElementById('newBoardWidth');
var newBoardHeight = document.getElementById('newBoardHeight');
var newBoardSubmit = document.getElementById('newBoardSubmit');
var closeFloaterButtons = document.getElementsByClassName('closeFloaterButton');

var stats = document.getElementById('stats');

var populationNow = document.getElementById('populationNow');
var populationLast = document.getElementById('populationLast');
var birthRateNow = document.getElementById('birthRateNow');
var deathRateNow = document.getElementById('deathRateNow');
var netBirthRate = document.getElementById('netBirthRate');

var simSpeed = document.getElementById('simSpeed');
var cellFade = document.getElementById('cellFade');

var [theView, theModel, theController] = startNewBoard(70, 40, gameboard);

// LISTENERS

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
	document.styleSheets[2].rules[0].style.transitionDuration = cellFade.value;
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

for (let button of closeFloaterButtons) {
	button.addEventListener('click', ev => {
		ev.target.parentElement.style.display = 'none';
	});
}

// closeFloaterButtons[0].addEventListener('click', () => {
// 	showDialog(newGameFloater);
// });

getInfo.addEventListener('click', () => {
	showDialog(infoFloater);
});

newBoardSubmit.addEventListener('click', () => {
	gameboard.removeEventListener('mousedown', theController.cellClick, false);
	gameboard.removeEventListener('mouseover', theController.cellClick, false);

	let newWidth = newBoardWidth.value;
	let newHeight = newBoardHeight.value;

	[theView, theModel, theController] = startNewBoard(
		newWidth,
		newHeight,
		gameboard
	);

	gameboard.addEventListener('mousedown', theController.cellClick, false);
	gameboard.addEventListener('mouseover', theController.cellClick, false);
});

// Init functions, etc.

function updateStats() {
	populationNow.textContent = theModel.demographics.populationNow;
	populationLast.textContent = theModel.demographics.populationLast;
	birthRateNow.textContent = theModel.demographics.birthRateInstant;
	deathRateNow.textContent = theModel.demographics.deathRateInstant;
	netBirthRate.textContent = theModel.demographics.netBirthRate;
}

function startNewBoard(width, height, boardElement) {
	boardElement.innerHTML = '';
	let newView = new View(width, height, boardElement);
	let newModel = new Board(width, height);
	return [
		newView,
		newModel,
		new Controller(newView, newModel, findColor('black'))
	];
}

function showDialog(dialogName) {
	if (dialogName.style.display == 'block') {
		dialogName.style.display = 'none';
	} else {
		dialogName.style.display = 'block';
	}
}

generatePalette(startingColors, palette);
var allColors = document.querySelectorAll('.color');
