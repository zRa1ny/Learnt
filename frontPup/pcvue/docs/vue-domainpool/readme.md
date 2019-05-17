## Vue-domainpool组件API

+ __简介__ 一个可以通过字段名称domainName查询数据的组件
+ __require引用名__ `vueDomainPool`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueDomainPool',
+ __使用__ 页面js文件中如下引入：

        define([
            'vueDomainPool'
        ], function (domainPool) {
            'use strict';
            ……//dosomething 你自己的代码
        });

## Function && Object
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

js提供了一个domainpool的方法，如下：
* [_`domainPool`_](#domainPool): domain类型数据处理方法集合

<a name="domainPool" href="#domainPool">__domainPool__</a> : domain类型数据处理方法集合

  + <a name="domainPool.setAjaxOptions">_`domainPool.setAjaxOptions`_</a> : 重新设置ajaxOptions请求地址

        domainPool.setAjaxOptions(options)，options为新的请求地址

  + <a name="domainPool.setExtendAjaxOptions">_`domainPool.setExtendAjaxOptions`_</a> : 重新设置extendAjaxOptions请求地址

        domainPool.setExtendAjaxOptions(options)，options为新的请求地址

  + <a name="domainPool.getDomainOptions" href="#">_`domainPool.getDomainOptions`_</a> : 发送ajax，返回请求的数据

        domainPool.getDomainOptions(names)，names为发送请求的参数data

  + <a name="domainPool.cacheDomains">_`domainPool.cacheDomains`_</a> : 重新执行getDomainOptions方法，发送ajax请求

        domainPool.cacheDomains(names)，names为发送请求的参数data

  + <a name="domainPool.getDomainSuccess">_`domainPool.getDomainSuccess`_</a> : 执行getDomainOptions，发送请求成功后执行

        domainPool.getDomainSuccess(names,res)，res为请求成功返回的数据

  + <a name="domainPool.getDomainError">_`domainPool.getDomainError`_</a> : 执行getDomainOptions，发送请求失败后执行

        domainPool.getDomainError:fn(names){……}

  + <a name="domainPool.getTextByValue">_`"domainPool.getTextByValue`_</a> : options为字符串，则为domainName，取得对应value值的text

        domainPool.getTextByValue(options,value)

  + <a name="domainPool.createPool">_`domainPool.createPool`_</a> : 一个包含domainpool所有内容及方法的集合

        function createPool(){
            var cache = {};
            var ajaxOptions = {
                "url":systemConfig.backendurl+"/system/queryDomains",
                "type":"get"
            };
            var extendAjaxOpt…;
            ……
            var pool={
                setAjaxOptions:function(options){……},
                setExtendAjaxOptions:function(options){……},
                cacheDomains:function(names){……},
            }
            ……
        }
