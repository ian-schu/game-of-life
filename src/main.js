// VARIABLES

var main = document.getElementById('main');

var gameboard = document.getElementById('gameboard');
var palette = document.getElementById('palette');
var playback = document.getElementById('playback');

var stepButton = document.getElementById('stepButton');
var playButton = document.getElementById('playButton');
var stopButton = document.getElementById('stopButton');
var deleteButton = document.getElementById('deleteButton');
var quickSaveButton = document.getElementById('quickSaveButton');
var autoQuickSaveButton = document.getElementById('autoQuickSaveButton');
var revertToQuickSaveButton = document.getElementById('revertToQuickSaveButton');

var newBoard = document.getElementById('newBoard');
var saveBoard = document.getElementById('saveBoard');
var loadBoard = document.getElementById('loadBoard');

var getInfo = document.getElementById('getInfo');
var infoFloater = document.getElementById('infoFloater');
var closeFloaterButtons = document.getElementsByClassName('closeFloaterButton');
var floaterHandles = document.getElementsByClassName('handle');

var saveLocalForm = document.getElementById('saveLocalForm');
var saveFloater = document.getElementById('saveFloater');
var saveLocalDimensions = document.getElementById('saveLocalDimensions');
var saveLocalName = document.getElementById('saveLocalName');
var saveLocalSubmit = document.getElementById('saveLocalSubmit');

var floaterMover = {
	movingNow: false,
	element: null,
	bufferX: 0,
	bufferY: 0
};

var newGameFloater = document.getElementById('newGameFloater');
var newBoardWidth = document.getElementById('newBoardWidth');
var newBoardHeight = document.getElementById('newBoardHeight');
var newBoardSubmit = document.getElementById('newBoardSubmit');

var stats = document.getElementById('stats');

var populationNow = document.getElementById('populationNow');
var populationLast = document.getElementById('populationLast');
var birthRateNow = document.getElementById('birthRateNow');
var deathRateNow = document.getElementById('deathRateNow');
var netBirthRate = document.getElementById('netBirthRate');

var simSpeed = document.getElementById('simSpeed');
var cellFade = document.getElementById('cellFade');

var [theView, theModel, theController] = startNewBoard(70, 40, gameboard);

// Init functions, etc.

function startNewBoard(width, height, boardElement) {
	boardElement.innerHTML = '';
	let newView = new View(width, height, boardElement);
	let newModel = new Board(width, height);
	return [newView, newModel, new Controller(newView, newModel, findColor('black'))];
}
