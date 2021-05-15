var M = {
	v:'v',
	f:function(){
		console.log(this.v);
	}
}

module.exports = M; // 파일에 있는 여러기능등 중에 M 이라고 하는 객체를 모듈 밖에서 사용할 수 있도록