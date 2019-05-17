## Vue-arbor

+ __简介__ 一个通过发送请求，获得数据，加载关系图的插件
+ __require引用名__ `vueArbor`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueArbor'
+ __使用__ 页面js文件中如下引入：

        define([
            'vueArbor'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## cig-arbor
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:
            
  + _`value`_: {} 渲染关系图需要的数据的路径，vue实例$data中的值
   
  + _`width`_: {} 设置显示关系图的canvas的宽度
   
  + _`height`_:  {} 设置显示关系图的canvas的高度

  + _`psParam`_: { default:function(){ return {"repulsion":1000,"stiffness":600,"friction":0,"dt":0.02,"gravity":false,"precision":1,timeout:1};}}，设置关系图在canvas中的定位，默认的system会快速定位
   
  + _`stopLayoutTimeout`_: {default:1000}，定位确定后，将关系图置为静止的，在stopLayoutTimeout结束后关系图静止
   
  + _`stopLayoutPsParam`_: {default:function(){ return {"repulsion":0,"stiffness":0,"friction":0,"dt":0.02,"gravity":false,"precision":1,timeout:1};}}，默认的值会将关系图设置为静止

__emit event__ （触发事件）:
            
  + _` @itemclick`_: fn(value){……} 点击关系图中的某个节点触发，返回点击节点的所有数据


__watch__ （监听）:
            
  + _`value`_: 监听关系图数据的值，当关系图数据改变时，调用update方法更新关系图

__注意事项__ (请求到的数据需要进行处理) : 

  + 数据处理的方法：

    ```
    //在vue对象外层定义处理数据的方法
    function dealImageData(result, data) {
        if (data["label"] || data["color"] || data["size"] || data["jump"]) {
            //从最外层开始，判断数据的值，如果有值存入result中
            result.push(
                data["name"] + "{" + (data["label"] ? ("label:" + data["label"]) + "," : "") + (data["jump"] ? ("jump:" + data["jump"] + ",") : "") + (data["id"] ? ("id:" + data["id"] + ",") : "") + (data["pId"] ? ("pId:" + data["pId"] + ",") : "") + (data["bId"] ? ("bId:" + data["bId"]) : "") + (data["color"] ? ("color:" + data["color"] + ",") : "") + (data["size"] ? ("size:" + data["size"]) : "") + "}"
            );
        }
        if (data["children"]) {
            //内层，遍历子节点数据，再将父节点与子节点连接，如：父->子的方式连接
            for (var i = 0; i < data["children"].length; i++) {
                var arrow = data["name"] + " -> " + data["children"][i]["name"];
                if (data["children"][i]['lineColor']) {
                    arrow += "{color:" + data["children"][i]['lineColor'] + "}";
                }
                else {
                    arrow += "{color:red}";
                }
                result.push(arrow);
                dealImageData(result, data["children"][i]);
            }
        }
    };
    //通过请求成功拿到数据之后的处理方法
    var result = ["{color:#ccc}"];\\当节点数据没有设置颜色时，给节点一个默认背景颜色
    dealImageData(result, data);\\开始处理数据，调用dealImageData方法
    var Str = "";\\设置一个空字符串
    for (var i = 0; i < result.length; i++) {
        Str += result[i] + "\n";\\将处理后的数据组合起来
    }
    this.imgData = Str;\\将处理后的值传给value绑定的值
    ```