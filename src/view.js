class View {
	constructor(width, height, DOMparent) {
		this.grid = this.generateView(width, height, DOMparent);
		this.currentColor = 'black';
		this.deadColor = 'white';
		this.redraw = this.redraw.bind(this);
	}

	generateView(width, height, DOMparent) {
		return Array2D.buildWith(width, height, (r, c) => {
			let thisCell = this.makeCellElement(c, r, 'div', width, height);

			DOMparent.appendChild(thisCell);
			return thisCell;
		});
	}

	makeCellElement(x, y, elementType, boardWidth, boardHeight) {
		let cellWidth = 100 / boardWidth;
		let cellHeight = 100 / boardHeight;
		let cell = document.createElement(elementType);
		cell.className = 'cell';
		cell.style.width = cellWidth + '%';
		cell.style.height = cellHeight + '%';
		cell.dataset.x = x;
		cell.dataset.y = y;
		return cell;
	}

	colorCell(col, row, color) {
		this.grid[row][col].style.background = color;
	}

	redraw(model) {
		Array2D.eachCell(model.grid, (cell, r, c) => {
			if (cell.alive) {
				this.colorCell(c, r, cell.color);
			} else if (cell.alive === false) {
				this.colorCell(c, r, this.deadColor);
			}
		});
	}
}
