class Palette {
	constructor(colorArray, DOMParent) {
		this.container = DOMParent;
		this.colors = this.generatePalette(colorArray, this.container);
		this.currentColor = this.colors[0].dataset.color;
		this.currentColorElement = this.colors[0];
		this.deadColor = 'white';

		this.selectColor(this.colors[0]);
	}

	generatePalette(colorArray, DOMparent) {
		return colorArray.map(colorEntry => {
			// Create newColor dom element
			let newColor = document.createElement('button');
			newColor.className = 'color';
			newColor.dataset.color = colorEntry;

			let tooltip = colorEntry.split('');
			tooltip[0] = tooltip[0].toUpperCase();
			newColor.title = tooltip.join('');

			newColor.style.background = colorEntry;
			DOMparent.appendChild(newColor);
			return newColor;
		});
	}

	selectColor(selection) {
		this.currentColorElement.classList.remove('color--selected');
		this.currentColorElement = selection;
		this.currentColorElement.classList.add('color--selected');
		this.currentColor = this.currentColorElement.dataset.color;
	}
}

var startingColors = [
	'black',
	'white',
	'silver',
	'darkgray',
	'gray',
	'dimgray',
	'lightgray',
	'lightcoral',
	'rosybrown',
	'indianred',
	'red',
	'maroon',
	'salmon',
	'orangered',
	'chocolate',
	'brown',
	'darkred',
	'peachpuff',
	'tomato',
	'darkorange',
	'peru',
	'firebrick',
	'olive',
	'bisque',
	'darksalmon',
	'orange',
	'goldenrod',
	'sienna',
	'darkolivegreen',
	'coral',
	'gold',
	'limegreen',
	'saddlebrown',
	'darkgreen',
	'navajowhite',
	'lightsalmon',
	'darkkhaki',
	'lime',
	'darkgoldenrod',
	'green',
	'sandybrown',
	'yellow',
	'mediumseagreen',
	'olivedrab',
	'forestgreen',
	'burlywood',
	'yellowgreen',
	'springgreen',
	'seagreen',
	'darkslategray',
	'moccasin',
	'tan',
	'chartreuse',
	'mediumspringgreen',
	'lightseagreen',
	'teal',
	'wheat',
	'khaki',
	'lawngreen',
	'aqua',
	'darkturquoise',
	'darkcyan',
	'greenyellow',
	'darkseagreen',
	'cyan',
	'deepskyblue',
	'midnightblue',
	'palegoldenrod',
	'lightgreen',
	'mediumaquamarine',
	'cadetblue',
	'steelblue',
	'navy',
	'palegreen',
	'skyblue',
	'turquoise',
	'dodgerblue',
	'blue',
	'darkblue',
	'aquamarine',
	'lightskyblue',
	'mediumturquoise',
	'lightslategray',
	'blueviolet',
	'mediumblue',
	'paleturquoise',
	'lightsteelblue',
	'cornflowerblue',
	'slategray',
	'darkorchid',
	'darkslateblue',
	'powderblue',
	'thistle',
	'mediumslateblue',
	'royalblue',
	'fuchsia',
	'indigo',
	'lightblue',
	'plum',
	'mediumpurple',
	'slateblue',
	'magenta',
	'darkviolet',
	'pink',
	'violet',
	'orchid',
	'mediumorchid',
	'mediumvioletred',
	'purple',
	'lightpink',
	'hotpink',
	'palevioletred',
	'deeppink',
	'crimson',
	'darkmagenta'
];

function findColor(colorName) {
	return document.querySelector(`.color[data-color=${colorName}]`);
}
