class View {
	constructor(width, height, DOMparent) {
		this.grid = this.generateView(width, height, DOMparent);
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

	cellChangeColor(row, col, color) {
		let cell = this.grid[row][col];
		cell.style.background = color;
	}

	redraw(model, deadcolor) {
		Array2D.eachCell(model.grid, (cell, row, column) => {
			if (cell.alive) {
				this.cellChangeColor(row, column, cell.color);
			} else if (!cell.alive) {
				this.cellChangeColor(row, column, deadcolor);
			}
		});
	}
}
