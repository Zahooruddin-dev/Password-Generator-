const characters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'~',
	'`',
	'!',
	'@',
	'#',
	'$',
	'%',
	'^',
	'&',
	'*',
	'(',
	')',
	'_',
	'-',
	'+',
	'=',
	'{',
	'[',
	'}',
	']',
	',',
	'|',
	':',
	';',
	'<',
	'>',
	'.',
	'?',
	'/',
];
let pass1 = document.getElementById('pass1');
let pass2 = document.getElementById('pass2');

let password1 = '';
let password2;

function logic() {
	if (password1 !== '' && password2 !== '') {
		password1 = '';
		password2 = '';
		pass1.textContent = '';
		pass2.textContent = '';
	}
	genertate();
}
function genertate() {
	for (let i = 0; i < 15; i++) {
		password1 += characters[Math.floor(Math.random() * 90)];
	}
	pass1.textContent += password1;
	for (let i = 0; i < 15; i++) {
		password2 += characters[Math.floor(Math.random() * 90)];
	}
	pass2.textContent += password2;
}
