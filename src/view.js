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
		this.grid = this.generateBoard(width, height, DOMparent);
	}

	generateBoard(width, height, DOMparent) {
		return Array2D.buildWith(width, height, function(r, c) {
			let thisCell = makeCell(c, r);
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
}
