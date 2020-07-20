define([
    'require',
], function(require) {
    'use strict';
    return {
        template:"#index",
        data(){
            return{
                config: {
                    // autoplay: true,
                    slidesPerView: 2,
                    direction: "horizontal",
                    loop: false,
                    pagination: true,
                    navigation: true,
                    scrollbar: false
                },
                imgs:[],
                dailys: [],
                value:null
            }
        },
        methods:{
            loadDetail(){
                this.$http.get("/getDetail",(res)=>{
                    if(res.success){
                        this.data = res.data
                    }
                })
            },
            change(value){
               
                value.nickname = "张三";
                console.log(this.value)
            }
        },
        beforeCreate(){
            // 此处可以做一些验证，是否实例化vue实例
            // 判断页面所处的环境
            // 尽量不要动参数，避免后续初始化出错
            // 判断不是从列表跳转过来直接访问的重新定向到列表页 params参数刷新会掉 所以刷新也会被重定向
            // 如果需要直接访问使用query
            // if(!this.$route.params.allowed){
            //     this.$router.replace({name:"index"})
            // }
       
        },
        created(){
            // 数据已经初始化成功
            // 可以开始初始化，加快数据渲染速度 避免出现空数据
            // this.value = this.$route.params.value;
            this.loadDetail();
            this.value = {
                nickname:"name",
                score:100,
                date:"2010-10-11"
            }
        },
        beforeMount(){
            
        },
        mounted(){
          
        },
        updated(){
            console.log('updates')
        }
        
    } 
});