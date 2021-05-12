// round 함수는 반올림을 해주는 함수
console.log(Math.round(1.6));
console.log(Math.round(1.4));

function sum(first, second){ // 호출과 정의 사이의 parameter(매개변수)
	// console.log(first+second); 항상 화면에 6을 출력함 범용성 떨어짐
	console.log('a');
	return first+second; // 순수 결과값만 내장, return 시 함수 종료
	console.log('b');
}
console.log(sum(2,4)); // 각각의 입력값 하나하나를 argument(인자)