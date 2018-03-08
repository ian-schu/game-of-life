// PatternBank items:
var patternbank = findID('patternbank');
var expand = findID('expand');
var collapse = findID('collapse');

expand.addEventListener('click', () => {
	patternbank.style.left = '85%';
});

collapse.addEventListener('click', () => {
	patternbank.style.left = '99.5%';
});
