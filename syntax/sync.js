var fs = require('fs');

/*
//readFileSync : 동기적인 방식
console.log('A');
var result = fs.readFileSync('./sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

//readFile : 비동기적인 방식을 선호한다
console.log('A');
// readFileSync 는 return 값을 주지만
// readFile 은 함수를 3번째 인자로 줘야함
// Node.js 가 첫번째 인자 파일 읽는 작업이 끝나면 세번째 인자로 준 함수를 실행시키면서
// err 는 에러가 있다면 에러로 argument(인자)를 제공하고
// 두번째 parameter(매개변수) 파일의 내용을 argument(인자)로서 공급해주도록 약속되어 있음
// readFile 은 따로 동작하고 있을때 console.log('C') 가 실행되고 readFile 동작이 끝나면 실행
fs.readFile('./sample.txt', 'utf8', function(err, result){
	console.log(result); // callback : 파일 다 읽고 함수 실행해
});
console.log('C');