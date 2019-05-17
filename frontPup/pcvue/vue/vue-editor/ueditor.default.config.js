/**
 * ueditor完整配置项
 * 可以在这里配置整个编辑器的特性
 */
/**************************提示********************************
 * 所有被注释的配置项均为UEditor默认值。
 * 修改默认配置请首先确保已经完全明确该参数的真实用途。
 * 主要有两种修改方案，一种是取消此处注释，然后修改成对应参数；另一种是在实例化编辑器时传入对应参数。
 * 当升级编辑器时，可直接使用旧版配置文件替换新版配置文件,不用担心旧版配置文件中因缺少新功能所需的参数而导致脚本报错。
 **************************提示********************************/

define([
    'require',
    'systemConfig',
    'ZeroClipboard'
], function(require, systemConfig,ZeroClipboard) {
    'use strict';
    window.ZeroClipboard = ZeroClipboard;
    (function () {

        /**
         * 编辑器资源文件根路径。它所表示的含义是：以编辑器实例化页面为当前路径，指向编辑器资源文件（即dialog等文件夹）的路径。
         * 鉴于很多同学在使用编辑器的时候出现的种种路径问题，此处强烈建议大家使用"相对于网站根目录的相对路径"进行配置。
         * "相对于网站根目录的相对路径"也就是以斜杠开头的形如"/myProject/ueditor/"这样的路径。
         * 如果站点中有多个不在同一层级的页面需要实例化编辑器，且引用了同一UEditor的时候，此处的URL可能不适用于每个页面的编辑器。
         * 因此，UEditor提供了针对不同页面的编辑器可单独配置的根路径，具体来说，在需要实例化编辑器的页面最顶部写上如下代码即可。当然，需要令此处的URL等于对应的配置。
         * window.UEDITOR_HOME_URL = "/xxxx/xxxx/";
         */
        var URL = window.UEDITOR_HOME_URL || getUEBasePath();

        /**
         * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
         */
        window.UEDITOR_CONFIG = {

            //为编辑器实例添加一个路径，这个不能被注释
            UEDITOR_HOME_URL: URL

            ,lang:"zh-cn"

            ,serverUrl:systemConfig.backendurl +"/common/ueditorControler"//todo

            // ,langPath:URL +"lang/"//todo
            // ,imageUrl:URL+"jsp/feImageUp.jsp"//todo 图片上传提交地址
            // ,imagePath:"/ueditor/jsp/download_json.jsp?saveName="//todo 图片修正地址
            ,compressSide:0
            ,maxImageSideLength:9000
            ,catchRemoteImageEnable:false
            // ,catcherUrl:URL +"jsp/getRemoteImage.jsp"//todo 处理远程图片抓取的地址
            // ,catcherPath:URL + "jsp/"//todo
            ,imageManagerUrl:URL + "jsp/imageManager.jsp"//todo 图片在线管理的处理地址
            // ,imageManagerPath:URL + "jsp/"//todo
            // ,wordImageUrl:URL + "jsp/feImageUp.jsp"//todo word转存提交地址
            // ,wordImagePath:"/ueditor/jsp/download_json.jsp?saveName="//todo
            ,toolbars:[["Undo","Redo","indent","AutoTypeSet","removeformat","FormatMatch","Bold","Italic","Underline","ForeColor","FontFamily","FontSize","BackColor","LineHeight","JustifyLeft","JustifyCenter","JustifyRight","InsertUnorderedList","InsertOrderedList","InsertImage","WordImage","InsertTable","Link"]]
            ,labelMap:{'undo':'','redo':'','autotypeset':'','formatmatch':'','bold':'','italic':'','underline':'','forecolor':'','fontfamily':'','fontsize':'','backcolor':'','lineheight':'','justifyleft':'','justifycenter':'','justifyright':'','insertunorderedlist':'','insertorderedlist':'','insertimage':'','wordimage':'','inserttable':'','link':''}
            ,webAppKey:""
            ,charset:"UTF-8"
            ,isShow : true
            ,initialContent:""
            ,autoClearinitialContent: false
            ,textarea:"editorValue"
            ,focus:false
            ,autoClearEmptyNode : true
            ,fullscreen : false
            ,readonly : false
            ,zIndex : 95
            ,enableAutoSave: false
            ,saveInterval:9000000
            ,imagePopup:true
            ,initialStyle:'body{font-size:14px;line-height:1.5em;font-family: 微软雅黑;}'
            ,pasteplain:false
            ,insertorderedlist : {"decimal":"1,2,3...","lower-alpha":"a,b,c...","lower-roman":"i,ii,iii...","upper-alpha":"A,B,C","upper-roman":"I,II,III..."}
            ,insertunorderedlist : {"circle":"","disc":"","square":""}
            ,'fontfamily':[{"label":"","name":"songti","val":"宋体,SimSun"},
            {"label":"","name":"fangsong","val":"彷宋,FangSong"},
            {"label":"","name":"fangsong_gb","val":"仿宋_GB2312,FangSong_GB2312 "},
            {"label":"","name":"yahei","val":"微软雅黑,Microsoft YaHei"},
            {"label":"","name":"kaiti","val":"楷体,楷体_GB2312, SimKai"},
            {"label":"","name":"kaiti_gb","val":"楷体_GB2312, KaiTi_GB2312"},
            {"label":"","name":"fangzhengxiaobiaosong_gbk","val":"方正小标宋_GBK,FZSong_GBK"},
            {"label":"","name":"heiti","val":"黑体, SimHei"},
            {"label":"","name":"lishu","val":"隶书, SimLi"},
            {"label":"","name":"andaleMono","val":"andale mono"},
            {"label":"","name":"arial","val":"arial, helvetica,sans-serif"},
            {"label":"","name":"arialBlack","val":"arial black,avant garde"},
            {"label":"","name":"comicSansMs","val":"comic sans ms"},
            {"label":"","name":"impact","val":"impact,chicago"},
            {"label":"","name":"timesNewRoman","val":"times new roman"}]
            ,'fontsize':[10,11,12,14,16,18,20,24,36]
            ,'lineheight':["1","1.5","1.75","2","3","4","5"]
            ,'customstyle':[
                        {tag:'h1', name:'tc', label:'', style:'border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;'},
                        {tag:'h1', name:'tl',label:'', style:'border-bottom:#ccc 2px solid;padding:0 4px 0 0;margin:0 0 10px 0;'},
                        {tag:'span',name:'im', label:'', style:'font-style:italic;font-weight:bold;color:#000'},
                        {tag:'span',name:'hi', label:'', style:'font-style:italic;font-weight:bold;color:rgb(51, 153, 204)'}
                    ]
            ,autotypeset: {
            mergeEmptyline: true,
            removeClass: true,
            removeEmptyline: true,
            textAlign:"left",
            imageBlockLine: 'center',
            pasteFilter: false,
            clearFontSize: true,
            clearFontFamily: true,
            removeEmptyNode: true,
            indent: true,
            indentValue : '2em',
            bdc2sb: false,
            tobdc: true,
            removeTagNames:{
                b:1,big:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,kbd:1,q:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,var:1
            }
            }
            ,removeFormatTags:'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var'
            
            ,removeFormatAttributes:'class,style,lang,width,height,align,hspace,valign'
            ,tableDragable:false
            ,disabledTableInTable:true
            ,wordCount:true
            ,maximumWords:20000
            ,tabSize:"4"
            ,shortcutMenu:[]
            ,tabNode:"&nbsp;"
            ,elementPathEnabled : false
            ,maxUndoCount : "20"
            ,maxInputCount : "20"
            ,autoHeightEnabled:false
            ,scaleEnabled:false
            ,autoFloatEnabled:false
            ,indentValue:'2em'
            ,sourceEditor:'textarea'
            ,allowDivTransToP: true
            ,initialFrameHeight: 450-54
        };

        function getUEBasePath(docUrl, confUrl) {
            return systemConfig.getStaticPath()+'components/ueditor/dist/utf8-php/';
        }

        function getConfigFilePath() {

            var configPath = document.getElementsByTagName('script');

            return configPath[ configPath.length - 1 ].src;

        }

        function getBasePath(docUrl, confUrl) {

            var basePath = confUrl;


            if (/^(\/|\\\\)/.test(confUrl)) {

                basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');

            } else if (!/^[a-z]+:/i.test(confUrl)) {

                docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');

                basePath = docUrl + "" + confUrl;

            }

            return optimizationPath(basePath);

        }

        function optimizationPath(path) {

            var protocol = /^[a-z]+:\/\//.exec(path)[ 0 ],
                tmp = null,
                res = [];

            path = path.replace(protocol, "").split("?")[0].split("#")[0];

            path = path.replace(/\\/g, '/').split(/\//);

            path[ path.length - 1 ] = "";

            while (path.length) {

                if (( tmp = path.shift() ) === "..") {
                    res.pop();
                } else if (tmp !== ".") {
                    res.push(tmp);
                }

            }

            return protocol + res.join("/");

        }

        window.UE = {
            getUEBasePath: getUEBasePath
        };

    })();
});
