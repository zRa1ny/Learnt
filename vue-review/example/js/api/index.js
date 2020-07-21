define([
    'require',
    'mock',
    'vue'
], function (require, Mock, Vue) {
    'use strict';
    // 提供ajax方法
    Vue.prototype.$http = {
        get: function (url, fn) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                // readyState == 4说明请求已完成
                if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                    fn.call(this, JSON.parse(xhr.responseText));
                }
            };
            xhr.send();
           
        }
    }
   
    // 劫持接口 mock模拟返回结果
    Mock.mock('/getlist', {
        "success": 1,
        "data|20-100": [{
            "pid|+1":1,
            "date": "@datetime", //随机生成日期时间
            "score|1-100": 100, //随机生成1-800的数字
            "nickname": "@cname", //随机生成中文名字
        }]
    });



    
});