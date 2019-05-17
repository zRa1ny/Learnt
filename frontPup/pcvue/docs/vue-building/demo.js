define([
    'require',
    'vue',
    'vueBuilding'
], function (require, Vue, $) {
    'use strict';
    // 创建根实例
    new Vue({
        el: '#example',
        data: {
            houses: {
                "buildingName": "雉城街道三狮社区三狮苑小区17号楼",
                "height": 6,
                "width": 2,
                "prefix": "B",
                "houses": [{
                    "hId": "203EFFB0A88A4CB9A8E9CBD3C42C23E1",
                    "title": "101",
                    "postfix": "1",
                    "houseName": "魏有勤",
                    "houseAddr": "雉城街道三狮苑17幢1单元101室",
                    "houseArea": 88.92,
                    "owner": {
                        "id": "AB9DF1F2404048CA8B78D9E20FC92A61"
                    },
                    "peoples": [{
                        "personType": null,
                        "hId": "203EFFB0A88A4CB9A8E9CBD3C42C23E1",
                        "id": null,
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }]
                }, {
                    "hId": "3150952-7413-4e27-9c07-9d9267ff95c7",
                    "title": "102",
                    "postfix": "1",
                    "houseName": "魏有勤",
                    "houseAddr": "雉城街道三狮苑17幢1单元102室",
                    "houseArea": 85,
                    "owner": {
                        "id": "AB9DF1F2404048CA8B78D9E20FC92A61"
                    },
                    "peoples": [{
                        "personType": null,
                        "hId": "3150952-7413-4e27-9c07-9d9267ff95c7",
                        "id": null,
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }]
                }, {
                    "hId": "31709872-7c13-4e27-9c07-9d9267ff95c7",
                    "title": "201",
                    "postfix": "1",
                    "houseName": "邢海霞",
                    "houseAddr": "三狮苑小区17幢1单元201",
                    "houseArea": 60,
                    "owner": {
                        "id": "ea023d89-f3fc-466a-9d02-2ef0549bb408"
                    },
                    "peoples": [{
                        "personType": null,
                        "hId": "31709872-7c13-4e27-9c07-9d9267ff95c7",
                        "id": null,
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }]
                }, {
                    "hId": "8272B2F7BEFD49F3B9D946E0D1A02FF8",
                    "title": "202",
                    "postfix": "1",
                    "houseName": "魏有勤",
                    "houseAddr": "雉城三狮苑17幢1-202室",
                    "houseArea": 85.66,
                    "owner": {
                        "id": "AB9DF1F2404048CA8B78D9E20FC92A61"
                    },
                    "peoples": [{
                        "personType": null,
                        "hId": "8272B2F7BEFD49F3B9D946E0D1A02FF8",
                        "id": null,
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }]
                }, {
                    "hId": "9C7CAF53D273447893ECD4052DA8AB9A",
                    "title": "301",
                    "postfix": "1",
                    "houseName": "魏有勤",
                    "houseAddr": "雉城镇三狮苑17幢1-301室",
                    "houseArea": 85,
                    "owner": {
                        "id": "AB9DF1F2404048CA8B78D9E20FC92A61"
                    },
                    "peoples": [{
                        "personType": null,
                        "hId": "9C7CAF53D273447893ECD4052DA8AB9A",
                        "id": null,
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }]
                }, {
                    "hId": "2cc4ef0a-2a23-4143-9d08-3e18835c090d",
                    "title": "302",
                    "postfix": "1",
                    "houseName": "辛佩兰",
                    "houseAddr": "三狮苑小区17幢1单元302",
                    "houseArea": 80,
                    "owner": {
                        "id": "2a039cf6-e2c5-41b4-b3b2-ebb706f3a5ea"
                    },
                    "peoples": [{
                        "personType": null,
                        "hId": "2cc4ef0a-2a23-4143-9d08-3e18835c090d",
                        "id": null,
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }]
                }, {
                    "hId": "8ca21d1e-905b-4ca1-ab0d-fca344995bc2",
                    "title": "401",
                    "postfix": "0",
                    "houseName": "谢永祥",
                    "houseAddr": "三狮苑小区17幢1单元401",
                    "houseArea": 60,
                    "owner": {
                        "id": "2200229e-2cc1-48fc-8b04-c269225a2a14"
                    },
                    "peoples": [{
                        "personType": "1",
                        "hId": "8ca21d1e-905b-4ca1-ab0d-fca344995bc2",
                        "id": "2200229e-2cc1-48fc-8b04-c269225a2a14",
                        "sex": "male",
                        "isAdult": true,
                        "age": 80,
                        "symbol": "101",
                        "peopleName": "谢永祥",
                        "peopleGender": "男性",
                        "peopleMarital": "已婚",
                        "peopleNation": "汉族",
                        "peoplePoliticsStatus": "中国共产党党员",
                        "peopleReligion": "其他",
                        "peopleNativePlace": "浙江省湖州市长兴县"
                    }]
                }, {
                    "hId": "82CCD59226BB41BCB3F46226C7D451A8",
                    "title": "402",
                    "postfix": "1",
                    "houseName": "韩德姣",
                    "houseAddr": "雉城三狮苑17幢1-402室",
                    "houseArea": 88.92,
                    "owner": {
                        "id": "1177EDF4CA3D434C97F490B2C3D20669"
                    },
                    "peoples": [{
                        "personType": null,
                        "hId": "82CCD59226BB41BCB3F46226C7D451A8",
                        "id": null,
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }]
                }, {
                    "hId": "ecb56915-fb95-4937-8008-9b56cf989031",
                    "title": "501",
                    "postfix": "0",
                    "houseName": "邢贝贝",
                    "houseAddr": "三狮苑小区17幢1单元501",
                    "houseArea": 120,
                    "owner": {
                        "id": "c0629ab0-ec13-4ff1-a3e8-805e694b61bf"
                    },
                    "peoples": [{
                        "personType": null,
                        "hId": "ecb56915-fb95-4937-8008-9b56cf989031",
                        "id": "D3DAF0CF-838D-3FBC-C431-6E4B2761BE34",
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }]
                }, {
                    "hId": "ebfe597b-5f06-4274-9910-38f419f22024",
                    "title": "502",
                    "postfix": "1",
                    "houseName": "辛松华",
                    "houseAddr": "三狮苑小区17幢1单元502",
                    "houseArea": 80,
                    "owner": {
                        "id": "00f08938-86e2-4cd3-9806-24a899543a84"
                    },
                    "peoples": [{
                        "personType": null,
                        "hId": "ebfe597b-5f06-4274-9910-38f419f22024",
                        "id": null,
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }]
                }, {
                    "hId": "1ac6314a-9926-4a0f-ab98-ad7dbc845e54",
                    "title": "601",
                    "postfix": "2",
                    "houseName": "信玉",
                    "houseAddr": "三狮苑小区17幢1单元601",
                    "houseArea": 60,
                    "owner": {
                        "id": "d7e6db99-f67e-4f58-b1e7-3d2b67160fea"
                    },
                    "peoples": [{
                        "personType": null,
                        "hId": "1ac6314a-9926-4a0f-ab98-ad7dbc845e54",
                        "id": "797d33c4-19f3-4518-a404-ec3da7a4e0a6",
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }, {
                        "personType": null,
                        "hId": "1ac6314a-9926-4a0f-ab98-ad7dbc845e54",
                        "id": "4e6899b8-325e-425b-920e-1e75ee21d8a1",
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }, {
                        "personType": null,
                        "hId": "1ac6314a-9926-4a0f-ab98-ad7dbc845e54",
                        "id": "43b94c55-b6b5-4da4-afed-ab698f2e4168",
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }, {
                        "personType": "1",
                        "hId": "1ac6314a-9926-4a0f-ab98-ad7dbc845e54",
                        "id": "2edc4e63-478d-4da9-9430-07013b63d4c4",
                        "sex": "male",
                        "isAdult": true,
                        "age": 50,
                        "symbol": "101",
                        "peopleName": "谢翊毅",
                        "peopleGender": "男性",
                        "peopleMarital": "已婚",
                        "peopleNation": "汉族",
                        "peoplePoliticsStatus": "中国共产党党员",
                        "peopleReligion": "其他",
                        "peopleNativePlace": "浙江省湖州市长兴县"
                    }]
                }, {
                    "hId": "3CC66E874087438FAD35D54AC970E444",
                    "title": "602",
                    "postfix": "1",
                    "houseName": "邬勇刚",
                    "houseAddr": "三狮苑小区17幢1单元602",
                    "houseArea": 102,
                    "owner": {
                        "id": "06AB5AEA6AB74C78882F91B650810A6B"
                    },
                    "peoples": [{
                        "personType": null,
                        "hId": "3CC66E874087438FAD35D54AC970E444",
                        "id": null,
                        "sex": "",
                        "isAdult": true,
                        "age": null,
                        "symbol": null,
                        "peopleName": null,
                        "peopleMarital": "",
                        "peopleNation": "",
                        "peoplePoliticsStatus": "",
                        "peopleReligion": "",
                        "peopleNativePlace": null
                    }]
                }]
            }
        },
        methods: {
            clickhouse: function (element, target) {
                console.log(element, target)
            }
        },
    });
    new Vue({
        el: "#example2",
        data: {
            peoples: [{
                "personType": null,
                "hId": "1ac6314a-9926-4a0f-ab98-ad7dbc845e54",
                "id": "797d33c4-19f3-4518-a404-ec3da7a4e0a6",
                "sex": "",
                "isAdult": true,
                "age": null,
                "symbol": null,
                "peopleName": null,
                "peopleMarital": "",
                "peopleNation": "",
                "peoplePoliticsStatus": "",
                "peopleReligion": "",
                "peopleNativePlace": null
            }, {
                "personType": null,
                "hId": "1ac6314a-9926-4a0f-ab98-ad7dbc845e54",
                "id": "4e6899b8-325e-425b-920e-1e75ee21d8a1",
                "sex": "",
                "isAdult": true,
                "age": null,
                "symbol": null,
                "peopleName": null,
                "peopleMarital": "",
                "peopleNation": "",
                "peoplePoliticsStatus": "",
                "peopleReligion": "",
                "peopleNativePlace": null
            }, {
                "personType": null,
                "hId": "1ac6314a-9926-4a0f-ab98-ad7dbc845e54",
                "id": "43b94c55-b6b5-4da4-afed-ab698f2e4168",
                "sex": "",
                "isAdult": true,
                "age": null,
                "symbol": null,
                "peopleName": null,
                "peopleMarital": "",
                "peopleNation": "",
                "peoplePoliticsStatus": "",
                "peopleReligion": "",
                "peopleNativePlace": null
            }, {
                "personType": "1",
                "hId": "1ac6314a-9926-4a0f-ab98-ad7dbc845e54",
                "id": "2edc4e63-478d-4da9-9430-07013b63d4c4",
                "sex": "male",
                "isAdult": true,
                "age": 50,
                "symbol": "101",
                "peopleName": "谢翊毅",
                "peopleGender": "男性",
                "peopleMarital": "已婚",
                "peopleNation": "汉族",
                "peoplePoliticsStatus": "中国共产党党员",
                "peopleReligion": "其他",
                "peopleNativePlace": "浙江省湖州市长兴县"
            }]
        },
        methods: {
            clickpeople: function (v) {
                console.log(v)
            }
        }
    });
    new Vue({
        el: "#example3",
        data: {
            "hId": "203EFFB0A88A4CB9A8E9CBD3C42C23E1",
            "title": "101",
            "postfix": "1",
            "prefix": "A",
            "paichaDate": "2018-10-01",
            "houseName": "魏有勤",
            "houseAddr": "雉城街道三狮苑17幢1单元101室",
            "houseArea": 88.92,
            "owner": {
                "id": "AB9DF1F2404048CA8B78D9E20FC92A61"
            },
            "symbol": "101",
            "peoples": [{
                "personType": null,
                "hId": "203EFFB0A88A4CB9A8E9CBD3C42C23E1",
                "id": null,
                "sex": "",
                "isAdult": true,
                "age": null,
                "symbol": "101",
                "peopleName": null,
                "peopleMarital": "",
                "peopleNation": "",
                "peoplePoliticsStatus": "",
                "peopleReligion": "",
                "peopleNativePlace": null
            }]
        },
        methods: {
            clickpeople: function (peo) {
                console.log(peo)
            },
            clicktitle: function (tit) {
                console.log(tit)
            }
        }
    })
});