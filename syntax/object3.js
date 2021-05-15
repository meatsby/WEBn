var o = {
	v1:'v1',
	v2:'v2',
	f1:function(){
		console.log(this.v1); // this : 자신이 속해있는 객체에서 참조
	},
	f2:function(){
		console.log(this.v2);
	}
};

o.f1();
o.f2();