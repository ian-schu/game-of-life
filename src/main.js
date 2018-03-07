function findID(idString) {
	return document.getElementById(idString);
}

// Set up video, start form, and container interactions:
var video = findID('videoBackground');
var container = findID('container');
var start = findID('start');
var startGameForm = findID('startGameForm');
var startBoardWidth = findID('startBoardWidth');
var startBoardHeight = findID('startBoardHeight');
var startGameSubmit = findID('startGameSubmit');

function initialStartGame() {
	let width = startBoardWidth.value;
	let height = startBoardHeight.value;
	container.style.display = 'block';
	setTimeout(() => {
		container.style.opacity = 1;
		start.style.opacity = 0;
		container.style.backgroundColor = 'hsla(0, 0%, 80%, 0.85)';
	}, 200);
	setTimeout(() => {
		start.display = 'none';
		start.remove();
	}, 1500);
	setTimeout(() => {
		video.remove();
	}, 90000);
}

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

video.playbackRate = 0.75;
video.style.opacity = 0;

// VARIABLES
var main = findID('main');
var gameboard = findID('gameboard');
var palette = findID('palette');

// Playback Controls setup:

var playbackControlManifest = {
	playbackContainer: findID('playback'),
	stepButton: findID('stepButton'),
	playButton: findID('playButton'),
	stopButton: findID('stopButton'),
	clearButton: findID('deleteButton'),
	quickSaveButton: findID('quickSaveButton'),
	autoQuickSaveButton: findID('autoQuickSaveButton'),
	revertButton: findID('revertToQuickSaveButton'),
	speedSelector: findID('simSpeed'),
	fadeSelector: findID('cellFade')
};

var thePlaybackControls = new PlaybackControls(playbackControlManifest);

// File menu items:

var newBoard = findID('newBoard');
var saveBoard = findID('saveBoard');
var loadBoard = findID('loadBoard');

// File menu form elements
var newGameFloater = findID('newGameFloater');
var newBoardWidth = findID('newBoardWidth');
var newBoardHeight = findID('newBoardHeight');
var newBoardSubmit = findID('newBoardSubmit');

var saveLocalForm = findID('saveLocalForm');
var saveFloater = findID('saveFloater');
var saveLocalDimensions = findID('saveLocalDimensions');
var saveLocalName = findID('saveLocalName');
var saveLocalSubmit = findID('saveLocalSubmit');

var loadResults = [];
var loadFloater = findID('loadFloater');
var loadResultsArea = findID('loadResultsArea');
var loadResultsSelector = findID('loadResultsSelector');

// Misc UI components:
var getInfo = findID('getInfo');
var infoFloater = findID('infoFloater');
var closeFloaterButtons = document.getElementsByClassName('closeFloaterButton');
var floaters = document.getElementsByClassName('floater');
var floaterHandles = document.getElementsByClassName('handle');
var floaterTopZIndex = 10;

var floaterMover = {
	movingNow: false,
	element: null,
	bufferX: 0,
	bufferY: 0
};

// Demographics setup:

var stats = findID('stats');

var demographicManifest = {
	populationNow: findID('populationNow'),
	populationLast: findID('populationLast'),
	birthRateNow: findID('birthRateNow'),
	deathRateNow: findID('deathRateNow'),
	netBirthRate: findID('netBirthRate')
};

var theDemographics = new Demographics(demographicManifest);

var [theView, theModel, theController] = startNewBoard(70, 40, gameboard);

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
