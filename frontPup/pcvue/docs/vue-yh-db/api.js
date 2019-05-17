define([
    'require',
    'jQuery'
], function(require, $) {
    'use strict';
    var API_QUERYDATA = "queryData";
    var API_GETQUERYLIST = "getQueryList";
    var API_GETQUERYMETA = "getQueryMeta";
    var API_GETCUBEQUERYRESULT = "getCubeQueryResult";
    var DEF_API_PROXY = "";

    var COL_PARENT_INDEX = 0;
    var COL_LEVEL_INDEX = 1;
    var COL_ISLEAF_INDEX = 2;
    var COL_DIMID_INDEX = 3;
    var COL_VALUE_INDEX = 4;
    var api = {
        setDefaultProxy:function(proxy){
            DEF_API_PROXY = proxy;
        },
        /** 
         * @description 获取多个汇总计算的值 
         * @description options.query 数据源
         * @description options.meas 数组，计算类型
         * @description options.filter 字符串，过滤条件
         * @description options.proxy API的代理地址
         * @description options.success 成功的回调
         * @description options.error 失败的回调
         * 
         * getMeas({
         *  query:"人口",
         *  meas:[
         *      {col:"FOCUS_CONTROL_201",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_202",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_203",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_204",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_205",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_206",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_207",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_208",tType:"SUM"},
         *  ],
         *  filter:"",
         *  proxy:systemConfig.backendurl+"/yhproxy",
         *  success:function(result){
         *      console.log(result);
         *      // [10,0,30,40,50,64,54,11]
         *  }
         * })
         * @param options 设置
        */
        getMeas:function(options){
            var success = options.success;
            options.rows = [];
            options.cols = [];
            options.success = function(res){
                if(res && res.data && res.data.data){
                    success && success(res.data.data[1]);
                }
                else{
                    success && success(options.meas.map(function(){
                        return null;
                    }));
                }
            };
            return api.getCubeQueryResult(options);
        },
        /**
         * @description 获取按某一个维度分类后的多个汇总计算的值 
         * @description options.query 数据源
         * @description options.dim 维度名称
         * @description options.meas 数组，计算类型
         * @description options.filter 字符串，过滤条件
         * @description options.proxy API的代理地址
         * @description options.success 成功的回调
         * @description options.error 失败的回调
         * 
         * getDimMeas({
         *  query:"人口",
         *  dim:"乡镇街道",
         *  meas:[
         *      {col:"FOCUS_CONTROL_201",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_202",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_203",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_204",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_205",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_206",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_207",tType:"SUM"},
         *      {col:"FOCUS_CONTROL_208",tType:"SUM"},
         *  ],
         *  filter:"",
         *  proxy:systemConfig.backendurl+"/yhproxy",
         *  success:function(result){
         *      console.log(result);
         *      // {
         *      //  dimVals:["太湖街道","街道1","街道2","水口乡","煤山镇"]
         *      //  meas:[
         *      //      [10,0,30,40,50],// 代表各乡镇的 SUM(FOCUS_CONTROL_201)
         *      //      [10,0,30,40,50],// 代表各乡镇的 SUM(FOCUS_CONTROL_202)
         *      //      [10,0,30,40,50],// 代表各乡镇的 SUM(FOCUS_CONTROL_203)
         *      //      [10,0,30,40,50],// 代表各乡镇的 SUM(FOCUS_CONTROL_204)
         *      //      [10,0,30,40,50],// 代表各乡镇的 SUM(FOCUS_CONTROL_205)
         *      //      [10,0,30,40,50],// 代表各乡镇的 SUM(FOCUS_CONTROL_206)
         *      //      [10,0,30,40,50],// 代表各乡镇的 SUM(FOCUS_CONTROL_207)
         *      //      [10,0,30,40,50],// 代表各乡镇的 SUM(FOCUS_CONTROL_208)
         *      //  ]
         *      // }
         *  }
         * })
         * @param options 设置
         */
        getDimMeas:function(options){
            var success = options.success;
            options.cols = [options.dim];
            options.rows = [];
            options.measPos = "row";
            options.success = function(res){
                if(res && res.data && res.data.data){
                    success && success({
                        dimVals:res.data.cols.map(function(col){
                            return col[COL_VALUE_INDEX];
                        }),
                        meas:res.data.data.slice(1).map(function(row,index){
                            return row.slice(1);
                        })
                    });
                }
                else{
                    success && success(options.meas.map(function(){
                        return {
                            dimVals:[],
                            meas:options.meas.map(function(){
                                return [];
                            })
                        };
                    }));
                }
            };
            return api.getCubeQueryResult(options);
        },
        /**
         * @description 获取按某一个维度分类后的多个汇总计算的值 
         * @description options.query 数据源
         * @description options.col 列维度名称
         * @description options.row 行维度名称
         * @description options.mea 计算类型
         * @description options.filter 字符串，过滤条件
         * @description options.proxy API的代理地址
         * @description options.success 成功的回调
         * @description options.error 失败的回调
         * 
         * getCrossDimMea({
         *  query:"人口",
         *  row:"乡镇街道",
         *  col:"年龄范围",
         *  mea:{col:"ID",tType:"COUNT"},
         *  filter:"",
         *  proxy:systemConfig.backendurl+"/yhproxy",
         *  success:function(result){
         *      console.log(result);
         *      // {
         *      //  cols:["<=18","19~29","30~39","40~49","50~59","60~69","70~79",">=80"]
         *      //  rows:["太湖街道","街道1","街道2","水口乡","煤山镇"]
         *      //  data:[
         *      //      [10,0,30,40,50,1,4,5],// 代表太湖街道的 COUNT(ID)
         *      //      [10,0,30,40,50,1,4,5],// 代表街道1的 COUNT(ID)
         *      //      [10,0,30,40,50,1,4,5],// 代表街道2的 COUNT(ID)
         *      //      [10,0,30,40,50,1,4,5],// 代表水口乡的 COUNT(ID)
         *      //      [10,0,30,40,50,1,4,5],// 代表煤山镇的 COUNT(ID)
         *      //  ]
         *      // }
         *  }
         * })
         * @param options 设置
         */
        getCrossDimMea:function(options){
            var success = options.success;
            options.cols = [options.col];
            options.rows = [options.row];
            options.meas = [options.mea];
            options.measPos = "";
            options.success = function(res){
                if(res && res.data && res.data.data){
                    success && success({
                        cols:res.data.cols.map(function(col){
                            return col[COL_VALUE_INDEX];
                        }),
                        rows:res.data.rows.map(function(row){
                            return row[COL_VALUE_INDEX];
                        }),
                        data:res.data.data.slice(2).map(function(row,index){
                            return row.slice(1);
                        })
                    });
                }
                else{
                    success && success({
                        cols:[],
                        rows:[],
                        data:[]
                    });
                }
            };
            return api.getCubeQueryResult(options);
        },
        /**
         * @description 获取通用的Cube查询结果，返回数据是通用的格式
         * @description options.query 数据源
         * @description options.cols 列维度名称
         * @description options.rows 行维度名称
         * @description options.meas 计算类型
         * @description options.filter 字符串，过滤条件
         * @description options.proxy API的代理地址
         * @description options.success 成功的回调
         * @description options.error 失败的回调
         * 
         * getCubeQueryResult({
         *  query:"人口",
         *  rows:["乡镇街道"],
         *  cols:["年龄范围"],
         *  meas:[{col:"ID",tType:"COUNT"}]
         *  filter:"",
         *  proxy:systemConfig.backendurl+"/yhproxy",
         *  success:function(result){
         *      console.log(result);
         *      // {
         *      //  config:{}//和options一致
         *      //  data:{
         *      //      cols:[
         *      //          [   -1 //上级节点索引
         *      //              ,0//所属层级
         *      //              ,true//是否末级
         *      //              ,"年"//dim id
         *      //              ,"2009"//value
         *      //          ],
         *      //      ],
         *      //      rows:[ //格式同cols
         *      //      ],
         *      //      data:[
         *      //          [null,"<=18","19~29","30~39","40~49","50~59","60~69","70~79",">=80"],
         *      //          ["太湖街道",10,0,30,40,50,1,4,5],
         *      //          ["街道1",10,0,30,40,50,1,4,5],
         *      //          ["街道2",10,0,30,40,50,1,4,5],
         *      //          ["水口乡",10,0,30,40,50,1,4,5],
         *      //          ["煤山镇",10,0,30,40,50,1,4,5]
         *      //      ]
         *      //  }
         *      // }
         *  }
         * })
         * @param options 设置
         */
        getCubeQueryResult:function(options){
            var success = options.success;
            var error = options.error;
            var params = {
                query:options.query,
                rows:options.rows ? options.rows : [],
                cols:options.cols ? options.cols : [],
                meas:options.meas ? options.meas : [],
                measPos:options.measPos ? options.measPos : "col",
                rDrill:options.rDrill ? options.rDrill : [],
                cDrill:options.cDrill ? options.cDrill : [],
                rDrillNode:options.rDrillNode ? options.rDrillNode : [],
                cDrillNode:options.cDrillNode ? options.cDrillNode : [],
                filter:options.filter
            };
            return $.ajax({
                //type:"post",
                //url:(options.proxy ? options.proxy : DEF_API_PROXY)+"/"+API_GETCUBEQUERYRESULT,
                type:"get",
                url:options.proxy ? options.proxy : DEF_API_PROXY,
                contentType:"application/json",
                data:JSON.stringify(params),
                success:function(res){
                    if(res && res.success){
                        success && success({
                            config:params,
                            data:res.data
                        });
                    }
                    else{
                        error && error(res?res.data:"未知错误");
                    }
                },
                error:error
            })
        },
        /**
         * @description 获取SQL的查询结果
         * @description options.sql SQL语句
         * @description options.proxy API的代理地址
         * @description options.success 成功的回调
         * @description options.error 失败的回调
         * @param options 设置
         */
        queryData:function(options){
            return $.ajax({
                type:"post",
                url:(options.proxy ? options.proxy : DEF_API_PROXY)+"/"+API_QUERYDATA,
                data:{
                    sql:options.sql
                },
                success:options.success,
                error:options.error
            })
        },
        /**
         * @description 获取查询的元数据
         * @description options.id 查询的ID
         * @description options.proxy API的代理地址
         * @description options.success 成功的回调
         * @description options.error 失败的回调
         * @param options 设置
         */
        getQueryMeta:function(options){
            return $.ajax({
                type:"post",
                url:(options.proxy ? options.proxy : DEF_API_PROXY)+"/"+API_GETQUERYMETA,
                data:{
                    id:options.id
                },
                success:options.success,
                error:options.error
            })
        }
    };
    return api;
});