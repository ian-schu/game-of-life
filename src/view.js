// function makeCell(x, y) {
// 	let cell = document.createElement('div');
// 	cell.className = 'cell';
// 	cell.dataset.x = x;
// 	cell.dataset.y = y;
// 	return cell;
// }
//
// function generateBoard(width, height) {
// 	return Array2D.buildWith(width, height, function(r, c) {
// 		let thisCell = makeCell(c, r);
// 		gameboard.appendChild(thisCell);
// 		return thisCell;
// 	});
// }

class View {
	constructor(width, height, DOMparent) {
		this.grid = this.generateView(width, height, DOMparent);
		this.redraw = this.redraw.bind(this);
	}

	generateView(width, height, DOMparent) {
		return Array2D.buildWith(width, height, (r, c) => {
			let thisCell = this.makeCell(c, r, 'div');
			DOMparent.appendChild(thisCell);
			return thisCell;
		});
	}

	makeCell(x, y, elementType) {
		let cell = document.createElement(elementType);
		cell.className = 'cell';
		cell.dataset.x = x;
		cell.dataset.y = y;
		return cell;
	}

	colorCell(col, row, color) {
		this.grid[row][col].style.background = color;
	}

	redraw(modelGrid) {
		Array2D.eachCell(modelGrid, (cell, r, c) => {
			if (cell.alive) {
				this.colorCell(c, r, 'black');
			} else if (cell.alive === false) {
				this.colorCell(c, r, 'white');
			}
		});
	}
}
