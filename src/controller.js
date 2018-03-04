var gameboard = document.getElementById('gameboard');
var palette = document.getElementById('palette');
var playback = document.getElementById('playback');

var viewModel = new View(40, 25, gameboard);
var boardModel = new Board(40, 25);

gameboard.addEventListener('click', ev => {
	if (ev.target.className === 'cell') {
		let row = ev.target.dataset.y;
		let column = ev.target.dataset.x;
		boardModel.activateCell(column, row);
		viewModel.colorCell(column, row, 'black');
		console.log(boardModel.grid[row][column]);
		console.log(viewModel.grid[row][column]);
	}
});

// var viewModel = Array2D.buildWith(40,25,function(r,c) {
//   document.querySelector
// })
