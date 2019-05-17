define([
    'require',
    'vue',
    'vueAlert',
    'vueBsPop',
    'vueAttachment',
    "vuedraggable",
    'vueForm'
], function (require, Vue, alert) {
    'use strict';
    //普通弹出框    
    var fileVm = new Vue({
        el: "#file",
        data: {
            data: {},
            fields: [{
                label: "附件",
                name: "files",
                type: "display",
                colSpan: 2
            }],
            previewurl: "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=ecbee2a1-f7d1-4d12-8ed3-6362b2087d39",
            bUrl: "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=a264d7d2-ded9-4799-8b13-7e0d72f9a375",
            imgFiles: [{
                "id": "ecbee2a1-f7d1-4d12-8ed3-6362b2087d39",
                "fileName": "1537862547010.jpg",
                "category": "图片",
                "visitPath": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=ecbee2a1-f7d1-4d12-8ed3-6362b2087d39",
                "thumbnail": {
                    "id": "fb05533a-aefa-42f8-848f-79a6aeb36abb",
                    "fileName": "1537862547010.jpg",
                    "category": "图片缩略图",
                    "visitPath": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=fb05533a-aefa-42f8-848f-79a6aeb36abb"
                },
                "preCls": "glyphicon-picture",
                "preUrl": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=fb05533a-aefa-42f8-848f-79a6aeb36abb"
            }, {
                "id": "f191cdc3-9608-45b7-88aa-345231991577",
                "fileName": "1537862547003.jpg",
                "category": "图片",
                "visitPath": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=f191cdc3-9608-45b7-88aa-345231991577",
                "thumbnail": {
                    "id": "e7270c61-1894-46ea-9f9d-2ac5d19d2fd7",
                    "fileName": "1537862547003.jpg",
                    "category": "图片缩略图",
                    "visitPath": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=e7270c61-1894-46ea-9f9d-2ac5d19d2fd7"
                },
                "preCls": "glyphicon-picture",
                "preUrl": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=e7270c61-1894-46ea-9f9d-2ac5d19d2fd7"
            }],
            isImg: true,
            id: "ecbee2a1-f7d1-4d12-8ed3-6362b2087d39",
        },
        methods: {
            showfile1: function () {
                this.$refs.preview.show();
            },
            input: function (e) {
                console.log(e)
            },
            showfile3: function () {
                filePopVm3.show();
            }
        }
    });

    var filePopVm3 = new Vue({
        el: "#viewfile3",
        data: {
            bUrl: "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=a264d7d2-ded9-4799-8b13-7e0d72f9a375",
            bFiles: [{
                "id": "a264d7d2-ded9-4799-8b13-7e0d72f9a375",
                "fileName": "IMG_0287.JPG",
                "category": "图片",
                "visitPath": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=a264d7d2-ded9-4799-8b13-7e0d72f9a375",
                "thumbnail": {
                    "id": "1979be2f-5ff8-4c4b-aea6-75500081e9a5",
                    "fileName": "IMG_0287.JPG",
                    "category": "图片缩略图",
                    "visitPath": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=1979be2f-5ff8-4c4b-aea6-75500081e9a5"
                },
                "preCls": "glyphicon-picture",
                "preUrl": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=1979be2f-5ff8-4c4b-aea6-75500081e9a5"
            }, {
                "id": "010c947d-5d56-4268-857b-9857bf12badd",
                "fileName": "IMG_2297.JPG",
                "category": "图片",
                "visitPath": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=010c947d-5d56-4268-857b-9857bf12badd",
                "thumbnail": {
                    "id": "b7b2ac04-3c90-48a2-8ce7-0bb5c5894500",
                    "fileName": "IMG_2297.JPG",
                    "category": "图片缩略图",
                    "visitPath": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=b7b2ac04-3c90-48a2-8ce7-0bb5c5894500"
                },
                "preCls": "glyphicon-picture",
                "preUrl": "http://test-zhzl.spacecig.com/cigApi/common/getImages?id=b7b2ac04-3c90-48a2-8ce7-0bb5c5894500"
            }]
        },
        methods: {
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide()
            }
        }
    });
});