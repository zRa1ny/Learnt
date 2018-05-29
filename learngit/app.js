new Vue({
	el:"#vue-app",
	data:{
		name:"mr.z",
		todolists:{
			one:['wa','ha'],
			two:['ka','pa']

		},
		url:"<a href='http:\\www.baidu.com'>百度一下</a>",
		toggle:true,
		showtoggle:true,
		ifok:true,
		nowinput:'',
		nowinput1:'',
		nowinput2:'',
		a:1,
		b:0,
		c:2,
		d:3,
	},
	methods:{
		get:function() {
			console.log("x")
			return this.name

		},
		showInp:function(){

			this.nowinput=this.$refs.showInp1.value
		},
		showInp1:function(){
			this.nowinput1=this.$refs.showInp2.value
			
		},
		aaddb:function(){

			return this.a+this.b
		},
		baddc:function(){
			return this.b+this.c
		},
		daddc:function(){

			return this.d+this.c


		},
	},
	computed:{
		aaddb1:function(){
			console.log('a')
			return this.a+this.b
		},
		baddc1:function(){
			console.log('b')
			return this.b+this.c
		},
		daddc1:function(){
			console.log('c')
			return this.d+this.c


		},
	}

})