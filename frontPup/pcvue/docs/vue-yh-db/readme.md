## vue-yh-db 包括两个js文件：
* [analysis-item](#analysis-item)
* [api](#api)

## analysis-item 
+ __简介__ 返回一个js对象，包括若干用于分析或统计(图表)的vue未实例化组件和方法(function)。
+ __require引用名__ `vueAnalysisItem`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require'
        'echarts'
        'yhapi'  //同级文件下api.js引用名
        'vue'
        'systemConfig'
        'vuedraggable'
        'vueForm'
        'css!cssTableFilter'
        'css!cssBsTable'

+ __使用__ 页面js文件中如下引入：

        define([
            'vueAnalysisItem'
        ], function (analysisItem) {
            'use strict';
            ……//dosomething 你自己的代码
        });
+ __特性__ 强藕合性的组件集合体，与综合治理业务流程密切相关，使用时需留意。
+ __包括组件和方法:__
    * [`resizeComponent`](#resizeComponent) : 当包裹图表的最外层div尺寸发生变时，让图表尺寸重置的组件。
    * [`chartComponent`](#chartComponent) : 封装了ECharts的vue组件。
    * [`analysisDataComponent`](#analysisDataComponent) : 获取统计数据的vue组件。
    * [`analysisBarComponent`](#analysisBarComponent) : 生成ECharts中Bar类型图表配置options的组件。
    * [`customViewerComponent`](#customViewerComponent) : 自定义的表格统计vue组件。
    * [`andFilter`](#andFilter) : 返回两个筛选字段字符合集的方法。
    * [`getReport`](#getReport) : 从后台接口获取统计报表配置方法。
    * [`chartColor1`](#chartColor1) : 一个颜色值数组。
    * [`chartColor2`](#chartColor2) : 一个颜色值数组。
    * [`chartColor3`](#chartColor3) : 一个颜色值数组。

## <a name="resizeComponent">resizeComponent</a>
当包裹图表的最外层div尺寸发生变时，让图表尺寸重置的组件

[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__watch__ （监听）:
            
  + _`resize_ele_width`_: 组件监听图表组件的尺寸变化，并适时重置图表的尺寸。

## <a name="chartComponent">chartComponent</a>
封装了ECharts的vue组件，更多api[查看ECharts](#http://echarts.baidu.com/option.html#visualMap)

[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__watch__ （监听）:
            
  + _`options`_: 组件监听ECharts中的配置options，并适时渲染展示。
  + _`chartData`_: 组件监听图表数据，并适时更新ECharts中的配置options，然后渲染展示。


## <a name="analysisDataComponent">analysisDataComponent</a>
获取统计数据的vue组件

[查看demo.html](./demo.html) 和 [demo.js](./demo.js)


__watch__ （监听）:
            
  + _`query`_: 组件监听数据源，然后发送请求，获取展示数据。
  + _`filter`_: 组件监听字符串过滤条件，然后发送请求，获取展示数据。
  + _`proxy`_: 组件监听接口请求的代理地址，然后发送请求，获取展示数据。
  + _`dataconfig`_: 组件监听数据请求的配置，然后发送请求，获取展示数据。

## <a name="analysisBarComponent">analysisBarComponent</a>
生成ECharts中Bar类型图表配置options的组件,会根据data,计算得出Bar图表的配置options

[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

## <a name="customViewerComponent">customViewerComponent</a>
自定义的表格统计vue组件

[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:
   
  + _`report`_: 请求接口配置，默认值如下：

        {
            type:Object,
            default:function(){
                return {
                    proxy:"",
                    query:"",
                    dims:[
                    ],
                    meas:[
                    ],
                    domains:{}
                };
            }
        }


  + _`config`_: 数据展示配置，默认如下:

        {
            type:Object,
            default:function(){
                return {
                    cols:[],
                    rows:[],
                    meas:[],
                    measPos:"col",
                    filters:[]
                };
                // {
                //     cols:sampleConfig.cols,//[{id:"乡镇街道",alias:"乡镇街道"}],
                //     rows:sampleConfig.rows,//[{id:"人口类型",alias:"人口类型"}],
                //     meas:sampleConfig.meas,//[],
                //     measPos:sampleConfig.measPos,//"col"
                //     filters:sampleConfig.filters
                // };
            }
        }                    



  + _`view`_: { type:Boolean, default:true } 显示模式，默认展示表格统计。


__methods__ （方法）:
            
  + _`exportReport`_: 导出统计报表，将根据当前统计报表，生成excel文件下载。

__watch__ （监听）:
            
  + _`config`_: 组件监听数据展示配置，去请求获取数据，并适时展示。
  + _`userConfig`_: 组件监听数据展示配置（用户配置），去请求获取数据，并适时展示。
  + _`userConfig.groupFilter`_: 组件监听数据展示配置中过滤字段，去请求获取数据，并适时展示。
  + _`userConfig.userFilter`_: 组件监听数据展示配置中用户过滤字段，去请求获取数据，并适时展示。
  + _`userConfig.meas`_: 组件监听数据展示配置的计算类型，去请求获取数据，并适时展示。

## <a name="andFilter">andFilter</a>
返回两个筛选字段字符合集的方法，例如：

    var filter1 = "新增日期>=2018-01-10",
        filter1 = "新增日期<2018-08-10" ,
        res = analysisItem.andFilter(filter1,filter2); 

    // res 为字符串 "(新增日期>=2018-01-10) and (新增日期<2018-08-10)"

## <a name="getReport">getReport</a>
从后台接口获取统计报表配置方法，参数名为options，返回为config数据展示配置和report接口请求配置

## <a name="chartColor1">chartColor1</a>
一个颜色值数组（analysisItem.chartColor1），便于Echarts图表配色所用，内容如下：

    ["#ca7403","#c13853","#009ca2","#e9438a","#d96eef","#8f2fff","#6b00f9","#006dff","#00c5ff","#0cf796","#9cd334"]

## <a name="chartColor2">chartColor2</a>
一个颜色值数组（analysisItem.chartColor2），便于Echarts图表配色所用，内容如下：

    ["#8f2fff","#6b00f9","#006dff","#00c5ff","#0cf796","#9cd334","#ca7403","#c13853","#009ca2","#e9438a","#d96eef"]

## <a name="chartColor3">chartColor3</a>
一个颜色值数组（analysisItem.chartColor3），便于Echarts图表配色所用，内容如下：

    ["#00c5ff","#0cf796","#9cd334","#ca7403","#c13853","#009ca2","#e9438a","#d96eef","#8f2fff","#6b00f9","#006dff"]

## api 
+ __简介__ 返回一个js对象，包括若干方法，用于支持[analysis-item](#analysis-item)中的组件进行调用。
+ __require引用名__ `yhapi`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'jQuery'

+ __使用__ 页面js文件中如下引入：

        define([
            'yhapi'
        ], function (yhapi) {
            'use strict';
            ……//dosomething 你自己的代码
        });
+ __特性__ 强藕合性的方法集合体，与[analysis-item](#analysis-item)中的组件密切相关，使用时需留意。
+ __包括方法:__
    * `yhapi.setDefaultProxy(proxy)` : 设置默认接口代理。
    * `yhapi.getMeas(options)` : 获取多个汇总计算的值, options字段：
         
            options.query 数据源
            options.meas 数组，计算类型
            options.filter 字符串，过滤条件
            options.proxy API的代理地址
            options.success 成功的回调
            options.error 失败的回调

    * `yhapi.getDimMeas(options)` : 获取按某一个维度分类后的多个汇总计算的值 , options字段：
         
            options.query 数据源
            options.dim 维度名称
            options.meas 数组，计算类型
            options.filter 字符串，过滤条件
            options.proxy API的代理地址
            options.success 成功的回调
            options.error 失败的回调

    * `yhapi.getCrossDimMea(options)` : 获取按某一个维度分类后的多个汇总计算的值, options字段：
         
            options.query 数据源
            options.col 列维度名称
            options.row 行维度名称
            options.mea 计算类型
            options.filter 字符串，过滤条件
            options.proxy API的代理地址
            options.success 成功的回调
            options.error 失败的回调

    * `yhapi.getCubeQueryResult(options)` : 获取通用的Cube查询结果，返回数据是通用的格式, options字段：
         
            options.query 数据源
            options.cols 列维度名称
            options.rows 行维度名称
            options.meas 计算类型
            options.filter 字符串，过滤条件
            options.proxy API的代理地址
            options.success 成功的回调
            options.error 失败的回调

    * `yhapi.queryData(options)` : 获取SQL的查询结果, options字段：
         
            options.sql SQL语句
            options.proxy API的代理地址
            options.success 成功的回调
            options.error 失败的回调

    * `yhapi.getQueryMeta(options)` : 获取查询的元数据, options字段：
         
            options.id 查询的ID
            options.proxy API的代理地址
            options.success 成功的回调
            options.error 失败的回调
