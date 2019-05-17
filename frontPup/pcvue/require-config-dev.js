/* require config中的项暂时要用JSON格式，fis时暂时不支持写function */
requirejs.config({
    paths: {
        css: '/components/require-css/css',
        text: '/components/requirejs-plugins/lib/text',
        json: '/components/requirejs-plugins/src/json',
        vue: '/components/vue/dist/vue',
        jQuery: '/components/jquery-2.1.4/dist/jquery.min',
        jQueryAjaxFileUpload: '/pcvue/jquery.ajaxfileupload',
        jQueryCookie: '/components/jquery-cookie/jquery.cookie',
        mCustomScrollbar:  '/components/jquery.mCustomScrollbar/jquery.mCustomScrollbar.concat.min',
        jQueryAjaxFileUpload: '/pcvue/jquery.ajaxfileupload',
        chartJs:"/components/chart.js/dist/Chart.bundle.min",
        colResizable:"/components/colResizable/colResizable-1.6.modify",

        arbor:"/components/arbor/arbor",
        arborGraphics:"/components/arbor/arbor-graphics",

        echarts:"/components/echarts/dist/echarts.min",
        echartsExtDataTool:"/components/echarts/dist/extension/dataTool.min",
        echartsExtBmap:"/components/echarts/dist/extension/bmap.min",

        Highcharts:"/components/Highcharts/Highcharts-6.0.5/code/highcharts",
        Highcharts3d:"/components/Highcharts/Highcharts-6.0.5/code/highcharts-3d",
        d3v2:"/components/d3/d3.v2.min",
        d3v3:"/components/d3/d3.v3.min",

        bootstrap:"/components/cig-adminlte/bootstrap/js/bootstrap.min",
        bootstrapDatePickerLang:"/components/cig-adminlte/plugins/datepicker/locales/bootstrap-datepicker.zh-CN",
        bootstrapDatePicker:"/components/cig-adminlte/plugins/datepicker/bootstrap-datepicker",
        bootstrapDTPicker:"/components/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min",
        bootstrapDTPickerLang:"/components/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN",

        bootstrapDateTimePicker:"/components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker",
        bootstrapDaterangePicker:"/components/cig-adminlte/plugins/daterangepicker/daterangepicker",
        bootstrapSelect:"/components/bootstrap-select/dist/js/bootstrap-select.min",
        bootstrapSelectLang:"/components/bootstrap-select/dist/js/i18n/defaults-zh_CN.min",
        swiper:"/components/swiper-4.1.6/dist/js/swiper",
        VueAwesomeSwiper:"/components/vue-awesome-swiper/dist/vue-awesome-swiper",
        swiper422:"/components/swiper/swiper-4.2.2/dist/js/swiper.min",
        moment:"/pcvue/moment-with-locales",
        artDialog:'/components/artDialog/dist/dialog-min',
        cssArtDialog:'/components/artDialog/css/ui-dialog',
        marked: "/components/marked/lib/marked",
        qrcode:"/components/qrcode/dist/arale-qrcode/3.0.5/index",
        fileSaver:"/components/file-saver/FileSaver",

        adminLteApp: "/components/cig-adminlte/dist/js/app.min",

        systemConfig: '/zhzl/parent/js/config',

        vueAlert: "/pcvue/vue/vue-alert",

        sortablejs:"/components/Sortable/Sortable-1.7.0",
        vuedraggable:"/components/vue.draggable/dist/vuedraggable-2.1.6-Amd",
        particles:"/components/particles.js/particles",
        bsTreeView:"/components/bootstrap-treeview/dist/bootstrap-treeview.min",


        //components
        vueBsList:"/pcvue/vue/vue-bs-list/main",
        vueBsTable:"/pcvue/vue/vue-bs-table/main",
        vueBsTreeview:"/pcvue/vue/vue-bs-treeview/main",
        vueBsPop:"/pcvue/vue/vue-bs-pop/main",
        vueBsTab:"/pcvue/vue/vue-bs-tab",
        vueChart:"/pcvue/vue/vue-chart",
        vueArbor:"/pcvue/vue/vue-arbor",

        vuePopComponent:"/pcvue/vue/vue-popcomponent",
        vueTableFilter:"/pcvue/vue/vue-table-filter/main",
        vueJqTableFilter:"/pcvue/vue/vue-table-filter/jq",
        vueTable:"/pcvue/vue/vue-table",
        vueArea:"/pcvue/vue/vue-area/main",
        vueForm:"/pcvue/vue/vue-form/main",
        vueDomainPool:"/pcvue/vue/vue-domainpool",
        vueAttachment:"/pcvue/vue/vue-attachment/main",
        vueExcelImport:"/pcvue/vue/vue-excelImport/main",
        vueObjectSelector:"/pcvue/vue/vue-object-selector/main",
        vueCigSelect:"/pcvue/vue/vue-cig-select/main",
        vueCigCheck:"/pcvue/vue/vue-cig-check/main",
        vueDepMap:"/pcvue/vue/vue-depmap",
        vueCommonUseWord:"/pcvue/vue/vue-commonuserword",
        yhapi: "/pcvue/vue/vue-yh-db/api",
        vueAnalysisItem: "/pcvue/vue/vue-yh-db/analysis-item",

        
        ueditor:'/components/ueditor/dist/utf8-php/ueditor.all',
        cssUeditor:'/components/ueditor/dist/utf8-php/themes/default/css/ueditor.min',
        cssUeditorView:'/pcvue/vue/vue-editor/editor-view',
        ZeroClipboard:'/components/ueditor/dist/utf8-php/third-party/zeroclipboard/ZeroClipboard.min',
        ueditorConfig:'/pcvue/vue/vue-editor/ueditor.default.config',
        vueArticleEditor:"/pcvue/vue/vue-editor/main",
        ueditorLangConfig:"/pcvue/vue/vue-editor/vue-ueditor-lang",

        // vue Building
        vuePopperComponent:"/components/vue-popper-component/dist/vue-popper+popperjs",
        cssVuePopperComponent:"/components/vue-popper-component/dist/vue-popper",
        vueBuilding:"/pcvue/vue/vue-building/main",
        vueBuildingExample:"/pcvue/vue/vue-building/examples",
        vueBuildingSymbol:"/pcvue/vue/vue-building/symbol",
        cssVueBuilding:"/pcvue/vue/vue-building/style",

        // vue Building
        vueBuildingStatistics:"/pcvue/vue/vue-building-statistics/main",
        cssVueBuildingStatistics:"/pcvue/vue/vue-building-statistics/style",
        vueBuildingStatisticsExample:"/pcvue/vue/vue-building-statistics/examples",
        vueBuildingStatisticsImgs:"/pcvue/vue/vue-building-statistics/imgs",

        //components's css
        cssBsTreeview:"/pcvue/vue/vue-bs-treeview/style",
        cssBsTable:"/components/bootstrap-table/dist/bootstrap-table.min",
        cssBsEditTable:"/pcvue/vue/vue-bs-table/style",
        cssBsDatePicker:"/components/cig-adminlte/plugins/datepicker/datepicker3",
        cssBsDateTimePicker:"/components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker",
        cssBootstrapDTPicker:"/components/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min",
        cssBsDaterangePicker:"/components/cig-adminlte/plugins/daterangepicker/daterangepicker",
        cssBsSelect:"/components/bootstrap-select/dist/css/bootstrap-select.min",

        cssTableFilter:"/pcvue/vue/vue-table-filter/style",
        cssArea:"/pcvue/vue/vue-area/style",
        cssAttachment:"/pcvue/vue/vue-attachment/style",
        cssObjectSelector:"/pcvue/vue/vue-object-selector/style",
        cssSwiper:"/components/swiper-4.1.6/dist/css/swiper.min",
        cssSwiper422:"/components/swiper/swiper-4.2.2/dist/css/swiper.min",

        cssFontAwesome:"/components/font-awesome/css/font-awesome.min",
        cssBootstrap:"/components/bootstrap/dist/css/bootstrap.min",
        vueGlobalPlugins:"/pcvue/vue/global-plugins",
        cssmCustomScrollbar:"/components/jquery.mCustomScrollbar/jquery.mCustomScrollbar.min",
    },
    shim: {
        jQuery: {
            exports: "jQuery"
        },
        jQueryAjaxFileUpload: {
            deps: ["jQuery"]
        },
        jQueryCookie:{
            deps: ["jQuery"]
        },
        colResizable:{
            deps: ["jQuery"]
        },
        VueAwesomeSwiper: {
            deps: ["swiper","css!cssSwiper"]
        },
        bootstrap: {
            deps: ["jQuery"]
        },
        bootstrapSelect: {
            deps: ["jQuery","bootstrap","css!cssBsSelect"]
        },
        bootstrapSelectLang: {
            deps: ["bootstrapSelect"]
        },
        bootstrapDatePicker: {
            deps: ["bootstrap"]
        },
        bootstrapDatePickerLang: {
            deps: ["bootstrapDatePicker"]
        },
        bootstrapDateTimePicker:{
            deps: ["bootstrap"]
        },
        bootstrapDaterangePicker:{
            deps: ["bootstrap"]
        },
        bootstrapDTPicker:{
            deps: ["bootstrap","css!cssBootstrapDTPicker"]
        },
        bootstrapDTPickerLang:{
            deps: ["bootstrapDTPicker"]
        },
        artDialog:{
            deps:["jQuery",'css!cssArtDialog']
        },
        jQueryAjaxFileUpload:{
            deps:["jQuery"]
        },
        chartJs:{
            deps:["jQuery"]
        },
        echartsExtDataTool:{
            deps:["echarts"]
        },
        echartsExtBmap:{
            deps:["echarts","echartsExtDataTool"]
        },
        adminLteApp: {
            deps: ["bootstrap"]
        },
        ueditor:{
            deps:["ueditorConfig","css!cssUeditor","css!cssUeditorView"]
        },
        "FileSaver.js":{
            deps:["fileSaver"]
        },
        arbor:{
            exports: "arbor",
            deps:["jQuery"]
        },
        arborGraphics:{
            deps:["arbor"]
        },
        vuedraggable:{
            deps:["vue","sortablejs"]
        },
        mCustomScrollbar:{
            deps:["jQuery",'css!cssmCustomScrollbar']
        },
        Highcharts3d:{
            deps:["jQuery",'Highcharts']
        },
    }
});