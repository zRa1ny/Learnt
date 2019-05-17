define([
    'require',
    'vue',
    'vueArticleEditor'
], function(require, Vue) {
    'use strict';
    
    var vm = new Vue({
        el:"#main",
        data:{

            //vueArticleEditor 配置
            value: null

        },
        mounted:function(){
            
        },
        methods:{
           editorChang:function(){
               console.log(this.value);
           }
        }
    })

    
});