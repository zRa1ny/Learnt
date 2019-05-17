define([
    'require',
    'vue',
    'vueAlert',
    'vueBsList'
], function(require, Vue, alert) {
    'use strict';
    //普通弹出框    
    var listVm = new Vue({
        el:"#list",
        data:{
            list1:["a","b","c"],
            list2:[{text:"选择一",value:1},{text:"选择2",value:2},{text:"选择三",value:3}],
            itemComponent:"<span>{{item.text}}</span>"
        },
        methods:{
            itemClick:function(v){
                console.log(v)
            }
        }
    })
});