var gameboard = document.getElementById('gameboard');
var palette = document.getElementById('palette');
var playback = document.getElementById('playback');
var stepButton = document.getElementById('stepButton');

var theView = new View(40, 25, gameboard);
var theModel = new Board(40, 25);
var controller = new Controller(theView, theModel);

gameboard.addEventListener('mousedown', controller.cellClick, false);
gameboard.addEventListener('mouseover', controller.cellClick, false);

stepButton.addEventListener('click', () => controller.advance(), false);
