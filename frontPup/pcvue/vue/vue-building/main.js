define([
  'require',
  'vue',
  'vueBuildingExample',
  'vueBuildingSymbol',
  'vuePopperComponent',
  'css!cssVueBuilding',
], function (require, Vue, VueBuildingExample, VueBuildingSymbol, VuePopper) {
  'use strict';
  var lastPop;
  var vuePeople = {
    props: {
      peoples: {
        type: Array,
        default: function () {
          return []
        },
      },
    },
    template: '\
    <div> \
        <template v-for="(item, index) in peoples" v-if="item.age >= 60"> \
          <i v-on:click="$emit(\'clickpeople\',peoples)" class="fa icon-oldman fa-3x vue-building-people vue-building-people-hover" v-bind:class="{\'vue-building-people-party\':item.symbol?item.symbol[0]==1:false,\'vue-building-people-danger\':item.symbol?item.symbol[0]==2:false,\'vue-building-people-service\':item.symbol?item.symbol[0]==3:false,\'vue-building-people-stranger\':item.symbol?item.symbol[0]==4:false,\'vue-building-people-other\':item.symbol?item.symbol[0]==5:false}" v-if="item.sex === \'male\'"></i> \
          <i v-on:click="$emit(\'clickpeople\',peoples)" class="fa icon-oldwoman fa-3x vue-building-people vue-building-people-hover" v-bind:class="{\'vue-building-people-party\':item.symbol?item.symbol[0]==1:false,\'vue-building-people-danger\':item.symbol?item.symbol[0]==2:false,\'vue-building-people-service\':item.symbol?item.symbol[0]==3:false,\'vue-building-people-stranger\':item.symbol?item.symbol[0]==4:false,\'vue-building-people-other\':item.symbol?item.symbol[0]==5:false}" v-if="item.sex === \'female\'"></i> \
        </template> \
        <template v-for="(item, index) in peoples" v-if="item.age >= 14&&item.age < 60"> \
          <i v-on:click="$emit(\'clickpeople\',peoples)" class="fa ion-man fa-4x vue-building-people vue-building-people-hover" v-bind:class="{\'vue-building-people-party\':item.symbol?item.symbol[0]==1:false,\'vue-building-people-danger\':item.symbol?item.symbol[0]==2:false,\'vue-building-people-service\':item.symbol?item.symbol[0]==3:false,\'vue-building-people-stranger\':item.symbol?item.symbol[0]==4:false,\'vue-building-people-other\':item.symbol?item.symbol[0]==5:false}" v-if="item.sex === \'male\'"></i> \
          <i v-on:click="$emit(\'clickpeople\',peoples)" class="fa ion-woman fa-4x vue-building-people vue-building-people-hover" v-bind:class="{\'vue-building-people-party\':item.symbol?item.symbol[0]==1:false,\'vue-building-people-danger\':item.symbol?item.symbol[0]==2:false,\'vue-building-people-service\':item.symbol?item.symbol[0]==3:false,\'vue-building-people-stranger\':item.symbol?item.symbol[0]==4:false,\'vue-building-people-other\':item.symbol?item.symbol[0]==5:false}" v-if="item.sex === \'female\'"></i> \
        </template> \
        <template v-for="(item, index) in peoples" v-if="item.age <= 14&&item.age > 3""> \
          <i v-on:click="$emit(\'clickpeople\',peoples)" class="fa fa-3x vue-building-people vue-building-people-hover" v-bind:class="{\'ion-woman\':item.sex === \'female\',\'ion-man\':item.sex === \'male\',\'vue-building-people-party\':item.symbol?item.symbol[0]==1:false,\'vue-building-people-danger\':item.symbol?item.symbol[0]==2:false,\'vue-building-people-service\':item.symbol?item.symbol[0]==3:false,\'vue-building-people-stranger\':item.symbol?item.symbol[0]==4:false,\'vue-building-people-other\':item.symbol?item.symbol[0]==5:false}"></i> \
        </template> \
        <template v-for="(item, index) in peoples" v-if="item.age <= 3"> \
          <i v-on:click="$emit(\'clickpeople\',peoples)" class="fa fa-2x icon-baby vue-building-people vue-building-people-hover"></i> \
        </template> \
    </div> '
  };
  Vue.component("vue-building-people", vuePeople);

  var vueHouse = {
    props: {
      x: {
        type: Number,
        default: 1
      },
      y: {
        type: Number,
        default: 1
      },
      title: {
        type: String,
        default: '101'
      },
      prefix: {
        type: String,
        default: ''
      },
      postfix: {
        type: String,
        default: ''
      },
      paichaDate: {
        type: String,
        default: '无'
      },
      updatetime: {
        type: String,
        default: ""
      },
      symbol: {
        type: String,
        default: "none"
      },
      hId: {
        type: String,
        default: "none"
      },
      peoples: {
        type: Array,
        default: function () {
          return []
        }
      },
      houseName: {
        type: String,
        default: "none"
      },
      houseAddr: {
        type: String,
        default: "none"
      },
      houseArea: {
        type: Number,
        default: 0
      },
      houseState: {
        type: String,
        default: "1"
      }
    },
    data: function () {
      return {
        showPopperParentVar12: false,
        showPopperParentVarTitle: false,
        curPeople: {}
      }
    },
    computed: {
      newTitle: function () {
        switch (this.postfix) {
          case "1":
            return this.prefix + this.title + "（空）"
            break;
          case "2":
            return this.prefix + this.title + "（租）"
            break;
          case "3":
            return this.prefix + this.title + "（无）"
            break;
          default:
            return this.prefix + this.title
        }
      },
      bigIcon: function () {
        var iconSrc = "";
        var sortSymbols = [];
        for (var i = 0; i < this.peoples.length; i++) {
          var mPeople = this.peoples[i];
          if (mPeople.symbol && mPeople.symbol.length > 0) {
            sortSymbols.push(mPeople.symbol);
          }
        }
        if (sortSymbols.length > 0) {
          var newSortSymbols = sortSymbols.sort();
          var symbol = newSortSymbols[0].split(',')[0];
          iconSrc = VueBuildingSymbol.x42[symbol];
        }
        return iconSrc;
      },
      imageGroup: function () {
        var imgGroup = [];
        var symbolGroup = [];
        for (var i = 0; i < this.peoples.length; i++) {
          var mPeople = this.peoples[i];
          if (mPeople.symbol && mPeople.symbol.length > 0) {
            symbolGroup = symbolGroup.concat(mPeople.symbol.split(','));
          }
        }
        var sortSymbolGroup = symbolGroup.sort();



        function unique(array) {
          var n = []; //临时数组
          for (var i = 0; i < array.length; i++) {
            if (n.indexOf(array[i]) == -1) n.push(array[i]);
          }
          return n;
        }

        sortSymbolGroup = unique(sortSymbolGroup);
        if (sortSymbolGroup.length > 0) {
          sortSymbolGroup.splice(0, 1);
        }
        for (var j = 0; j < sortSymbolGroup.length; j++) {
          imgGroup.push(VueBuildingSymbol.x24[sortSymbolGroup[j]]);
        }

        return imgGroup;
      }
    },
    components: {
      'popper': VuePopper
    },
    methods: {
      clickpeople: function (people) {
        this.$emit('clickpeople', people);
        this.curPeople = people;
        this.showPopperParentVar12 = !this.showPopperParentVar12;
        this.showPopperParentVarTitle = false;
        if (lastPop != this) {
          if (lastPop) {
            lastPop.showPopperParentVar12 = false;
            lastPop.showPopperParentVarTitle = false;
          }
          lastPop = this;
        }
      },
      clicktitle: function (people) {
        this.$emit('clicktitle', people);
        this.showPopperParentVarTitle = !this.showPopperParentVarTitle;
        this.showPopperParentVar12 = false;
        if (lastPop != this) {
          if (lastPop) {
            lastPop.showPopperParentVar12 = false;
            lastPop.showPopperParentVarTitle = false;
          }
          lastPop = this;
        }
      },
      jumpFwDetail: function () {
        window.location.href = "../syfw/fwDetail.html?id=" + this.hId;
      },
      jumpUserDetail: function ($event, index) {
        if (this.peoples[index].personType == "1") {
          window.location.href = "../syrk/hjDetail.html?id=" + this.peoples[index].id;
        }
        else {
          window.location.href = "../syrk/ldDetail.html?id=" + this.peoples[index].id;
        }
      }
    },
    template: '\
    <div style="width:240px;float:left;margin:0px 0px 0px 10px"> \
      <div class="panel" v-bind:class="{\'panel-info\':postfix==\'0\',\'panel-warning\':postfix==\'1\',\'panel-danger\':postfix==\'2\',\'panel-default\':postfix==\'3\'}"> \
        <div class="panel-heading"> \
         <popper \
              :show-popper.sync="showPopperParentVarTitle" \
              content="Lorem ipsum dolor" \
              placement="top" \
              close-button="1"> \
              \
                <div slot="close-button"> \
                  <i class="glyphicon glyphicon-remove"></i> \
                </div> \
                \
                <div slot="content"> \
                <div class="row">\
                  <div class="col-md-12">\
                  <span class="vue-popper-component-font">代表人/业主：{{houseName}}</span><br>\
                  <span class="vue-popper-component-font">建筑面积：{{houseArea}}平方米</span><br>\
                  <span class="vue-popper-component-font" style="cursor:pointer"><a v-on:click="jumpFwDetail" v-bind:hid="hId">详情</a></span>\
                  </div>\
                   </div>\
                </div> \
              \
          <span v-on:click="clicktitle" class="vue-building-house-title"> {{ newTitle }}\</span> \
          <div class="pull-right"> \
            <template v-for="(item, index) in imageGroup" v-if="imageGroup.length > 0"> \
               <img v-on:click="$emit(\'clicksymbol\')" class="vue-building-house-imgGroup"  v-bind:src="item" v-if="item.length>0?true:false"/> \
            </template> \
          </div> \
            </popper> \
        </div> \
        <div class="panel-body"> \
          <div class="pull-left" style="margin:0px 0px 0px -10px"> \
            <popper \
              :show-popper.sync="showPopperParentVar12" \
              content="Lorem ipsum dolor" \
              placement="top" \
              close-button="1"> \
              \
                <div slot="close-button"> \
                  <i class="glyphicon glyphicon-remove"></i> \
                </div> \
                \
                <div slot="content"> \
                <div v-for="(curPeople,index) in peoples">\
                 <hr style="height:1px;border:none;border-top:1px solid #dddddd;" />\
                <div class="row vue-popper-component-popper-text">\
                <div class="col-md-3">\
                  <img class="img-circle" src="data:image/png;base64,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"/>\
                  </div>\
                  <div class="col-md-8">\
                  <span class="vue-popper-component-blod">\
                  <span><a v-on:click="jumpUserDetail($event,index)" v-bind:peoples="peoples">{{curPeople.peopleName}}</a></span>\
                  <span>{{curPeople.peopleGender}}</span>\
                  <span>{{curPeople.age}}</span>\
                  <span>{{curPeople.peopleMarital}}</span>\
                  <span>{{curPeople.peopleNation}}</span>\
                  </span>\
                  </div>\
                   </div>\
                   </div>\
                </div> \
              \
                <vue-building-people v-on:clickpeople="clickpeople" v-bind:peoples="peoples"></vue-building-people> \
            </popper> \
                      </div> \
          <div class="pull-right" style="margin:10px -10px -10px 0px"> \
            <img v-on:click="$emit(\'clicksymbol\')" class="vue-building-house-img"  v-bind:src="bigIcon" v-if="bigIcon==\'\'?false:true"/> \
          </div> \
        </div> \
        <div class="panel panel-foot" v-if="postfix!=3">\
        <span>近期排查：{{paichaDate}}</span>\
        </div>\
      </div> \
    </div> \
    '
  };
  Vue.component("vue-building-house", vueHouse);

  var vueBuilding = {
    props: {
      buildingname: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 0
      },
      width: {
        type: Number,
        default: 3
      },
      prefix: {
        type: String,
        default: ''
      },
      houses: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      clickpeople: function (house, people) {
        this.$emit('clickhouse', 'people', {
          house: house,
          people: people
        });
      },
      clicktitle: function (house) {
        this.$emit('clickhouse', 'title', {
          house: house
        });
      },
      clicksymbol: function (house) {
        this.$emit('clickhouse', 'symbol', {
          house: house
        });
      }
    },
    components: {
      'popper': VuePopper
    },
    render: function (createElement) {
      return createElement('div', {
        style: {
          'width': this.width * (240 + 15) + 'px'
        }
      }, [
          createElement('div', {
            'class': {
              'panel': true,
              'panel-success': true
            }
          }, [
              createElement('div', {
                'class': {
                  'panel-heading': true
                }
              }, [
                  createElement('span', {
                    'style': {
                      'font-weight': 'bold'
                    },
                    domProps: {
                      innerHTML: this.buildingname
                    }
                  })
                ]),
              createElement('div', {
                'class': {
                  'panel-body': true
                }
              },
                renderInit(createElement, this, this.width, this.height, this.houses)
              )
            ])
        ])
    },
  };

  function renderInit(createElement, building, width, height, houses) {
    var rowElements = [];
    var rowHouses = [];
    for (var i = 0; i < width * height; i++) {
      var house = {}
      if (i < houses.length)
        house = houses[i];
      else
        house = randomHouse();
      house.x = rowHouses.length + 1;
      house.y = rowElements.length + 1;
      house.prefix = building.prefix;
      if (!house.title) house.title = house.y + '0' + house.x;
      rowHouses.push(house);
      if (rowHouses.length === width) {
        if (rowElements.length > height) break;
        rowElements.push(renderRow(createElement, building, rowHouses));
        rowHouses = [];
      }
    }
    return rowElements.reverse();
  }

  function renderRow(createElement, building, houses) {
    var houseElements = [];
    for (var i = 0; i < houses.length; i++) {
      var house = houses[i];
      var houseElement = createElement(vueHouse, {
        props: house,
        on: {
          clickpeople: building.clickpeople.bind(building, house),
          clicktitle: building.clicktitle.bind(building, house),
          clicksymbol: building.clicksymbol.bind(building, house)
        }
      });
      houseElements.push(houseElement);
    }
    return createElement('div', {
      'class': {
        'row': true
      }
    }, houseElements);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomHouse() {
    var randoms = VueBuildingExample();
    return randoms[getRandomInt(0, randoms.length - 1)];
  }

  Vue.component("vue-building", vueBuilding);
});