define([
    'require',
    'vue',
    'vueBuildingStatisticsExample',
    'vueBuildingStatisticsImgs',
    'css!cssVueBuildingStatistics'
], function (require, Vue, VueBuildingStatisticsExample, VueBuildingStatisticsImgs) {
    'use strict';
    var vueBuildingStatistics = {
        props: {
            symbols: {
                type: Object,
                default: function () {
                    return {
                        CCPNum: 0,
                        zdfuNum: 0,
                        under14Num: 0,
                        crimeIlegalNum: 0,
                        breakNum: 0,
                        zdgkNum: 0,
                        xmsfNum: 0,
                        sqjzNum: 0,
                        jsbNum: 0,
                        xdryNum: 0,
                        azbNum: 0,
                        zdsfNum: 0,
                        zdqsnNum: 0,
                        xjryNum: 0,
                        nclsetNum: 0,
                        kclrNum: 0,
                        tkryNum: 0,
                        lsjzNum: 0,
                        cjrNum: 0,
                        dbryNum: 0
                    };
                }
            },
            dhouseholds: {
                type: Number,
                default: 0
            },
            households: {
                type: Number,
                default: 0
            },
            inpersons: {
                type: Number,
                default: 1
            },
            rentalnum: {
                type: Number,
                default: 1
            },
            vacantnum: {
                type: Number,
                default: 1
            },
            istest: {
                type: Boolean,
                default: false
            },
        },
        data: function () {
            var result = {
                imgs:VueBuildingStatisticsImgs
            };
            return result;
        },
        computed: {
            peoplegroup: function () {
                var peoples = this.peoplesymbol;
                var peopleNames = [];
                for (var propertyName in peoples) {
                    if (peoples[propertyName] > 0 && propertyName != "zdfuNum" && propertyName != "zdgkNum") {
                        peopleNames.push(propertyName);
                    }
                }
                return peopleNames.length;
            },
            peoplesymbol: function () {
                return this.istest ? getSample() : this.symbols;
            }
        },
        template: '\
                       <div class="box-body">\
                                <div class="row" style="margin-bottom:10px">\
                                    <table class="buildingStatisticsTable">\
                                        <tr style="width: 100%;">\
                                            <td><label>设计户数：</label>\
                                                <span >{{dhouseholds}}户</span></td>\
                                            <td><label>入住户数：</label>\
                                                <span >{{households}}户</span></td>\
                                            <td><label>入住人数：</label>\
                                                <span >{{inpersons}}人</span></td>\
                                            <td><label>出租房数：</label>\
                                                <span >{{rentalnum}}户</span></td>\
                                            <td><label>空置房屋：</label>\
                                                <span >{{vacantnum}}户</span></td>\
                                        </tr>\
                                    </table>\
                                    <div  v-if="peoplegroup>6">\
                                    <table class="buildingStatisticsTable">\
                                        <tr>\
                                            <td v-if="peoplesymbol.CCPNum!=0"><img v-bind:src="imgs.party"/><label>党员：</label>\
                                                <span >{{peoplesymbol.CCPNum}}人</span></td>\
                                            <td v-if="peoplesymbol.under14Num!=0"><img v-bind:src="imgs.child"/><label>14岁以下儿童：</label>\
                                                <span >{{peoplesymbol.under14Num}}人</span></td>\
                                            <td v-if="peoplesymbol.crimeIlegalNum!=0"><img v-bind:src="imgs.wf"/><label>违法犯罪：</label>\
                                                <span >{{peoplesymbol.crimeIlegalNum}}人</span></td>\
                                            <td v-if="peoplesymbol.breakNum!=0"><img v-bind:src="imgs.sx"/><label>失信：</label>\
                                                <span >{{peoplesymbol.breakNum}}人</span></td>\
                                        </tr>\
                                    </table>\
                                    <table class="buildingStatisticsTable">\
                                        <tr>\
                                            <td style="border:1px solid #d8e0e5;width:170px" v-if="peoplesymbol.zdfuNum!=0"><img v-bind:src="imgs.service"/><label>重点服务共计：</label>\
                                                <span >{{peoplesymbol.zdfuNum}}人</span></td>\
                                            <td v-if="peoplesymbol.cjrNum!=0"><label>残疾人：</label>\
                                                <span >{{peoplesymbol.cjrNum}}人</span></td>\
                                            <td v-if="peoplesymbol.nclsetNum!=0"><label>农村留守儿童：</label>\
                                                <span >{{peoplesymbol.nclsetNum}}人</span></td>\
                                            <td v-if="peoplesymbol.kclrNum!=0"><label>空巢老人：</label>\
                                                <span >{{peoplesymbol.kclrNum}}人</span></td>\
                                            <td v-if="peoplesymbol.tkryNum!=0"><label>特困人员：</label>\
                                                <span >{{peoplesymbol.tkryNum}}人</span></td>\
                                            <td v-if="peoplesymbol.lsjzNum!=0"><label>临时救助：</label>\
                                                <span >{{peoplesymbol.lsjzNum}}人</span></td>\
                                            <td v-if="peoplesymbol.dbryNum!=0"><label>低保人员：</label>\
                                                <span >{{peoplesymbol.dbryNum}}人</span></td>\
                                        </tr>\
                                    </table>\
                                    <table class="buildingStatisticsTable">\
                                        <tr>\
                                            <td style="border:1px solid #d8e0e5;width:170px" v-if="peoplesymbol.zdgkNum!=0"><img v-bind:src="imgs.danger"/><label>重点管控共计：</label>\
                                                <span >{{peoplesymbol.zdgkNum}}人</span></td>\
                                            <td v-if="peoplesymbol.xmsfNum!=0"><label>刑满释放：</label>\
                                                <span >{{peoplesymbol.xmsfNum}}人</span></td>\
                                            <td v-if="peoplesymbol.sqjzNum!=0"><label>社区矫正：</label>\
                                                <span >{{peoplesymbol.sqjzNum}}人</span></td>\
                                            <td v-if="peoplesymbol.jsbNum!=0"><label>精神障碍者：</label>\
                                                <span >{{peoplesymbol.jsbNum}}人</span></td>\
                                            <td v-if="peoplesymbol.xdryNum!=0"><label>吸毒：</label>\
                                                <span >{{peoplesymbol.xdryNum}}人</span></td>\
                                            <td v-if="peoplesymbol.azbNum!=0"><label>艾滋病：</label>\
                                                <span >{{peoplesymbol.azbNum}}人</span></td>\
                                            <td v-if="peoplesymbol.zdsfNum!=0"><label>重点上访：</label>\
                                                <span >{{peoplesymbol.zdsfNum}}人</span></td>\
                                            <td v-if="peoplesymbol.zdqsnNum!=0"><label>重点青少年：</label>\
                                                <span >{{peoplesymbol.zdqsnNum}}人</span></td>\
                                            <td v-if="peoplesymbol.xjryNum!=0"><label>邪教人员：</label>\
                                                <span >{{peoplesymbol.xjryNum}}人</span></td>\
                                        </tr>\
                                    </table>\
                                    </div>\
                                    <div v-if="peoplegroup<=6">\
                                    <table class="buildingStatisticsTable">\
                                        <tr>\
                                            <td v-if="peoplesymbol.CCPNum!=0"><img v-bind:src="imgs.party"/><label>党员：</label>\
                                                <span >{{peoplesymbol.CCPNum}}人</span></td>\
                                            <td v-if="peoplesymbol.under14Num!=0"><img v-bind:src="imgs.child"/><label>14岁以下儿童：</label>\
                                                <span >{{peoplesymbol.under14Num}}人</span></td>\
                                            <td v-if="peoplesymbol.crimeIlegalNum!=0"><img v-bind:src="imgs.wf"/><label>违法犯罪：</label>\
                                                <span >{{peoplesymbol.crimeIlegalNum}}人</span></td>\
                                            <td v-if="peoplesymbol.breakNum!=0"><img v-bind:src="imgs.sx"/><label>失信：</label>\
                                                <span >{{peoplesymbol.breakNum}}人</span></td>\
                                            <td v-if="peoplesymbol.cjrNum!=0"><label>残疾人：</label>\
                                                <span >{{peoplesymbol.cjrNum}}人</span></td>\
                                            <td v-if="peoplesymbol.nclsetNum!=0"><label>农村留守儿童：</label>\
                                                <span >{{peoplesymbol.nclsetNum}}人</span></td>\
                                            <td v-if="peoplesymbol.kclrNum!=0"><label>空巢老人：</label>\
                                                <span >{{peoplesymbol.kclrNum}}人</span></td>\
                                            <td v-if="peoplesymbol.tkryNum!=0"><label>特困人员：</label>\
                                                <span >{{peoplesymbol.tkryNum}}人</span></td>\
                                            <td v-if="peoplesymbol.lsjzNum!=0"><label>临时救助：</label>\
                                                <span >{{peoplesymbol.lsjzNum}}人</span></td>\
                                            <td v-if="peoplesymbol.dbryNum!=0"><label>低保人员：</label>\
                                                <span >{{peoplesymbol.dbryNum}}人</span></td>\
                                            <td v-if="peoplesymbol.xmsfNum!=0"><label>刑满释放：</label>\
                                                <span >{{peoplesymbol.xmsfNum}}人</span></td>\
                                            <td v-if="peoplesymbol.sqjzNum!=0"><label>社区矫正：</label>\
                                                <span >{{peoplesymbol.sqjzNum}}人</span></td>\
                                            <td v-if="peoplesymbol.jsbNum!=0"><label>精神障碍者：</label>\
                                                <span >{{peoplesymbol.jsbNum}}人</span></td>\
                                            <td v-if="peoplesymbol.xdryNum!=0"><label>吸毒：</label>\
                                                <span >{{peoplesymbol.xdryNum}}人</span></td>\
                                            <td v-if="peoplesymbol.azbNum!=0"><label>艾滋病：</label>\
                                                <span >{{peoplesymbol.azbNum}}人</span></td>\
                                            <td v-if="peoplesymbol.zdsfNum!=0"><label>重点上访：</label>\
                                                <span >{{peoplesymbol.zdsfNum}}人</span></td>\
                                            <td v-if="peoplesymbol.zdqsnNum!=0"><label>重点青少年：</label>\
                                                <span >{{peoplesymbol.zdqsnNum}}人</span></td>\
                                            <td v-if="peoplesymbol.xjryNum!=0"><label>邪教人员：</label>\
                                                <span >{{peoplesymbol.xjryNum}}人</span></td>\
                                        </tr>\
                                    </table>\
                                    </div>\
                             </div> '
    };
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getSample() {
        var randoms = VueBuildingStatisticsExample();
        return randoms[getRandomInt(0, randoms.length - 1)];
    }
    Vue.component("vue-building-statistics", vueBuildingStatistics);
});