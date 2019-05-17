define([
    'require',
    'vue',
    'vueExcelImport'
], function(require, Vue) {
    'use strict';
    
    var vm = new Vue({
        el:"#main",
        data:{

            //配置
            addfiles: [],
            delfiles: []

        },
        mounted:function(){
            
        },
        methods:{
           fileChang:function(obj){
               console.log(obj);
               this.addfiles=obj.add;
               this.delfiles=obj.del;

           }
        }
    })

    
});