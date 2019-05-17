define([
    'require',
    'systemConfig',
    'jQuery',
    'vue'
], function(require, systemConfig, $,Vue) {
    'use strict';
    function createPool(){
        var cache = {};
        var ajaxOptions = {
            "url":systemConfig.backendurl+"/system/queryDomains",
            "type":"get"
        };
        var extendAjaxOptions = {
            "url":systemConfig.backendurl+"/system/extendDomains",
            "type":"get"
        };
        var extPrefix = "ext__";
        var extPrefixLength = extPrefix.length;
        var pool = {
            setAjaxOptions:function(options){
                ajaxOptions = options;
            },
            setExtendAjaxOptions:function(options){
                extendAjaxOptions = options;
            },
            cacheDomains:function(names){
                this.getDomainOptions(names);
            },
            getDomainOptions:function(names){
                var notLoadNames = [];
                var extNames = [];
                names.forEach(function(name){
                    if(!cache[name]){
                        if(name.indexOf(extPrefix)===0){
                            extNames.push(name);
                        }
                        else{
                            notLoadNames.push(name);
                        }
                        Vue.set(cache,name,[]);
                    }
                },this);
                if(notLoadNames.length > 0){
                    var options = $.extend({
                        success:pool.getDomainSuccess.bind(pool,notLoadNames),
                        error:pool.getDomainError.bind(pool,notLoadNames)
                    },ajaxOptions);
                    options.data = $.extend({
                        domainNames:notLoadNames.join(",")
                    },options.data);
                    $.ajax(options);
                }
                if(extNames.length > 0){
                    var options = $.extend({
                        success:pool.getDomainSuccess.bind(pool,extNames),
                        error:pool.getDomainError.bind(pool,extNames)
                    },extendAjaxOptions);
                    options.data = $.extend({
                        domainNames:extNames.map(function(extName){return extName.substr(extPrefixLength)}).join(",")
                    },options.data);
                    $.ajax(options);
                }
                return cache;
            },
            getDomainSuccess:function(names,res){
                if(res.success){
                    if(names[0].indexOf(extPrefix)===0){
                        names.forEach(function(name){
                            if(res.data[name.substr(extPrefixLength)]){
                                res.data[name.substr(extPrefixLength)].forEach(function(item){
                                    cache[name].push(item);
                                });
                            }
                        },this);
                    }
                    else{
                        names.forEach(function(name){
                            if(res.data[name]){
                                res.data[name].forEach(function(item){
                                    cache[name].push(item);
                                });
                            }
                        },this);
                    }
                }
                else{
                    pool.getDomainError(names);
                }
            },
            getDomainError:function(names){
            },
            getTextByValue:function(options,value){
                if(typeof options == "string"){
                    //options为字符串，则为domainName
                    options = cache[options];
                }
                var valueType = Object.prototype.toString.call(value).split(" ")[1].slice(0,-1),
                    text = valueType==="Array"?[]:value
                if (options && options.length >= 1) {
                    options.forEach(function (option) {
                        if(valueType==="Array"){
                            if (value.indexOf(option.value) > -1) {
                                text.push(option.text)
                            }
                        }else{
                            if (option.value == value) {
                                text = option.text
                            }
                        }
                    }, this)
                }
                return valueType==="Array"?text.join(","):text;
            }
        };
        return pool;
    }
    var pool = createPool();
    pool.createPool = createPool;
    return pool;
});