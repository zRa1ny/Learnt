define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'jQueryAjaxFileUpload',
    'css!cssAttachment',
], function (require, Vue, $, config) {
    'use strict';
    Vue.component("cig-excelfiles", {
        template: '<div :class="[wrapClass,\'file-wrap\']">\
            <ul class="file-group">\
                <li v-for="item in files">\
                    <span href="javascript:;" @click="fileClick(item)" :title="item.fileName" v-if="item.preUrl" class="file-icon">\
                        <img :src="item.preUrl">\
                    </span>\
                    <span href="javascript:;" @click="fileClick(item)" :title="item.fileName" v-if="!item.preUrl" :class="[\'file-icon\',\'glyphicon\',item.preCls]">\
                    </span>\
                    <span class="file-rm glyphicon glyphicon-remove" v-if="mode.indexOf(\'remove\')>=0" @click="fileRemove(item)"></span>\
                </li>\
                <li v-if="mode.indexOf(\'add\')>=0">\
                    <a href="javascript:;" :class="[\'file-icon\',\'glyphicon glyphicon-plus\']">\
                    </a>\
                    <input v-show="mode.indexOf(\'add\')>=0" class="file-add-hid" @click="setupUpload" name="file" type="file" ref="file">\
                </li>\
            </ul>\
        </div>',
        props: {
            wrapClass: {
                default: "",
                type: String
            },
            ajaxUrl: {
                default: function () {
                    return {
                        "uploadFile": config.backendurl + "/agg/excelImportPre",
                        //"getFiles": config.backendurl+"/common/getFiles",
                    }
                },
                type: Object
            },
            fileType: {
                default: "unkown",
                type: String
            },
            busId: {
                default: "",
                type: String
            },
            mode: {
                default: "remove|add",
                type: String
            },
            allowCategories: {
                default: function () {
                    return {
                        // "图片":['gif','png','jpg','jpeg'],
                        // "文档":["zip","doc","docx","xls","xlsx"]
                        "文档": ["xls", "xlsx"]
                    }
                },
                type: Object
            },
            outfiles: {
                default: function () {
                    return [];
                },
                type: Array
            }
        },
        data: function () {
            return {
                files: [

                ],
                adds: [],
                dels: [],
                uploadParams: {
                    category: null,
                    sourceid: null
                },
                prePop: null
            }
        },
        watch: {
            busId: function (newVal) {
                this.$set(this, "files", []);
                this.$set(this, "adds", []);
                this.$set(this, "dels", []);
                // if (this.busId) {
                //     this.loadData();
                // }
            }
        },
        mounted: function () {
            // if (this.busId) {
            //     this.loadData();
            // }
            this.onChangeVal();
        },
        methods: {
            setupUpload: function () {
                var $el = $(this.$refs.file);
                this.resetUploader($el);
                $el.ajaxfileupload({
                    params: this.uploadParams,
                    action: this.ajaxUrl.uploadFile,
                    onStart: this.beforeUpload.bind(this),
                    onComplete: this.fileUploaded.bind(this),
                    onCancel: function () { },
                    validate_extensions: true,
                    valid_extensions: this.getAllowExts(),
                    submit_button: null
                });
            },
            resetUploader: function ($el) {
                $el.val("");
                $el.off("change");
                $el.data("ajaxUploader-setup", false);
            },
            getAllowExts: function () {
                var exts = [];
                for (var key in this.allowCategories) {
                    if (this.allowCategories.hasOwnProperty(key)) {
                        var element = this.allowCategories[key];
                        exts = exts.concat(element);
                    }
                }
                return exts;
            },
            beforeUpload: function () {
                this.uploadParams.sourceid = this.busId;
                var $el = $(this.$refs.file);
                var ext = $el.val().split('.').pop().toLowerCase();
                for (var key in this.allowCategories) {
                    if (this.allowCategories.hasOwnProperty(key)) {
                        var element = this.allowCategories[key];
                        if (element.indexOf(ext.toLowerCase()) >= 0) {
                            this.uploadParams.category = key;
                            return;
                        }
                    }
                }
                this.uploadParams.category = null;
            },
            loadData: function () {
                $.ajax({
                    url: this.ajaxUrl.getFiles,
                    data: {
                        id: this.busId,
                        fileType: this.fileType
                    },
                    type: "get",
                    success: this.getFilesSuccess.bind(this),
                    error: this.getFilesError.bind(this),
                })
            },
            getFilesSuccess: function (res) {
                if (res.success) {
                    res.data.forEach(this.formatFile);
                    this.$set(this, "files", res.data);
                }
                else {
                    this.getFilesError();
                }
            },
            getFilesError: function () {
            },
            formatFile: function (f) {
                var preClses = {
                    "图片": "glyphicon-picture",
                    "视频": "glyphicon-film",
                    "文档": "glyphicon-file",
                    "压缩包": "glyphicon-file",
                };
                f.preCls = preClses[f.category] ? preClses[f.category] : "glyphicon-file";
                if (f.thumbnail) {
                    f.preUrl = f.thumbnail.visitPath;
                }
            },
            fileUploaded: function (res) {
                if (res.success) {
                    var f = res.data;
                    this.formatFile(f);
                    this.files.push(f);
                    this.outfiles.push(f);
                    this.adds.push(f);
                    this.onChangeVal();
                    this.validatePreView(f);
                }
                else {
                    //TODO:出错了

                    // var f = {
                    //     id:Math.random(),
                    //     fileName:"出错了",
                    //     visitPath:""
                    // };
                    // this.formatFile(f);
                    // this.files.push(f);
                    // this.adds.push(f);
                    // this.onChangeVal();
                }
            },
            isImage: function (file) {
                return file.category == "图片";
            },
            fileClick: function (file) {
                if (this.isImage(file)) {
                    this.preView(file);
                }
                else {
                    this.validatePreView(file);
                }
            },
            validatePreView: function (file) {
                var validateMessage = file.validateMessage;
                var self = this;
                getPrePop(function () {
                    self.prePop.show();
                    self.prePop.setData(validateMessage);
                });
                function getPrePop(callback) {
                    if (!self.prePop) {
                        requirejs(["vueBsPop"], function (pop) {
                            var prePop = Vue.extend({
                                template: '<bs-pop\
                                    type="lg" title="预处理信息" ref="pop">\
                                        <div style="text-align:center">\
                                            <textarea v-text="validateMessage" style="width: 100%;height: 300px">\
                                            </textarea>\
                                        </div>\
                                        <template slot="footer">\
                                            <button type="button" class="btn btn-default" @click="hide">关闭</button>\
                                        </template>\
                                    </bs-pop>',
                                data: function () {
                                    return {
                                        validateMessage: ""
                                    }
                                },
                                methods: {
                                    setData: function (validateMessage) {
                                        this.$set(this, "validateMessage", validateMessage);
                                    },
                                    hide: function () {
                                        this.$refs.pop.hide();
                                    },
                                    show: function () {
                                        this.$refs.pop.show();
                                    }
                                }
                            });
                            self.prePop = new prePop();
                            self.prePop.$mount();
                            $(self.prePop.$el).appendTo("body");
                            callback();
                        });
                    }
                    else {
                        callback();
                    }
                }
            },
            preView: function (file) {
                var url = file.visitPath;
                var self = this;
                getPrePop(function () {
                    self.prePop.show();
                    self.prePop.setData(url);
                });
                function getPrePop(callback) {
                    if (!self.prePop) {
                        requirejs(["vueBsPop"], function (pop) {
                            var prePop = Vue.extend({
                                template: '<bs-pop\
                                    type="lg" title="预览" ref="pop">\
                                        <div style="text-align:center">\
                                            <img style="max-width: 870px;" :src="url">\
                                        </div>\
                                        <template slot="footer">\
                                            <button type="button" class="btn btn-default" @click="hide">关闭</button>\
                                        </template>\
                                    </bs-pop>',
                                data: function () {
                                    return {
                                        url: ""
                                    }
                                },
                                methods: {
                                    setData: function (url) {
                                        this.$set(this, "url", url);
                                    },
                                    hide: function () {
                                        this.$refs.pop.hide();
                                    },
                                    show: function () {
                                        this.$refs.pop.show();
                                    }
                                }
                            });
                            self.prePop = new prePop();
                            self.prePop.$mount();
                            $(self.prePop.$el).appendTo("body");
                            callback();
                        });
                    }
                    else {
                        callback();
                    }
                }
            },
            download: function (file) {
                var url = file.visitPath;
                window.open(url, "_blank");
            },
            fileRemove: function (rmFile) {
                for (var i = 0, file; file = this.files[i]; i++) {
                    if (rmFile === file) {
                        this.files.splice(i, 1);
                        this.outfiles.splice(i, 1);
                        var addIndex = this.adds.indexOf(file);
                        if (addIndex >= 0) {
                            this.adds.splice(addIndex, 1);
                        }
                        else {
                            this.dels.push(rmFile);
                        }
                        this.onChangeVal();
                        break;
                    }
                }
            },
            onChangeVal: function () {
                this.$emit("input", {
                    add: this.adds.map(function (f) { return f.id }),
                    del: this.dels.map(function (f) { return f.id })
                });
            }
        }
    });
});