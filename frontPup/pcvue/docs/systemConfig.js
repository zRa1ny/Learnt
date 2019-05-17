var zhzlconfig={};
zhzlconfig.backendurl="/zhzlbackend";
zhzlconfig.backendurl2="/eplatform";
zhzlconfig.getQueryParams = function(){
    var params = {};
    var tmp = location.search.substr(1);
    tmp = tmp.split("&");
    for(var i=0,l=tmp.length;i<l;i++){
        var tmp1 = tmp[i].split("=");
        if(tmp1.length == 2){
            params[tmp1[0]] = decodeURIComponent(tmp1[1]);
        }
    }
    return params;
};
zhzlconfig.getRole = function(){
    return zhzlconfig.getQueryParams().cigrole || "query";
};
if(typeof define != "undefined"){
    define([
        'require',
        'jQuery'
    ], function(require,$) {
        'use strict';
        zhzlconfig.getStaticPath = function(){
            var path = $("script[src$='/components/requirejs/require.js']").attr("src")
            if(path) path = path.replace('components/requirejs/require.js','');
            else path = "/";
            return path;
        }
        $(document).ajaxSend(function(e,xhr,opt){
            if(opt.url.indexOf(zhzlconfig.backendurl) === 0){
                xhr.setRequestHeader("Pragma","no-cache");
                xhr.setRequestHeader("Cache-Control","no-cache");
            }
        });
        return zhzlconfig;
    });
}
