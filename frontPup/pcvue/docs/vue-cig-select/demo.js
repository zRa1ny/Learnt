define([
    'require',
    'vue',
    'vueCigSelect'
], function(require, Vue) {
    'use strict';
    
    var vm = new Vue({
        el:"#main",
        data:{

            //vueCigSelect 
            //单选配置
            obj:{
                'options':[
                    {text:"选项1",value:1},
                    {text:"选项2",value:2},
                    {text:"选项3",value:3},
                    {text:"选项4",value:4},
                ],
                'name':"name",
                'value':undefined,
                'multiple':false,
            },

            //多选配置
            obj2:{
                'options':[
                    {text:"选项1",value:1},
                    {text:"选项2",value:2},
                    {text:"选项3",value:3},
                    {text:"选项4",value:4},
                ],
                'name':"name",
                'value':[1,3],
                'multiple':true,
            }
        },
        mounted:function(){
            
        },
        methods:{
           
        }
    })

    
});