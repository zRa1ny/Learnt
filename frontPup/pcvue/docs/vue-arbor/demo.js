define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueArbor'
], function (require, Vue, $, systemConfig) {
    'use strict';
    function dealImageData(result, data) {
        if (data["label"] || data["color"] || data["size"] || data["jump"]) {
            result.push(
                data["name"] + "{" + (data["label"] ? ("label:" + data["label"]) + "," : "") + (data["jump"] ? ("jump:" + data["jump"] + ",") : "") + (data["id"] ? ("id:" + data["id"] + ",") : "") + (data["pId"] ? ("pId:" + data["pId"] + ",") : "") + (data["bId"] ? ("bId:" + data["bId"]) : "") + (data["color"] ? ("color:" + data["color"] + ",") : "") + (data["size"] ? ("size:" + data["size"]) : "") + "}"
            );
        }
        if (data["children"]) {
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
    var main = new Vue({
        el: "#arbor",
        data: {
            imgData: {
                "label": "于明博",
                "color": "#02a6ec ",
                "size": "big",
                "children": [
                    {
                        "label": "标签",
                        "size": "small",
                        "color": "#1e94ad",
                        "lineColor": "#87b5e4",
                        "children": [
                            {
                                "label": "重点管控",
                                "color": "#dc3030",
                                "lineColor": "#93c7c3",
                                "children": [
                                    {
                                        "jump": "0",
                                        "label": "吸毒人员",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "3"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "邪教人员",
                                        "id": "BWilZeaqtZS7QUXQD2zRiOrA0nXC0O",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "4"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "精神病人",
                                        "id": "29916",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "5"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "信访人员",
                                        "id": "1234",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "6"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "艾滋病危险人员",
                                        "id": "123",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "7"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "社区矫正人员",
                                        "id": "1111",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "8"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "刑满释放人员",
                                        "id": "123",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "9"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "重点青少年",
                                        "id": "1234455",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "10"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "传销人员",
                                        "id": "1",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "11"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "其他人员",
                                        "id": "1",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "12"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "危险品从业人员",
                                        "id": "1",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "13"
                                    }
                                ],
                                "name": "2"
                            },
                            {
                                "label": "重点服务",
                                "lineColor": "#93c7c3",
                                "color": "#dc3030",
                                "children": [
                                    {
                                        "jump": "0",
                                        "label": "孤寡老人",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "15"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "留守人员",
                                        "id": "3d1f3ae-6e03-4426-831b-763d42ddc6a6",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "16"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "低保人员",
                                        "id": "3d1f3ae-6e03-4426-831b-763d42ddc6a6",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "17"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "困境儿童",
                                        "id": "toNsEeLdJbvRVitv9EAADUEYouKIDybI4",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "18"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "临时救助",
                                        "id": "toNsEeLdJbvRVitv9EAADUEYouKIDybI4",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "19"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "残疾人",
                                        "id": "3d1f3ae-6e03-4426-831b-763d42ddc6a6",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "20"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "寄递从业人员",
                                        "id": "1",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "21"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "育龄妇女",
                                        "id": "1",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "22"
                                    },
                                    {
                                        "jump": "0",
                                        "label": "失业人员",
                                        "id": "1",
                                        "pId": "1",
                                        "lineColor": "#dfb2b2",
                                        "name": "23"
                                    }
                                ],
                                "name": "14"
                            }
                        ],
                        "name": "1"
                    }
                ],
                "name": "0"
            }
        },
        mounted: function () {
            this.getData();
        },
        watch: {

        },
        methods: {
            getData: function () {
                var data = this.imgData;
                var result = ["{color:#ccc}"];
                dealImageData(result, data);
                var Str = "";
                for (var i = 0; i < result.length; i++) {
                    Str += result[i] + "\n";
                }
                this.imgData = Str;
                console.log(Str)
            },
            itemclick: function (data) {
                console.log(data)
                window.alert("点击了" + data.label)
            }
        },
        computed: {
        }
    })
});