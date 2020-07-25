define([
    'require',
    'keeySpace'
], function(require,keeySpace) {
    'use strict';
    return {
        name:"index",
        mixins:[keeySpace],
        template:`
            <div class="page-index">
                <router-link v-for="(value,index) in data" :key="index"
                    :to="{name:'detail',params:{value:value,allowed:true}}" class="cell-item">
                    <span> {{value.nickname}}</span>
                    <span class="ziconfont z-iconguanbi1"></span>
                </router-link>
            </div>
        `,
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
                data: [],
            }
        },

        inject:['addKeepAlive','removeKeepAlive'],
        methods:{
            loadList(){
                this.$http.get("/getlist",(res)=>{
                    if(res.success){
                        this.data = res.data
                    }
                })
            }
        },
       
        created(){

            // 数据已经初始化成功
            // 可以开始初始化，加快数据渲染速度 避免出现空数据
            this.loadList();
            this.addKeepAlive('index')
        },
        beforeMount(){
            // this._render = () => this.$createElement('h1', null, 'It works!')
        },
  
        
        
    } 
});