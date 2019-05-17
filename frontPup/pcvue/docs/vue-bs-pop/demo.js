define([
    'require',
    'vue',
    'vueAlert',
    'vueBsPop'
], function(require, Vue, alert) {
    'use strict';
    //普通弹出框    
    var pop1Vm = new Vue({
        el:"#pop1",
        methods:{
            show:function(){
                this.$refs.pop.show();
            },
            close:function(){
                this.$refs.pop.hide()
            }
        }
    });
    var pop2Vm = new Vue({
        el:"#pop2",
        data:{
            name:"secondpop"
        },
        methods:{
            show:function(){
                this.$refs.pop.show();
            },
            save:function(){
                alert.alert("点击了保存")
            },
            close:function(){
                this.$refs.pop.hide()
            }
        }
    });
    var pop3Vm = new Vue({
        el:"#pop3",
        methods:{
            show:function(){
                this.$refs.pop.show();
            },
            close:function(){
                this.$refs.pop.hide()
            }
        }
    });
});