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
	[_, _, 1, _, _, _, _, _, _, _, _, _],
	[_, _, _, 1, _, _, _, _, _, _, _, _],
	[_, 1, 1, 1, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _]
];

var gliderView = new View(12, 10, gliderBoard);
var gliderModel = new Board(12, 10);
gliderModel.quickSave = gliderModel.rawArrayToQuickSave(gliderRawPattern);
gliderModel.revertToQuickSave();
var gliderMini = new miniController(gliderView, gliderModel, gliderBoard, 80);

//// PENTA

var pentaBoard = findID('container-penta');

var pentaRawPattern = [
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
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _]
];

var pentaView = new View(20, 11, pentaBoard);
var pentaModel = new Board(20, 11);
pentaModel.quickSave = pentaModel.rawArrayToQuickSave(pentaRawPattern);
pentaModel.revertToQuickSave();
var pentaMini = new miniController(pentaView, pentaModel, pentaBoard, 150);

//// PULSAR

var pulsarBoard = findID('container-pulsar');

var pulsarRawPattern = [
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
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _]
];

var pulsarView = new View(19, 17, pulsarBoard);
var pulsarModel = new Board(19, 17);
pulsarModel.quickSave = pulsarModel.rawArrayToQuickSave(pulsarRawPattern);
pulsarModel.revertToQuickSave();
var pulsarMini = new miniController(pulsarView, pulsarModel, pulsarBoard, 200);

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
	[_, _, _, _, _, _, _, _, _, _, _, _]
];

var lwssView = new View(12, 10, lwssBoard);
var lwssModel = new Board(12, 10);
lwssModel.quickSave = lwssModel.rawArrayToQuickSave(lwssRawPattern);
lwssModel.revertToQuickSave();
var lwssMini = new miniController(lwssView, lwssModel, lwssBoard, 80);

//// DART

var dartBoard = findID('container-dart');

var dartRawPattern = [
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, 1, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, 1, _, 1, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, 1, _, _, _, 1, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, 1, 1, 1, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, 1, 1, _, _, _, 1, 1, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, 1, _, _, _, 1, _, 1, _, _, _, 1, _, _, _, _, _, _],
	[_, _, _, _, _, 1, 1, _, _, _, 1, _, 1, _, _, _, 1, 1, _, _, _, _, _],
	[_, _, _, _, 1, _, _, _, _, _, 1, _, 1, _, _, _, _, _, 1, _, _, _, _],
	[_, _, _, _, _, 1, _, 1, 1, _, 1, _, 1, _, 1, 1, _, 1, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
	[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _]
];

var dartView = new View(23, 19, dartBoard);
var dartModel = new Board(23, 19);
dartModel.quickSave = dartModel.rawArrayToQuickSave(dartRawPattern);
dartModel.revertToQuickSave();
var dartMini = new miniController(dartView, dartModel, dartBoard, 80);
