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

/// Control items:
var theView, theModel, theController;

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

//// FUNCTIONS

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

function updateSaveDialog() {
	saveLocalDimensions.textContent = `
	${theModel.height} cells wide X ${theModel.width} cells tall`;
}

function updateLoadResults() {
	loadResultsSelector.innerHTML = '';
	getLoadResults();
	loadResults.forEach((el, i) => {
		let option = document.createElement('option');
		option.value = i;
		option.textContent = el.name || 'No name provided';
		loadResultsSelector.appendChild(option);
	});
	setTimeout(() => {
		updateLoadResultsArea(0);
	}, 300);
}

function getLoadResults() {
	loadResults = [];
	for (let key in localStorage) {
		loadResults.push(JSON.parse(localStorage.getItem(key)));
	}
	loadResults = loadResults.filter(el => el !== null);
}

function updateLoadResultsArea(index) {
	loadResultsArea.innerHTML = '';
	let width = loadResults[index].width;
	let height = loadResults[index].height;
	let name = loadResults[index].name;
	setTimeout(() => {
		loadResultsArea.innerHTML = `<p>Pattern Name: ${name}</p>
	<p>Dimensions: ${width} wide X ${height} tall</p>`;
	}, 200);
}
