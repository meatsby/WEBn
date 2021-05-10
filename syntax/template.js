var name = 'meatsby';
var letter = 'Dear ' + name + '\n\nThis is paragraph with one billion ' + name + ' characters ' + name;

var letter = `Dear ${name}

This is paragraph with one billion ${1+1} characters ${name}`;

console.log(letter);