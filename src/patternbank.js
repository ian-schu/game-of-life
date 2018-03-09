// PatternBank items:
var patternbank = findID('patternbank');
var expand = findID('expand');
var collapse = findID('collapse');

var patternbankInner = findID('patternbank-inner');
patternbankInner.style.top = '0%';

expand.addEventListener('click', () => {
	patternbank.style.left = '85%';
});

collapse.addEventListener('click', () => {
	patternbank.style.left = '99.5%';
});

patternbank.addEventListener('wheel', ev => {
	let fractionalChange = ev.deltaY / window.innerHeight;
	// console.log(`Fractional change is: ${fractionalChange}`);
	let currentPosition = Number.parseFloat(patternbankInner.style.top) / 100;
	// console.log(`Current position is: ${currentPosition}`);
	let newPosition = (currentPosition - fractionalChange) * 100;
	// console.log(`New position should be: ${newPosition}`);
	patternbankInner.style.top = `${newPosition}%`;

	// patternbankInner.style.top = `${cleanedTopValue}px`;
});

var _ = false;

// Begin initializing individual patterns:

//// GLIDER

var gliderBoard = findID('container-glider');

var gliderRawPattern = [
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, 1, _, _, _, _, _, _, _, _, _],
	[_, _, _, 1, _, _, _, _, _, _, _, _],
	[_, 1, 1, 1, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _]
];

var gliderView = new View(12, 12, gliderBoard);
var gliderModel = new Board(12, 12);
gliderModel.quickSave = gliderModel.rawArrayToQuickSave(gliderRawPattern);
gliderModel.revertToQuickSave();
var gliderMini = new miniController(gliderView, gliderModel, gliderBoard, 80);

findID('glider-get').addEventListener('click', gliderMini.get, false);
findID('glider-rotate').addEventListener('click', gliderMini.rotate, false);
findID('glider-flip').addEventListener('click', gliderMini.flip, false);

//// PENTA

var pentaBoard = findID('container-penta');

var pentaRawPattern = [
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _]
];

var pentaView = new View(20, 20, pentaBoard);
var pentaModel = new Board(20, 20);
pentaModel.quickSave = pentaModel.rawArrayToQuickSave(pentaRawPattern);
pentaModel.revertToQuickSave();
var pentaMini = new miniController(pentaView, pentaModel, pentaBoard, 150);

findID('penta-get').addEventListener('click', pentaMini.get, false);
findID('penta-rotate').addEventListener('click', pentaMini.rotate, false);
findID('penta-flip').addEventListener('click', pentaMini.flip, false);

//// PULSAR

var pulsarBoard = findID('container-pulsar');

var pulsarRawPattern = [
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, 1, 1, 1, _, _, _, 1, 1, 1, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, 1, _, _, _, _, 1, _, 1, _, _, _, _, 1, _, _, _],
	[_, _, _, 1, _, _, _, _, 1, _, 1, _, _, _, _, 1, _, _, _],
	[_, _, _, 1, _, _, _, _, 1, _, 1, _, _, _, _, 1, _, _, _],
	[_, _, _, _, _, 1, 1, 1, _, _, _, 1, 1, 1, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, 1, 1, 1, _, _, _, 1, 1, 1, _, _, _, _, _],
	[_, _, _, 1, _, _, _, _, 1, _, 1, _, _, _, _, 1, _, _, _],
	[_, _, _, 1, _, _, _, _, 1, _, 1, _, _, _, _, 1, _, _, _],
	[_, _, _, 1, _, _, _, _, 1, _, 1, _, _, _, _, 1, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, 1, 1, 1, _, _, _, 1, 1, 1, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _]
];

var pulsarView = new View(19, 19, pulsarBoard);
var pulsarModel = new Board(19, 19);
pulsarModel.quickSave = pulsarModel.rawArrayToQuickSave(pulsarRawPattern);
pulsarModel.revertToQuickSave();
var pulsarMini = new miniController(pulsarView, pulsarModel, pulsarBoard, 200);

findID('pulsar-get').addEventListener('click', pulsarMini.get, false);
findID('pulsar-rotate').addEventListener('click', pulsarMini.rotate, false);
findID('pulsar-flip').addEventListener('click', pulsarMini.flip, false);

//// LWSS

var lwssBoard = findID('container-lwss');

var lwssRawPattern = [
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, 1, _, _, 1, _, _, _, _, _],
	[_, _, 1, _, _, _, _, _, _, _, _, _],
	[_, _, 1, _, _, _, 1, _, _, _, _, _],
	[_, _, 1, 1, 1, 1, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _]
];

var lwssView = new View(12, 12, lwssBoard);
var lwssModel = new Board(12, 12);
lwssModel.quickSave = lwssModel.rawArrayToQuickSave(lwssRawPattern);
lwssModel.revertToQuickSave();
var lwssMini = new miniController(lwssView, lwssModel, lwssBoard, 80);

findID('lwss-get').addEventListener('click', lwssMini.get, false);
findID('lwss-rotate').addEventListener('click', lwssMini.rotate, false);
findID('lwss-flip').addEventListener('click', lwssMini.flip, false);

//// DART

var dartBoard = findID('container-dart');

var dartRawPattern = [
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, 1, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, 1, _, 1, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, 1, _, _, _, 1, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, 1, 1, 1, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, 1, 1, _, _, _, 1, 1, _, _, _, _, _, _, _],
	[_, _, _, _, _, 1, _, _, _, 1, _, 1, _, _, _, 1, _, _, _, _, _],
	[_, _, _, _, 1, 1, _, _, _, 1, _, 1, _, _, _, 1, 1, _, _, _, _],
	[_, _, _, 1, _, _, _, _, _, 1, _, 1, _, _, _, _, _, 1, _, _, _],
	[_, _, _, _, 1, _, 1, 1, _, 1, _, 1, _, 1, 1, _, 1, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _]
];

var dartView = new View(21, 21, dartBoard);
var dartModel = new Board(21, 21);
dartModel.quickSave = dartModel.rawArrayToQuickSave(dartRawPattern);
dartModel.revertToQuickSave();
var dartMini = new miniController(dartView, dartModel, dartBoard, 80);

findID('dart-get').addEventListener('click', dartMini.get, false);
findID('dart-rotate').addEventListener('click', dartMini.rotate, false);
findID('dart-flip').addEventListener('click', dartMini.flip, false);

//// PATTERN DROPPER FLOATER

patternDropper = document.getElementById('patternDropperFloater');
dropperBoard = document.getElementById('dropperBoard');
dropperGrid = [];

function loadDropper(quickSave) {
	dropperGrid = [];
	dropperBoard.innerHTML = '';
	let newHeight = quickSave.length;
	let cellHeight = theView.grid[0][0].clientHeight;
	let newWidth = quickSave[0].length;
	let cellWidth = theView.grid[0][0].clientWidth;

	dropperBoard.style.width = `${newWidth * cellWidth}px`;
	dropperBoard.style.height = `${newHeight * cellHeight}px`;
	patternDropper.style.width = `${newWidth * cellWidth + 50}px`;
	patternDropper.style.height = `${newHeight * cellHeight + 50}px`;

	Array2D.eachCell(quickSave, (cell, row, column) => {
		let newCell = document.createElement('div');
		newCell.className = 'dropperCell';
		newCell.dataset.x = column;
		newCell.dataset.y = row;
		newCell.style.width = `${cellWidth}px`;
		newCell.style.height = `${cellHeight}px`;
		if (cell.alive) {
			newCell.style.background = thePalette.currentColor;
			newCell.dataset.alive = 'true';
		}
		dropperBoard.appendChild(newCell);
		dropperGrid.push(newCell);
	});
}

dropPatternButton = document.getElementById('dropPatternButton');
dropPatternButton.addEventListener('click', dropHere, false);

function dropHere() {
	let startCoordinate = [0, 0];
	let startBounds = dropperGrid[0].getBoundingClientRect();
	startCoordinate[0] = startBounds.x + startBounds.width / 2;
	startCoordinate[1] = startBounds.y + startBounds.height / 2;
	patternDropper.style.display = 'none';
	let startCell = document.elementFromPoint(startCoordinate[0], startCoordinate[1]);
	let startRow = Number.parseInt(startCell.dataset.y);
	let startColumn = Number.parseInt(startCell.dataset.x);
	let currentRow = 0;
	let currentColumn = 0;
	dropperGrid.forEach(cell => {
		if (cell.dataset.alive) {
			currentRow = startRow + Number.parseInt(cell.dataset.y);
			currentColumn = startColumn + Number.parseInt(cell.dataset.x);
			theModel.grid[currentRow][currentColumn].born();
			theModel.grid[currentRow][currentColumn].color = thePalette.currentColor;
		}
	});
	patternDropper.style.display = 'block';
	theView.redraw(theModel, 'white');
}
