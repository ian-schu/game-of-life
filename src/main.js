var gameboard = document.getElementById('gameboard');
var palette = document.getElementById('palette');
var playback = document.getElementById('playback');

var stepButton = document.getElementById('stepButton');
var playButton = document.getElementById('playButton');
var stopButton = document.getElementById('stopButton');
var deleteButton = document.getElementById('deleteButton');

var theView = new View(40, 25, gameboard);
var theModel = new Board(40, 25);
var controller = new Controller(theView, theModel);

gameboard.addEventListener('mousedown', controller.cellClick, false);
gameboard.addEventListener('mouseover', controller.cellClick, false);

stepButton.addEventListener('click', () => controller.advance(), false);
playButton.addEventListener('click', () => controller.play(), false);
stopButton.addEventListener('click', () => controller.stop(), false);
clearButton.addEventListener('click', () => controller.clear(), false);

document.addEventListener('keydown', ev => {
	if (ev.key === ' ') {
		if (!controller.isPlaying) {
			playButton.click();
		} else {
			stopButton.click();
		}
	}
});
