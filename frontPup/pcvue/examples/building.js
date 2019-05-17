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
        buildingName: '小西门社区第三网格员百合园1期1号楼3单元',
        height: 8,
        width: 5,
        prefix: "D",
        houses: [{
          title: "#101",
          postfix: "2",
          houseName: "张桂连",
          houseAddr: "三狮苑",
          houseArea: "98平方米",
          houseArea: "1",
          owner: {
            id: 1
          },
          peoples: [{
            id: 1,
            sex: 'male',
            isAdult: true,
            age: 27,
            symbol: '302,307',
            peopleName: '张桂连',
            peopleGender: '男',
            peopleMarital: '已婚',
            peopleNation: '汉族',
            peoplePoliticsStatus: '中国共产党党员',
            peopleReligion: '无',
            peopleNativePlace: '浙江省湖州市长兴县',
          }, {
            id: 3,
            sex: 'female',
            age: 27,
            isAdult: true,
            symbol: '401',
            peopleName: '李香芬',
            peopleGender: '女',
            peopleMarital: '已婚',
            peopleNation: '汉族',
            peoplePoliticsStatus: '中国共产党党员',
            peopleReligion: '无',
            peopleNativePlace: '浙江省湖州市长兴县',
          }, {
            id: 4,
            sex: 'male',
            age: 7,
            isAdult: false,
            symbol: '302,401',
            peopleName: '张小风',
            peopleGender: '男',
            peopleNation: '汉族',
            peoplePoliticsStatus: '中国共产党党员',
            peopleReligion: '无',
            peopleNativePlace: '浙江省湖州市长兴县',
          }, {
            id: 5,
            sex: 'male',
            age: 7,
            isAdult: false,
            symbol: '302,307',
            peopleName: '张小山',
            peopleGender: '男',
            peopleNation: '汉族',
            peoplePoliticsStatus: '中国共产党党员',
            peopleReligion: '无',
            peopleNativePlace: '浙江省湖州市长兴县',
          }, {
            id: 6,
            sex: 'female',
            age: 7,
            isAdult: false,
            symbol: '302,401',
            peopleName: '张小婷',
            peopleGender: '女',
            peopleNation: '汉族',
            // peoplePoliticsStatus: '中国共产党党员',
            // peopleReligion: '无',
            // peopleNativePlace: '浙江省湖州市长兴县',
          }]
        }]
      },

    },
    methods: {
      clickhouse: function (element, target) {
        var kk = 1;
      }
    },
  })
});