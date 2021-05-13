/*
function a(){
	console.log('A');
}
a();
*/

// a 라는 변수에 값으로서 함수를 정의
// JavaScript 에서는 함수가 값이다
var a = function(){ // 익명함수 : 이름이 없는 함수
	console.log('A');
}


function slowfunc(callback){
	callback();
}

slowfunc(a);
// flowfunc 함수에서 callback 이라는 parameter(매개변수)는 a 라는 값을 가지게 되고
// a 변수가 정의하고 있는 함수를 가지게 됨