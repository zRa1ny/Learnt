define([
    'require',
    'jQuery',
    'vue'
], function(require, $, Vue) {
    'use strict';
    var alerts = {
        message:function(message,type,hiddenTimeout){
            var content = '<div class="alert alert-'+type+' alert-dismissible fade in" role="alert">\
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                    <span aria-hidden="true">×</span>\
                </button>\
                '+message+'</div>';
            var $el = $(content);
            if(this && this.$el){
                if(this.$refs && this.$refs.alert){
                    $el.prependTo(this.$refs.alert);
                }
                else{
                    $el.prependTo(this.$el);
                }
            }
            else{
                $el.prependTo(".content-wrapper");
            }
            $el.alert();
            if(hiddenTimeout>0){
                setTimeout(function(){
                    $el.alert("close");
                },hiddenTimeout);
            }
        },
        clearMessage:function(){
            if(this && this.$el){
                if(this.$refs && this.$refs.alert){
                    $(this.$refs.alert).find('[role="alert"]').alert("close");
                }
                else{
                    $(this.$el).find('[role="alert"]').alert("close");
                }
            }
            else{
                $(".content-wrapper").find('[role="alert"]').alert("close");
            }
        },
        showError:function(message,hiddenTimeout){
            hiddenTimeout = typeof hiddenTimeout == "undefined" ? 3000 : hiddenTimeout;
            alerts.message.apply(this,[message,"danger",hiddenTimeout]);
        }
    };
    var bs = false
    var bindBootstrap = function(fn){
        return function(){
            var self = this;
            var args = arguments;
            if(bs){
                fn.apply(self,args);
            }
            else{
                requirejs(["bootstrap"],function(){
                    bs = true;
                    fn.apply(self,args);
                })
            }
        }
    };
    var util = {
        message:bindBootstrap(alerts.message),
        showError:bindBootstrap(alerts.showError),
        clearMessage:bindBootstrap(alerts.clearMessage)
    };

    var _alertComponent = null;
    function loadAlertComponent(callback){
        if(_alertComponent){
            callback(_alertComponent);
        }
        else{
            requirejs(["vueBsPop"],function(){
                var component = Vue.extend({
                    template:'<bs-pop type="sm" :fade=false :title="title" ref="pop" @closed="closed">\
                        <p v-text="message"></p>\
                        <template slot="footer">\
                            <button type="button" class="btn btn-primary" @click="callback">确定</button>\
                        </template>\
                    </bs-pop>',
                    data:function(){
                        return {
                            title:"提示",
                            message:"",
                            acted:false,
                            options:{}
                        };
                    },
                    methods:{
                        show:function(options){
                            if(typeof(options) == "string"){
                                options = {
                                    message : options
                                };
                            }
                            this.options = options;
                            this.acted = false;
                            if(options.title){
                                this.title = options.title;
                            }
                            else{
                                this.title = "提示";
                            }
                            if(options.message){
                                this.message = options.message;
                            }
                            else{
                                this.message = "";
                            }
                            this.$refs.pop.show();
                        },
                        closed:function(){
                            if(this.acted === false){
                                this.callback();
                            }
                        },
                        callback:function(){
                            this.acted = true;
                            this.options.callback && setTimeout(this.options.callback, 10);
                            this.$refs.pop.hide();
                        }
                    }
                });
                _alertComponent = new component();
                _alertComponent.$mount();
                $(_alertComponent.$el).appendTo("body");
                callback(_alertComponent);
            });
        }
    }
    var _confirmComponent = null;
    function loadConfirmComponent(callback){
        if(_confirmComponent){
            callback(_confirmComponent);
        }
        else{
            requirejs(["vueBsPop"],function(){
                var component = Vue.extend({
                    template:'<bs-pop type="sm" :fade=false :title="title" ref="pop" @closed="closed">\
                        <p v-text="message"></p>\
                        <template slot="footer">\
                            <button type="button" class="btn btn-default" @click="cancel">取消</button>\
                            <button type="button" class="btn btn-primary" @click="confirm">确定</button>\
                        </template>\
                    </bs-pop>',
                    data:function(){
                        return {
                            title:"确认",
                            message:"是否确认",
                            acted:false,
                            options:{}
                        };
                    },
                    methods:{
                        show:function(options){
                            this.options = options;
                            this.acted = false;
                            if(options.title){
                                this.title = options.title;
                            }
                            else{
                                this.title = "确认";
                            }
                            if(options.message){
                                this.message = options.message;
                            }
                            else{
                                this.message = "是否确认";
                            }
                            this.$refs.pop.show();
                        },
                        closed:function(){
                            if(this.acted === false){
                                this.cancel();
                            }
                        },
                        cancel:function(){
                            this.acted = true;
                            this.options.cancelFn && setTimeout(this.options.cancelFn, 10);
                            this.$refs.pop.hide();
                        },
                        confirm:function(){
                            this.acted = true;
                            this.options.okFn && setTimeout(this.options.okFn, 10);
                            this.$refs.pop.hide();
                        }
                    }
                });
                _confirmComponent = new component();
                _confirmComponent.$mount();
                $(_confirmComponent.$el).appendTo("body");
                callback(_confirmComponent);
            });
        }
    }
    return $.extend({
        getMixin:function(){
            return {
                methods:{
                    message:function(){
                        util.message.apply(this,arguments);
                    },
                    showError:function(){
                        util.showError.apply(this,arguments);
                    },
                    clearMessage:function(){
                        util.clearMessage.apply(this,arguments);
                    }
                }
            }
        },
        alert:function(options){
            loadAlertComponent(function(component){
                component.show(options);
            });
        },
        confirm:function(options){
            loadConfirmComponent(function(component){
                component.show(options);
            });
        },
        tips:function(options){
            if(typeof(options) == "string"){
                options = {
                    message:options
                };
            }
            require(["artDialog"],function(){
                var dia = dialog({
                    title:options.title,
                    content:options.message,
                });
                var timeout = typeof(options.timeout) == "undefined" ? 2000 : options.timeout;
                dia.show();
                setTimeout(function(){
                    dia.close().remove();
                },timeout);
            });
        }
    },util);
});