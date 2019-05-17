## vue-chart

+ __简介__ 一个可视化图表插件
+ __require引用名__ `vueChart`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

            'require',
            'vue',
            'jQuery',
            'systemConfig',
            'echarts',
            "vueChart"
+ __使用__ 页面js文件中如下引入：

        define([
            'require',
            'vue',
            'jQuery',
            'systemConfig',
            'echarts',
            "vueChart"
        ], function (require, Vue, $, systemConfig, echarts) {
            'use strict';
            ……//dosomething 你自己的代码
        });

## API

此组件包含三个子组件：
* [cig-chart](#cig-chart) 可设置类型的图表
* [cig-chart-stack-bar](#cig-chart-stack-bar) 堆叠数据的柱状图，可计算堆叠数据总数，使用时需要引入对应的样式
* [cig-chart-pie2](#cig-chart-pie2) 嵌套环形图，需要引入样式，


## cig-chart
[查看demo.html](./demo.html#cigchart) 和 [demo.js](./demo.js)

__props__ （属性配置）:
            
>_`type`_: {type:String,default:null} 设置图表的类型，__必填项__，type有多种类型，line(折线图)、bar(柱状图)、radar(雷达图)、doughnut & pie(饼状图&环形图)、polarArea(扇形图)、bubble(散点图)等

>_`data`_: {type:Object,default:null} 图表的数据，__必填项__，基本格式如下：

    data1:{
        datasets: [{
            data: [221, 332, 443, 554, 565, 376, 887],
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#7FAA95', '#C59647']
        }],
        labels: ["18岁以下", "19-29岁", "30-39岁", "40-49岁", "50-59岁", "60-69岁", "70岁以上"]
    }//饼图数据

    data2: {
        labels: ["乡镇", "村","网格"],
        datasets: [
            { label: '户籍人口', backgroundColor: '#46BFBD', data: [221, 332, 443]},
            { label: '流入人口', backgroundColor: '#F7464A', data: [100, 200, 334]},
            { label: '常住人口', backgroundColor: 'orange', data: [20, 234, 314]}
        ]
    }//柱状图数据，每个柱状图显示三种类型的数据

>_`options`_: {type:Object,default:null} 图表的配置项，__必填项__，基本格式如下：

    options: {
        title: {
            display: true,//图表名称是否显示
            text: "图表名称"
        },
        tooltips: {
            mode: "label"//设置提示中显示的元素
        },
        responsive: true,//当检测到父容器大小改变时，设置图表容器的画布大小是否随父容器改变，要求父容器相对定位
        scales: {
            xAxes: [{
                stacked: true,//启用x轴堆叠
            }],
            yAxes: [{
                stacked: true//启用y轴堆叠
            }]
        }
    }

>_`width`_: {type:Number,default:null} 设置canvas的宽度

>_`height`_: {type:Number,default:null} 设置canvas的高度
        
__emit event__ （触发事件）:
            
  + 无

__watch__ （监听）:
            
  + 无

## cig-chart-stack-bar
[查看demo.html](./demo.html#cigbar) 和 [demo.js](./demo.js)

__props__ （属性配置）:     

>_`data`_:{type:Object,default:null} 图表的数据，__必填项__，基本格式如下：

    data: {
        labels: ["小浦镇", "画溪镇", "虹星桥镇", "和平镇", "太湖街道", "洪桥镇", "夹浦镇"],
        datasets: [
            [221, 332, 443, 554, 565, 376, 887],
            [111, 233, 355, 466, 577, 688, 799]
        ]
    },

>_`totalLabel`_:{type:String,default:"合计"} 设置所有总数相加显示后的label值

__emit event__ （触发事件）:
            
  + 无

__watch__ （监听）:
            
  + 无

## cig-chart-pie2
[查看demo.html](./demo.html#cigpie) 和 [demo.js](./demo.js)

__props__ （属性配置）:     

>_`colors`_: {type:Array,default:null} 设置环形图渲染颜色，基本格式如下：

    colors: [
        ["#7B42CC","#3AA8EB","#3C72DD","#8DC354","#3BA072","#F37D30","#ED3B3A","red","blue","greed"],//外层颜色
        ["#FF89C9","#FF527E","#C64EFF","red","blue","greed"]//内层颜色
    ],

>_`data`_: {type:Object,default:null} 图表的数据，__必填项__，

    datapie: {
        labels: [
            ["18岁以下", "19-29岁", "30-39岁", "40-49岁", "50-59岁", "60-69岁", "70岁以上"], 
            ["青少年", "中年", "老年"]
        ],
        datasets: [
            [100, 200, 334, 544, 112, 334, 55], 
            [100, 200, 334]
        ]
    },

__emit event__ （触发事件）:
            
  + 无

__watch__ （监听）:
            
  + 无