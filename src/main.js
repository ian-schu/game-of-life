// VARIABLES

var gameboard = document.getElementById('gameboard');
var palette = document.getElementById('palette');
var playback = document.getElementById('playback');

var stepButton = document.getElementById('stepButton');
var playButton = document.getElementById('playButton');
var stopButton = document.getElementById('stopButton');
var deleteButton = document.getElementById('deleteButton');

var simSpeed = document.getElementById('simSpeed');
var cellFade = document.getElementById('cellFade');

var theView = new View(70, 40, gameboard);
var theModel = new Board(70, 40);
var theController = new Controller(theView, theModel, findColor('black'));

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

// Other init functions

generatePalette(startingColors, palette);
var allColors = document.querySelectorAll('.color');
