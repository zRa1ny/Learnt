define([
    'require',
], function(require) {
    'use strict';
    var _allPops = {};
    var mixin = {
        mounted:function(){
            _allPops[this._uid] = this;
        },
        destroyed:function(){
            delete _allPops[this._uid];
        },
        watch:{
            "isopen":function(newVal){
                if(newVal){
                    for (var key in _allPops) {
                        if (_allPops.hasOwnProperty(key)) {
                            var element = _allPops[key];
                            if(element.isopen && element!=this){
                                element.isopen = false;
                            }
                        }
                    }
                }
            }
        }
    };
    return mixin;
});