## doc文档

此文档专为`docs`同级文件目录`vue`下的`vue组件`编写的文档。

## API列表

"√" 标记为文档已经完成

* [vue-area](./vue-area/readme.md) √
* [vue-attachment](./vue-attachment/readme.md) √
* [vue-bs-list](./vue-bs-list/readme.md) √
* [vue-bs-pop](./vue-bs-pop/readme.md) √
* [vue-bs-table](./vue-bs-table/readme.md) √
* [vue-bs-treeview](./vue-bs-treeview/readme.md) √
* [vue-building](./vue-building/readme.md) √
* [vue-building-statistics](./vue-building-statistics/readme.md) √
* [vue-cig-check](./vue-cig-check/readme.md) √
* [vue-cig-select](./vue-cig-select/readme.md) √
* [vue-editor](./vue-editor/readme.md) √
* [vue-excelimport](./vue-excelimport/readme.md) √
* [vue-form](./vue-form/readme.md) √
* [vue-object-selector](./vue-object-selector/readme.md) √
* [vue-table-filter](./vue-table-filter/readme.md) √
* [vue-yh-db](./vue-yh-db/readme.md) √
* [vue-alert](./vue-alert/readme.md) √
* [vue-arbor](./vue-arbor/readme.md) √
* [vue-chart](./vue-chart/readme.md) √
* [vue-commonuserword](./vue-commonuserword/readme.md) √
* [vue-depmap](./vue-depmap/readme.md) √
* [vue-domainpool](./vue-domainpool/readme.md) √
* [vue-popcomponent](./vue-popcomponent/readme.md) √
* [vue-table](./vue-table/readme.md) √

## 查看demo步骤
`每个组件提供了demo.html查看示例`
* __第1步__ 下载依赖库components, 因组件依赖很多第三方库，需在顶层目录front-public同级目录下，下载components，即在front-public父级目录，执行以下命令：

    `git clone ssh://git@gitlab.ispacesys.cn:10022/cig/components.git`

* __第2步__ 在本目录安装相关依赖：

    `npm install`

* __第3步__ 配置www.js文件目录：

        打开本目录中的www.js，第12行：
        app.use(express.static('../../../items')) 
        把 items 改成你顶层目录 front-public 和 components 两个文件夹共同的父级目录的名称后保存


* __第4步__ 在front-public目录运行：

    `node ./pcvue/docs/www`

* __第5步__ 查看：

        打开浏览器，地址中输入：
            http://localhost:8086
        或者：
            http://localhost:8086/index.html
        选择查看
    
        也可以直接输入组件的名称，如：
            http://localhost:8086/front-public/pcvue/docs/组件名称  /demo.html
        进行查看
