// 배열
var members = ['meatsby', 'quaritch', 'seokyoonok'];
console.log(members[1]);
var i = 0;
while(i < members.length){
	console.log('array loop', members[i]);
	i = i + 1;
}

// 객체 = Dictionary?
var roles = {
	// key : value
	'programmer':'meatsby',
	'designer' : 'quaritch',
	'manager' : 'seokyoonok'
}
console.log(roles.designer);
console.log(roles['designer']);

for(var name in roles){
	console.log('object => ', name, 'value => ', roles[name]);
}